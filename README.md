# Elham & Mohamed — Wedding Invitation

A custom bilingual wedding invitation inspired by rich ivory stationery and layered, cut-paper botanicals. It is an informational invitation only: no RSVP form, no guest account, and no guest data collection.

## Event details

- Bride: Elham Abdel Nasser
- Groom: Mohamed Mohie El Din
- Families: Al Hababoua and Al Ghazawy
- Hall: Premiere Hall
- Venue: Festival Land, New Assiut
- Time: 8:00 PM
- Maps: https://maps.app.goo.gl/SmfToVbjLVmfsbJP9
- The Quranic verse remains in Arabic in both language modes.

The wedding date was not included in the supplied details, so it is omitted until confirmed.

## Files

- `index.html` — invitation structure and SVG decorations
- `styles.css` — visual design and responsive layouts
- `app.js` — language selection and optional date formatting; no form submission or data collection
- `config.js` — optional event date
- `favicon.svg` — browser icon

## Run locally

Open `index.html` directly in a modern browser, or run a local server from the project folder:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Optional wedding date

When the date is confirmed, set `eventDate` in `config.js` to `YYYY-MM-DD`. The date will be formatted for the selected language. Leave it blank until the actual date is known.

## Design notes

- The page detects the browser language (Arabic or English) and offers a manual switch.
- Arabic and English use separate type families; the verse always remains Arabic.
- SVG paper-cut botanical artwork is authored in the project. No stock wedding template or generated flower photos are used.
- CSS includes responsive layouts for phone, tablet, and desktop, keyboard focus styles, and reduced-motion support.
- Google Fonts requires an internet connection; system serif/sans fallbacks are included.
