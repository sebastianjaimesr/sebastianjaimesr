/* ==========================================================================
   Portafolio · Juan Sebastian Jaimes Rolon
   JavaScript vanilla. Sin librerías: todo lo que hace la página se resuelve
   con IntersectionObserver y eventos nativos.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     ENLACES PENDIENTES DE CONFIGURAR
     Cuando tengas la URL o el archivo, sustituye el valor aquí y el enlace
     dejará de mostrar el aviso: pasará a funcionar automáticamente.

       cv       → ruta a tu PDF, por ejemplo 'cv/Juan_Sebastian_Jaimes_CV.pdf'
       linkedin → URL completa de tu perfil
       demo-1/2/3 → URL de la demo publicada de cada proyecto
     ------------------------------------------------------------------ */
  var LINKS = {
    'cv':       'cv/Juan_Sebastian_Jaimes_CV.pdf',
    'linkedin': 'https://www.linkedin.com/in/sebastian-jaimes-1a2259398/',
    'demo-1':   '',
    'demo-2':   '',
    'demo-3':   ''
  };

  var AVISOS = {
    'cv':       'El CV todavía no está cargado. Añade el PDF en /cv y actívalo en js/script.js',
    'linkedin': 'Añade la URL de tu LinkedIn en js/script.js',
    'demo-1':   'Este proyecto aún no tiene demo publicada',
    'demo-2':   'Este proyecto aún no tiene demo publicada',
    'demo-3':   'Este proyecto aún no tiene demo publicada'
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ------------------------------------------------------------------
     1. Año dinámico en el footer
     ------------------------------------------------------------------ */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();


  /* ------------------------------------------------------------------
     2. Navegación: fondo al hacer scroll + menú móvil
     ------------------------------------------------------------------ */
  var nav      = document.getElementById('nav');
  var burger   = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Cerrar al elegir una sección
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link')) closeMenu();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        closeMenu();
        burger.focus();
      }
    });

    // Si se pasa a escritorio con el menú abierto, restaurar el scroll
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) closeMenu();
    });
  }


  /* ------------------------------------------------------------------
     3. Indicador de sección activa en el navbar
     ------------------------------------------------------------------ */
  var links    = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }


  /* ------------------------------------------------------------------
     4. Revelado de elementos al entrar en pantalla
     ------------------------------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');

  reveals.forEach(function (el) {
    var d = el.getAttribute('data-delay');
    if (d) el.style.setProperty('--d', d);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);   // una sola vez: no reaparece al subir
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el) { io.observe(el); });
  }


  /* ------------------------------------------------------------------
     5. Halo ambiental que sigue al cursor (solo puntero fino)
     ------------------------------------------------------------------ */
  var glow = document.getElementById('cursorGlow');
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  if (glow && finePointer && !reduceMotion) {
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;

    window.addEventListener('mousemove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!glow.classList.contains('is-on')) glow.classList.add('is-on');
      if (!running) { running = true; requestAnimationFrame(follow); }
    }, { passive: true });

    function follow() {
      // Interpolación suave: el halo persigue al cursor con retardo
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';

      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        requestAnimationFrame(follow);
      } else {
        running = false;
      }
    }
  }


  /* ------------------------------------------------------------------
     6. Parallax muy ligero en el retrato del hero
     ------------------------------------------------------------------ */
  var parallax = document.querySelectorAll('[data-parallax]');

  if (parallax.length && !reduceMotion && finePointer) {
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        parallax.forEach(function (el) {
          var k = parseFloat(el.getAttribute('data-parallax')) || 0.05;
          el.style.transform = 'translate3d(0,' + (-y * k).toFixed(2) + 'px,0)';
        });
        ticking = false;
      });
    }, { passive: true });
  }


  /* ------------------------------------------------------------------
     7. Enlaces pendientes: si hay URL configurada la usan, si no avisan
     ------------------------------------------------------------------ */
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 3800);
  }

  document.querySelectorAll('.js-pending').forEach(function (el) {
    var key = el.getAttribute('data-pending');
    var url = LINKS[key];

    if (url) {
      // Configurado: se convierte en un enlace normal
      el.setAttribute('href', url);
      el.classList.remove('js-pending');
      if (key !== 'cv') {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      } else {
        el.setAttribute('download', '');
      }
      return;
    }

    el.addEventListener('click', function (e) {
      e.preventDefault();
      showToast(AVISOS[key] || 'Enlace pendiente de configurar');
    });
  });

})();
