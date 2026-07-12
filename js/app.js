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
     2. MOBILE MENU TOGGLE
     ============================================================ */
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function () {
      var isActive = mobileMenu.classList.contains('active');
      mobileMenu.classList.toggle('active');
      hamburgerBtn.querySelector('.material-symbols-rounded').textContent =
        isActive ? 'menu' : 'close';
    });

    var mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        hamburgerBtn.querySelector('.material-symbols-rounded').textContent = 'menu';
      });
    });
  }

  /* ============================================================
     3. DOCK BEHAVIOR
     ============================================================ */
  var dock = document.getElementById('dock');
  var dockInner = document.getElementById('dockInner');
  var dockItems = document.querySelectorAll('.dock-item');
  var dockDots = document.querySelectorAll('.dock-dot');

  function updateDockCenter() {
    if (!dock || !dockItems.length) return;

    var dockRect = dock.getBoundingClientRect();
    var dockCenter = dockRect.left + dockRect.width / 2;
    var closestIndex = 0;
    var closestDistance = Infinity;

    dockItems.forEach(function (item, index) {
      var itemRect = item.getBoundingClientRect();
      var itemCenter = itemRect.left + itemRect.width / 2;
      var distance = Math.abs(dockCenter - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    dockItems.forEach(function (item, index) {
      var diff = Math.abs(index - closestIndex);
      var icon = item.querySelector('.dock-item-icon');
      var name = item.querySelector('.dock-item-name');

      if (index === closestIndex) {
        item.classList.add('active');
        item.style.transform = 'translateY(-6px) scale(1.12)';
        icon.style.background = 'rgba(255, 255, 255, 0.12)';
        icon.style.borderColor = 'rgba(255, 255, 255, 0.18)';
        name.style.color = '#FFFFFF';
        name.style.opacity = '1';
      } else if (diff === 1) {
        item.classList.remove('active');
        item.style.transform = 'translateY(-3px) scale(1.05)';
        icon.style.background = 'rgba(255, 255, 255, 0.08)';
        icon.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        name.style.color = '#B8B8B8';
        name.style.opacity = '0.8';
      } else {
        item.classList.remove('active');
        item.style.transform = 'translateY(0) scale(1)';
        icon.style.background = 'rgba(255, 255, 255, 0.06)';
        icon.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        name.style.color = '#B8B8B8';
        name.style.opacity = '0.6';
      }
    });

    dockDots.forEach(function (dot, index) {
      if (index === closestIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (dock) {
    dock.addEventListener('scroll', function () {
      requestAnimationFrame(updateDockCenter);
    }, { passive: true });

    updateDockCenter();

    window.addEventListener('resize', function () {
      requestAnimationFrame(updateDockCenter);
    }, { passive: true });
  }

  dockItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var itemRect = item.getBoundingClientRect();
      var dockRect = dock.getBoundingClientRect();
      var scrollTarget = dock.scrollLeft + (itemRect.left - dockRect.left) - (dockRect.width / 2) + (itemRect.width / 2);

      dock.scrollTo({
        left: scrollTarget,
        behavior: 'smooth'
      });
    });
  });

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
        }
      });

      item.classList.toggle('active', !isActive);
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
     9. SEARCH TOGGLE (Non-home pages)
     ============================================================ */
  var searchToggle = document.getElementById('searchToggle');

  if (searchToggle) {
    searchToggle.addEventListener('click', function () {
      var query = prompt('Search Paper:');
      if (query && query.trim()) {
        window.location.href = 'index.html?q=' + encodeURIComponent(query.trim());
      }
    });
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
     12. PAGE-CONTENT PADDING (no dock pages)
     ============================================================ */
  var dockWrapper = document.getElementById('dockWrapper');
  var pageContent = document.querySelector('.page-content');
  if (pageContent) {
    if (dockWrapper) {
      pageContent.classList.add('has-dock');
    }
  }

  /* ============================================================
     13. INITIAL SETUP
     ============================================================ */
  handleNavbarScroll();

  setTimeout(function () {
    updateDockCenter();
  }, 100);

})();
