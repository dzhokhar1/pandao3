document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     MOBILE NAV MENU
     ========================================================================== */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileNavToggle && nav) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('open');
      nav.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     NEURAL NETWORK CANVAS ANIMATION (Obsidian Dark)
     ========================================================================== */
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 160 };
    
    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Tracking mouse movements over the Hero section
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        
        // Push particles gently away from mouse
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            
            this.x -= forceDirectionX * force * 1.6;
            this.y -= forceDirectionY * force * 1.6;
          }
        }
      }
      
      draw() {
        ctx.fillStyle = 'rgba(227, 30, 36, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    function init() {
      particles = [];
      const numberOfParticles = Math.min(65, Math.floor((canvas.width * canvas.height) / 14000));
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    }
    init();
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Red ambient cursor glow (Mouse Glow behind glass overlays)
      if (mouse.x !== null && mouse.y !== null) {
        const glowRadius = 240;
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        gradient.addColorStop(0, 'rgba(227, 30, 36, 0.09)');
        gradient.addColorStop(0.5, 'rgba(31, 34, 69, 0.03)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Connect nodes with thin transparent lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 110) {
            ctx.strokeStyle = `rgba(227, 30, 36, ${0.15 - (distance / 110) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
      
      requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', init);
  }

  /* ==========================================================================
     3D TILT EFFECT FOR CARDS (VibeCode $5,000 effect)
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.service-card, .benefit-card, .fact-card');
  
  if (window.innerWidth > 768) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = (x - rect.width / 2) / (rect.width / 2);
        const yc = (y - rect.height / 2) / (rect.height / 2);
        
        const angleX = -yc * 10; // 10 degrees max rotation
        const angleY = xc * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        
        // Dynamic border glow highlights
        if (card.classList.contains('highlight-red')) {
          card.style.boxShadow = `${-xc * 12}px ${-yc * 12}px 35px rgba(8, 9, 14, 0.45), 0 0 25px rgba(227, 30, 36, 0.15)`;
        } else {
          card.style.boxShadow = `${-xc * 12}px ${-yc * 12}px 35px rgba(8, 9, 14, 0.45), 0 0 25px rgba(227, 30, 36, 0.05)`;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.boxShadow = '';
      });
    });
  }

  /* ==========================================================================
     SECURITY CAMERA TIME SIMULATOR
     ========================================================================== */
  const cameraTimeEl = document.getElementById('cameraTime');
  
  function updateCameraTime() {
    if (!cameraTimeEl) return;
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    
    cameraTimeEl.textContent = `${day}/${month}/${year}  ${hours}:${minutes}:${seconds} (GMT+8)`;
  }
  
  updateCameraTime();
  setInterval(updateCameraTime, 1000);


  /* ==========================================================================
     INTERACTIVE WAREHOUSE STEPS
     ========================================================================== */
  const steps = document.querySelectorAll('.warehouse-step');
  let currentStepIndex = 0;
  let stepInterval;

  function activateStep(index) {
    steps.forEach((step, idx) => {
      if (idx === index) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  steps.forEach((step, index) => {
    step.addEventListener('click', () => {
      clearInterval(stepInterval);
      currentStepIndex = index;
      activateStep(currentStepIndex);
    });
  });

  function startStepRotation() {
    stepInterval = setInterval(() => {
      currentStepIndex = (currentStepIndex + 1) % steps.length;
      activateStep(currentStepIndex);
    }, 5000);
  }
  
  if (steps.length > 0) {
    activateStep(0);
    startStepRotation();
  }


  /* ==========================================================================
     INTERACTIVE BUSINESS TARGET TABS
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanels.forEach(panel => {
        if (panel.getAttribute('id') === targetTab) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });


  /* ==========================================================================
     PROCESS TIMELINE AUTOMATION ON SCROLL
     ========================================================================== */
  const processSection = document.getElementById('process');
  const timelineNodes = document.querySelectorAll('.timeline-node');
  const progressFill = document.querySelector('.timeline-progress-fill');
  let timelineAnimated = false;

  function animateTimeline() {
    if (!progressFill || timelineNodes.length === 0) return;
    
    let stepDelay = 600;
    
    timelineNodes.forEach((node, idx) => {
      setTimeout(() => {
        timelineNodes.forEach((n, i) => {
          if (i <= idx) {
            n.classList.add('active');
          }
        });
        
        const fillPercentage = ((idx + 1) / timelineNodes.length) * 100;
        progressFill.style.width = `${fillPercentage}%`;
        
      }, idx * stepDelay);
    });
  }

  timelineNodes.forEach((node, index) => {
    node.addEventListener('click', () => {
      timelineNodes.forEach((n, i) => {
        if (i <= index) {
          n.classList.add('active');
        } else {
          n.classList.remove('active');
        }
      });
      const fillPercentage = ((index + 1) / timelineNodes.length) * 100;
      progressFill.style.width = `${fillPercentage}%`;
    });
  });


  /* ==========================================================================
     SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        if (entry.target.id === 'process' && !timelineAnimated) {
          timelineAnimated = true;
          animateTimeline();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ==========================================================================
     REQUEST FORM SUBMISSION SIMULATION
     ========================================================================== */
  const requestForm = document.getElementById('requestForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
  const successPopup = document.getElementById('successPopup');
  const closePopupBtn = document.getElementById('closePopupBtn');
  const popupOkBtn = document.getElementById('popupOkBtn');

  if (requestForm && submitBtn) {
    requestForm.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      if (btnText && btnSpinner) {
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        if (btnText && btnSpinner) {
          btnText.classList.remove('hidden');
          btnSpinner.classList.add('hidden');
        }

        requestForm.reset();

        if (successPopup) {
          successPopup.classList.add('show');
        }
      }, 1800);
    });
  }

  function closePopup() {
    if (successPopup) {
      successPopup.classList.remove('show');
    }
  }

  if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);
  if (popupOkBtn) popupOkBtn.addEventListener('click', closePopup);
  
  if (successPopup) {
    successPopup.addEventListener('click', (e) => {
      if (e.target === successPopup) {
        closePopup();
      }
    });
  }


  /* ==========================================================================
     ACTIVE HEADER NAV STATE ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
