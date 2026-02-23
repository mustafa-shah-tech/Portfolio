/**
 * Holographic Avatar System
 * Controls: 3D Tilt, Magnetic Glow, Orbital Particles, Inertia Engine
 */

class HolographicAvatar {
    constructor() {
        this.container = document.querySelector('.avatar-container');
        this.wrapper = document.querySelector('.avatar-wrapper');
        this.canvas = document.getElementById('avatar-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.glowElement = document.querySelector('.avatar-glow');

        // Physics / Motion state
        this.mouse = { x: 0, y: 0, active: false };
        this.currentTilt = { x: 0, y: 0, scale: 1 };
        this.targetTilt = { x: 0, y: 0, scale: 1 };

        // Magnetic Glow state
        this.currentGlow = { x: 50, y: 50, opacity: 0 };
        this.targetGlow = { x: 50, y: 50, opacity: 0 };

        this.lerpFactor = 0.08;

        // Orbital Particles
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 6 : 12;
        this.time = 0;
        this.isActive = true;

        // Accessibility
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (this.reducedMotion) return;

        this.init();
    }

    init() {
        this.resize();
        this.initOrbitParticles();
        this.addEventListeners();
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = 300 * dpr;
        this.canvas.height = 300 * dpr;
        this.ctx.scale(dpr, dpr);
        this.particleCount = window.innerWidth < 768 ? 6 : 12;
        this.initOrbitParticles();
    }

    initOrbitParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                radius: 80 + Math.random() * 40,
                speed: 0.01 + Math.random() * 0.02,
                angle: Math.random() * Math.PI * 2,
                size: Math.random() * 2 + 1,
                opacity: 0.2 + Math.random() * 0.5
            });
        }
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.container.addEventListener('mouseenter', () => this.handleMouseEnter());
        this.container.addEventListener('mouseleave', () => this.handleMouseLeave());
        window.addEventListener('resize', () => this.throttleResize());
        document.addEventListener('visibilitychange', () => {
            this.isActive = !document.hidden;
        });
    }

    handleMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (this.mouse.active) {
            // Normalize mouse pos relative to center (-1 to 1)
            const nx = (e.clientX - centerX) / (rect.width / 2);
            const ny = (e.clientY - centerY) / (rect.height / 2);

            this.targetTilt.x = Math.max(-1, Math.min(1, ny)) * -12;
            this.targetTilt.y = Math.max(-1, Math.min(1, nx)) * 12;

            // Glow target (percentage inside wrapper)
            this.targetGlow.x = ((e.clientX - rect.left) / rect.width) * 100;
            this.targetGlow.y = ((e.clientY - rect.top) / rect.height) * 100;
        }
    }

    handleMouseEnter() {
        this.mouse.active = true;
        this.targetTilt.scale = 1.05;
        this.targetGlow.opacity = 1;
    }

    handleMouseLeave() {
        this.mouse.active = false;
        this.targetTilt.x = 0;
        this.targetTilt.y = 0;
        this.targetTilt.scale = 1;
        this.targetGlow.opacity = 0;
    }

    throttleResize() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => this.resize(), 200);
    }

    animate() {
        if (!this.isActive) {
            requestAnimationFrame(this.animate.bind(this));
            return;
        }

        this.time += 0.02;

        // 1. Inertia Engine (Lerp Tilt)
        this.currentTilt.x += (this.targetTilt.x - this.currentTilt.x) * this.lerpFactor;
        this.currentTilt.y += (this.targetTilt.y - this.currentTilt.y) * this.lerpFactor;
        this.currentTilt.scale += (this.targetTilt.scale - this.currentTilt.scale) * this.lerpFactor;

        // 2. Inertia Engine (Lerp Glow)
        this.currentGlow.x += (this.targetGlow.x - this.currentGlow.x) * this.lerpFactor;
        this.currentGlow.y += (this.targetGlow.y - this.currentGlow.y) * this.lerpFactor;
        this.currentGlow.opacity += (this.targetGlow.opacity - this.currentGlow.opacity) * this.lerpFactor;

        // Apply Glow Styles
        this.glowElement.style.background = `radial-gradient(circle at ${this.currentGlow.x}% ${this.currentGlow.y}%, rgba(59, 130, 246, 0.5) 0%, transparent 70%)`;
        this.glowElement.style.opacity = this.currentGlow.opacity;

        // Breathing effect when idle
        const breathing = Math.sin(this.time) * 0.01;
        const finalScale = this.currentTilt.scale + breathing;

        this.wrapper.style.transform = `perspective(1000px) rotateX(${this.currentTilt.x}deg) rotateY(${this.currentTilt.y}deg) scale(${finalScale})`;

        // 3. Draw Scene
        this.ctx.clearRect(0, 0, 300, 300);
        this.drawParticles(150, 150);

        requestAnimationFrame(this.animate.bind(this));
    }

    drawParticles(cx, cy) {
        const theme = document.documentElement.getAttribute('data-theme');
        const colorBase = theme === 'dark' ? 'rgba(59, 130, 246,' : 'rgba(37, 99, 235,';

        this.particles.forEach(p => {
            p.angle += p.speed;

            const x = cx + Math.cos(p.angle) * p.radius;
            const y = cy + Math.sin(p.angle) * p.radius;

            const fade = (Math.sin(p.angle) + 1) / 2;
            const opacity = p.opacity * (0.3 + 0.7 * fade);

            this.ctx.beginPath();
            this.ctx.arc(x, y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `${colorBase} ${opacity})`;
            this.ctx.fill();

            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = `${colorBase} ${opacity * 0.5})`;
        });
        this.ctx.shadowBlur = 0;
    }
}

window.addEventListener('load', () => {
    new HolographicAvatar();
});
