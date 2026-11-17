# Editorial review — 17 November 2026

## Scope and inventory

- 60 HTML files inventoried on the review branch.
- 28 legacy shortcut/redirect pages checked; every destination path exists in the repository.
- 32 substantive pages identified for editorial/content review.
- Catalogue data was checked directly in the page source for the key structured collections below. Several large pages store most of their content in JavaScript, so static visible-text extraction is not a reliable content audit by itself.

## Corrections made on this branch

1. **Animated Film Atlas** — the source array had 296 unique films although the page claimed 300. Added four documented animated features and re-counted the array: 300 rows, 300 unique titles. The added titles are *The Tale of the Princess Kaguya* (2013, Japan), *Ernest & Celestine* (2012), *The Painting* (2011), and *The Girl Without Hands* (2016, France). Film details were checked against festival, distributor and film-catalogue references:
   - https://www.nziff.co.nz/2014/film/the-tale-of-the-princess-kaguya/
   - https://cineuropa.org/en/film/219134/es/newsdetail/rl/1/
   - https://catalogue.boekman.nl/pub/P16-0389.pdf
   - https://www.filmfesthamburg.de/en/film-info/the-girl-without-hands/
2. **Complete Film Collection** — corrected the document title from 1,619 to 1,629, matching its 1,629 unique data records.
3. **1200 Manga Reading Atlas** — corrected the static initial counter from 1,000 / 1,000 to 1,200 / 1,200, matching its 1,200-record data array. The runtime filter also computes the live count from the array.
4. **Aag Ki Kavitayen** — reviewed the archive disclosure: it identifies 103 source records, 100 named titles and 3 incomplete records, and explicitly avoids inventing full poem text or individual poet attribution where the source does not verify them.

## Page-by-page inventory

### Legacy shortcuts — destinations verified

- `300_animated_films.html` — legacy shortcut/redirect
- `Big_library.html` — legacy shortcut/redirect
- `Meal_Picker_v2 (2).html` — legacy shortcut/redirect
- `The_Curators_Library.html` — legacy shortcut/redirect
- `asian_cinema_curriculum (1).html` — legacy shortcut/redirect
- `blackout_poetry_tutorial.html` — legacy shortcut/redirect
- `bob_ross_complete_guide.html` — legacy shortcut/redirect
- `cinematic-database (1).html` — legacy shortcut/redirect
- `cinematic_canon (1).html` — legacy shortcut/redirect
- `film_collection_v8.html` — legacy shortcut/redirect
- `grand_library (2).html` — legacy shortcut/redirect
- `life-fiction-curriculum.html` — legacy shortcut/redirect
- `living-curriculum-2026.html` — legacy shortcut/redirect
- `manga-1000.html` — legacy shortcut/redirect
- `manga-archive-v4.html` — legacy shortcut/redirect
- `manga-comics-master.html` — legacy shortcut/redirect
- `manga-guide.html` — legacy shortcut/redirect
- `manga-index.html` — legacy shortcut/redirect
- `manhwa300.html` — legacy shortcut/redirect
- `manhwa_300_filter_app.html` — legacy shortcut/redirect
- `marginalia-diary.html` — legacy shortcut/redirect
- `political-comics-list.html` — legacy shortcut/redirect
- `sen-mood-movies.html` — legacy shortcut/redirect
- `taboo-comics.html` — legacy shortcut/redirect
- `the-loom-tracker.html` — legacy shortcut/redirect
- `top500_adult_manga.html` — legacy shortcut/redirect
- `top500_manga.html` — legacy shortcut/redirect
- `watercolour_tasks (1).html` — legacy shortcut/redirect

### Substantive pages

- `aag-ki-kavitayen.html` — active page; included in the page inventory
- `animated-film-atlas.html` — active page; included in the page inventory
- `anime-manga-values-curriculum.html` — active page; included in the page inventory
- `asian-cinema-curriculum.html` — active page; included in the page inventory
- `blackout-poetry.html` — active page; included in the page inventory
- `cinema-obscura.html` — active page; included in the page inventory
- `cinematic-canon.html` — active page; included in the page inventory
- `curators-library.html` — active page; included in the page inventory
- `dark-ink-manga.html` — active page; included in the page inventory
- `fiction-of-living.html` — active page; included in the page inventory
- `film-and-art-library.html` — active page; included in the page inventory
- `film-collection.html` — active page; included in the page inventory
- `forbidden-pages.html` — active page; included in the page inventory
- `four-arcs-library.html` — active page; included in the page inventory
- `free-art-resources.html` — active page; included in the page inventory
- `grand-library.html` — active page; included in the page inventory
- `how-to-live.html` — active page; included in the page inventory
- `human-development-curriculum.html` — active page; included in the page inventory
- `index.html` — active page; included in the page inventory
- `joy-of-painting.html` — active page; included in the page inventory
- `loom-tracker.html` — active page; included in the page inventory
- `manga-comics-archive.html` — active page; included in the page inventory
- `manga-comics-index.html` — active page; included in the page inventory
- `manga-reading-atlas.html` — active page; included in the page inventory
- `manga-that-move.html` — active page; included in the page inventory
- `manhwa-romance-index.html` — active page; included in the page inventory
- `marginalia.html` — active page; included in the page inventory
- `meal-picker.html` — active page; included in the page inventory
- `political-comics.html` — active page; included in the page inventory
- `sensual-mood-cinema.html` — active page; included in the page inventory
- `top-500-adult-manga.html` — active page; included in the page inventory
- `watercolour-journal.html` — active page; included in the page inventory

## Data checks recorded

- Animated Film Atlas: 300 unique records after correction.
- Complete Film Collection: 1,629 records; page metadata now agrees.
- Manga Reading Atlas: 1,200 records; initial count now agrees.
- Top 500 Adult Manga: 500 list entries.
- Manhwa Romance Index: 294 records.
- Cinema Obscura: 1,124 source rows, 1,114 unique title/year pairs after deduplication; the page computes its visible total from the deduplicated array.

## Remaining verification limits

- Three very large HTML files — `film-and-art-library.html`, `grand-library.html`, and `manga-comics-archive.html` — exceed the content connector's readable response limit. Their presence and file sizes are known, but their full contents could not be inspected in this pass.
- No real browser/device session was available for rendered desktop/mobile, keyboard, filter, theme, or accessibility testing. This report does not claim visual QA or a live Pages deployment check.
- Some catalogue records still need independent source-level fact checking, especially generic/collective author attributions and long-tail titles. Do not treat a structurally valid entry as a verified bibliographic record.

## Review status

This is a documented editorial/data review pass with corrections committed to the review branch. It is not a claim that every catalogue fact or every rendered interaction has passed final human/browser QA.
