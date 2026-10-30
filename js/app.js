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
        var statusLabel = (app.statusBadge && getLocalizedText(app.statusBadge)) || getStatusLabel(app.status);
        var statusClass = app.status;

        var downloadBtnHtml = '';
        if (app.id === 'paperleaf') {
          var dlUrl = (SS.config && SS.config.paperleafDownloadUrl) || 'https://play.google.com/store/apps/details?id=com.paperleaf.scrapbook';
          downloadBtnHtml = '<a href="' + dlUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary">' +
            '<span class="material-symbols-rounded">download</span> ' +
            (SS.i18n ? SS.i18n.get('btn_download') : 'Unduh di Play Store') +
            '</a>' +
            '<a href="' + (SS.url ? SS.url(app.page) : 'Paperleaf/index.html') + '" class="btn btn-secondary">' +
            (SS.i18n ? SS.i18n.get('btn_detail') : 'Pelajari Fitur') +
            '</a>';
        } else if (app.id === 'leafstudio' || app.actionUrl) {
          var targetUrl = app.actionUrl || 'https://tally.so/r/VpL6rj';
          var btnLabel = app.actionLabel || (SS.i18n ? SS.i18n.get('btn_preregister') : 'Pre-register');
          downloadBtnHtml = '<a href="' + targetUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary">' +
            '<span class="material-symbols-rounded">how_to_reg</span> ' +
            btnLabel +
            '</a>' +
            (app.page ? '<a href="' + (SS.url ? SS.url(app.page) : app.page) + '" class="btn btn-secondary">' +
              (SS.i18n ? SS.i18n.get('btn_detail') : 'Pelajari Fitur') +
              '</a>' : '');
        } else {
          downloadBtnHtml = (app.page ? '<a href="' + (SS.url ? SS.url(app.page) : app.page) + '" class="btn btn-secondary">' +
            '<span class="material-symbols-rounded">visibility</span> ' +
            (SS.i18n ? SS.i18n.get('btn_detail') : 'Pelajari Fitur') +
            '</a>' : '');
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
        var visualSource = app.thumbnail || (app.screenshots && app.screenshots.length > 0 ? app.screenshots[0] : null);
        if (visualSource) {
          var ssPath = SS.url ? SS.url(visualSource) : visualSource;
          visualHtml = '<img src="' + ssPath + '" alt="' + app.name + ' Thumbnail" loading="lazy" onerror="this.onerror=null;if(this.src.indexOf(\'Leaaf\')===-1&&this.src.indexOf(\'Leaf\')!==-1){this.src=\'assets/images/LeaafPaint_thumbnail.webp\';}else{this.style.display=\'none\';}">';
        } else {
          visualHtml = '<div class="screenshot-placeholder">' +
            '<div style="width:68px;height:68px;border-radius:20px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;margin-bottom:8px;">' +
            '<span class="material-symbols-rounded" style="font-size:36px;color:#FFFFFF;">' + (app.symbol || 'storefront') + '</span>' +
            '</div>' +
            '<div style="font-size:1.25rem;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;">' + app.name + '</div>' +
            '<span class="status-badge ' + statusClass + '" style="margin-top:6px;">' +
            '<span class="status-dot"></span> ' + statusLabel +
            '</span>' +
            '</div>';
        }

        html += '<div class="section fade-in" id="' + app.id + '">' +
          '<div class="app-card">' +
          '<div class="app-card-inner ' + isReverse + '">' +
          '<div class="app-card-info">' +
          '<div class="app-card-header">' +
          '<div class="app-card-icon">' + iconHtml + '</div>' +
          '<div>' +
          '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;">' +
          '<h3 class="app-card-name" style="margin:0;">' + app.name + '</h3>' +
          '<span class="status-badge ' + statusClass + '">' +
          '<span class="status-dot"></span> ' + statusLabel +
          '</span>' +
          '</div>' +
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
      var roadmapSection = roadmapContainer.closest('section');

      if (!roadmapApps || roadmapApps.length === 0) {
        if (roadmapSection) roadmapSection.style.display = 'none';
        roadmapContainer.innerHTML = '';
      } else {
        if (roadmapSection) roadmapSection.style.display = '';
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
    }

    // 3. Render All Apps on Apps Page (#allAppsContainer)
    var allAppsContainer = document.getElementById('allAppsContainer');
    if (allAppsContainer && (SS.getPublicApps || SS.apps)) {
      var publicApps = SS.getPublicApps ? SS.getPublicApps() : SS.apps.filter(function (a) { return !a.private; });
      var allHtml = '<div class="app-grid">';

      publicApps.forEach(function (app) {
        var tagline = getLocalizedText(app.tagline);
        var description = getLocalizedText(app.description);
        var statusLabel = (app.statusBadge && getLocalizedText(app.statusBadge)) || getStatusLabel(app.status);
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
     9. SMOOTH PAGE & CONTENT TRANSITIONS
     ============================================================ */
  function initPageTransitions() {
    // 1. Reset status transisi ketika halaman ditampilkan kembali dari browser cache (bfcache)
    window.addEventListener('pageshow', function () {
      document.body.classList.remove('is-page-exiting');
      document.body.classList.remove('page-enter-init');
    });

    // 2. Transisi halus saat mengklik tautan internal
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href) return;

      // Abaikan target tab baru, download, tautan khusus, anchor lokal
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var currentUrl = new URL(window.location.href);
      var targetUrl;
      try {
        targetUrl = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }

      // Pastikan domain sama
      if (targetUrl.origin !== currentUrl.origin) return;

      // Jika hanya berpindah hash pada halaman yang sama, jangan reload transisi
      if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search && targetUrl.hash) return;
      if (targetUrl.href === currentUrl.href) return;

      // Jalankan animasi transisi keluar mulus
      e.preventDefault();
      document.body.classList.add('is-page-exiting');

      setTimeout(function () {
        window.location.href = targetUrl.href;
      }, 200);
    });
  }

  /* ============================================================
     10. LEAF MARKET - SUPABASE LIVE ASSETS & CATALOG
     ============================================================ */
  function initLeafMarket() {
    var container = document.getElementById('marketAssetsContainer');
    if (!container) return;

    var filterBar = document.getElementById('marketFilterBar');
    var currentFilter = 'all';
    var allAssets = [];

    var categoryLabels = {
      'COVER': { label: 'Sampul Buku', icon: 'auto_stories' },
      'BOOK': { label: 'Buku', icon: 'menu_book' },
      'TEMPLATE': { label: 'Template', icon: 'description' },
      'STICKER': { label: 'Sticker', icon: 'sentiment_satisfied' },
      'THEME': { label: 'Tema', icon: 'palette' }
    };

    // Auto-select category dari URL query (?category=...) atau hash (#...)
    var urlParams = new URLSearchParams(window.location.search);
    var targetCat = urlParams.get('category');
    if (!targetCat && window.location.hash) {
      var h = window.location.hash.replace('#', '').toUpperCase();
      if (h === 'SAMPUL' || h === 'COVER') targetCat = 'COVER';
      else if (h === 'BUKU' || h === 'BOOK') targetCat = 'BOOK';
      else if (h === 'TEMPLATE' || h === 'TEMPLAT') targetCat = 'TEMPLATE';
      else if (h === 'STICKER' || h === 'STIKER') targetCat = 'STICKER';
      else if (h === 'TEMA' || h === 'THEME') targetCat = 'THEME';
    }
    if (targetCat && ['COVER', 'BOOK', 'TEMPLATE', 'STICKER', 'THEME'].indexOf(targetCat) !== -1) {
      currentFilter = targetCat;
      if (filterBar) {
        filterBar.querySelectorAll('.market-filter-btn').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-filter') === currentFilter);
        });
      }
    }

    function renderAssets(assets) {
      if (!assets || assets.length === 0) {
        container.innerHTML =
          '<div class="market-empty-state">' +
          '<span class="material-symbols-rounded">inventory_2</span>' +
          '<h3 class="heading-sm mb-8">Belum Ada Aset di Kategori Ini</h3>' +
          '<p class="body-sm">Aset baru akan segera hadir dari komunitas kreator di LeafStudio.</p>' +
          '</div>';
        return;
      }

      var html = '';
      assets.forEach(function (asset, index) {
        var rawCat = (asset.category || '').toUpperCase();
        var catInfo = categoryLabels[rawCat] || { label: asset.category || 'Aset', icon: 'category' };
        var priceText = asset.price || (asset.is_premium ? 'Premium' : 'Gratis');
        var isFree = !asset.is_premium || priceText.toLowerCase() === 'free' || priceText.toLowerCase() === 'gratis';
        var priceClass = isFree ? 'free' : '';
        var previewImg = asset.preview_url || asset.thumbnail_url || asset.file_url || '';
        var title = asset.title || asset.name || 'Aset Paperleaf';
        var slogan = asset.slogan || asset.description || '';
        var author = asset.author || 'Paperleaf';

        var thumbHtml = previewImg
          ? '<img src="' + previewImg + '" alt="' + title + '" class="market-card-thumb" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
            '<div class="market-card-thumb-placeholder" style="display:none;"><span class="material-symbols-rounded">' + catInfo.icon + '</span></div>'
          : '<div class="market-card-thumb-placeholder"><span class="material-symbols-rounded">' + catInfo.icon + '</span></div>';

        html +=
          '<div class="market-card fade-in visible" data-index="' + index + '">' +
            '<div class="market-card-thumb-wrap">' +
              thumbHtml +
              '<span class="market-card-category-badge">' + catInfo.label + '</span>' +
              '<span class="market-card-price-badge ' + priceClass + '">' + priceText + '</span>' +
            '</div>' +
            '<div class="market-card-body">' +
              '<h3 class="market-card-title">' + title + '</h3>' +
              '<p class="market-card-slogan">' + slogan + '</p>' +
              '<div class="market-card-footer">' +
                '<span>Oleh ' + author + '</span>' +
                '<span class="market-card-action-btn">Detail <span class="material-symbols-rounded">arrow_forward</span></span>' +
              '</div>' +
            '</div>' +
          '</div>';
      });

      container.innerHTML = html;
      bindCardClicks(assets);
    }

    function filterAssets() {
      if (currentFilter === 'all') {
        renderAssets(allAssets);
      } else if (currentFilter === 'COVER') {
        renderAssets(allAssets.filter(function (a) {
          var c = (a.category || '').toUpperCase();
          return c.indexOf('COVER') !== -1;
        }));
      } else if (currentFilter === 'BOOK') {
        renderAssets(allAssets.filter(function (a) {
          var c = (a.category || '').toUpperCase();
          return (c === 'BOOK' || c === 'BOOKS' || c === 'BOOK_READONLY') && c.indexOf('TEMPLATE') === -1;
        }));
      } else if (currentFilter === 'TEMPLATE') {
        renderAssets(allAssets.filter(function (a) {
          var c = (a.category || '').toUpperCase();
          var bt = (a.book_type || '').toUpperCase();
          return c.indexOf('TEMPLATE') !== -1 || bt.indexOf('TEMPLATE') !== -1;
        }));
      } else if (currentFilter === 'STICKER') {
        renderAssets(allAssets.filter(function (a) {
          var c = (a.category || '').toUpperCase();
          return c.indexOf('STICKER') !== -1;
        }));
      } else if (currentFilter === 'THEME') {
        renderAssets(allAssets.filter(function (a) {
          var c = (a.category || '').toUpperCase();
          return c.indexOf('THEME') !== -1;
        }));
      } else {
        renderAssets(allAssets.filter(function (a) {
          return (a.category || '').toUpperCase().indexOf(currentFilter) !== -1;
        }));
      }
    }

    // Filter Buttons Listener
    if (filterBar) {
      filterBar.querySelectorAll('.market-filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          filterBar.querySelectorAll('.market-filter-btn').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          currentFilter = btn.getAttribute('data-filter') || 'all';
          filterAssets();
        });
      });
    }

    // Modal Handling
    var modal = document.getElementById('marketDetailModal');
    var modalOverlay = document.getElementById('marketModalOverlay');
    var modalClose = document.getElementById('marketModalClose');

    function openModal(asset) {
      if (!modal) return;
      var rawCat = (asset.category || '').toUpperCase();
      var catInfo = categoryLabels[rawCat] || { label: asset.category || 'Aset', icon: 'category' };
      var previewImg = asset.preview_url || asset.thumbnail_url || asset.file_url || '';
      var priceText = asset.price || (asset.is_premium ? 'Premium' : 'Gratis');
      var isFree = !asset.is_premium || priceText.toLowerCase() === 'free' || priceText.toLowerCase() === 'gratis';

      var previewWrap = document.getElementById('modalPreviewWrap');
      if (previewWrap) {
        previewWrap.innerHTML = previewImg
          ? '<img src="' + previewImg + '" alt="' + (asset.title || '') + '">'
          : '<span class="material-symbols-rounded" style="font-size: 64px; color: #555;">' + catInfo.icon + '</span>';
      }

      var catBadge = document.getElementById('modalCategoryBadge');
      if (catBadge) catBadge.textContent = catInfo.label;

      var priceBadge = document.getElementById('modalPriceBadge');
      if (priceBadge) {
        priceBadge.textContent = priceText;
        priceBadge.className = 'market-card-price-badge ' + (isFree ? 'free' : '');
      }

      var modalTitle = document.getElementById('modalTitle');
      if (modalTitle) modalTitle.textContent = asset.title || 'Aset Paperleaf';

      var modalSlogan = document.getElementById('modalSlogan');
      if (modalSlogan) modalSlogan.textContent = asset.slogan || '';

      var modalDesc = document.getElementById('modalDescription');
      if (modalDesc) modalDesc.textContent = asset.description || 'Gunakan aset pilihan ini untuk mempercantik jurnal, buku, dan halaman kreasi Anda di Paperleaf.';

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });

    function bindCardClicks(assets) {
      container.querySelectorAll('.market-card').forEach(function (card) {
        card.addEventListener('click', function () {
          var idx = parseInt(card.getAttribute('data-index'), 10);
          if (!isNaN(idx) && assets[idx]) {
            openModal(assets[idx]);
          }
        });
      });
    }

    // Load from cache first for instantaneous rendering
    var cacheKey = 'ss_market_assets_cache';
    try {
      var cached = localStorage.getItem(cacheKey);
      if (cached) {
        var parsedCache = JSON.parse(cached);
        if (Array.isArray(parsedCache) && parsedCache.length > 0) {
          allAssets = parsedCache;
          filterAssets();
        }
      }
    } catch (e) {}

    // Fetch live from Supabase
    var sb = SS.config && SS.config.supabase;
    if (!sb || !sb.url || !sb.anonKey) return;

    var endpoint = sb.url + '/rest/v1/' + (sb.table || 'market_assets') + '?status=neq.archived&order=priority_order.desc,created_at.desc&select=*';

    fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': sb.anonKey,
        'Authorization': 'Bearer ' + sb.anonKey,
        'Accept': 'application/json'
      }
    })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      if (Array.isArray(data)) {
        allAssets = data;
        try {
          localStorage.setItem(cacheKey, JSON.stringify(data));
        } catch (e) {}
        filterAssets();
      }
    })
    .catch(function (err) {
      console.warn('Gagal mengambil aset dari Supabase:', err);
      if (allAssets.length === 0) {
        container.innerHTML =
          '<div class="market-empty-state">' +
          '<span class="material-symbols-rounded">cloud_off</span>' +
          '<h3 class="heading-sm mb-8">Tidak Dapat Menghubungkan ke Katalog Aset</h3>' +
          '<p class="body-sm">Silakan periksa koneksi internet Anda atau coba beberapa saat lagi.</p>' +
          '</div>';
      }
    });
  }

  /* ============================================================
     11. RUN ON DOM READY
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initI18n();
    renderEcosystemSections();
    updateFavicon();
    initFadeObserver();
    initPageTransitions();
    initLeafMarket();
  });

  // Re-render when language changes
  window.addEventListener('ss:languageChanged', function () {
    renderEcosystemSections();
    initLeafMarket();
  });

})();
