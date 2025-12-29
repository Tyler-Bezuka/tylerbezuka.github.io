/* ═══════════════════════════════════════════════════════════
   ✨ PARTICLE EFFECTS SYSTEM
   ═══════════════════════════════════════════════════════════
   Pixel particles that spawn on clicks and float upward
   ═══════════════════════════════════════════════════════════ */

export class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.colors = [
            '#06FFA5', // Primary green
            '#FFD23F', // Secondary gold
            '#4CC9F0', // Neon blue
            '#EF233C', // Red
            '#7209B7'  // Purple
        ];
        this.particleCount = 0;
        this.maxParticles = 50; // Prevent memory issues
    }

    spawn(x, y, count = 5) {
        if (!this.container) return;

        // Limit total particles
        if (this.particleCount >= this.maxParticles) {
            return;
        }

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createParticle(x, y);
            }, i * 50);
        }
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random color from palette
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;

        // Random size (4-10px)
        const size = Math.floor(Math.random() * 6) + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Position at click location
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Random drift (-50px to +50px)
        const drift = (Math.random() * 100) - 50;
        particle.style.setProperty('--drift', drift + 'px');

        // Add to container
        this.container.appendChild(particle);
        this.particleCount++;

        // Remove after animation (2s from CSS)
        setTimeout(() => {
            particle.remove();
            this.particleCount--;
        }, 2000);
    }

    clear() {
        if (this.container) {
            this.container.innerHTML = '';
            this.particleCount = 0;
        }
    }
}
