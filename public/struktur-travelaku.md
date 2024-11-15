# Dokumentasi Struktur Folder TravelAku

## Gambaran Umum
Aplikasi ini menggunakan struktur folder berbasis fitur (feature-based structure) untuk memudahkan pengembangan dan pemeliharaan.

## Struktur Folder

src/
├── assets/                        # Aset statis
│   ├── images/                    # Gambar
│   ├── icons/                     # Ikon
│   └── fonts/                     # Font
├── components/                    # Komponen yang dapat digunakan ulang
│   ├── common/                    # Komponen umum
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── Card/
│   ├── layout/                    # Komponen layout
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── Navigation/
│   └── forms/                     # Komponen form yang dapat digunakan ulang
├── hooks/                         # Custom hooks global
├── utils/                         # Fungsi utilitas
├── services/                      # Layanan API
├── context/                       # Context API
├── constants/                     # Konstanta
├── store/                         # Folder untuk Redux
│   ├── actions/                   # Action creators
│   │   ├── authActions.js
│   │   ├── cartActions.js
│   │   ├── activityActions.js
│   │   └── ...
│   ├── reducers/                  # Reducers
│   │   ├── authReducer.js
│   │   ├── cartReducer.js
│   │   ├── activityReducer.js
│   │   └── ...
│   ├── types/                     # Action types
│   │   └── index.js
│   └── index.js                   # Store configuration
├── api/                           # API integration
│   ├── config.js                  # API configuration
│   ├── auth.js                    # Auth API calls
│   ├── activities.js              # Activities API calls
│   ├── transactions.js            # Transactions API calls
│   └── ...
├── lib/                           # Third-party library configurations
│   ├── axios.js                   # Axios instance & interceptors
│   └── ...
├── styles/                        # Global styles
│   ├── index.css                  # Main CSS file
│   └── components/                # Component-specific styles
├── themes/                        # DaisyUI theme configuration
│   └── index.js
├── validations/                   # Form validations
│   ├── auth.js
│   ├── activity.js
│   └── ...
├── middleware/                    # Middleware
│   ├── auth.js                    # Autentikasi middleware
│   ├── admin.js                   # Admin role check
│   └── errorHandler.js            # Error handling
├── routes/                        # Route configurations
│   ├── privateRoutes.js           # Protected routes
│   ├── publicRoutes.js            # Public routes
│   └── adminRoutes.js             # Admin routes
└── pages/                         # Halaman-halaman aplikasi
   └── pages/
       ├── auth/                          # Modul Autentikasi
       │   ├── Login/                     # Fitur Login
       │   │   ├── index.jsx             # Halaman utama login
       │   │   ├── components/           # Komponen-komponen login
       │   │   │   ├── LoginForm.jsx     # Form login
       │   │   │   └── SocialLogin.jsx   # Login media sosial
       │   │   └── hooks/
       │   │       └── useLogin.js       # Hook custom untuk logika login
       │   └── Register/                  # Fitur Registrasi
       │       ── index.jsx             # Halaman utama registrasi
       │       ├── components/
       │       │   ├── RegisterForm.jsx  # Form registrasi
       │       │   └── RegisterSuccess.jsx # Tampilan sukses registrasi
       │       └── hooks/
       │           └── useRegister.js    # Hook custom untuk logika registrasi
       │
       ├── admin/                         # Panel Admin
       │   ├── Dashboard/                 # Dashboard Admin
       │   │   ├── index.jsx             # Halaman utama dashboard
       │   │   └── components/
       │   │       ├── StatisticsCards.jsx    # Kartu statistik
       │   │       ├── RevenueChart.jsx       # Grafik pendapatan
       │   │       ├── RecentTransactions.jsx # Transaksi terbaru
       │   │       └── PopularActivities.jsx  # Aktivitas populer
       │   ├── UserManagement/            # Manajemen Pengguna
       │   │   ├── index.jsx
       │   │   └── components/
       │   │       ├── UserTable.jsx          # Tabel daftar pengguna
       │   │       ├── UserForm.jsx           # Form pengguna
       │   │       ├── UpdateRoleModal.jsx    # Modal update role
       │   │       └── DeleteUserModal.jsx    # Modal hapus pengguna
       │   ├── BannerManagement/          # Manajemen Banner
       │   │   ├── index.jsx
       │   │   └── components/
       │   │       ├── BannerList.jsx         # Daftar banner
       │   │       ├── BannerForm.jsx         # Form banner
       │   │       ├── BannerPreview.jsx      # Preview banner
       │   │       └── DeleteBannerModal.jsx  # Modal hapus banner
       │   ├── PromoManagement/           # Manajemen Promo
       │   │   ├── index.jsx
       │   │   └── components/
       │   │       ├── PromoList.jsx          # Daftar promo
       │   │       ├── PromoForm.jsx          # Form promo
       │   │       ├── PromoPreview.jsx       # Preview promo
       │   │       └── DeletePromoModal.jsx   # Modal hapus promo
       │   ├── CategoryManagement/        # Manajemen Kategori
       │   │   ├── index.jsx
       │   │   └── components/
       │   │       ├── CategoryList.jsx       # Daftar kategori
       │   │       ├── CategoryForm.jsx       # Form kategori
       │   │       ├── CategoryPreview.jsx    # Preview kategori
       │   │       └── DeleteCategoryModal.jsx # Modal hapus kategori
       │   ├── ActivityManagement/        # Manajemen Aktivitas
       │   │   ├── index.jsx
       │   │   └── components/
       │   │       ├── ActivityTable.jsx      # Tabel aktivitas
       │   │       ├── ActivityForm.jsx       # Form aktivitas
       │   │       ├── ImageUploader.jsx      # Upload gambar
       │   │       ├── FacilitiesEditor.jsx   # Editor fasilitas
       │   │       ├── LocationPicker.jsx     # Pemilih lokasi
       │   │       └── DeleteActivityModal.jsx # Modal hapus aktivitas
       │   └── TransactionManagement/     # Manajemen Transaksi
       │       ├── index.jsx
       │       └── components/
       │           ├── TransactionTable.jsx    # Tabel transaksi
       │           ├── TransactionDetail.jsx   # Detail transaksi
       │           ├── UpdateStatusModal.jsx   # Modal update status
       │           └── PaymentProofViewer.jsx  # Viewer bukti bayar
       │
       ├── user/                          # Fitur Pengguna
       │   ├── Profile/                   # Profil Pengguna
       │   │   ├── index.jsx
       │   │   └── components/
       │   │       ├── ProfileInfo.jsx         # Informasi profil
       │   │       ├── UpdateProfileForm.jsx   # Form update profil
       │   │       └── ChangePasswordForm.jsx  # Form ganti password
       │   ├── Cart/                      # Keranjang Belanja
       │   │   ├── index.jsx
       │   │   └── components/
       │   │       ├── CartList.jsx           # Daftar keranjang
       │   │       ├── CartItem.jsx           # Item keranjang
       │   │       ├── CartSummary.jsx        # Ringkasan keranjang
       │   │       └── DeleteCartModal.jsx    # Modal hapus item
       │   └── Transactions/              # Riwayat Transaksi
       │       ├── index.jsx
       │       └── components/
       │           ├── TransactionList.jsx     # Daftar transaksi
       │           ├── TransactionCard.jsx     # Kartu transaksi
       │           ├── PaymentProofUpload.jsx  # Upload bukti bayar
       │           └── CancelTransactionModal.jsx # Modal pembatalan
       │
       └── public/                        # Halaman Publik
           ├── Home/                      # Halaman Utama
           │   ├── index.jsx
           │   └── components/
           │       ├── HeroSection.jsx         # Banner utama
           │       ├── BannerSlider.jsx        # Slider banner
           │       ├── PromoSection.jsx        # Daftar promo
           │       ├── CategorySection.jsx     # Daftar kategori
           │       ├── PopularActivities.jsx   # Aktivitas populer
           │       └── Newsletter.jsx          # Langganan newsletter
           ├── Activities/                # Katalog Aktivitas
           │   ├── index.jsx
           │   └── components/
           │       ├── ActivityFilters.jsx     # Filter aktivitas
           │       ├── ActivityGrid.jsx        # Grid aktivitas
           │       ├── ActivityCard.jsx        # Kartu aktivitas
           │       ├── SearchBar.jsx           # Bar pencarian
           │       └── CategoryFilter.jsx      # Filter kategori
           ├── ActivityDetail/            # Detail Aktivitas
           │   ├── index.jsx
           │   └── components/
           │       ├── ImageGallery.jsx        # Galeri gambar
           │       ├── ActivityInfo.jsx        # Info aktivitas
           │       ├── PriceCard.jsx           # Kartu harga
           │       ├── FacilitiesList.jsx      # Daftar fasilitas
           │       ├── LocationMap.jsx         # Peta lokasi
           │       ├── Reviews.jsx             # Ulasan
           │       └── RelatedActivities.jsx   # Aktivitas terkait
           └── Checkout/                  # Proses Pembayaran
               ├── index.jsx
               └── components/
                   ├── OrderSummary.jsx        # Ringkasan pesanan
                   ├── PaymentMethods.jsx      # Metode pembayaran
                   ├── PromoCode.jsx           # Kode promo
                   ├── CustomerInfo.jsx        # Info pelanggan
                   └── ConfirmationModal.jsx   # Modal konfirmasi

## Catatan Penting:
- Setiap modul memiliki struktur yang konsisten dengan pattern:
  - index.jsx: Entry point modul
  - components/: Komponen-komponen terkait
  - hooks/: Custom hooks (jika diperlukan)
- Komponen dibuat sekecil dan sereusable mungkin
- Logika bisnis dipisahkan ke dalam custom hooks
- Setiap modul memiliki scope dan tanggung jawab yang jelas

## File Konfigurasi Terkait:
- App.jsx: Entry point aplikasi React
- index.css: Stylesheet utama
- postcss.config.js: Konfigurasi PostCSS
- tailwind.config.js: Konfigurasi Tailwind CSS

## File Konfigurasi Tambahan:
- vite.config.js: Konfigurasi Vite
- .env: Environment variables
- .env.example: Example environment variables
- jsconfig.json: JavaScript configuration
- .eslintrc.js: ESLint configuration
- .prettierrc: Prettier configuration

### 1. Konvensi Penamaan
- Komponen: PascalCase (ContohComponent.jsx)
- File utilitas: camelCase (contohUtil.js)
- Konstanta: UPPERCASE (CONTOH_CONSTANT)
- Hook custom: useNamaHook
- File test: NamaFile.test.js

### 2. State Management (Redux)
- Gunakan slice pattern untuk Redux
- Pisahkan logic async ke thunks
- Implementasikan proper error handling
- Gunakan selector untuk akses state

### 3. API Integration
- Implementasikan interceptors untuk:
  - Token management
  - Error handling
  - Loading states
- Centralisasi API config
- Gunakan proper error handling

### 4. Routing & Navigation
- Implementasikan lazy loading
- Gunakan route guards
- Handle 404 pages
- Maintain breadcrumbs

### 5. Form Handling
- Validasi form client-side
- Implementasi proper error messages
- Handle loading states
- Implement proper feedback

### 6. Security
- Implement proper auth flow
- Sanitize user inputs
- Protect sensitive routes
- Handle token expiration

### 7. Performance
- Implement code splitting
- Lazy load components
- Optimize images
- Implement proper caching

### 8. Testing
- Unit tests untuk utils
- Integration tests untuk components
- E2E tests untuk critical flows
- Test error scenarios

### 9. Styling
- Gunakan Tailwind utilities
- Maintain consistent spacing
- Follow responsive design principles
- Implement proper dark mode

### 10. Best Practices
- Implement proper error boundaries
- Use proper TypeScript types
- Maintain proper documentation
- Follow Git workflow

## Environment Setup

### API Configuration



