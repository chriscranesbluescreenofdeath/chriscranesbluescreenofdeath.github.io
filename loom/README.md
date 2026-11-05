# The Loom — project reference

## Canonical location

- GitHub repository: https://github.com/chriscranesbluescreenofdeath/chriscranesbluescreenofdeath.github.io
- Dashboard source: `loom/index.html` on the `main` branch
- Live dashboard: https://chriscranesbluescreenofdeath.github.io/loom/
- Main site `index.html` is Oliver's recruiting site, not The Loom.

## Data architecture

- The Loom is a GitHub Pages static site that reads project tracker data through published CSV feeds, configured in The Loom — Master Registry: https://docs.google.com/spreadsheets/d/13_gjX1xHgJsO4iL0fAZ3Jzp3vATS-u_Y-IMsLUagQEo/edit
- Personal tracker: https://docs.google.com/spreadsheets/d/1ZL80iKDwNCRDo3SRdPeYg1JKbSlyfhpwUKjKWO51D1c/edit
- R2DX recruiting tracker: https://docs.google.com/spreadsheets/d/1lcGTcAS3Tb6lKkyCqJ8VBn3wu9wjHvZaGHPHdzD55a4/edit
- Humanaut tracker: https://docs.google.com/spreadsheets/d/1V3aD7mDJf9qfIcbV_1CChzdb-XqLq7lsOhHx8kqOtFQ/edit
- Designer and Architect outreach tracker: https://docs.google.com/spreadsheets/d/1d7b115EtSw0Rh5C1FpwnSA1qa8ipTJlzhuvd8ov4Kp8/edit

## Current dashboard direction

- Horizontal domain navigation (Overview, CCFA, R2DX, Family, Personal), with consistent per-domain sections and independent filtering.
- The Overview should include an upcoming seven-day agenda at its bottom. Read connected Google Calendar, omit everyday recurring routines (e.g., Ava school drop-off), retain nonroutine appointments and meaningful calendar events, and flag overlaps.
- Do not expose private calendar credentials or OAuth tokens in client-side HTML or published CSV. A private Calendar integration needs an authenticated backend or a deliberate published/sanitized calendar feed.

This file is the durable project pointer for future sessions. Read it before changing The Loom.
## Calendar integration (implemented November 4, 2026)

- `loom/calendar.js` adds an **Upcoming this week** section before the footer in `loom/index.html`.
- It reads the signed-in user's accessible Google Calendars in the browser with Google Identity Services (`calendar.readonly`) and Google Calendar API. It displays a rolling 7-day agenda, links to original events, excludes routine daily school-drop-off activities, and flags overlapping timed events.
- **One-time setup required**: create a Google Cloud OAuth 2.0 **Web application** client, enable Google Calendar API, configure OAuth consent/test user, and authorize JavaScript origin `https://chriscranesbluescreenofdeath.github.io`. In the dashboard click **Settings**, enter the client ID, save, then click **Connect Google Calendar**. Authorization is per browser/session and may need refreshing.
- Calendar access granted to ChatGPT does **not** authorize a separately hosted static GitHub Pages site.
- The OAuth client ID is saved in the local browser only. Access tokens are kept in memory and event data is never committed to GitHub or written to published Sheets. Do not put OAuth client secrets or private ICS feed URLs in this repository.
- This integration is deployed in source but cannot display live events until OAuth has been configured and authorized by the owner. Test Google Cloud OAuth consent settings before announcing end-to-end completion.
