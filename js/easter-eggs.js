/* ═══════════════════════════════════════════════════════════
   🏆 EASTER EGG MANAGER
   ═══════════════════════════════════════════════════════════
   Central coordination system for all easter eggs and achievements
   ═══════════════════════════════════════════════════════════ */

export class EasterEggManager {
    constructor() {
        this.eggs = new Map([
            // Tier 1: Easy
            ['konami', { name: 'Konami Master', description: 'Entered the legendary code!', icon: '🎮' }],
            ['hidden-pixel', { name: 'Pixel Hunter', description: 'Found the invisible pixel!', icon: '🔍' }],
            ['triple-click', { name: 'Glitch Master', description: 'Triple-clicked into the void', icon: '⚡' }],
            ['insert-coin-10', { name: 'Whale Gamer', description: 'Inserted 10 coins!', icon: '🪙' }],

            // Tier 2: Moderate
            ['midnight', { name: 'Night Owl', description: 'Visited at the witching hour', icon: '🌙' }],
            ['debug-mode', { name: 'Developer', description: 'Activated debug mode', icon: '🐛' }],
            ['gameboy-mode', { name: 'Retro Purist', description: 'Enabled Game Boy palette', icon: '🎮' }],
            ['secret-button-click', { name: 'Curious Soul', description: 'Clicked the mystery button', icon: '❓' }],

            // Tier 3: Hard
            ['long-press-title', { name: 'Patient One', description: 'Held the title for 3 seconds', icon: '⏱️' }],
            ['long-press-counter', { name: 'Counter Hacker', description: 'Long-pressed the visitor count', icon: '🔢' }],
            ['shake', { name: 'Shaker', description: 'Shook your device!', icon: '📱' }],
            ['idle-demo', { name: 'AFK Champion', description: 'Triggered demo mode', icon: '💤' }],
            ['developer-mode', { name: 'Code Inspector', description: 'Found the developer URL param', icon: '👨‍💻' }],
            ['arcade-mode', { name: 'Arcade Enthusiast', description: 'Activated arcade mode', icon: '🕹️' }],

            // Visitor milestones
            ['milestone-100', { name: 'Century Club', description: 'Reached 100 visits', icon: '💯' }],
            ['milestone-500', { name: 'High Five Hundred', description: 'Hit 500 visits!', icon: '🙌' }],
            ['milestone-1000', { name: '1K Milestone', description: 'Reached 1000 visits!', icon: '🎯' }],
            ['milestone-1337', { name: 'Elite Hacker', description: 'The legendary 1337!', icon: '😎' }]
        ]);

        this.loadProgress();
        this.setupEventListeners();
    }

    loadProgress() {
        const saved = localStorage.getItem('easter_eggs_found');
        if (saved) {
            try {
                const found = JSON.parse(saved);
                found.forEach(eggId => {
                    const egg = this.eggs.get(eggId);
                    if (egg) {
                        egg.found = true;
                    }
                });
            } catch (e) {
                console.error('Error loading easter egg progress:', e);
            }
        }
    }

    saveProgress() {
        const found = [];
        this.eggs.forEach((egg, id) => {
            if (egg.found) {
                found.push(id);
            }
        });
        localStorage.setItem('easter_eggs_found', JSON.stringify(found));
    }

    discover(eggId) {
        const egg = this.eggs.get(eggId);

        if (!egg) {
            console.warn('Unknown easter egg:', eggId);
            return false;
        }

        if (egg.found) {
            // Already found
            return false;
        }

        // Mark as found
        egg.found = true;
        this.saveProgress();

        // Show achievement notification
        this.showAchievement(egg);

        // Log to console
        console.log(`%c🏆 ACHIEVEMENT UNLOCKED: ${egg.name}`, 'color: #FFD23F; font-size: 16px; font-weight: bold;');

        // Dispatch event
        window.dispatchEvent(new CustomEvent('achievement-unlocked', {
            detail: { id: eggId, egg }
        }));

        return true;
    }

    showAchievement(egg) {
        const notification = document.getElementById('achievement-notification');
        if (!notification) return;

        // Update content
        const icon = notification.querySelector('.achievement-icon');
        const description = notification.querySelector('.achievement-description');

        if (icon) icon.textContent = egg.icon;
        if (description) description.textContent = egg.name;

        // Show notification
        notification.classList.remove('hidden');

        // Auto-hide after 4 seconds
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 4000);
    }

    getFoundCount() {
        let count = 0;
        this.eggs.forEach(egg => {
            if (egg.found) count++;
        });
        return count;
    }

    getTotalCount() {
        return this.eggs.size;
    }

    getProgress() {
        const found = this.getFoundCount();
        const total = this.getTotalCount();
        const percentage = Math.floor((found / total) * 100);

        return {
            found,
            total,
            percentage
        };
    }

    getAllEggs() {
        const result = [];
        this.eggs.forEach((egg, id) => {
            result.push({
                id,
                ...egg
            });
        });
        return result;
    }

    setupEventListeners() {
        // Listen for visitor milestones
        window.addEventListener('visitor-milestone', (e) => {
            const count = e.detail.count;

            if (count === 100) this.discover('milestone-100');
            else if (count === 500) this.discover('milestone-500');
            else if (count === 1000) this.discover('milestone-1000');
            else if (count === 1337) this.discover('milestone-1337');
        });
    }

    reset() {
        this.eggs.forEach(egg => {
            egg.found = false;
        });
        localStorage.removeItem('easter_eggs_found');
        console.log('Easter egg progress reset!');
    }
}
