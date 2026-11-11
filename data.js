// Spirit Jazz Animal: all quiz content lives here.
//
// Every musician has four coordinates, each from -2 to +2:
//   out    -2 inside the tradition  ...  +2 burns the rulebook
//   heat   -2 cool, restrained      ...  +2 maximum intensity
//   stage  -2 hermit                ...  +2 showman
//   cosmos -2 earthly               ...  +2 cosmic
//
// Every answer has coordinates too ("this answer sounds like someone at..."),
// plus a short list of musicians it's a dead giveaway for (bonus points).
// See the scoring section at the bottom. Tweak numbers here; nothing else
// needs to change.

(function (root) {
  const MUSICIANS = [
    {
      id: "cool-miles", name: "Miles Davis", tag: "(the cool years)", instrument: "Trumpet",
      pos: [0, -2, -1, -1], color: "#1f4e79",
      title: "The Minimalist",
      blurb: "You say four words and leave the room, and everyone spends a week deciding what you meant. You have never once explained yourself. You never needed to.",
      deep: "Your Harmon mute counts as a personality. Your silences have been transcribed by grad students.",
      listen: "“So What”, Kind of Blue (1959)"
    },
    {
      id: "electric-miles", name: "Miles Davis", tag: "(the electric years)", instrument: "Trumpet + wah-wah pedal",
      pos: [2, 1, -1, 0], color: "#8e1b4c",
      title: "The Reinventor",
      blurb: "The moment people figure you out, you change everything to annoy them. Sunglasses indoors. Back to the audience. You were right, and that's the worst part.",
      deep: "Purists still write angry letters about Bitches Brew. You have never read one. You plugged in your trumpet and let the rest of jazz catch up.",
      listen: "“Pharaoh's Dance”, Bitches Brew (1970)"
    },
    {
      id: "rollins", name: "Sonny Rollins", instrument: "Tenor saxophone",
      pos: [0, 1, -1, -1], color: "#b5651d",
      title: "The Sabbatical",
      blurb: "When you're at the top of your game you quit, go away, and come back better. People call it a breakdown. You call it practice.",
      deep: "You practiced on the Williamsburg Bridge for two years so you wouldn't bother the neighbors. Then you named the comeback album The Bridge.",
      listen: "“St. Thomas”, Saxophone Colossus (1956)"
    },
    {
      id: "bird", name: "Charlie Parker", tag: "“Bird”", instrument: "Alto saxophone",
      pos: [0, 2, 0, -2], color: "#c0392b",
      title: "The Comet",
      blurb: "You're a genius at 2 a.m. and a mess by 3. You do in ten minutes what takes everyone else ten years, and then you lose your coat.",
      deep: "Jo Jones once threw a cymbal at your feet to get you off the stage. You went home, woodshedded, and invented bebop out of spite.",
      listen: "“Ko-Ko” (1945)"
    },
    {
      id: "monk", name: "Thelonious Monk", instrument: "Piano",
      pos: [1, 0, 1, 0], color: "#2e7d32",
      title: "The Right Wrong Note",
      blurb: "Your timing is off on purpose, and so is everything else, and somehow it works better. You have a hat for every occasion and you invent new occasions.",
      deep: "You get up in the middle of a set and dance in slow circles while the band keeps playing. They keep playing because they've learned to.",
      listen: "“Straight, No Chaser” (1951)"
    },
    {
      id: "kirk", name: "Rahsaan Roland Kirk", instrument: "Three saxophones at once",
      pos: [1, 2, 2, 0], color: "#d35400",
      title: "The Multitasker",
      blurb: "Doing one thing at a time is for cowards. You're answering email, cooking dinner, and winning an argument at the same time, and doing all three well.",
      deep: "Tenor, manzello, and stritch, all in your mouth at once, with circular breathing so you never have to stop. You called it Black Classical Music and dared anyone to argue.",
      listen: "“Volunteered Slavery” (1969)"
    },
    {
      id: "sun-ra", name: "Sun Ra", instrument: "Keyboards, the cosmos",
      pos: [2, 1, 2, 2], color: "#6a1b9a",
      title: "The Visitor",
      blurb: "You're not from around here, and you'd like everyone to stop pretending you are. You wear the outfit. You lead the cult. You mean all of it.",
      deep: "You said you were from Saturn. Your birth certificate says Birmingham, Alabama. The Arkestra never asked which one was true.",
      listen: "“Space Is the Place” (1973)"
    },
    {
      id: "metheny", name: "Pat Metheny", instrument: "Guitar (several hundred)",
      pos: [-1, 0, 0, -1], color: "#00838f",
      title: "The Gearhead",
      blurb: "You're the nicest person in the room and the one with the most stuff. Your hobbies need their own storage unit. You have one strong opinion, and you will share it.",
      deep: "You commissioned a 42-string guitar. You also wrote the most famous takedown of Kenny G ever posted on the internet.",
      listen: "“Bright Size Life” (1976)"
    },
    {
      id: "coltrane", name: "John Coltrane", instrument: "Tenor & soprano saxophone",
      pos: [1, 2, -1, 2], color: "#283593",
      title: "The Seeker",
      blurb: "You practice twelve hours a day and you're looking for God, and you might be getting close. Your idea of a fun weekend is a spiritual breakthrough.",
      deep: "Critics called it “sheets of sound.” There's a church in San Francisco that made you a saint. Literally.",
      listen: "A Love Supreme (1965)"
    },
    {
      id: "billie", name: "Billie Holiday", tag: "“Lady Day”", instrument: "Voice",
      pos: [-1, 1, 0, -2], color: "#ad1457",
      title: "The Truth-Teller",
      blurb: "You feel everything, all the way, and you don't hide it. You can say one line in a way that ends the conversation. You've never faked a feeling in your life.",
      deep: "Lester Young called you Lady Day and you called him Prez. You sang “Strange Fruit” when nobody else would dare.",
      listen: "“Strange Fruit” (1939)"
    },
    {
      id: "ella", name: "Ella Fitzgerald", instrument: "Voice",
      pos: [-2, 0, 2, -1], color: "#f9a825",
      title: "The Improviser",
      blurb: "You forget the words and make up better ones, and the room loves you more for it. Nothing rattles you, because you can turn anything into a bit.",
      deep: "You blanked on “Mack the Knife” in front of a Berlin audience, made up the rest on the spot, and won a Grammy for it.",
      listen: "“Mack the Knife”, Ella in Berlin (1960)"
    },
    {
      id: "louis", name: "Louis Armstrong", tag: "“Satchmo”", instrument: "Trumpet & voice",
      pos: [-2, 1, 2, -1], color: "#e65100",
      title: "The Ambassador",
      blurb: "Everyone's favorite person, and nobody notices you're also the most important one in the room. You can make a stranger smile from across an airport.",
      deep: "Everybody knows “What a Wonderful World.” The heads know the Hot Fives and Sevens basically invented the jazz solo.",
      listen: "“West End Blues” (1928)"
    },
    {
      id: "mingus", name: "Charles Mingus", instrument: "Bass",
      pos: [1, 2, 1, -1], color: "#4e342e",
      title: "The Volcano",
      blurb: "You will stop the show to tell the room exactly what's wrong with it. You're usually right. You're also a lot.",
      deep: "You once punched your trombonist, Jimmy Knepper, and knocked out a tooth. You titled your autobiography Beneath the Underdog, which tracks.",
      listen: "“Fables of Faubus”, Mingus Ah Um (1959)"
    },
    {
      id: "ornette", name: "Ornette Coleman", instrument: "Alto saxophone (plastic)",
      pos: [2, 0, -1, 1], color: "#00695c",
      title: "The Rule-Burner",
      blurb: "Rules are a suggestion, and you didn't take the suggestion. You have a whole system that explains everything you do. No one has ever understood it, including some people who played in your band.",
      deep: "You called it “harmolodics.” You played a white plastic sax. Your album title, The Shape of Jazz to Come, turned out to be literally true.",
      listen: "“Lonely Woman”, The Shape of Jazz to Come (1959)"
    },
    {
      id: "shorter", name: "Wayne Shorter", instrument: "Tenor & soprano saxophone",
      pos: [1, -1, -2, 2], color: "#37474f",
      title: "The Riddler",
      blurb: "You answer every question with a riddle that turns out to be right ten years later. People call you a genius mostly because they're not sure what you said.",
      deep: "You wrote half the songs in the Real Book and said “jazz means I dare you.” Weather Report, Miles's second quintet, Buddhism. All of it.",
      listen: "“Footprints” (1966)"
    },
    {
      id: "jaco", name: "Jaco Pastorius", instrument: "Fretless bass",
      pos: [0, 2, 2, -1], color: "#1565c0",
      title: "The Greatest (Self-Declared)",
      blurb: "You walk in and tell everyone you're the best in the world. Annoyingly, you might be. You make everything louder, faster, and more of a story.",
      deep: "You introduced yourself to Joe Zawinul as the greatest bass player in the world. You pried the frets off your bass yourself.",
      listen: "“Donna Lee”, Jaco Pastorius (1976)"
    },
    {
      id: "wes", name: "Wes Montgomery", instrument: "Guitar (with his thumb)",
      pos: [-2, -1, -1, -2], color: "#5d4037",
      title: "The Working Genius",
      blurb: "You worked the day shift, played gigs all night, and never complained once. You do the impossible thing the easy way and then shrug about it.",
      deep: "You played with your thumb because a pick was too loud for the neighbors. Every guitarist since has tried and failed to copy the octaves.",
      listen: "“Four on Six”, The Incredible Jazz Guitar of Wes Montgomery (1960)"
    },
    {
      id: "roach", name: "Max Roach", instrument: "Drums",
      pos: [0, 1, 0, -2], color: "#212121",
      title: "The Activist",
      blurb: "You made the background instrument the main event, then made it about something. You show up to the party with a petition, and people sign it.",
      deep: "We Insist! Freedom Now Suite. Co-leader with Clifford Brown. You were the first jazz musician to get a MacArthur “genius” grant.",
      listen: "We Insist! Max Roach's Freedom Now Suite (1960)"
    },
    {
      id: "elvin", name: "Elvin Jones", instrument: "Drums",
      pos: [0, 2, 0, 0], color: "#bf360c",
      title: "The Polyrhythm",
      blurb: "You are keeping four different schedules at once and somehow they all line up. Everyone else is exhausted watching you. You're just warming up.",
      deep: "The engine of the classic Coltrane Quartet. Your brothers were Hank and Thad Jones, so the family Thanksgiving was probably loud.",
      listen: "“My Favorite Things”, John Coltrane (1961)"
    },
    {
      id: "herbie", name: "Herbie Hancock", instrument: "Piano, synths, keytar",
      pos: [0, 0, 1, 0], color: "#7b1fa2",
      title: "The Early Adopter",
      blurb: "You bought the new gadget before it came out, and you're already making something cool with it. Every few years you start over in a new style and it works every time.",
      deep: "Miles's second quintet, then Head Hunters, then “Rockit” on MTV. Your keytar is not a joke. Your keytar is serious.",
      listen: "“Chameleon”, Head Hunters (1973)"
    },
    {
      id: "jarrett", name: "Keith Jarrett", instrument: "Piano (and moaning)",
      pos: [-1, 1, -2, 1], color: "#455a64",
      title: "The Purist",
      blurb: "You moan along to your own music and then stop the show because someone coughed. You're not difficult. Everyone else is just loud.",
      deep: "You played The Köln Concert on a broken piano and it became the best-selling solo piano album ever. You still won't let anyone cough.",
      listen: "The Köln Concert (1975)"
    },
    {
      id: "duke", name: "Duke Ellington", instrument: "Piano, the whole orchestra",
      pos: [-2, -1, 2, 0], color: "#4a148c",
      title: "The Bandleader",
      blurb: "Charm is your management style. You get twenty difficult people to do exactly what you want for fifty years, and they thank you for it. “We love you madly.”",
      deep: "“Take the ‘A’ Train” is your theme song. Billy Strayhorn wrote it. Credit goes where the charm goes.",
      listen: "“Take the ‘A’ Train” (1941)"
    },
    {
      id: "mary-lou", name: "Mary Lou Williams", instrument: "Piano, composition",
      pos: [-1, -1, -2, 1], color: "#00796b",
      title: "The Mentor",
      blurb: "You taught everyone the good stuff, and they got famous for it. You're fine. (You're not totally fine.) Without you, half of what's cool wouldn't exist.",
      deep: "Monk, Bud Powell, and Dizzy all hung out in your Harlem apartment working out bebop. You wrote for Ellington and Goodman, then wrote a mass.",
      listen: "Zodiac Suite (1945)"
    },
    {
      id: "alice", name: "Alice Coltrane", instrument: "Harp, piano, organ",
      pos: [1, -1, -1, 2], color: "#0277bd",
      title: "The Mystic",
      blurb: "You went further out than anyone, and you did it calmly. You own a harp, an incense collection, and a sense of peace that people find a little scary.",
      deep: "You founded an ashram in California and recorded devotional music there for decades. Swamini Turiyasangitananda, to her students.",
      listen: "Journey in Satchidananda (1971)"
    }
  ];

  // Each answer: [text, [out, heat, stage, cosmos], [giveaway musician ids]]
  const QUESTIONS = [
    { q: "You're twenty minutes late to the party. Why?", a: [
      ["Still practicing.", [0, 2, -2, 1], ["coltrane", "rollins"]],
      ["Changed outfits three times.", [1, 0, 2, 1], ["sun-ra", "duke"]],
      ["I'm not late. They're early.", [2, 0, -1, 0], ["ornette", "monk"]],
      ["Got distracted staring at the sky.", [1, -1, -1, 2], ["alice"]],
      ["Got held up at work. Double shift.", [-2, -1, -1, -2], ["wes"]]
    ]},
    { q: "Someone coughs during your favorite song.", a: [
      ["Stop everything. Stare at them.", [-1, 1, -2, 1], ["jarrett"]],
      ["Work the cough into the melody.", [1, 0, 1, 0], ["monk", "kirk"]],
      ["Didn't notice. I was somewhere else.", [1, -1, -1, 2], ["shorter", "coltrane"]],
      ["Lecture the whole room about respect.", [1, 2, 1, -1], ["mingus"]]
    ]},
    { q: "Pick a superpower.", a: [
      ["Being in three places at once.", [1, 2, 2, 0], ["kirk", "elvin"]],
      ["Never repeating myself.", [2, 1, -1, 0], ["electric-miles", "ornette"]],
      ["Making strangers love me instantly.", [-2, 0, 2, -1], ["louis", "ella"]],
      ["Speaking in riddles that turn out to be right.", [1, -1, -2, 2], ["shorter"]]
    ]},
    { q: "Your apartment is mostly…", a: [
      ["Gear. Cables, pedals, a synth I haven't unboxed.", [0, 0, 1, -1], ["herbie", "metheny"]],
      ["Books about politics, and a drum kit.", [0, 1, 0, -2], ["roach", "mingus"]],
      ["Incense, a harp, a small shrine.", [1, -1, -1, 2], ["alice", "coltrane"]],
      ["Empty. I basically live at the club.", [0, 2, 1, -2], ["bird", "jaco", "elvin"]]
    ]},
    { q: "How do you take criticism?", a: [
      ["I turn my back on them. Literally.", [2, 1, -1, 0], ["electric-miles"]],
      ["Disappear for two years, come back better.", [0, 1, -2, -1], ["rollins"]],
      ["Calmly explain they're from the wrong planet.", [2, 0, 1, 2], ["sun-ra"]],
      ["Feel it all the way down, then sing about it.", [-1, 1, 0, -2], ["billie"]],
      ["Write a 3,000-word reply and post it online.", [-1, 1, 0, -1], ["metheny", "mingus"]]
    ]},
    { q: "Your role in the group chat:", a: [
      ["I explain everything, and someone else gets the credit.", [-1, -1, -2, 1], ["mary-lou"]],
      ["I send one word. Everyone reads into it for days.", [0, -2, -1, -1], ["cool-miles"]],
      ["I organize the whole thing and charm everyone.", [-2, -1, 2, 0], ["duke"]],
      ["Forty messages at 3 a.m.", [0, 2, 1, -1], ["bird", "jaco"]]
    ]},
    { q: "Pick a drink.", a: [
      ["Something expensive, ice cold, no garnish.", [0, -2, -1, -1], ["cool-miles"]],
      ["Whatever's free and strong.", [0, 2, 0, -2], ["bird", "billie"]],
      ["Herbal tea. The ritual matters.", [1, -1, -2, 2], ["alice", "coltrane"]],
      ["Whatever the bartender's having. We're friends now.", [-1, 0, 2, -1], ["louis", "metheny"]]
    ]},
    { q: "Your work ethic:", a: [
      ["Twelve hours a day, every day, forever.", [1, 2, -1, 2], ["coltrane", "rollins"]],
      ["Day job, night gig, zero complaints.", [-2, -1, -1, -2], ["wes"]],
      ["Whenever inspiration hits. Usually 4 a.m.", [1, 0, 0, 0], ["monk"]],
      ["I announce that I'm the best, then prove it.", [0, 2, 2, -1], ["jaco"]]
    ]},
    { q: "Your signature dance move:", a: [
      ["Slow spinning circles in the middle of the room.", [1, 0, 1, 0], ["monk"]],
      ["Absolutely not. I'm here to listen.", [-1, -1, -2, 0], ["jarrett", "mary-lou"]],
      ["Whatever's trendy this year. I probably started it.", [0, 0, 1, 0], ["herbie"]],
      ["Keeping four rhythms going at once.", [0, 2, 0, 0], ["elvin", "roach"]],
      ["Scatting along. Words are optional.", [-2, 0, 2, -1], ["ella"]]
    ]},
    { q: "Describe your look.", a: [
      ["Sunglasses indoors, leather, something that sparkles.", [2, 1, -1, 0], ["electric-miles"]],
      ["Robes and a glittering space headdress.", [2, 1, 2, 2], ["sun-ra"]],
      ["A sharp suit. Always.", [-2, -1, 2, 0], ["duke", "cool-miles"]],
      ["A striped shirt. The same one. For decades.", [-1, 0, 0, -1], ["metheny"]]
    ]},
    { q: "You forget the words in front of 10,000 people. You…", a: [
      ["Make up new ones. Better ones.", [-2, 0, 2, -1], ["ella"]],
      ["Switch to moaning. It's more honest anyway.", [-1, 1, -2, 1], ["jarrett"]],
      ["Play the melody on two horns at once instead.", [1, 2, 2, 0], ["kirk"]],
      ["Walk off. They'll understand later.", [2, 1, -1, 0], ["electric-miles"]]
    ]},
    { q: "Pick a cause.", a: [
      ["Civil rights, loudly, on the record.", [0, 1, 0, -2], ["roach"]],
      ["Bringing joy to every country on Earth.", [-2, 1, 2, -1], ["louis"]],
      ["Getting the people who did the work some credit.", [-1, -1, -2, 1], ["mary-lou"]],
      ["Telling the truth about how hard it is out there.", [-1, 1, 0, -2], ["billie"]]
    ]},
    { q: "How do you want to be remembered?", a: [
      ["The one who changed everything. Twice.", [2, 1, -1, 0], ["electric-miles", "herbie"]],
      ["The one everybody loved.", [-2, 0, 2, -1], ["ella", "louis"]],
      ["The one who did three things nobody else could.", [1, 2, 2, 0], ["kirk"]],
      ["The one nobody fully understood.", [2, 0, -1, 1], ["ornette", "monk", "shorter"]],
      ["The one who made everyone else sound better.", [-1, 1, -1, 0], ["elvin", "wes"]]
    ]}
  ];

  // Scoring: each answer is a "dead giveaway" for one to three musicians, and
  // those musicians get a point. Points are divided by the square root of how
  // many answers a musician appears in, so the ones with lots of answers don't
  // win just by showing up more. Ties are broken by how close your answers'
  // coordinates sit to each musician on the four sliders.
  // Tuning knobs (checked with scripts/simulate.js):
  const WIDTH = 1.6;      // how far an answer's coordinates reach on the map
  const TIEBREAK = 0.4;  // weight of the coordinates vs. the giveaways

  function sim(ans, m) {
    const d2 = ans[1].reduce((t, v, k) => t + (v - m.pos[k]) ** 2, 0);
    return Math.exp(-d2 / (2 * WIDTH * WIDTH));
  }
  const APPEARS = {}, EXPECTED = {};
  for (const m of MUSICIANS) {
    APPEARS[m.id] = 0; EXPECTED[m.id] = 0;
    for (const q of QUESTIONS) for (const a of q.a) {
      if (a[2].includes(m.id)) APPEARS[m.id]++;
      EXPECTED[m.id] += sim(a, m) / q.a.length;
    }
  }

  function score(answerIdx) {
    const ranked = [];
    for (const m of MUSICIANS) {
      let give = 0, near = 0;
      answerIdx.forEach((ai, qi) => {
        const a = QUESTIONS[qi].a[ai];
        near += sim(a, m);
        if (a[2].includes(m.id)) give++;
      });
      const s = give / Math.sqrt(APPEARS[m.id] || 1) + TIEBREAK * (near / EXPECTED[m.id]);
      ranked.push({ m, s });
    }
    ranked.sort((x, y) => y.s - x.s);
    return { musician: ranked[0].m, runnersUp: ranked.slice(1, 3).map((r) => r.m) };
  }

  const api = { MUSICIANS, QUESTIONS, score };
  if (typeof module !== "undefined") module.exports = api;
  else root.QUIZ = api;
})(this);
