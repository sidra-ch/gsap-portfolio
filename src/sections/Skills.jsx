import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Icon } from "@iconify/react";
import { skillsData } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const SkillBar = ({ skill, index, barRefs }) => (
  <div className="group">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Icon icon={skill.icon} className="w-4 h-4 opacity-70" />
        <span className="text-xs font-light tracking-widest uppercase text-DarkLava dark:text-white/70">
          {skill.name}
        </span>
      </div>
      <span className="text-xs tabular-nums tracking-widest text-SageGray dark:text-white/30">
        {skill.level}%
      </span>
    </div>
    <div className="relative h-[2px] overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
      <div
        ref={(el) => (barRefs.current[index] = el)}
        className="absolute top-0 left-0 h-full rounded-full origin-left bg-gradient-to-r from-DarkLava to-gold dark:from-white/60 dark:to-gold"
        style={{ width: `${skill.level}%` }}
      />
    </div>
  </div>
);

const Skills = () => {
  const sectionRef = useRef(null);
  const barRefs = useRef([]);
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

    barRefs.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          delay: i * 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 92%" },
        }
      );
    });
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="px-10 py-24 bg-primary dark:bg-[#111]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="skills-header mb-4">
          <p className="text-sm font-light tracking-[0.5rem] uppercase text-SageGray dark:text-white/40">
            Technical Expertise
          </p>
        </div>
        <h2 className="skills-header mb-16 text-4xl font-black uppercase sm:text-5xl lg:text-6xl dark:text-white">
          Skills
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {skillsData.map((category, catIdx) => {
            // compute start index for this category's bars
            const startIndex = skillsData
              .slice(0, catIdx)
              .reduce((acc, c) => acc + c.skills.length, 0);
            return (
              <div
                key={category.category}
                ref={(el) => (cardRefs.current[catIdx] = el)}
                className="p-6 rounded-2xl border border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/3 backdrop-blur-sm"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/8 dark:border-white/8">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                    <Icon icon={category.icon} className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-xs font-black tracking-[0.3em] uppercase text-DarkLava dark:text-white">
                    {category.category}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-col gap-5">
                  {category.skills.map((skill, skillIdx) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={startIndex + skillIdx}
                      barRefs={barRefs}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
