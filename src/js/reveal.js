const animateCounter = (el) => {
  const target = parseInt(el.dataset.count);
  const duration = 2000; 
  const stepTime = Math.abs(Math.floor(duration / target));
  let current = 0;

  const timer = setInterval(() => {
    current += Math.ceil(target / 60); 
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = current;
    }
  }, 1000 / 60);
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(counter => {
        if (!counter.classList.contains('animated')) {
          counter.classList.add('animated');
          animateCounter(counter);
        }
      });
      
      if (entry.target.classList.contains('counter') && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounter(entry.target);
      }
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

export const initReveal = () => {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  revealElements.forEach((el) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
    revealObserver.observe(el);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}


