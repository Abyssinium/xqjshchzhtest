(function () {
  "use strict";

  /* ---------- word bank: confusable pairs, grouped by contrast ---------- */
  var BANK = [
    // x  vs  sh
    {
      c: "x/sh",
      a: { i: "x", py: "xī", hz: "西", en: "west" },
      b: { i: "sh", py: "shí", hz: "十", en: "ten" },
    },
    {
      c: "x/sh",
      a: { i: "x", py: "xià", hz: "下", en: "below, down" },
      b: { i: "sh", py: "shā", hz: "沙", en: "sand" },
    },
    {
      c: "x/sh",
      a: { i: "x", py: "xū", hz: "需", en: "to need" },
      b: { i: "sh", py: "shū", hz: "书", en: "book" },
    },
    {
      c: "x/sh",
      a: { i: "x", py: "xiǎo", hz: "小", en: "small" },
      b: { i: "sh", py: "shǎo", hz: "少", en: "few" },
    },
    {
      c: "x/sh",
      a: { i: "x", py: "xīn", hz: "新", en: "new" },
      b: { i: "sh", py: "shēn", hz: "深", en: "deep" },
    },
    {
      c: "x/sh",
      a: { i: "x", py: "xiān", hz: "先", en: "first" },
      b: { i: "sh", py: "shān", hz: "山", en: "mountain" },
    },
    {
      c: "x/sh",
      a: { i: "x", py: "xíng", hz: "行", en: "to be OK" },
      b: { i: "sh", py: "shèng", hz: "胜", en: "to win" },
    },
    // q  vs  ch
    {
      c: "q/ch",
      a: { i: "q", py: "qī", hz: "七", en: "seven" },
      b: { i: "ch", py: "chī", hz: "吃", en: "to eat" },
    },
    {
      c: "q/ch",
      a: { i: "q", py: "qù", hz: "去", en: "to go" },
      b: { i: "ch", py: "chū", hz: "出", en: "to go out" },
    },
    {
      c: "q/ch",
      a: { i: "q", py: "qiān", hz: "千", en: "thousand" },
      b: { i: "ch", py: "chǎn", hz: "产", en: "to produce" },
    },
    {
      c: "q/ch",
      a: { i: "q", py: "qǐng", hz: "请", en: "please" },
      b: { i: "ch", py: "chéng", hz: "成", en: "to become" },
    },
    {
      c: "q/ch",
      a: { i: "q", py: "qiáng", hz: "墙", en: "wall" },
      b: { i: "ch", py: "cháng", hz: "长", en: "long" },
    },
    {
      c: "q/ch",
      a: { i: "q", py: "qiū", hz: "秋", en: "autumn" },
      b: { i: "ch", py: "chōu", hz: "抽", en: "to draw out" },
    },
    {
      c: "q/ch",
      a: { i: "q", py: "quán", hz: "全", en: "whole" },
      b: { i: "ch", py: "chuán", hz: "船", en: "boat" },
    },
    // j  vs  zh
    {
      c: "j/zh",
      a: { i: "j", py: "jī", hz: "鸡", en: "chicken" },
      b: { i: "zh", py: "zhī", hz: "只", en: "(measure word)" },
    },
    {
      c: "j/zh",
      a: { i: "j", py: "jiā", hz: "家", en: "home, family" },
      b: { i: "zh", py: "zhā", hz: "扎", en: "to prick" },
    },
    {
      c: "j/zh",
      a: { i: "j", py: "jǔ", hz: "举", en: "to raise" },
      b: { i: "zh", py: "zhù", hz: "住", en: "to live, stay" },
    },
    {
      c: "j/zh",
      a: { i: "j", py: "jiǎn", hz: "简", en: "simple" },
      b: { i: "zh", py: "zhàn", hz: "站", en: "to stand" },
    },
    {
      c: "j/zh",
      a: { i: "j", py: "jīng", hz: "京", en: "capital city" },
      b: { i: "zh", py: "zhèng", hz: "正", en: "upright, exactly" },
    },
    {
      c: "j/zh",
      a: { i: "j", py: "jiào", hz: "叫", en: "to call" },
      b: { i: "zh", py: "zhǎo", hz: "找", en: "to look for" },
    },
    {
      c: "j/zh",
      a: { i: "j", py: "jiǔ", hz: "九", en: "nine" },
      b: { i: "zh", py: "zhōu", hz: "周", en: "week" },
    },
  ];

  var TIPS = {
    x: 'x — tongue tip rests behind your lower front teeth, blade near the hard palate. A thin hiss, brighter and smaller than English "sh".',
    sh: 'sh — tongue tip curls up and back toward the roof of your mouth. Hollow and dark, close to the "sh" in "shrub".',
    q: "q — same flat, forward tongue as x, but starting with a light t- burst: t + thin hiss. Never rounded.",
    ch: 'ch — curled-back tongue, like the "ch" in "church" but further back, with a hollow resonance.',
    j: 'j — flat forward tongue again, unaspirated: no puff of air. Something like the "dz" in "beds" pressed against a smile.',
    zh: 'zh — curled-back tongue, unaspirated: like "j" in "jog" but with the tongue tip pointing up and back.',
  };

  var TOTAL = 10;

  /* ---------- helpers ---------- */
  function shuffle(arr) {
    var a = arr.slice(),
      i,
      j,
      t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function buildQuiz() {
    // spread across the three contrasts, then shuffle the order
    var byGroup = { "x/sh": [], "q/ch": [], "j/zh": [] };
    BANK.forEach(function (p) {
      byGroup[p.c].push(p);
    });

    var picked = [],
      keys = shuffle(["x/sh", "q/ch", "j/zh"]),
      pools = {},
      k;
    for (k in byGroup) {
      pools[k] = shuffle(byGroup[k]);
    }

    while (picked.length < TOTAL) {
      for (var n = 0; n < keys.length && picked.length < TOTAL; n++) {
        var pool = pools[keys[n]];
        if (pool.length) picked.push(pool.pop());
      }
    }

    return shuffle(picked)
      .slice(0, TOTAL)
      .map(function (pair) {
        var targetIsA = Math.random() < 0.5;
        var target = targetIsA ? pair.a : pair.b;
        var other = targetIsA ? pair.b : pair.a;
        var opts =
          Math.random() < 0.5 ? [target.i, other.i] : [other.i, target.i];
        return { target: target, other: other, options: opts };
      });
  }

  /* ---------- speech ---------- */
  var zhVoice = null,
    supported = "speechSynthesis" in window;

  function pickVoice() {
    if (!supported) return;
    var vs = window.speechSynthesis.getVoices() || [];
    var zh = vs.filter(function (v) {
      return (v.lang || "").replace("_", "-").toLowerCase().indexOf("zh") === 0;
    });
    if (!zh.length) {
      zhVoice = null;
      return;
    }
    // prefer mainland Mandarin
    var cn = zh.filter(function (v) {
      return /zh[-_]?(cn|hans)/i.test(v.lang) || /chinese/i.test(v.name);
    });
    zhVoice = cn[0] || zh[0];
  }

  function checkVoice() {
    var warn = document.getElementById("warn");
    if (!supported) {
      warn.textContent =
        "Your browser doesn't support speech playback, so the audio won't work here. Try Chrome, Edge, or Safari.";
      warn.classList.remove("hide");
      return;
    }
    pickVoice();
    if (!zhVoice) {
      warn.textContent =
        "No Mandarin voice was found on this device, so playback may be wrong or silent. On Windows: Settings → Time & language → Speech → add Chinese (Simplified). On Android: install Google TTS Chinese data. macOS/iOS and Chrome usually have one already.";
      warn.classList.remove("hide");
    } else {
      warn.classList.add("hide");
    }
  }

  if (supported) {
    window.speechSynthesis.onvoiceschanged = function () {
      pickVoice();
      checkVoice();
    };
  }

  var playBtn = document.getElementById("play");

  function speak(text, rate) {
    if (!supported) return;

    try {
      window.speechSynthesis.cancel();

      const audio = new Audio(`voices/${text}.mp3`);

      audio.playbackRate = rate || 0.72;

      audio.onplay = function () {
        playBtn.classList.add("speaking");
      };

      audio.onended = function () {
        playBtn.classList.remove("speaking");
      };

      audio.onerror = function () {
        playBtn.classList.remove("speaking");
      };

      audio.play();
    } catch (e) {
      /* ignore */
    }
  }

  /* ---------- state ---------- */
  var quiz = [],
    idx = 0,
    score = 0,
    answered = false,
    log = [];

  var elStart = document.getElementById("start"),
    elQuiz = document.getElementById("quiz"),
    elDone = document.getElementById("done"),
    elNum = document.getElementById("qnum"),
    elRun = document.getElementById("running"),
    elFill = document.getElementById("fill"),
    elRev = document.getElementById("reveal"),
    elVer = document.getElementById("verdict"),
    elHz = document.getElementById("hanzi"),
    elPy = document.getElementById("pinyin"),
    elGl = document.getElementById("gloss"),
    elTip = document.getElementById("tip"),
    elNext = document.getElementById("next"),
    choices = Array.prototype.slice.call(document.querySelectorAll(".choice"));

  function render() {
    var q = quiz[idx];
    answered = false;
    elNum.textContent = "Question " + (idx + 1) + " of " + TOTAL;
    elRun.textContent = "Score " + score;
    elFill.style.width = (idx / TOTAL) * 100 + "%";
    elRev.classList.add("hide");
    choices.forEach(function (btn, i) {
      btn.textContent = q.options[i].toUpperCase();
      btn.className = "choice";
      btn.disabled = false;
    });
    speak(q.target.hz, 0.72);
  }

  function answer(choice) {
    if (answered) return;
    answered = true;
    var q = quiz[idx];
    var right = choice === q.target.i;
    if (right) score++;
    log.push({ right: right, t: q.target });

    choices.forEach(function (btn) {
      btn.disabled = true;
      var v = btn.textContent.toLowerCase();
      if (v === q.target.i) btn.classList.add("correct");
      else if (v === choice) btn.classList.add("wrong");
    });

    elVer.textContent = right
      ? "Correct"
      : "Not quite — it was " + q.target.i.toUpperCase();
    elVer.className = "verdict " + (right ? "y" : "n");
    elHz.textContent = q.target.hz;
    elPy.textContent = q.target.py;
    elGl.textContent =
      q.target.en + "  ·  contrasted with " + q.other.py + " " + q.other.hz;
    elTip.innerHTML =
      TIPS[q.target.i] + "<br><br><em>" + TIPS[q.other.i] + "</em>";
    elRun.textContent = "Score " + score;
    elFill.style.width = ((idx + 1) / TOTAL) * 100 + "%";
    elNext.textContent =
      idx === TOTAL - 1 ? "See your results" : "Next question";
    elRev.classList.remove("hide");
  }

  function finish() {
    elQuiz.classList.add("hide");
    elDone.classList.remove("hide");
    document.getElementById("finalScore").textContent = score + " / " + TOTAL;
    var msg;
    if (score === TOTAL) msg = "Flawless. Your ear is sorted.";
    else if (score >= 8) msg = "Strong — just a couple of slippery ones left.";
    else if (score >= 6)
      msg = "Getting there. The retroflex set is still blurring.";
    else if (score >= 4) msg = "Keep going. Watch where your tongue tip sits.";
    else msg = "Early days — play each one back a few times below.";
    document.getElementById("finalMsg").textContent = msg;

    var ul = document.getElementById("review");
    ul.innerHTML = "";
    log.forEach(function (r) {
      var li = document.createElement("li");
      li.innerHTML =
        '<span class="mark" style="color:var(--' +
        (r.right ? "ok" : "bad") +
        ')">' +
        (r.right ? "✓" : "✗") +
        "</span>" +
        '<span class="h zh"></span><span class="p"></span><span class="g"></span>' +
        '<button class="say">▶</button>';
      li.querySelector(".h").textContent = r.t.hz;
      li.querySelector(".p").textContent = r.t.py;
      li.querySelector(".g").textContent = r.t.en;
      li.querySelector(".say").addEventListener("click", function () {
        speak(r.t.hz, 0.7);
      });
      ul.appendChild(li);
    });
  }

  function startRun() {
    quiz = buildQuiz();
    idx = 0;
    score = 0;
    log = [];
    elStart.classList.add("hide");
    elDone.classList.add("hide");
    elQuiz.classList.remove("hide");
    render();
  }

  /* ---------- wiring ---------- */
  document.getElementById("begin").addEventListener("click", function () {
    checkVoice();
    speak("你好", 1); // unlocks audio on mobile
    if (supported) window.speechSynthesis.cancel();
    startRun();
  });
  document.getElementById("again").addEventListener("click", startRun);
  playBtn.addEventListener("click", function () {
    speak(quiz[idx].target.hz, 0.72);
  });
  document.getElementById("replay").addEventListener("click", function () {
    speak(quiz[idx].target.hz, 0.5);
  });
  choices.forEach(function (btn) {
    btn.addEventListener("click", function () {
      answer(btn.textContent.toLowerCase());
    });
  });
  elNext.addEventListener("click", function () {
    if (idx === TOTAL - 1) {
      finish();
    } else {
      idx++;
      render();
    }
  });

  checkVoice();
  setTimeout(checkVoice, 400);
})();
