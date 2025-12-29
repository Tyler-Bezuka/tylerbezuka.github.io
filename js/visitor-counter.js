/* ═══════════════════════════════════════════════════════════
   👥 VISITOR COUNTER MODULE
   ═══════════════════════════════════════════════════════════
   Classic 90s-style visitor counter with flip animation
   ═══════════════════════════════════════════════════════════ */

export class VisitorCounter {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.count = this.loadCount();
        this.milestones = [100, 500, 1000, 1337, 5000, 10000];
    }

    loadCount() {
        // Try localStorage first
        let count = parseInt(localStorage.getItem('visitor_count') || '0');

        // Add some randomization for first visit
        if (count === 0) {
            count = Math.floor(Math.random() * 5000) + 1000; // Start between 1000-6000
        }

        // Increment count
        count++;
        localStorage.setItem('visitor_count', count);

        // Check for milestones
        this.checkMilestone(count);

        return count;
    }

    display() {
        // Animate counting up to current number
        this.animateCounter(0, this.count, 1500);
    }

    animateCounter(start, end, duration) {
        if (!this.element) return;

        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;

            if (current >= end) {
                current = end;
                clearInterval(timer);
            }

            this.element.textContent = String(Math.floor(current)).padStart(6, '0');
        }, 16);
    }

    checkMilestone(count) {
        if (this.milestones.includes(count)) {
            // Dispatch custom event for milestone
            window.dispatchEvent(new CustomEvent('visitor-milestone', {
                detail: { count }
            }));
        }
    }

    getCurrentCount() {
        return this.count;
    }
}
