/* ============================================================================
   HIPAA HERO — ui.js
   Rendering, DOM helpers, sound, and visual effects.
   Knows about the DOM. Does not know about routing or quiz state transitions.
   ============================================================================ */

const UI = (function () {

  /* ---------- ACHIEVEMENTS ----------
     Declared here because they are presentation metadata. The unlock
     conditions are evaluated in app.js where the results are known. */
  const ACHIEVEMENTS = [
    { id: "rookie",    icon: "✦", name: "HIPAA ROOKIE",         desc: "Finish your first training module." },
    { id: "scholar",   icon: "◆", name: "MODULE SCHOLAR",       desc: "Complete all ten training modules." },
    { id: "privacy",   icon: "▲", name: "PRIVACY PROTECTOR",    desc: "Score 90% or higher on the final exam." },
    { id: "security",  icon: "■", name: "SECURITY SPECIALIST",  desc: "Pass the final exam." },
    { id: "perfect",   icon: "★", name: "PERFECT SCORE",        desc: "Answer every exam question correctly." },
    { id: "fast",      icon: "⚡", name: "FAST LEARNER",         desc: "Pass the exam in under six minutes." },
    { id: "streak",    icon: "●", name: "COMBO MASTER",         desc: "Build a streak of ten correct answers." },
    { id: "champion",  icon: "♛", name: "COMPLIANCE CHAMPION",  desc: "All modules done and the exam passed." }
  ];

  /* ---------- DOM HELPERS ---------- */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /**
   * Element factory.
   * @param {String} tag
   * @param {Object} attrs  className, text, html, aria-*, data-*, on* handlers
   * @param {Array}  kids
   */
  function el(tag, attrs, kids) {
    const node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      const v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "className") node.className = v;
      else if (k === "text")  node.textContent = v;
      else if (k === "html")  node.innerHTML = v;
      else if (k.indexOf("on") === 0 && typeof v === "function") {
        node.addEventListener(k.slice(2).toLowerCase(), v);
      } else node.setAttribute(k, v);
    });
    (kids || []).forEach(function (kid) {
      if (kid === null || kid === undefined) return;
      node.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    });
    return node;
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function fill(node, kids) {
    clear(node);
    (Array.isArray(kids) ? kids : [kids]).forEach(function (k) {
      if (k) node.appendChild(k);
    });
  }

  /* ---------- FORMATTING ---------- */

  function formatTime(ms) {
    const total = Math.round(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return m + "m " + (s < 10 ? "0" : "") + s + "s";
  }

  function formatDate(iso) {
    const d = iso ? new Date(iso) : new Date();
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }

  const KEYS = ["A", "B", "C", "D", "E", "F"];

  /* ---------- SOUND ----------
     Tones are synthesised with the Web Audio API so the project ships with
     no binary assets and stays a pure text repository. Muted by default. */

  let audioCtx = null;

  function tone(freq, durationMs, type) {
    if (!Storage.settings().sound) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type || "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + durationMs / 1000);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + durationMs / 1000);
    } catch (e) { /* audio unavailable — silently continue */ }
  }

  const sound = {
    click:   function () { tone(320, 60); },
    correct: function () { tone(660, 80); setTimeout(function () { tone(990, 120); }, 80); },
    wrong:   function () { tone(180, 200, "sawtooth"); },
    done:    function () {
      [523, 659, 784, 1047].forEach(function (f, i) {
        setTimeout(function () { tone(f, 140); }, i * 110);
      });
    },
    unlock:  function () {
      [784, 1047].forEach(function (f, i) {
        setTimeout(function () { tone(f, 160); }, i * 130);
      });
    }
  };

  /* ---------- EFFECTS ---------- */

  /** Pixel burst at the centre of an element. Skipped when motion is off. */
  function burst(target) {
    if (document.body.classList.contains("no-motion")) return;
    const rect = target.getBoundingClientRect();
    const colors = ["var(--electric-green)", "var(--bright-yellow)", "var(--neon-blue)"];
    for (let i = 0; i < 8; i++) {
      const p = el("div", { className: "burst" });
      p.style.background = colors[i % colors.length];
      p.style.left = (rect.left + rect.width / 2) + "px";
      p.style.top  = (rect.top + rect.height / 2) + "px";
      p.style.transform = "rotate(" + (i * 45) + "deg) translateX(28px)";
      document.body.appendChild(p);
      setTimeout(function () { p.remove(); }, 500);
    }
  }

  function toast(message) {
    const wrap = $("#toasts");
    const node = el("div", { className: "toast", role: "status", text: message });
    wrap.appendChild(node);
    setTimeout(function () { node.remove(); }, 4200);
  }

  /** Announce to screen readers without a visual change. */
  function announce(message) {
    const live = $("#live-region");
    if (live) live.textContent = message;
  }

  /* ---------- RENDERERS ---------- */

  function difficultyTag(q) {
    return el("span", {
      className: "tag tag-" + q.difficulty.toLowerCase(),
      text: q.difficulty
    });
  }

  function typeLabel(q) {
    return { mc: "MULTIPLE CHOICE", tf: "TRUE / FALSE",
             multi: "SELECT ALL THAT APPLY", scenario: "SCENARIO" }[q.type] || "QUESTION";
  }

  /**
   * Render one question into a container.
   * @param {Object} opts  { question, moduleTitle, selection, onToggle }
   */
  function renderQuestion(container, opts) {
    const q = opts.question;
    const multi = Quiz.isMulti(q);

    const meta = el("div", { className: "row", style: "margin-bottom:16px" }, [
      difficultyTag(q),
      el("span", { className: "tag tag-blue", text: typeLabel(q) }),
      opts.moduleTitle ? el("span", { className: "tag", text: opts.moduleTitle }) : null
    ]);

    const prompt = el("h2", {
      text: q.question,
      style: "font-size:var(--fs-h2);line-height:1.7;color:var(--text)"
    });

    const hint = multi
      ? el("p", { className: "small dim", text: "Select every correct answer, then press Submit.",
                  style: "margin-top:12px" })
      : null;

    const list = el("div", { className: "answers", role: multi ? "group" : "radiogroup" });

    q.answers.forEach(function (text, i) {
      const chosen = opts.selection.indexOf(i) !== -1;
      const btn = el("button", {
        className: "answer" + (chosen ? " is-selected" : ""),
        type: "button",
        "data-idx": i,
        "aria-pressed": chosen ? "true" : "false",
        onClick: function () { opts.onToggle(i); }
      }, [
        el("span", { className: "answer-key", text: KEYS[i], "aria-hidden": "true" }),
        el("span", { className: "grow", text: text })
      ]);
      list.appendChild(btn);
    });

    fill(container, [meta, prompt, hint, list].filter(Boolean));
  }

  /**
   * Lock the answer tiles and mark right/wrong, then render the explanation.
   * Used by practice and module quizzes (instant feedback), and by nothing
   * during the final exam — that withholds feedback until the results screen.
   */
  function revealAnswer(container, q, selection) {
    const key = Quiz.isMulti(q) ? q.correct : [q.correct];

    $$(".answer", container).forEach(function (btn, i) {
      btn.disabled = true;
      const isKey  = key.indexOf(i) !== -1;
      const picked = selection.indexOf(i) !== -1;
      btn.classList.remove("is-selected");
      if (isKey)             btn.classList.add("is-correct");
      else if (picked)       btn.classList.add("is-wrong");
      else                   btn.classList.add("is-muted");
    });
  }

  function renderFeedback(correct, q) {
    return el("div", {
      className: "feedback" + (correct ? "" : " is-wrong"),
      role: "status"
    }, [
      el("div", { className: "feedback-head", text: correct ? "CORRECT!" : "NOT QUITE" }),
      el("p", { text: q.explanation }),
      el("div", { className: "feedback-ref", text: "Source: " + q.reference })
    ]);
  }

  function renderHud(cells) {
    return cells.map(function (c) {
      return el("div", { className: "hud-cell" }, [
        el("span", { className: "hud-key", text: c.key }),
        el("span", { className: "hud-val", text: String(c.val), id: c.id || null })
      ]);
    });
  }

  function renderBar(percent) {
    const cls = percent >= 67 ? "" : percent >= 34 ? " is-warn" : " is-danger";
    const fill_ = el("div", { className: "bar-fill" + cls });
    fill_.style.width = percent + "%";
    return el("div", {
      className: "bar", role: "progressbar",
      "aria-valuenow": String(percent), "aria-valuemin": "0", "aria-valuemax": "100"
    }, [fill_]);
  }

  function renderAchievements(unlockedIds) {
    return ACHIEVEMENTS.map(function (a) {
      const on = unlockedIds.indexOf(a.id) !== -1;
      return el("div", { className: "badge" + (on ? " is-unlocked" : "") }, [
        el("div", { className: "badge-icon", text: a.icon, "aria-hidden": "true" }),
        el("div", { className: "badge-name", text: on ? a.name : "LOCKED" }),
        el("div", { className: "badge-desc", text: a.desc })
      ]);
    });
  }

  function achievementById(id) {
    return ACHIEVEMENTS.filter(function (a) { return a.id === id; })[0];
  }

  /** One entry in the "review incorrect answers" list. */
  function renderReviewItem(response) {
    const q = response.question;
    const key = Quiz.isMulti(q) ? q.correct : [q.correct];
    const chosen = response.selection.length
      ? response.selection.map(function (i) { return q.answers[i]; }).join("  |  ")
      : "(no answer given)";
    const right = key.map(function (i) { return q.answers[i]; }).join("  |  ");

    return el("div", { className: "review-item" }, [
      el("div", { className: "review-q", text: q.question }),
      el("div", { className: "review-line" }, [
        el("span", { className: "text-red", text: "YOUR ANSWER: " }),
        el("span", { text: chosen })
      ]),
      el("div", { className: "review-line" }, [
        el("span", { className: "text-green", text: "CORRECT: " }),
        el("span", { text: right })
      ]),
      el("p", { className: "small", text: q.explanation, style: "margin-top:12px" }),
      el("div", { className: "feedback-ref", text: "Source: " + q.reference })
    ]);
  }

  function renderGlossary(container, filterText) {
    const needle = (filterText || "").trim().toLowerCase();

    const entries = GLOSSARY
      .filter(function (g) {
        if (!needle) return true;
        return (g.term + " " + g.definition + " " + g.example).toLowerCase().indexOf(needle) !== -1;
      })
      .sort(function (a, b) { return a.term.localeCompare(b.term); });

    if (!entries.length) {
      fill(container, el("p", { className: "dim center", text: "No terms match “" + filterText + "”." }));
      return;
    }

    fill(container, entries.map(function (g) {
      return el("div", { className: "glossary-entry" }, [
        el("div", { className: "glossary-term", text: g.term.toUpperCase() }),
        el("p", { text: g.definition }),
        el("p", { className: "small dim", text: "Example: " + g.example }),
        el("div", { className: "small", style: "margin-top:8px" }, [
          el("span", { className: "dim", text: "Related: " }),
          el("span", { className: "text-purple", text: g.related.join(" · ") })
        ])
      ]);
    }));
  }

  /* ---------- PUBLIC API ---------- */
  return {
    ACHIEVEMENTS:       ACHIEVEMENTS,
    achievementById:    achievementById,
    $: $, $$: $$, el: el, fill: fill, clear: clear,
    formatTime:         formatTime,
    formatDate:         formatDate,
    sound:              sound,
    burst:              burst,
    toast:              toast,
    announce:           announce,
    renderQuestion:     renderQuestion,
    revealAnswer:       revealAnswer,
    renderFeedback:     renderFeedback,
    renderHud:          renderHud,
    renderBar:          renderBar,
    renderAchievements: renderAchievements,
    renderReviewItem:   renderReviewItem,
    renderGlossary:     renderGlossary,
    KEYS:               KEYS
  };
})();
