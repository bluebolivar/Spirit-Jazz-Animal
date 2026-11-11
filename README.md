# Spirit Jazz Animal

Like "what's your spirit animal," but the answer is a jazz musician. A static page with no build step. It runs on GitHub Pages.

- `data.js` has everything you'd want to edit: the 24 musicians (write-ups, colors, slider positions) and the 13 questions (answer text, slider positions, and which musicians each answer is a "dead giveaway" for). Scoring is at the bottom.
- `app.js` runs the quiz. `style.css` is the look.
- `node scripts/simulate.js` checks the scoring after edits: how often each musician comes up with random answers, and that every musician can still be reached. It exits non-zero if one can't.

Run it locally with `python3 -m http.server` and open http://localhost:8000.
