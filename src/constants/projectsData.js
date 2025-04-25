// src/constants/projectsData.js
/**
 * Project data for the resume
 */
export const projects = [
    {
      title: "Layered Resume Website",
      link: "https://avni.dev",
      bullets: [
        "Built an interactive resume website with React and Tailwind CSS, featuring layered card UI and embedded canvas-based mini-game.",
        "Implemented custom React hooks to modularize animation, sprite control, and game logic — improving reusability and testability.",
        "Engineered a real-time runner game using canvas with sprite sheet animation, collision detection, and debug rendering.",
        "Designed an idle sprite logic system with directional flipping, randomized behavior states, and custom animation timing.",
        "Deployed on Netlify with custom domain, DNS, and TLS configuration for production readiness."
      ]
    },
    {
      title: "Domain Health Checker",
      link: "https://github.com/avni-salhotra/domain-health-checker",
      bullets: [
        "Built an automated domain health scanner to detect SSL, DNS, SPF/DKIM/DMARC, redirect, and uptime issues, improving security posture across environments.",
        "Prevented potential breaches by identifying critical production misconfigurations including expired DKIM signatures, missing SPF records, and broken redirect chains.",
        "Engineered real-time alerting using Gmail SMTP with secure app passwords, enabling immediate response to domain health degradations and reducing average incident detection time by 70%.",
        "While the final version is under NDA, an MVP version is publicly available on GitHub."
      ]
    }
  ];