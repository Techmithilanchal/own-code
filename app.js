document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle hamburger icon animation
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

    // 2. Active Page Link Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (linkPath === '/' || linkPath === '') {
            // Home page match (strict check)
            if (currentPath === '/' || currentPath === '' || currentPath === '/index.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } else {
            // Check if directory folder name matches path parts
            const linkFolder = linkPath.replace(/^\/|\/$/g, '');
            const pathParts = currentPath.split('/');
            if (pathParts.includes(linkFolder)) {
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
                    observer.unobserve(entry.target); // Animates only once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.remove('reveal-hidden'));
    }

    // 4. FAQ Accordion (for contact page)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Contact Form Submission Handling
    const contactForm = document.getElementById('tech-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Processing...</span>`;
            submitBtn.style.opacity = '0.7';
            
            // Get form data and post to Netlify
            const formData = new FormData(contactForm);
            
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Hide form and show success message
                contactForm.innerHTML = `
                    <div style="text-align: center; padding: 3rem 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; align-items: center; justify-content: center;">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; display: flex; align-items: center; justify-content: center; color: #22c55e; font-size: 2rem; box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);">
                            ✓
                        </div>
                        <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700;">Inquiry Submitted!</h3>
                        <p style="color: var(--text-muted); max-width: 400px; margin: 0 auto; line-height: 1.6;">
                            Thank you for reaching out to TechMithilanchal. Our AI solutions architect will contact you within 24 hours to discuss details.
                        </p>
                        <button onclick="window.location.reload()" class="btn btn-secondary" style="margin-top: 1rem; padding: 0.6rem 1.5rem; font-size: 0.9rem;">Send Another Inquiry</button>
                    </div>
                `;
            })
            .catch(error => {
                console.error("Form submission failed:", error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.opacity = '1';
                alert("Submission failed. Please try again or contact us directly at contact@techmithilanchal.com");
            });
        });
    }

    // 6. RAG Simulation Logic (for demo page)
    const runDemoBtn = document.getElementById('run-demo-btn');
    const demoInput = document.getElementById('demo-query');
    
    if (runDemoBtn && demoInput) {
        const pipelineSteps = document.querySelectorAll('.pipeline-step');
        const demoOutput = document.getElementById('demo-output-text');
        
        const runSimulation = () => {
            const queryText = demoInput.value.trim();
            if (!queryText) {
                demoInput.placeholder = "Please enter a question first!";
                demoInput.focus();
                return;
            }
            
            // Disable inputs during simulation
            runDemoBtn.disabled = true;
            demoInput.disabled = true;
            runDemoBtn.style.opacity = '0.6';
            
            // Reset visual states
            pipelineSteps.forEach(step => step.classList.remove('active'));
            demoOutput.innerHTML = `<span style="color: var(--text-dark); font-style: italic;">Processing pipeline steps...</span>`;
            
            // Mock response intelligence based on inputs
            let mockAnswer = "Our semantic RAG engine retrieved relevant records from your internal knowledge repositories. TechMithilanchal's agent models synthesized this reply successfully.";
            const lowercaseQuery = queryText.toLowerCase();
            
            if (lowercaseQuery.includes('chat') || lowercaseQuery.includes('bot')) {
                mockAnswer = "TechMithilanchal Custom Chatbots utilize hybrid vector-keyword retrieval. We embed your corporate handbooks, CRM logs, and product FAQs to feed context-augmented prompts directly to open/closed-source LLMs, ensuring 100% hallucination-free support.";
            } else if (lowercaseQuery.includes('rag') || lowercaseQuery.includes('search')) {
                mockAnswer = "Our AI-Based RAG Search indexes file repositories (PDF, Docx, Notion, Confluence) into a vector store. When users search, we perform cosine similarity matches, extract the top context chunks, rerank them, and output answers complete with citation footnotes.";
            } else if (lowercaseQuery.includes('agent') || lowercaseQuery.includes('automate')) {
                mockAnswer = "TechMithilanchal Autonomous AI Agents integrate with email, calendar, and ERP systems. They break complex workflows into micro-tasks, plan execution paths, retrieve required documents dynamically using RAG, and execute actions with human-in-the-loop safety rails.";
            } else if (lowercaseQuery.includes('cost') || lowercaseQuery.includes('cheap') || lowercaseQuery.includes('price')) {
                mockAnswer = "By utilizing open-source models (like Llama-3 & Mistral) fine-tuned specifically for your tasks, hosted on cost-optimized serverless GPU clusters, we cut API operational overhead by up to 70% compared to out-of-the-box proprietary services.";
            }
            
            // Run step-by-step visual animation
            let currentStep = 0;
            
            const animateNextStep = () => {
                if (currentStep < pipelineSteps.length) {
                    if (currentStep > 0) {
                        pipelineSteps[currentStep - 1].classList.remove('active');
                    }
                    pipelineSteps[currentStep].classList.add('active');
                    
                    currentStep++;
                    setTimeout(animateNextStep, 1200);
                } else {
                    // Final output synthesis
                    pipelineSteps[pipelineSteps.length - 1].classList.remove('active');
                    
                    // Show final answer with typing effect
                    demoOutput.innerHTML = "";
                    let charIndex = 0;
                    const typingSpeed = 15;
                    
                    const typeChar = () => {
                        if (charIndex < mockAnswer.length) {
                            demoOutput.innerHTML += mockAnswer.charAt(charIndex);
                            charIndex++;
                            setTimeout(typeChar, typingSpeed);
                        } else {
                            // Enable everything back
                            runDemoBtn.disabled = false;
                            demoInput.disabled = false;
                            runDemoBtn.style.opacity = '1';
                        }
                    };
                    
                    typeChar();
                }
            };
            
            animateNextStep();
        };
        
        runDemoBtn.addEventListener('click', runSimulation);
        demoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                runSimulation();
            }
        });
    }
});
