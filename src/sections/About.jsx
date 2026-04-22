import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Product-focused engineering
    I build scalable, high-performance solutions
    from concept to production`;
  const aboutText = `Fast, scalable, and user-centered digital products are built by combining clean React interfaces with dependable backend systems. Performance, usability, and seamless end-to-end interaction remain the foundation of every implementation.

Real products take priority over isolated features, turning concepts into functional systems that are simple, efficient, and production-ready.

Outside of development:
⚡ Building side projects and exploring new product opportunities
🔧 Experimenting with modern technology stacks and system design patterns
🧗 Rock climbing to strengthen focus, patience, and problem-solving mindset
📈 Staying in continuous learning mode to refine how products are built and improved`;
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.from("#about", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 82%",
        once: true,
        markers: false,
      },
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 85%",
        once: true,
      },
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
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-black/60 dark:text-white/60">
        <img
          ref={imgRef}
          src="/assets/logos/logoimg.jpg"
          alt="logo"
          className="w-md rounded-3xl"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;