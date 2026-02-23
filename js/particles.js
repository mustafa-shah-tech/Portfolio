class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.fpsCap = 30;
        this.lastTime = 0;
        this.interval = 1000 / this.fpsCap;
        this.isActive = true;
        this.reducedDensity = window.innerWidth < 900;

        this.init();
        this.resize();
        this.animate(0);

        window.addEventListener('resize', () => this.resize());
        document.addEventListener('visibilitychange', () => {
            this.isActive = !document.hidden;
        });

        // Auto-disable if performance is very poor (simplified check)
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.isActive = false;
            this.canvas.style.display = 'none';
        }
    }

    init() {
        const count = this.reducedDensity ? 40 : 80;
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.reducedDensity = window.innerWidth < 900;
        this.init();
    }

    draw() {
        const theme = document.documentElement.getAttribute('data-theme');
        const color = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = color;

        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
        });
    }

    animate(currentTime) {
        if (!this.isActive) {
            requestAnimationFrame((t) => this.animate(t));
            return;
        }

        const delta = currentTime - this.lastTime;
        if (delta > this.interval) {
            this.draw();
            this.lastTime = currentTime - (delta % this.interval);
        }

        requestAnimationFrame((t) => this.animate(t));
    }
}

// Initialize only on desktop/mid-range if possible
window.addEventListener('load', () => {
    new ParticleSystem();
});
