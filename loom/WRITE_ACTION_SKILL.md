# LOOM — Write New Action skill

Version: 2026-11-18. Canonical operating rules: [LOOM Master Registry](https://docs.google.com/spreadsheets/d/13_gjX1xHgJsO4iL0fAZ3Jzp3vATS-u_Y-IMsLUagQEo/edit), tabs **Gateway**, **Status Rules**, **Skill Dispatch** and **Sources**.

This is a durable procedure used by ChatGPT LOOM sessions; it is not a separately installed connector or an autonomous job.

## Trigger
Whenever Christopher asks to add, update, close, defer, split, or group an item in LOOM, invoke this workflow. A reference document or calendar meeting is not a standalone action unless explicitly requested.

## Contract
1. **Route:** Determine CCFA, R2DX, Family or Personal, then select the canonical domain tracker from Master Registry **Sources**. Never put Family actions into Personal now that the Family tracker exists.
2. **Determine record type:** Classify as **Parent** (main outcome), **Subtask** (supporting step under a named parent) or **Reference** (information only; does not create a task). If Christopher has **not explicitly specified Parent vs Subtask**, ask: “Is this a main action item or a sub-action under [existing parent]?” before writing; do not silently assume.
3. **Search first:** Read current tracker and recent relevant inbox/sent mail, calendar and notes. Detect duplicates, existing parent IDs and latest evidence. Do not create a second parent outcome for preparatory work.
4. **Write atomically:** Preserve stable task IDs. For Parent, write a brief verb-led `Action` (ideally <100 characters), owner, status, priority, dates and source. For Subtask, write its own stable ID, `Item Type = Subtask`, and `Parent ID =` existing parent. Put detailed context, checklist, communications, evidence, and supporting links in `Notes/Details`, not the visible headline. For Reference, link the source in Resources or parent notes without adding an open task.
5. **State handling:** A parent has exactly one display bucket: Active, On Hold, Done. Keep existing tracker-specific statuses as source metadata if needed; the dashboard maps their variants to three buckets. On Hold must carry a review/activation date or an explicit indefinite/triggered hold; never count it as Today's work. When the date is reached, review evidence before moving it back to Active. Do not conflate a production milestone (such as In Production) with a user action’s status.\n6. **Authoritative schemas:** Personal `Action Items` columns R/S = Item Type/Parent ID; Family `Action Items` M/N; CCFA outreach `Action Items` R/S; R2DX `Action Items` J/K and sanitized `Loom Feed` K/L. Existing unspecified records are Parents unless deliberately reclassified. Preserve domain-specific completed/hold definitions.
7. **Subtask presentation:** Child records belong beneath the parent. In the Personal tracker use row grouping, collapsed by default. For other trackers, group where safe without breaking formulas; the LOOM dashboard **must** filter Subtasks out of root rows and show them in parent Details. Never present every child step as a separate main line item. List active parents first, followed by a separate On Hold section; Done only on request. Dates or blockers may be summarized in parent headline without duplication.
8. **Inbox/outbox reconciliation:** For all active waiting-for-reply actions, search both inbox and sent mail over the entire interval since the last successful verified scan, and search sender, recipient and subject/thread directly. Read relevant full threads; a forwarded reply counts as an arrival. Example: Nathan replied 2026-11-12, so “wait for Nathan” was stale. Replace with the new actionable decision when authorized; otherwise flag exact discrepancy.
9. **Evidence gate:** A sent draft is not sent; paid/booked/complete requires service evidence or explicit user confirmation. Do not claim verified external payment from user confirmation alone. Do not change unrelated rows.
10. **Verify:** Read the edited source row and confirm correct ID, title, status, Item Type, Parent ID, source link, dates and Notes. Refresh/read the dashboard source or deployment, and check a closed parent is one line; its children should appear only on click.
11. **Brief reply:** Report precise changed parent and child rows and link to the authoritative tracker. State blockers, rather than claiming unverified web deployment or live feed.

## Native trackers
- [Personal](https://docs.google.com/spreadsheets/d/1ZL80iKDwNCRDo3SRdPeYg1JKbSlyfhpwUKjKWO51D1c/edit)
- [Family](https://docs.google.com/spreadsheets/d/1GI3t9C279FvJVw5Izg0vDdAR-GwZknGqCCDeLOHLP1E/edit) — private authenticated read, **no public CSV**.
- [R2DX](https://docs.google.com/spreadsheets/d/1lcGTcAS3Tb6lKkyCqJ8VBn3wu9wjHvZaGHPHdzD55a4/edit)
- [CCFA designer and architect outreach](https://docs.google.com/spreadsheets/d/1d7b115EtSw0Rh5C1FpwnSA1qa8ipTJlzhuvd8ov4Kp8/edit)
- [Humanaut](https://docs.google.com/spreadsheets/d/1V3aD7mDJf9qfIcbV_1CChzdb-XqLq7lsOhHx8kqOtFQ/edit)

## Daily audits
Both **Chief of Staff Morning Plan** and **Chief of Staff Day Close** automation prompts mandate the same parent/child UX and reconciliation checks. Change both prompts together if the procedure is revised. Root list = Parents only; due children are not dropped from review, but remain in expanded Details and parent next action.
