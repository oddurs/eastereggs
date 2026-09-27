export type Story = {
  id: string;
  number: string;
  title: string;
  description: string;
  project: string;
  language: string;
  category: string;
  repo: string;
  branch: string;
  file: string;
  sha: string;
  commitDate: string;
  commitMessage: string;
  command: string;
  code: string;
  paragraphs: string[];
  note: string;
  visual: "cow" | "gravity" | "zen" | "blessing" | "42" | "doctor";
};

export const cow = `        (__)\n        (oo)\n  /------\\/\n / |    ||\n*  /\\---/\\\n   ~~   ~~`;

export const stories: Story[] = [
  {
    id: "super-cow-powers",
    number: "001",
    title: "This APT has Super Cow Powers.",
    description:
      "A package manager. A secret command. A surprisingly well-maintained cow. Meet the most charming dependency in Debian.",
    project: "Debian / APT",
    language: "C++",
    category: "Terminal folklore",
    repo: "Debian/apt",
    branch: "main",
    file: "apt-private/private-moo.cc",
    sha: "753d76f3d3b9be05d2e3517e4f1e4669531f92a3",
    commitDate: "2025-11-04",
    commitMessage: "A special cow for a special week",
    command: "apt-get moo",
    code: "$ apt-get moo\n\n" + cow + '\n\n"Have you mooed today?"',
    visual: "cow",
    paragraphs: [
      "Package managers are deeply practical things. They resolve dependencies, fetch archives, and quietly keep a machine running. Then you ask APT to moo, and a little ASCII cow looks back at you.",
      "This is no shell alias. The cow lives in APT’s own source tree, in a file called private-moo.cc. There are multiple illustrations and messages, with logic that chooses between them. Someone has done real engineering to make a package manager a little less serious.",
      "Follow the file history and the joke keeps going. A November 2025 change is titled “A special cow for a special week.” The code around a classic illustration calls it “our trustworthy super cow since 2001.” Even whimsy needs maintenance.",
    ],
    note: "On a system with APT installed, run the command without sudo. The exact cow and message can vary by version and date.",
  },
  {
    id: "import-antigravity",
    number: "002",
    title: "Python can make you fly.",
    description:
      "One import, one webcomic, and a standard library that knows how to take a joke.",
    project: "Python / CPython",
    language: "Python",
    category: "A little levity",
    repo: "python/cpython",
    branch: "main",
    file: "Lib/antigravity.py",
    sha: "4c0a31fb08407ba043688ad1c21102dd4cb99146",
    commitDate: "2020-04-14",
    commitMessage:
      "bpo-9216: Nobody expects the geohashing FIPS inquisition (GH-19520)",
    command: 'python -c "import antigravity"',
    code: 'import webbrowser\nimport hashlib\n\nwebbrowser.open("https://xkcd.com/353/")',
    visual: "gravity",
    paragraphs: [
      "Most imports give you a tool. This one gives you a browser tab. Import antigravity in Python and the standard library opens xkcd’s Python comic, where programming becomes so pleasant that flying seems like a reasonable next feature.",
      "The implementation is wonderfully direct: import the webbrowser module, then open the comic. It is a small, executable thank-you to a joke about the language.",
      "The file also implements the geohashing algorithm from another xkcd comic. Its history records ordinary maintenance alongside the playfulness, including a change to how the hash is called. A joke shipped as software still has to live in the real world.",
    ],
    note: "This command opens xkcd.com in your default browser. It works best in a desktop Python installation.",
  },
  {
    id: "zen-of-python",
    number: "003",
    title: "A little philosophy. ROT13 included.",
    description:
      "Python’s guiding principles are hiding in plain sight. The implementation has a sense of irony.",
    project: "Python / CPython",
    language: "Python",
    category: "Words to code by",
    repo: "python/cpython",
    branch: "main",
    file: "Lib/this.py",
    sha: "be19ed77ddb047e02fe94d142181062af6d99dcc",
    commitDate: "2007-02-09",
    commitMessage: "Fix most trivially-findable print statements.",
    command: 'python -c "import this"',
    code: ">>> import this\nThe Zen of Python, by Tim Peters\n\nBeautiful is better than ugly.\nExplicit is better than implicit.",
    visual: "zen",
    paragraphs: [
      "Type import this into a Python interpreter and a set of design aphorisms appears. Written by Tim Peters, the Zen of Python turns an otherwise unassuming module into a tiny reading break.",
      "Open the file and the text looks scrambled. The module stores its message in ROT13 and decodes it at import time. There is a pleasing little contradiction in making a statement about clarity deliberately less obvious to read.",
      "The linked file history includes a 2007 update for print statements. A small module, a long paper trail, and a reminder that source code can carry the culture of a language as well as its functionality.",
    ],
    note: "Run this in a fresh Python process. As with other modules, importing it again in the same session will not repeat its top-level output.",
  },
  {
    id: "sqlite-blessing",
    number: "004",
    title: "A blessing at the top of the file.",
    description:
      "Before the database gets down to business, SQLite has something human to say.",
    project: "SQLite",
    language: "C",
    category: "Between the lines",
    repo: "sqlite/sqlite",
    branch: "master",
    file: "src/main.c",
    sha: "9173c2f1b6ce8a26becc19d39e5fe6bd7844aeff",
    commitDate: "2026-09-11",
    commitMessage: "Use a fast comparison for text keys in temporary indexes.",
    command: "",
    code: "/*\n** May you do good and not evil.\n** May you find forgiveness for yourself\n** and forgive others.\n*/",
    visual: "blessing",
    paragraphs: [
      "Some discoveries do not need a secret command. Open SQLite’s main.c and, before the database machinery begins, you find a short blessing in the file header.",
      "It asks something of the person reading the source: kindness, forgiveness, and generosity. It has no effect on execution. Its entire audience is another human being.",
      "SQLite’s primary development history lives in Fossil; the GitHub repository is a mirror. That makes this a useful reminder that the trail does not always begin with Git. Follow the original project when you want the full context.",
    ],
    note: "This is a source-code discovery, not a hidden runtime command. The excerpt above is shortened; the linked file contains the full header.",
  },
  {
    id: "vim-42",
    number: "005",
    title: "Vim has an answer for everything.",
    description:
      "Even the meaning of life. You just have to know which help page to ask for.",
    project: "Vim",
    language: "Vim help",
    category: "Read the friendly manual",
    repo: "vim/vim",
    branch: "master",
    file: "runtime/doc/usr_42.txt",
    sha: "e7e21018fc0b60c153c8e668f696d95e574cc5a4",
    commitDate: "2026-02-14",
    commitMessage: "patch 9.2.0: Need a new Vim release",
    command: ":help 42",
    code: ":help 42\n\nWhat is the meaning of life,\nthe universe and everything?",
    visual: "42",
    paragraphs: [
      "Vim’s help system is famously thorough. Naturally, it also has a help tag for the meaning of life, the universe, and everything.",
      "Enter :help 42 and the editor follows a tag tucked into chapter 42 of the user manual. It is a quiet nod to The Hitchhiker’s Guide to the Galaxy, placed exactly where an inquisitive reader might stumble into it.",
      "There is no elaborate animation or hidden game. Just a help tag, a question, and a shared reference. Sometimes the smallest Easter eggs feel the most like finding a note from the person who made your tools.",
    ],
    note: "Run this inside Vim. The source link opens the manual containing the help tag, and its history follows changes to that document.",
  },
  {
    id: "emacs-doctor",
    number: "006",
    title: "Your editor would like to talk.",
    description: "Somewhere between editing text and running your life, Emacs found time to listen.",
    project: "GNU Emacs",
    language: "Emacs Lisp",
    category: "An unexpected conversation",
    repo: "emacs-mirror/emacs",
    branch: "master",
    file: "lisp/play/doctor.el",
    sha: "f1dd84bec9947586d9bd12824a8084ef5edc2055",
    commitDate: "2026-05-31",
    commitMessage: "Fix Samaritans URL (bug#81155).",
    command: "M-x doctor",
    code: "M-x doctor\n\n;; Type a sentence.\n;; Press Return twice to let the doctor respond.",
    visual: "doctor",
    paragraphs: [
      "Emacs has a reputation for doing a little of everything. Type M-x doctor and that ambition takes an unexpected turn: a buffer opens for a conversation with a pretend psychotherapist.",
      "The program lives in lisp/play/doctor.el. Its replies come from code, word matching, and prepared phrases. Reading the source is part of the fun: you can follow the machinery that turns what you type into a question back at you.",
      "This is a playful program bundled with a very serious editor. A May 2026 change in its history updates a URL, a small sign that even the less practical corners of a codebase can receive care.",
    ],
    note: "In Emacs, press Alt+X (Option+X on some Macs), type doctor, and press Return. This is a retro conversation game, not a health service.",
  },
];

export const sourceUrl = (s: Story) =>
  `https://github.com/${s.repo}/blob/${s.sha}/${s.file}`;
export const historyUrl = (s: Story) =>
  `https://github.com/${s.repo}/commits/${s.branch}/${s.file}`;
