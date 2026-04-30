document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Mobile Hamburger Menu Toggle (Simple implementation)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(7, 9, 19, 0.95)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        }
    });

    // Reset inline styles when resizing window to avoid layout breaks
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.borderBottom = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Add reveal class to sections we want to animate
    const revealElements = document.querySelectorAll(
        '.manifiesto-inner, .feature-card, .stat-item, .detalle-item, .escala-content, .escala-visual, .pricing-card, .glass-banner'
    );
    
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Stagger cards within feature-grid
        if (el.classList.contains('feature-card') || el.classList.contains('stat-item')) {
            el.style.transitionDelay = `${index * 0.08}s`;
        }
        revealObserver.observe(el);
    });

    // 5. Animated Counter for Stats
    const counterOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, counterOptions);

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        counterObserver.observe(statsBar);
    }

    // 6. Animated Progress Bars
    const progressOptions = {
        threshold: 0.5
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.progress-fill');
                fills.forEach((fill, i) => {
                    setTimeout(() => {
                        fill.classList.add('animated');
                    }, i * 200);
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, progressOptions);

    const progressBars = document.querySelector('.progress-bars');
    if (progressBars) {
        progressObserver.observe(progressBars);
    }

    // 7. Parallax effect on hero image
    const heroImage = document.querySelector('.glass-mockup');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `rotateY(-10deg) rotateX(5deg) translateY(${scrolled * 0.05}px)`;
            }
        });
    }

    // 8. Modal Formulario WhatsApp
    const modal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const whatsappForm = document.getElementById('whatsappForm');
    
    // Select all buttons that should open the modal
    const actionButtons = document.querySelectorAll('a[href^="https://wa.me"], a[href="#contacto"], .btn, .whatsapp-float');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Check if it's a link to wa.me or #contacto
            const href = btn.getAttribute('href');
            if (href && (href.startsWith('https://wa.me') || href === '#contacto')) {
                e.preventDefault();
                modal.classList.add('active');
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Handle form submission
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const ruc = document.getElementById('ruc').value;
            const celular = document.getElementById('celular').value;
            const correo = document.getElementById('correo').value;
            const tipoFabrica = document.getElementById('tipoFabrica').value;
            const ciudad = document.getElementById('ciudad').value;

            // Construir el mensaje de WhatsApp
            const mensaje = `Hola, estoy interesado en MRPGEST.%0A%0A*Mis Datos:*%0A- *Nombre:* ${nombre}%0A- *RUC:* ${ruc}%0A- *Celular:* ${celular}%0A- *Correo:* ${correo}%0A- *Tipo de Fábrica:* ${tipoFabrica}%0A- *Ciudad:* ${ciudad}`;
            
            // Reemplazar espacios y caracteres especiales si es necesario, aunque %0A ya maneja los saltos
            const whatsappUrl = `https://wa.me/51950792233?text=${mensaje}`;
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Cerrar modal y resetear form
            modal.classList.remove('active');
            whatsappForm.reset();
        });
    }
});
