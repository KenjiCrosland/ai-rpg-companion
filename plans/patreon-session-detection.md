# Patreon session detection (the real fix for "I pledged but nothing unlocked")

**Trigger:** the next report of a patron who cannot activate premium; any
work on the premium gate, the upsell surfaces, or `data-premium`; or any
feature that needs to know whether the visitor is signed in.

## The problem

`premium` reaches the Vue apps exactly once, as `data-premium` on `#app`,
stamped by `kenji_tool_shortcode` at page render
(`wordpress/kenji-premium-gate.php`). The apps read it in
`src/entries/base.js` and never ask again.

That flag collapses two very different visitors into one:

- a free user who has never pledged, and
- an **active patron who is simply logged out** of cros.land.

Both get `premium="false"`, so both see the full upsell pitch. The patron
is being asked to buy something they already pay for, with no indication
that the fix is to sign in. That is the reported failure (2026-09-24).

## What already exists

`kenji-premium-gate.php` registers `GET /wp-json/kenji/v1/auth-status`,
returning `{ logged_in, premium }` with `permission_callback =>
__return_true`. **Nothing in the app calls it.** It was built for this and
left unwired.

`logged_in` is the missing bit: it separates the two cases above.

## What shipped instead (2026-09-24, interim)

Two labelled paths on every upsell surface (`PatreonCallout.vue`,
`DataManagerModal.vue`), because one button cannot serve both readers:

- **"Support on Patreon"** → `patreonTiersUrl`, new tab. The pledge page.
- **"Already a patron? Log in ..."** → `buildPatreonLoginUrl()`, same tab
  (it redirects back; a new tab would leave the original holding a stale
  logged-out flag). The only flow that creates a session here.

Both URLs are owned by `PatreonCallout` rather than passed in, and both
live in `src/util/patreon-urls.mjs`. Before this, thirteen call sites
passed the login flow as the CTA's destination — so a button labelled
"Support on Patreon" skipped the pledge page entirely — and
`ToolSuiteShowcase` passed a third hardcoded campaign URL.

Analytics fire `patreon_login_click` separately from `patreon_click`, so
the split between activation intent and pledge intent is measurable.

The sign-in line is unconditional — it shows to everyone who sees an
upsell, because the app cannot currently tell who needs it. It works, but
it spends a line of upsell real estate on every free user to rescue the
subset who are patrons. That is what the fix below removes.

## The fix

Call `auth-status` on mount and branch the upsell on the result:

| `logged_in` | `premium` | What the surface should do |
|---|---|---|
| false | false | Show the pledge CTA **and** the sign-in line (today's behaviour). |
| true | false | Signed in, no qualifying pledge. Show the pledge CTA, **drop** the sign-in line — it is noise and mildly insulting. |
| true | true | Suppress the upsell entirely. |

Notes for whoever picks this up:

- **Don't block first paint on it.** Render from `data-premium` as now,
  then reconcile when the fetch resolves. The endpoint is uncached and
  cheap, but a network hop must never gate the tool.
- **A `logged_in: true, premium: false` response is also the signal for a
  lapsed patron.** Worth different copy eventually ("Your pledge isn't
  active") but don't build that until someone asks.
- **`premium` from this endpoint should win over `data-premium`** once it
  arrives. They can legitimately disagree: the page was cached, or the
  user signed in in another tab.
- The premium flag drives real gating (`can-generate-statblock.mjs`,
  `can-generate-cross-tool.mjs`), so flipping it late in the page
  lifecycle needs a look at anything that read it eagerly.

## Why it was deferred

Scope. The 2026-09-24 session was asked for the copy fix, the shared URL
helper, and the modal dead-end fix. Wiring a network call into every
tool's mount path, making `premium` reactive, and re-checking every
consumer of the flag is a separate change with its own test surface.
