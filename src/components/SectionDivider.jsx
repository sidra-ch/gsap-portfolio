import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const SectionDivider = ({ className = "" }) => {
  const lineRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <div className={`px-10 py-8 ${className}`}>
      <div
        ref={lineRef}
        className="h-px origin-left bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent"
      />
    </div>
  );
};

export default SectionDivider;
