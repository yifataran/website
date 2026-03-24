// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

function setTheme(dark) {
  if (dark) {
    root.classList.add('dark-mode');
    root.classList.remove('light-mode');
  } else {
    root.classList.remove('dark-mode');
    root.classList.add('light-mode');
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  setTheme(true);
} else if (saved === 'light') {
  setTheme(false);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.classList.contains('dark-mode') ||
      (!root.classList.contains('light-mode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(!isDark);
  });
}

// Active section highlighting
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  rootMargin: '-20% 0px -60% 0px',
  threshold: 0
});

sections.forEach(section => navObserver.observe(section));

// Scroll-triggered fade-in animations
const fadeElements = document.querySelectorAll('.fade-in, .stagger');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1
});

fadeElements.forEach(el => fadeObserver.observe(el));

// Back to top button
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
}
