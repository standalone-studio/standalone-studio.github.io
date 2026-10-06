/**
 * Standalone Studio — Main JavaScript
 * Handles:
 * - Dynamic Ecosystem Rendering (Home & Apps page)
 * - Mobile Menu Drawer
 * - Language Switcher (ID/EN)
 * - Slide-down Search Panel
 * - Navbar Scroll & Liquid Glass
 * - FAQ Accordion
 * - Dynamic Favicon
 */
(function () {
  'use strict';

  var SS = window.SS || {};

  /* ============================================================
     1. INITIALIZATION & I18N
     ============================================================ */
  function initI18n() {
    if (SS.i18n) {
      SS.i18n.apply();

      var langBtn = document.getElementById('langToggleBtn');
      if (langBtn) {
        langBtn.addEventListener('click', function () {
          SS.i18n.toggleLang();
          renderEcosystemSections();
        });
      }
    }
  }

  /* ============================================================
     2. NAVBAR SCROLL & MOBILE MENU
     ============================================================ */
  var navbar = document.getElementById('navbar');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuToggle = document.getElementById('mobileMenuToggle');

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

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('active');
      mobileMenu.classList.toggle('active', !isOpen);
      mobileMenuToggle.setAttribute('aria-expanded', !isOpen);

      var icon = mobileMenuToggle.querySelector('.material-symbols-rounded');
      if (icon) {
        icon.textContent = isOpen ? 'menu' : 'close';
      }
    });

    // Close when clicking a link inside mobile menu
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        if (mobileMenuToggle) {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          var icon = mobileMenuToggle.querySelector('.material-symbols-rounded');
          if (icon) icon.textContent = 'menu';
        }
      });
    });
  }

  /* ============================================================
     3. LIQUID GLASS MOUSE TRACKING
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
     4. INTERSECTION OBSERVER - ANIMATIONS
     ============================================================ */
  function initFadeObserver() {
    var fadeElements = document.querySelectorAll('.fade-in:not(.visible), .scale-in:not(.visible)');
    if ('IntersectionObserver' in window && fadeElements.length) {
      var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });

      fadeElements.forEach(function (el) {
        fadeObserver.observe(el);
      });
    } else {
      fadeElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  /* ============================================================
     5. RENDER APPS (ECOSYSTEM)
     ============================================================ */
  function getLocalizedText(obj) {
    if (!obj) return '';
    var lang = (SS.i18n && SS.i18n.currentLang) || 'id';
    return obj[lang] || obj['en'] || obj['id'] || '';
  }

  function getStatusLabel(status) {
    var key = 'status_' + (status || '').replace('-', '_');
    return (SS.i18n && SS.i18n.get(key)) || status;
  }

  function renderEcosystemSections() {
    var currentLang = (SS.i18n && SS.i18n.currentLang) || 'id';

    // 1. Render Active Apps on Homepage (#activeAppsContainer)
    var activeContainer = document.getElementById('activeAppsContainer');
    if (activeContainer && SS.getActiveApps) {
      var activeApps = SS.getActiveApps();
      var html = '';

      activeApps.forEach(function (app, index) {
        var isReverse = (index % 2 === 1) ? 'reverse-layout' : '';
        var tagline = getLocalizedText(app.tagline);
        var description = getLocalizedText(app.description);
        var statusLabel = getStatusLabel(app.status);
        var statusClass = app.status;

        var downloadBtnHtml = '';
        if (app.id === 'paperleaf') {
          var dlUrl = (SS.config && SS.config.paperleafDownloadUrl) || '#';
          downloadBtnHtml = '<a href="' + dlUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary">' +
            '<span class="material-symbols-rounded">download</span> ' +
            (SS.i18n ? SS.i18n.get('btn_download') : 'Unduh di Play Store') +
            '</a>' +
            '<a href="' + (SS.url ? SS.url(app.page) : 'paperleaf/index.html') + '" class="btn btn-secondary">' +
            (SS.i18n ? SS.i18n.get('btn_detail') : 'Pelajari Fitur') +
            '</a>';
        } else {
          downloadBtnHtml = '<span class="status-badge ' + statusClass + '">' +
            '<span class="status-dot"></span> ' + statusLabel +
            '</span>';
        }

        var iconHtml = '';
        if (app.icon) {
          var iconPath = SS.url ? SS.url(app.icon) : app.icon;
          iconHtml = '<img src="' + iconPath + '" alt="' + app.name + ' Icon" loading="lazy">';
        } else {
          iconHtml = '<span class="material-symbols-rounded">' + (app.symbol || 'apps') + '</span>';
        }

        // Preview screenshot or visual block
        var visualHtml = '';
        if (app.screenshots && app.screenshots.length > 0) {
          var ssPath = SS.url ? SS.url(app.screenshots[0]) : app.screenshots[0];
          visualHtml = '<img src="' + ssPath + '" alt="' + app.name + ' Screenshot" loading="lazy">';
        } else {
          visualHtml = '<div class="screenshot-placeholder">' +
            '<span class="material-symbols-rounded">' + (app.symbol || 'devices') + '</span>' +
            '<span>' + statusLabel + '</span>' +
            '</div>';
        }

        html += '<div class="section fade-in" id="' + app.id + '">' +
          '<div class="app-card">' +
          '<div class="app-card-inner ' + isReverse + '">' +
          '<div class="app-card-info">' +
          '<div class="app-card-header">' +
          '<div class="app-card-icon">' + iconHtml + '</div>' +
          '<div>' +
          '<h3 class="app-card-name">' + app.name + '</h3>' +
          '<p class="app-card-slogan">' + tagline + '</p>' +
          '</div>' +
          '</div>' +
          '<p class="body-md">' + description + '</p>' +
          '<div class="app-card-actions">' + downloadBtnHtml + '</div>' +
          '</div>' +
          '<div class="app-card-screenshot">' + visualHtml + '</div>' +
          '</div>' +
          '</div>' +
          '</div>';
      });

      activeContainer.innerHTML = html;
    }

    // 2. Render Roadmap Apps on Homepage (#roadmapAppsContainer)
    var roadmapContainer = document.getElementById('roadmapAppsContainer');
    if (roadmapContainer && SS.getRoadmapApps) {
      var roadmapApps = SS.getRoadmapApps();
      var roadHtml = '<div class="app-grid">';

      roadmapApps.forEach(function (app) {
        var tagline = getLocalizedText(app.tagline);
        var description = getLocalizedText(app.description);
        var statusLabel = getStatusLabel(app.status);

        var iconHtml = '';
        if (app.icon) {
          var iconPath = SS.url ? SS.url(app.icon) : app.icon;
          iconHtml = '<img src="' + iconPath + '" alt="' + app.name + ' Icon" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
            '<span class="material-symbols-rounded" style="display:none;">' + (app.symbol || 'apps') + '</span>';
        } else {
          iconHtml = '<span class="material-symbols-rounded">' + (app.symbol || 'apps') + '</span>';
        }

        roadHtml += '<div class="app-compact-card fade-in" id="' + app.id + '">' +
          '<div class="app-compact-header">' +
          '<div class="app-compact-left">' +
          '<div class="app-compact-icon">' + iconHtml + '</div>' +
          '<div>' +
          '<h4 class="app-compact-name">' + app.name + '</h4>' +
          '<div class="app-compact-tagline">' + tagline + '</div>' +
          '</div>' +
          '</div>' +
          '<span class="status-badge planned">' +
          '<span class="status-dot"></span> ' + statusLabel +
          '</span>' +
          '</div>' +
          '<p class="body-sm">' + description + '</p>' +
          '</div>';
      });

      roadHtml += '</div>';
      roadmapContainer.innerHTML = roadHtml;
    }

    // 3. Render All Apps on Apps Page (#allAppsContainer)
    var allAppsContainer = document.getElementById('allAppsContainer');
    if (allAppsContainer && SS.apps) {
      var allHtml = '<div class="app-grid">';

      SS.apps.forEach(function (app) {
        var tagline = getLocalizedText(app.tagline);
        var description = getLocalizedText(app.description);
        var statusLabel = getStatusLabel(app.status);
        var statusClass = app.status;

        var iconHtml = '';
        if (app.icon) {
          var iconPath = SS.url ? SS.url(app.icon) : app.icon;
          iconHtml = '<img src="' + iconPath + '" alt="' + app.name + ' Icon" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
            '<span class="material-symbols-rounded" style="display:none;">' + (app.symbol || 'apps') + '</span>';
        } else {
          iconHtml = '<span class="material-symbols-rounded">' + (app.symbol || 'apps') + '</span>';
        }

        var linkOpen = app.page ? '<a href="' + (SS.url ? SS.url(app.page) : app.page) + '" style="text-decoration:none;color:inherit;">' : '<div style="cursor:default;">';
        var linkClose = app.page ? '</a>' : '</div>';

        allHtml += linkOpen +
          '<div class="app-compact-card fade-in" id="' + app.id + '">' +
          '<div class="app-compact-header">' +
          '<div class="app-compact-left">' +
          '<div class="app-compact-icon">' + iconHtml + '</div>' +
          '<div>' +
          '<h4 class="app-compact-name">' + app.name + '</h4>' +
          '<div class="app-compact-tagline">' + tagline + '</div>' +
          '</div>' +
          '</div>' +
          '<span class="status-badge ' + statusClass + '">' +
          '<span class="status-dot"></span> ' + statusLabel +
          '</span>' +
          '</div>' +
          '<p class="body-sm">' + description + '</p>' +
          '</div>' +
          linkClose;
      });

      allHtml += '</div>';
      allAppsContainer.innerHTML = allHtml;
    }

    initFadeObserver();
  }

  /* ============================================================
     6. SEARCH PANEL
     ============================================================ */
  var searchToggle = document.getElementById('searchToggle');
  var searchPanel = document.getElementById('searchPanel');

  if (searchToggle && searchPanel) {
    var searchInput = searchPanel.querySelector('input');

    searchToggle.addEventListener('click', function () {
      var isOpen = searchPanel.classList.contains('open');
      searchPanel.classList.toggle('open');
      if (!isOpen && searchInput) {
        setTimeout(function () { searchInput.focus(); }, 120);
      }
    });

    document.addEventListener('click', function (e) {
      if (searchPanel.classList.contains('open') &&
          !searchPanel.contains(e.target) &&
          !searchToggle.contains(e.target)) {
        searchPanel.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchPanel.classList.contains('open')) {
        searchPanel.classList.remove('open');
      }
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var query = this.value.trim().toLowerCase();
        if (!query) {
          document.querySelectorAll('.app-compact-card, .app-card').forEach(function (el) {
            el.style.display = '';
          });
          return;
        }

        document.querySelectorAll('.app-compact-card, .app-card').forEach(function (el) {
          var text = el.textContent.toLowerCase();
          el.style.display = text.indexOf(query) !== -1 ? '' : 'none';
        });
      });
    }
  }

  /* ============================================================
     7. FAQ ACCORDION
     ============================================================ */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          var btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('active', !isActive);
      question.setAttribute('aria-expanded', !isActive);
    });
  });

  /* ============================================================
     8. DYNAMIC FAVICON
     ============================================================ */
  function updateFavicon() {
    var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches || true;
    var favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    var iconRel = isDark ? 'assets/icons/stalone_white.png' : 'assets/icons/stalone_black.png';
    favicon.href = SS.url ? SS.url(iconRel) : iconRel;
  }

  /* ============================================================
     9. RUN ON DOM READY
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initI18n();
    renderEcosystemSections();
    updateFavicon();
    initFadeObserver();
  });

  // Re-render when language changes
  window.addEventListener('ss:languageChanged', function () {
    renderEcosystemSections();
  });

})();
