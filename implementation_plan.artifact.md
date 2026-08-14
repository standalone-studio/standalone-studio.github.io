# Konfigurasi Kebijakan Privasi dan Penghapusan Akun

Rencana ini bertujuan untuk mengintegrasikan halaman Kebijakan Privasi dan Penghapusan Akun yang baru saja ditambahkan ke dalam situs web utama Standalone Studio. Hal ini penting untuk mematuhi persyaratan Google Play Store bagi aplikasi Android.

## Perubahan yang Diusulkan

### Situs Web Utama (Root)
Saya akan memperbarui footer di semua halaman utama untuk menautkan ke halaman privasi dan penghapusan akun yang baru di folder `website/`.

#### [MODIFY] [index.html](file:///D:/Project App/dev/index.html)
- Perbarui tautan "Privacy Policy" ke `website/privacy.html`.
- Tambahkan tautan "Delete Account" yang mengarah ke `website/delete-account.html`.

#### [MODIFY] [about.html](file:///D:/Project App/dev/about.html)
- Perbarui tautan "Privacy Policy" ke `website/privacy.html`.
- Tambahkan tautan "Delete Account" yang mengarah ke `website/delete-account.html`.

#### [MODIFY] [apps.html](file:///D:/Project App/dev/apps.html)
- Perbarui tautan "Privacy Policy" ke `website/privacy.html`.
- Tambahkan tautan "Delete Account" yang mengarah ke `website/delete-account.html`.

#### [MODIFY] [store.html](file:///D:/Project App/dev/store.html)
- Perbarui tautan "Privacy Policy" ke `website/privacy.html`.
- Tambahkan tautan "Delete Account" yang mengarah ke `website/delete-account.html`.

#### [MODIFY] [support.html](file:///D:/Project App/dev/support.html)
- Perbarui tautan "Privacy Policy" ke `website/privacy.html`.
- Tambahkan tautan "Delete Account" yang mengarah ke `website/delete-account.html`.

### Folder Website (`website/`)
Saya akan memastikan navigasi antar halaman di folder ini sudah benar dan konsisten.

#### [MODIFY] [website/index.html](file:///D:/Project App/dev/website/index.html)
- Pastikan semua tautan navigasi berfungsi dengan benar.

## Verifikasi
- Memastikan semua file HTML di root memiliki tautan yang benar di bagian footer.
- Memastikan navigasi di folder `website/` (Privacy & Delete Account) saling terhubung dengan benar.
