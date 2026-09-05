document.addEventListener('DOMContentLoaded', () => {
    // 0. Render Reusable Full Homepage Footer Component across all pages
    const fullFooterHTML = `
        <div class="container">
            <div class="footer-grid">
                <div>
                    <a href="/" class="logo-brand" style="margin-bottom: 1rem;">
                        <img src="/assets/logo.jpg" alt="Tech Mithilanchal" class="logo-img" style="height: 44px;">
                        <div class="logo-text-box">
                            <div class="logo-title" style="font-size: 1.2rem;">Tech <span>Mithilanchal</span></div>
                            <div class="logo-tagline" style="font-size: 0.62rem;">Building Ideas • Creating Solutions</div>
                        </div>
                    </a>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-top: 1rem;">
                        Next-generation IT, AI & Digital Marketing Studio. We engineer high-performance Websites, Mobile Apps, AI Chatbots, AI Agents, Technical SEO, Digital Marketing, and Performance Ad Campaigns.
                    </p>
                </div>
                
                <div>
                    <h4 class="footer-col-title">Our Services</h4>
                    <div class="footer-links">
                        <a href="/services/website-development/">Website Development</a>
                        <a href="/services/app-development/">Mobile App Development</a>
                        <a href="/services/ai-chatbots/">AI Chatbots</a>
                        <a href="/services/ai-agents/">AI Agents</a>
                        <a href="/services/autonomous-systems/">Autonomous Systems</a>
                        <a href="/services/digital-marketing/">Digital Marketing</a>
                        <a href="/services/seo/">Technical SEO</a>
                        <a href="/services/performance-marketing/">Performance Marketing</a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-col-title">Quick Links</h4>
                    <div class="footer-links">
                        <a href="/">Home</a>
                        <a href="/services/">All Services</a>
                        <a href="/demo/">AI Lab & Demo</a>
                        <a href="/about-us/">About Us</a>
                        <a href="/contact/">Contact Us</a>
                    </div>
                </div>

                <div>
                    <h4 class="footer-col-title">Contact Us</h4>
                    <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 0.75rem; color: var(--text-secondary);">
                        <strong>Email:</strong> contact@techmithilanchal.com<br>
                        <strong>Working Hours:</strong> Mon - Sat (9 AM - 7 PM)<br>
                        <strong>Turnaround:</strong> Within 24 Hours
                    </p>
                    <a href="/contact/" class="btn btn-secondary" style="padding: 0.55rem 1.1rem; font-size: 0.88rem;">Request Quote 🚀</a>
                </div>
            </div>

            <div class="footer-bottom">
                <div>&copy; 2026 Tech Mithilanchal. All rights reserved. Building Ideas • Creating Solutions.</div>
                <div>Designed with Mithila Art & Tech Excellence</div>
            </div>
        </div>
    `;

    const footerElem = document.querySelector('footer.footer');
    if (footerElem) {
        footerElem.innerHTML = fullFooterHTML;
    }

    // 1. Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle-btn');
    const navMenu = document.getElementById('nav-menu-list');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 2. Active Link Highlight
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === '/' || linkPath === '') {
            if (currentPath === '/' || currentPath === '' || currentPath === '/index.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } else {
            const linkFolder = linkPath.replace(/^\/|\/$/g, '');
            if (currentPath.includes(linkFolder)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });

    // 3. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-hidden');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 4. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Contact Form Submission
    const contactForm = document.getElementById('tech-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Processing Inquiry...</span>`;
            submitBtn.style.opacity = '0.7';
            
            const formData = new FormData(contactForm);
            
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                contactForm.innerHTML = `
                    <div style="text-align: center; padding: 3rem 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; align-items: center; justify-content: center;">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(37, 128, 69, 0.15); border: 2px solid #15803D; display: flex; align-items: center; justify-content: center; color: #15803D; font-size: 2rem; box-shadow: 0 0 20px rgba(37, 128, 69, 0.3);">
                            ✓
                        </div>
                        <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--color-crimson);">Inquiry Submitted Successfully!</h3>
                        <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto; line-height: 1.6;">
                            Thank you for reaching out to Tech Mithilanchal. Our lead engineer will contact you within 24 hours to discuss your project requirements.
                        </p>
                        <button onclick="window.location.reload()" class="btn btn-secondary" style="margin-top: 1rem; padding: 0.6rem 1.5rem; font-size: 0.9rem;">Submit Another Inquiry</button>
                    </div>
                `;
            })
            .catch(error => {
                console.error("Form submission failed:", error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.opacity = '1';
                alert("Submission failed. Please email us directly at contact@techmithilanchal.com");
            });
        });
    }

    // 6. Interactive AI Lab Sandbox Simulation Logic
    const runDemoBtn = document.getElementById('run-demo-btn');
    const demoInput = document.getElementById('demo-query');
    const sampleQueryBtns = document.querySelectorAll('.sample-query-btn');

    if (sampleQueryBtns.length > 0 && demoInput) {
        sampleQueryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                demoInput.value = btn.getAttribute('data-query');
            });
        });
    }
    
    if (runDemoBtn && demoInput) {
        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');
        const step3 = document.getElementById('step-3');
        const step4 = document.getElementById('step-4');
        const pipelineSteps = [step1, step2, step3, step4];
        const demoOutput = document.getElementById('demo-output-text');
        
        const runSimulation = () => {
            const queryText = demoInput.value.trim();
            if (!queryText) {
                demoInput.placeholder = "Please enter a prompt first!";
                demoInput.focus();
                return;
            }
            
            runDemoBtn.disabled = true;
            demoInput.disabled = true;
            runDemoBtn.style.opacity = '0.6';
            
            pipelineSteps.forEach(step => step && step.classList.remove('active'));
            demoOutput.innerHTML = `<span style="color: var(--color-crimson); font-style: italic; font-weight: 700;">⚡ Executing multi-agent pipeline...</span>`;
            
            let mockAnswer = "Tech Mithilanchal's digital engine processed your request across our enterprise database nodes.";
            const queryLower = queryText.toLowerCase();
            
            if (queryLower.includes('chat') || queryLower.includes('bot')) {
                mockAnswer = "✦ Tech Mithilanchal AI Chatbots: Engineered with zero-hallucination guardrails, embedding your corporate handbooks and support FAQs. Integrates directly into WhatsApp, Slack, Zendesk, and Web platforms with 24/7 autonomous support.";
            } else if (queryLower.includes('agent') || queryLower.includes('automate') || queryLower.includes('invoice')) {
                mockAnswer = "✦ Tech Mithilanchal Autonomous AI Agents: Multi-step reasoning agents that interact with APIs, read PDFs & invoices, manage calendar schedules, and perform ERP workflows with human-in-the-loop safety checks.";
            } else if (queryLower.includes('web') || queryLower.includes('app') || queryLower.includes('tech')) {
                mockAnswer = "✦ Tech Mithilanchal Full IT Stack: Web Platforms (React, Next.js, Node.js, E-commerce) and Mobile Apps (iOS Swift, Android Kotlin, React Native, Flutter) engineered for speed, high conversion, and scale.";
            }
            
            let currentStep = 0;
            const animateSteps = () => {
                if (currentStep < pipelineSteps.length) {
                    if (currentStep > 0 && pipelineSteps[currentStep - 1]) {
                        pipelineSteps[currentStep - 1].classList.remove('active');
                    }
                    if (pipelineSteps[currentStep]) {
                        pipelineSteps[currentStep].classList.add('active');
                    }
                    currentStep++;
                    setTimeout(animateSteps, 900);
                } else {
                    if (pipelineSteps[pipelineSteps.length - 1]) {
                        pipelineSteps[pipelineSteps.length - 1].classList.remove('active');
                    }
                    demoOutput.innerHTML = "";
                    let charIndex = 0;
                    const typeChar = () => {
                        if (charIndex < mockAnswer.length) {
                            demoOutput.innerHTML += mockAnswer.charAt(charIndex);
                            charIndex++;
                            setTimeout(typeChar, 12);
                        } else {
                            runDemoBtn.disabled = false;
                            demoInput.disabled = false;
                            runDemoBtn.style.opacity = '1';
                        }
                    };
                    typeChar();
                }
            };
            
            animateSteps();
        };
        
        runDemoBtn.addEventListener('click', runSimulation);
        demoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                runSimulation();
            }
        });
    }
});
