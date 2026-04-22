import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactSummary = () => {
  const containerRef = useRef(null);
  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = [
    "Let\'s discuss your next project",
    "Email: ms.sidrachaudhary@gmail.com",
    "GitHub: github.com/sidra-ch",
    "LinkedIn: linkedin.com/in/sidra-chaudhary",
    "Available for freelance and full-time opportunities",
  ];

  useGSAP(() => {
    gsap.to(containerRef.current, {
      yPercent: -2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);
  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between py-24 gap-12 dark:text-white overflow-hidden"
    >
      <Marquee items={items} />
      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-gold">together</span> “
        </p>
      </div>
      <Marquee
        items={items2}
        reverse={true}
        className="text-black dark:text-white bg-transparent border-y-2 dark:border-white/20"
        icon={null}
      />
    </section>
  );
};

export default ContactSummary;