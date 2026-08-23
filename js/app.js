/* ============================================================
   PAPER ECOSYSTEM - MAIN JAVASCRIPT
   Handles: Navigation, Dock, Liquid Glass, Animations, FAQ,
   Device Switcher, Favicon, Search Toggle
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. NAVBAR SCROLL EFFECT
     ============================================================ */
  var navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ============================================================
     2. MOBILE MENU REMOVED (Per User Request)
     ============================================================ */

  /* ============================================================
     3. DOCK BEHAVIOR REMOVED
     ============================================================ */

  /* ============================================================
     4. LIQUID GLASS MOUSE TRACKING
     ============================================================ */
  var glassElements = document.querySelectorAll('.liquid-glass');

  function handleGlassMouseMove(e) {
    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    this.style.setProperty('--mouse-x', x + 'px');
    this.style.setProperty('--mouse-y', y + 'px');
  }

  glassElements.forEach(function (el) {
    el.addEventListener('mousemove', handleGlassMouseMove);
  });

  /* ============================================================
     5. INTERSECTION OBSERVER - FADE IN ANIMATIONS
     ============================================================ */
  var fadeElements = document.querySelectorAll('.fade-in, .scale-in');

  if ('IntersectionObserver' in window && fadeElements.length) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  /* ============================================================
     6. FAQ ACCORDION
     ============================================================ */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          var otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      var newState = !isActive;
      item.classList.toggle('active', newState);
      question.setAttribute('aria-expanded', newState);
    });
  });

  /* ============================================================
     7. APP DETAIL NAVIGATION (Apps Page)
     ============================================================ */
  var appDetail = document.getElementById('appDetail');
  var appGrid = document.querySelector('.app-grid');

  if (appDetail && appGrid) {
    var appData = {
      paperleaf: {
        icon: 'auto_awesome',
        iconImg: 'assets/icons/logo_paperleaf.jpg',
        name: 'Paperleaf',
        slogan: 'Your digital notebook, reimagined.',
        status: 'available',
        features: [
          { title: 'Natural Writing', desc: 'Write with a feel that mimics real pen on paper.' },
          { title: 'Smart Organization', desc: 'Automatically organize notes with intelligent tags.' },
          { title: 'Cloud Sync', desc: 'Access your notes across all your devices.' },
          { title: 'Beautiful Themes', desc: 'Choose from elegant themes that suit your style.' },
          { title: 'Handwriting Recognition', desc: 'Convert handwritten notes to text instantly.' },
          { title: 'Offline Mode', desc: 'Full functionality without an internet connection.' }
        ]
      },
      paperbook: {
        icon: 'menu_book',
        name: 'Paper Book',
        slogan: 'Read without boundaries.',
        status: 'coming-soon',
        features: [
          { title: 'Immersive Reader', desc: 'A distraction-free reading environment.' },
          { title: 'Custom Typography', desc: 'Adjust fonts, size, and spacing to your preference.' },
          { title: 'Reading Progress', desc: 'Track your reading goals and progress.' },
          { title: 'Bookmarks & Notes', desc: 'Highlight passages and add your thoughts.' }
        ]
      },
      paperstudio: {
        icon: 'palette',
        name: 'Paper Studio',
        slogan: 'Design with intention.',
        status: 'coming-soon',
        features: [
          { title: 'Professional Tools', desc: 'Precision design tools for every project.' },
          { title: 'Vector Support', desc: 'Create scalable graphics with ease.' },
          { title: 'Layer System', desc: 'Organize complex designs with powerful layers.' },
          { title: 'Export Options', desc: 'Export in multiple formats for any platform.' }
        ]
      },
      paperpaint: {
        icon: 'brush',
        name: 'Paper Paint',
        slogan: 'Paint your imagination.',
        status: 'coming-soon',
        features: [
          { title: 'Natural Brushes', desc: 'Paint with brushes that feel real.' },
          { title: 'Color Mixing', desc: 'Blend colors naturally on your canvas.' },
          { title: 'Layer Support', desc: 'Work with multiple layers for complex art.' },
          { title: 'Pressure Sensitivity', desc: 'Full support for stylus pressure levels.' }
        ]
      },
      paperspace: {
        icon: 'cloud',
        name: 'Paper Space',
        slogan: 'Your workspace, everywhere.',
        status: 'coming-soon',
        features: [
          { title: 'Cloud Storage', desc: 'Securely store all your Paper files.' },
          { title: 'Cross-Device Sync', desc: 'Seamless sync across all your devices.' },
          { title: 'File Management', desc: 'Organize, search, and manage your files.' },
          { title: 'Sharing', desc: 'Share documents and collaborate in real time.' }
        ]
      },
      papermusic: {
        icon: 'music_note',
        name: 'Paper Music',
        slogan: 'Sound, simplified.',
        status: 'coming-soon',
        features: [
          { title: 'Multi-Track Recording', desc: 'Record and layer multiple audio tracks.' },
          { title: 'Virtual Instruments', desc: 'Play with a collection of built-in instruments.' },
          { title: 'MIDI Support', desc: 'Connect and use external MIDI controllers.' },
          { title: 'Mixing Console', desc: 'Professional mixing tools at your fingertips.' }
        ]
      }
    };

    function showAppDetail(appId) {
      var data = appData[appId];
      if (!data || !appDetail) return;

      var detailName = document.getElementById('detailName');
      var detailSlogan = document.getElementById('detailSlogan');
      var detailActions = document.getElementById('detailActions');
      var detailFeatures = document.getElementById('detailFeatures');

      var detailIcon = document.getElementById('detailIcon');
      if (detailIcon) {
        if (data.iconImg) {
          detailIcon.innerHTML = '<img src="' + data.iconImg + '" alt="' + data.name + '">';
        } else {
          detailIcon.innerHTML = '<span class="material-symbols-rounded">' + data.icon + '</span>';
        }
      }
      if (detailName) detailName.textContent = data.name;
      if (detailSlogan) detailSlogan.textContent = data.slogan;

      if (detailActions) {
        if (data.status === 'available') {
          detailActions.innerHTML =
            '<a href="#" class="btn btn-primary">Download</a>';
        } else {
          detailActions.innerHTML =
            '<span class="btn btn-secondary btn-disabled">Coming Soon</span>';
        }
      }

      if (detailFeatures) {
        detailFeatures.innerHTML = '';
        data.features.forEach(function (feat) {
          detailFeatures.innerHTML +=
            '<div class="feature-item">' +
            '<span class="material-symbols-rounded">check_circle</span>' +
            '<div>' +
            '<div class="feature-item-title">' + feat.title + '</div>' +
            '<div class="feature-item-desc">' + feat.desc + '</div>' +
            '</div>' +
            '</div>';
        });
      }

      appDetail.style.display = 'block';
      if (appGrid) appGrid.style.display = 'none';

      document.title = data.name + ' - Paper Ecosystem';

      var fadeItems = appDetail.querySelectorAll('.fade-in');
      fadeItems.forEach(function (el) {
        el.classList.remove('visible');
      });

      if ('IntersectionObserver' in window) {
        var detailObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              detailObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        fadeItems.forEach(function (el) {
          detailObserver.observe(el);
        });
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function hideAppDetail() {
      if (appDetail) appDetail.style.display = 'none';
      if (appGrid) appGrid.style.display = '';
      document.title = 'Apps - Paper Ecosystem';
    }

    function checkHash() {
      var hash = window.location.hash.replace('#', '');
      if (hash && appData[hash]) {
        showAppDetail(hash);
      } else {
        hideAppDetail();
      }
    }

    window.addEventListener('hashchange', checkHash);
    checkHash();
  }

  /* ============================================================
     8. DEVICE SWITCHER (Apps Detail)
     ============================================================ */
  var deviceBtns = document.querySelectorAll('.device-btn');
  var deviceDropdown = document.getElementById('screenshotsTablet');

  deviceBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var device = this.getAttribute('data-device');

      deviceBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      if (device === 'tablet' && deviceDropdown) {
        deviceDropdown.classList.toggle('open');
      } else if (deviceDropdown) {
        deviceDropdown.classList.remove('open');
      }
    });
  });

  /* ============================================================
     9. SEARCH PANEL (Non-home pages)
     Slides down a search panel when search icon is tapped
     ============================================================ */
  var searchToggle = document.getElementById('searchToggle');
  var searchPanel = document.getElementById('searchPanel');

  if (searchToggle && searchPanel) {
    var searchPanelInput = searchPanel.querySelector('input');

    searchToggle.addEventListener('click', function () {
      var isOpen = searchPanel.classList.contains('open');
      searchPanel.classList.toggle('open');

      if (!isOpen && searchPanelInput) {
        setTimeout(function () {
          searchPanelInput.focus();
        }, 100);
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (searchPanel.classList.contains('open') &&
          !searchPanel.contains(e.target) &&
          !searchToggle.contains(e.target)) {
        searchPanel.classList.remove('open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchPanel.classList.contains('open')) {
        searchPanel.classList.remove('open');
      }
    });

    // Submit search
    if (searchPanelInput) {
      searchPanelInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
          window.location.href = 'index.html?q=' + encodeURIComponent(this.value.trim());
        }
      });
    }
  }

  /* ============================================================
     10. SMOOTH SCROLL FOR INTERNAL LINKS
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 180;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ============================================================
     11. FAVICON - DARK/LIGHT MODE
     stalone_white for dark, stalone_black for light
     ============================================================ */
  function updateFavicon() {
    var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ||
                 document.documentElement.getAttribute('data-theme') === 'dark';
    var favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = isDark ? 'assets/icons/stalone_white.png' : 'assets/icons/stalone_black.png';
  }

  updateFavicon();
  window.matchMedia('(prefers-color-scheme: change)').addEventListener('change', updateFavicon);

  /* ============================================================
     12. PAGE-CONTENT PADDING REMOVED
     ============================================================ */

  /* ============================================================
     13. INITIAL SETUP
     ============================================================ */
  handleNavbarScroll();

})();
