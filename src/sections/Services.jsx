import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// Gap between stacked cards (px converted to rem for consistency)
const CARD_OFFSET = 48; // px per card

const Services = () => {
  const text = `I design and engineer full-stack systems
    that stay fast under pressure,
    clear for users, and maintainable for teams.`;

  const serviceRefs = useRef([]);
  const isDesktopSticky = useMediaQuery({ minWidth: 1024 });

  useGSAP(() => {
    // Fade-in only — no y:200 which fights sticky
    serviceRefs.current.forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });
  }, []);

  return (
    <section id="services" className="bg-white dark:bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Services"}
        text={text}
        textColor={"text-black dark:text-white"}
        withScrollTrigger={false}
      />

      {/* Sticky card stack */}
      <div>
        {servicesData.map((service, index) => {
          const topOffset = isDesktopSticky
            ? `calc(10vh + ${index * CARD_OFFSET}px)`
            : "auto";

          return (
            <div
              key={index}
              ref={(el) => (serviceRefs.current[index] = el)}
              className={`${isDesktopSticky ? "sticky" : "relative"} px-5 sm:px-8 lg:px-10 pt-6 pb-12 text-black dark:text-white bg-white dark:bg-black border-t-2 border-black/20 dark:border-white/30`}
              style={{ top: topOffset }}
            >
              <div className="flex items-start justify-between gap-4 font-light">
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl">{service.title}</h2>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-SageGray dark:text-white/30 font-light">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg lg:text-2xl leading-relaxed tracking-[0.03em] sm:tracking-[0.08em] lg:tracking-widest text-black/60 dark:text-white/60 text-pretty max-w-3xl">
                    {service.description}
                  </p>
                  <div className="flex flex-col gap-2 text-lg sm:text-2xl sm:gap-4 lg:text-3xl text-black/80 dark:text-white/80">
                    {service.items.map((item, itemIndex) => (
                      <div key={`item-${index}-${itemIndex}`}>
                        <h3 className="flex flex-wrap items-baseline gap-y-1">
                          <span className="mr-4 sm:mr-10 text-sm sm:text-lg text-black/30 dark:text-white/30">
                            0{itemIndex + 1}
                          </span>
                          <span className="text-base sm:text-2xl lg:text-3xl">{item.title}</span>
                          <span className="w-full sm:w-auto sm:ml-3 text-xs sm:text-sm font-light text-black/40 dark:text-white/40">
                            {item.description}
                          </span>
                        </h3>
                        {itemIndex < service.items.length - 1 && (
                          <div className="w-full h-px my-2 bg-black/10 dark:bg-white/20" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spacer so the last card scrolls fully off before next section */}
      {isDesktopSticky && (
        <div style={{ height: `${(servicesData.length - 1) * CARD_OFFSET}px` }} />
      )}
    </section>
  );
};

export default Services;
