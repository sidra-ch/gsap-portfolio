// index.js
export const servicesData = [
  {
    title: "FullStack Development",
    description:
      "Your business deserves a fast, secure, and future-proof digital foundation. I develop custom web apps with clean architecture, optimized databases, and seamless integrations—ensuring reliability at every layer.",
    items: [
      {
        title: "Backend Engineering",
        description: "(REST/GraphQL APIs, Microservices, Auth Systems)",
      },
      {
        title: "Frontend Excellence",
        description: "(React, Vue, TypeScript, Interactive UI/UX)",
      },
      {
        title: "Database Design",
        description: "(SQL/NoSQL Optimization, Scalable Structures)",
      },
    ],
  },
  {
    title: "DevOps & Cloud Solutions",
    description:
      "Deploying software shouldn't be a gamble. I automate infrastructure, enforce security, and leverage cloud platforms (AWS/Azure) to keep your app running smoothly—24/7, at any scale.",
    items: [
      {
        title: "CI/CD Pipelines",
        description: "(GitHub Actions, Docker, Kubernetes)",
      },
      {
        title: "Server Management ",
        description: "(Linux, Nginx, Load Balancing)",
      },
      {
        title: "Performance Tuning",
        description: "(Caching, Compression, Lighthouse 90+ Scores)",
      },
    ],
  },
  {
    title: "Security & Optimization",
    description:
      "Slow or hacked apps destroy trust. I harden security (XSS/SQLI protection, OAuth) and optimize bottlenecks so your app stays fast, safe, and scalable as you grow.",
    items: [
      {
        title: "Code Audits",
        description: "(Refactoring, Tech Debt Cleanup)",
      },
      {
        title: "Pen Testing",
        description: "(Vulnerability Assessments)",
      },
      {
        title: "SEO Tech Stack",
        description: "(SSR, Metadata, Structured Data)",
      },
    ],
  },
  {
    title: "Web & Mobile Apps",
    description:
      "A clunky interface can sink even the best ideas. I craft responsive, pixel perfect web and mobile apps (React Native/Flutter) that users love—bridging design and functionality seamlessly.",
    items: [
      {
        title: "Cross-Platform Apps",
        description: "(Single codebase for iOS/Android/Web)",
      },
      {
        title: "PWAs",
        description: "(Offline mode, Push Notifications)",
      },
      {
        title: "E-Commerce",
        description: "(Checkout flows, Payment Gateways, Inventory APIs)",
      },
    ],
  },
];
export const projects = [
  {
    id: 1,
    name: "Sapphura E-Commerce Platform",
    description:
      "Full-stack e-commerce application with product listing & filtering, shopping cart, checkout system, and secure authentication.",
    year: "2026",
    role: "Lead Full Stack Engineer",
    impact: "Checkout completion up by 31%",
    href: "#",
    github: "#",
    image: "/assets/projects/sapphura-ecommerce.png.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    featured: true,
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "PostgreSQL" },
      { id: 4, name: "Stripe" },
      { id: 5, name: "Cloudinary" },
    ],
    caseStudy: {
      problem:
        "Small businesses lacked an affordable, high-performance e-commerce platform that could handle real-time inventory, secure payments, and scalable traffic without enterprise-level costs.",
      solution:
        "Built Sapphura — a full-stack e-commerce platform with server-rendered pages for SEO, real-time inventory sync, Stripe-powered checkout, and Cloudinary-optimized media delivery. The architecture supports horizontal scaling and sub-second page loads.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Cloudinary", "Redis", "Docker"],
      features: [
        "Advanced product listing with multi-filter search",
        "Real-time shopping cart with persistent sessions",
        "Secure Stripe checkout with webhook verification",
        "JWT + OAuth authentication system",
        "Cloudinary-powered image optimization & CDN",
        "Admin dashboard with analytics & inventory management",
      ],
    },
  },
  {
    id: 2,
    name: "Mobile Accessories E-commerce",
    description:
      "An online store specializing in phone accessories including cases, chargers, cables, and power banks with MagSafe compatibility.",
    year: "2025",
    role: "Frontend + Commerce Architecture",
    impact: "Page speed score above 92",
    href: "",
    github: "",
    image: "/assets/projects/mobile-accessories-store.jpg",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Plant Shop E-commerce",
    description:
      "An online store specializing in rare and decorative plants with a clean, user-friendly interface.",
    year: "2025",
    role: "UI Engineer",
    impact: "Mobile conversion up by 24%",
    href: "",
    github: "",
    image: "/assets/projects/plant-shop.jpg",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Stripe API" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 4,
    name: "Apple Tech Marketplace",
    description:
      "An e-commerce platform for Apple products and accessories with deals and category filtering.",
    year: "2024",
    role: "Full Stack Developer",
    impact: "Average order value up by 18%",
    href: "",
    github: "",
    image: "/assets/projects/apple-tech-store.jpg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Blazor" },
      { id: 2, name: "ASP.NET Core" },
      { id: 3, name: "SQL Server" },
      { id: 4, name: "Bootstrap" },
    ],
  },
  {
    id: 5,
    name: "Electronics & Gadgets Store",
    description:
      "A multi-category online shop featuring electronics, home appliances, and gaming gear with special offers.",
    year: "2024",
    role: "Frontend + API Integration",
    impact: "Session duration improved by 29%",
    href: "",
    github: "",
    image: "/assets/projects/electronics-store.jpg",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Vue.js" },
      { id: 2, name: "Laravel" },
      { id: 3, name: "MySQL" },
      { id: 4, name: "SCSS" },
    ],
  },
  {
    id: 6,
    name: "Home Decor Marketplace",
    description:
      "A curated collection of designer home decor items, including furniture and artisan vases.",
    year: "2023",
    role: "Product Interface Engineer",
    impact: "Catalog engagement up by 22%",
    href: "",
    github: "",
    image: "/assets/projects/home-decor-store.jpg",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "Angular" },
      { id: 2, name: "Firebase" },
      { id: 3, name: "GraphQL" },
      { id: 4, name: "Material UI" },
    ],
  },
  {
    id: 7,
    name: "Digital Game Store",
    description:
      "A gaming platform featuring discounted titles, top sellers, and genre-based browsing.",
    year: "2023",
    role: "Frontend Developer",
    impact: "Retention increased by 19%",
    href: "",
    github: "",
    image: "/assets/projects/game-store.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Chakra UI" },
    ],
  },
];

export const skillsData = [
  {
    category: "Frontend",
    icon: "logos:react",
    skills: [
      { name: "React / Next.js", level: 95, icon: "logos:react" },
      { name: "TypeScript", level: 88, icon: "logos:typescript-icon" },
      { name: "Tailwind CSS", level: 95, icon: "logos:tailwindcss-icon" },
      { name: "GSAP / Animations", level: 92, icon: "logos:greensock-icon" },
      { name: "Three.js / WebGL", level: 80, icon: "logos:threejs" },
    ],
  },
  {
    category: "Backend",
    icon: "logos:nodejs-icon",
    skills: [
      { name: "Node.js / Express", level: 90, icon: "logos:nodejs-icon" },
      { name: "ASP.NET Core", level: 85, icon: "logos:dotnet" },
      { name: "PostgreSQL / MongoDB", level: 85, icon: "logos:postgresql" },
      { name: "REST / GraphQL APIs", level: 88, icon: "mdi:api" },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "logos:docker-icon",
    skills: [
      { name: "Docker / Kubernetes", level: 78, icon: "logos:docker-icon" },
      { name: "Azure / AWS", level: 75, icon: "logos:azure-icon" },
      { name: "CI/CD Pipelines", level: 80, icon: "logos:github-actions" },
      { name: "Linux / Nginx", level: 77, icon: "logos:linux-tux" },
    ],
  },
];

export const socials = [
  { name: "LinkedIn", href: "https://linkedin.com/in/sidra-chaudhary" },
  { name: "GitHub", href: "https://github.com/sidra-ch" },
];