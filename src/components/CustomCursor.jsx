import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const cursorX = gsap.quickTo(cursor, "left", { duration: 0.6, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "top", { duration: 0.6, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "left", { duration: 0.1, ease: "none" });
    const dotY = gsap.quickTo(dot, "top", { duration: 0.1, ease: "none" });

    const onMove = (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(cursor, { scale: 2, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    document.addEventListener("mousemove", onMove);

    // Use event delegation for interactive hover
    const onOverAll = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea, .cursor-pointer")) {
        onEnterInteractive();
      }
    };
    const onOutAll = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea, .cursor-pointer")) {
        onLeaveInteractive();
      }
    };

    document.addEventListener("mouseover", onOverAll);
    document.addEventListener("mouseout", onOutAll);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOverAll);
      document.removeEventListener("mouseout", onOutAll);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed z-[9999] w-8 h-8 -ml-4 -mt-4 border border-gold/50 rounded-full pointer-events-none mix-blend-difference hidden md:block"
        style={{ left: -100, top: -100 }}
      />
      <div
        ref={dotRef}
        className="fixed z-[9999] w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-gold rounded-full pointer-events-none hidden md:block"
        style={{ left: -100, top: -100 }}
      />
    </>
  );
};

export default CustomCursor;
