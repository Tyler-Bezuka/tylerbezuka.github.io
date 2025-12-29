/* ═══════════════════════════════════════════════════════════
   ⏰ COUNTDOWN TIMER MODULE
   ═══════════════════════════════════════════════════════════
   Real-time countdown to New Year 2026 with flip animations
   ═══════════════════════════════════════════════════════════ */

export class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate);
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.previousValues = {
            days: null,
            hours: null,
            minutes: null,
            seconds: null
        };
    }

    start() {
        // Initial update
        this.update();

        // Update every second
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        const diff = this.targetDate - now;

        // Check if countdown reached zero
        if (diff <= 0) {
            this.handleCountdownComplete();
            return;
        }

        // Calculate time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update displays with flip animation
        this.updateDigit('days', days, 3);
        this.updateDigit('hours', hours, 2);
        this.updateDigit('minutes', minutes, 2);
        this.updateDigit('seconds', seconds, 2);
    }

    updateDigit(unit, value, padding) {
        const element = this.elements[unit];
        if (!element) return;

        const formattedValue = String(value).padStart(padding, '0');

        // Only update if value changed (to trigger flip animation)
        if (this.previousValues[unit] !== formattedValue) {
            // Add flip animation class
            element.classList.add('digit-flip');

            // Update value
            element.textContent = formattedValue;

            // Remove animation class after it completes
            setTimeout(() => {
                element.classList.remove('digit-flip');
            }, 600);

            this.previousValues[unit] = formattedValue;
        }
    }

    handleCountdownComplete() {
        // Happy New Year!
        Object.keys(this.elements).forEach(key => {
            const element = this.elements[key];
            if (element) {
                element.textContent = '00';
                element.classList.add('rainbow-text');
            }
        });

        // Show special message
        const title = document.querySelector('.countdown-title');
        if (title) {
            title.textContent = '🎉 HAPPY NEW YEAR 2026! 🎉';
            title.classList.add('rainbow-text');
        }

        // Dispatch event
        window.dispatchEvent(new CustomEvent('newyear-2026'));
    }

    getTimeRemaining() {
        const now = new Date();
        const diff = this.targetDate - now;
        return diff;
    }
}
