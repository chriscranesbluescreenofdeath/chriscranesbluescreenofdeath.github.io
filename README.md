# 🏀 Oliver Crane — Road to D1

> **AGENTIC PROMPT** — Paste the block below at the start of any new Claude session to restore full context instantly.

---

## ⚡ Quick-Start Prompt (copy & paste at the start of each chat)

```
I'm building a GitHub Pages recruiting site for my son Oliver Crane, a 6'3" 180 lb versatile wing (SF/SG), Class of 2028, strong academic student on his road to D1 basketball.

Repo: https://github.com/chriscranesbluescreenofdeath/chriscranesbluescreenofdeath.github.io
Live site: https://chriscranesbluescreenofdeath.github.io

ARCHITECTURE:
- index.html — Main recruiting profile page with tabbed navigation
  Tabs: Profile | Stats | Highlights | Film Room | Schedule | Locker Room
- reviews/ folder — Individual coaching/game film review pages
  Template: reviews/template.html
  Naming convention: reviews/YYYY-MM-DD-opponent-or-event.html

LOCKER ROOM TAB (in index.html):
- Contains a JavaScript array called 'sessions' (around line 430)
- Each session = { date, title, subtitle, tags[], file }
- Tags can be: "game", "coaching", "film"
- Adding a session = add an object to the array + create the corresponding HTML file in reviews/

DESIGN SYSTEM:
- Color palette: navy #0a1628, gold #c9a84c, dark-gray #2d3a4e, mid-gray #8a9ab5
- Font: Segoe UI / system-ui
- Style: clean, dark, premium recruiting profile aesthetic

TODAY'S TASK: [describe what you want to add or change]
```

---

## 📁 File Structure

```
/
├── index.html              ← Main profile page (tabbed)
├── README.md               ← This file / agentic prompt
└── reviews/
    ├── template.html       ← Template for new review pages
    └── YYYY-MM-DD-name.html  ← Individual session review pages
```

---

## 📋 How to Add a New Coaching/Game Review Session

### Step 1 — Create the review page
Copy `reviews/template.html` and save as `reviews/YYYY-MM-DD-opponent.html`.
Fill in the stats, video embed, coaching notes, and film breakdown plays.

### Step 2 — Register it in the Locker Room
Open `index.html` and find the `sessions` array (search for `const sessions`).
Add a new object:
```js
{
  date: "Month DD, YYYY",
  title: "Game vs. Opponent Name",
  subtitle: "Brief description — what was reviewed",
  tags: ["game", "film"],
  file: "reviews/YYYY-MM-DD-opponent.html"
}
```
Tags available: `"game"` (green), `"coaching"` (blue), `"film"` (gold)

---

## 👤 Player Info

| Field | Value |
|-------|-------|
| Name | Oliver Crane |
| Position | Small Forward / Shooting Guard |
| Height | 6'3" |
| Weight | 180 lbs |
| Class | 2028 |
| School | TBD |
| Location | TBD |

---

## 🔗 Links

- **Live site:** https://chriscranesbluescreenofdeath.github.io
- **GitHub repo:** https://github.com/chriscranesbluescreenofdeath/chriscranesbluescreenofdeath.github.io
