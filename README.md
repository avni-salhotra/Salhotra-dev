# salhotra.dev

A production-grade, interactive portfolio and resume site built with React, Tailwind CSS, and Canvas API, featuring layered UI animations and an embedded mobile-compatible 2D runner game. 

Deployed live via [salhotra.dev](https://www.salhotra.dev) using Cloudflare Pages.

---

## Overview

A project focused on building a clean, interactive resume website with mobile optimization, frontend animation systems, and cloud-native deployment. Emphasizes production-ready practices, modular design, and reliable cross-device performance.

---

## Key Features

- 🖥️ **Layered UI/UX**: Dynamic pixel-styled resume sections powered by animated component layering
- 🏃 **Canvas Game Engine**: Embedded 2D runner game built from scratch using HTML5 Canvas and vanilla JavaScript
- 📱 **Mobile-First Design**: Full gameplay and site interactivity optimized for both desktop and mobile browsers
- 🔄 **Custom React Hooks**: Modular animation controllers, gameplay state machines, and input handlers
- ⚡ **Optimized Deployment**: Cloudflare Pages hosting with automated CI/CD pipelines and environment-specific builds
- 🔒 **Secure Delivery**: HTTPS, asset optimization, and mobile performance hardening

---

## Technology Stack

- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS
- **Game Engine**: Native Canvas API (JavaScript)
- **Deployment**: Cloudflare Pages (Production branch workflow)
- **Version Control**: GitHub

---

## Gameplay

- **Accessible directly** from the homepage — no hidden unlocks
- **Responsive input**: tap on mobile / click on desktop to control jumps
- **Obstacle collision** and **physics simulation** tuned for smooth cross-device performance

---

## Local Development

Clone the repository and run the local dev server:

```bash
git clone https://github.com/avni-salhotra/salhotra-dev.git
cd salhotra-dev
npm install
npm run dev
```

---

## Notes

This project demonstrates real-world production techniques in interactive web development, emphasizing cross-device performance, scalability, and maintainability.

Future expansions may include enhanced animations, progressive web app (PWA) support, and continuous performance tuning.

---
# salhotra.dev

An interactive, production-grade portfolio and resume website built with React, Tailwind CSS, and native Canvas API. Features layered UI navigation, SPA architecture, animated sprite companions, and a mobile-first runner game.

Deployed live via [salhotra.dev](https://www.salhotra.dev) using Cloudflare Pages.

---

## ✨ Overview

**salhotra.dev** is designed for **cross-device, high-performance browsing**:
- **Layered desktop resume** with animated card stacking (hover/click to open)
- **Mobile-first stacked resume** with **swipeable card carousel** for touch devices
- **Embedded runner game** (playable directly from homepage or via `/game`)
- **Animated EchoPet** sprite companion with real-time sprite sheet animation

This project emphasizes **modularity**, **mobile optimization**, **realistic production practices**, and **interactive frontend craftsmanship**.

---

## 🧩 Key Features

- **SPA Routing**: Built as a true single-page app with `react-router-dom`
- **Layered Desktop UI**: Clickable cards with smooth 3D layering transitions
- **Mobile Card Carousel**: Gesture-based swipe navigation across resume sections
- **Embedded Game Engine**: HTML5 Canvas runner game with mobile tap-to-jump support
- **Custom Animation Hooks**: Sprite animation (`useEchoAnimation`), game state control (`useGameLogic`)
- **Dynamic State Management**: URL-driven view state syncing for true SPA behavior
- **Responsive and Accessible**: Keyboard, touch, and pointer input compatibility
- **Cloudflare Deployment**: CI/CD optimized for minimal downtime and fast loads

---

## 🛠 Technology Stack

| Purpose | Tech |
|:---|:---|
| Frontend Framework | React 19 |
| Styling | Tailwind CSS |
| Animation | Native Canvas API (JavaScript) |
| Routing | react-router-dom |
| Hosting | Cloudflare Pages |
| Version Control | GitHub |

---

## 🎮 Gameplay Mechanics

- **Direct Access**: Enter the game by clicking the dog sprite or visiting `/game`
- **Jump Controls**: 
  - Desktop: `Spacebar` or `Up Arrow`
  - Mobile: Tap the game screen
- **Collision and Physics**: Responsive, framerate-independent motion
- **Guaranteed Exit**: Bulletproof game exit mechanics for Android/iOS browser quirks

---

## 📦 Local Development

```bash
git clone https://github.com/avni-salhotra/salhotra-dev.git
cd salhotra-dev
npm install
npm run dev
```

Local server runs at `http://localhost:5173` (or specified Vite dev port).

---

## 📋 Notes

This project reflects **real-world frontend engineering principles**:
- Modularized codebase with reusable components and hooks
- Cross-platform performance tuning (tested across Chrome, Safari, Firefox, Android, iOS)
- SPA architecture with **back button support** and **dynamic page state** persistence
- Production-oriented hosting, HTTPS hardening, and asset optimization

**Future directions** may include:
- Progressive Web App (PWA) support
- Expanded EchoPet animations (idling, playful states)
- Deep-linkable game scores or trophies

---

# 🔥 Deployment

Live production site: [https://www.salhotra.dev](https://www.salhotra.dev)