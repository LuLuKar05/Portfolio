"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  PortfolioContent,
  PortfolioProject,
  ProjectCategory,
} from "@/content/types";

import styles from "./portfolio-experience.module.css";

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "AI",
  "Web3",
  "Platform",
];

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function hexToRgb(hex: string, fallback: [number, number, number]) {
  const match = /^#?([a-f\d]{3}|[a-f\d]{6})$/i.exec(hex.trim());
  if (!match) return fallback;
  let value = match[1];
  if (value.length === 3) {
    value = value
      .split("")
      .map((character) => character + character)
      .join("");
  }
  const parsed = Number.parseInt(value, 16);
  return [
    (parsed >> 16) & 255,
    (parsed >> 8) & 255,
    parsed & 255,
  ] as [number, number, number];
}

function useDialog(open: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const firstFocusable =
      dialog?.querySelector<HTMLElement>("[data-autofocus]") ??
      dialog?.querySelector<HTMLElement>(focusableSelector);
    window.requestAnimationFrame(() => firstFocusable?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, onClose]);

  return dialogRef;
}

function Arrow({ left = false }: { left?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className={left ? styles.arrowLeft : undefined}
    >
      <path d="M1 6h13M10 1.5 14.5 6 10 10.5" />
    </svg>
  );
}

function OrbitSystem() {
  return (
    <div className={styles.orbits} aria-hidden="true">
      <div className={`${styles.orbit} ${styles.orbitMiddle}`}>
        <span
          className={`${styles.planetTrack} ${styles.trackMiddlePrimary}`}
          data-always-animate
        >
          <span className={`${styles.planetWrap} ${styles.planetRinged}`}>
            <i className={styles.planetRing} />
            <i className={styles.planetHuge} />
          </span>
        </span>
        <span
          className={`${styles.planetTrack} ${styles.trackMiddleSecondary}`}
          data-always-animate
        >
          <span className={`${styles.planetWrap} ${styles.planetMiddleB}`}>
            <i className={styles.planetMicro} />
          </span>
        </span>
      </div>
      <div className={`${styles.orbit} ${styles.orbitInner}`}>
        <span
          className={`${styles.planetTrack} ${styles.trackInner}`}
          data-always-animate
        >
          <span className={`${styles.planetWrap} ${styles.planetInner}`}>
            <i className={styles.planetSmall} />
          </span>
        </span>
      </div>
    </div>
  );
}

export function PortfolioExperience({ content }: { content: PortfolioContent }) {
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [hover, setHover] = useState({ title: "", x: 0, y: 0, visible: false });
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const closeResume = useCallback(() => setResumeOpen(false), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const resumeDialogRef = useDialog(resumeOpen, closeResume);
  const contactDialogRef = useDialog(contactOpen, closeContact);

  const activeProject = useMemo(
    () => content.projects.find((project) => project.slug === activeSlug) ?? null,
    [activeSlug, content.projects],
  );
  const shownProjects = useMemo(
    () =>
      content.projects.filter(
        (project) =>
          category === "All" || project.filterCategory === category,
      ),
    [category, content.projects],
  );

  const inkRgb = hexToRgb(content.inkColor, [255, 255, 255]);
  const accentRgb = hexToRgb(content.accentColor, [220, 230, 240]);
  const orbitSpeed =
    Number.isFinite(content.orbitSpeed) && content.orbitSpeed > 0
      ? content.orbitSpeed
      : 1;
  const themeStyle = {
    "--bg": content.backgroundColor,
    "--ink-rgb": inkRgb.join(","),
    "--accent-rgb": accentRgb.join(","),
    "--orbit-middle-duration": `${20 / orbitSpeed}s`,
    "--orbit-middle-delay": `${-10 / orbitSpeed}s`,
    "--orbit-inner-duration": `${14 / orbitSpeed}s`,
    "--planet-opacity": content.showPlanets ? "1" : "0",
  } as CSSProperties;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const context = canvas.getContext("2d");
      if (!context) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      let seed = 7;
      const random = () =>
        (seed = (seed * 16807) % 2147483647) / 2147483647;
      for (let index = 0; index < content.starDensity; index += 1) {
        const radius = random() * 1.1 + 0.25;
        context.globalAlpha = 0.12 + random() * 0.5;
        context.fillStyle =
          random() > 0.85 ? content.accentColor : content.inkColor;
        context.beginPath();
        context.arc(random() * width, random() * height, radius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [content.accentColor, content.inkColor, content.starDensity]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    const revealElements = document.querySelectorAll(`.${styles.reveal}`);
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeSlug]);

  const openProject = (project: PortfolioProject) => {
    setActiveSlug(project.slug);
    setHover((current) => ({ ...current, visible: false }));
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const showHome = (event?: MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    setActiveSlug(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const openResume = () => {
    setContactOpen(false);
    setResumeOpen(true);
    setMenuOpen(false);
  };

  const openContact = () => {
    setResumeOpen(false);
    setContactOpen(true);
    setMenuOpen(false);
    setFormState("idle");
    setFormMessage("");
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("sending");
    setFormMessage("Sending your message…");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Message failed.");
      setFormState("success");
      setFormMessage(result.message || "Message sent. Thank you.");
      form.reset();
    } catch (error) {
      setFormState("error");
      setFormMessage(
        error instanceof Error
          ? error.message
          : "The message could not be sent. Please try again.",
      );
    }
  };

  const nameCharacters = content.name.toUpperCase().split("");
  const nextProject = activeProject
    ? content.projects[
        (content.projects.indexOf(activeProject) + 1) % content.projects.length
      ]
    : null;

  return (
    <div className={styles.site} style={themeStyle}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <canvas ref={canvasRef} className={styles.sky} aria-hidden="true" />
      <OrbitSystem />

      <header className={styles.header}>
        <a className={styles.brand} href="#top" onClick={showHome}>
          {content.name}
        </a>
        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
          <span className={styles.srOnly}>Toggle navigation</span>
        </button>
        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        >
          {activeProject ? (
            <button type="button" className={styles.navLink} onClick={showHome}>
              Work
            </button>
          ) : (
            <>
              <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
              <a href="#skills" onClick={() => setMenuOpen(false)}>Stack</a>
              <a href="#experience" onClick={() => setMenuOpen(false)}>Timeline</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </>
          )}
          <button type="button" className={styles.resumeNav} onClick={openResume}>
            Résumé
          </button>
        </nav>
      </header>

      <main id="main-content" className={styles.content}>
        {activeProject ? (
          <article className={styles.casePage}>
            <div className={styles.caseBackWrap}>
              <button type="button" className={styles.outlineButton} onClick={showHome}>
                <Arrow left /> All work
              </button>
            </div>
            <header className={styles.caseHeader}>
              <div className={styles.caseMeta}>
                <span>{activeProject.number}</span><i />
                <span>{activeProject.category}</span><span>·</span>
                <span>{activeProject.year}</span>
              </div>
              <h1>{activeProject.title}</h1>
              <p>{activeProject.summary}</p>
              {activeProject.award ? <span className={styles.awardBadge}>{activeProject.award}</span> : null}
            </header>
            <div className={styles.caseBody}>
              <div>
                {activeProject.blocks.map((block) => (
                  <section className={styles.caseBlock} key={block.heading}>
                    <h2>{block.heading}</h2>
                    <p>{block.body}</p>
                  </section>
                ))}
                <div className={styles.caseImage}>
                  {activeProject.imageUrl ? (
                    <Image src={activeProject.imageUrl} alt={activeProject.imageAlt || `${activeProject.title} project screenshot`} fill sizes="(max-width: 900px) 100vw, 70vw" />
                  ) : (
                    <span>Screenshot — drop an image here</span>
                  )}
                </div>
              </div>
              <aside className={styles.caseAside} aria-label="Project details">
                <div>
                  <h2>Stack</h2>
                  <div className={styles.tags}>{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div>
                  <h2>Links</h2>
                  <div className={styles.caseLinks}>
                    <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer">Repository →</a>
                    {activeProject.liveUrl ? <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer">Live demo →</a> : <span>Live demo — n/a</span>}
                  </div>
                </div>
                {nextProject ? (
                  <div className={styles.nextProject}>
                    <h2>Next</h2>
                    <button type="button" onClick={() => openProject(nextProject)}>{nextProject.title} →</button>
                  </div>
                ) : null}
              </aside>
            </div>
          </article>
        ) : (
          <>
            <section id="top" className={styles.hero}>
              <div className={styles.heroMain}>
                <div className={styles.heroTopline}>
                  <span>{content.portfolioLabel}</span>
                  <span className={styles.availability}><i />{content.availability}</span>
                </div>
                <div className={styles.heroCopy}>
                  <h1 aria-label={content.name.toUpperCase()}>
                    <span aria-hidden="true">
                      {nameCharacters.map((character, index) => character === " " && index === 8 ? <br key={index} /> : (
                        <span className={styles.nameCharacter} style={{ "--character-index": index } as CSSProperties} key={`${character}-${index}`}>{character === " " ? "\u00a0" : character}</span>
                      ))}
                    </span>
                  </h1>
                  <div className={styles.heroRule} />
                  <p><strong>{content.heroLead}</strong> <span>{content.heroMuted}</span></p>
                  <div className={styles.heroActions}>
                    <a className={styles.solidButton} href="#work">Selected work</a>
                    <button type="button" className={styles.outlineButton} onClick={openResume}>Résumé</button>
                  </div>
                </div>
                <div className={styles.stats}>
                  {content.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
                </div>
              </div>
              <aside className={styles.latest} aria-label="Latest work">
                <p>Latest work</p>
                {content.projects.slice(0, 4).map((project) => (
                  <button type="button" key={project.slug} onClick={() => openProject(project)}>
                    <span><strong>{project.title}</strong><small>{project.year}</small></span>
                    <em>{project.summary}</em>
                    {project.award ? <i>{project.award}</i> : null}
                  </button>
                ))}
                <div className={styles.railLinks}>
                  {content.channels.slice(1).map((channel) => <a key={channel.label} href={channel.href} target="_blank" rel="noopener noreferrer">{channel.label} / {channel.value.replace(/^\//, "")}</a>)}
                </div>
              </aside>
            </section>

            <section
              id="work"
              className={styles.section}
              onMouseMove={(event) => setHover((current) => ({ ...current, x: event.clientX, y: event.clientY, visible: true }))}
              onMouseLeave={() => setHover((current) => ({ ...current, visible: false }))}
            >
              <div className={`${styles.sectionHeading} ${styles.reveal}`}>
                <div><p>01 / Work</p><h2>Six systems,<br /><span>shipped.</span></h2></div>
                <div className={styles.filters} aria-label="Filter projects">
                  {categories.map((item) => <button type="button" aria-pressed={category === item} className={category === item ? styles.filterActive : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}
                </div>
              </div>
              <div className={styles.projectList}>
                {shownProjects.map((project, index) => (
                  <button
                    type="button"
                    className={styles.projectRow}
                    style={{ "--row-index": index } as CSSProperties}
                    key={project.slug}
                    onClick={() => openProject(project)}
                    onMouseEnter={() => setHover((current) => ({ ...current, title: project.title, visible: true }))}
                  >
                    <span className={styles.projectNumber}>{project.number}</span>
                    <strong>{project.title}</strong>
                    <span>{project.summary}</span>
                    <em>{project.meta}</em>
                    <Arrow />
                  </button>
                ))}
              </div>
            </section>

            <section id="awards" className={styles.awardsSection}>
              <div className={`${styles.simpleHeading} ${styles.reveal}`}><p>02 / Recognition</p><h2>Judged, then hired.</h2><span>Four prizes across AI and Web3 hackathons — scroll sideways.</span></div>
              <div className={styles.awardScroller} tabIndex={0} aria-label="Recognition cards; scroll horizontally">
                {content.awards.map((award) => <article key={`${award.event}-${award.year}`}><strong>{award.rank}</strong><h3>{award.event}</h3><p>{award.note}</p><span>{award.year} · {award.project}</span></article>)}
              </div>
            </section>

            <section id="skills" className={styles.paddedSection}>
              <div className={`${styles.simpleHeading} ${styles.reveal}`}><p>03 / Stack</p><h2>What I build with.</h2></div>
              <div className={styles.skillGrid}>
                {content.skills.map((group) => <article key={group.code}><header><h3>{group.name}</h3><span>{group.code}</span></header><div className={styles.tags}>{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}
              </div>
            </section>

            <section id="experience" className={styles.paddedSection}>
              <div className={`${styles.simpleHeading} ${styles.reveal}`}><p>04 / Timeline</p><h2>The path so far.</h2></div>
              <div className={styles.timeline}>
                {content.timeline.map((entry, index) => <article key={`${entry.year}-${index}`}><time>{entry.year}</time><div><h3>{entry.role}</h3><span>{entry.organisation}</span><p>{entry.note}</p></div></article>)}
              </div>
              <p className={styles.timelineNote}>{content.timelineNote}</p>
            </section>

            <section id="about" className={styles.about}>
              <div className={`${styles.simpleHeading} ${styles.reveal}`}><p>05 / About</p><h2>{content.aboutTitle}</h2><div className={styles.aboutCopy}><p>{content.aboutPrimary}</p><p>{content.aboutSecondary}</p></div></div>
              <div className={styles.portrait}>
                {content.portraitUrl ? <Image src={content.portraitUrl} alt={content.portraitAlt} fill sizes="(max-width: 760px) 100vw, 40vw" /> : <span>Portrait — drop an image here</span>}
              </div>
            </section>

            <section id="contact" className={styles.contact}>
              <div className={styles.contactGrid}>
                <div className={`${styles.simpleHeading} ${styles.reveal}`}><p>06 / Contact</p><h2>{content.contactTitle}</h2><span>{content.contactCopy}</span><div className={styles.heroActions}><button type="button" className={styles.solidButton} onClick={openContact}>Email me</button><button type="button" className={styles.outlineButton} onClick={openResume}>View résumé</button></div></div>
                <div className={styles.channels}>{content.channels.map((channel) => channel.label.toLowerCase() === "email" ? <button type="button" onClick={openContact} key={channel.label}><strong>{channel.label}</strong><span>{channel.value}</span></button> : <a href={channel.href} target="_blank" rel="noopener noreferrer" key={channel.label}><strong>{channel.label}</strong><span>{channel.value}</span></a>)}</div>
              </div>
              <footer><span>© 2026 {content.name}</span><span>Built with Next.js · React · Three.js</span></footer>
            </section>
          </>
        )}
      </main>

      <div className={`${styles.hoverPreview} ${hover.visible && hover.title && !activeProject ? styles.hoverPreviewVisible : ""}`} style={{ left: hover.x + 22, top: hover.y - 88 }} aria-hidden="true"><div><span>Open case study</span><strong>{hover.title}</strong></div></div>

      {resumeOpen ? <div className={`${styles.modalBackdrop} ${styles.modalVisible}`} onMouseDown={(event) => event.target === event.currentTarget && closeResume()}>
        <div className={styles.resumeDialog} role="dialog" aria-modal="true" aria-labelledby="resume-title" ref={resumeDialogRef}>
          <header><span id="resume-title">Résumé — {content.name}</span><button type="button" onClick={closeResume}>Esc</button></header>
          <div className={styles.resumeViewer}>{content.resumeUrl ? <iframe src={content.resumeUrl} title={`${content.name} résumé`} /> : <div><span>Résumé PDF renders here</span></div>}</div>
          <footer><button type="button" className={styles.solidButton} onClick={openContact}>Email me</button>{content.resumeUrl ? <a className={styles.outlineButton} href={content.resumeUrl} download>Download PDF</a> : <span className={styles.disabledButton}>Download PDF</span>}</footer>
        </div>
      </div> : null}

      {contactOpen ? <div className={`${styles.modalBackdrop} ${styles.modalVisible}`} onMouseDown={(event) => event.target === event.currentTarget && closeContact()}>
        <div className={styles.contactDialog} role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title" ref={contactDialogRef}>
          <header><div><span>Direct transmission</span><h2 id="contact-dialog-title">Start a conversation.</h2></div><button type="button" onClick={closeContact}>Esc</button></header>
          <form onSubmit={submitContact}>
            <label>Name<input name="name" autoComplete="name" minLength={2} maxLength={80} required data-autofocus /></label>
            <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
            <label className={styles.honeypot} aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
            <label>Message<textarea name="message" rows={6} minLength={10} maxLength={4000} required /></label>
            <div className={styles.formFooter}><button className={styles.solidButton} type="submit" disabled={formState === "sending"}>{formState === "sending" ? "Sending…" : "Send message"}</button><p role="status" className={formState === "error" ? styles.formError : ""}>{formMessage}</p></div>
          </form>
        </div>
      </div> : null}
    </div>
  );
}
