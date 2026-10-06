/**
 * Standalone Studio — Sistem Internasionalisasi (i18n)
 * Mendukung dwibahasa: Bahasa Indonesia (id) & English (en).
 */
(function (SS) {
  'use strict';

  if (!SS) return;

  const translations = {
    en: {
      // Navbar
      nav_apps: "Apps",
      nav_market: "Market",
      nav_support: "Support",
      nav_about: "About",
      nav_search: "Search",

      // Hero
      hero_badge: "CREATIVE ECOSYSTEM FOR ANDROID",
      hero_title: "Empowering Creative Minds",
      hero_desc: "A cohesive suite of thoughtful creative tools tailored for digital artists, writers, and note-makers on Android.",
      hero_explore: "Explore Apps",
      hero_learn_more: "Learn More",

      // Section titles
      section_apps_title: "Featured Applications",
      section_apps_desc: "Modern digital tools crafted with precision and simplicity.",
      section_roadmap_title: "Ecosystem Roadmap",
      section_roadmap_desc: "Upcoming applications designed to complete your digital creative workspace.",
      section_ready_title: "Ready to start creating?",
      section_ready_desc: "Join creators embracing our digital creative ecosystem on Android.",

      // App statuses
      status_early_access: "Preview Release",
      status_testing: "Beta Testing",
      status_development: "In Development",
      status_planned: "Coming Soon",

      // CTAs
      btn_download: "Get on Play Store",
      btn_detail: "Learn More",
      btn_coming_soon: "Coming Soon",
      btn_back_apps: "Back to Apps",
      btn_back_home: "Back to Home",

      // Market Preview
      market_title: "LeafMarket & Assets",
      market_desc: "High quality books, templates, custom brushes, and covers created for your workflow.",
      market_books: "Digital Books",
      market_books_desc: "Curated templates and illustrated books.",
      market_brushes: "Brushes & Textures",
      market_brushes_desc: "Natural artistic textures and custom strokes.",
      market_stickers: "Stickers & Stamps",
      market_stickers_desc: "Decorative assets and artistic vector stamps.",
      market_themes: "Covers & Themes",
      market_themes_desc: "Expressive notebook themes and covers.",

      // Footer
      footer_privacy: "Privacy Policy",
      footer_delete_account: "Delete Account",
      footer_tos: "Terms of Service",
      footer_support: "Support",
      footer_about: "About",
      footer_rights: "All rights reserved.",

      // Search & General
      search_placeholder: "Search applications, features, or assets...",
      no_results: "No results found."
    },
    id: {
      // Navbar
      nav_apps: "Aplikasi",
      nav_market: "Pasar Aset",
      nav_support: "Dukungan",
      nav_about: "Tentang Kami",
      nav_search: "Cari",

      // Hero
      hero_badge: "EKOSISTEM KREATIF UNTUK ANDROID",
      hero_title: "Mendukung Daya Cipta Anda",
      hero_desc: "Rangkaian aplikasi kreatif modern yang dirancang khusus untuk seniman digital, penulis, dan pembuat catatan di Android.",
      hero_explore: "Jelajahi Aplikasi",
      hero_learn_more: "Pelajari Lebih Lanjut",

      // Section titles
      section_apps_title: "Aplikasi Unggulan",
      section_apps_desc: "Alat digital mutakhir yang dirancang dengan presisi, keindahan, dan kemudahan penggunaan.",
      section_roadmap_title: "Peta Jalan Ekosistem",
      section_roadmap_desc: "Aplikasi mendatang yang dirancang untuk melengkapi ruang kerja kreatif digital Anda.",
      section_ready_title: "Siap untuk mulai berkarya?",
      section_ready_desc: "Bergabunglah dengan para kreator yang menggunakan ekosistem kreatif kami di Android.",

      // App statuses
      status_early_access: "Pratinjau Play Store",
      status_testing: "Tahap Pengujian",
      status_development: "Tahap Pengembangan",
      status_planned: "Segera Hadir",

      // CTAs
      btn_download: "Unduh di Play Store",
      btn_detail: "Pelajari Fitur",
      btn_coming_soon: "Segera Hadir",
      btn_back_apps: "Kembali ke Aplikasi",
      btn_back_home: "Kembali ke Beranda",

      // Market Preview
      market_title: "LeafMarket & Aset Kreator",
      market_desc: "Buku, template, kuas artistik, dan sampul pilihan yang dirancang untuk alur kerja Anda.",
      market_books: "Buku Digital",
      market_books_desc: "Template buku catatan dan buku bergambar pilihan.",
      market_brushes: "Kuas & Tekstur",
      market_brushes_desc: "Tekstur seni alami dan goresan kuas khusus.",
      market_stickers: "Stiker & Ornamen",
      market_stickers_desc: "Aset dekoratif dan stempel ilustrasi artistik.",
      market_themes: "Sampul & Tema",
      market_themes_desc: "Tema buku catatan dan desain sampul ekspresif.",

      // Footer
      footer_privacy: "Kebijakan Privasi",
      footer_delete_account: "Hapus Akun & Data",
      footer_tos: "Syarat & Ketentuan",
      footer_support: "Pusat Bantuan",
      footer_about: "Tentang",
      footer_rights: "Hak cipta dilindungi undang-undang.",

      // Search & General
      search_placeholder: "Cari aplikasi, fitur, atau aset...",
      no_results: "Tidak ada hasil ditemukan."
    }
  };

  const STORAGE_KEY = (SS.config && SS.config.storageKeyLang) || 'ss_lang';

  SS.i18n = {
    currentLang: localStorage.getItem(STORAGE_KEY) || 'id',

    get(key) {
      const lang = this.currentLang;
      if (translations[lang] && translations[lang][key]) {
        return translations[lang][key];
      }
      if (translations.en && translations.en[key]) {
        return translations.en[key];
      }
      return key;
    },

    setLang(lang) {
      if (translations[lang]) {
        this.currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
        this.apply();
        // Dispatch custom event agar halaman bisa re-render jika dibutuhkan
        window.dispatchEvent(new CustomEvent('ss:languageChanged', { detail: { lang } }));
      }
    },

    toggleLang() {
      const next = this.currentLang === 'id' ? 'en' : 'id';
      this.setLang(next);
      return next;
    },

    apply() {
      // Perbarui elemen dengan atribut data-i18n
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const text = this.get(key);
        if (text) {
          el.textContent = text;
        }
      });

      // Perbarui placeholder dengan data-i18n-placeholder
      document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        const text = this.get(key);
        if (text) {
          el.setAttribute('placeholder', text);
        }
      });

      // Perbarui label bahasa toggle di tombol navbar
      const langBtn = document.getElementById('langToggleBtn');
      if (langBtn) {
        langBtn.textContent = this.currentLang.toUpperCase();
        langBtn.setAttribute('aria-label', `Change language (Current: ${this.currentLang.toUpperCase()})`);
      }
    }
  };
})(window.SS);
