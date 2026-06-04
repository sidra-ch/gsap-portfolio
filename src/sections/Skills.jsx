import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Icon } from "@iconify/react";
import { skillsData } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    gsap.from(sectionRef.current.querySelectorAll(".skills-header"), {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
    });

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });

    gsap.from(".skill-chip-item", {
      y: 22,
      opacity: 0,
      stagger: 0.03,
      duration: 0.45,
      ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
    });
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="px-5 sm:px-8 lg:px-10 py-20 sm:py-24 bg-primary dark:bg-[#111]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="skills-header mb-4">
          <p className="text-xs sm:text-sm font-light tracking-[0.2rem] sm:tracking-[0.5rem] uppercase text-SageGray dark:text-white/40">
            Technical Expertise
          </p>
        </div>
        <h2 className="skills-header mb-16 text-4xl font-black uppercase sm:text-5xl lg:text-6xl dark:text-white">
          Skills
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((category, catIdx) => (
            <div
              key={category.category}
              ref={(el) => (cardRefs.current[catIdx] = el)}
              className="p-5 sm:p-6 rounded-2xl border border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/3 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/8 dark:border-white/8">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Icon icon={category.icon} className="w-4 h-4 text-gold" />
                </div>
                <span className="text-xs font-black tracking-[0.14em] sm:tracking-[0.24em] uppercase text-DarkLava dark:text-white">
                  {category.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="skill-chip-item inline-flex items-center gap-2 px-3 py-1.5 text-[11px] tracking-[0.08em] uppercase rounded-full border border-black/10 dark:border-white/14 text-DarkLava dark:text-white/80 bg-black/[0.03] dark:bg-white/[0.03]"
                  >
                    <Icon icon={skill.icon} className="w-3.5 h-3.5 opacity-80" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
