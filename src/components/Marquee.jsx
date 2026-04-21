import { Icon } from "@iconify/react/dist/iconify.js";

const Marquee = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  const safeItems = Array.isArray(items) ? items : [];
  const loopItems = [...safeItems, ...safeItems];

  return (
    <div
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}
    >
      <div
        className="flex w-max"
        style={{
          animation: `marquee-scroll 28s linear infinite ${reverse ? "reverse" : "normal"}`,
          willChange: "transform",
        }}
      >
        {loopItems.map((text, index) => (
          <span
            key={`${text}-${index}`}
            className="flex shrink-0 items-center px-12 md:px-16 gap-x-10 md:gap-x-16"
          >
            {text}
            {icon ? <Icon icon={icon} className={iconClassName} /> : null}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;