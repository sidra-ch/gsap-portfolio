import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  textAlign = "end",
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
            start: "top 82%",
          }
        : undefined,
    });
    tl.from(contextRef.current, { opacity: 0, duration: 0.6, ease: "power2.out" });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
      },
      "<+0.2"
    );
  }, []);
  const textAlignmentClass = textAlign === "center" ? "text-center" : textAlign === "start" ? "text-start" : "text-end";
  const textWrapperClass = textAlign === "center" ? "max-w-5xl mx-auto" : "";

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p className={`text-[10px] sm:text-xs font-medium tracking-[0.22em] sm:tracking-[0.38em] uppercase px-5 sm:px-8 lg:px-10 ${textColor}`}>
            {subTitle}
          </p>
          <div className="px-5 sm:px-8 lg:px-10">
            <h1
              className={`cinematic-title flex flex-col gap-12 uppercase banner-text-responsive sm:gap-16 md:block mb-[10px] ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-5 sm:px-8 lg:px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className={`py-12 sm:py-16 ${textAlignmentClass}`}>
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive tracking-[0.06em] ${textColor} ${textWrapperClass}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;