# Mustafa Shah - Personal Developer Portfolio

A high-end, responsive, and performance-optimized personal portfolio for a Medical Laboratory Technician and Web Developer. Built with **Vanilla HTML, CSS, and JavaScript**.

## 🚀 Live Features

### 1. Holographic Avatar System
- **3D Tilt Effect**: Profile image reacts to cursor position with smooth physics-based easing.
- **Magnetic Glow**: A radial light follows the cursor within the avatar bounds, interpolating position and opacity for a premium feel.
- **Orbital Particles**: Canvas-based orbital system with adaptive particle count for mobile devices.
- **Inertia Engine**: All motion uses lerp (`current += (target - current) * 0.08`) for smooth stabilization.
- **Breathing Effect**: Subtle idle scaling animation to make the interface feel alive.

### 2. Interactive UI/UX
- **Particle Background**: Optimized canvas background with FPS capping and tab-visibility pausing.
- **Zero-Flicker Dark Mode**: Inline theme detection script to prevent Flash of Unstyled Content (FOUC).
- **Scroll Reveal**: Elements fade and slide in as they enter the viewport using the Intersection Observer API.
- **Mobile-First Design**: Fully responsive across all devices and screen sizes.

### 3. Professional Sections
- **Hero**: Dynamic typing animation for professional titles.
- **About Me**: Concise intro highlighting the intersection of Healthcare and Technology.
- **Skills**: Categorized cards (Programming, Web, Tools, Other) without distracting progress bars.
- **Projects**: Credibility-focused cards with **Problem**, **Solution**, and **Outcome** metadata.
- **Learning Journey**: Vertical timeline with punchy milestones.
- **Contact**: Direct action links for Email, GitHub, Fiverr, and WhatsApp.

## 🛠 Tech Stack
- **HTML5**: Semantic and accessible structure.
- **CSS3**: Vanilla CSS with Grid, Flexbox, and Glassmorphism.
- **JavaScript**: Modular ES6 logic (no frameworks or external libraries).
- **Icons**: Font Awesome (CDN).
- **Typography**: Google Fonts (Inter).

## 📁 Directory Structure
```text
/
├── index.html          # Main entry point
├── README.md           # Project documentation
├── css/
│   ├── base.css        # Typography and common utilities
│   ├── layout.css      # Header, nav, and structural rules
│   ├── components.css  # Detailed section styles and animations
│   └── themes.css      # CSS Variables and Theme logic
├── js/
│   ├── main.js         # Core logic, typewriter, and menu
│   ├── avatar.js       # Holographic avatar system
│   ├── particles.js    # Background particle system
│   ├── theme.js        # Theme toggle and persistence
│   └── reveal.js       # Scroll reveal observer
└── assets/             # Images, icons, and local media
```

## ⚡ Performance Optimization
- **FPS Capping**: Custom particle systems are capped at 30-60 FPS to save CPU energy.
- **Resource Management**: Animations pause when the tab is inactive.
- **Bundle Size**: Zero external JS libraries; extremely small resource footprint.
- **Reduced Motion**: Respects the `prefers-reduced-motion` media query by disabling intense animations.

## 📦 Setup & Installation
Simply clone the repository and open `index.html` in any modern web browser.
1. `git clone https://github.com/mustafa-shah-tech/portfolio.git`
2. `cd portfolio`
3. Open `index.html` in your browser.

## 👤 Author
**Mustafa Shah**
- GitHub: [@mustafa-shah-tech](https://github.com/mustafa-shah-tech)
- Email: musstafashah@mail.com
- Fiverr: [mustafashah](https://www.fiverr.com/s/995lX6A)
