/**
 * Standalone Studio — App catalog
 * Core Ecosystem: Paperleaf, LeafStudio, LeafPaint.
 */
(function (SS) {
  'use strict';

  SS.apps = [
    {
      id: 'paperleaf',
      name: 'Paperleaf',
      status: 'early-access',
      statusBadge: {
        en: 'Play Store',
        id: 'Play Store'
      },
      icon: 'assets/icons/logo_paperleaf.jpg',
      thumbnail: 'assets/images/Paperleaf_thumbnail.webp',
      screenshots: [
        'assets/screenshots/ss_paperleaf1.webp',
        'assets/screenshots/ss_paperleaf2.webp',
        'assets/screenshots/ss_paperleaf3.webp'
      ],
      symbol: 'menu_book',
      page: 'Paperleaf/index.html',
      tagline: {
        en: 'Your digital scrapbook & authentic journal.',
        id: 'Scrapbook & jurnal digital otentik Anda.'
      },
      description: {
        en: 'Write, sketch, and decorate real page-turning books. Natural pencils, pens, paints, and markers, stickers and photos with automatic background removal — all saved automatically.',
        id: 'Menulis, membuat sketsa, dan menghias buku dengan efek balik halaman 3D yang nyata. Pensil, pena, cat, dan spidol natural, stiker dan foto dengan hapus latar otomatis — semuanya tersimpan otomatis.'
      },
      highlights: {
        en: ['3D Page-turning', 'Natural brushes', 'Automatic save'],
        id: ['Buku balik halaman 3D', 'Kuas natural', 'Simpan otomatis']
      }
    },
    {
      id: 'leafstudio',
      name: 'LeafStudio',
      status: 'planned',
      statusBadge: {
        en: 'Target: Nov 2026',
        id: 'Target: Nov 2026'
      },
      icon: 'assets/icons/leafstudio_icon.webp',
      symbol: 'storefront',
      page: 'leafstudio/index.html',
      actionUrl: 'https://tally.so/r/VpL6rj',
      actionLabel: 'Pre-register',
      tagline: {
        en: 'Creator workspace & asset design.',
        id: 'Ruang kerja kreator & desain aset.'
      },
      description: {
        en: 'The creator workspace of the ecosystem. Design custom notebook templates, expressive brushes, graphic stickers, and cover themes, then publish your creations for Paperleaf users.',
        id: 'Ruang kerja kreator terpadu. Rancang template buku, kuas lukis, stiker grafis, hingga tema sampul kustom, lalu terbitkan karya Anda untuk seluruh komunitas Paperleaf.'
      },
      highlights: {
        en: ['For creators', 'Publish assets', 'November 2026'],
        id: ['Untuk kreator', 'Terbitkan aset', 'November 2026']
      }
    },
    {
      id: 'leafpaint',
      name: 'LeafPaint',
      status: 'development',
      statusBadge: {
        en: 'Target: Jan 2027',
        id: 'Target: Jan 2027'
      },
      icon: 'assets/icons/leaf_paint.png',
      thumbnail: 'assets/images/Leafpaint_thumbnail.webp',
      symbol: 'brush',
      page: 'leafpaint/index.html',
      tagline: {
        en: 'Precision digital painting studio.',
        id: 'Studio seni lukis digital presisi.'
      },
      description: {
        en: 'A full digital painting studio with advanced layers, expressive natural brushes, and a distraction-free canvas — built specifically for illustrators on Android.',
        id: 'Studio lukis digital lengkap dengan sistem layer canggih, kuas ekspresif alami, dan kanvas luas bebas distraksi — dirancang khusus untuk ilustrator dan seniman visual di Android.'
      },
      highlights: {
        en: ['Advanced layers', 'Expressive brushes', 'January 2027'],
        id: ['Sistem layer', 'Kuas ekspresif', 'Januari 2027']
      }
    }
  ];

  /** Public apps (all 3 core apps). */
  SS.getPublicApps = function () {
    return SS.apps;
  };

  /** Active apps on the home page. */
  SS.getActiveApps = function () {
    return SS.apps;
  };

  /** No roadmap items — studio is strictly focused on 3 core apps. */
  SS.getRoadmapApps = function () {
    return [];
  };

  SS.getApp = function (id) {
    for (var i = 0; i < SS.apps.length; i++) {
      if (SS.apps[i].id === id) return SS.apps[i];
    }
    return null;
  };
})(window.SS);
