import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import CaseStudyModal from "../components/CaseStudyModal";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [caseStudyProject, setCaseStudyProject] = useState(null);

  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(".project-row", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".project-row",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black dark:text-white"}
        withScrollTrigger={true}
      />
      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-row relative flex flex-col gap-1 py-5 group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black dark:bg-white/10 -z-10 clip-path"
            />

            {/* title row */}
            <div className="flex items-center justify-between px-10 text-black dark:text-white transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-widest text-SageGray dark:text-white/30 font-light tabular-nums hidden md:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="lg:text-[32px] text-[26px] leading-none">
                  {project.name}
                </h2>
                {project.featured && (
                  <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase rounded-full bg-gold/90 text-black font-light">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {/* Action buttons - visible on hover (desktop) */}
                <div className="items-center hidden gap-2 transition-opacity duration-300 opacity-0 md:flex md:group-hover:opacity-100">
                  {project.href && project.href !== "#" && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-[10px] tracking-widest uppercase rounded-full border border-white/30 text-white transition-colors duration-200 hover:bg-gold hover:border-gold hover:text-black"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-[10px] tracking-widest uppercase rounded-full border border-white/30 text-white transition-colors duration-200 hover:bg-white hover:text-black"
                    >
                      GitHub
                    </a>
                  )}
                  {project.caseStudy && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCaseStudyProject(project);
                      }}
                      className="px-3 py-1 text-[10px] tracking-widest uppercase rounded-full border border-gold/40 text-gold transition-colors duration-200 hover:bg-gold/20 cursor-pointer"
                    >
                      Case Study
                    </button>
                  )}
                </div>
                <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
              </div>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 bg-black/80 dark:bg-white/20" />

            {/* framework badges */}
            <div className="flex flex-wrap px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black dark:text-white/60 transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>

            {/* mobile: preview image + action buttons */}
            <div className="md:hidden">
              <div className="relative flex items-center justify-center px-10 h-[400px]">
                <img
                  src={project.bgImage}
                  alt={`${project.name}-bg-image`}
                  loading="lazy"
                  className="object-cover w-full h-full rounded-md brightness-50"
                />
                <img
                  src={project.image}
                  alt={`${project.name}-image`}
                  loading="lazy"
                  className="absolute bg-center px-14 rounded-xl"
                />
              </div>
              <div className="flex flex-wrap gap-2 px-10 mt-3">
                {project.href && project.href !== "#" && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase rounded-full bg-black dark:bg-white text-white dark:text-black"
                  >
                    <Icon icon="lucide:external-link" className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}
                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase rounded-full border border-black/20 dark:border-white/20 text-black dark:text-white"
                  >
                    <Icon icon="lucide:github" className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
                {project.caseStudy && (
                  <button
                    onClick={() => setCaseStudyProject(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs tracking-widest uppercase rounded-full border border-gold/30 text-gold cursor-pointer"
                  >
                    <Icon icon="lucide:file-text" className="w-3.5 h-3.5" />
                    Case Study
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* desktop floating preview image */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black dark:border-white/20 pointer-events-none w-[960px] md:block hidden opacity-0"
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>

      <CaseStudyModal
        project={caseStudyProject}
        isOpen={!!caseStudyProject}
        onClose={() => setCaseStudyProject(null)}
      />
    </section>
  );
};

export default Works;