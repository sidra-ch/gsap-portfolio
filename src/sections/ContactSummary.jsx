import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactSummary = () => {
  const containerRef = useRef(null);
  const items = [
    "Clarity",
    "Execution",
    "Reliability",
    "Partnership",
    "Craft",
  ];
  const items2 = [
    "Let\'s design your next digital product",
    "Email: ms.sidrachaudhary@gmail.com",
    "GitHub: github.com/sidra-ch",
    "LinkedIn: linkedin.com/in/sidra-chaudhary",
    "Available for freelance and long-term product teams",
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
      className="flex flex-col items-center justify-between py-16 sm:py-24 gap-10 sm:gap-12 dark:text-white overflow-hidden"
    >
      <Marquee items={items} />
      <div className="overflow-hidden font-light text-center contact-text-responsive px-5 sm:px-0 leading-tight">
        <p>
          “ Let’s build software that is <br />
          <span className="font-normal">beautiful to use</span> and <br />
          <span className="italic">serious in performance</span> <br />
          from day one <span className="text-gold">to scale</span> “
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