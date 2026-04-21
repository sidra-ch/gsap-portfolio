import { useTheme } from "./ThemeProvider";
import { Icon } from "@iconify/react";

const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="fixed z-50 flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer w-11 h-11 md:w-14 md:h-14 bg-black/10 dark:bg-white/10 backdrop-blur-md bottom-6 right-6 hover:bg-black/20 dark:hover:bg-white/20 hover:scale-110"
      aria-label="Toggle theme"
    >
      <Icon
        icon={isDark ? "lucide:sun" : "lucide:moon"}
        className="w-5 h-5 text-DarkLava dark:text-white transition-transform duration-300"
      />
    </button>
  );
};

export default ThemeToggle;
