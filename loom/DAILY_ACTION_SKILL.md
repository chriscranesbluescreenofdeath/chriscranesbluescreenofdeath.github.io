# LOOM Daily Review Runbook
Version: **2.0** · Effective 2026-11-15
Status: authoritative **procedure for LOOM daily reviews**, referenced by all four scheduled automations. This Markdown file is an operating specification, not executable code or a standalone installed plugin.

## Input
`mode`: `morning` | `midmorning` | `afternoon` | `close`.
`timezone`: America/Chicago.
`registry`: [LOOM Master Registry](https://docs.google.com/spreadsheets/d/13_gjX1xHgJsO4iL0fAZ3Jzp3vATS-u_Y-IMsLUagQEo/edit), tabs Sources, Gateway, Status Rules, Skill Dispatch.
`last_successful_audit`: most recent verified check-in timestamp; if unknown, use a bounded lookback plus targeted searches for ALL waiting replies, report the gap. Never assume a past run succeeded.

## State ownership
- Google Sheets **domain action trackers** are authoritative for action IDs, parent IDs, status, dates, owner, and next steps.
- The registry maps domains to canonical sources. No old duplicate trackers. Check the Humanaut Tracker explicitly; the Family action tracker is private and must not be replaced with a public CSV.
- Gmail inbox **and sent** (Christopher and Oliver, where connected) and Calendar are evidence sources, not substitutes for trackers. Do not claim a source was checked if unavailable.
- LOOM dashboard is **read-only**. The Session Log records reviews, not proof a transaction was completed.
- Do not alter action/status without explicit authorization; the user's direct request to mark an item complete or update a tracker authorizes that specified edit, not unrelated edits.

## Execute exactly in this order
1. **LOAD:** Resolve enabled domain sources through registry. Read current action records, status, Item Type, Parent ID, Today flag/order, due/review date and source references. Record failed sources.
2. **MAIL DELTA:** Search inbox AND sent for changes since last verified audit across connected relevant accounts. Read actual matching threads. For **every** waiting-on-reply parent or child, also search the named sender/recipient/subject/thread independently without assuming it appears in the recent delta. A response or forwarded reply supersedes a stale "waiting" note.
3. **CALENDAR:** Read relevant nonroutine events and conflicts for the review horizon. Match invitations/RSVPs against action records; don't request an RSVP already confirmed.
4. **RECONCILE:** Match each material message/event to a task ID (or flag unmatched commitments). Compare timestamped evidence with current recorded status and next step. Do not turn "draft" into "sent", "quoted" into "approved", or user-reported payment into provider-verified payment. Where authorization permits, update **only** affected authoritative rows and read them back. Otherwise present a clearly identified proposed correction.
5. **HIERARCHY:** Root list = `Item Type=Parent` (missing type only for legacy rows). `Subtask` requires Parent ID and appears only inside expanded parent Details, never as a second root item. Include pending child deadlines inside parent detail and compact parent signal. `Reference` is non-action. If a new requested action is not classified and the relationship is unclear, ask Parent vs Subtask before writing; use [Write Action procedure](WRITE_ACTION_SKILL.md).
6. **PRIORITIZE:** Keep all open parent outcomes in trackers. Construct the short Today sequence by explicit Today/order, due date, verified new blockers, and user priorities. Deferred/On Hold actions remain parked until their recorded activation conditions. No duplicates and no fabricated dates.
7. **REPORT:** Each parent has **one concise, verb-led visible headline** (ideally <=100 characters), owner/date/status/link where available. Never paste emails or multi-paragraph notes into the collapsed list. Expand only for requested detail, conflict, and decision. State unverified evidence or inaccessible source plainly.
8. **VERIFY/LOG:** Check that edited rows persist, the root/child count is right, no stale "awaiting reply" language survives a verified reply, and no sensitive data is published. For `close` mode, append/update ONE dated row in Master Registry Session Log, not a new diary/project.

## Mode output
| Mode | Deliverable |
| --- | --- |
| `morning` (8 AM) | Three concrete outcomes; Today ordered sequence; deadlines/meetings; waiting decisions; compact outstanding parent register. |
| `midmorning` (11 AM) | Only material changes since morning; next work block; blockers. No reprint of full register unless requested. |
| `afternoon` (2 PM) | Remaining outcomes; new replies and changed commitments; next decision. No reprint of unchanged actions. |
| `close` (5 PM) | Completed (evidence level), waiting/blocked, tomorrow's top three, calendar conflicts; update Session Log once. |

## Acceptance tests, each run
- [ ] All required sources either read or explicitly flagged unavailable.
- [ ] Both inbox AND sent searched; targeted reply search performed for every waiting task.
- [ ] No stale "waiting for Nathan" if the November 12 email is present (regression example, not a permanent active task).
- [ ] Each root row is one line; LASA basketball has one parent, child steps underneath.
- [ ] Unchanged work not repeated in 11 AM / 2 PM summaries.
- [ ] No new writes/sends/bookings outside user authorization.
- [ ] Closeout logs one row and verifies persistence, or reports failure.

## Exceptions
If source access fails: **do not infer "no replies" or task completion**. Use the last verified state as *stale*, flag missing evidence, and request reconnection where needed. Preserve IDs and context. If the runbook cannot be opened, perform only a bounded safe review and explicitly report that procedure verification failed; never silently substitute historical ad hoc prompts.

## Other procedures
- [Write / modify action](WRITE_ACTION_SKILL.md)
- [Dashboard](https://chriscranesbluescreenofdeath.github.io/loom/)
- [LOOM repository reference](README.md)
