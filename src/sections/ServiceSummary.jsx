import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: {
        trigger: "#title-service-1",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        trigger: "#title-service-2",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 100,
      scrollTrigger: {
        trigger: "#title-service-3",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -100,
      scrollTrigger: {
        trigger: "#title-service-4",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }, []);
  return (
    <section className="mt-20 mb-20 overflow-hidden font-light leading-snug text-center contact-text-responsive dark:text-white">
      <div id="title-service-1">
        <p>Architucture</p>
      </div>
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3 translate-x-16"
      >
        <p className="font-normal">Development</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p>Deployment</p>
      </div>
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3 -translate-x-30"
      >
        <p>APIs</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p className="italic">Frontends</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p>Scalability</p>
      </div>
      <div id="title-service-4" className="translate-x-48">
        <p>Databases</p>
      </div>
    </section>
  );
};

export default ServiceSummary;