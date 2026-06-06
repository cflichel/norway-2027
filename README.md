# Norway 2027 Visual Review Guide — Static Website

This folder is a GitHub Pages-ready static website. It uses only HTML, CSS, JavaScript, and local image/document files. No build tools are required.

## Files

- `index.html` — the website home page
- `assets/css/styles.css` — site styling
- `assets/js/data.js` — itinerary, hotel, link, and booking data
- `assets/js/app.js` — renders the cards and search/filter UI
- `assets/img/` — local review images
- `downloads/` — the PDF and editable DOCX review guide
- `source_docs/` — the original planning PDFs used as source references
- `.nojekyll` — tells GitHub Pages to publish the folder exactly as-is

## Publish on GitHub Pages

1. Create a new GitHub repository, such as `norway-2027`.
2. Upload the contents of this folder to the repository root.
3. In the repository, go to **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and `/root` folder.
6. Save. GitHub will publish the site at a URL like `https://YOUR-USERNAME.github.io/norway-2027/`.

## Editing

The easiest edits are in `assets/js/data.js`:

- Change day-by-day text in `days`
- Change hotel candidates/links in `hotels`
- Change booking timing in `booking`
- Change transport links in `transport`

The site intentionally stays locked to the previously identified itinerary and excludes religious-building stops.
