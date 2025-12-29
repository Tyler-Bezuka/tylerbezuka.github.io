/* ═══════════════════════════════════════════════════════════
   🎮 KONAMI CODE DETECTOR
   ═══════════════════════════════════════════════════════════
   Detects the legendary Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
   ═══════════════════════════════════════════════════════════ */

export class KonamiCode {
    constructor(callback) {
        this.pattern = [
            'ArrowUp', 'ArrowUp',
            'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight',
            'ArrowLeft', 'ArrowRight',
            'b', 'a'
        ];
        this.current = 0;
        this.callback = callback;
        this.timeout = null;

        this.listen();
    }

    listen() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();

            // Check if the key matches the current position in the pattern
            if (key === this.pattern[this.current].toLowerCase()) {
                this.current++;

                // Visual feedback for each key press
                this.showKeyPress(this.pattern[this.current - 1]);

                // If pattern is complete
                if (this.current === this.pattern.length) {
                    this.success();
                    this.current = 0;
                }

                // Reset timer (pattern must be entered within 10 seconds)
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.current = 0;
                }, 10000);

            } else {
                // Wrong key, reset
                this.current = 0;
            }
        });
    }

    showKeyPress(key) {
        // Create visual feedback element
        const feedback = document.createElement('div');
        feedback.textContent = this.getKeySymbol(key);
        feedback.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(${-30 * (this.current - 1)}px);
            font-family: 'Press Start 2P', cursive;
            font-size: 1rem;
            color: #FFD23F;
            text-shadow: 0 0 10px #FFD23F;
            pointer-events: none;
            z-index: 10001;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
        `;

        document.body.appendChild(feedback);

        // Remove after animation
        setTimeout(() => {
            feedback.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => feedback.remove(), 300);
        }, 1000);
    }

    getKeySymbol(key) {
        const symbols = {
            'ArrowUp': '↑',
            'ArrowDown': '↓',
            'ArrowLeft': '←',
            'ArrowRight': '→',
            'b': 'B',
            'a': 'A'
        };
        return symbols[key] || key;
    }

    success() {
        console.log('%c🎮 KONAMI CODE ACTIVATED!', 'color: #FFD23F; font-size: 20px; font-weight: bold;');

        // Screen flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 210, 63, 0.5);
            pointer-events: none;
            z-index: 10002;
            animation: fadeOut 0.5s forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);

        // Execute callback
        if (this.callback) {
            this.callback();
        }
    }
}
