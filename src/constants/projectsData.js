// src/constants/projectsData.js
/**
 * Project data for the resume
 */
export const projects = [
    {
      title: "Layered Resume Website",
      link: "https://salhotra.dev",
      bullets: [
        "Architected a full single-page application (SPA) with React Router, supporting URL-based deep linking, browser navigation (back/forward), and dynamic route-driven state transitions.",
        "Engineered a dual-mode responsive layout: layered resume UI for desktop and a swipe-based, mobile-optimized carousel for smaller devices.",
        "Integrated custom-built mini-game (Echo runner) with two distinct overlays: desktop and mobile versions, using Canvas API and frame-rate normalized physics engine.",
        "Designed and animated an interactive sprite pet (EchoPet) with idle behavior, directional flipping, and frame-based animation control.",
        "Deployed production build on Cloudflare Pages with DNS, TLS, and cache configuration for high availability and global edge delivery."
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