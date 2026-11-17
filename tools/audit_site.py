#!/usr/bin/env python3
"""Static quality gate for every published HTML page in the Art repository."""
from collections import Counter
from html.parser import HTMLParser
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
IGNORED_DIRS = {".git", "node_modules", ".venv"}

class PageInspector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = Counter()
        self.links = []
        self.missing_alt = []
        self.h1_count = 0
        self.title_parts = []
        self.in_title = False
        self.meta_refresh = False
        self.script_type = None
        self.script_src = None
        self.script_parts = []
        self.inline_scripts = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids[attrs["id"]] += 1
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.in_title = True
        if tag == "meta" and (attrs.get("http-equiv") or "").lower() == "refresh":
            self.meta_refresh = True
        if tag == "img" and "alt" not in attrs:
            self.missing_alt.append(self.getpos())
        if tag in ("a", "area", "link") and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag in ("script", "img", "source", "iframe", "video", "audio") and attrs.get("src"):
            self.links.append(attrs["src"])
        if tag == "script":
            self.script_type = (attrs.get("type") or "").split(";")[0].strip().lower()
            self.script_src = attrs.get("src")
            self.script_parts = []

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "script":
            if not self.script_src and self.script_type in ("", "text/javascript", "application/javascript", "module"):
                code = "".join(self.script_parts).strip()
                if code:
                    self.inline_scripts.append(code)
            self.script_type = None
            self.script_src = None
            self.script_parts = []

    def handle_data(self, data):
        if self.in_title:
            self.title_parts.append(data)
        if self.script_type is not None and not self.script_src:
            self.script_parts.append(data)

def local_target(page, value):
    parts = urlsplit(value)
    if parts.scheme or parts.netloc or value.startswith(("data:", "javascript:", "mailto:", "tel:")):
        return None
    path = unquote(parts.path)
    if not path:
        return None
    target = (page.parent / path).resolve() if not path.startswith("/") else (ROOT / path.lstrip("/")).resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        return "path escapes repository: " + value
    if target.is_dir():
        target = target / "index.html"
    if not target.exists():
        return "missing local target: " + value
    return None

def check_js(code, label):
    with tempfile.NamedTemporaryFile("w", suffix=".js", encoding="utf-8", delete=False) as handle:
        handle.write(code)
        name = handle.name
    try:
        result = subprocess.run(["node", "--check", name], text=True, capture_output=True)
        if result.returncode:
            return label + ": " + (result.stderr.strip() or result.stdout.strip())
        return None
    finally:
        Path(name).unlink(missing_ok=True)

def main():
    pages = sorted(p for p in ROOT.rglob("*.html") if not any(part in IGNORED_DIRS for part in p.parts))
    errors = []
    warnings = []
    totals = Counter()
    for page in pages:
        raw = page.read_text(encoding="utf-8", errors="replace")
        parser = PageInspector()
        parser.feed(raw)
        parser.close()
        rel = page.relative_to(ROOT).as_posix()
        title = " ".join(parser.title_parts).strip()
        totals["pages"] += 1
        if not title:
            errors.append(rel + ": missing document title")
        if not parser.meta_refresh and parser.h1_count != 1:
            errors.append(rel + ": expected exactly one H1, found " + str(parser.h1_count))
        duplicates = [key for key, count in parser.ids.items() if count > 1]
        if duplicates:
            errors.append(rel + ": duplicate id attributes: " + ", ".join(duplicates[:12]))
        if parser.missing_alt:
            errors.append(rel + ": " + str(len(parser.missing_alt)) + " image(s) missing alt attributes")
        for value in parser.links:
            issue = local_target(page, value)
            if issue:
                errors.append(rel + ": " + issue)
        for index, code in enumerate(parser.inline_scripts, 1):
            issue = check_js(code, rel + " inline script " + str(index))
            if issue:
                errors.append(issue)
        totals["inline_scripts"] += len(parser.inline_scripts)
        totals["images_without_alt"] += len(parser.missing_alt)
        totals["duplicate_id_pages"] += bool(duplicates)
    # Keep the homepage collection total aligned with its actual linked cards.
    home_path = ROOT / "index.html"
    if home_path.exists():
        home_html = home_path.read_text(encoding="utf-8", errors="replace")
        collection_cards = re.findall(r'<a\\b[^>]*class="card"[^>]*href="[^"]+"', home_html, re.I)
        stamp_match = re.search(r'<span class="stamp">\\s*(\\d+)\\s+COLLECTIONS\\s*</span>', home_html, re.I)
        if stamp_match and int(stamp_match.group(1)) != len(collection_cards):
            errors.append("index.html: collection total stamp does not match linked collection cards (" + str(len(collection_cards)) + ")")
    # Keep the homepage's film-tracker count aligned with the canonical catalogue.
    home_path = ROOT / "index.html"
    film_path = ROOT / "film-collection.html"
    if home_path.exists() and film_path.exists():
        home_html = home_path.read_text(encoding="utf-8", errors="replace")
        film_html = film_path.read_text(encoding="utf-8", errors="replace")
        film_title = re.search(r"<title[^>]*>(.*?)</title>", film_html, re.I | re.S)
        count_match = re.search(r"([0-9][0-9,]*)\s+Films", film_title.group(1)) if film_title else None
        card_match = re.search(r'<a\b[^>]*href="film-collection\.html"[^>]*>[\s\S]*?</a>', home_html, re.I)
        if count_match:
            canonical_count = count_match.group(1)
            if not card_match or canonical_count not in card_match.group(0):
                errors.append("index.html: film tracker card count does not match film-collection.html (" + canonical_count + ")")
            if re.search(r"1,619", home_html):
                errors.append("index.html: stale 1,619-film count remains after the catalogue was updated")

    js_files = sorted((ROOT / "assets" / "js").glob("*.js"))
    for path in js_files:
        issue = check_js(path.read_text(encoding="utf-8", errors="replace"), path.relative_to(ROOT).as_posix())
        if issue:
            errors.append(issue)
    totals["shared_js_files"] = len(js_files)
    print("Art repository audit")
    print("HTML pages:", totals["pages"])
    print("Inline scripts checked:", totals["inline_scripts"])
    print("Shared JS files checked:", totals["shared_js_files"])
    print("Images missing alt:", totals["images_without_alt"])
    print("Pages with duplicate IDs:", totals["duplicate_id_pages"])
    print("Errors:", len(errors))
    for issue in errors:
        print("ERROR:", issue)
    if errors:
        raise SystemExit(1)
    print("PASS: titles, page headings, IDs, image alternatives, local paths and JavaScript syntax are valid.")

if __name__ == "__main__":
    main()
