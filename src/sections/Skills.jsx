import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { skillsData } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const barRefs = useRef([]);
  const labelRefs = useRef([]);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
    });

    barRefs.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          },
        }
      );
    });

    labelRefs.current.forEach((label, i) => {
      if (!label) return;
      gsap.from(label, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: label,
          start: "top 90%",
        },
      });
    });
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="px-10 py-24 bg-primary dark:bg-[#111]"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-light tracking-[0.5rem] uppercase text-SageGray dark:text-white/40 mb-4">
          Technical Expertise
        </p>
        <h2 className="mb-16 text-4xl font-black uppercase sm:text-5xl lg:text-6xl dark:text-white">
          Skills
        </h2>

        <div className="flex flex-col gap-8">
          {skillsData.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (labelRefs.current[index] = el)}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-light tracking-widest uppercase sm:text-base text-DarkLava dark:text-white/80">
                  {skill.name}
                </span>
                <span className="text-xs tracking-widest text-SageGray dark:text-white/40">
                  {skill.level}%
                </span>
              </div>
              <div className="relative h-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div
                  ref={(el) => (barRefs.current[index] = el)}
                  className="absolute top-0 left-0 h-full rounded-full origin-left bg-gradient-to-r from-DarkLava to-gold dark:from-white dark:to-gold"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
