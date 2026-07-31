/* ============================================================================
   HIPAA HERO — storage.js
   Every localStorage read and write in the app goes through this module.
   Nothing here knows about the DOM or the quiz engine.
   No PHI is ever stored — only the learner's own name, scores, and settings.
   ============================================================================ */

const Storage = (function () {
  const KEY = "hipaaHero.v1";

  const DEFAULTS = {
    learnerName: "",
    learnerRole: "",
    settings: {
      sound: false,       // muted by default, per spec
      animations: true,
      timer: false
    },
    progress: {
      modulesDone: [],    // module ids the learner has finished
      bestScore: 0,       // best final-exam percentage
      bestPoints: 0,      // best arcade point total
      lastAttempt: null,  // ISO timestamp
      highestStreak: 0,
      attempts: 0,
      passed: false,
      passedOn: null
    },
    achievements: []      // achievement ids unlocked
  };

  /* Structured deep clone. Every value handed out must be independent of
     DEFAULTS — otherwise pushing to an array like modulesDone would mutate
     the defaults themselves, and reset() would have nothing clean to restore. */
  function clone(v) {
    if (Array.isArray(v)) return v.map(clone);
    if (v && typeof v === "object") {
      const out = {};
      Object.keys(v).forEach(function (k) { out[k] = clone(v[k]); });
      return out;
    }
    return v;
  }

  /* Deep-merge saved state over a fresh clone of the defaults, so upgrades
     never wipe user data and newly added keys always have a value. */
  function merge(base, saved) {
    const out = clone(base);
    if (!saved || typeof saved !== "object") return out;
    Object.keys(saved).forEach(function (k) {
      const b = base[k];
      const s = saved[k];
      if (b && typeof b === "object" && !Array.isArray(b)) out[k] = merge(b, s);
      else if (s !== undefined) out[k] = clone(s);
    });
    return out;
  }

  let state = load();

  function load() {
    try {
      return merge(DEFAULTS, JSON.parse(localStorage.getItem(KEY)));
    } catch (e) {
      // Corrupt or unavailable storage (private mode, quota) — fail soft.
      return merge(DEFAULTS, null);
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("HIPAA Hero: progress could not be saved.", e);
    }
  }

  return {
    all:      function () { return state; },
    settings: function () { return state.settings; },
    progress: function () { return state.progress; },

    setSetting: function (key, val) {
      state.settings[key] = val;
      save();
    },

    setLearner: function (name, role) {
      state.learnerName = (name || "").trim();
      state.learnerRole = (role || "").trim();
      save();
    },

    learner: function () {
      return { name: state.learnerName, role: state.learnerRole };
    },

    completeModule: function (id) {
      if (state.progress.modulesDone.indexOf(id) === -1) {
        state.progress.modulesDone.push(id);
        save();
      }
    },

    isModuleDone: function (id) {
      return state.progress.modulesDone.indexOf(id) !== -1;
    },

    /* Called once per finished final exam. Keeps the best result, never
       downgrades a previous pass. */
    recordExam: function (result) {
      const p = state.progress;
      p.attempts += 1;
      p.lastAttempt = new Date().toISOString();
      if (result.percent > p.bestScore) p.bestScore = result.percent;
      if (result.points  > p.bestPoints) p.bestPoints = result.points;
      if (result.bestStreak > p.highestStreak) p.highestStreak = result.bestStreak;
      if (result.passed && !p.passed) {
        p.passed = true;
        p.passedOn = p.lastAttempt;
      }
      save();
    },

    unlock: function (id) {
      if (state.achievements.indexOf(id) === -1) {
        state.achievements.push(id);
        save();
        return true;   // newly unlocked — caller may show a toast
      }
      return false;
    },

    hasAchievement: function (id) {
      return state.achievements.indexOf(id) !== -1;
    },

    achievements: function () { return state.achievements.slice(); },

    reset: function () {
      try { localStorage.removeItem(KEY); } catch (e) { /* fail soft */ }
      state = merge(DEFAULTS, null);
    }
  };
})();
