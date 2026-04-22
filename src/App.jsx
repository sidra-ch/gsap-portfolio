import React, { useEffect, useState, lazy, Suspense } from "react";
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

const App = () => {
  gsap.registerPlugin(ScrollTrigger);
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const lenisRef = React.useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  const lenisOptions = React.useMemo(() => {
    if (isMobile) {
      return {
        lerp: 0.12,
        duration: 1.35,
        smoothWheel: true,
        wheelMultiplier: 0.75,
        syncTouch: true,
        touchMultiplier: 0.9,
      };
    }

    if (isTablet) {
      return {
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.82,
        syncTouch: true,
        touchMultiplier: 1,
      };
    }

    return {
      lerp: 0.075,
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      syncTouch: false,
      touchMultiplier: 1,
    };
  }, [isMobile, isTablet]);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return undefined;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(update);
    };
  }, [isReady]);

  return (
    <ThemeProvider>
      <ReactLenis
        ref={lenisRef}
        root
        options={lenisOptions}
        className="relative w-screen min-h-screen overflow-x-hidden"
      >
        <CustomCursor />
        {!isReady && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
            <p className="mb-4 text-xl tracking-widest animate-pulse">
              Loading {Math.floor(progress)}%
            </p>
            <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-300 bg-gold"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        <div
          className={`${
            isReady ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
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