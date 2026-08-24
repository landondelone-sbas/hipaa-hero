/* ============================================================================
   HIPAA HERO — app.js
   Routing, screen wiring, and the glue between Quiz, Storage, and UI.
   ============================================================================ */

(function () {
  "use strict";

  const $  = UI.$;
  const $$ = UI.$$;
  const el = UI.el;

  /* ---------- APP STATE ---------- */
  const App = {
    screen:      "home",
    session:     null,   // active Quiz session
    mode:        null,   // "practice" | "exam" | "module"
    module:      null,   // active module object during training
    cardIndex:   0,      // learning-card position within a module
    selection:   [],     // indices selected for the current question
    lastResults: null,
    timerId:     null
  };

  /* ---------- ROUTING ---------- */

  function go(name) {
    App.screen = name;
    $$(".screen").forEach(function (s) {
      s.classList.toggle("is-active", s.id === "screen-" + name);
    });
    window.scrollTo(0, 0);
    const heading = $("#screen-" + name + " h1, #screen-" + name + " .game-title");
    if (heading) UI.announce(heading.textContent);
  }

  /* ---------- SETTINGS ---------- */

  function applySettings() {
    const s = Storage.settings();
    document.body.classList.toggle("no-motion", !s.animations);
    $$("[data-setting]").forEach(function (btn) {
      const key = btn.getAttribute("data-setting");
      const on  = !!s[key];
      btn.textContent = on ? "ON" : "OFF";
      btn.classList.toggle("btn-green", on);
      btn.classList.toggle("btn-ghost", !on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  /* ---------- HOME ---------- */

  function renderHome() {
    const p = Storage.progress();
    const learner = Storage.learner();

    $("#home-status").textContent = p.passed
      ? "Compliant — passed " + UI.formatDate(p.passedOn)
      : "Training incomplete";
    $("#home-status").className = "pixel " + (p.passed ? "text-green" : "text-yellow");

    $("#home-modules").textContent = p.modulesDone.length + " / " + MODULES.length;
    $("#home-best").textContent    = p.bestScore + "%";
    $("#home-points").textContent  = p.bestPoints.toLocaleString();
    $("#home-name").textContent    = learner.name || "Guest";
  }

  /* ---------- MODULE SELECT ---------- */

  function renderModuleList() {
    const list = $("#module-list");
    UI.fill(list, MODULES.map(function (m) {
      const done = Storage.isModuleDone(m.id);
      return el("button", {
        className: "module-tile" + (done ? " is-done" : ""),
        type: "button",
        onClick: function () { UI.sound.click(); startModule(m); }
      }, [
        el("div", { className: "module-num", text: "Module " + m.n + (done ? "   ✓ Complete" : "") }),
        el("div", { className: "module-title", text: m.title }),
        el("div", { className: "small dim", text: m.blurb })
      ]);
    }));
  }

  /* ---------- TRAINING MODULE ---------- */

  function startModule(mod) {
    App.module    = mod;
    App.cardIndex = 0;
    renderCard();
    go("module");
  }

  function renderCard() {
    const m    = App.module;
    const card = m.cards[App.cardIndex];
    const last = App.cardIndex === m.cards.length - 1;

    $("#module-title").textContent = "Module " + m.n + " — " + m.title;
    $("#module-step").textContent  = "Card " + (App.cardIndex + 1) + " / " + m.cards.length;

    UI.fill($("#module-progress"),
      UI.renderBar(Math.round(((App.cardIndex + 1) / m.cards.length) * 100)));

    UI.fill($("#module-card"), [
      el("h2", { className: "card-heading", text: card.heading }),
      el("p", { text: card.body }),
      el("ul", { className: "tight", style: "margin-top:16px" },
        card.points.map(function (pt) { return el("li", { text: pt }); }))
    ]);

    $("#module-prev").disabled = App.cardIndex === 0;
    $("#module-next").textContent = last ? "Take Mini Quiz" : "Next";
  }

  function moduleNext() {
    UI.sound.click();
    if (App.cardIndex < App.module.cards.length - 1) {
      App.cardIndex += 1;
      renderCard();
    } else {
      startQuiz("module", { category: App.module.id, count: Quiz.CONFIG.moduleQuizLength });
    }
  }

  function modulePrev() {
    UI.sound.click();
    if (App.cardIndex > 0) { App.cardIndex -= 1; renderCard(); }
  }

  /* ---------- QUIZ FLOW ---------- */

  function startQuiz(mode, opts) {
    App.mode      = mode;
    App.selection = [];
    App.session   = Quiz.create({
      category: opts.category,
      count:    opts.count,
      instant:  mode !== "exam"      // the final exam withholds feedback
    });

    $("#quiz-heading").textContent =
      mode === "exam"   ? "Final Exam" :
      mode === "module" ? "Mini Quiz — " + App.module.title :
                          "Practice Round";

    startTimer();
    renderQuizStep();
    go("quiz");
  }

  function startTimer() {
    stopTimer();
    if (!Storage.settings().timer) { $("#hud-time").textContent = "--:--"; return; }
    App.timerId = setInterval(function () {
      if (!App.session) return;
      $("#hud-time").textContent = UI.formatTime(Date.now() - App.session.startedAt);
    }, 1000);
  }

  function stopTimer() {
    if (App.timerId) { clearInterval(App.timerId); App.timerId = null; }
  }

  function renderQuizStep() {
    const s = App.session;
    const q = Quiz.current(s);

    // HUD
    $("#hud-score").textContent = s.points.toLocaleString();
    $("#hud-q").textContent     = (s.index + 1) + " / " + s.items.length;
    $("#hud-combo").textContent = "x" + Quiz.comboMultiplier(s).toFixed(2);
    $("#hud-acc").textContent   = Quiz.accuracy(s) + "%";
    $("#hud-time").textContent  = Storage.settings().timer
      ? UI.formatTime(Date.now() - s.startedAt) : "--:--";

    UI.fill($("#quiz-progress"),
      UI.renderBar(Math.round((s.index / s.items.length) * 100)));

    UI.clear($("#quiz-feedback"));

    UI.renderQuestion($("#quiz-question"), {
      question:    q,
      selection:   App.selection,
      moduleTitle: null,
      onToggle:    toggleAnswer
    });

    $("#quiz-submit").classList.toggle("hidden", false);
    $("#quiz-submit").disabled = App.selection.length === 0;
    $("#quiz-submit").textContent = "Submit Answer";
    $("#quiz-next").classList.add("hidden");
  }

  /* Single-answer questions replace the selection; multi toggles it. */
  function toggleAnswer(i) {
    if (Quiz.answered(App.session)) return;
    const q = Quiz.current(App.session);
    UI.sound.click();

    if (Quiz.isMulti(q)) {
      const at = App.selection.indexOf(i);
      if (at === -1) App.selection.push(i);
      else App.selection.splice(at, 1);
    } else {
      App.selection = [i];
    }

    // Repaint selected states without rebuilding the DOM
    $$("#quiz-question .answer").forEach(function (btn, idx) {
      const on = App.selection.indexOf(idx) !== -1;
      btn.classList.toggle("is-selected", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $("#quiz-submit").disabled = App.selection.length === 0;
  }

  function submitAnswer() {
    const s = App.session;
    if (!App.selection.length || Quiz.answered(s)) return;

    const q   = Quiz.current(s);
    const res = Quiz.submit(s, App.selection);

    $("#hud-score").textContent = s.points.toLocaleString();
    $("#hud-combo").textContent = "x" + Quiz.comboMultiplier(s).toFixed(2);
    $("#hud-acc").textContent   = Quiz.accuracy(s) + "%";

    if (res.correct) {
      UI.sound.correct();
      const firstKey = $("#quiz-question .answer.is-selected") || $("#quiz-question .answer");
      if (firstKey) UI.burst(firstKey);
    } else {
      UI.sound.wrong();
    }

    $("#quiz-submit").classList.add("hidden");
    $("#quiz-next").classList.remove("hidden");
    $("#quiz-next").textContent = Quiz.isLast(s) ? "See Results" : "Next Question";

    if (s.instant) {
      // Practice and module quizzes teach on the spot.
      UI.revealAnswer($("#quiz-question"), q, App.selection);
      UI.fill($("#quiz-feedback"), UI.renderFeedback(res.correct, q));
      UI.announce(res.correct ? "Correct. " + q.explanation : "Incorrect. " + q.explanation);
    } else {
      // Final exam: lock the tiles but reveal nothing until the results screen.
      $$("#quiz-question .answer").forEach(function (b) { b.disabled = true; });
      UI.fill($("#quiz-feedback"), el("div", { className: "panel-inset", role: "status" }, [
        el("p", { className: "small dim", text: "Answer recorded. Explanations are shown in the review after the exam." })
      ]));
      UI.announce("Answer recorded.");
    }

    $("#quiz-next").focus();
  }

  function nextQuestion() {
    UI.sound.click();
    App.selection = [];
    if (Quiz.next(App.session)) renderQuizStep();
    else finishQuiz();
  }

  function quitQuiz() {
    if (!confirm("Quit this round? Your progress in it will be lost.")) return;
    stopTimer();
    App.session = null;
    go("home");
    renderHome();
  }

  /* ---------- FINISH & RESULTS ---------- */

  function finishQuiz() {
    stopTimer();
    const s = App.session;
    const r = Quiz.results(s);
    App.lastResults = r;
    UI.sound.done();

    if (App.mode === "module") {
      // A module counts as complete once its mini quiz is passed.
      if (r.percent >= Quiz.CONFIG.passMark) {
        Storage.completeModule(App.module.id);
        UI.toast("Module complete: " + App.module.title);
      }
      checkAchievements(r, "module");
      renderModuleResult(r);
      go("module-done");
      return;
    }

    if (App.mode === "exam") Storage.recordExam(r);
    checkAchievements(r, App.mode);
    renderResults(r);
    go("results");
  }

  function renderModuleResult(r) {
    const passed = r.percent >= Quiz.CONFIG.passMark;
    $("#md-verdict").textContent = passed ? "Module Complete" : "Review Needed";
    $("#md-verdict").className   = "verdict " + (passed ? "is-pass" : "is-fail");
    $("#md-score").textContent   = r.correct + " / " + r.total + "  (" + r.percent + "%)";
    $("#md-note").textContent    = passed
      ? "Nicely done. Move on to the next module, or take a practice round."
      : "You need " + Quiz.CONFIG.passMark + "% to clear a module. Review the cards and try again.";
    $("#md-retry").textContent = passed ? "Replay Module" : "Retry Module";
  }

  function renderResults(r) {
    const isExam = App.mode === "exam";

    $("#res-heading").textContent = isExam ? "Final Exam Results" : "Practice Results";
    $("#res-percent").textContent = r.percent + "%";
    $("#res-verdict").textContent = isExam ? (r.passed ? "Pass" : "Fail") : "Practice Complete";
    $("#res-verdict").className   = "verdict " + (r.passed || !isExam ? "is-pass" : "is-fail");

    $("#res-correct").textContent   = r.correct;
    $("#res-incorrect").textContent = r.incorrect;
    $("#res-points").textContent    = r.points.toLocaleString();
    $("#res-time").textContent      = UI.formatTime(r.elapsedMs);
    $("#res-grade").textContent     = r.grade;
    $("#res-streak").textContent    = r.bestStreak;
    $("#res-rank").textContent      = r.rank;

    $("#res-note").textContent = isExam
      ? (r.passed
          ? "You met the " + r.passMark + "% passing standard. Print your completion record below."
          : "A score of " + r.passMark + "% is required. Review the missed questions below, then retry.")
      : "Practice rounds are not recorded as your official training result.";

    $("#res-review").classList.toggle("hidden", r.incorrect === 0);
    $("#res-cert").classList.toggle("hidden", !(isExam && r.passed));
  }

  function renderReview() {
    const r = App.lastResults;
    UI.fill($("#review-list"), r.missed.map(UI.renderReviewItem));
    $("#review-count").textContent = r.missed.length +
      (r.missed.length === 1 ? " QUESTION MISSED" : " QUESTIONS MISSED");
    go("review");
  }

  /* ---------- ACHIEVEMENTS ---------- */

  function checkAchievements(r, mode) {
    const p = Storage.progress();
    const newly = [];

    function grant(id, condition) {
      if (condition && Storage.unlock(id)) newly.push(id);
    }

    grant("rookie",  p.modulesDone.length >= 1);
    grant("scholar", p.modulesDone.length >= MODULES.length);
    grant("streak",  r.bestStreak >= 10);

    if (mode === "exam") {
      grant("security", r.passed);
      grant("privacy",  r.percent >= 90);
      grant("perfect",  r.percent === 100);
      grant("fast",     r.passed && r.elapsedMs < 6 * 60 * 1000);
      grant("champion", r.passed && p.modulesDone.length >= MODULES.length);
    }

    newly.forEach(function (id, i) {
      const a = UI.achievementById(id);
      setTimeout(function () {
        UI.sound.unlock();
        UI.toast("Achievement unlocked — " + a.name);
      }, 500 + i * 900);
    });
  }

  function renderAchievements() {
    UI.fill($("#achievement-grid"), UI.renderAchievements(Storage.achievements()));
  }

  /* ---------- CERTIFICATE ---------- */

  function renderCertificate() {
    const learner = Storage.learner();
    const r = App.lastResults;

    if (!learner.name) {
      alert("Enter your name in Settings first — the completion record must identify who was trained.");
      go("settings");
      return;
    }

    $("#cert-name").textContent  = learner.name;
    $("#cert-role").textContent  = learner.role || "Workforce Member";
    $("#cert-score").textContent = r.percent + "%  (" + r.correct + " of " + r.total + ")";
    $("#cert-date").textContent  = UI.formatDate();
    $("#cert-module").textContent = "HIPAA Hero — Annual Compliance Trainer v" + APP_VERSION;
    go("certificate");
  }

  /* ---------- KEYBOARD ---------- */

  function onKeydown(e) {
    if (App.screen !== "quiz") return;
    if (e.target.matches("input, textarea")) return;

    const key = e.key.toUpperCase();
    const idx = UI.KEYS.indexOf(key);

    if (idx !== -1) {
      const btn = $$("#quiz-question .answer")[idx];
      if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
      return;
    }

    if (e.key === "Enter") {
      const submit = $("#quiz-submit");
      const next   = $("#quiz-next");
      if (!submit.classList.contains("hidden") && !submit.disabled) { e.preventDefault(); submit.click(); }
      else if (!next.classList.contains("hidden")) { e.preventDefault(); next.click(); }
    }
  }

  /* ---------- WIRING ---------- */

  function bind() {
    // Any element with data-go="screen" navigates there.
    $$("[data-go]").forEach(function (node) {
      node.addEventListener("click", function () {
        UI.sound.click();
        const target = node.getAttribute("data-go");
        if (target === "home")         renderHome();
        if (target === "modules")      renderModuleList();
        if (target === "achievements") renderAchievements();
        if (target === "glossary")     UI.renderGlossary($("#glossary-list"), $("#glossary-search").value);
        go(target);
      });
    });

    // Module navigation
    $("#module-next").addEventListener("click", moduleNext);
    $("#module-prev").addEventListener("click", modulePrev);

    // Quiz controls
    $("#quiz-submit").addEventListener("click", submitAnswer);
    $("#quiz-next").addEventListener("click", nextQuestion);
    $("#quiz-quit").addEventListener("click", quitQuiz);

    // Launchers
    $("#start-practice").addEventListener("click", function () {
      UI.sound.click();
      startQuiz("practice", { count: Quiz.CONFIG.practiceLength });
    });

    $("#start-exam").addEventListener("click", function () {
      UI.sound.click();
      if (!confirm("Start the final exam?\n\n" + Quiz.CONFIG.examLength +
                   " questions. " + Quiz.CONFIG.passMark +
                   "% required to pass. Explanations are withheld until you finish.")) return;
      startQuiz("exam", { count: Quiz.CONFIG.examLength });
    });

    // Results actions
    $("#res-review").addEventListener("click", function () { UI.sound.click(); renderReview(); });
    $("#res-cert").addEventListener("click",   function () { UI.sound.click(); renderCertificate(); });
    $("#res-retry").addEventListener("click",  function () {
      UI.sound.click();
      startQuiz(App.mode, App.mode === "exam"
        ? { count: Quiz.CONFIG.examLength }
        : { count: Quiz.CONFIG.practiceLength });
    });

    $("#md-retry").addEventListener("click", function () { UI.sound.click(); startModule(App.module); });
    $("#cert-print").addEventListener("click", function () { window.print(); });

    // Glossary search
    $("#glossary-search").addEventListener("input", function (e) {
      UI.renderGlossary($("#glossary-list"), e.target.value);
    });

    // Settings toggles
    $$("[data-setting]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const key = btn.getAttribute("data-setting");
        Storage.setSetting(key, !Storage.settings()[key]);
        applySettings();
        UI.sound.click();
      });
    });

    $("#save-learner").addEventListener("click", function () {
      Storage.setLearner($("#learner-name").value, $("#learner-role").value);
      UI.toast("Saved");
      renderHome();
    });

    $("#reset-progress").addEventListener("click", function () {
      if (!confirm("Erase all local progress, scores, and achievements? This cannot be undone.")) return;
      Storage.reset();
      applySettings();
      renderHome();
      renderModuleList();
      renderAchievements();
      $("#learner-name").value = "";
      $("#learner-role").value = "";
      UI.toast("Progress reset");
    });

    document.addEventListener("keydown", onKeydown);
  }

  /* ---------- BOOT ---------- */

  function init() {
    const learner = Storage.learner();
    $("#learner-name").value = learner.name;
    $("#learner-role").value = learner.role;

    $("#exam-count").textContent = Quiz.CONFIG.examLength;
    $("#exam-pass").textContent  = Quiz.CONFIG.passMark + "%";
    $("#exam-mins").textContent  = Math.ceil(Quiz.CONFIG.examLength * 0.6);
    $("#bank-count").textContent = QUESTIONS.length;
    $("#module-count").textContent = MODULES.length;
    $$(".app-version").forEach(function (n) { n.textContent = APP_VERSION; });

    applySettings();
    bind();
    renderHome();
    renderModuleList();
    renderAchievements();
    UI.renderGlossary($("#glossary-list"), "");
    go("home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
