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
     SECURITY CAMERA TIME SIMULATOR
     ========================================================================== */
  const cameraTimeEl = document.getElementById('cameraTime');
  
  function updateCameraTime() {
    if (!cameraTimeEl) return;
    const now = new Date();
    
    // Форматируем время в HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Форматируем дату как DD/MM/YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    
    cameraTimeEl.textContent = `${day}/${month}/${year}  ${hours}:${minutes}:${seconds} (GMT+8)`;
  }
  
  // Обновляем каждую секунду
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

  // Автоматическое переключение шагов раз в 5 секунд
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

      // Переключаем активную кнопку
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Переключаем активную панель
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
