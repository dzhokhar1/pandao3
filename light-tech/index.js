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
     BLUEPRINT GRID CANVAS ANIMATION (Light Industrial)
     ========================================================================== */
  const canvas = document.getElementById('gridCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let gridPoints = [];
    let mouse = { x: null, y: null, radius: 150 };
    const gridSpacing = 45; // Шаг координатной сетки
    
    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initGrid();
    }
    
    // Tracking mouse inside Hero
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    // Grid Node definition
    class GridNode {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
      }
      
      update() {
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.baseX;
          let dy = mouse.y - this.baseY;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            // Притягиваем узлы к мыши для эффекта "линзы" / искривления сетки
            this.targetX = this.baseX + (dx / distance) * force * 15;
            this.targetY = this.baseY + (dy / distance) * force * 15;
          } else {
            this.targetX = this.baseX;
            this.targetY = this.baseY;
          }
        } else {
          this.targetX = this.baseX;
          this.targetY = this.baseY;
        }
        
        // Ease transition to target point (lerp)
        this.x += (this.targetX - this.x) * 0.1;
        this.y += (this.targetY - this.y) * 0.1;
      }
    }
    
    function initGrid() {
      gridPoints = [];
      const cols = Math.ceil(canvas.width / gridSpacing) + 1;
      const rows = Math.ceil(canvas.height / gridSpacing) + 1;
      
      for (let r = 0; r < rows; r++) {
        gridPoints[r] = [];
        for (let c = 0; c < cols; c++) {
          gridPoints[r][c] = new GridNode(c * gridSpacing, r * gridSpacing);
        }
      }
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rows = gridPoints.length;
      if (rows === 0) return;
      const cols = gridPoints[0].length;
      
      ctx.strokeStyle = '#F1F5F9'; // Очень блеклый серый для сетки
      ctx.lineWidth = 1;
      
      // Draw horizontal lines passing through deformed nodes
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const node = gridPoints[r][c];
          node.update();
          if (c === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.stroke();
        ctx.closePath();
      }
      
      // Draw vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const node = gridPoints[r][c];
          if (r === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.stroke();
        ctx.closePath();
      }
      
      // Draw nodes as small dots
      ctx.fillStyle = '#E2E8F0';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const node = gridPoints[r][c];
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      requestAnimationFrame(drawGrid);
    }
    drawGrid();
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
        
        const angleX = -yc * 8; // 8 degrees max rotation for light theme
        const angleY = xc * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        
        // Clean drop shadow expansion instead of glow
        card.style.boxShadow = `${-xc * 8}px ${-yc * 8}px 25px rgba(15, 23, 42, 0.08), 0 10px 25px rgba(15, 23, 42, 0.05)`;
        
        // Border color accentuation
        card.style.borderColor = 'var(--color-brand-red)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.boxShadow = '';
        card.style.borderColor = '';
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
