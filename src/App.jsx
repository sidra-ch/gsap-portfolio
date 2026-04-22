import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import Skills from "./sections/Skills";
import { useProgress } from "@react-three/drei";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import CustomCursor from "./components/CustomCursor";
import SectionDivider from "./components/SectionDivider";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const lenisRef = React.useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  const lenisOptions = React.useMemo(() => {
    if (isMobile) {
      return {
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        syncTouch: true,
        touchMultiplier: 1.0,
        infinite: false,
      };
    }
    if (isTablet) {
      return {
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        syncTouch: true,
        touchMultiplier: 1.0,
        infinite: false,
      };
    }
    return {
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
      infinite: false,
    };
  }, [isMobile, isTablet]);

  useEffect(() => {
    if (progress === 100) {
      // Small delay so DOM is fully painted before ScrollTrigger measures
      const t = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(t);
    }
  }, [progress]);

  // Wire Lenis → GSAP ticker once ready
  useEffect(() => {
    if (!isReady) return;

    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's RAF so they share the same frame
    const rafHandler = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    // Refresh after a frame so all sticky/pin calculations are correct
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // Re-refresh on resize so triggers don't drift
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(rafHandler);
      window.removeEventListener("resize", onResize);
    };
  }, [isReady]);

  return (
    <ThemeProvider>
      <ReactLenis
        ref={lenisRef}
        root
        autoRaf={false}
        options={lenisOptions}
        className="relative w-screen min-h-screen overflow-x-hidden"
      >
        <CustomCursor />

        {/* Loading screen */}
        {!isReady && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white">
            <p className="mb-4 text-xl tracking-widest font-light animate-pulse">
              Loading {Math.floor(progress)}%
            </p>
            <div className="relative h-px overflow-hidden w-60 bg-white/20">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-300 bg-gold"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}>
          <Navbar />
          <Hero />
          <ServiceSummary />
          <Services />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Works />
          <ContactSummary />
          <Contact />
          <ThemeToggle />
        </div>
      </ReactLenis>
    </ThemeProvider>
  );
};

export default App;
