# 0015 — What the evidence actually says about learning a codebase you intend to rebuild

Date: 2026-08-19
Subjects touched: `notchtap-tauri` (active), and the whole workspace's method

## What happened

The user rejected being told what his own words implied and asked for something harder:
*research what the right way to learn and design actually is, and plan according to that.*

Three agents were fanned out. One verified the Tauri and Motion reading list against the live
docs. Two searched the learning-science and software-engineering literature. The findings
changed the plan, and they contradicted both of us.

## The finding that changed the plan

**Front-loading documentation is not a research-backed sequence.** No study was found showing
that a reading phase before hands-on work improves later comprehension or modification
success. Two directly relevant results:

- Dagenais et al. (ICSE 2010, 18 newcomers at IBM): asked what most helped them come up to
  speed, **half** named being able to compile and run the product. Participants "learned more
  efficiently by experimenting with the code than by attending courses or reading
  documentation." Reading general documentation up front was "seldom ideal."
- Begel & Simon (ICER 2008, eight new Microsoft developers shadowed for months): heavy
  documentation reading was typically a **symptom of being blocked**, not a strategy. One
  subject said so about himself.

And "start with the big picture" is close to backwards for unfamiliar code. Top-down
comprehension is *available only to those who already hold the domain schemas*
(von Mayrhauser & Vans; Soloway & Ehrlich). A newcomer falls back to bottom-up whether they
intend to or not, and bottom-up needs a running program as its anchor.

## The finding that changed who I am teaching

**The user is a senior web developer.** He said so plainly when I had been pitching React
explanations at him.

The expertise reversal effect is measured in both directions (2025 meta-analysis, 60 studies,
5,924 participants): high-assistance instruction helps low-prior-knowledge learners
(d = 0.505) and **hurts** high-prior-knowledge learners (d = -0.428). So explaining React to
him was not wasted effort, it was negative effort.

This splits the codebase for teaching purposes, and the split is now in `plan.html` and
`NOTES.md`:

| Half | He is | So |
|---|---|---|
| React, TypeScript, Motion, CSS | Fluent | Point at things. Do not explain them. Reading-first is fine here — he has somewhere to put it. |
| Rust, Tauri, the boundary, native macOS | Novice | Teach properly. Reading alone here tends to produce confident wrong beliefs. |

That split is the honest answer to his question, and it is neither "you're right" nor
"do what I said."

## What we adopted

**The sandwich — guess, read, run.** One line of prediction before opening anything, then
read, then run something that can falsify it. Costs about a minute. Stacks three separately
measured effects: pretesting (g = 0.66 on the asked-about item), generation (d = 0.40), task
feedback (d = 0.48). He named it and liked it; it is now a standing instruction in `plan.html`.

**Explain, never narrate.** Fox, Ericsson & Best (*Psychological Bulletin* 2011, 94 studies,
~3,500 participants): plain think-aloud has an effect on accuracy indistinguishable from zero
(r = -.03). Only *describing or explaining* is reactive and raises performance. So every quiz
prompt is "explain why", never "say what". This also means rubber-duck debugging's active
ingredient is the explaining, not the duck — and unlike a duck, a person can tell you you
are wrong.

**Incremental over big-bang.** He wanted to "redesign pretty much the entire application".
Practitioner consensus is strong against that (Spolsky; Fowler's strangler fig), and the
feedback literature adds an independent reason: a months-long rewrite is a feedback loop
measured in months, which is the worst possible arrangement. Replace one slice at a time
with the app running throughout.

## The teaching-relevant part

**The feeling of a good session is not evidence of one.** Deslauriers et al. (PNAS 2019)
randomly assigned students to active or passive instruction with identical content. The
active group **learned more and felt they had learned less**. Felt learning was inversely
related to actual learning. A polished lesson page is the passive condition. Everything in
this workspace is therefore built to feel slightly worse than it is, and that is on purpose.

**Familiarity without comprehension is the highest-risk state.** He commissioned this code,
so parts of it will feel recognisable. Recognition is precisely the cue that produces the
fluency illusion. "I have seen this before" and "I understand this" are different, and the
first one impersonates the second.

**Check whether a correction is needed before making it.** Three things I "corrected" on his
reading list were voice-transcription artefacts, not misunderstandings. He had it right; the
transcript dropped words. Recorded in `NOTES.md` as a standing caution.

**Autonomy is his, and I took it once.** I told him to run the dev server before reading
anything. He answered: "Do not make decisions for me please!" The correct shape is evidence,
then a recommendation, then his call. He chose to read first having heard the argument
against it. That is a legitimate choice, and for the frontend half it is also the right one.

## Practices that have less evidence than their reputation

Worth knowing so we do not build on sand:

- **Deliberate practice as a framework.** Macnamara et al.: explains 26% of variance in games,
  4% in education, under 1% in professions. The original 1993 violinist study's central claim
  failed to replicate. The *feedback* component survives on the feedback literature's own
  evidence, not Ericsson's.
- **Rubber-duck debugging.** No peer-reviewed study exists. The circulating statistics trace
  to blog posts with no source.
- **"Look for beacons."** Recall experiments found experts recall beacon lines far better than
  non-beacon lines; novices do not. Beacons are a reward for having schemas, not a route to
  getting them.
- **Diagramming as a learning intervention.** Well established that developers do it, not
  established that it beats not doing it. Real developer sketches are informal, code-level and
  short-lived — 8.5% were kept permanently in one study.
- **The `good first issue` label.** Newcomer merge rates fell from 61.9% to 42.2% over four
  years. Two independent studies conclude the mentoring around the task carries the effect,
  not the label.

## One concrete technique worth more than a lesson page

To find where something lives: **set breakpoints in plausible places without reading them
first**, exercise the feature, and see which fire. If none do, move the breakpoints. Observed
in professionals repeatedly; answers the newcomer's dominant question ("where do I start?")
empirically, in about two minutes, with no prior understanding of the code required. In one
study, participants spent several minutes reading to trace a data flow and **ended up with the
wrong answer**, where the debugger would have answered it immediately.

## Decisions

- His order stands: read first, then run. It is his call, and it is defensible for the half of
  the codebase he already knows.
- The reading list is markdown, not HTML. `NOTES.md`'s "HTML only" rule is revised: HTML for
  lessons and plans, markdown for everything else.
- Settings panel is out of scope for the rebuild. His call, and a good one.
- No lesson gets written until the step before it is actually done. The 2026-07-30 warning in
  `NOTES.md` still applies: building the course is the comfortable substitute for taking it.

## Sources worth keeping

- Expertise reversal meta-analysis (2025): https://www.sciencedirect.com/science/article/pii/S0959475225000660
- Dagenais et al., newcomer onboarding (ICSE 2010): https://www.cs.mcgill.ca/~martin/papers/icse2010.pdf
- Begel & Simon, novice developers (ICER 2008): https://andrewbegel.com/papers/icer-begel-2008.pdf
- Sillito, Murphy & De Volder, questions programmers ask (FSE 2006): https://www.cs.ubc.ca/~murphy/papers/other/asking-answering-fse06.pdf
- von Mayrhauser & Vans, integrated comprehension model: https://www.cs.kent.edu/~jmaletic/cs69995-PC/papers/von_mayrhauser95.pdf
- Deslauriers et al., felt vs actual learning (PNAS 2019): https://www.pnas.org/doi/pdf/10.1073/pnas.1821936116
- Fox, Ericsson & Best, verbal reports meta-analysis: https://pubmed.ncbi.nlm.nih.gov/21090887/
- Rowland, testing effect meta-analysis: https://pubmed.ncbi.nlm.nih.gov/25150680/
- Dunlosky et al., learning techniques review: https://gwern.net/doc/psychology/spaced-repetition/2013-dunlosky.pdf
- Fowler, strangler fig: https://martinfowler.com/bliki/StranglerFigApplication.html
