/**
 * Standalone Studio — App catalog
 * All ecosystem apps live here. Pages render from this data, so adding or
 * updating an app only requires editing this file (+ icon in assets/icons).
 *
 * status: 'early-access' | 'testing' | 'development' | 'planned'
 * icon:   path relative to site root. If the file is missing, the
 *         Material Symbol in `symbol` is shown as a fallback.
 */
(function (SS) {
  'use strict';

  SS.apps = [
    {
      id: 'paperleaf',
      name: 'Paperleaf',
      status: 'early-access',
      icon: 'assets/icons/logo_paperleaf.jpg',
      screenshots: [
        'assets/screenshots/ss_paperleaf1.webp',
        'assets/screenshots/ss_paperleaf2.webp',
        'assets/screenshots/ss_paperleaf3.webp'
      ],
      symbol: 'menu_book',
      page: 'Paperleaf/index.html',
      tagline: {
        en: 'Your digital scrapbook & journal.',
        id: 'Scrapbook & jurnal digital Anda.'
      },
      description: {
        en: 'Write, sketch and decorate real page-turning books. Natural pencils, pens, paints and markers, stickers and photos with automatic background removal — all saved automatically.',
        id: 'Menulis, membuat sketsa, dan menghias buku dengan efek balik halaman yang nyata. Pensil, pena, cat, dan spidol yang natural, stiker dan foto dengan hapus latar otomatis — semuanya tersimpan otomatis.'
      },
      highlights: {
        en: ['Page-turning books', 'Natural brushes', 'Stickers & photos'],
        id: ['Buku balik halaman', 'Kuas natural', 'Stiker & foto']
      }
    },
    {
      id: 'leafpaint',
      name: 'LeafPaint',
      status: 'testing',
      icon: 'assets/icons/leaf_paint.png',
      symbol: 'brush',
      tagline: {
        en: 'Professional digital painting.',
        id: 'Melukis digital profesional.'
      },
      description: {
        en: 'A full digital painting studio with layers, expressive brushes and a distraction-free canvas — built for illustrators on Android tablets and phones.',
        id: 'Studio lukis digital lengkap dengan layer, kuas ekspresif, dan kanvas bebas gangguan — dibuat untuk ilustrator di tablet dan ponsel Android.'
      },
      highlights: {
        en: ['Layers', 'Expressive brushes', 'Large canvas'],
        id: ['Layer', 'Kuas ekspresif', 'Kanvas besar']
      }
    },
    {
      id: 'leafly',
      name: 'Leafly',
      status: 'development',
      icon: 'assets/icons/leafly_icon.webp',
      symbol: 'animation',
      tagline: {
        en: 'Bring your drawings to life.',
        id: 'Hidupkan gambar Anda.'
      },
      description: {
        en: 'Frame-by-frame animation with onion skin, timeline and playback — turn sketches into moving stories.',
        id: 'Animasi frame demi frame dengan onion skin, timeline, dan pemutaran — ubah sketsa menjadi cerita yang bergerak.'
      },
      highlights: {
        en: ['Frame-by-frame', 'Onion skin', 'Timeline'],
        id: ['Frame demi frame', 'Onion skin', 'Timeline']
      }
    },
    {
      id: 'leafstudio',
      name: 'LeafStudio',
      status: 'development',
      icon: 'assets/icons/leafstudio_icon.webp',
      symbol: 'storefront',
      tagline: {
        en: 'Create and sell your assets.',
        id: 'Buat dan jual aset Anda.'
      },
      description: {
        en: 'The creator workspace of the ecosystem. Design books, templates, brushes, stickers, themes and covers, then publish them for Paperleaf users.',
        id: 'Ruang kerja kreator di ekosistem. Rancang buku, template, kuas, stiker, tema, dan sampul, lalu terbitkan untuk pengguna Paperleaf.'
      },
      highlights: {
        en: ['For creators', 'Publish assets', 'Earn from your work'],
        id: ['Untuk kreator', 'Terbitkan aset', 'Hasilkan dari karya']
      }
    },

    /* ---------- Roadmap ---------- */
    {
      id: 'leafmarket',
      name: 'LeafMarket',
      status: 'planned',
      icon: 'assets/icons/leafmarket_icon.webp',
      symbol: 'shopping_bag',
      page: 'store.html',
      tagline: { en: 'Marketplace for creator assets.', id: 'Pasar aset kreator.' },
      description: {
        en: 'Discover books, templates, brushes and stickers made by creators for the ecosystem.',
        id: 'Temukan buku, template, kuas, dan stiker buatan kreator untuk ekosistem.'
      }
    },
    {
      id: 'leafbook',
      name: 'LeafBook',
      status: 'planned',
      icon: 'assets/icons/leafbook_icon.webp',
      symbol: 'auto_stories',
      tagline: { en: 'Read digital books.', id: 'Baca buku digital.' },
      description: {
        en: 'A comfortable reader for e-books and illustrated books from creators.',
        id: 'Pembaca yang nyaman untuk e-book dan buku bergambar dari kreator.'
      }
    },
    {
      id: 'leafmusic',
      name: 'LeafMusic',
      status: 'planned',
      icon: 'assets/icons/leafmusic_icon.webp',
      symbol: 'music_note',
      tagline: { en: 'Your music library.', id: 'Perpustakaan musik Anda.' },
      description: {
        en: 'Play and organize your music collection in one beautiful place.',
        id: 'Putar dan kelola koleksi musik Anda di satu tempat yang indah.'
      }
    },
    {
      id: 'leafbox',
      name: 'LeafBox',
      status: 'planned',
      icon: 'assets/icons/leafbox_icon.webp',
      symbol: 'cloud',
      tagline: { en: 'Cloud storage for your work.', id: 'Penyimpanan cloud untuk karya Anda.' },
      description: {
        en: 'Store, back up and sync files across every app in the ecosystem.',
        id: 'Simpan, cadangkan, dan sinkronkan file di semua aplikasi ekosistem.'
      }
    },
    {
      id: 'leafriend',
      name: 'Leafriend',
      status: 'planned',
      icon: 'assets/icons/leafriend_icon.webp',
      symbol: 'group',
      tagline: { en: 'Share and connect.', id: 'Berbagi dan terhubung.' },
      description: {
        en: 'A social space to share your creations and follow other creators.',
        id: 'Ruang sosial untuk membagikan karya dan mengikuti kreator lain.'
      }
    },
    {
      id: 'leafed',
      name: 'Leafed',
      status: 'planned',
      icon: 'assets/icons/leafed_icon.webp',
      symbol: 'design_services',
      tagline: { en: 'Vector & graphic design.', id: 'Desain grafis & vektor.' },
      description: {
        en: 'Precise vector tools for logos, layouts and illustrations.',
        id: 'Alat vektor presisi untuk logo, tata letak, dan ilustrasi.'
      }
    }
  ];

  /** Apps that already exist (shown in the main list). */
  SS.getActiveApps = function () {
    return SS.apps.filter(function (a) { return a.status !== 'planned'; });
  };

  /** Apps on the roadmap (coming soon). */
  SS.getRoadmapApps = function () {
    return SS.apps.filter(function (a) { return a.status === 'planned'; });
  };

  SS.getApp = function (id) {
    for (var i = 0; i < SS.apps.length; i++) {
      if (SS.apps[i].id === id) return SS.apps[i];
    }
    return null;
  };
})(window.SS);
