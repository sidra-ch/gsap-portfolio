import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Icon } from "@iconify/react";

const CaseStudyModal = ({ project, isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const overlayEl = overlayRef.current;
    const modalEl = modalRef.current;

    if (!overlayEl) {
      return;
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayEl, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "auto",
      });
      if (modalEl) {
        gsap.fromTo(
          modalEl,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
        );
      }
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayEl, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!project?.caseStudy) return null;

  const { caseStudy } = project;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 opacity-0 pointer-events-none"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-primary dark:bg-[#1a1a1a] rounded-2xl p-8 sm:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute flex items-center justify-center transition-colors duration-200 rounded-full top-4 right-4 w-10 h-10 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20"
        >
          <Icon icon="lucide:x" className="w-5 h-5 dark:text-white" />
        </button>

        <p className="text-sm font-light tracking-[0.5rem] uppercase text-gold mb-2">
          Case Study
        </p>
        <h2 className="mb-8 text-3xl font-black uppercase sm:text-4xl dark:text-white">
          {project.name}
        </h2>

        <div className="flex flex-col gap-8">
          <div>
            <h3 className="mb-3 text-sm font-light tracking-[0.3rem] uppercase text-SageGray dark:text-white/50">
              The Problem
            </h3>
            <p className="text-lg font-light leading-relaxed text-DarkLava/80 dark:text-white/70">
              {caseStudy.problem}
            </p>
          </div>

          <div className="w-full h-px bg-black/10 dark:bg-white/10" />

          <div>
            <h3 className="mb-3 text-sm font-light tracking-[0.3rem] uppercase text-SageGray dark:text-white/50">
              The Solution
            </h3>
            <p className="text-lg font-light leading-relaxed text-DarkLava/80 dark:text-white/70">
              {caseStudy.solution}
            </p>
          </div>

          <div className="w-full h-px bg-black/10 dark:bg-white/10" />

          <div>
            <h3 className="mb-3 text-sm font-light tracking-[0.3rem] uppercase text-SageGray dark:text-white/50">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 text-xs font-light tracking-widest uppercase rounded-full bg-gold/10 text-gold border border-gold/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-black/10 dark:bg-white/10" />

          <div>
            <h3 className="mb-3 text-sm font-light tracking-[0.3rem] uppercase text-SageGray dark:text-white/50">
              Key Features
            </h3>
            <ul className="flex flex-col gap-3">
              {caseStudy.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base font-light text-DarkLava/80 dark:text-white/70"
                >
                  <Icon
                    icon="lucide:check-circle-2"
                    className="flex-shrink-0 w-5 h-5 mt-0.5 text-gold"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-light tracking-widest text-black uppercase transition-all duration-300 rounded-full bg-gold hover:bg-gold/80"
              >
                <Icon icon="lucide:external-link" className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-light tracking-widest uppercase transition-all duration-300 border rounded-full border-black/20 dark:border-white/20 text-DarkLava dark:text-white hover:border-gold hover:text-gold"
              >
                <Icon icon="lucide:github" className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
