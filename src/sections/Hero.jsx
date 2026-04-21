import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer, Stars } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { useRef, useEffect, useState, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[15px] h-[15px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const AIBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const GOLD = "207,163,85";
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.5,
    }));
    let rafId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${GOLD},${0.11 * (1 - d / 135)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD},0.32)`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-50" />;
};

const ROLES = ["Cloud Architect", "Full Stack Developer", "AI Engineer", "UI/UX Designer"];
const useTyping = () => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const target = ROLES[idx];
    let t;
    if (!deleting && text === target) {
      t = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && text === "") {
      setDeleting(false); setIdx((i) => (i + 1) % ROLES.length);
    } else {
      t = setTimeout(() => setText((s) => (deleting ? s.slice(0, -1) : target.slice(0, s.length + 1))), deleting ? 45 : 90);
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx]);
  return text;
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const typedRole = useTyping();
  const [webglSupported, setWebglSupported] = useState(true);
  const taglineRef = useRef(null); const nameRef = useRef(null); const roleRef = useRef(null);
  const aiRef = useRef(null); const descRef = useRef(null); const ctaRef = useRef(null);
  const socialRef = useRef(null); const planetRef = useRef(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch { setWebglSupported(false); }
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(taglineRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0)
      .from(nameRef.current?.children || [], { y: 80, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.2)
      .from(roleRef.current, { y: 20, opacity: 0, duration: 0.7 }, 0.55)
      .from(aiRef.current, { y: 15, opacity: 0, duration: 0.6 }, 0.7)
      .from(descRef.current, { y: 20, opacity: 0, duration: 0.7 }, 0.85)
      .from(ctaRef.current?.children || [], { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, 1.05)
      .from(Array.from(socialRef.current?.children ?? []), { x: -15, opacity: 0, duration: 0.5, stagger: 0.07 }, 0.5);
    if (planetRef.current) {
      gsap.to(planetRef.current, { y: 18, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
  }, []);

  const SOCIALS = [
    { icon: <LinkedInIcon />, href: "https://linkedin.com/in/sidra-chaudhary", label: "LinkedIn" },
    { icon: <GitHubIcon />, href: "https://github.com/sidra-ch", label: "GitHub" },
    { icon: <EmailIcon />, href: "mailto:ms.sidrachaudhary@gmail.com", label: "Email" },
  ];

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden" style={{ background: "#080808" }}>
      <AIBackground />
      <div className="absolute pointer-events-none z-0" style={{ top: "5%", right: "0%", width: 750, height: 750, background: "radial-gradient(ellipse, rgba(207,163,85,0.09) 0%, transparent 65%)", filter: "blur(55px)" }} />

      <div ref={socialRef} className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 px-2.5 py-4 rounded-full" style={{ background: "rgba(16,16,16,0.85)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
        {SOCIALS.map(({ icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
            className="text-white/35 hover:text-gold transition-colors duration-300 p-1"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.2, duration: 0.25 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.25 })}
          >{icon}</a>
        ))}
        <div className="w-px h-10 mt-1" style={{ background: "linear-gradient(to bottom, rgba(207,163,85,0.3), transparent)" }} />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:pl-28 xl:pl-32 lg:pr-6 pt-28 pb-16 lg:pt-0 lg:pb-0">
          <p ref={taglineRef} className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-white/30 mb-8 font-light">
            Crafting Digital Excellence
          </p>
          <div ref={nameRef} className="mb-5">
            <span className="block font-black text-white leading-[0.92]" style={{ fontSize: "clamp(58px, 9.5vw, 118px)" }}>CH.</span>
            <span className="block font-black text-gold leading-[0.92]" style={{ fontSize: "clamp(58px, 9.5vw, 118px)" }}>SIDRA</span>
          </div>
          <div ref={roleRef} className="flex items-center gap-3 mb-4">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white">Cloud Architect</span>
            <span className="text-gold text-base opacity-80">|</span>
            <span className="text-[11px] sm:text-xs font-light tracking-[0.22em] uppercase text-white/50">Full Stack Developer</span>
          </div>
          <div ref={aiRef} className="flex items-center gap-2.5 mb-8">
            <span className="text-[9px] tracking-[0.28em] uppercase px-2 py-[3px] font-medium rounded-sm" style={{ color: "#cfa355", border: "1px solid rgba(207,163,85,0.25)", background: "rgba(207,163,85,0.06)" }}>AI</span>
            <span className="text-sm text-white/45 font-light tracking-wide min-w-[160px]">{typedRole}</span>
            <span className="text-gold animate-pulse font-thin text-lg leading-none">|</span>
          </div>
          <p ref={descRef} className="text-sm sm:text-[15px] leading-relaxed text-white/40 max-w-[420px] mb-10 font-light">
            I design and build digital experiences that drive measurable results for growing businesses.
          </p>
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10 lg:mb-0">
            <a href="#work" className="flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-white text-sm font-light tracking-[0.07em] transition-all duration-300" style={{ border: "1.5px solid rgba(255,255,255,0.16)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(207,163,85,0.5)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(207,163,85,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; e.currentTarget.style.boxShadow = "none"; }}>
              <span>View My Work</span>
              <span className="w-9 h-9 rounded-full flex items-center justify-center bg-gold">
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </a>
            <a href="#" className="flex items-center gap-2 text-sm font-light tracking-[0.07em] text-white/40 hover:text-white/80 transition-colors duration-300">
              <span>Download CV</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            </a>
          </div>
          <div className="flex lg:hidden items-center gap-6">
            {SOCIALS.map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="text-white/35 hover:text-gold transition-colors duration-300">{icon}</a>
            ))}
          </div>
        </div>

        <div ref={planetRef} className="relative w-full h-[65vh] min-h-[380px] lg:h-full lg:min-h-screen flex items-center justify-center">
          {webglSupported && (
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0.8, 8], fov: 40, near: 0.1, far: 200 }}>
              <Suspense fallback={null}>
                <Stars radius={120} depth={80} count={1400} factor={3} saturation={0} fade speed={0.15} />
                <ambientLight intensity={0.25} />
                <directionalLight position={[5, 10, 7]} intensity={1.8} castShadow />
                <pointLight position={[-5, 5, 3]} intensity={8} color="#cfa355" />
                <pointLight position={[5, -3, 4]} intensity={4} color="#e8c97a" />
                <pointLight position={[0, 6, -6]} intensity={2} color="#ffffff" />
                <Float speed={0.45} rotationIntensity={0.05} floatIntensity={1.2}>
                  <Planet position={isMobile ? [0, 0, 0] : [0.4, -0.2, 0]} scale={isMobile ? 1.3 : 1.7} />
                </Float>
                <Float speed={0.75} rotationIntensity={0.45} floatIntensity={0.9}>
                  <Planet position={isMobile ? [1.4, 1.5, -0.5] : [3.2, 2.4, -1]} scale={isMobile ? 0.22 : 0.35} />
                </Float>
                <Environment resolution={256} blur={0.8}>
                  <group rotation={[-Math.PI / 3, 4, 1]}>
                    <Lightformer form="circle" intensity={6} position={[0, 8, -10]} scale={14} color="#cfa355" />
                    <Lightformer form="circle" intensity={3} position={[0, 4, 3]} scale={8} color="#e8c97a" />
                    <Lightformer form="circle" intensity={1.5} position={[-5, -2, -2]} scale={8} color="#fff5e0" />
                  </group>
                </Environment>
              </Suspense>
            </Canvas>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2" style={{ border: "1.5px solid rgba(255,255,255,0.12)" }}>
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: "rgba(207,163,85,0.5)" }} />
        </div>
        <span className="text-[9px] tracking-[0.38em] uppercase text-white/20 font-light">Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
