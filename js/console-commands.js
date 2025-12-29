/* ═══════════════════════════════════════════════════════════
   🖥️ BROWSER CONSOLE COMMANDS
   ═══════════════════════════════════════════════════════════
   Hidden developer console commands for easter eggs
   ═══════════════════════════════════════════════════════════ */

export function initConsoleCommands(easterEggManager) {
    // Cheat codes namespace
    window.cheat = {
        godmode: () => {
            console.log('%c🎮 GOD MODE ACTIVATED', 'color: #FFD23F; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #FFD23F;');

            // Unlock all easter eggs
            const eggs = easterEggManager.getAllEggs();
            eggs.forEach(egg => {
                easterEggManager.discover(egg.id);
            });

            console.log('%c✅ ALL EASTER EGGS UNLOCKED!', 'color: #06FFA5; font-size: 16px;');
        },

        listsecrets: () => {
            console.log('%c🔍 SECRET COMMANDS LIST', 'color: #FFD23F; font-size: 18px; font-weight: bold;');
            console.table({
                'Konami Code': '↑ ↑ ↓ ↓ ← → ← → B A',
                'Hidden Pixel': 'Click the center of the screen',
                'Triple Click': 'Triple-click the main title',
                'Midnight Mode': 'Visit at exactly 00:00',
                'Debug Mode': 'Add ?debug=true to URL',
                'Game Boy Mode': 'Add ?retro=gb to URL',
                'Long Press': 'Hold title or counter for 3 seconds',
                'Shake Device': 'Shake your phone/tablet',
                'Idle Mode': 'Don\'t interact for 2 minutes',
                'Console Commands': 'You\'re already using them!'
            });
        },

        reset: () => {
            if (confirm('Reset all easter egg progress? This cannot be undone!')) {
                easterEggManager.reset();
                console.log('%c🔄 PROGRESS RESET', 'color: #EF233C; font-size: 16px;');
            }
        },

        progress: () => {
            const progress = easterEggManager.getProgress();
            console.log(`%c📊 EASTER EGG PROGRESS: ${progress.found}/${progress.total} (${progress.percentage}%)`,
                       'color: #4CC9F0; font-size: 16px; font-weight: bold;');

            const eggs = easterEggManager.getAllEggs();
            const found = eggs.filter(egg => egg.found);
            const remaining = eggs.filter(egg => !egg.found);

            console.group('✅ Found Eggs');
            found.forEach(egg => {
                console.log(`${egg.icon} ${egg.name} - ${egg.description}`);
            });
            console.groupEnd();

            console.group('❓ Remaining Eggs');
            remaining.forEach(egg => {
                console.log(`🔒 ${egg.name} - ???`);
            });
            console.groupEnd();
        }
    };

    // Game namespace
    window.game = {
        credits: () => {
            window.location.href = '/secrets/credits.html';
        },

        highscores: () => {
            window.location.href = '/secrets/highscores.html';
        },

        terminal: () => {
            window.location.href = '/secrets/terminal.html';
        },

        konami: () => {
            window.location.href = '/secrets/konami.html';
        },

        info: () => {
            console.table({
                'Name': 'Tyler Bezuka',
                'GitHub': 'https://github.com/Tyler-Bezuka/',
                'Website': 'tylerbezuka.com',
                'Version': '1.0.0',
                'Theme': 'Retro Gaming Console',
                'Easter Eggs': `${easterEggManager.getFoundCount()}/${easterEggManager.getTotalCount()} found`
            });
        }
    };

    // Secret namespace
    window.secret = {
        unlock: (code) => {
            const secrets = {
                '1337': () => {
                    console.log('%c🏆 LEET HACKER', 'color: #FFD23F; font-size: 20px;');
                    easterEggManager.discover('milestone-1337');
                },
                'konami': () => {
                    window.location.href = '/secrets/konami.html';
                },
                'matrix': () => {
                    console.log('%c🟢 FOLLOW THE WHITE RABBIT', 'color: #00ff00; font-family: monospace;');
                    activateMatrixMode();
                }
            };

            if (secrets[code]) {
                secrets[code]();
            } else {
                console.log('%c❌ INVALID CODE', 'color: #EF233C;');
            }
        },

        hint: () => {
            const hints = [
                'The Konami code is older than the internet...',
                'Try clicking in unexpected places',
                'Some secrets only appear at certain times...',
                'The URL can hide more than just the page',
                'Not all easter eggs are visible on screen',
                'Sometimes doing nothing is the best strategy',
                'Mobile users have exclusive secrets too',
                'The source code tells many tales...',
                'Patience is a virtue, especially when pressing',
                'What happens if you visit at midnight?'
            ];

            const randomHint = hints[Math.floor(Math.random() * hints.length)];
            console.log(`%c💡 HINT: ${randomHint}`, 'color: #FFD23F; font-style: italic;');
        }
    };

    // Help function
    window.help = () => {
        console.log(`
%c╔════════════════════════════════════════════════════════════╗
║  🎮 TYLERBEZUKA.COM - SECRET CONSOLE COMMANDS 🎮            ║
╚════════════════════════════════════════════════════════════╝

%c📚 CHEAT CODES:
%c  cheat.godmode()      %c→ Unlock all easter eggs
%c  cheat.listsecrets()  %c→ Show all secret hints
%c  cheat.progress()     %c→ View your progress
%c  cheat.reset()        %c→ Reset all progress

%c🎯 GAME COMMANDS:
%c  game.credits()       %c→ View credits page
%c  game.highscores()    %c→ View high scores
%c  game.terminal()      %c→ Open secret terminal
%c  game.konami()        %c→ Konami reward page
%c  game.info()          %c→ Show site information

%c🔐 SECRET COMMANDS:
%c  secret.unlock(code)  %c→ Unlock with secret code
%c  secret.hint()        %c→ Get a random hint

%c💡 TIP: Type any command without () to see its code!

        `,
            'color: #06FFA5; font-family: monospace;',
            'color: #FFD23F; font-weight: bold;',
            'color: #06FFA5;', 'color: #666;',
            'color: #06FFA5;', 'color: #666;',
            'color: #06FFA5;', 'color: #666;',
            'color: #06FFA5;', 'color: #666;',
            'color: #4CC9F0; font-weight: bold;',
            'color: #4CC9F0;', 'color: #666;',
            'color: #4CC9F0;', 'color: #666;',
            'color: #4CC9F0;', 'color: #666;',
            'color: #4CC9F0;', 'color: #666;',
            'color: #4CC9F0;', 'color: #666;',
            'color: #7209B7; font-weight: bold;',
            'color: #7209B7;', 'color: #666;',
            'color: #7209B7;', 'color: #666;',
            'color: #FFD23F; font-style: italic;'
        );
    };

    // Automatically show hint when console opens
    console.log('%c👋 Hey there, developer! Type help() for secret commands.', 'color: #FFD23F; font-size: 14px; font-weight: bold;');

    // Easter egg: Log message after a delay
    setTimeout(() => {
        console.log('%c🎮 Still here? Try cheat.listsecrets() for hints!', 'color: #06FFA5; font-size: 12px;');
    }, 10000);
}

// Matrix mode easter egg
function activateMatrixMode() {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = Math.random() * window.innerWidth;
            const speed = Math.random() * 3 + 2;

            const el = document.createElement('div');
            el.textContent = char;
            el.className = 'matrix-char';
            el.style.left = x + 'px';
            el.style.animationDuration = speed + 's';
            document.body.appendChild(el);

            setTimeout(() => el.remove(), speed * 1000);
        }, i * 100);
    }
}
