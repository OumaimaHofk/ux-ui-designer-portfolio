// ==========================================================================
// OUMAIMA HOFK — PORTFOLIO — shared interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Nav scroll state ---- */
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      links.classList.toggle('is-open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        links.classList.remove('is-open');
      });
    });
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- Project filters (projets.html) ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.grid-page .project-card[data-cat]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const cat = btn.dataset.filter;
        cards.forEach(card => {
          const match = cat === 'all' || card.dataset.cat.split(' ').includes(cat);
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

});

const dropdownToggle = document.querySelector('.dropdown-toggle');
const navDropdown = document.querySelector('.nav-dropdown');

if (dropdownToggle && navDropdown) {
  dropdownToggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = navDropdown.classList.toggle('is-open');

    dropdownToggle.setAttribute(
      'aria-expanded',
      isOpen ? 'true' : 'false'
    );
  });
}

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const halfwayPoint = (pageHeight - viewportHeight) / 2;

    if (scrollPosition >= halfwayPoint) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}