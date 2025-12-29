/* ═══════════════════════════════════════════════════════════
   🚀 BOOT SEQUENCE MODULE
   ═══════════════════════════════════════════════════════════
   Handles the retro console startup animation
   ═══════════════════════════════════════════════════════════ */

export class BootSequence {
    constructor() {
        this.bootScreen = document.getElementById('boot-screen');
        this.duration = 3000; // 3 seconds total
    }

    async start() {
        // Check if already booted this session
        if (sessionStorage.getItem('booted')) {
            this.skip();
            return;
        }

        // Show boot sequence
        await this.playBootAnimation();

        // Mark as booted
        sessionStorage.setItem('booted', 'true');
    }

    async playBootAnimation() {
        return new Promise((resolve) => {
            // Wait for loading bar to complete (2.5s from CSS animation)
            setTimeout(() => {
                this.fadeOut();
                resolve();
            }, this.duration);
        });
    }

    fadeOut() {
        if (this.bootScreen) {
            this.bootScreen.classList.add('fade-out');

            // Remove from DOM after fade completes
            setTimeout(() => {
                this.bootScreen.style.display = 'none';
            }, 500);
        }
    }

    skip() {
        if (this.bootScreen) {
            this.bootScreen.style.display = 'none';
        }
    }
}
