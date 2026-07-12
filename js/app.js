/* ============================================================
   PAPER ECOSYSTEM - MAIN JAVASCRIPT
   Handles: Navigation, Dock, Liquid Glass, Animations, FAQ
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. NAVBAR SCROLL EFFECT
     Adds .scrolled class to navbar when page is scrolled
     ============================================================ */
  const navbar = document.getElementById('navbar');

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
     Hamburger button opens/closes the mobile navigation menu
     ============================================================ */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function () {
      const isActive = mobileMenu.classList.contains('active');
      mobileMenu.classList.toggle('active');
      hamburgerBtn.querySelector('.material-symbols-rounded').textContent =
        isActive ? 'menu' : 'close';
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        hamburgerBtn.querySelector('.material-symbols-rounded').textContent = 'menu';
      });
    });
  }

  /* ============================================================
     3. DOCK BEHAVIOR
     - Center item is larger and brighter
     - Smooth scroll snapping
     - Dot indicators update based on active item
     ============================================================ */
  const dock = document.getElementById('dock');
  const dockInner = document.getElementById('dockInner');
  const dockItems = document.querySelectorAll('.dock-item');
  const dockDots = document.querySelectorAll('.dock-dot');

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

    // Update dots
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

    // Initial center calculation
    updateDockCenter();

    // Recalculate on resize
    window.addEventListener('resize', function () {
      requestAnimationFrame(updateDockCenter);
    }, { passive: true });
  }

  // Dock item click - scroll to item center
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
     Highlights follow the mouse cursor on liquid-glass elements
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
     Elements with .fade-in class animate in when visible
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
     Toggle FAQ answers on the Support page
     ============================================================ */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close all other FAQ items
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });

  /* ============================================================
     7. APP DETAIL NAVIGATION (Apps Page)
     Shows detail view when URL hash matches an app ID
     ============================================================ */
  var appDetail = document.getElementById('appDetail');
  var appGrid = document.querySelector('.app-grid');

  if (appDetail && appGrid) {
    var appData = {
      paperleaf: {
        icon: 'auto_awesome',
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

      // Update detail view
      var detailIconSymbol = document.getElementById('detailIconSymbol');
      var detailName = document.getElementById('detailName');
      var detailSlogan = document.getElementById('detailSlogan');
      var detailActions = document.getElementById('detailActions');
      var detailFeatures = document.getElementById('detailFeatures');

      if (detailIconSymbol) detailIconSymbol.textContent = data.icon;
      if (detailName) detailName.textContent = data.name;
      if (detailSlogan) detailSlogan.textContent = data.slogan;

      // Build actions
      if (detailActions) {
        if (data.status === 'available') {
          detailActions.innerHTML =
            '<a href="#" class="btn btn-primary">Download <span class="material-symbols-rounded">download</span></a>';
        } else {
          detailActions.innerHTML =
            '<span class="btn btn-secondary btn-disabled">Coming Soon</span>';
        }
      }

      // Build features
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

      // Show detail, hide grid
      appDetail.style.display = 'block';
      if (appGrid) appGrid.style.display = 'none';

      // Update page title
      document.title = data.name + ' - Paper Ecosystem';

      // Re-trigger fade-in
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

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function hideAppDetail() {
      if (appDetail) appDetail.style.display = 'none';
      if (appGrid) appGrid.style.display = '';
      document.title = 'Apps - Paper Ecosystem';
    }

    // Check hash on load and hashchange
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
     8. SMOOTH SCROLL FOR DOCK INTERNAL LINKS
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 180; // navbar + dock height
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ============================================================
     9. SEARCH INPUT FOCUS ANIMATION
     Subtle visual feedback when search is focused
     ============================================================ */
  var searchInput = document.getElementById('searchInput');

  if (searchInput) {
    searchInput.addEventListener('focus', function () {
      this.parentElement.style.boxShadow = '0 0 0 2px rgba(255, 255, 255, 0.1)';
    });

    searchInput.addEventListener('blur', function () {
      this.parentElement.style.boxShadow = 'none';
    });
  }

  /* ============================================================
     10. INITIAL SETUP
     Ensure all animations fire on already-visible elements
     ============================================================ */
  // Trigger scroll handler once
  handleNavbarScroll();

  // Trigger dock center calculation after a brief delay for layout
  setTimeout(function () {
    updateDockCenter();
  }, 100);

})();
