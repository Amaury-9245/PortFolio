// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// SCROLL REVEAL
const revealEls     = document.querySelectorAll('.reveal');
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));
timelineItems.forEach((el, i) => {
  el.style.transitionDelay = (i * 0.12) + 's';
  observer.observe(el);
});

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// PARALLAX LINES
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero-bg-lines span').forEach((el, i) => {
    el.style.transform = `translateY(${y * (0.08 + i * 0.04)}px)`;
  });
}, { passive: true });

// ANIMATED COUNTERS
const stats = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = el.textContent;
    const num    = parseInt(target);
    if (isNaN(num)) return;
    let start = 0;
    const suffix = target.replace(/[0-9]/g, '');
    const inc    = num / (1200 / 16);
    const timer  = setInterval(() => {
      start = Math.min(start + inc, num);
      el.textContent = Math.floor(start) + suffix;
      if (start >= num) clearInterval(timer);
    }, 16);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

stats.forEach(s => statObserver.observe(s));