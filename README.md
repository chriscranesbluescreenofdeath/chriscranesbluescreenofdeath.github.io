# 🏀 Oliver Crane — Road to D1

> **AGENTIC PROMPT** — Paste the block below at the start of any new Claude session to restore full context instantly.

---

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
- coaching/ folder — All coaching and film review content
  - coaching/template.html — Master template for game review pages
  - coaching/games/ — Individual game film review HTML pages

FILE NAMING CONVENTION FOR GAMES:
coaching/games/YYYY-MM-DD-opponent-name.html
Example: coaching/games/2025-05-18-west-side.html

LOCKER ROOM TAB (in index.html):
- Contains a JavaScript array called 'sessions' (search for "const sessions")
- Each session object = { date, title, subtitle, tags[], file }
- Tags: "game" (green), "coaching" (blue), "film" (gold)
- Adding a session = add an object to the array AND create the HTML file in coaching/games/

DESIGN SYSTEM:
- Colors: navy #0a1628, gold #c9a84c, dark-gray #2d3a4e, mid-gray #8a9ab5
- Font: Segoe UI / system-ui
- Style: dark, premium recruiting profile aesthetic

TODAY'S TASK: [describe what you want to add or change]
```

---

## 📁 File Structure

```
/
├── index.html                        ← Main profile page (tabbed)
├── README.md                         ← This file / agentic prompt
└── coaching/
    ├── template.html                 ← Master template — copy this for new game pages
    └── games/
        ├── README.md                 ← Folder guide
        └── YYYY-MM-DD-opponent.html  ← Individual game review pages go here
```

---

## 📋 How to Add a New Game Review Session

### Step 1 — Create the game review page
Tell Claude: "Add a game review for [date] vs [opponent]" and provide the content.
Claude will create `coaching/games/YYYY-MM-DD-opponent.html` using the template.

### Step 2 — Register it in the Locker Room
Claude will also add an entry to the `sessions` array in `index.html`:
```js
{
  date: "Month DD, YYYY",
  title: "Game vs. Opponent Name",
  subtitle: "Brief description — what was reviewed",
  tags: ["game", "film"],
  file: "coaching/games/YYYY-MM-DD-opponent.html"
}
```

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
