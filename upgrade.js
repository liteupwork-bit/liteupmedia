const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Add cursor and floating orbs to the body
const bodyStart = '<body>';
const bodyStartReplacement = \<body>
    <!-- Custom Cursor -->
    <div class="cursor-dot" data-cursor-dot></div>
    <div class="cursor-outline" data-cursor-outline></div>

    <!-- Floating Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>\;
    html = html.replace(bodyStart, bodyStartReplacement);

    // Update Services Header to Infinite Marquee
    const servicesHeader = \<div class="section-header center" data-aos="fade-up">
        <h2>What We Have to Offer</h2>
        <p>Comprehensive solutions tailored to elevate your brand.</p>
    </div>\;
    const marqueeHtml = \<div class="marquee-container" data-aos="fade-up">
        <div class="marquee-content">
            <span>STRATEGY &bull; DESIGN &bull; MARKETING &bull; GROWTH &bull; </span>
            <span>STRATEGY &bull; DESIGN &bull; MARKETING &bull; GROWTH &bull; </span>
            <span>STRATEGY &bull; DESIGN &bull; MARKETING &bull; GROWTH &bull; </span>
            <span>STRATEGY &bull; DESIGN &bull; MARKETING &bull; GROWTH &bull; </span>
        </div>
    </div>\;
    html = html.replace(servicesHeader, marqueeHtml);

    // Add class for animated typography to hero h1
    html = html.replace('<h1>Lighting Up <br> Your Brand With Strategy.</h1>', '<h1 class="split-text">Lighting Up <br> Your Brand With Strategy.</h1>');

    fs.writeFileSync('index.html', html, 'utf8');


    // 2. Update style.css
    let css = fs.readFileSync('css/style.css', 'utf8');

    // Add Glassmorphism to Service Cards
    css = css.replace(/\\.service-card \\{[\\s\\S]*?transition: var\\(--transition\\);\\n\\}/,
    \.service-card {
        background - color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 2.5rem 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: var(--transition);
}\);

    // Add Glassmorphism to Contact wrapper
    css = css.replace(/\\.form-wrapper \\{[\\s\\S]*?box-shadow: 0 10px 40px rgba\\(0, 0, 0, 0.08\\);\\n\\}/,
    \.form-wrapper {
        background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}\);

    // Append new styles
    const newStyles = \
    /* --- PREMIUM UI UPGRADES --- */

    /* 1. Custom Cursor */
    body {
        cursor: none;
}
    a, button, input, textarea, select {
        cursor: none;
}
    .cursor-dot, .cursor-outline {
        position: fixed;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 9999;
    pointer-events: none;
}
    .cursor-dot {
        width: 6px;
    height: 6px;
    background-color: var(--color-gold);
}
    .cursor-outline {
        width: 40px;
    height: 40px;
    border: 1px solid rgba(254, 204, 27, 0.5);
    transition: width 0.2s, height 0.2s, background-color 0.2s;
}
    .cursor-outline.hover-state {
        width: 60px;
    height: 60px;
    background-color: rgba(254, 204, 27, 0.1);
    border-color: rgba(254, 204, 27, 0.8);
}

    /* 2. Floating Parallax Orbs */
    .orb {
        position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: -2;
    opacity: 0.4;
    animation: float 10s ease-in-out infinite alternate;
}
    .orb-1 {
        width: 400px;
    height: 400px;
    background: #fecc1b;
    top: 10%;
    left: -10%;
}
    .orb-2 {
        width: 300px;
    height: 300px;
    background: #fedb57;
    top: 40%;
    right: -5%;
    animation-delay: -3s;
    animation-duration: 14s;
}
    .orb-3 {
        width: 500px;
    height: 500px;
    background: rgba(254, 204, 27, 0.2);
    bottom: -10%;
    left: 20%;
    animation-delay: -7s;
    animation-duration: 18s;
}
    @keyframes float {
        0 % { transform: translateY(0) scale(1); }
    100% {transform: translateY(-50px) scale(1.1); }
}

    /* 3. Infinite Marquee */
    .marquee-container {
        width: 100vw;
    margin-left: calc(-50vw + 50%);
    overflow: hidden;
    background-color: transparent;
    padding: 3rem 0;
    margin-bottom: 4rem;
    position: relative;
    border-top: 1px solid var(--color-charcoal-light);
    border-bottom: 1px solid var(--color-charcoal-light);
}
    .marquee-content {
        display: flex;
    white-space: nowrap;
    animation: marquee 20s linear infinite;
}
    .marquee-content span {
        font - size: 5rem;
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1px var(--color-text-muted);
    padding: 0 2rem;
    text-transform: uppercase;
    font-family: var(--font-main);
}
    @keyframes marquee {
        0 % { transform: translateX(0); }
    100% {transform: translateX(-50%); }
}

    /* 4. Animated Typography (Staggered Reveal) */
    .char {
        display: inline-block;
    opacity: 0;
    transform: translateY(30px);
    animation: revealChar 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards;
}
    @keyframes revealChar {
        to {
        opacity: 1;
    transform: translateY(0);
    }
}
    \;

    if (!css.includes('/* --- PREMIUM UI UPGRADES --- */')) {
        fs.writeFileSync('css/style.css', css + newStyles, 'utf8');
} else {
        fs.writeFileSync('css/style.css', css, 'utf8');
}


    // 3. Update main.js
    let js = fs.readFileSync('js/main.js', 'utf8');

    const newJs = \
    // --- PREMIUM UI LOGIC ---

    // 1. Custom Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if(cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = \\\$\\{posX\\}px\;
    cursorDot.style.top = \\\$\\{posY\\}px\;

    // Slight delay for the outline for a smooth trailing effect
    cursorOutline.animate({
        left: \\\$\\{posX\\}px\,
    top: \\\$\\{posY\\}px\
        }, {duration: 500, fill: "forwards" });
    });

    const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .work-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-state'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-state'));
    });
}

    // 2. Animated Typography (Text Splitter)
    const splitTextElements = document.querySelectorAll('.split-text');
splitTextElements.forEach(el => {
    // Basic inner HTML text split, ignoring <br> for simplicity (replacing with word spans)
    const originalHTML = el.innerHTML;
        const words = originalHTML.split(/(<br>|\\s+)/);

            let newHTML = '';
            let delay = 0;
    
    words.forEach(word => {
        if(word === '<br>') {
                newHTML += '<br>';
        } else if(word.trim() !== '') {
                    let charString = '';
                for(let i=0; i<word.length; i++) {
                    charString += \<span class="char" style="animation-delay: \\$\\{delay\\}s">\\$\\{word[i]\\}</span>\;
                delay += 0.03;
            }
                newHTML += \<span class="word" style="display:inline-block; white-space:pre;">\\$\\{charString\\} </span>\;
        }
    });
                el.innerHTML = newHTML;
});

// Parallax scrolling effect on Orbs
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
                const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
                orb.style.transform = \	ranslateY(\\$\\{scrolled * speed\\}px)\;
    });
});
                \;

                if (!js.includes('// --- PREMIUM UI LOGIC ---')) {
                    js = js.replace('}); // End DOMContentLoaded', newJs + '\\n}); // End DOMContentLoaded');
                fs.writeFileSync('js/main.js', js, 'utf8');
}

                console.log("Upgrades applied.");
