import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react";

const stats = [
  { value: "3+", label: "Years Experience", icon: "lucide:calendar" },
  { value: "20+", label: "Projects Delivered", icon: "lucide:layers" },
  { value: "10+", label: "Tech Stack", icon: "lucide:code-2" },
  { value: "100%", label: "Client Satisfaction", icon: "lucide:star" },
];

const highlights = [
  { icon: "lucide:zap", text: "Building side projects & exploring new product opportunities" },
  { icon: "lucide:wrench", text: "Experimenting with modern tech stacks and system design patterns" },
  { icon: "lucide:mountain-snow", text: "Rock climbing to strengthen focus, patience, and problem-solving" },
  { icon: "lucide:trending-up", text: "Continuous learning to refine how products are built and improved" },
];

const About = () => {
  const text = `Product-focused engineering
    I build scalable, high-performance solutions
    from concept to production`;

  const aboutText = `Fast, scalable, and user-centered digital products are built by combining clean React interfaces with dependable backend systems. Performance, usability, and seamless end-to-end interaction remain the foundation of every implementation.

Real products take priority over isolated features — turning concepts into functional systems that are simple, efficient, and production-ready.`;

  const imgRef = useRef(null);
  const statsRef = useRef(null);
  const statItemRefs = useRef([]);

  useGSAP(() => {
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current, start: "top 85%", once: true },
    });

    statItemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 88%", once: true },
      });
    });

    gsap.from(".highlight-item", {
      x: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: ".highlight-item", start: "top 90%", once: true },
    });
  }, []);

  return (
    <section id="about" className="min-h-screen bg-white dark:bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, built to scale"}
        title={"About"}
        text={text}
        textColor={"text-black dark:text-white"}
        withScrollTrigger={true}
      />

      {/* Stats row */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-px border-t border-b border-black/8 dark:border-white/8 mx-10 mt-8 md:mt-10 mb-18"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => (statItemRefs.current[i] = el)}
            className="flex flex-col items-center text-center gap-1 py-9 px-6"
          >
            <Icon icon={stat.icon} className="w-4 h-4 text-gold mb-1" />
            <span className="text-3xl font-black text-black dark:text-white">{stat.value}</span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-light text-SageGray dark:text-white/40">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-start justify-between gap-14 lg:gap-16 px-10 pb-20 lg:pb-24 lg:flex-row">
        {/* Image */}
        <div className="w-full lg:w-2/5 flex-shrink-0">
          <div className="overflow-hidden rounded-3xl">
            <img
              ref={imgRef}
              src="/assets/logos/logoimg.jpg"
              alt="Sidra Chaudhary"
              className="w-full object-cover aspect-[4/5]"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-10 w-full lg:w-3/5">
          <AnimatedTextLines
            text={aboutText}
            className="text-xl font-light tracking-wide leading-relaxed md:text-2xl lg:text-3xl text-black/60 dark:text-white/60"
          />

          {/* Outside dev highlights */}
          <div className="flex flex-col gap-4 pt-4 border-t border-black/8 dark:border-white/8">
            <p className="text-[10px] tracking-[0.35em] uppercase font-light text-SageGray dark:text-white/40">
              Outside of development
            </p>
            <div className="flex flex-col gap-3">
              {highlights.map((item, i) => (
                <div key={i} className="highlight-item flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon icon={item.icon} className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <p className="text-sm font-light tracking-wide text-black/60 dark:text-white/50 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/sidra-cv.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-black tracking-[0.2em] uppercase bg-black dark:bg-white text-white dark:text-black hover:bg-gold hover:text-black transition-all duration-300"
            >
              <Icon icon="lucide:download" className="w-3.5 h-3.5" />
              Download CV
            </a>
            <a
              href="https://linkedin.com/in/sidra-chaudhary"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-black tracking-[0.2em] uppercase border border-black/20 dark:border-white/20 text-black dark:text-white hover:border-gold hover:text-gold transition-all duration-300"
            >
              <Icon icon="lucide:linkedin" className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
