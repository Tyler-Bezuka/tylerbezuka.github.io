/* ═══════════════════════════════════════════════════════════
   🎮 TYLER BEZUKA - MAIN GAME LOOP
   ═══════════════════════════════════════════════════════════
   Core initialization and event handling
   ═══════════════════════════════════════════════════════════ */

import { BootSequence } from './boot-sequence.js';
import { VisitorCounter } from './visitor-counter.js';
import { CountdownTimer } from './countdown.js';
import { EasterEggManager } from './easter-eggs.js';
import { KonamiCode } from './konami.js';
import { initConsoleCommands } from './console-commands.js';
import { ParticleSystem } from './particle-effects.js';

// Global state
const GameState = {
    initialized: false,
    easterEggManager: null,
    particleSystem: null,
    credits: 99
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('%c🎮 TYLERBEZUKA.COM LOADING...', 'color: #06FFA5; font-size: 20px; font-weight: bold;');

    await init();
});

// Main initialization function
async function init() {
    try {
        // 1. Boot Sequence
        const bootSequence = new BootSequence();
        await bootSequence.start();

        // 2. Initialize core features
        initVisitorCounter();
        initCountdown();
        initParticleSystem();

        // 3. Initialize easter egg system
        GameState.easterEggManager = new EasterEggManager();

        // 4. Setup Konami code
        initKonamiCode();

        // 5. Initialize console commands
        initConsoleCommands(GameState.easterEggManager);

        // 6. Setup interactive elements
        initializeEventListeners();

        // 7. Check for URL parameters (easter eggs)
        checkURLParameters();

        // 8. Check for special conditions
        checkSpecialConditions();

        // 9. Setup long-press and complex interactions
        initComplexInteractions();

        // 10. Mobile shake detection
        initShakeDetection();

        GameState.initialized = true;
        console.log('%c✅ SYSTEM READY - PRESS START', 'color: #FFD23F; font-size: 16px;');

    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// Initialize visitor counter
function initVisitorCounter() {
    const counter = new VisitorCounter('visitor-count');
    counter.display();
}

// Initialize countdown timer
function initCountdown() {
    const countdown = new CountdownTimer('2026-01-01T00:00:00');
    countdown.start();
}

// Initialize particle system
function initParticleSystem() {
    GameState.particleSystem = new ParticleSystem('particle-container');

    // Spawn particles on clicks
    document.addEventListener('click', (e) => {
        GameState.particleSystem.spawn(e.clientX, e.clientY);
    });
}

// Initialize Konami code
function initKonamiCode() {
    new KonamiCode(() => {
        GameState.easterEggManager.discover('konami');
        // Redirect after short delay for effect
        setTimeout(() => {
            window.location.href = '/secrets/konami.html';
        }, 1500);
    });
}

// Setup all event listeners
function initializeEventListeners() {
    // Arcade buttons
    const buttons = document.querySelectorAll('.arcade-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', handleButtonClick);
    });

    // INSERT COIN button
    const insertCoin = document.getElementById('insert-coin');
    if (insertCoin) {
        let coinCount = 0;
        insertCoin.addEventListener('click', () => {
            coinCount++;
            GameState.credits++;
            updateCreditsDisplay();

            // Easter egg: After 10 coins
            if (coinCount === 10) {
                GameState.easterEggManager.discover('insert-coin-10');
            }

            // Animation
            insertCoin.classList.add('coin-spin');
            setTimeout(() => insertCoin.classList.remove('coin-spin'), 1000);
        });
    }

    // Hidden pixel easter egg
    const secretPixel = document.getElementById('secret-pixel');
    if (secretPixel) {
        secretPixel.addEventListener('click', () => {
            GameState.easterEggManager.discover('hidden-pixel');
        });
    }

    // Triple-click title easter egg
    initTripleClickTitle();

    // Idle detection
    initIdleDetection();
}

// Handle arcade button clicks
function handleButtonClick(event) {
    const action = event.currentTarget.dataset.action;

    switch (action) {
        case 'github':
            window.open('https://github.com/Tyler-Bezuka/', '_blank', 'noopener,noreferrer');
            break;

        case 'contact':
            scrollToContact();
            break;

        case 'secret':
            handleSecretButton();
            break;

        default:
            console.log('Unknown action:', action);
    }
}

// Scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle secret button
function handleSecretButton() {
    const secretButton = document.querySelector('.secret-btn');
    const mysteryContact = document.getElementById('mystery-contact');

    // Easter egg: Clicking secret button reveals a hint
    GameState.easterEggManager.discover('secret-button-click');

    // Change button text as hint
    const btnLabel = secretButton.querySelector('.btn-label');
    const hints = [
        '[?] TRY THE KONAMI CODE',
        '[?] CHECK THE CONSOLE',
        '[?] VISIT AT MIDNIGHT',
        '[?] TRIPLE-CLICK TITLE',
        '[?] ???'
    ];

    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    btnLabel.textContent = randomHint;

    setTimeout(() => {
        btnLabel.textContent = '[?] ???';
    }, 3000);
}

// Triple-click title easter egg
function initTripleClickTitle() {
    const title = document.querySelector('.pixel-title');
    if (!title) return;

    let clickCount = 0;
    let clickTimer;

    title.addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimer);

        if (clickCount === 3) {
            // Triple click detected!
            GameState.easterEggManager.discover('triple-click');

            // Glitch effect
            title.classList.add('glitch');
            document.body.classList.add('shake');

            // Rainbow animation
            title.classList.add('rainbow-text');

            setTimeout(() => {
                title.classList.remove('glitch');
                document.body.classList.remove('shake');
            }, 500);

            setTimeout(() => {
                title.classList.remove('rainbow-text');
            }, 5000);

            clickCount = 0;
        } else {
            clickTimer = setTimeout(() => clickCount = 0, 500);
        }
    });
}

// Long-press detection
function initComplexInteractions() {
    const title = document.querySelector('.pixel-title');
    const counter = document.getElementById('visitor-count');

    // Long-press on title (3 seconds)
    let titlePressTimer;
    title.addEventListener('mousedown', () => {
        titlePressTimer = setTimeout(() => {
            GameState.easterEggManager.discover('long-press-title');
        }, 3000);
    });

    title.addEventListener('mouseup', () => {
        clearTimeout(titlePressTimer);
    });

    title.addEventListener('touchstart', () => {
        titlePressTimer = setTimeout(() => {
            GameState.easterEggManager.discover('long-press-title');
        }, 3000);
    });

    title.addEventListener('touchend', () => {
        clearTimeout(titlePressTimer);
    });

    // Long-press on visitor counter
    let counterPressTimer;
    counter.addEventListener('mousedown', () => {
        counterPressTimer = setTimeout(() => {
            GameState.easterEggManager.discover('long-press-counter');
        }, 3000);
    });

    counter.addEventListener('mouseup', () => {
        clearTimeout(counterPressTimer);
    });
}

// Check URL parameters for easter eggs
function checkURLParameters() {
    const params = new URLSearchParams(window.location.search);

    // ?debug=true
    if (params.get('debug') === 'true') {
        document.body.classList.add('debug-mode');
        GameState.easterEggManager.discover('debug-mode');
    }

    // ?retro=gb (Game Boy mode)
    if (params.get('retro') === 'gb') {
        document.body.classList.add('retro-gb');
        GameState.easterEggManager.discover('gameboy-mode');
    }

    // ?retro=arcade
    if (params.get('retro') === 'arcade') {
        GameState.easterEggManager.discover('arcade-mode');
    }

    // ?developer=1
    if (params.get('developer') === '1') {
        GameState.easterEggManager.discover('developer-mode');
        showDeveloperInfo();
    }
}

// Check for special conditions (time-based, etc.)
function checkSpecialConditions() {
    const now = new Date();

    // Midnight mode
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        document.body.classList.add('midnight-mode');
        GameState.easterEggManager.discover('midnight');
    }

    // Check again in 1 minute
    setTimeout(checkSpecialConditions, 60000);
}

// Idle detection (2 minutes)
function initIdleDetection() {
    let idleTimer;
    let isIdle = false;

    const resetIdleTimer = () => {
        clearTimeout(idleTimer);
        isIdle = false;

        idleTimer = setTimeout(() => {
            if (!isIdle) {
                isIdle = true;
                activateDemoMode();
                GameState.easterEggManager.discover('idle-demo');
            }
        }, 120000); // 2 minutes
    };

    // Reset on any interaction
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetIdleTimer, true);
    });

    resetIdleTimer();
}

// Demo mode (automated tour)
function activateDemoMode() {
    console.log('%c🎮 DEMO MODE ACTIVATED', 'color: #FFD23F; font-size: 16px;');

    const subtitle = document.getElementById('insert-coin');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '-- DEMO MODE -- PRESS ANY KEY';
        subtitle.style.color = '#EF233C';

        // Exit demo mode on any interaction
        const exitDemo = () => {
            subtitle.textContent = originalText;
            subtitle.style.color = '';
            document.removeEventListener('keydown', exitDemo);
            document.removeEventListener('click', exitDemo);
        };

        document.addEventListener('keydown', exitDemo, { once: true });
        document.addEventListener('click', exitDemo, { once: true });
    }
}

// Mobile shake detection
function initShakeDetection() {
    if (!window.DeviceMotionEvent) return;

    let lastX, lastY, lastZ;
    let shakeThreshold = 20;

    window.addEventListener('devicemotion', (event) => {
        const acc = event.accelerationIncludingGravity;
        const x = acc.x;
        const y = acc.y;
        const z = acc.z;

        if (lastX !== undefined) {
            const deltaX = Math.abs(x - lastX);
            const deltaY = Math.abs(y - lastY);
            const deltaZ = Math.abs(z - lastZ);

            if (deltaX + deltaY + deltaZ > shakeThreshold) {
                handleShake();
            }
        }

        lastX = x;
        lastY = y;
        lastZ = z;
    });
}

// Handle device shake
function handleShake() {
    GameState.easterEggManager.discover('shake');

    // Screen shake effect
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);

    // Show calibration message
    const subtitle = document.getElementById('insert-coin');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '>>> SCREEN CALIBRATION IN PROGRESS <<<';

        setTimeout(() => {
            subtitle.textContent = originalText;
        }, 2000);
    }
}

// Update credits display
function updateCreditsDisplay() {
    const creditsDisplay = document.getElementById('credits');
    if (creditsDisplay) {
        creditsDisplay.textContent = String(GameState.credits).padStart(2, '0');
    }
}

// Show developer info
function showDeveloperInfo() {
    console.table({
        'Developer': 'Tyler Bezuka',
        'GitHub': 'https://github.com/Tyler-Bezuka/',
        'Version': '1.0.0',
        'Easter Eggs Found': GameState.easterEggManager.getFoundCount(),
        'Total Easter Eggs': GameState.easterEggManager.getTotalCount()
    });
}

// Periodic CRT static effect (every 30-60 seconds)
setInterval(() => {
    if (Math.random() > 0.5) {
        showCRTStatic();
    }
}, Math.random() * 30000 + 30000);

// Show brief CRT static
function showCRTStatic() {
    const static = document.createElement('div');
    static.className = 'crt-static';
    document.body.appendChild(static);

    setTimeout(() => {
        static.remove();
    }, 300);
}

// Export for console access
window.GameState = GameState;

console.log('%c💡 HINT: Type help() in the console for secret commands!', 'color: #FFD23F; font-size: 14px;');
