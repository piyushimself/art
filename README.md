# The Atlas — Personal Library

A personal, static library for exploring manga and comics, art, learning, cinema, technology and everyday tools.

## Browse
- Open `index.html` for the searchable library.
- Use the category filters and search field to narrow collections.
- Switch between **Grid** and **List** layouts.
- Mark collections complete with the checkboxes.
- Use the status filter to show all, completed, or unfinished collections.

## Personal progress and privacy
- Completion states and layout preference are stored in this browser's `localStorage` only.
- No account, analytics endpoint, server-side profile, or remote progress sync is used by the tracker.
- Clearing this browser's site data will clear the checklist.
- Use **Reset progress** to clear the local checklist deliberately.
- Do not use the tracker on a shared/public browser if you want your progress to remain private.

## Content and publication notes
- This is a personal index, not an endorsement of every listed work.
- Some collections may contain mature, disturbing or challenging themes; labels are provided where known.
- Respect the copyright and terms of the original creators and services linked from each collection.
- Keep credentials, private notes, personal contact details and non-public material out of this public repository.
- Review outbound links and the content of each collection before promoting the site broadly.

## Structure
- `index.html` — library home, search, filters and tracker controls.
- `assets/css/library.css` — shared reading/navigation styles.
- `assets/js/library.js` — cross-library search, contents navigation and reading progress.
- `assets/css/shelf.css` / `assets/js/shelf.js` — collection checklist, progress, status filter and list/grid view.

## Maintenance
The homepage is the catalogue of record. When adding a collection, add its card and metadata to the shared search index in `assets/js/library.js`. Keep titles descriptive, use accurate content labels, and avoid duplicating entire datasets under multiple names.
