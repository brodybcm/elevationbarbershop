/* ==========================================================================
   Elevation Barbershop — Interactive Functionality
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initActiveNavLinks();
    initMobileMenu();
    initScrollReveal();
    initGalleryLightbox();
    initDynamicStudioHours();
    initCareerInquiryShortcut();
    initContactForm();
    initBackToTop();
  });

  /* ------------------------------------------------------------------------
     1. Sticky Header Scroll State
     ------------------------------------------------------------------------ */
  function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------------
     2. Active Nav Link Highlighting on Scroll
     ------------------------------------------------------------------------ */
  function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ------------------------------------------------------------------------
     3. Mobile Drawer Toggle
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileMenu || !overlay) return;

    const openMenu = () => {
      mobileMenu.classList.add('open');
      overlay.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Scroll Reveal Animations (.fade-in)
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const items = document.querySelectorAll('.fade-in');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     5. Fullscreen Gallery Lightbox with Keyboard & Touch Swipe Support
     ------------------------------------------------------------------------ */
  function initGalleryLightbox() {
    const cards = Array.from(document.querySelectorAll('.gallery-card'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!cards.length || !lightbox || !lightboxImg) return;

    let currentIndex = 0;
    let touchStartX = 0;

    const showSlide = (idx) => {
      currentIndex = (idx + cards.length) % cards.length;
      const card = cards[currentIndex];
      const img = card.querySelector('img');
      const caption = card.dataset.caption || (img ? img.alt : 'Elevation Barbershop Cut');

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${cards.length}`;
    };

    const openLightbox = (idx) => {
      showSlide(idx);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    cards.forEach((card, idx) => {
      card.addEventListener('click', () => openLightbox(idx));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
    });

    lightbox.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      'touchend',
      (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const delta = touchEndX - touchStartX;
        if (Math.abs(delta) > 48) {
          if (delta > 0) showSlide(currentIndex - 1);
          else showSlide(currentIndex + 1);
        }
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------------
     8. Dynamic Studio Hours Highlight & Status Indicator
     ------------------------------------------------------------------------ */
  function initDynamicStudioHours() {
    const todayIndex = new Date().getDay(); // 0=Sun .. 6=Sat
    const rows = document.querySelectorAll('[data-day-index]');
    const statusPill = document.getElementById('studio-live-status');

    rows.forEach((row) => {
      const days = row.dataset.dayIndex.split(',').map((d) => Number(d.trim()));
      if (days.includes(todayIndex)) {
        row.classList.add('hours-row-today');
      }
    });

    if (statusPill) {
      const isOpenDay = todayIndex >= 2 && todayIndex <= 6; // Tue–Sat
      if (isOpenDay) {
        statusPill.innerHTML =
          '<span class="inline-block w-2 h-2 rounded-full bg-petrol-bright animate-pulse mr-2"></span>Open Today • Book Online 24/7';
      } else {
        statusPill.innerHTML =
          '<span class="inline-block w-2 h-2 rounded-full bg-silver-muted mr-2"></span>By Appointment Today • Book Online 24/7';
      }
    }
  }

  /* ------------------------------------------------------------------------
     9. Career / Booth Inquiry Shortcut
     ------------------------------------------------------------------------ */
  function initCareerInquiryShortcut() {
    const careerBtn = document.getElementById('career-inquiry-btn');
    const inquirySelect = document.getElementById('inquiry-type');
    const nameInput = document.getElementById('contact-name');

    if (!careerBtn || !inquirySelect) return;

    careerBtn.addEventListener('click', () => {
      inquirySelect.value = 'Chair / Barber Career Inquiry';
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 350);
      }
    });
  }

  /* ------------------------------------------------------------------------
     10. FormSubmit AJAX Contact Handler (elevationbarbershopvaldosta@gmail.com)
     ------------------------------------------------------------------------ */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    const resetBtn = document.getElementById('reset-form-btn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (formError) formError.classList.add('hidden');

      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Message...';
      }

      const formData = new FormData(form);
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });

      try {
        const res = await fetch('https://formsubmit.co/ajax/elevationbarbershopvaldosta@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        form.classList.add('hidden');
        if (formSuccess) formSuccess.classList.remove('hidden');
        form.reset();
      } catch (err) {
        if (formError) {
          formError.classList.remove('hidden');
        } else {
          // Fallback to standard POST if AJAX fails on restricted origins
          form.submit();
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });

    if (resetBtn && formSuccess) {
      resetBtn.addEventListener('click', () => {
        formSuccess.classList.add('hidden');
        form.classList.remove('hidden');
      });
    }
  }

  /* ------------------------------------------------------------------------
     11. Floating Back-to-Top Button
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
