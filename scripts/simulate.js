// node scripts/simulate.js
// 1) Share of results under random answers (rough check that nobody hogs).
// 2) Reachability: for each musician, search for answers that produce them,
//    and report how many of the 13 answers can be changed while staying them.
const { MUSICIANS, QUESTIONS, score } = require("../data.js");
const N = 100000, counts = {};
const rnd = () => QUESTIONS.map((q) => Math.floor(Math.random() * q.a.length));
for (let i = 0; i < N; i++) { const id = score(rnd()).musician.id; counts[id] = (counts[id] || 0) + 1; }
let bad = 0;
for (const m of MUSICIANS) {
  // start from giveaway answers where available, else random; then hill-climb
  let ans = QUESTIONS.map((q) => { const i = q.a.findIndex((a) => a[2].includes(m.id)); return i >= 0 ? i : 0; });
  let found = score(ans).musician.id === m.id;
  for (let t = 0; t < 4000 && !found; t++) {
    const qi = Math.floor(Math.random() * QUESTIONS.length);
    ans[qi] = Math.floor(Math.random() * QUESTIONS[qi].a.length);
    found = score(ans).musician.id === m.id;
  }
  if (!found) bad++;
  console.log(m.id.padEnd(16), ((100 * (counts[m.id] || 0)) / N).toFixed(1).padStart(5) + "%", found ? "reachable" : "UNREACHABLE");
}
process.exit(bad ? 1 : 0);
