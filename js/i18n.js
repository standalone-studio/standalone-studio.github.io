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
      nav_market: "Leaf Market",
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
      btn_preregister: "Pre-register",
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
      no_results: "No results found.",

      // About & Ecosystem
      about_hero_badge: "STANDALONE STUDIO",
      about_hero_title: "Unlocking Boundless Space for Every Creative Mind",
      about_hero_desc: "An independent development studio dedicated to bridging the quality gap on Android through aesthetic design, fluid performance, and uncompromised creative freedom.",
      about_eco_label: "Our Ecosystem",
      about_eco_title: "One Unified Ecosystem for the Entire Android Creative Workflow",
      about_eco_p1: "Stand Alone Studio is an independent software studio focused on creating top-tier digital creative applications and ecosystems for Android users worldwide. Born from a determination to bring refined aesthetics, high responsiveness, and intuitive interactions on par with global benchmarks.",
      about_pilar1_title: "Redefining Android UI/UX",
      about_pilar1_desc: "Delivering thoughtful, minimalist, and aesthetically elevated interfaces across every application we design.",
      about_pilar2_title: "Empowering Creators",
      about_pilar2_desc: "Building a seamless workflow from initial ideation and visual creation to publishing assets for the digital creator economy.",
      about_pilar3_title: "Quality & Sustainability",
      about_pilar3_desc: "Ensuring long-term reliability and responsive performance through transparent and fair business models.",
      about_products_title: "Three Core Ecosystem Applications",
      about_prod_paperleaf: "An authentic digital scrapbook and journal featuring real 3D page-turning simulation, expressive natural brushes, and background auto-save.",
      about_prod_leafpaint: "A dedicated digital painting studio equipped with advanced layer controls, precision stylus dynamics, and a distraction-free canvas.",
      about_prod_leafstudio: "An integrated creator workspace to design custom book templates, expressive brushes, graphic stickers, and cover themes.",
      about_leaf_label: "The Philosophy of Leaves",
      about_leaf_title: "The Meaning of 'Leaf' Behind Every Creation",
      about_leaf_desc: "A single leaf is not merely a visual symbol, but an overarching thread running through every tool built in this studio:",
      about_leaf1_title: "Life & Growth",
      about_leaf1_desc: "Leaves provide oxygen. Each application is crafted to give breath and fertile soil for creative ideas to flourish without artificial bounds.",
      about_leaf2_title: "Organic Process",
      about_leaf2_desc: "Writing, painting, and journaling are designed to flow calmly and naturally, like a leaf drifting gently with the autumn wind.",
      about_leaf3_title: "Rebirth & Opportunity",
      about_leaf3_desc: "Fallen leaves nourish the ground. The philosophy of transforming past adversity into fertile ground that empowers other creators.",

      // Developer Story
      dev_section_label: "About the Developer",
      dev_section_title: "Behind the Canvas: Standing on One's Own",
      dev_badge: "Founder & Solo Developer",
      dev_origin: "Tasikmalaya, February 20, 1996 • Solo Engineer & Designer",
      dev_quote: "\"Giving others the opportunity to discover and express their own creativity.\"",
      dev_ch1_num: "Chapter I",
      dev_ch1_title: "Hearth Smoke at Dawn and a Sheet of Drawing Paper",
      dev_ch1_p1: "Born on a festive holiday in Tasikmalaya to a humble family, Said Attaufiq’s earliest days were shaped by the quiet resilience of a mother tending traditional hearth fires before dawn. Growing up fatherless and without an anchor to steer his boyhood, he often felt out of place in the typical pastimes of other boys.",
      dev_ch1_p2: "Until one day, a simple encounter on the floor with a childhood friend holding drawing tools unlocked a quiet universe. They drew side by side, laughing over abstract shapes while admiring each other’s imagination. There, the realm of art spoke to him for the very first time. Upon a blank sheet of paper, his soul discovered its very first sanctuary—a place where he felt whole, understood, and free.",
      dev_ch2_num: "Chapter II",
      dev_ch2_title: "Finding a Voice in the Silence",
      dev_ch2_p1: "His quiet sensitivity and innate affinity for visual arts were often misunderstood by the world around him. Enduring painful trials and lacking a safe harbor to lean on, he learned early on to shield his heart within prolonged silence.",
      dev_ch2_p2: "During his vocational school years studying computer systems, the quiet corners of the library became his refuge. Amid silent bookshelves, handwritten short stories, and sketch sheets, he wove a deep devotion to literature, visual art, and computing—learning to channel personal pain into a calm, resilient inner strength.",
      dev_ch3_num: "Chapter III",
      dev_ch3_title: "Steps Through the Storm (Garut, 2018)",
      dev_ch3_p1: "The year 2018 marked the darkest nadir of his journey. Alienation, grief, and an overwhelming sense of worthlessness nearly extinguished his will to endure. Yet at the precipice of despair, a quiet resolve sparked a desire to seek a new course in life.",
      dev_ch3_p2: "Carrying a heavy backpack, he set out on foot—trekking dozens of kilometers from Tasikmalaya to Pesantren Attaufiq in Ciucing, Garut. Along those grueling miles, he encountered unexpected, unprompted kindness from strangers: free rides, gentle smiles, humble roadside meals shared with travelers, and a loyal friend who rode out to meet him halfway. Those tender gestures steadily shattered his despair, proving that the world still held warmth, grace, and hope.",
      dev_ch4_num: "Chapter IV",
      dev_ch4_title: "Said Attaufiq: Finding a Place Called Home",
      dev_ch4_p1: "Upon his arrival at Pesantren Attaufiq, he was not greeted with judgment or reprimand, but with open arms and profound human compassion from the teacher. Within those peaceful walls, he learned to understand himself, heal his inner wounds, and embrace a lifelong conviction: to be of genuine benefit to others.",
      dev_ch4_p2: "It was here that the name Said Attaufiq was born. It intertwined the essence of his early childhood identity with the name of the sanctuary that granted him a second life—a symbol of rebirth for a soul that has made peace with its past and resolved to walk steadily into the light.",
      dev_ch5_num: "Chapter V",
      dev_ch5_title: "The Wounded Healer & The Rise of Stand Alone Studio",
      dev_ch5_p1: "Rising from rock bottom fostered an acute empathy for the human heart. The timeless archetype of The Wounded Healer—one who transforms the healing of their own wounds into an extended hand for others—became the lifeblood of every line of code he crafted.",
      dev_ch5_p2: "On July 10, 2026, his solitary endeavor formally evolved into Stand Alone Studio. The name is not about isolation; it is a declaration of quiet courage: the testament of a creator standing firmly on his own feet. Every line of architecture in Paperleaf, LeafPaint, and LeafStudio is dedicated to a singular purpose: offering a safe, distraction-free canvas where every soul can express themselves freely, beautifully, and meaningfully."
    },
    id: {
      // Navbar
      nav_apps: "Aplikasi",
      nav_market: "Leaf Market",
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
      btn_preregister: "Pre-register",
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
      no_results: "Tidak ada hasil ditemukan.",

      // About & Ecosystem
      about_hero_badge: "STANDALONE STUDIO",
      about_hero_title: "Membuka Ruang Tanpa Batas untuk Setiap Kreativitas",
      about_hero_desc: "Studio pengembangan independen yang berdedikasi menutup celah kualitas di Android melalui perpaduan antarmuka estetik, performa tinggi, dan kebebasan berekspresi.",
      about_eco_label: "Ekosistem Kami",
      about_eco_title: "Satu Ekosistem untuk Seluruh Alur Kreatif Android",
      about_eco_p1: "Stand Alone Studio adalah studio pengembangan perangkat lunak independen yang berfokus menciptakan aplikasi dan ekosistem digital kreatif kelas atas untuk pengguna Android di seluruh dunia. Lahir dari tekad untuk menghadirkan antarmuka visual yang estetik, performa tinggi, dan kendali intuitif yang sejajar dengan standar global.",
      about_pilar1_title: "Redefining Android UI/UX",
      about_pilar1_desc: "Menghadirkan antarmuka yang segar, minimalis, dan bernilai estetika tinggi pada setiap aplikasi kreatif yang dirancang.",
      about_pilar2_title: "Empowering Creators",
      about_pilar2_desc: "Membangun ekosistem terpadu dari tahap pencatatan ide, proses berkarya visual, hingga penerbitan aset karya digital.",
      about_pilar3_title: "Quality & Sustainability",
      about_pilar3_desc: "Memastikan stabilitas dan performa responsif dengan model bisnis yang adil dan transparan demi keberlanjutan produk.",
      about_products_title: "Tiga Aplikasi Inti Ekosistem",
      about_prod_paperleaf: "Digital scrapbook dan jurnal otentik dengan simulasi lipat buku 3D yang nyata, kuas ekspresif alami, dan simpan otomatis.",
      about_prod_leafpaint: "Studio lukis digital lengkap dengan sistem layer canggih, sensitivitas stylus presisi, dan kanvas bebas distraksi.",
      about_prod_leafstudio: "Ruang kerja kreator terpadu untuk merancang template jurnal, kuas lukis, stiker grafis, hingga tema sampul kustom.",
      about_leaf_label: "Filosofi Dedaunan",
      about_leaf_title: "Makna 'Leaf' di Balik Seluruh Karya",
      about_leaf_desc: "Sehelai daun bukan sekadar bentuk visual, melainkan benang merah yang mengalir di setiap aplikasi yang dibangun di studio ini:",
      about_leaf1_title: "Kehidupan & Pertumbuhan",
      about_leaf1_desc: "Daun adalah pemberi oksigen. Setiap aplikasi dirancang memberi napas dan ruang bagi ide kreatif Anda untuk tumbuh tanpa batasan.",
      about_leaf2_title: "Proses Alami",
      about_leaf2_desc: "Menulis, melukis, dan mencatat dirancang mengalir secara natural dan tenang, layaknya helai daun yang bergerak mengikuti angin.",
      about_leaf3_title: "Gugur untuk Tunas Baru",
      about_leaf3_desc: "Daun yang gugur memberi nutrisi bagi tanah. Filosofi belajar dari kesulitan untuk melahirkan ruang berkarya bagi kreator lainnya.",

      // Developer Story
      dev_section_label: "Tentang Pengembang",
      dev_section_title: "Di Balik Layar: Berdiri di Atas Kaki Sendiri",
      dev_badge: "Founder & Solo Developer",
      dev_origin: "Tasikmalaya, 20 Februari 1996 • Solo Engineer & Designer",
      dev_quote: "\"Memberi orang lain kesempatan untuk menunjukkan kreativitas dirinya.\"",
      dev_ch1_num: "Babak I",
      dev_ch1_title: "Asap Tungku Subuh dan Selembar Kertas Gambar",
      dev_ch1_p1: "Lahir pada hari raya di Tasikmalaya dari keluarga sederhana, langkah awal Said Attaufiq ditempa oleh ketabahan seorang ibu yang tiap subuh berkutat dengan asap tungku dapur penjual surabi. Tumbuh tanpa kehadiran figur ayah dan tanpa arah yang menuntun masa kecilnya, ia kerap merasa asing dengan dunia permainan anak laki-laki pada umumnya.",
      dev_ch1_p2: "Hingga di suatu hari, sebuah perjumpaan sederhana di lantai dengan seorang teman kecil yang membawa alat gambar membukakan gerbang baru. Mereka menggambar bersama, menertawakan coretan abstrak, dan saling mengagumi imajinasi masing-masing. Di sanalah dunia seni menyapanya untuk pertama kali. Di atas selembar kertas, ia menemukan suaka pertama tempat jiwanya merasa utuh dan bernapas bebas.",
      dev_ch2_num: "Babak II",
      dev_ch2_title: "Menemukan Suara di Tengah Keheningan",
      dev_ch2_p1: "Kepekaan rasa dan kecintaannya pada seni visual sering kali disalahpahami oleh lingkungan sekitarnya. Masa kecil dan remajanya diwarnai oleh kepedihan dan ketiadaan ruang aman untuk bersandar, yang memaksanya belajar melindungi dirinya sendiri dalam keheningan yang panjang.",
      dev_ch2_p2: "Saat duduk di bangku sekolah kejuruan bidang komputer, perpustakaan menjadi rumah favoritnya. Di antara rak-rak buku yang sunyi, coretan cerita pendek, dan lembar-lembar sketsa, ia merajut kecintaan mendalam pada sastra, seni visual, dan teknologi. Ia memilih diam, mengamati, dan belajar menata rasa sakit menjadi kekuatan batin yang tenang.",
      dev_ch3_num: "Babak III",
      dev_ch3_title: "Langkah Kaki Menembus Badai (Garut, 2018)",
      dev_ch3_p1: "Tahun 2018 menjadi titik nadir tergelap dalam kehidupannya. Rasa terasing, keputusasaan, dan perasaan tak berharga nyaris memadamkan seluruh harapannya untuk bertahan hidup. Namun, di ujung jurang terdalam itu, secercah tekad membimbingnya untuk mencari arah hidup yang baru.",
      dev_ch3_p2: "Dengan ransel berat di punggungnya, ia memutuskan melangkah—berjalan kaki puluhan kilometer dari Tasikmalaya menuju Pesantren Attaufiq di Ciucing, Garut. Sepanjang perjalanan yang melelahkan fisik dan batin, ia justru dipertemukan dengan kebaikan-kebaikan tulus dari orang-orang asing di jalanan: tumpangan tulus, senyuman ramah, hingga bekal di jalan dari sesama pengelana, serta seorang sahabat yang setia menjemputnya. Kebaikan tak terduga itu perlahan meruntuhkan rasa putus asanya dan membuktikan bahwa dunia masih memiliki kehangatan dan cinta.",
      dev_ch4_num: "Babak IV",
      dev_ch4_title: "Said Attaufiq: Tempat Menemukan Rumah",
      dev_ch4_p1: "Setibanya di Pesantren Attaufiq, ia tidak disambut dengan penghakiman atau celaan, melainkan dengan pelukan hangat dan keteladanan kemanusiaan yang mendalam dari sang guru. Di tempat yang penuh ketenangan ini, ia belajar mengenal dirinya sendiri, memulihkan damai di dalam hati, dan menemukan satu prinsip hidup yang kokoh: memberi manfaat bagi orang lain.",
      dev_ch4_p2: "Dari sanalah nama Said Attaufiq lahir. Nama ini merajut kembali identitas masa kecilnya dengan nama pesantren yang memberinya kehidupan kedua—sebuah simbol kelahiran kembali seorang manusia yang telah berdamai dengan masa lalunya dan siap melangkah menatap masa depan.",
      dev_ch5_num: "Babak V",
      dev_ch5_title: "The Wounded Healer & Berdirinya Stand Alone Studio",
      dev_ch5_p1: "Perjalanan bangkit dari titik nol melahirkan empati yang sangat mendalam. Filosofi The Wounded Healer—seseorang yang menggunakan pemulihan lukanya sendiri untuk mengulurkan tangan bagi orang lain—menjadi jiwa dari setiap baris kode yang ia tulis.",
      dev_ch5_p2: "Pada 10 Juli 2026, studio mandiri ini resmi bertransformasi menjadi Stand Alone Studio. Nama ini bukan tentang kesendirian, melainkan deklarasi keteguhan hati: bahwa ia mampu berdiri mandiri di atas kakinya sendiri. Setiap baris kode di Paperleaf, LeafPaint, dan LeafStudio ia dedikasikan untuk satu tujuan: menghadirkan \"kanvas aman\" bagi setiap jiwa untuk berekspresi secara bebas, indah, dan bermakna."
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
