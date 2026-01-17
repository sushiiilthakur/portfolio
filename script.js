// Matrix Background Animation
function initMatrixBackground() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    function draw() {
        ctx.fillStyle = 'rgba(20, 30, 40, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    const interval = setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    return interval;
}

// Terminal Typing Effect
function initTerminalTyping() {
    const terminalText = document.getElementById('terminal-text');
    const authForm = document.getElementById('auth-form');

    const messages = [
        '> WELCOME TO SUSHIL\'S PORTFOLIO',
        '> ETHICAL HACKER | FULL-STACK DEVELOPER',
        '> Click below to explore'
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let currentText = '';

    function typeText() {
        if (messageIndex < messages.length) {
            if (charIndex <= messages[messageIndex].length) {
                currentText = messages.slice(0, messageIndex).join('\n') +
                    (messageIndex > 0 ? '\n' : '') +
                    messages[messageIndex].substring(0, charIndex);
                terminalText.innerHTML = currentText + '<span class="cursor-blink">_</span>';
                charIndex++;
                setTimeout(typeText, 50);
            } else {
                messageIndex++;
                charIndex = 0;
                setTimeout(typeText, 50);
            }
        } else {
            // Show the auth form when typing is complete
            authForm.style.display = 'block';
        }
    }

    typeText();
}

// Authentication Logic
function initAuthentication() {
    const authModal = document.getElementById('auth-modal');
    const visitButton = document.getElementById('visit-button');

    visitButton.addEventListener('click', () => {
        // Hide modal with fade out animation
        authModal.style.animation = 'fadeOut 0.5s ease-out';

        setTimeout(() => {
            authModal.style.display = 'none';
            // Focus on portfolio content
            document.querySelector('.main-content').focus();
        }, 500);
    });
}

// Navigation Logic
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const sections = document.querySelectorAll('.content-section');

    function switchSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update nav items
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });

        // Update mobile nav items
        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });

        // Scroll to top on mobile
        if (window.innerWidth <= 1024) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Desktop navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            switchSection(sectionId);
        });
    });

    // Mobile navigation
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            switchSection(sectionId);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start matrix background
    initMatrixBackground();

    // Start terminal typing effect
    initTerminalTyping();

    // Initialize authentication
    initAuthentication();

    // Initialize navigation (for when portfolio loads)
    initNavigation();
});
