---
layout: base
permalink: /iGEM/wiki
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BioSolutions 2025 - DNHS iGEM</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow-x: hidden;
            background: #0a0a0a;
            color: #fff;
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 1.5rem 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s;
        }

        nav.scrolled {
            padding: 1rem 2rem;
            box-shadow: 0 5px 30px rgba(102, 126, 234, 0.2);
        }

        nav .container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .nav-links a {
            color: #fff;
            text-decoration: none;
            transition: all 0.3s;
            position: relative;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 8px;
        }

        .nav-links a:hover {
            color: #667eea;
            background: rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
        }

        /* Hero Section */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        }

        .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.6);
            border-radius: 50%;
            animation: float 15s infinite ease-in-out;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(50px);
                opacity: 0;
            }
        }

        .hero-content {
            text-align: center;
            z-index: 1;
            max-width: 900px;
            padding: 2rem;
        }

        .hero h1 {
            font-size: 5rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeInUp 1s ease-out;
            cursor: pointer;
            transition: all 0.3s;
        }

        .hero h1:hover {
            transform: scale(1.05);
            filter: brightness(1.2);
        }

        .hero .subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            color: #b8b8d1;
            animation: fadeInUp 1s ease-out 0.2s backwards;
        }

        .cta-button {
            display: inline-block;
            padding: 1rem 3rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            animation: fadeInUp 1s ease-out 0.6s backwards;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            position: relative;
            overflow: hidden;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .cta-button:hover::before {
            width: 300px;
            height: 300px;
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Statistics Section */
        .stats-section {
            padding: 6rem 2rem;
            background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);
        }

        .stats-container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 4rem 2rem;
            margin-bottom: 3rem;
            text-align: center;
            transition: all 0.5s;
            opacity: 0;
            transform: translateY(50px);
        }

        .stat-card.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .stat-card:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(102, 126, 234, 0.5);
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
        }

        .stat-number {
            font-size: 5rem;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
        }

        .stat-label {
            font-size: 1.3rem;
            color: #b8b8d1;
            margin-bottom: 1rem;
        }

        .stat-description {
            font-size: 1.1rem;
            color: #8e8ea9;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Interactive Slider Comparison */
        .compare-section {
            padding: 6rem 2rem;
            background: #0a0a0a;
        }

        .compare-container-wrapper {
            max-width: 1400px;
            margin: 0 auto;
        }

        .compare-title {
            font-size: 3rem;
            margin-bottom: 3rem;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .compare-container {
            position: relative;
            max-width: 900px;
            margin: 0 auto;
            height: 500px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .compare-side {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 2rem;
        }

        .compare-before {
            left: 0;
            background: linear-gradient(135deg, #2d1b3d 0%, #1a1a2e 100%);
            border-right: 3px solid #667eea;
        }

        .compare-after {
            right: 0;
            background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
        }

        .compare-label {
            font-size: 1.8rem;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 1rem;
        }

        .compare-text {
            color: #b8b8d1;
            text-align: center;
            font-size: 1.1rem;
        }

        .compare-placeholder {
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px dashed rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: #8e8ea9;
            text-align: center;
            padding: 1rem;
        }

        .slider-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            overflow: hidden;
            z-index: 2;
        }

        .slider-handle {
            position: absolute;
            top: 0;
            right: 0;
            width: 4px;
            height: 100%;
            background: #667eea;
            cursor: ew-resize;
        }

        .slider-button {
            position: absolute;
            top: 50%;
            right: -20px;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            background: #667eea;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.5);
        }

        .slider-instruction {
            text-align: center;
            margin-top: 1.5rem;
            color: #667eea;
            font-size: 1rem;
            font-weight: 600;
        }

        /* Project Overview */
        .overview-section {
            padding: 6rem 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .section-title {
            font-size: 3rem;
            margin-bottom: 3rem;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .overview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .overview-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2.5rem;
            transition: all 0.5s;
            opacity: 0;
            transform: translateY(50px);
            position: relative;
            overflow: hidden;
        }

        .overview-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            opacity: 0;
            transition: opacity 0.5s;
        }

        .overview-card:hover::before {
            opacity: 1;
        }

        .overview-card.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .overview-card:hover {
            transform: translateY(-10px) scale(1.02);
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(102, 126, 234, 0.5);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }

        .overview-card h3 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: #667eea;
            position: relative;
            z-index: 1;
        }

        .overview-card p {
            color: #b8b8d1;
            line-height: 1.8;
            position: relative;
            z-index: 1;
        }

        /* Video Section */
        .video-section {
            padding: 6rem 2rem;
            background: linear-gradient(180deg, #1a1a2e 0%, #0a0a0a 100%);
        }

        .video-container-wrapper {
            max-width: 1400px;
            margin: 0 auto;
        }

        .video-container {
            max-width: 900px;
            margin: 2rem auto;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .video-placeholder {
            width: 100%;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 1rem;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        }

        .video-placeholder-icon {
            font-size: 5rem;
        }

        .video-placeholder-text {
            font-size: 1.2rem;
            color: #b8b8d1;
        }

        .video-link {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.8rem 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }

        .video-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
        }

        /* Footer */
        footer {
            background: rgba(10, 10, 10, 0.95);
            padding: 3rem 2rem;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        footer p {
            color: #8e8ea9;
        }

        .scroll-indicator {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            animation: bounce 2s infinite;
            font-size: 2rem;
            color: #667eea;
            cursor: pointer;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
            40% { transform: translateX(-50%) translateY(-20px); }
            60% { transform: translateX(-50%) translateY(-10px); }
        }

        @media (max-width: 768px) {
            .hero h1 { font-size: 3rem; }
            .stat-number { font-size: 3rem; }
            .compare-container { height: 400px; }
            .nav-links { 
                gap: 1rem;
                font-size: 0.85rem;
            }
            .nav-links a {
                padding: 0.4rem 0.8rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav id="navbar">
        <div class="container">
            <div class="logo">DNHS iGEM 2025</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#stats">Statistics</a></li>
                <li><a href="#solution">Solution</a></li>
                <li><a href="#project">Project</a></li>
                <li><a href="#video">Video</a></li>
                <li><a href="https://2025.igem.wiki/dnhs-sandiego-ca/description" target="_blank">Description</a></li>
                <li><a href="https://2025.igem.wiki/dnhs-sandiego-ca/members" target="_blank">Team</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="particles" id="particles"></div>
        <div class="hero-content">
            <h1>BioSolutions 2025</h1>
            <p class="subtitle">Del Norte High School, San Diego</p>
            <a href="#stats" class="cta-button">Discover Our Impact</a>
        </div>
        <div class="scroll-indicator" onclick="document.getElementById('stats').scrollIntoView({behavior: 'smooth'})">↓</div>
    </section>

    <!-- Statistics Section -->
    <section class="stats-section" id="stats">
        <div class="stats-container">
            <div class="stat-card" data-animate="true">
                <div class="stat-number">
                    <span class="counter" data-target="90">0</span>
                </div>
                <div class="stat-label">minutes between diagnoses</div>
                <div class="stat-description">Every 90 minutes, someone is diagnosed with our target condition. Early detection could save countless lives.</div>
            </div>

            <div class="stat-card" data-animate="true">
                <div class="stat-number">
                    <span class="counter" data-target="70">0</span>%
                </div>
                <div class="stat-label">predicted increase by 2040</div>
                <div class="stat-description">Without intervention, cases are expected to rise dramatically over the next 15 years.</div>
            </div>

            <div class="stat-card" data-animate="true">
                <div class="stat-number">
                    <span class="counter" data-target="95">0</span>%
                </div>
                <div class="stat-label">cost reduction in detection</div>
                <div class="stat-description">Our biosensor reduces testing costs by 95%, making early detection accessible to all communities.</div>
            </div>
        </div>
    </section>

    <!-- Interactive Slider Comparison -->
    <section class="compare-section" id="solution">
        <div class="compare-container-wrapper">
            <h2 class="compare-title">Our Solution in Action</h2>
            
            <div class="compare-container">
                <div class="compare-side compare-after">
                    <div class="compare-label">AFTER TREATMENT</div>
                    <div class="compare-placeholder">ADD PICTURE HERE</div>
                    <div class="compare-text">Normal Cell Function</div>
                </div>
                
                <div class="slider-wrapper" id="sliderWrapper">
                    <div class="compare-side compare-before">
                        <div class="compare-label">BEFORE TREATMENT</div>
                        <div class="compare-placeholder">ADD PICTURE HERE</div>
                        <div class="compare-text">Protein Aggregation</div>
                    </div>
                    <div class="slider-handle" id="sliderHandle">
                        <div class="slider-button">⇄</div>
                    </div>
                </div>
            </div>
            
            <div class="slider-instruction">← Drag the slider to compare →</div>
        </div>
    </section>

    <!-- Project Overview -->
    <section class="overview-section" id="project">
        <h2 class="section-title">Project Overview</h2>
        <div class="overview-grid">
            <div class="overview-card" data-animate="true">
                <h3>🎯 The Challenge</h3>
                <p>Current detection methods are slow, expensive, and inaccessible to most communities. We're developing rapid, affordable biosensors that can be deployed anywhere, anytime.</p>
            </div>
            <div class="overview-card" data-animate="true">
                <h3>🔬 Our Approach</h3>
                <p>Using synthetic biology, we've engineered novel biosensors that combine RNA aptamers with antisense oligonucleotides for targeted detection and intervention.</p>
            </div>
            <div class="overview-card" data-animate="true">
                <h3>🌟 The Impact</h3>
                <p>Our dual-approach system enables early detection and therapeutic intervention, potentially extending patient life expectancy and improving quality of life.</p>
            </div>
        </div>
    </section>

    <!-- Promo Video Section -->
    <section class="video-section" id="video">
        <div class="video-container-wrapper">
            <h2 class="section-title">Watch Our Promotional Video!</h2>
            <div class="video-container">
                <div class="video-placeholder">
                    <div class="video-placeholder-icon">🎬</div>
                    <div class="video-placeholder-text">Insert your promotional video embed code here</div>
                    <div class="video-placeholder-text" style="font-size: 0.9rem; color: #8e8ea9;">(Replace this div with your YouTube/Vimeo embed iframe)</div>
                    <a href="YOUR_YOUTUBE_LINK_HERE" class="video-link" target="_blank">Watch on YouTube</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 Del Norte High School iGEM Team | San Diego, California</p>
        <p style="margin-top: 1rem; color: #667eea;">delnorteigem@gmail.com</p>
    </footer>

    <script>
        // Create floating particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Counter animation
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate counters when stat cards become visible
                    if (entry.target.classList.contains('stat-card')) {
                        const counter = entry.target.querySelector('.counter');
                        if (counter && !counter.classList.contains('counted')) {
                            counter.classList.add('counted');
                            animateCounter(counter);
                        }
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('[data-animate="true"]').forEach(el => {
            observer.observe(el);
        });

        // Image comparison slider
        const sliderWrapper = document.getElementById('sliderWrapper');
        const sliderHandle = document.getElementById('sliderHandle');
        let isDragging = false;

        sliderHandle.addEventListener('mousedown', () => {
            isDragging = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const container = sliderWrapper.parentElement;
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            
            if (percentage >= 0 && percentage <= 100) {
                sliderWrapper.style.width = percentage + '%';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', () => {
            isDragging = true;
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const container = sliderWrapper.parentElement;
            const rect = container.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            
            if (percentage >= 0 && percentage <= 100) {
                sliderWrapper.style.width = percentage + '%';
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Add subtle parallax effect to hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-content');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - (scrolled / 700);
            }
        });
    </script>
</body>
</html>