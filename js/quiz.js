/* ============================================================================
   HIPAA HERO — quiz.js
   The quiz engine. Pure logic: no DOM, no storage, no rendering.
   Given a pool of questions and a config, it produces a runnable session.
   ============================================================================ */

const Quiz = (function () {

  /* ---------- CONFIG ----------
     Edit these to retune the exam without touching any other file. */
  const CONFIG = {
    passMark:        80,   // percent required to pass the final exam
    examLength:      30,   // questions drawn for the final exam
    practiceLength:  10,   // questions drawn for a practice round
    moduleQuizLength: 4,   // questions in a module's mini quiz
    basePoints:     100,   // points for a correct answer
    speedBonusMax:   50,   // extra points for answering fast
    speedWindowMs: 12000,  // answer inside this window to earn speed bonus
    comboStep:      0.25,  // multiplier added per consecutive correct answer
    comboMax:        3     // multiplier ceiling
  };

  /* ---------- HELPERS ---------- */

  // Fisher-Yates. Returns a new array; never mutates the caller's data.
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function isMulti(q) { return q.type === "multi"; }

  /* Shuffle a question's answer options and remap the correct index or
     indices so the answer key follows its option. True/False questions are
     left alone — reordering them reads as a bug, not a feature. */
  function shuffleAnswers(q) {
    if (q.type === "tf") return Object.assign({}, q);

    const order = shuffle(q.answers.map(function (_, i) { return i; }));
    const answers = order.map(function (oldIdx) { return q.answers[oldIdx]; });

    let correct;
    if (isMulti(q)) {
      correct = q.correct
        .map(function (oldIdx) { return order.indexOf(oldIdx); })
        .sort(function (a, b) { return a - b; });
    } else {
      correct = order.indexOf(q.correct);
    }

    return Object.assign({}, q, { answers: answers, correct: correct });
  }

  /* ---------- SESSION ---------- */

  /**
   * Build a runnable quiz session.
   * @param {Object} opts
   *   pool     {Array}  questions to draw from (defaults to the full bank)
   *   count    {Number} how many to draw (defaults to all of pool)
   *   category {String} restrict to one module id
   *   instant  {Boolean} true = show feedback per question (practice/module)
   *                      false = withhold until the end (final exam)
   */
  function create(opts) {
    opts = opts || {};

    let pool = (opts.pool || QUESTIONS).slice();
    if (opts.category) {
      pool = pool.filter(function (q) { return q.category === opts.category; });
    }

    const count = Math.min(opts.count || pool.length, pool.length);
    const items = shuffle(pool).slice(0, count).map(shuffleAnswers);

    return {
      items:     items,
      instant:   opts.instant !== false,
      index:     0,
      responses: [],          // one entry per answered question
      points:    0,
      streak:    0,
      bestStreak:0,
      startedAt: Date.now(),
      askedAt:   Date.now(),
      finishedAt:null
    };
  }

  function current(s) { return s.items[s.index]; }

  function isLast(s) { return s.index >= s.items.length - 1; }

  /** Has this question been answered already? Guards double-submits. */
  function answered(s) {
    return s.responses.some(function (r) { return r.index === s.index; });
  }

  /**
   * Grade a response and advance the score. Does NOT advance the index —
   * call next() for that, so the UI can hold on the feedback state.
   * @param {Array<Number>} selection indices the learner chose
   */
  function submit(s, selection) {
    if (answered(s)) return null;

    const q = current(s);
    const key = isMulti(q) ? q.correct : [q.correct];
    const sel = selection.slice().sort(function (a, b) { return a - b; });
    const cor = key.slice().sort(function (a, b) { return a - b; });

    // Select-all-that-apply is all-or-nothing: partial credit teaches the
    // wrong lesson in a compliance context.
    const correct = sel.length === cor.length && sel.every(function (v, i) { return v === cor[i]; });

    const elapsed = Date.now() - s.askedAt;
    let gained = 0;

    if (correct) {
      s.streak += 1;
      if (s.streak > s.bestStreak) s.bestStreak = s.streak;

      const multiplier = Math.min(1 + (s.streak - 1) * CONFIG.comboStep, CONFIG.comboMax);
      const speed = elapsed < CONFIG.speedWindowMs
        ? Math.round(CONFIG.speedBonusMax * (1 - elapsed / CONFIG.speedWindowMs))
        : 0;

      gained = Math.round((CONFIG.basePoints + speed) * multiplier);
      s.points += gained;
    } else {
      s.streak = 0;
    }

    const response = {
      index:     s.index,
      id:        q.id,
      question:  q,
      selection: selection.slice(),
      correct:   correct,
      gained:    gained,
      elapsedMs: elapsed
    };

    s.responses.push(response);
    return response;
  }

  /** Advance to the next question. Returns false when the session is over. */
  function next(s) {
    if (isLast(s)) {
      s.finishedAt = Date.now();
      return false;
    }
    s.index += 1;
    s.askedAt = Date.now();
    return true;
  }

  function comboMultiplier(s) {
    return Math.min(1 + Math.max(s.streak - 1, 0) * CONFIG.comboStep, CONFIG.comboMax);
  }

  function accuracy(s) {
    if (!s.responses.length) return 0;
    const hits = s.responses.filter(function (r) { return r.correct; }).length;
    return Math.round((hits / s.responses.length) * 100);
  }

  function gradeFor(percent) {
    if (percent === 100) return { grade: "S", rank: "Compliance Champion" };
    if (percent >= 90)   return { grade: "A", rank: "Privacy Protector" };
    if (percent >= 80)   return { grade: "B", rank: "Security Specialist" };
    if (percent >= 70)   return { grade: "C", rank: "HIPAA Rookie" };
    if (percent >= 60)   return { grade: "D", rank: "Needs Review" };
    return { grade: "F", rank: "Retry Required" };
  }

  /** Final tally. Safe to call more than once. */
  function results(s) {
    if (!s.finishedAt) s.finishedAt = Date.now();

    const total   = s.items.length;
    const hits    = s.responses.filter(function (r) { return r.correct; }).length;
    const misses  = s.responses.filter(function (r) { return !r.correct; });
    const percent = total ? Math.round((hits / total) * 100) : 0;
    const g       = gradeFor(percent);

    return {
      total:      total,
      correct:    hits,
      incorrect:  total - hits,
      percent:    percent,
      points:     s.points,
      passed:     percent >= CONFIG.passMark,
      passMark:   CONFIG.passMark,
      grade:      g.grade,
      rank:       g.rank,
      bestStreak: s.bestStreak,
      elapsedMs:  s.finishedAt - s.startedAt,
      missed:     misses
    };
  }

  /* ---------- PUBLIC API ---------- */
  return {
    CONFIG:          CONFIG,
    create:          create,
    current:         current,
    submit:          submit,
    next:            next,
    isLast:          isLast,
    answered:        answered,
    accuracy:        accuracy,
    comboMultiplier: comboMultiplier,
    results:         results,
    shuffle:         shuffle,
    isMulti:         isMulti
  };
})();
