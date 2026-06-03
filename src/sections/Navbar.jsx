import React, { useEffect, useState, useRef } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";
import { useTheme } from "../components/ThemeProvider";

const NAV_LINKS = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Services", to: "services" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "work" },
  { label: "Contact", to: "contact" },
];

const MENU_LINKS = NAV_LINKS;

const Navbar = () => {
  const { isDark } = useTheme();
  const navRef = useRef(null);
  const contactRef = useRef(null);
  const linksRef = useRef([]);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([...linksRef.current.filter(Boolean), contactRef.current], { autoAlpha: 0, x: -20 });

    tl.current = gsap.timeline({ paused: true })
      .to(navRef.current, { xPercent: 0, duration: 0.8, ease: "power3.out" })
      .to(linksRef.current.filter(Boolean), { autoAlpha: 1, x: 0, stagger: 0.07, duration: 0.5, ease: "power2.out" }, "<+0.1")
      .to(contactRef.current, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out" }, "<+0.1");

    iconTl.current = gsap.timeline({ paused: true })
      .to(topLineRef.current, { rotate: 45, y: 3.3, duration: 0.3, ease: "power2.inOut" })
      .to(bottomLineRef.current, { rotate: -45, y: -3.3, duration: 0.3, ease: "power2.inOut" }, "<");
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[55] flex items-center justify-between px-8 sm:px-10 h-16 sm:h-20 transition-all duration-500"
        style={{
          background: scrolled ? (isDark ? "rgba(10,10,8,0.9)" : "rgba(231,228,219,0.88)") : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? (isDark ? "1px solid rgba(198,151,75,0.24)" : "1px solid rgba(80,64,40,0.14)") : "none",
          boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.14)" : "none",
        }}
      >
        <Link to="home" smooth duration={1500} className="cursor-pointer select-none">
          <div className="leading-none cinematic-title">
            <div className={`text-2xl sm:text-3xl tracking-[0.05em] ${isDark ? "text-white" : "text-black"}`}>CH.</div>
            <div className="text-2xl sm:text-3xl tracking-[0.05em] text-gold">SIDRA</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              smooth
              duration={1500}
              spy
              activeClass="!text-gold"
              offset={-80}
              className={`relative text-[11px] tracking-[0.18em] uppercase cursor-pointer transition-colors duration-300 ${isDark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={`w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-full cursor-pointer hover:border-gold/30 transition-all duration-300 ${isDark ? "border border-white/15 bg-black/60" : "border border-black/20 bg-white/60"}`}
        >
          <span ref={topLineRef} className={`block w-[18px] h-[1.5px] rounded-full origin-center ${isDark ? "bg-white" : "bg-black"}`} />
          <span ref={bottomLineRef} className={`block w-[18px] h-[1.5px] rounded-full origin-center ${isDark ? "bg-white" : "bg-black"}`} />
        </button>
      </header>

      <nav
        ref={navRef}
        className={`fixed z-50 flex flex-col justify-between w-full h-full px-10 py-28 gap-y-10 md:w-1/2 md:left-1/2 ${isDark ? "bg-[#0f0f0d] border-l border-gold/20" : "bg-[#f2eee3] border-l border-black/10"}`}
      >
        <div className="flex flex-col gap-y-3 sm:gap-y-4 uppercase cinematic-title">
          {MENU_LINKS.map((section, index) => (
            <div key={index} ref={(el) => (linksRef.current[index] = el)}>
              <Link
                className={`text-4xl sm:text-5xl lg:text-6xl leading-[1.08] transition-all duration-300 cursor-pointer hover:text-gold hover:translate-x-3 inline-block ${isDark ? "text-white/80" : "text-black/80"}`}
                to={section.to}
                smooth
                offset={-80}
                duration={1500}
                onClick={toggleMenu}
              >
                {section.label}
              </Link>
            </div>
          ))}
        </div>

        <div ref={contactRef} className="flex flex-col flex-wrap justify-between gap-6 md:flex-row">
          <div className="font-light">
            <p className={`tracking-[0.3em] text-[10px] uppercase mb-1 ${isDark ? "text-white/30" : "text-black/40"}`}>E-mail</p>
            <p className="text-sm tracking-widest lowercase text-gold/80">ms.sidrachaudhary@gmail.com</p>
          </div>
          <div className="font-light">
            <p className={`tracking-[0.3em] text-[10px] uppercase mb-1 ${isDark ? "text-white/30" : "text-black/40"}`}>Social</p>
            <div className="flex flex-wrap gap-x-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xs leading-loose tracking-widest uppercase hover:text-gold transition-colors duration-300 ${isDark ? "text-white/50" : "text-black/50"}`}
                >
                  {"{ "}{social.name}{" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
