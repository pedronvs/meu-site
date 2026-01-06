// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('open')) {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
  }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Only prevent default for internal anchors (not empty #)
    if (href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Sticky Header on Scroll
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
  } else {
    header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// Add animation on scroll for cards (optional enhancement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards for animation
const cards = document.querySelectorAll('.stat-card, .feature-card, .metric-card, .pricing-card, .contact-card');
cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Active Navigation Link Based on Scroll Position
const sections = document.querySelectorAll('section[id], main[id]');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add active state styling
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--azul-primario);
    position: relative;
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--azul-primario);
  }
  
  @media (max-width: 767px) {
    .nav-link.active::after {
      bottom: 0;
      left: 0;
      width: 4px;
      height: 100%;
    }
  }
`;
document.head.appendChild(style);

// Form validation (if forms are added later)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Obrigado! Entraremos em contato em breve.');
    form.reset();
  });
});

// Console log for debugging
console.log('GuardianMed website loaded successfully!');
console.log('Mobile-first responsive design active');