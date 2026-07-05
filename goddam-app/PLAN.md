# قدّام (GODDAM) — Master Plan v1

Interactive learning platform for Algerian driving schools (auto-écoles)

## 0) Project Brief

- **Product:** Web app (PWA-ready) that teaches the Algerian driving code the same way the official exam tests it. Mirrors the real exam structure: 16 signs + 8 priority scenarios (Ordre de passage) + 6 theory questions.
- **Customer:** Driving schools (B2B). They use it on the school PC and students use it on phones. Pricing later: monthly subscription per school.
- **Languages:** Arabic (primary, RTL). French sign names as secondary labels (exam uses both).
- **v1 scope:** NO accounts, NO backend. Progress in localStorage. One live URL.
- **Existing asset:** a working 5-scenario demo (tap-the-car game) — reuse its visual style: SVG top-down scenes, palette (ink #23252b, paper #f3f4ef, asphalt #3a3d46, accent #f7c23e, go #2fa96b, stop #e2444d, player blue #3b82f6), fonts Cairo + Changa.

## 1) The Golden Architecture Rule

**ENGINE ≠ CONTENT.**
All learning content lives in `/src/data/*.json`. The engine renders scenes and quizzes FROM data. Adding Test 17 = adding a JSON file. Zero new code. Claude Code must refuse to hardcode content inside components.

## 2) Tech Stack (fixed — do not debate)

- Vite + React 18, plain CSS with CSS variables (no Tailwind).
- react-router-dom for pages.
- SVG for all signs and scenes (hand-built components, no image files of the booklet).
- localStorage for progress.
- vite-plugin-pwa in Phase 4.
- Deploy: Vercel (free).

## 3) Data Schemas (single source of truth)

### signs.json
```json
{
  "id": "danger_virage_droite",
  "category": "danger | interdiction | fin_interdiction | obligation | fin_obligation | indication | priorite | temporaire | borne | zone",
  "name_ar": "خطر منعرج إلى اليمين",
  "name_fr": "Virage à droite",
  "svg": "SignVirageDroite",
  "tags": ["منعرج", "خطر"]
}
```

### scenarios.json
```json
{
  "id": "s_l1_003",
  "level": 1,
  "layout": { "type": "cross | T | roundabout | narrow | multilane", "flags": ["mountain", "crosswalk"] },
  "signs": [ { "signId": "priorite_cedez", "approach": "S" } ],
  "lights": { "S": "green|yellow|red|off|blink", "E": "..." },
  "police": false,
  "pedestrian": false,
  "cars": [
    { "id": "blue", "color_ar": "الزرقاء", "approach": "S", "intent": "straight|left|right", "isPlayer": true, "special": null },
    { "id": "red", "color_ar": "الحمراء", "approach": "E", "intent": "straight", "isPlayer": false, "special": "ambulance|police|null" }
  ],
  "question_ar": "ما هو ترتيب المرور؟",
  "correctOrder": ["red", "blue"],
  "explanation_ar": "الأولوية لليمين: الحمراء قادمة من يمين الزرقاء.",
  "source": "Test 11 — مشهد 4",
  "validated": false
}
```

**Rule:** `correctOrder` starts as `null` and `validated: false` until the human confirms with the instructor. The app must show only `validated: true` scenarios in exam mode; unvalidated ones appear in a hidden "review" screen.

### theory.json
```json
{ "id": "t_012", "q_ar": "ما هي الأخطار المتعلقة بالسياقة أثناء الليل؟", "q_fr": "Quels sont les dangers de la conduite de nuit ?", "answer_ar": ["ضعف الرؤية...", "الانبهار"], "source": "Test 11 — سؤال 1" }
```

### exams.json
```json
{ "id": 11, "signIds": ["...16 ids..."], "scenarioIds": ["...8 ids..."], "theoryIds": ["...6 ids..."] }
```

### lessons.json
Structured lessons: التجاوز (3 مراحل + حالات التجاوز من اليمين), الدوران إلى اليسار (4 وضعيات), أولوية المضايق (من يتوقف / من يرجع), الأضواء الإجبارية (17 ضوء), المسافات (صيغ الحساب أدناه).

**Distance formulas (from the official booklet — build an interactive calculator):**
- مسافة التوقف (طريق جاف) = (السرعة/10)² متر → 49→70, 64→80, 81→90, 100→100
- طريق مبلل = الجاف × 1.5 → 73.5, 96, 121.5, 150
- المسافة الأمنية = (السرعة/10) × 6 متر → 42→70, 48→80, 54→90, 60→100

## 4) Product Modules

- **M1 الإشارات:** browse by category (grid) + quiz mode (sign → 4 name choices, and reverse). Wrong answers get a review pile.
- **M2 لعبة الأولويات (the core):** scene renderer from scenarios.json. Mechanic: tap cars in passing order (numbers appear on cars) → تحقق → cars animate through in the correct order one by one → explanation sheet. L1 may use "tap who passes first" only.
- **M3 الدروس:** lesson pages + the interactive distance calculator (speed slider → formula shown live → dry/wet stopping distance + safety distance).
- **M4 وضع الامتحان:** full simulation of one Test: 16-sign quiz → 8 scenarios (full ordering) → 6 theory questions as self-check flashcards (show model answer, student marks himself) → timed → final report with weak-area breakdown.
- **M5 (Phase 2 — NOT v1):** school accounts, teacher dashboard, per-student tracking. Do not build until a school pays.

## 5) Difficulty Design

- **L1 (أساسيات):** 2 cars, one rule per scene: أولوية اليمين، قف، أفسح الطريق، المعّين الأصفر، إسعاف.
- **L2 (تركيبات):** 3–4 cars, full ordering, working traffic lights, roundabout with multiple entries, main-road (diamond) vs side-road combos, left-turn intent (يفسح للقادم من الأمام).
- **L3 (فخاخ الامتحان):** lights OFF → follow priority signs; policeman overrides everything; narrow mountain road (الأكبر حجماً يتوقف في المستوي / النازل; الأصغر يرجع في المنحدر); "ما هي الإشارة المفقودة؟" puzzles; قف/أفسح على بعد 150م combos.

## 6) Phases — /goal style

### Phase 0 — Skeleton
**/goal:** runnable RTL app shell.
**Claude Code tasks:** init Vite+React; folders `/src/components /src/data /src/pages /src/engine`; RTL + Cairo/Changa fonts; CSS design tokens from §0; router with 5 pages (home + 4 modules) as Arabic cards; sample signs.json (2 signs) + scenarios.json (1 scenario, the demo's priorité-à-droite); README with run commands.
**DoD:** `npm run dev` → home shows 4 module cards in Arabic RTL on a phone-width viewport.

### Phase 1 — Signs module (M1)
**/goal:** M1 complete for TWO categories: الخطر + نظام الأولوية (~45 signs).
**Claude Code tasks:** build a Sign SVG component library (triangles/circles/octagon/diamond primitives + per-sign pictograms drawn as simple vectors); fill signs.json for the two categories; category grid + sign detail; quiz engine (10 questions, 4 choices, score, review of mistakes).
**DoD:** a full 10-question danger-signs quiz playable start→finish on a phone.

### Phase 2 — Priority Engine (M2, the heart)
**/goal:** scenario player driven 100% by JSON + 15 scenarios (5×L1 from the demo, 6×L2, 4×L3).
**Claude Code tasks:** scene renderer for layouts cross/T/roundabout/narrow/multilane built from layout params; car component with tap-to-order mechanic + order badges; sequential pass animation; lights + policeman + pedestrian components; explanation bottom-sheet; level select screen; author the 15 scenarios in data (mark all validated:false except the 5 demo ones).
**DoD:** play L1 pack (5 scenarios) end-to-end with animations; adding a 16th scenario requires ONLY a JSON edit (prove it live).

### Phase 3 — Exam mode + Lessons (M3+M4)
**/goal:** full Test simulation + 3 lessons + calculator.
**Claude Code tasks:** exam flow (16 signs → 8 scenarios → 6 theory self-check) with timer + report screen (score, weak areas); lessons pages for التجاوز / الدوران لليسار / المسافات with the interactive calculator; exams.json for Test 1 and Test 11.
**DoD:** run Test 11 fully on a phone and receive a score report.

### Phase 4 — PWA + Deploy + School landing
**/goal:** live URL, installable, pitch-ready.
**Claude Code tasks:** vite-plugin-pwa (manifest, icons, offline cache); Vercel config; landing page for schools (one screen: promise + "جرّب الديمو" + WhatsApp button); "نسخة تجريبية للمدارس" badge; simple visit counter.
**DoD:** URL opens on any phone, installs to home screen, works offline after first load.

### Phase 5 — Pilot (HUMAN phase, no code)
School demo → 3 students use it for a week → collect confusion points + teacher wishlist → pricing pilot (free month, then subscription). Only after a YES: plan M5.

## 7) Task Split

**HUMAN (you):**
- Validate every `correctOrder` with the instructor (المونيتور). Flip `validated:true` only after his confirmation. Never guess.
- Photograph remaining Test pages (flat, daylight, fill the frame).
- Run extraction chats (prompt in §8), save outputs to `/src/data/exams/`.
- Create Vercel account; connect repo.
- Phase 5 entirely.

**CLAUDE CODE:** all code, all SVGs, schema validation, deploy config. Must stop at each DoD.

**CLAUDE CHAT (separate vision chats):** extract booklet pages → JSON per §3 schemas.

**GEMINI:** benched. Only if we someday analyze teaching videos.

## 8) Content Extraction Prompt
(paste in a NEW Claude chat with 3–4 Test photos)

```
You are a data extractor for an Algerian driving-school app. From the attached exam pages, produce JSON only, matching these schemas exactly: [paste §3 schemas].
Rules:
- Transcribe Arabic and French questions verbatim.
- For each of the 8 scenarios: describe layout type, every sign and its approach, every car (color_ar, approach N/E/S/W, intent from drawn arrows, special vehicles), lights state if drawn.
- Set "correctOrder": null and "validated": false — never guess answers.
- Set "source": "Test XX — مشهد N".
- Output one JSON block per test, nothing else.
```

## 9) Rules & Risks

1. **Wrong answers kill the product.** Unvalidated scenarios never appear in exam mode.
2. **No booklet images.** All scenes and signs are original SVG rebuilds; wording of explanations is ours. Road signs themselves are standard public code.
3. **Scope discipline:** anything not in §4 goes to `IDEAS.md`, not into code.
4. **One phase per session.** If a phase breaks, fix before advancing.
5. **Budget:** Phases 0–1 in one focused day, Phase 2 in a second, Phases 3–4 in a third.
