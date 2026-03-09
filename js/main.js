document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        overlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Basic Form Submission (prevent default and show success message)
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            heroForm.style.display = 'none';
            document.getElementById('heroFormSuccess').style.display = 'flex';
            heroForm.reset();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.style.display = 'none';
            document.getElementById('contactFormSuccess').style.display = 'flex';
            contactForm.reset();
        });
    }

    // Modal Logic
    const getStartedBtn = document.getElementById('getStartedBtn');
    const scheduleModal = document.getElementById('scheduleModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (getStartedBtn && scheduleModal) {
        getStartedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scheduleModal.classList.add('active');
        });
    }

    if (closeModalBtn && scheduleModal) {
        closeModalBtn.addEventListener('click', () => {
            scheduleModal.classList.remove('active');
        });
    }

    if (scheduleModal) {
        scheduleModal.addEventListener('click', (e) => {
            if (e.target === scheduleModal) {
                scheduleModal.classList.remove('active');
            }
        });
    }

    // Portfolio Data
    const portfolioData = [
        { type: 'image', src: 'assets/Works/Google ads/4.jpg', category: 'performance', tags: ['Paid Search', 'E-Commerce'] },
        { type: 'image', src: 'assets/Works/Google ads/5.jpg', category: 'performance', tags: ['Display Ads', 'Lead Gen'] },
        { type: 'image', src: 'assets/Works/Meta ads/1.jpg', category: 'performance', tags: ['Facebook Ads', 'E-Commerce'] },
        { type: 'image', src: 'assets/Works/Meta ads/2.jpg', category: 'performance', tags: ['Instagram Ads', 'Fashion'] },
        { type: 'image', src: 'assets/Works/Meta ads/3.jpg', category: 'performance', tags: ['Facebook Ads', 'Food & Beverages'] },
        { type: 'image', src: 'assets/Works/SMM/Indian Instagram Feed.jfif', category: 'smm', tags: ['Instagram', 'Grid Design'] },
        { type: 'image', src: 'assets/Works/SMM/Instagram Feed.jfif', category: 'smm', tags: ['Social Media', 'Content Creation'] },
        { type: 'image', src: 'assets/Works/SMM/Transform Your Digital Presence Using Skincare Content Inspiration.jfif', category: 'smm', tags: ['Skincare', 'Aesthetics'] },
        // UGC videos removed due to file size limitations - can be added via external hosting (YouTube, Vimeo, etc.)
        // { type: 'video', src: 'assets/Works/UGC ADS/creative hair color english.mp4', category: 'ugc', tags: ['Influencer', 'Haircare'] },
        // { type: 'video', src: 'assets/Works/UGC ADS/free products english.mp4', category: 'ugc', tags: ['TikTok Style', 'Review'] },
        // Mock Website Dev items as no images provided
        { type: 'image', src: 'assets/LOGO/Liteup Logo Transparent.png', category: 'web', tags: ['Corporate', 'Full Stack'] },
        { type: 'image', src: 'assets/LOGO/Liteup Logo Transparent.png', category: 'ugc', tags: ['UGC Content', 'Influencer Marketing'] }
    ];

    const workGrid = document.getElementById('workGrid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    function renderPortfolio(filterCategory, filterTag = 'all') {
        workGrid.innerHTML = '';
        workGrid.setAttribute('data-category', filterCategory);

        // Filter items
        let filteredItems = portfolioData.filter(item => item.category === filterCategory);
        if (filterTag !== 'all') {
            filteredItems = filteredItems.filter(item => item.tags.includes(filterTag));
        }

        filteredItems.forEach(item => {
            const el = document.createElement('div');
            el.className = 'work-item show';
            if (item.type === 'video') {
                el.innerHTML = `<video src="${item.src}" autoplay loop muted playsinline controls loading="lazy"></video>`;
            } else {
                el.innerHTML = `<img src="${item.src}" alt="Portfolio Work" loading="lazy">`;
            }
            workGrid.appendChild(el);
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-filter');
            renderPortfolio(cat);
        });
    });

    // Init Portfolio
    if (workGrid) {
        renderPortfolio('performance');
    }

    // See our works click handler
    const seeWorksBtns = document.querySelectorAll('.see-works-btn');
    seeWorksBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetCategory = btn.getAttribute('data-target');
            const targetTab = document.querySelector(`.tab-btn[data-filter="${targetCategory}"]`);
            if (targetTab) {
                targetTab.click();
            }
            const workSection = document.getElementById('work');
            if (workSection) {
                workSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Carousel Next/Prev logic
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    if (nextBtn && prevBtn && workGrid) {
        nextBtn.addEventListener('click', () => {
            workGrid.scrollBy({ left: 300, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            workGrid.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // Init Animation On Scroll
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, offset: 50, duration: 800 });
    }

    // --- PREMIUM UI LOGIC ---


    // 2. Animated Typography (Text Splitter)
    const splitTextElements = document.querySelectorAll('.split-text');
    splitTextElements.forEach(el => {
        // Basic inner HTML text split, ignoring <br> for simplicity (replacing with word spans)
        const originalHTML = el.innerHTML;
        const words = originalHTML.split(/(<br>|\s+)/);

        let newHTML = '';
        let delay = 0;

        words.forEach(word => {
            if (word === '<br>') {
                newHTML += '<br>';
            } else if (word.trim() !== '') {
                let charString = '';
                for (let i = 0; i < word.length; i++) {
                    charString += `<span class="char" style="animation-delay: ${delay}s">${word[i]}</span>`;
                    delay += 0.03;
                }
                newHTML += `<span class="word" style="display:inline-block; white-space:pre;">${charString} </span>`;
            }
        });
        el.innerHTML = newHTML;
    });

    // 3. Parallax scrolling effect on Orbs
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Lightbox Logic
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close Lightbox"><i class="ph ph-x"></i></button>
        <div class="lightbox-media-container" style="display:flex; justify-content:center; align-items:center; width:100%; height:100%;"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxContainer = lightbox.querySelector('.lightbox-media-container');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    if (workGrid) {
        workGrid.addEventListener('click', (e) => {
            const item = e.target.closest('img, video');
            if (item) {
                lightboxContainer.innerHTML = '';

                if (item.tagName === 'IMG') {
                    const img = document.createElement('img');
                    img.src = item.src;
                    img.className = 'lightbox-content';
                    lightboxContainer.appendChild(img);
                } else if (item.tagName === 'VIDEO') {
                    const video = document.createElement('video');
                    video.src = item.src;
                    video.className = 'lightbox-content';
                    video.controls = true;
                    video.autoplay = true;
                    lightboxContainer.appendChild(video);
                }

                lightbox.classList.add('active');
            }
        });
    }

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        const video = lightbox.querySelector('video');
        if (video) video.pause();
    };

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-media-container')) {
            closeLightbox();
        }
    });

    // --- NEW PREMIUM UI FEATURES ---

    // 1. Page Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500); // Small delay to let animations sync and ensure fonts load
        });
    }

    // 2. Magnetic Buttons
    const buttons = document.querySelectorAll('.btn, .tab-btn, .carousel-btn');
    buttons.forEach(btn => {
        btn.classList.add('magnetic');

        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 3. 3D Tilt Effect on Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.service-card'), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });

        // Use MutationObserver for dynamically added portfolio items
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.classList && node.classList.contains('work-item')) {
                            VanillaTilt.init(node, {
                                max: 10,
                                speed: 400,
                                scale: 1.02
                            });
                        }
                    });
                }
            });
        });

        if (workGrid) {
            observer.observe(workGrid, { childList: true });
        }
    }

    // 4. Page Transitions
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"]):not([href^="mailto:"]):not([href^="tel:"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href) {
                e.preventDefault();
                document.body.classList.add('page-transitioning');
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Match CSS transition duration
            }
        });
    });

});
