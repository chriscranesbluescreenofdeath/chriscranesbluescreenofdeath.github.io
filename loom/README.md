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