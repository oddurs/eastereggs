import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Bookmark,
  Check,
  Code2,
  Copy,
  Egg,
  GitBranch,
  GitCommitHorizontal,
  Search,
  Shuffle,
  Terminal,
  X,
  Plus,
} from "lucide-react";
import { cow, stories, sourceUrl, historyUrl, type Story } from "./stories";
import "./styles.css";

function Visual({
  type,
  featured = false,
}: {
  type: Story["visual"];
  featured?: boolean;
}) {
  if (type === "cow")
    return (
      <div className={`cow-visual ${featured ? "featured-cow" : ""}`}>
        <div className="terminal-caption">
          <span>● ● ●</span>
          <span>somewhere in your terminal</span>
          <Terminal size={14} />
        </div>
        <div className="cow-body">
          <span className="terminal-command">
            <span>$</span> apt-get moo
          </span>
          <pre aria-label="An ASCII cow">{cow}</pre>
          <span className="cow-message">“Have you mooed today?”</span>
        </div>
        <div className="terminal-bottom">
          <span>exit code 0</span>
          <span>joy returned 1</span>
        </div>
      </div>
    );
  if (type === "gravity")
    return (
      <div className="story-visual gravity-visual">
        <span className="visual-comment">
          # batteries included. gravity optional.
        </span>
        <svg
          viewBox="0 0 420 145"
          fill="none"
          aria-label="A person floating above the ground"
        >
          <path
            d="M45 126C124 119 290 120 380 126"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 6"
            opacity=".25"
          />
          <g
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="245" cy="35" r="11" />
            <path d="m237 45-22 27-27-10m27 10 17 22 30 4m-43-30-27-18-21 5m42 17-24 23-24-6" />
            <path d="m246 68 16 7m-23 13 5 8m-66-16-11 7" opacity=".3" />
          </g>
          <path
            d="M96 66h49m-38 8h28m-38 8h17"
            stroke="currentColor"
            opacity=".22"
          />
        </svg>
        <code>
          <span>&gt;&gt;&gt;</span> import antigravity
          <span className="code-cursor">▍</span>
        </code>
      </div>
    );
  if (type === "zen")
    return (
      <div className="story-visual zen-visual">
        <span className="visual-comment">$ python -c "import this"</span>
        <div>
          <span className="zen-line-number">01</span> Beautiful is better than
          ugly.
          <br />
          <span className="zen-line-number">02</span> Explicit is better than
          implicit.
          <br />
          <span className="zen-line-number">03</span> Simple is better than
          complex.
          <br />
          <span className="zen-line-number">04</span>{" "}
          <span className="faded">…</span>
        </div>
        <span className="visual-bottom">
          A philosophy disguised as a module.
        </span>
      </div>
    );
  if (type === "blessing")
    return (
      <div className="story-visual blessing-visual">
        <span className="visual-comment">src/main.c</span>
        <span className="big-asterisk">＊</span>
        <p>
          May you do good
          <br />
          and not evil.
        </p>
        <span className="visual-bottom">A comment with something to say.</span>
      </div>
    );
  if (type === "doctor") return <div className="story-visual doctor-visual"><span className="visual-comment">M-x doctor</span><div className="conversation-art"><span>the code won’t compile.</span><span>and how does that feel?<span className="code-cursor"> ▍</span></span></div><span className="visual-bottom">An editor with a little bedside manner.</span></div>;
  return (
    <div className="story-visual answer-visual">
      <span className="visual-comment">:help 42</span>
      <span className="big-answer">
        42<span>_</span>
      </span>
      <span className="visual-bottom">
        The answer was in the docs all along.
      </span>
    </div>
  );
}

function Modal({
  children,
  close,
  label,
  wide = false,
}: {
  children: React.ReactNode;
  close: () => void;
  label: string;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current!;
    el.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`modal ${wide ? "modal-wide" : ""}`}
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button
        className="icon-button close-modal"
        aria-label="Close dialog"
        onClick={close}
      >
        <X size={20} />
      </button>
      {children}
    </dialog>
  );
}

function App() {
  const [filter, setFilter] = useState("All discoveries");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Story | null>(
    () =>
      stories.find((s) => `#story/${s.id}` === window.location.hash) ?? null,
  );
  const [panel, setPanel] = useState<"about" | "submit" | "search" | null>(
    null,
  );
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("hidden-in-source-saved") || "[]",
      );
      return Array.isArray(data)
        ? data.filter((v): v is string => typeof v === "string")
        : [];
    } catch {
      return [];
    }
  });
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);
  const [eggFound, setEggFound] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    try {
      localStorage.setItem("hidden-in-source-saved", JSON.stringify(saved));
    } catch {
      /* Bookmarks still work for this session. */
    }
  }, [saved]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!active) setPanel((p) => (p === "search" ? null : "search"));
      }
    };
    window.addEventListener("keydown", fn);
    const hash = () =>
      setActive(
        stories.find((s) => `#story/${s.id}` === window.location.hash) ?? null,
      );
    window.addEventListener("hashchange", hash);
    return () => {
      window.removeEventListener("keydown", fn);
      window.removeEventListener("hashchange", hash);
    };
  }, [active]);
  useEffect(() => {
    if (panel === "search") searchRef.current?.focus();
  }, [panel]);
  const openStory = (story: Story) => {
    setPanel(null);
    setActive(story);
    setCopied(false);
    setCopyError(false);
    window.location.hash = `story/${story.id}`;
  };
  const closeStory = () => {
    setActive(null);
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search + "#collection",
    );
  };
  const toggleSave = (id: string) =>
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  const filtered = stories.filter(
    (s) =>
      (filter !== "Bookmarked" || saved.includes(s.id)) &&
      (filter !== "Python" || s.language === "Python") &&
      (filter !== "C / C++" || ["C", "C++"].includes(s.language)) &&
      `${s.title} ${s.description} ${s.project} ${s.language}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const copyCommand = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <>
      <header className="site-header page-width">
        <a className="wordmark" href="#" aria-label="Hidden in Source home">
          <span className="brand-icon">
            <Egg size={21} strokeWidth={1.65} />
          </span>
          hidden in source<span className="wordmark-period">.</span>
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-active" href="#collection">
            The collection
          </a>
          <button onClick={() => setPanel("about")}>About</button>
          <button
            className="nav-surprise"
            onClick={() =>
              openStory(stories[Math.floor(Math.random() * stories.length)])
            }
          >
            <Shuffle size={14} /> Surprise me
          </button>
        </nav>
        <button
          className="submit-button"
          onClick={() => {
            setDraftOpened(false);
            setPanel("submit");
          }}
        >
          Suggest an egg <Plus size={15} />
        </button>
      </header>
      <main className="page-width">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-square" /> A FIELD GUIDE TO SOFTWARE’S
              HIDDEN SIDE
            </div>
            <h1 id="hero-title">
              Serious code.
              <br />
              <span>Hidden delights.</span>
            </h1>
            <p>
              Easter eggs, inside jokes, and little acts of humanity
              <br className="desktop-break" /> tucked away in the code we use
              every day.
            </p>
            <a className="hero-link" href="#collection">
              Go down the rabbit hole <ArrowDown size={16} />
            </a>
          </div>
          <button
            className={`hero-art ${eggFound ? "egg-found" : ""}`}
            aria-label="Inspect the hidden egg"
            onClick={() => setEggFound((v) => !v)}
          >
            <div className="art-top">
              <Code2 size={14} />
              <span>{eggFound ? "secret.txt" : "nothing_to_see_here.txt"}</span>
              <span>↗</span>
            </div>
            <pre aria-hidden="true">{`        .-========-.\n      .'  .  .  .   '.\n     /  .   .   .  .  \\\n    / .   .   .   .  . \\\n   /   .  .   .  .   .  \\\n  |  .   .  /\\  .   .   |\n  | .  .   /  \\   .  .  |\n  |   .   / /\\ \\ .   . |\n  | .   . \\/  \\/   .   |\n   \\  .   .   .  .   . /\n    '.   .   .   .   .'\n      '-._________.-'`}</pre>
            <span className="art-caption">
              {eggFound
                ? "// you found one. curiosity looks good on you."
                : "// someone left a little something here."}
            </span>
            <span className="art-coordinate">
              FIG. 01 — AN UNEXPECTED RETURN VALUE
            </span>
          </button>
        </section>
        <div className="intro-strip">
          <span>
            <GitBranch size={15} /> Real code. Traceable history. Completely
            unnecessary.
          </span>
          <span>And that’s the point.</span>
        </div>
        <section
          className="featured-section"
          aria-labelledby="featured-heading"
        >
          <div className="section-label">
            <span>THE FEATURED FIND</span>
            <span>NO. 001</span>
          </div>
          <div className="featured">
            <button
              className="visual-open"
              aria-label="Read This APT has Super Cow Powers"
              onClick={() => openStory(stories[0])}
            >
              <Visual type="cow" featured />
            </button>
            <div className="featured-copy">
              <div className="story-eyebrow">
                <span className="project-label">Debian / APT</span>
                <span className="live-badge">
                  <i /> In the source
                </span>
              </div>
              <h2 id="featured-heading">
                <button onClick={() => openStory(stories[0])}>
                  This APT has
                  <br />
                  Super Cow Powers.
                </button>
              </h2>
              <p>
                A package manager. A secret command. A surprisingly
                well-maintained cow. Meet the most charming dependency in
                Debian.
              </p>
              <div className="featured-meta">
                <span>C++</span>
                <span className="meta-dot">·</span>
                <span>Terminal folklore</span>
              </div>
              <div className="featured-actions">
                <button
                  className="text-link"
                  onClick={() => openStory(stories[0])}
                >
                  Meet the cow <ArrowRight size={17} />
                </button>
                <button
                  className={`icon-button ${saved.includes(stories[0].id) ? "is-saved" : ""}`}
                  aria-label={
                    saved.includes(stories[0].id)
                      ? "Remove APT bookmark"
                      : "Bookmark APT"
                  }
                  aria-pressed={saved.includes(stories[0].id)}
                  onClick={() => toggleSave(stories[0].id)}
                >
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="collection"
          className="collection"
          aria-labelledby="collection-heading"
        >
          <div className="collection-heading">
            <div>
              <h2 id="collection-heading">
                A few good rabbit holes
                <span>({stories.length.toString().padStart(2, "0")})</span>
              </h2>
              <p>Small discoveries. Good stories. Source code to prove it.</p>
            </div>
            <button
              className="search-trigger"
              onClick={() => setPanel("search")}
            >
              <Search size={16} />
              <span>Find something</span>
              <kbd>⌘ K</kbd>
            </button>
          </div>
          <div className="filter-bar">
            <div className="filters" aria-label="Filter discoveries">
              {["All discoveries", "Python", "C / C++", "Bookmarked"].map(
                (f) => (
                  <button
                    key={f}
                    className={filter === f ? "selected" : ""}
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {f === "Bookmarked" && <Bookmark size={13} />} {f}
                    {f === "Bookmarked" && saved.length > 0 && (
                      <span>{saved.length}</span>
                    )}
                  </button>
                ),
              )}
            </div>
            <span className="filter-note">Worth a look under the hood.</span>
          </div>
          {query && (
            <div className="query-notice">
              Results for “{query}”{" "}
              <button onClick={() => setQuery("")}>
                Clear search <X size={13} />
              </button>
            </div>
          )}
          <div className="story-grid">
            {filtered.map((story) => (
              <article className="story-card" key={story.id}>
                <button
                  className="visual-open"
                  onClick={() => openStory(story)}
                  aria-label={`Read ${story.title}`}
                >
                  <Visual type={story.visual} />
                  <span className="visual-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </button>
                <div className="card-copy">
                  <div className="card-topline">
                    <span>{story.project}</span>
                    <span className="card-number">/{story.number}</span>
                  </div>
                  <h3>
                    <button onClick={() => openStory(story)}>
                      {story.title}
                    </button>
                  </h3>
                  <p>{story.description}</p>
                  <div className="card-footer">
                    <span className="language-tag">{story.language}</span>
                    <a href={sourceUrl(story)} target="_blank" rel="noreferrer">
                      <GitBranch size={13} /> View source{" "}
                      <ArrowUpRight size={12} />
                    </a>
                    <button
                      className={`icon-button ${saved.includes(story.id) ? "is-saved" : ""}`}
                      aria-label={`${saved.includes(story.id) ? "Remove bookmark for" : "Bookmark"} ${story.title}`}
                      aria-pressed={saved.includes(story.id)}
                      onClick={() => toggleSave(story.id)}
                    >
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <Bookmark size={25} />
              <h3>
                {filter === "Bookmarked"
                  ? "Keep a little curiosity for later."
                  : "Nothing hiding here. Yet."}
              </h3>
              <p>
                {filter === "Bookmarked"
                  ? "Bookmark a story and it will be waiting here on this device."
                  : "Try a different search or explore the whole collection."}
              </p>
              <button
                className="text-link"
                onClick={() => {
                  setFilter("All discoveries");
                  setQuery("");
                }}
              >
                Explore all discoveries <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>
        <section className="closing-note">
          <div className="note-icon">
            <Code2 size={25} strokeWidth={1.3} />
          </div>
          <div>
            <span className="eyebrow">THERE ARE PEOPLE IN THERE.</span>
            <h2>Not every line needs to be productive.</h2>
            <p>
              Behind the tools we depend on are people who occasionally leave
              <br className="desktop-break" /> something just because it made
              them smile. This is a place for those things.
            </p>
          </div>
          <button className="text-link" onClick={() => setPanel("about")}>
            A note about this project <ArrowUpRight size={16} />
          </button>
        </section>
      </main>
      <footer className="site-footer page-width">
        <a className="wordmark footer-wordmark" href="#">
          <Egg size={17} /> hidden in source.
        </a>
        <span>Made for the curious. Follow the source.</span>
        <a
          href="https://github.com/oddurs/eastereggs"
          target="_blank"
          rel="noreferrer"
        >
          On GitHub <ArrowUpRight size={13} />
        </a>
      </footer>
      {active && (
        <Modal key={active.id} close={closeStory} label={active.title} wide>
          <article className="article">
            <div className="eyebrow">
              FIELD NOTE {active.number} <span> / </span> {active.category}
            </div>
            <h1>{active.title}</h1>
            <p className="article-deck">{active.description}</p>
            <div className="article-meta">
              <span>{active.project}</span>
              <span className="language-tag">{active.language}</span>
              <button
                className="text-link"
                onClick={() => toggleSave(active.id)}
              >
                <Bookmark
                  size={14}
                  fill={saved.includes(active.id) ? "currentColor" : "none"}
                />
                {saved.includes(active.id) ? "Saved" : "Save story"}
              </button>
            </div>
            <Visual type={active.visual} />
            <h2>The little thing in the source</h2>
            {active.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h2>
              {active.command ? "Try it yourself" : "Read between the lines"}
            </h2>
            <div className="article-code">
              <div>
                <span>{active.command || active.file}</span>
                <button
                  className="icon-button"
                  aria-label="Copy command or excerpt"
                  onClick={() => copyCommand(active.command || active.code)}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <pre>
                <code>{active.code}</code>
              </pre>
            </div>
            <p className="article-note">
              {copyError
                ? "Clipboard unavailable. Select and copy the command above. "
                : ""}
              {active.note}
            </p>
            <section className="source-trail">
              <div className="eyebrow">
                <GitBranch size={14} /> FOLLOW THE SOURCE
              </div>
              <a
                className="source-file"
                href={sourceUrl(active)}
                target="_blank"
                rel="noreferrer"
              >
                {active.file}
                <ArrowUpRight size={16} />
              </a>
              <div className="commit-row">
                <GitCommitHorizontal size={19} />
                <div>
                  <a
                    href={`https://github.com/${active.repo}/commit/${active.sha}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <code>{active.sha.slice(0, 7)}</code> · {active.commitDate}
                  </a>
                  <p>{active.commitMessage}</p>
                </div>
              </div>
              <p className="article-note">
                Source checked September 27, 2026. This snapshot pins a file
                revision; the history link follows later changes.
                {active.id === "sqlite-blessing" && (
                  <>
                    {" "}
                    SQLite’s original history is on{" "}
                    <a
                      href="https://sqlite.org/src/finfo?name=src/main.c"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Fossil ↗
                    </a>
                    .
                  </>
                )}
              </p>
              <a
                className="text-link"
                href={historyUrl(active)}
                target="_blank"
                rel="noreferrer"
              >
                Explore the file history <ArrowUpRight size={15} />
              </a>
            </section>
            <button
              className="next-story"
              onClick={() =>
                openStory(
                  stories[(stories.indexOf(active) + 1) % stories.length],
                )
              }
            >
              <span>ONE MORE RABBIT HOLE</span>
              <span>
                {stories[(stories.indexOf(active) + 1) % stories.length].title}{" "}
                <ArrowRight size={18} />
              </span>
            </button>
          </article>
        </Modal>
      )}
      {panel === "about" && (
        <Modal close={() => setPanel(null)} label="About Hidden in Source">
          <div className="information-panel">
            <Egg size={30} strokeWidth={1.3} />
            <div className="eyebrow">A NOTE ABOUT THIS PROJECT</div>
            <h2>Software has a human side.</h2>
            <p>
              This is a small field guide to the unnecessary, delightful things
              people leave in code. A cow in a package manager. A webcomic in a
              standard library. A kind word at the top of a file.
            </p>
            <p>
              Every discovery here links to a specific source revision and the
              file’s history. “In the source” means we found it in the upstream
              tree when we checked—not that every installed version behaves the
              same way.
            </p>
            <p>
              Some are secret commands. Others are simply things worth stumbling
              across. All of them are an excuse to read the source.
            </p>
            <div className="panel-footnote">
              Six discoveries to start. No tracking, no accounts.
              <br />
              Bookmarks stay in this browser.
            </div>
            <a
              className="text-link"
              href="#collection"
              onClick={() => setPanel(null)}
            >
              Back to the rabbit holes <ArrowRight size={16} />
            </a>
          </div>
        </Modal>
      )}
      {panel === "search" && (
        <Modal close={() => setPanel(null)} label="Search discoveries">
          <div className="search-panel">
            <h2>What are you curious about?</h2>
            <div className="search-input">
              <Search size={20} />
              <input
                ref={searchRef}
                aria-label="Search stories"
                placeholder="Try Python, a cow, or a little philosophy…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="search-results">
              {stories
                .filter((s) =>
                  `${s.title} ${s.project} ${s.description}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                )
                .map((s) => (
                  <button key={s.id} onClick={() => openStory(s)}>
                    <span className="search-result-number">{s.number}</span>
                    <span>
                      <strong>{s.title}</strong>
                      <small>{s.project}</small>
                    </span>
                    <ArrowUpRight size={17} />
                  </button>
                ))}
              {!stories.some((s) =>
                `${s.title} ${s.project} ${s.description}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              ) && <p>No discoveries found. Try a project name like Python.</p>}
            </div>
            <div className="panel-footnote">
              A small collection with a few good hiding places.
            </div>
          </div>
        </Modal>
      )}
      {panel === "submit" && (
        <Modal close={() => setPanel(null)} label="Suggest an Easter egg">
          <div className="information-panel">
            <div className="eyebrow">FOUND SOMETHING GOOD?</div>
            <h2>Leave a breadcrumb.</h2>
            <p>
              A great find comes with a source trail. Tell us what you found,
              then review and post your suggestion on GitHub.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const params = new URLSearchParams({ title: `Easter egg: ${data.get("title")}`, body: `Source: ${data.get("url")}\n\n## The story\n${data.get("story")}` });
                window.open(`https://github.com/oddurs/eastereggs/issues/new?${params}`, "_blank", "noopener,noreferrer");
                setDraftOpened(true);
              }}
            >
              <label>
                What did you find?
                <input
                  name="title"
                  required
                  maxLength={120}
                  placeholder="A little surprise in…"
                />
              </label>
              <label>
                Source or commit URL
                <input
                  name="url"
                  type="url"
                  required
                  maxLength={500}
                  placeholder="https://github.com/…"
                />
              </label>
              <label>
                Tell us the story
                <textarea
                  name="story"
                  required
                  rows={4}
                  maxLength={1800}
                  placeholder="Where is it hiding? How do you find it?"
                />
              </label>
              <button className="primary-button" type="submit">
                <ArrowUpRight size={16} /> Open suggestion on GitHub
              </button>
              {draftOpened && (
                <p role="status" className="form-success">
                  Finish posting in the GitHub tab. If it didn’t open, allow pop-ups and try again.
                </p>
              )}
              <span className="panel-footnote">
                Opens a draft issue in a new tab. A GitHub account is needed to post.
              </span>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
