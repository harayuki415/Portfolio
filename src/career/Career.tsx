import { useEffect, useRef, useState, type ReactNode } from 'react';
import { experiments, process, profile, projects, strengths, tools, type Project } from './content';

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('entered');
        observer.unobserve(element);
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`career-reveal ${className}`}>{children}</div>;
}

function SectionHeading({ number, label, title, children }: { number: string; label: string; title: ReactNode; children?: ReactNode }) {
  return <Reveal className="section-heading">
    <p className="eyebrow mono">{number} / {label}</p>
    <div><h2>{title}</h2>{children}</div>
  </Reveal>;
}

function ProjectMedia({ project, motion }: { project: Project; motion: boolean }) {
  const image = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const freeze = () => {
    if (!image.current?.naturalWidth || !canvas.current) return;
    canvas.current.width = image.current.naturalWidth;
    canvas.current.height = image.current.naturalHeight;
    canvas.current.getContext('2d')?.drawImage(image.current, 0, 0);
  };
  useEffect(() => { if (!motion) freeze(); }, [motion]);
  return <div className="project-media">
    <img ref={image} src={project.image} alt={project.alt} loading="lazy" decoding="async" onLoad={freeze} style={{ visibility: motion ? 'visible' : 'hidden' }} aria-hidden={!motion} />
    <canvas ref={canvas} role="img" aria-label={project.alt} hidden={motion} />
    <span className="media-caption mono" aria-hidden="true">{motion ? 'IN MOTION' : 'STILL FRAME'} <span>↗ {project.name.toUpperCase()}</span></span>
  </div>;
}

function ProjectNotes({ project }: { project: Project }) {
  return <div className="case-notes">
    <div className="case-question"><p className="mono note-label">WHY</p><h4>この制作で探ること</h4><p>{project.why}</p></div>
    <div className="case-question"><p className="mono note-label">PROBLEM</p><h4>向き合う課題</h4><p>{project.problem}</p></div>
    <div className="decisions"><p className="mono note-label">APPROACH / DECISIONS</p><h4>体験を支える判断</h4><ol>{project.approach.map((item, i) => <li key={item.title}><span className="mono accent">0{i + 1}</span><div><h5>{item.title}</h5><p>{item.description}</p></div></li>)}</ol></div>
    <div className="result"><p className="mono note-label">RESULT</p><h4>公開して、触れられる形に。</h4><p>{project.result}</p><span className="result-tag mono">PUBLIC DEMO + SOURCE CODE ↗</span></div>
  </div>;
}

function ProjectCard({ project, featured, motion }: { project: Project; featured?: boolean; motion: boolean }) {
  return <article className={`project-card ${featured ? 'featured' : 'secondary'}`} id={project.id} aria-labelledby={`${project.id}-title`}>
    <Reveal className="project-title"><p className="mono eyebrow">{featured ? '01 / FEATURED PROJECT' : '02 / SELECTED PROJECT'}</p><h3 id={`${project.id}-title`}>{project.name}<span className="accent">↗</span></h3><span className="mono muted">{project.kind}</span></Reveal>
    <div className="project-presentation">
      <Reveal><ProjectMedia project={project} motion={motion} /></Reveal>
      <Reveal className="project-overview">
        <div><p className="mono note-label">OVERVIEW</p><h4>{project.tagline}</h4><p>{project.overview}</p></div>
        <div className="project-facts"><div><p className="mono note-label">ROLE</p><p>{project.role}</p></div><div><p className="mono note-label">TECH STACK</p><ul className="tech-tags">{project.tech.map(item => <li key={item}>{item}</li>)}</ul></div></div>
        <div className="project-links"><a className="button primary mono" href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.name} Live Demo（新しいタブ）`}>LIVE DEMO <span>↗</span></a><a className="button mono" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub（新しいタブ）`}>GITHUB <span>↗</span></a></div>
      </Reveal>
    </div>
    {featured ? <Reveal><ProjectNotes project={project} /></Reveal> : <details className="case-disclosure"><summary className="mono">制作の考え方を読む <span>WHY / PROBLEM / DECISIONS / RESULT</span><b aria-hidden="true">＋</b></summary><ProjectNotes project={project} /></details>}
  </article>;
}

export default function Career() {
  const [palette, setPalette] = useState<'dark' | 'berry'>('dark');
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [contactOpen, setContactOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotion(!preference.matches);
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    if (contactOpen && !dialog.current?.open) dialog.current?.showModal();
    if (!contactOpen && dialog.current?.open) dialog.current.close();
  }, [contactOpen]);
  return <div className="career" data-palette={palette} data-motion={motion ? 'on' : 'off'}>
    <a className="skip-link" href="#main">本文へスキップ</a>
    <header className="site-header shell">
      <a className="wordmark mono" href="#top">YH<span className="accent">/</span></a>
      <span className="edition mono">PORTFOLIO — CAREER EDITION</span>
      <nav aria-label="メインナビゲーション"><a className="nav-link mono" href="#projects">WORK</a><a className="nav-link mono" href="#management">APPROACH</a><a className="nav-link mono" href="#contact">CONTACT ↗</a></nav>
    </header>
    <main id="main">
      <section id="top" className="hero shell">
        <div className="hero-topline mono"><span><i className="status-dot" /> PROJECT MANAGEMENT & CREATIVE PRACTICE</span><span>YUKI HARA / PORTFOLIO</span></div>
        <h1>{profile.name}<span className="accent">.</span></h1>
        <div className="hero-bottom">
          <div><p className="role mono">{profile.role}</p><p className="hero-statement">building products,<br/>teams & <em>small experiments.</em></p></div>
          <div className="hero-intro"><p>{profile.intro}</p><p className="hero-disciplines mono">Project Management / Product Direction<br/>Game Development / AI-assisted Creation</p><a className="text-link mono" href="#projects">EXPLORE MY WORK <span>↓</span></a></div>
        </div>
        <div className="hero-footer mono"><span>THINK. ALIGN. MAKE.</span><a href="#profile">SCROLL TO DISCOVER ↓</a></div>
      </section>
      <section id="profile" className="section shell">
        <SectionHeading number="01" label="PROFILE / WHAT I DO" title={<>つくる人と、<br/>進める人の<em>あいだ。</em></>}><p className="section-description">プロジェクトの全体と、目の前の体験。<br/>視点を行き来しながら、アイデアを実行へつなぎます。</p></SectionHeading>
        <div className="strength-grid">{strengths.map((item, i) => <Reveal key={item.title} className="strength"><span className="mono muted">0{i + 1} <span className="accent">/</span></span><h3 className="mono">{item.title}</h3><h4>{item.subtitle}</h4><p>{item.description}</p></Reveal>)}</div>
      </section>
      <section id="projects" className="section shell">
        <SectionHeading number="02" label="FEATURED PROJECTS" title={<>Ideas into <em>play.</em></>}><p className="section-description">実際に動くものから、制作の考え方を。</p></SectionHeading>
        <div className="project-toolbar"><button type="button" className="setting mono" aria-pressed={motion} onClick={() => setMotion(!motion)} aria-label="作品GIFの再生切替">{motion ? 'Ⅱ GIFを停止' : '▶ GIFを再生'}</button></div>
        {projects.map((project, i) => <ProjectCard key={project.id} project={project} featured={i === 0} motion={motion} />)}
        <p className="editorial-note">制作意図・課題の記述は、公開実装をもとにした整理案です。</p>
        <div className="experiments"><div><p className="eyebrow mono">EXPERIMENTAL WORKS</p><h3>Small experiments,<br/><em>different perspectives.</em></h3></div>{experiments.map(item => <a className="experiment" key={item.name} href={`${import.meta.env.BASE_URL}?p=${encodeURIComponent(item.path)}`}><img src={item.image} alt={item.alt} loading="lazy" width="400" height="300"/><div><span className="mono muted">{item.kind}</span><h4>{item.name} <span>↗</span></h4><p>{item.description}</p></div></a>)}</div>
      </section>
      <section id="management" className="management section">
        <div className="shell"><SectionHeading number="03" label="PROJECT MANAGEMENT" title={<>Make the next<br/><em>step clear.</em></>}><p className="section-description">つくる前も、つくる途中も。<br/>迷いをほどき、プロジェクトを前に進める。</p></SectionHeading>
          <div className="process-list">{process.map((item, i) => <Reveal className="process-step" key={item.title}><span className="mono accent">0{i + 1}</span><h3>{item.title}</h3><div><h4>{item.subtitle}</h4><p>{item.description}</p></div><p className="mono process-output">{item.output}</p></Reveal>)}</div>
        </div>
      </section>
      <section id="tools" className="section shell">
        <SectionHeading number="04" label="TECH / TOOLS" title={<>A practical <em>toolkit.</em></>}><p className="section-description">目的に合わせて、道具を選ぶ。<br/>制作・検証・進行に関わる技術とツール。</p></SectionHeading>
        <div className="tool-grid">{tools.map(item => <Reveal className="tool-group" key={item.category}><span className="mono muted">{item.context}</span><h3>{item.category}</h3><ul>{item.items.map(tool => <li key={tool}>{tool}</li>)}</ul></Reveal>)}</div>
      </section>
      <section id="about" className="about section shell"><SectionHeading number="05" label="ABOUT" title={<>Lead with context.<br/>Learn by <em>making.</em></>}/><Reveal className="about-copy"><p>{profile.about}</p><a className="text-link mono" href={profile.github} target="_blank" rel="noreferrer">EXPLORE GITHUB <span>↗</span></a></Reveal></section>
    </main>
    <footer id="contact" className="contact section"><div className="shell"><p className="eyebrow mono">06 / CONTACT</p><div className="contact-heading"><h2>Let’s build<br/><em>what’s next.</em></h2><div><p>プロジェクトのこと、これからのこと。</p>{profile.email ? <a className="button primary mono" href={`mailto:${profile.email}`}>CONTACT ↗</a> : <button type="button" className="button primary mono" onClick={() => setContactOpen(true)}>CONTACT <span>↗</span></button>}</div></div><div className="footer-bottom mono"><span>© {new Date().getFullYear()} YUKI HARA</span><div><a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={import.meta.env.BASE_URL}>ORIGINAL PORTFOLIO ↗</a><a href="#top">BACK TO TOP ↑</a></div></div><div className="display-settings"><span className="mono muted">DISPLAY</span><button type="button" className="setting mono" aria-pressed={palette === 'berry'} onClick={() => setPalette(palette === 'dark' ? 'berry' : 'dark')} aria-label="ベリーパレットに切り替え">PALETTE <span className={`swatch ${palette}`} /></button><button type="button" className="setting mono" aria-pressed={motion} aria-label="GIFとアニメーションの再生" onClick={() => setMotion(!motion)}>MOTION {motion ? 'ON' : 'OFF'}</button></div></div></footer>
    <div className="motion-control"><button className="setting mono" type="button" aria-pressed={motion} onClick={() => setMotion(!motion)} aria-label="GIFとアニメーションの再生切替">{motion ? 'Ⅱ' : '▶'} MOTION {motion ? 'ON' : 'OFF'}</button></div>
    <dialog ref={dialog} className="contact-dialog" onCancel={() => setContactOpen(false)} onClose={() => setContactOpen(false)} aria-labelledby="contact-dialog-title"><p className="eyebrow mono">CONTACT</p><h2 id="contact-dialog-title">連絡先は準備中です。</h2><p>現在、公開メールアドレスは掲載していません。<br/>制作物はGitHubからご覧いただけます。</p><a className="button mono" href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a><form method="dialog"><button className="button primary mono" type="submit">閉じる</button></form></dialog>
  </div>;
}
