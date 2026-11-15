# LOOM Daily Action & Display Skill — operating contract

Effective 2026-11-15. Canonical instructions live in [LOOM Master Registry](https://docs.google.com/spreadsheets/d/13_gjX1xHgJsO4iL0fAZ3Jzp3vATS-u_Y-IMsLUagQEo/edit), tabs **Gateway** and **Status Rules**. This repository file is a durable implementation reference; it does not independently install a ChatGPT plugin or grant access.

## Non-negotiable UX contract
- Every parent outcome appears as **one short, verb-led single-line headline** in LOOM's action table. Prefer <=100 characters. Keep the title/next-action headline distinct from all notes.
- Closed by default. Clicking the **whole row** or Details reveals full next action, notes, checklist, communication history, dependencies, sources and any private material fetched by authenticated access.
- Long legacy tracker descriptions must be **shortened for preview only**, never deleted. On mobile/desktop, prevent row text wrapping and show ellipsis; no description blocks in the default list.
- Retain all open parent actions in morning and day-close review. Summarize each in one line, with date, owner and source where appropriate. Never turn notes or preparation steps into extra parent actions.
- Writers of canonical trackers: title or Action/Deliverable = short outcome; Next Action = one specific step; supporting narrative = Notes/Details. Never cram several paragraphs into the dashboard-facing field.
- Day planning may group Today vs Other, but must not duplicate or expand child items. The dashboard remains read-only; tracker ownership, privacy and authorization rules are unchanged.

## Enforcement points
1. Source of truth: Master Registry Gateway + Status Rules.
2. Daily automatic tasks: **Chief of Staff Morning Plan** and **Chief of Staff Day Close** both have the same one-line display and writing instruction.
3. UI: `loom/index.html` function `actionPreview`, row builder, row click handler and compact mobile/desktop CSS. Render long tracker data in Details only.
4. Verification: inspect live tracker-fed rows, especially long multi-sentence Humanaut/CCFA/Personal entries. Confirm default row is one line and click-to-expand works on both screen sizes.

## References
- [Dashboard](https://chriscranesbluescreenofdeath.github.io/loom/)
- [Source](https://github.com/chriscranesbluescreenofdeath/chriscranesbluescreenofdeath.github.io/blob/main/loom/index.html)
- [Master Registry](https://docs.google.com/spreadsheets/d/13_gjX1xHgJsO4iL0fAZ3Jzp3vATS-u_Y-IMsLUagQEo/edit)

## New action intake and child hierarchy

For any add/edit/move/close of an action, read [WRITE_ACTION_SKILL.md](WRITE_ACTION_SKILL.md). Classify Parent vs Subtask explicitly; if the user has not identified which, ask before creating the new action. Use `Item Type` and `Parent ID` fields. A single parent should appear in the closed dashboard list; its child steps expand beneath it. Check outstanding replies against **inbox and sent** before preserving any 'waiting for reply' status.
