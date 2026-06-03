import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const SectionDivider = ({ className = "" }) => {
  const lineRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: lineRef.current,
        start: "top 90%",
      },
    });

    tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out" })
      .fromTo(glowRef.current, { xPercent: -120, opacity: 0 }, { xPercent: 140, opacity: 0.85, duration: 1.3, ease: "power2.out" }, "<+0.1")
      .to(glowRef.current, { opacity: 0.2, duration: 0.2 }, "<+0.95");
  }, []);

  return (
    <div className={`px-10 py-8 ${className}`}>
      <div
        ref={lineRef}
        className="relative h-px origin-left overflow-hidden bg-gradient-to-r from-transparent via-black/35 dark:via-white/30 to-transparent"
      >
        <div
          ref={glowRef}
          className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
        />
      </div>
    </div>
  );
};

export default SectionDivider;
