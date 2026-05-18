/**
 * ============================================================
 *  RRajeshwari Travels – react.js
 *  Vanilla JavaScript – No frameworks
 *  Author: RRajeshwari Travels
 * ============================================================
 *
 *  TABLE OF CONTENTS
 *  01. WhatsApp Booking Form
 *  02. Vehicle Card Quick Booking (data-wa buttons)
 *  03. Smooth Scrolling (anchor links)
 *  04. Scroll-To-Top Button Visibility
 *  05. Sticky Nav Active State
 *  06. Init
 * ============================================================
 */

'use strict';

/* ============================================================
   01. WHATSAPP BOOKING FORM
   ============================================================ */

/**
 * Collects form field values and opens WhatsApp with a
 * pre-filled booking message.
 */
function sendWhatsApp() {
  const getValue = (id) => {
    const el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : 'Not provided';
  };

  const name      = getValue('f-name');
  const phone     = getValue('f-phone');
  const from      = getValue('f-from');
  const to        = getValue('f-to');
  const date      = getValue('f-date');
  const vehicle   = getValue('f-vehicle');
  const pax       = getValue('f-pax');
  const message   = getValue('f-msg') !== 'Not provided' ? getValue('f-msg') : 'None';

  const waMessage = [
    '🚗 *New Booking Request – RRajeshwari Travels*',
    '',
    `👤 *Name:* ${name}`,
    `📞 *Phone:* ${phone}`,
    `📍 *From:* ${from}`,
    `📍 *To:* ${to}`,
    `📅 *Date:* ${date}`,
    `🚐 *Vehicle:* ${vehicle}`,
    `👥 *Passengers:* ${pax}`,
    `💬 *Message:* ${message}`,
    '',
    '_Sent from rrajeshwaritn91.in_',
  ].join('\n');

  const waURL = 'https://wa.me/917373494940?text=' + encodeURIComponent(waMessage);
  window.open(waURL, '_blank', 'noopener,noreferrer');
}


/* ============================================================
   02. VEHICLE CARD QUICK BOOKING (data-wa buttons)
   ============================================================ */

/**
 * Handles click events on vehicle card "Book" buttons.
 * Each button carries a `data-wa` attribute with the
 * pre-encoded vehicle name.
 *
 * @param {string} encodedVehicleName - URL-encoded vehicle name
 */
function bookVehicleWhatsApp(encodedVehicleName) {
  const waURL = 'https://wa.me/917373494940?text=' + encodedVehicleName;
  window.open(waURL, '_blank', 'noopener,noreferrer');
}

/**
 * Attach click handlers to all vehicle booking buttons
 * that carry [data-wa] attribute.
 */
function initVehicleButtons() {
  document.querySelectorAll('.book-btn[data-wa]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const encodedMsg = btn.getAttribute('data-wa');
      bookVehicleWhatsApp(encodedMsg);
    });
  });
}


/* ============================================================
   03. SMOOTH SCROLLING (anchor links)
   ============================================================ */

/**
 * Intercepts all internal anchor (#) clicks and replaces
 * the default jump with a smooth scroll behaviour.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');

      // Guard: ignore lone "#" (prevents scroll to top unintentionally)
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


/* ============================================================
   04. SCROLL-TO-TOP BUTTON VISIBILITY
   ============================================================ */

/**
 * Shows / hides the scroll-to-top button based on
 * how far the user has scrolled down the page.
 * Toggles a `.visible` CSS class for CSS-driven opacity.
 */
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  // Show after scrolling 400px
  const SHOW_THRESHOLD = 400;

  window.addEventListener('scroll', () => {
    if (window.scrollY > SHOW_THRESHOLD) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   05. STICKY NAV ACTIVE STATE
   ============================================================ */

/**
 * Adds an `.active` class to the nav link whose target
 * section is currently in the viewport using IntersectionObserver.
 */
function initNavActiveState() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px', // trigger when section crosses mid-viewport
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}


/* ============================================================
   06. FORM BOOKING BUTTON WIRING
   ============================================================ */

/**
 * Attaches the sendWhatsApp function to both booking
 * form submit buttons.
 */
function initBookingButtons() {
  const btnWA      = document.getElementById('btn-whatsapp');
  const btnBooking = document.getElementById('btn-booking');

  if (btnWA)      btnWA.addEventListener('click', sendWhatsApp);
  if (btnBooking) btnBooking.addEventListener('click', sendWhatsApp);
}


/* ============================================================
   INIT — runs after DOM is fully loaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initVehicleButtons();
  initSmoothScroll();
  initScrollTop();
  initNavActiveState();
  initBookingButtons();
});
