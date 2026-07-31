# HIPAA HERO — Retro Arcade Annual Compliance Trainer

A fully static, browser-based HIPAA compliance trainer for clinic staff. No backend, no database, no login, no build step. Open `index.html` and it runs.

**Created By Sbas info LLC 2026**

---

## Quick start

There are two ways to run this. Pick based on what you're doing.

| | Use it when | Caveat |
|---|---|---|
| **`index.html`** | Hosting the site, or editing content | Needs `css/`, `js/`, and `data/` sitting beside it — the whole folder must travel together |
| **`hipaa-hero-standalone.html`** | Emailing it, testing it, putting it on a USB stick | Regenerate it after content edits (`node build-standalone.js`) |

**Important:** `index.html` is *not* a standalone file. If you copy it somewhere on its own, its stylesheets and scripts can't load and the page renders as unstyled text. It detects this and shows an explanation rather than failing silently — but the fix is either to open it from inside the complete folder, or to use the standalone build.

The standalone file has everything inlined and no external references at all, so it works from anywhere.

### Deploying

Upload the whole folder as-is:

| Host | Steps |
|---|---|
| GitHub Pages | Settings → Pages → deploy from branch root |
| Netlify | Drag the folder onto the Netlify dashboard |
| Cloudflare Pages | Connect the repo, leave the build command empty, output directory `/` |
| Internal server | Copy the folder into any web root |

---

## File structure

```
index.html                   All screens live here; one entry point
hipaa-hero-standalone.html   Generated single-file build (see Quick start)
build-standalone.js          Optional; regenerates the file above
css/
  styles.css                 Reset, design tokens, layout, typography
  arcade.css                 The 8-bit skin: panels, buttons, HUD, tiles, badges
  animations.css             All motion, plus the reduced-motion kill switches
js/
  storage.js                 Every localStorage read/write
  quiz.js                    Quiz engine — pure logic, no DOM
  ui.js                      Rendering, sound, effects
  app.js                     Routing and wiring
data/
  questions.js               57 questions  ← edit this
  modules.js                 10 modules of learning cards  ← edit this
  glossary.js                36 glossary terms  ← edit this
assets/                      Placeholder folders for icons, images, sounds
README.md
```

---

## Editing content

**All content changes happen in `data/`. You never need to touch the JavaScript in `js/`.**

### Adding a question

Open `data/questions.js` and append an object to the array:

```js
{
  id: 100,                      // unique; never reuse a retired id
  category: "privacy",          // must match a module id in data/modules.js
  difficulty: "Medium",         // "Easy" | "Medium" | "Hard"
  type: "mc",                   // "mc" | "tf" | "multi" | "scenario"
  question: "Your question text?",
  answers: ["Option A", "Option B", "Option C", "Option D"],
  correct: 2,                   // index — or [0,2,3] for type "multi"
  explanation: "Why this is the right answer.",
  reference: "Privacy Rule — minimum necessary",
  tags: ["privacy"]
}
```

Question types:

- **`mc`** — one correct answer. Options are shuffled on every attempt.
- **`tf`** — answers must be exactly `["True", "False"]`. Never shuffled.
- **`multi`** — select all that apply. `correct` is an array. Graded all-or-nothing; there is no partial credit, deliberately.
- **`scenario`** — same mechanics as `mc`, labelled differently in the UI.

Category ids in use: `basics`, `phi`, `privacy`, `security`, `rights`, `data`, `email`, `physical`, `cyber`, `reporting`.

### Adding a module

Append to `data/modules.js`. The `id` you choose becomes a valid `category` for questions. Give each new module at least four questions so its mini quiz can fill.

### Adding a glossary term

Append to `data/glossary.js`. Entries are sorted alphabetically at runtime, so order in the file doesn't matter. Every string in `related` should match another entry's `term` exactly.

After editing anything in `data/`, run `node build-standalone.js` to refresh the standalone file. The modular version picks up changes immediately with no build step.

---

## Tuning the exam

All knobs live in one place — `CONFIG` at the top of `js/quiz.js`:

```js
passMark:         80,     // percent required to pass
examLength:       30,     // questions drawn for the final exam
practiceLength:   10,     // questions per practice round
moduleQuizLength:  4,     // questions in a module mini quiz
basePoints:      100,     // points per correct answer
speedBonusMax:    50,     // max speed bonus
speedWindowMs: 12000,     // answer within this window to earn it
comboStep:      0.25,     // multiplier gained per consecutive correct
comboMax:          3      // multiplier ceiling
```

Bump `APP_VERSION` in `index.html` whenever training content changes materially. HIPAA logs must tie back to the specific curriculum version a learner completed, and the version is printed on the completion record.

---

## How it behaves

**Randomization.** Questions are drawn at random from the bank and answer options are shuffled on every attempt, so repeat takers can't memorize positions. True/False options stay in their natural order.

**Explanations.** Practice rounds and module mini quizzes show the explanation and its source citation immediately after each answer. The final exam withholds all feedback until completion, then surfaces every missed question with its explanation on the Review screen.

**Scoring.** 100 points per correct answer plus a speed bonus, multiplied by a combo that grows with consecutive correct answers up to x3. Grades run S / A / B / C / D / F with a matching rank.

**Accessibility.** Full keyboard navigation (`A`–`D` to answer, `Enter` to submit and advance), visible focus rings, large touch targets, high contrast, screen-reader announcements via an ARIA live region, and a reduced-motion mode. The OS-level `prefers-reduced-motion` setting is always respected regardless of the in-app Animations toggle.

**Sound.** Off by default. Tones are synthesised with the Web Audio API, so the project ships with no binary audio assets.

### How progress is stored — read this before rollout

Module completion, best score, best points, highest streak, attempt count, and achievements persist in the browser's `localStorage`. A module is marked complete only when its mini quiz scores 80% or higher.

What that means in practice:

- Progress is tied to **one machine and one browser profile**. Chrome and Edge keep separate records.
- Clearing browsing data wipes it. Incognito loses it when the window closes.
- Progress does not travel with the folder. Moving the files to another machine starts staff fresh.
- **It is per-browser, not per-person.** On a shared workstation with one login, everyone shares a single progress record — and whoever entered their name last is the name on the next certificate.

**Local progress is a convenience feature, not your audit trail.** It exists so someone can close the browser after module 4 and resume at module 5. The record that satisfies your six-year retention requirement is the printed completion certificate: name, role, curriculum version, score, date, and signed attestation.

No PHI is ever stored. The only personal data is the learner's own name and role, which they enter themselves.

---

## Two design decisions worth knowing

### 1. Data files are `.js`, not `.json`

The original spec called for `questions.json`. Browsers block `fetch()` of local files under the `file://` protocol for security reasons, which would have meant the app only worked when served from a web server — breaking the "everything runs by opening index.html" requirement.

So the data files declare plain JavaScript arrays and load via `<script>` tags. The maintenance story is identical — the content is still plain data with no logic mixed in, and you still only edit `data/`. If you later decide to always serve the app over HTTP, converting to real `.json` plus `fetch()` is a contained change in `app.js`.

### 2. Email notifications and spreadsheet sync need a backend

The spec asks for management to receive an email on completion and for a spreadsheet to track completions. **A purely static site cannot do this.** There is no server to send mail from, and any API credentials embedded in client-side JavaScript would be readable by every user — which is itself a security problem in a HIPAA context.

Today the app produces a printable completion record that staff save as PDF or print and sign. That satisfies the documentation requirement: name and role, date completed, module name, test score, and signature.

See "Parked work" below for how to add automated tracking.

---

## Parked work

Not built yet. Listed here so the context isn't lost.

### 1. Module 10 contact details — **blocks rollout**

`data/modules.js`, first card of the `reporting` module, marked with `>>> EDIT THIS CARD BEFORE ROLLOUT <<<`. Twelve `[BRACKETED]` placeholders to replace:

- HIPAA **Privacy Officer** — name, title, phone, email
- HIPAA **Security Officer** — name, title, phone, email
- **Compliance hotline** — number and hours
- The exact steps to **report a suspected breach**
- How staff handle a **patient records request**
- How staff route a **patient privacy complaint**

If one person holds both officer roles — common in smaller FQHCs — put the same name on both lines rather than deleting one. The roles carry different duties and an auditor will look for both to be addressed.

The placeholders are deliberately left visible on screen. Ship without filling them in and staff see `[NAME]`, which is a louder reminder than a blank space.

Generic HIPAA content is not sufficient on its own. The source guidance requires training to name the individuals currently holding these roles and the exact internal reporting channel.

### 2. Per-person progress on shared workstations

**Problem:** progress is stored per browser profile, so a shared front-desk terminal collides everyone's records into one.

**Fix:** a profile picker on the home screen. Namespace the `localStorage` key by learner (`hipaaHero.v1.<slug>`) and add a "switch user" control. Contained change — `js/storage.js` plus a small home-screen UI addition. Nothing else needs to move.

**Skip it if** staff each train at their own workstation.

### 3. Automated completion tracking

Replaces the manual print-and-file step with a real audit trail. Any of these is a single `fetch()` on the results screen; none require restructuring the app.

| Option | How it works | Trade-off |
|---|---|---|
| **Google Apps Script** | Publish a Sheet-bound script as a web app; the results screen POSTs name, role, score, and date to it | Free, no server to run; the endpoint URL is public, so treat it as write-only and validate on the Sheet side |
| **Form service** (Formspree, Basin) | POST the same fields to a hosted endpoint that emails management and logs submissions | Free tier usually caps monthly submissions |
| **Serverless function** | A Cloudflare Worker or Netlify Function that writes to a sheet or database and sends mail | Most control and the best audit trail; requires someone to maintain it |

Whichever you pick, the printed certificate should stay as a fallback. A network failure should never cost someone their proof of completion.

---

## Verification performed

The build was checked programmatically before delivery:

- **Data integrity** — no duplicate ids, every `category` resolves to a module, all `correct` indices in range, no duplicate answer text, every question carries an explanation and a source reference, every glossary `related` term is itself defined.
- **Engine simulation** — ~3,000 randomized trials confirming the answer key correctly follows its option through shuffling; perfect runs, zero runs, and the exact 80% pass boundary; partial and superset multi-select both grading as wrong; double-submit guard; combo ceiling; streak reset.
- **End-to-end walkthrough** — the real application code driven through boot, routing, glossary search, settings, a full module walkthrough, a mini quiz, a 30-question final exam confirming feedback is withheld, results, review, certificate, and progress reset.
- **Standalone build** — booted and played a full round using only its own inlined content, with zero external file references.

One real bug was found and fixed during this pass: a shallow copy in `storage.js` let saved state share array references with the defaults, which meant "Reset All Progress" appeared to succeed but left module completions and achievements intact.

---

## Content sources

All questions, learning cards, and glossary entries are drawn from the supplied HIPAA source material: the Privacy Rule, Security Rule, and Breach Notification Rule summaries, the FQHC-specific policy guidance, and the training documentation and retention requirements. Every question cites its source in the `reference` field, which appears with the explanation.
