(function () {
  const { MUSICIANS, QUESTIONS, score } = window.QUIZ;
  const $ = (id) => document.getElementById(id);
  const screens = ["intro", "quiz", "result"];
  let answers = [];
  let qi = 0;

  function show(name) {
    screens.forEach((s) => ($(s).hidden = s !== name));
    window.scrollTo(0, 0);
  }

  function renderQuestion() {
    const q = QUESTIONS[qi];
    $("count").textContent = `Question ${qi + 1} of ${QUESTIONS.length}`;
    $("bar").style.width = `${(qi / QUESTIONS.length) * 100}%`;
    $("question").textContent = q.q;
    $("back").hidden = qi === 0;
    const box = $("answers");
    box.innerHTML = "";
    q.a.forEach((a, i) => {
      const b = document.createElement("button");
      b.className = "answer" + (answers[qi] === i ? " chosen" : "");
      b.textContent = a[0];
      b.addEventListener("click", () => choose(i));
      box.appendChild(b);
    });
    box.firstChild.focus({ preventScroll: true });
  }

  function choose(i) {
    answers[qi] = i;
    if (qi < QUESTIONS.length - 1) { qi++; renderQuestion(); }
    else finish();
  }

  function finish() {
    const r = score(answers);
    renderResult(r.musician, r.runnersUp, true);
    history.replaceState(null, "", `?r=${r.musician.id}`);
  }

  function initials(m) {
    if (m.id === "sun-ra") return "Ra";
    const parts = m.name.split(" ");
    return parts[0][0] + parts[parts.length - 1][0];
  }

  function renderResult(m, runnersUp, mine) {
    document.documentElement.style.setProperty("--m", m.color);
    $("result-kicker").textContent = mine ? "Your Spirit Jazz Animal is" : "Someone's Spirit Jazz Animal is";
    $("initials").textContent = initials(m);
    $("r-title").textContent = m.title;
    $("r-name").innerHTML = "";
    $("r-name").append(m.name);
    if (m.tag) { const s = document.createElement("small"); s.textContent = m.tag; $("r-name").append(s); }
    $("r-inst").textContent = m.instrument;
    $("r-blurb").textContent = m.blurb;
    $("r-deep").textContent = m.deep;
    $("r-listen").textContent = m.listen;
    if (runnersUp && runnersUp.length) {
      const names = runnersUp.map((x) => x.name + (x.tag && x.tag.startsWith("(") ? " " + x.tag : ""));
      $("r-runners").textContent = `With a little ${names[0]} and a dash of ${names[1]}.`;
      $("r-runners").hidden = false;
    } else $("r-runners").hidden = true;
    $("share").textContent = mine ? "Share my result" : "Share this";
    $("again").textContent = mine ? "Take it again" : "Find out yours";
    $("toast").hidden = true;
    document.title = `${m.name}: ${m.title} | Spirit Jazz Animal`;
    show("result");
  }

  async function share() {
    const m = MUSICIANS.find((x) => x.id === new URLSearchParams(location.search).get("r"));
    const url = location.origin + location.pathname + (m ? `?r=${m.id}` : "");
    const text = m ? `My Spirit Jazz Animal is ${m.name} ${m.tag || ""}: ${m.title}. What's yours?`.replace(/\s+/g, " ") : "What's your Spirit Jazz Animal?";
    if (navigator.share) {
      try { await navigator.share({ title: "Spirit Jazz Animal", text, url }); return; } catch (e) { if (e.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(`${text} ${url}`); $("toast").hidden = false; }
    catch { prompt("Copy this link:", url); }
  }

  function start() {
    answers = []; qi = 0;
    history.replaceState(null, "", location.pathname);
    document.title = "Spirit Jazz Animal";
    show("quiz");
    renderQuestion();
  }

  $("start").addEventListener("click", start);
  $("again").addEventListener("click", start);
  $("share").addEventListener("click", share);
  $("back").addEventListener("click", () => { if (qi > 0) { qi--; renderQuestion(); } });

  // Shared link: ?r=<musician id> shows that result directly.
  const shared = MUSICIANS.find((x) => x.id === new URLSearchParams(location.search).get("r"));
  if (shared) renderResult(shared, null, false);
})();
