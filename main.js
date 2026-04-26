// dose — main.js | No ES module imports — works from file://
(function() {
  'use strict';

  var _u = atob('aHR0cHM6Ly9icmdyeXN4cXVicGliZGNpZWFvZS5zdXBhYmFzZS5jbw==');
  var _k = atob('c2JfcHVibGlzaGFibGVfaldlY3oxeTU1RlJTbFJvMlFQT05mUV9tdjhXUEg2RQ==');
  var supabase = window.supabase.createClient(_u, _k);

  if (typeof initGDPR === 'function') {
    initGDPR({ brandName: 'D.O.S.E.', accentColor: '#F59E0B' });
  }

  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e, i) {
      if (e.isIntersecting) {
        setTimeout(function() { e.target.classList.add('visible'); }, i * 90);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });
  setTimeout(function() {
    document.querySelectorAll('.reveal-up').forEach(function(el) { el.classList.add('visible'); });
  }, 150);

  function animateCounter(el, target, suffix) {
    suffix = suffix || '+';
    var current = 0;
    var step = target / (1800 / 16);
    var timer = setInterval(function() {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('it') + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }
  var counterObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.target));
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-n[data-target]').forEach(function(el) { counterObs.observe(el); });

  function handleWaitlist(form) {
    var emailInput = form.querySelector('input[type="email"]');
    var btn = form.querySelector('button[type="submit"]');
    var email = emailInput.value.trim();
    var orig = btn.innerHTML;

    btn.innerHTML = '...';
    btn.disabled = true;

    supabase.from('waitlist').insert({ startup: 'dose', email: email }).then(function(res) {
      if (res.error) {
        btn.innerHTML = res.error.code === '23505' ? '☀️ Già iscritto!' : '✕ Riprova';
      } else {
        btn.innerHTML = '☀️ Iscritto!';
      }
      btn.style.opacity = '.7';
      setTimeout(function() { btn.innerHTML = orig; btn.style.opacity = ''; btn.disabled = false; form.reset(); }, 3500);
    });
  }

  document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function(e) { e.preventDefault(); handleWaitlist(form); });
  });
})();
