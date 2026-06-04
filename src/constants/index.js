// index.js
export const servicesData = [
  {
    title: "Full-Stack Engineering",
    description:
      "I build production-ready web platforms with clean architecture, robust APIs, and maintainable code paths so features can evolve without breaking velocity.",
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
      "I automate delivery pipelines and cloud operations so releases stay predictable, environments stay observable, and systems remain stable under growth.",
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
      "I audit risk surfaces and performance bottlenecks, then implement practical hardening and optimization so your product remains secure and responsive at scale.",
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
      "I craft responsive web and mobile experiences that feel intuitive in daily use, with interaction quality and technical depth aligned from the first release.",
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
      overview:
        "Sapphura is a flagship commerce platform engineered for high-catalog stores that need speed, secure payments, and operational control.",
      problem:
        "Growing commerce teams needed one platform to manage large catalogs, secure checkout, and operational visibility without enterprise complexity.",
      solution:
        "Built a full-stack commerce system with Next.js storefront, PostgreSQL (NeonDB), Stripe billing, Cloudinary media optimization, JWT authentication, and an admin dashboard for catalog and order operations.",
      technologies: ["Next.js", "Node.js", "PostgreSQL (NeonDB)", "Stripe", "Cloudinary", "JWT", "Vercel"],
      features: [
        "600+ product catalog with advanced search and filtering",
        "Stripe integration with checkout and webhook verification",
        "JWT-based authentication and protected account routes",
        "Admin dashboard for inventory, order, and customer workflows",
        "Cloudinary-based image optimization and delivery",
        "Production deployment on Vercel with optimized caching",
      ],
      architecture: [
        "Next.js frontend with modular product and checkout flows",
        "Node.js APIs backed by PostgreSQL (NeonDB)",
        "Media pipeline with Cloudinary transformations",
        "Auth and session controls via JWT strategy",
      ],
      results: [
        "Lighthouse performance score above 95 on key storefront pages",
        "Faster checkout completion and lower cart abandonment",
        "Operational overhead reduced via centralized admin workflows",
      ],
      metrics: ["600+ Products", "Lighthouse 95+", "Stripe Checkout", "Vercel Deployment"],
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
    caseStudy: {
      problem: "The business needed a mobile-first storefront for high-volume accessory SKUs with clear discovery paths.",
      solution: "Designed a streamlined category, search, and checkout journey with reusable frontend components and optimized APIs.",
      results: ["Faster product discovery", "Improved repeat purchasing", "Performance score above 92"],
    },
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
    caseStudy: {
      problem: "Plant buyers needed confidence while browsing niche inventory and delivery-sensitive products.",
      solution: "Created a clean storefront with simplified navigation, trust-focused product pages, and optimized checkout UX.",
      results: ["Higher mobile conversion", "Longer browsing sessions", "Cleaner checkout completion"],
    },
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
    caseStudy: {
      problem: "Users struggled to compare categories and offers across a broad Apple product catalog.",
      solution: "Implemented structured category navigation, offer surfaces, and backend-powered filtering for quick discovery.",
      results: ["Average order value increased", "Better category engagement", "Reduced bounce from listing pages"],
    },
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
    caseStudy: {
      problem: "Multi-category catalogs created complex navigation and low discoverability for promotional products.",
      solution: "Reworked filtering and content hierarchy to highlight relevant deals and shorten the path to purchase.",
      results: ["Session duration improved", "Higher product page depth", "Better campaign conversion quality"],
    },
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
    caseStudy: {
      problem: "A premium decor brand needed a cleaner buying journey for curated products and collections.",
      solution: "Built a content-first marketplace with visual category paths and lightweight data loading for smooth browsing.",
      results: ["Catalog engagement increased", "Better collection discovery", "Improved add-to-cart intent"],
    },
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
    caseStudy: {
      problem: "Players needed faster ways to discover discounted titles and browse genre-specific recommendations.",
      solution: "Introduced ranking-driven storefront modules and optimized browse filters with server-backed query handling.",
      results: ["Retention increased", "Longer session depth", "Higher repeat visit rate"],
    },
  },
];

export const skillsData = [
  {
    category: "Frontend",
    icon: "logos:react",
    skills: [
      { name: "React", icon: "logos:react" },
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "GSAP", icon: "logos:greensock-icon" },
    ],
  },
  {
    category: "Backend",
    icon: "logos:nodejs-icon",
    skills: [
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Express", icon: "simple-icons:express" },
      { name: "ASP.NET Core", icon: "logos:dotnet" },
      { name: "REST APIs", icon: "mdi:api" },
      { name: "GraphQL", icon: "logos:graphql" },
    ],
  },
  {
    category: "Databases",
    icon: "logos:postgresql",
    skills: [
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "MongoDB", icon: "logos:mongodb-icon" },
      { name: "NeonDB", icon: "lucide:database" },
      { name: "MySQL", icon: "logos:mysql" },
    ],
  },
  {
    category: "Cloud and Integrations",
    icon: "logos:vercel-icon",
    skills: [
      { name: "Vercel", icon: "logos:vercel-icon" },
      { name: "Cloudinary", icon: "simple-icons:cloudinary" },
      { name: "Stripe", icon: "logos:stripe" },
      { name: "JWT Authentication", icon: "lucide:key-round" },
    ],
  },
  {
    category: "AI and Automation",
    icon: "lucide:bot",
    skills: [
      { name: "LLM Integration", icon: "lucide:brain-circuit" },
      { name: "AI Workflows", icon: "lucide:bot" },
      { name: "Prompt Engineering", icon: "lucide:sparkles" },
      { name: "Automation APIs", icon: "lucide:workflow" },
    ],
  },
  {
    category: "DevOps and Tools",
    icon: "logos:docker-icon",
    skills: [
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "GitHub Actions", icon: "logos:github-actions" },
      { name: "Linux", icon: "logos:linux-tux" },
      { name: "Nginx", icon: "simple-icons:nginx" },
    ],
  },
];

export const socials = [
  { name: "LinkedIn", href: "https://linkedin.com/in/sidra-chaudhary" },
  { name: "GitHub", href: "https://github.com/sidra-ch" },
];