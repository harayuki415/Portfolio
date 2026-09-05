import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createBrowserRouter, Link, RouterProvider, useParams } from "react-router";

const projects = [
  { slug: "konomi", no: "01", type: "IDENTITY / 2024", title: "KONOMI", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85", alt: "Soft light falling on a modern gallery interior", intro: "An identity for a new kind of stillness.", detail: "KONOMI is a restorative space where botanical rituals, mineral colour and unhurried conversation meet." },
  { slug: "field-guide", no: "02", type: "DIGITAL / 2023", title: "A Field Guide", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85", alt: "Minimal studio workspace with warm light", intro: "A digital atlas for the naturally curious.", detail: "An evolving editorial system that makes room for close looking, wandering and collecting the almost unnoticed." },
  { slug: "air-still", no: "03", type: "OBJECT / 2023", title: "Air, Still", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=85", alt: "Sculptural interior objects in a calm room", intro: "Objects made to hold a pause.", detail: "A collection studying weight, tactility and the quiet relation between a room and the things that inhabit it." },
];

function Reveal({ children, className = "", direction = "left" }: { children: ReactNode; className?: string; direction?: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let firstFire = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (firstFire) {
        firstFire = false;
        if (entry.isIntersecting) {
          // ページ読み込み時から画面内 → トランジションなしで即表示
          element.style.transition = "none";
          element.classList.add("is-visible");
          requestAnimationFrame(() => { element.style.transition = ""; });
        }
        return;
      }
      // スクロールで入ってきた → アニメーションあり
      element.classList.toggle("is-visible", entry.isIntersecting);
    }, { rootMargin: "-5% 0px -5% 0px", threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal reveal-${direction} ${className}`}>{children}</div>;
}

type Palette = "current" | "archive";

function usePalette() {
  const [palette, setPalette] = useState<Palette>(() => (localStorage.getItem("portfolio-palette") as Palette) || "current");
  const choosePalette = (next: Palette) => { localStorage.setItem("portfolio-palette", next); setPalette(next); };
  return { palette, choosePalette };
}

function PaletteSwitcher({ palette, choosePalette }: { palette: Palette; choosePalette: (palette: Palette) => void }) {
  return <div className="palette-switcher" aria-label="配色を選択"><span className="palette-label">PALETTE</span><button type="button" onClick={() => choosePalette("current")} className={palette === "current" ? "is-selected current-swatch" : "current-swatch"} aria-label="青磁の配色を選択" /><button type="button" onClick={() => choosePalette("archive")} className={palette === "archive" ? "is-selected archive-swatch" : "archive-swatch"} aria-label="クリームの配色を選択" /></div>;
}

function Home() {
  const { palette, choosePalette } = usePalette();
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false, spin: 2.4 });
  const [isBursting, setIsBursting] = useState(false);
  const lastPointer = useRef({ x: 0, y: 0, time: 0 });

  const followPointer = (event: React.MouseEvent<HTMLElement>) => {
    const now = performance.now();
    const elapsed = Math.max(now - lastPointer.current.time, 16);
    const distance = Math.hypot(event.clientX - lastPointer.current.x, event.clientY - lastPointer.current.y);
    const velocity = distance / elapsed;
    const spin = Math.max(0.28, 2.4 - Math.min(velocity * 1.5, 2.05));
    lastPointer.current = { x: event.clientX, y: event.clientY, time: now };
    setCursor({ x: event.clientX, y: event.clientY, visible: true, spin });
  };

  const createPulse = (event: React.MouseEvent<HTMLElement>) => {
    setIsBursting(false);
    window.requestAnimationFrame(() => setIsBursting(true));
    window.setTimeout(() => setIsBursting(false), 720);
  };

  return (
    <main
      data-theme={palette} className="bg-[var(--ground)] text-[var(--ink)] selection:bg-[var(--sun)] selection:text-[var(--ink)]"
      onMouseMove={followPointer}
      onClick={createPulse}
      onMouseLeave={() => setCursor((current) => ({ ...current, visible: false }))}
    >
      <PaletteSwitcher palette={palette} choosePalette={choosePalette} />
      <div
        aria-hidden="true"
        className={`science-cursor ${cursor.visible ? "is-active" : ""}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`, "--spin-duration": `${cursor.spin}s` } as CSSProperties}
      >
        <div className={`science-assembly ${isBursting ? "is-bursting" : ""}`}>
          <span className="orbit orbit-a" /><span className="orbit orbit-b" /><span className="orbit orbit-c" />
          <span className="nucleus" /><span className="electron electron-a" /><span className="electron electron-b" />
        </div>
      </div>
      <section className="relative grid min-h-svh overflow-hidden px-5 pb-6 pt-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="noise" />
        <header className="hi hi-0 relative z-10 col-span-full flex items-center justify-between font-mono text-[10px] tracking-[.14em] text-[var(--ink)]/70">
          <span>HANA NAKAMURA®</span><span className="hidden sm:inline">CREATIVE PRACTICE</span><span>2024—25</span>
        </header>
        <div className="relative z-10 col-span-full self-center pt-8 pb-4 sm:pt-12 sm:pb-6 lg:col-span-10 lg:col-start-2">
          <p className="hi hi-1 mb-3 font-mono text-[10px] tracking-[.17em] text-[var(--coral)]">SELECTED WORKS / TOKYO</p>
          <h1 className="hi hi-2 max-w-5xl font-display text-[clamp(2.4rem,9vw,11.5rem)] leading-[.84] tracking-[-.065em] sm:leading-[.78] sm:tracking-[-.075em]">
            Thinking<br />in <em className="font-serif font-normal tracking-[-.08em]">forms</em><br />and feeling.
          </h1>
          <div className="hi hi-3 mt-10 flex justify-center sm:mt-14">
            <a href="#work" className="scroll-hint group">
              <span className="font-mono text-[11px] tracking-[.28em] text-[var(--ink)]/40 transition-colors group-hover:text-[var(--coral)]">SCROLL</span>
              <span className="scroll-line"><span className="scroll-dot" /></span>
            </a>
          </div>
        </div>
        <div className="relative z-10 col-span-full flex items-end justify-between">
          <p className="hi hi-3 max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[.12em] text-[var(--ink)]/60 sm:max-w-48">Independent visual direction, identities and digital experiences.</p>
        </div>
      </section>

      <section id="work" className="border-t border-[var(--ink)]/20 px-5 py-12 sm:px-8 sm:py-20 lg:px-12 lg:py-36">
        <Reveal className="mb-12 grid gap-5 lg:mb-28 lg:grid-cols-12">
          <p className="font-mono text-[10px] tracking-[.15em] text-[var(--coral)] lg:col-span-3">01 / SELECTED WORK</p>
          <p className="max-w-3xl font-display text-2xl leading-[.98] tracking-[-.05em] sm:text-4xl lg:col-span-8 lg:text-5xl">I build distinct worlds for people and ideas that refuse to be ordinary.</p>
        </Reveal>
        <div className="space-y-16 sm:space-y-24 lg:space-y-44">
          {projects.map((project, index) => (
            <div key={project.no} className="project grid gap-6 lg:grid-cols-12 lg:items-end">
              <Reveal direction={index % 2 ? "right" : "left"} className={`reveal-img lg:row-start-1 ${index % 2 ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-8 lg:col-start-1"}`}>
                <Link to={`/work/${project.slug}`} aria-label={`${project.title} のケーススタディを見る`} className={`group relative block overflow-hidden bg-[var(--teal)] w-4/5 lg:w-full ${index % 2 ? "ml-auto" : ""}`}>
                  <img src={project.image} alt={project.alt} className="aspect-[4/3] w-full object-cover sepia-[.2] saturate-[.75] transition duration-700 hover:scale-105 hover:saturate-100" />
                  <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[.14em] text-white mix-blend-difference">{project.no}</span>
                </Link>
              </Reveal>
              <Reveal direction={index % 2 ? "right" : "left"} className={`pb-1 lg:row-start-1 lg:self-end ${index % 2 ? "lg:col-span-4 lg:col-start-1" : "lg:col-span-3 lg:col-start-10"}`}>
                <p className="mb-3 font-mono text-[10px] tracking-[.14em] text-[var(--coral)]">{project.type}</p>
                <h2 className="font-display text-4xl leading-none tracking-[-.065em] sm:text-6xl lg:text-7xl">{project.title}</h2>
                <Link to={`/work/${project.slug}`} className="mt-6 inline-flex items-center gap-4 border-b border-[var(--ink)]/40 pb-2 font-mono text-[10px] tracking-[.12em] transition hover:border-[var(--coral)] hover:text-[var(--coral)]">VIEW CASE STUDY <span>↗</span></Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[var(--ink)]/20 bg-[var(--teal)] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-44">
        <div className="absolute -right-10 top-8 font-display text-[40vw] leading-none tracking-[-.1em] text-[var(--ink)]/10 sm:-right-20 sm:text-[35vw]">HN</div>
        <Reveal direction="right" className="relative grid gap-10 lg:grid-cols-12">
          <p className="font-mono text-[10px] tracking-[.15em] text-[var(--ink)] lg:col-span-3">02 / ABOUT</p>
          <div className="lg:col-span-8">
            <p className="max-w-4xl font-display text-3xl leading-[.98] tracking-[-.06em] sm:text-5xl lg:text-7xl">A small, observant practice for cultural spaces, considered objects and people with a point of view.</p>
            <div className="mt-10 grid gap-8 border-t border-[var(--ink)]/25 pt-6 sm:mt-16 sm:grid-cols-2">
              <p className="max-w-xs text-sm leading-relaxed text-[var(--ink)]/80">Based between Tokyo and everywhere else. I collaborate with founders, architects, artists and teams in search of a more resonant visual language.</p>
              <p className="font-serif text-2xl italic leading-tight text-[var(--ground)] sm:text-3xl">"Make the quiet parts speak."</p>
            </div>
          </div>
        </Reveal>
      </section>

      <footer id="contact" className="bg-[var(--ink)] px-5 py-8 text-[var(--ground)] sm:px-8 lg:px-12 lg:py-12">
        <div className="flex flex-col gap-1 font-mono text-[10px] tracking-[.14em] sm:flex-row sm:items-center sm:justify-between sm:gap-0"><span>03 / CONTACT</span><span className="text-[var(--ground)]/60">AVAILABLE FOR SELECTED PROJECTS</span></div>
        <Reveal className="py-14 sm:py-20 lg:py-32"><a href="mailto:hello@hananakamura.studio" className="font-display text-[clamp(2rem,7vw,8rem)] leading-[.85] tracking-[-.07em] underline decoration-1 underline-offset-[.14em] transition hover:text-white">Let’s make<br />something <em className="font-serif font-normal">felt.</em></a></Reveal>
        <div className="flex flex-wrap justify-between gap-5 border-t border-[var(--ground)]/25 pt-5 font-mono text-[10px] tracking-[.12em]"><span>© 2025 HANA NAKAMURA</span><div className="flex gap-6"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="footer-link hover:underline">INSTAGRAM</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="footer-link hover:underline">LINKEDIN</a></div></div>
      </footer>
    </main>
  );
}

function ProjectPage() {
  const { palette, choosePalette } = usePalette();
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug) ?? projects[0];
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  return (
    <main data-theme={palette} className="min-h-screen bg-[var(--ground)] text-[var(--ink)] selection:bg-[var(--sun)]">
      <PaletteSwitcher palette={palette} choosePalette={choosePalette} />
      <header className="flex items-center justify-between px-5 py-5 font-mono text-[10px] tracking-[.14em] sm:px-8 lg:px-12">
        <Link to="/" className="group flex items-center gap-3 hover:text-[var(--coral)]"><span className="text-lg leading-none transition-transform group-hover:-translate-x-1">←</span> HANA NAKAMURA®</Link>
        <span>{project.no} / 03</span>
      </header>
      <section className="grid gap-10 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pb-32 lg:pt-28">
        <Reveal className="lg:col-span-3"><p className="font-mono text-[10px] tracking-[.15em] text-[var(--coral)]">{project.type}</p></Reveal>
        <div className="lg:col-span-9">
          <Reveal direction="right"><h1 className="max-w-5xl font-display text-[clamp(3rem,10vw,12rem)] leading-[.82] tracking-[-.075em] sm:leading-[.76] sm:tracking-[-.08em]">{project.title}</h1></Reveal>
          <Reveal className="mt-10 max-w-xl font-serif text-2xl leading-[1.05] sm:mt-16 sm:text-4xl lg:text-5xl">{project.intro}</Reveal>
        </div>
      </section>
      <div className="mx-5 overflow-hidden bg-[var(--teal)] sm:mx-8 lg:mx-12"><img src={project.image} alt={project.alt} className="aspect-[4/3] w-full object-cover sepia-[.2] saturate-[.75] sm:aspect-[16/8]" /></div>
      <section className="grid gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:px-12 lg:py-40">
        <p className="font-mono text-[10px] tracking-[.15em] text-[var(--coral)] lg:col-span-3">PROJECT NOTES</p>
        <div className="lg:col-span-7"><p className="font-display text-2xl leading-[1.02] tracking-[-.045em] sm:text-4xl lg:text-5xl">{project.detail}</p><div className="mt-12 grid grid-cols-2 gap-6 border-t border-[var(--ink)]/20 pt-5 font-mono text-[10px] leading-relaxed tracking-[.1em]"><p>DISCIPLINE<br /><span className="text-[var(--ink)]/60">STRATEGY / ART DIRECTION / DESIGN</span></p><p>COLLABORATORS<br /><span className="text-[var(--ink)]/60">STUDIO HN / TOKYO</span></p></div></div>
      </section>
      <section className="bg-[var(--ink)] px-5 py-14 text-[var(--ground)] sm:px-8 sm:py-16 lg:px-12 lg:py-24"><p className="font-mono text-[10px] tracking-[.15em] text-[var(--teal)]">NEXT PROJECT</p><Link to={`/work/${nextProject.slug}`} className="mt-5 inline-block font-display text-[clamp(2.5rem,8vw,8rem)] leading-none tracking-[-.075em] transition hover:text-[var(--teal)]">{nextProject.title} <span className="font-serif font-normal">→</span></Link></section>
    </main>
  );
}

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/work/:slug", Component: ProjectPage },
], { basename: import.meta.env.BASE_URL });

export default function App() {
  return <RouterProvider router={router} />;
}


