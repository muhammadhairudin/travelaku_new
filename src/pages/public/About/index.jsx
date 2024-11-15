import Container from '../../../components/common/Container'
import Mermaid from '../../../components/common/Mermaid'
import Wireframes from './components/Wireframes'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function About() {
  const userFlowChart = `
    flowchart TD
      A[Browse Aktivitas] --> B{Sudah Login?}
      B -->|Ya| C[Pilih Aktivitas]
      B -->|Tidak| D[Login/Register]
      D --> C
      C --> E[Pilih Tanggal & Jumlah]
      E --> F[Checkout]
      F --> G[Pilih Metode Pembayaran]
      G --> H[Upload Bukti Pembayaran]
      H --> I[Menunggu Konfirmasi]
      I -->|Disetujui| J[Booking Berhasil]
      I -->|Ditolak| K[Pembayaran Ditolak]

      classDef default fill:#f9f9f9,stroke:#4F46E5,stroke-width:2px;
      classDef decision fill:#4F46E5,stroke:#4F46E5,color:white;
      classDef success fill:#22C55E,stroke:#22C55E,color:white;
      classDef error fill:#EF4444,stroke:#EF4444,color:white;
      
      class B decision;
      class J success;
      class K error;
  `

  const adminFlowChart = `
    flowchart TD
      A[Login sebagai Admin] --> B[Dashboard]
      B --> C[Manajemen Data]
      C --> D[Kelola Aktivitas]
      C --> E[Kelola Kategori]
      C --> F[Kelola Banner]
      C --> G[Kelola Promo]
      B --> H[Verifikasi Transaksi]
      H --> I{Cek Pembayaran}
      I -->|Valid| J[Setujui Transaksi]
      I -->|Tidak Valid| K[Tolak Transaksi]

      classDef default fill:#f9f9f9,stroke:#4F46E5,stroke-width:2px;
      classDef decision fill:#4F46E5,stroke:#4F46E5,color:white;
      classDef success fill:#22C55E,stroke:#22C55E,color:white;
      classDef error fill:#EF4444,stroke:#EF4444,color:white;
      
      class I decision;
      class J success;
      class K error;
  `

  // Timeline data dengan tanggal yang diupdate
  const timeline = [
    {
      week: 'Minggu 1 (27 Oktober - 2 November 2024)',
      tasks: [
        'Pengumpulan dan analisis kebutuhan',
        'Pembuatan PRD (Product Requirement Document)',
        'Desain wireframe dan mockup UI/UX',
        'Riset teknologi dan library yang akan digunakan',
        'Setup project dan konfigurasi development environment'
      ]
    },
    {
      week: 'Minggu 2 (3-9 November 2024)',
      tasks: [
        'Implementasi struktur folder dan routing',
        'Pembuatan komponen dasar (Navbar, Footer, dll)',
        'Integrasi authentication dan authorization',
        'Implementasi halaman publik (Home, Activities, Detail)',
        'Setup state management dengan Redux Toolkit'
      ]
    },
    {
      week: 'Minggu 3 (10-16 November 2024)',
      tasks: [
        'Implementasi fitur admin (Dashboard, CRUD)',
        'Integrasi dengan API backend',
        'Implementasi fitur user (Cart, Wishlist, Profile)',
        'Implementasi sistem pembayaran',
        'Testing dan debugging'
      ]
    },
    {
      week: 'Minggu 4 (17-24 November 2024)',
      tasks: [
        'Quality Assurance dan testing menyeluruh',
        'Optimasi performa dan responsive design',
        'Deployment ke production',
        'Dokumentasi kode dan API',
        'Pembuatan laporan final project'
      ]
    }
  ]

  // Struktur folder project
  const projectStructure = `
travelaku/                      # Root project directory
├── index.html                  # Entry point HTML
├── package.json                # Project dependencies & scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration  
├── vite.config.js             # Vite configuration
├── public/                     # Static assets directory
│   ├── Logo.svg               # Application logo
│   ├── favicon.ico            # Browser favicon
│   └── wireframes/            # UI/UX wireframe images
├── docs/                       # Project documentation
│   ├── tahap-1-setup.md       # Setup documentation
│   └── tahap-2-routing.md     # Routing documentation
└── src/                       # Source code directory
    ├── assets/                # Static assets for components
    ├── components/            # Reusable components
    │   ├── admin/            # Admin-specific components
    │   ├── common/           # Shared components
    │   └── user/             # User-specific components
    ├── layouts/              # Layout components
    ├── lib/                  # Library configurations
    ├── middleware/           # Route middleware
    ├── pages/               # Application pages
    │   ├── admin/          # Admin pages
    │   ├── auth/           # Authentication pages
    │   ├── public/         # Public pages
    │   └── user/           # User pages
    ├── routes/             # Route definitions
    ├── services/           # API services
    ├── store/              # Redux store
    │   ├── slices/         # Redux slices
    │   └── index.js        # Store configuration
    ├── App.jsx             # Root component
    ├── index.css          # Global styles
    └── main.jsx           # Application entry point

Catatan Struktur Folder:
- Organisasi kode yang modular dan terstruktur
- Pemisahan yang jelas antara komponen, layanan, dan state
- Pengelompokan berdasarkan fitur dan tipe pengguna
- Dokumentasi dan aset statis terorganisir
- Konfigurasi yang terpisah dan mudah diakses

Setiap folder memiliki tanggung jawab spesifik yang memudahkan:
- Maintenance
- Scaling
- Testing
- Kolaborasi tim
  `

  // State untuk FAQ
  const [question] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  // Data FAQ default
  const defaultFaqs = [
    {
      id: 1,
      question: 'Apa itu TravelAku?',
      answer: `TravelAku adalah platform booking aktivitas wisata online yang dikembangkan sebagai Final Project Bootcamp Frontend Dibimbing Batch 19. Platform ini memungkinkan pengguna untuk:
      
      • Mencari dan memesan aktivitas wisata
      • Mendapatkan informasi detail tentang destinasi
      • Melakukan pembayaran secara online
      • Mengelola wishlist dan riwayat transaksi
      
      Untuk admin, platform ini menyediakan dashboard komprehensif untuk mengelola seluruh aspek website.`
    },
    {
      id: 2,
      question: 'Teknologi apa saja yang digunakan dalam pengembangan TravelAku?',
      answer: `TravelAku dikembangkan menggunakan stack teknologi modern:

      • Frontend: React + Vite
      • State Management: Redux Toolkit
      • Styling: Tailwind CSS
      • Routing: React Router
      • HTTP Client: Axios
      • Charts: Chart.js
      • Maps: Leaflet
      • Flow Diagrams: Mermaid.js
      
      Semua teknologi dipilih untuk memastikan performa, maintainability, dan developer experience yang optimal.`
    },
    {
      id: 3,
      question: 'Bagaimana struktur dan arsitektur project ini?',
      answer: `Project ini menggunakan arsitektur yang modular dan terorganisir:

      • Components: Reusable UI components
      • Pages: Komponen halaman utama
      • Services: Layer komunikasi dengan API
      • Store: State management dengan Redux
      • Layouts: Template layout berbeda untuk tiap tipe user
      • Routes: Konfigurasi routing dan proteksi
      
      Struktur ini memudahkan maintenance dan scaling project.`
    },
    {
      id: 4,
      question: 'Apa saja fitur utama TravelAku?',
      answer: `Fitur untuk User:
      • Pencarian & filter aktivitas
      • Booking & pembayaran online
      • Review & rating
      • Wishlist aktivitas
      • Riwayat transaksi
      
      Fitur untuk Admin:
      • Dashboard analytics
      • Manajemen aktivitas
      • Manajemen kategori
      • Manajemen banner
      • Manajemen promo
      • Verifikasi transaksi
      • Media library`
    },
    {
      id: 5,
      question: 'Bagaimana flow penggunaan aplikasi ini?',
      answer: `Flow untuk User:
      1. Browse atau cari aktivitas
      2. Login/Register jika belum
      3. Pilih aktivitas & tanggal
      4. Checkout & pilih pembayaran
      5. Upload bukti pembayaran
      6. Tunggu konfirmasi admin
      
      Flow untuk Admin:
      1. Login sebagai admin
      2. Akses dashboard
      3. Kelola data (aktivitas, kategori, dll)
      4. Verifikasi transaksi user`
    },
    {
      id: 6,
      question: 'Apa Base URL dan API Key yang digunakan?',
      answer: `Base Information:
      • Base URL: https://travel-journal-api-bootcamp.do.dibimbing.id
      • API Key: 24405e01-fbc1-45a5-9f5a-be13afcd757c
      
      Setiap request API harus menyertakan API Key di header.
      
      Contoh penggunaan di Axios:
      const api = axios.create({
        baseURL: 'https://travel-journal-api-bootcamp.do.dibimbing.id',
        headers: {
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
        }
      })`
    },
    {
      id: 7,
      question: 'Apa saja API Endpoint yang tersedia?',
      answer: `Endpoint yang tersedia dikelompokkan menjadi beberapa kategori:

      1. Authentication:
      • POST /api/v1/register - Registrasi user baru
      • POST /api/v1/login - Login user
      • GET /api/v1/logout - Logout user
      
      2. User Management:
      • GET /api/v1/user - Get logged user
      • GET /api/v1/all-user - Get all users (admin only)
      • POST /api/v1/update-profile - Update profile
      Body: {
        name, email, profilePictureUrl, phoneNumber
      }
      
      3. Banner Management:
      • POST /api/v1/create-banner - Create banner (admin)
      • POST /api/v1/update-banner/{id} - Update banner (admin)
      Body: {
        name, imageUrl
      }
      
      4. Promo Management:
      • POST /api/v1/create-promo - Create promo (admin)
      Body: {
        title, description, imageUrl, terms_condition,
        promo_code, promo_discount_price, minimum_claim_price
      }
      
      5. Activity Management:
      • POST /api/v1/create-activity - Create activity (admin)
      Body: {
        categoryId, title, description, imageUrls[],
        price, price_discount, rating, total_reviews,
        facilities, address, province, city, location_maps
      }
      
      6. Cart & Transaction:
      • POST /api/v1/add-cart - Add to cart
      Body: { activityId }
      • POST /api/v1/create-transaction - Create transaction
      Body: { cartIds[], paymentMethodId }
      • POST /api/v1/update-transaction-proof-payment/{id} - Update payment proof
      Body: { proofPaymentUrl }
      • POST /api/v1/update-transaction-status/{id} - Update status (admin)
      Body: { status: "success|failed" }
      
      7. Category Management:
      • POST /api/v1/create-category - Create category (admin)
      • GET /api/v1/categories - Get all categories
      • GET /api/v1/category/{id} - Get category by id
      Body Create: {
        name, imageUrl
      }
      
      8. Image Upload:
      • POST /api/v1/upload-image - Upload image
      Body: FormData { image: File }
      Response: { imageUrl }
      
      9. Payment Methods:
      • GET /api/v1/payment-methods - Get payment methods
      • POST /api/v1/generate-payment-methods - Generate payment methods
      
      Catatan Penting: 
      • Semua request harus menyertakan API Key di header
      • Endpoint dengan autentikasi memerlukan token JWT di header Authorization
      • Format header:
        - apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
        - Authorization: "Bearer {token}" (untuk endpoint terproteksi)
        - Content-Type: "application/json" (default)
        - Content-Type: "multipart/form-data" (untuk upload file)
      • Response menggunakan format standard:
        {
          status: "success" | "error",
          message: string,
          data: any
        }`
    }
  ]

  // Render FAQ section
  const renderFaq = (faq) => (
    <div key={faq.id} className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center py-4 w-full text-left"
        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
      >
        <span className="font-medium text-gray-900">{faq.question}</span>
        <ChevronDownIcon 
          className={`w-5 h-5 text-gray-500 transition-transform ${
            expandedFaq === faq.id ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {expandedFaq === faq.id && (
        <div className="pb-4 max-w-none prose prose-sm">
          {faq.answer.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <main className="py-12 bg-gray-50">
      <Container>
        <div className="flex gap-8">
          {/* Sticky Sidebar Table of Contents */}
          <div className="hidden flex-shrink-0 w-64 lg:block">
            <div className="sticky top-4 p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-primary">Daftar Isi</h3>
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Project Overview' },
                  { id: 'description', label: 'Deskripsi Project' },
                  { id: 'problem', label: 'Latar Belakang' },
                  { id: 'objectives', label: 'Tujuan & Sasaran' },
                  { id: 'users', label: 'Target Pengguna' },
                  { id: 'features', label: 'Fitur & Kebutuhan' },
                  { id: 'flow', label: 'User Flow' },
                  { id: 'tech', label: 'Spesifikasi Teknis' },
                  { id: 'structure', label: 'Struktur Project' },
                  { id: 'wireframes', label: 'Wireframes' },
                  { id: 'timeline', label: 'Timeline' },
                  { id: 'notes', label: 'Catatan Penting' },
                  { id: 'faq', label: 'FAQ' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-3 py-2 text-sm text-gray-600 rounded-lg transition-colors hover:bg-gray-50 hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(item.id)?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-12 max-w-4xl">
            {/* 1. Project Overview */}
            <section id="overview" className="p-8 bg-white rounded-lg shadow-sm">
              <section className="p-8 text-center bg-white rounded-lg shadow-sm">
                <div className="flex justify-center mb-8">
                  <img 
                    src="/Logo.svg" 
                    alt="TravelAku Logo" 
                    className="object-contain w-48 h-48"
                  />
                </div>
                
                <div className="relative mb-12">
                  <h1 className="mb-4 font-serif text-4xl font-bold text-primary">TravelAku</h1>
                  <p className="mb-6 text-xl text-gray-600">Product Requirements Document (PRD)</p>
                  <div className="absolute bottom-0 left-1/2 w-24 h-1 rounded-full -translate-x-1/2 bg-primary/20"></div>
                </div>

                <div className="mx-auto max-w-2xl">
                  <div className="p-6 space-y-3 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-600">
                      Final Project untuk Bootcamp Frontend Dibimbing Batch 19
                    </p>
                    <div className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                      <p className="text-gray-500">Dibuat oleh:</p>
                      <p className="text-xl font-semibold text-primary">Muhammad Hairudin, SE</p>
                      <div className="flex gap-2 justify-center items-center text-sm text-gray-500">
                        <span className="px-3 py-1 rounded-full bg-primary/10">ASN</span>
                        <span>•</span>
                        <span className="px-3 py-1 rounded-full bg-primary/10">Frontend Developer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            {/* 2. Deskripsi Project */}
            <section id="description" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Deskripsi Project</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  TravelAku adalah platform booking aktivitas wisata online yang bertujuan memudahkan wisatawan dalam menemukan dan memesan aktivitas wisata di Indonesia. Platform ini menghubungkan wisatawan dengan penyedia layanan wisata lokal untuk menciptakan pengalaman perjalanan yang berkesan.
                </p>
              </div>
            </section>

            {/* 3. Latar Belakang */}
            <section id="problem" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Latar Belakang Masalah</h2>
              <div className="space-y-4">
                <ul className="pl-6 space-y-2 list-disc text-gray-600">
                  <li>Sulitnya menemukan dan membandingkan aktivitas wisata yang sesuai</li>
                  <li>Proses booking yang rumit dan tidak terstandar</li>
                  <li>Kurangnya informasi detail tentang aktivitas wisata</li>
                  <li>Kesulitan dalam mengelola pemesanan bagi penyedia layanan</li>
                </ul>
              </div>
            </section>

            {/* 4. Tujuan & Sasaran */}
            <section id="objectives" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Tujuan & Sasaran</h2>
              <div className="space-y-4">
                <p>TravelAku bertujuan untuk:</p>
                <ul className="pl-6 space-y-2 list-disc text-gray-600">
                  <li>Menyediakan platform booking aktivitas wisata yang mudah dan aman</li>
                  <li>Membantu pengguna menemukan aktivitas wisata yang sesuai dengan minat</li>
                  <li>Mendukung pertumbuhan pariwisata lokal</li>
                  <li>Memberikan pengalaman pemesanan yang seamless</li>
                </ul>
              </div>
            </section>

            {/* 5. Target Pengguna */}
            <section id="users" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Target Pengguna</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-bold">Wisatawan</h3>
                  <ul className="pl-6 space-y-2 list-disc text-gray-600">
                    <li>Wisatawan domestik dan mancanegara</li>
                    <li>Usia 18-45 tahun</li>
                    <li>Familiar dengan teknologi</li>
                    <li>Suka traveling dan mencari pengalaman baru</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Admin/Pengelola</h3>
                  <ul className="pl-6 space-y-2 list-disc text-gray-600">
                    <li>Tim manajemen TravelAku</li>
                    <li>Penyedia layanan wisata</li>
                    <li>Customer service</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 6. Fitur & Kebutuhan */}
            <section id="features" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Fitur & Kebutuhan</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-bold">User Features</h3>
                  <ul className="pl-6 space-y-2 list-disc text-gray-600">
                    <li>Pencarian & filter aktivitas</li>
                    <li>Booking & pembayaran online</li>
                    <li>Review & rating</li>
                    <li>Wishlist aktivitas</li>
                    <li>Riwayat transaksi</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Admin Features</h3>
                  <ul className="pl-6 space-y-2 list-disc text-gray-600">
                    <li>Manajemen aktivitas</li>
                    <li>Manajemen kategori</li>
                    <li>Manajemen banner</li>
                    <li>Manajemen promo</li>
                    <li>Verifikasi transaksi</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 7. User Flow */}
            <section id="flow" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-8 text-2xl font-bold text-center">User Flow</h2>
              <div className="space-y-12">
                <div>
                  <h3 className="mb-6 text-lg font-bold text-center">Flow Pengguna</h3>
                  <Mermaid chart={userFlowChart} />
                </div>
                <div>
                  <h3 className="mb-6 text-lg font-bold text-center">Flow Admin</h3>
                  <Mermaid chart={adminFlowChart} />
                </div>
              </div>
            </section>

            {/* 8. Spesifikasi Teknis */}
            <section id="tech" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Spesifikasi Teknis</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-bold">Tech Stack</h3>
                  <ul className="pl-6 space-y-2 list-disc text-gray-600">
                    <li>Frontend: React + Vite</li>
                    <li>State Management: Redux Toolkit</li>
                    <li>Styling: Tailwind CSS</li>
                    <li>Routing: React Router</li>
                    <li>HTTP Client: Axios</li>
                    <li>Charts: Chart.js</li>
                    <li>Maps: Leaflet</li>
                    <li>Flow Diagrams: Mermaid.js</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Dependencies & Constraints</h3>
                  <ul className="pl-6 space-y-2 list-disc text-gray-600">
                    <li>Integrasi dengan API dari Dibimbing</li>
                    <li>Autentikasi menggunakan JWT</li>
                    <li>Responsive design untuk mobile & desktop</li>
                    <li>Image hosting menggunakan API upload</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. Struktur Project */}
            <section id="structure" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-center">Struktur Project</h2>
              <div className="overflow-x-auto">
                <pre className="p-6 font-mono text-sm text-gray-700 whitespace-pre bg-gray-50 rounded-lg">
                  {projectStructure}
                </pre>
              </div>
            </section>

            {/* 10. Wireframes */}
            <section id="wireframes" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-8 text-2xl font-bold text-center">Wireframes</h2>
              <Wireframes />
            </section>

            {/* 11. Timeline */}
            <section id="timeline" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-8 text-2xl font-bold text-center">Timeline Pengerjaan</h2>
              <div className="space-y-8">
                {timeline.map((period, index) => (
                  <div 
                    key={period.week}
                    className="relative pb-8 pl-8 last:pb-0"
                  >
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-[11px] top-3 bottom-0 w-0.5 bg-primary/20" />
                    )}
                    <div className="absolute left-0 top-2 w-[22px] h-[22px] rounded-full border-4 border-primary bg-white" />
                    <div>
                      <h3 className="mb-4 text-lg font-bold text-primary">
                        {period.week}
                      </h3>
                      <ul className="space-y-3">
                        {period.tasks.map((task, taskIndex) => (
                          <li 
                            key={taskIndex}
                            className="flex gap-3 items-start text-gray-600"
                          >
                            <span className="inline-block w-1.5 h-1.5 mt-2 rounded-full bg-primary/60" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 mt-8 rounded-lg bg-primary/5">
                <h4 className="mb-2 font-medium text-primary">Total Waktu Pengerjaan:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Persiapan & Perencanaan: 27 Oktober - 2 November 2024</li>
                  <li>• Development Frontend: 3-16 November 2024</li>
                  <li>• Testing & Deployment: 17-24 November 2024</li>
                  <li className="mt-2 font-medium text-primary">Total: 4 Minggu (27 Oktober - 24 November 2024)</li>
                </ul>
              </div>
            </section>

            {/* 12. Catatan Penting */}
            <section id="notes" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-center">Catatan Penting</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="mb-2 font-bold text-blue-800">Teknologi Utama</h3>
                  <ul className="pl-6 space-y-1 list-disc text-blue-700">
                    <li>React + Vite untuk development yang cepat</li>
                    <li>Redux Toolkit untuk state management yang efisien</li>
                    <li>Tailwind CSS untuk styling yang fleksibel</li>
                    <li>React Router untuk routing yang dinamis</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="mb-2 font-bold text-green-800">Fitur Unggulan</h3>
                  <ul className="pl-6 space-y-1 list-disc text-green-700">
                    <li>Pencarian & filter aktivitas yang powerful</li>
                    <li>Sistem booking & pembayaran yang terintegrasi</li>
                    <li>Dashboard admin yang komprehensif</li>
                    <li>Responsive design untuk semua device</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="mb-2 font-bold text-yellow-800">Panduan Penggunaan</h3>
                  <ul className="pl-6 space-y-1 list-disc text-yellow-700">
                    <li>Pastikan Node.js versi 16+ terinstall</li>
                    <li>Install dependencies dengan npm install</li>
                    <li>Jalankan development server dengan npm run dev</li>
                    <li>Build untuk production dengan npm run build</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="mb-2 font-bold text-red-800">Penting Diperhatikan</h3>
                  <ul className="pl-6 space-y-1 list-disc text-red-700">
                    <li>Gunakan .env untuk environment variables</li>
                    <li>Pastikan API key tersimpan dengan aman</li>
                    <li>Lakukan testing sebelum deploy ke production</li>
                    <li>Backup data secara berkala</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 13. FAQ */}
            <section id="faq" className="p-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-8 text-2xl font-bold text-center">FAQ</h2>
              <div className="divide-y divide-gray-200">
                {defaultFaqs
                  .filter(faq => 
                    faq.question.toLowerCase().includes(question.toLowerCase()) ||
                    faq.answer.toLowerCase().includes(question.toLowerCase())
                  )
                  .map(renderFaq)}
              </div>
            </section>

            {/* Back to Top Button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed right-8 bottom-8 p-3 text-white rounded-full shadow-lg bg-primary hover:bg-primary/90"
            >
              ↑
            </button>

            {/* Copyright */}
            <div className="pt-8 text-sm text-center text-gray-500 border-t">
              <p>© 2024 TravelAku. Final Project Bootcamp Frontend Dibimbing Batch 19.</p>
              <p className="mt-1">Created with ❤️ by Muhammad Hairudin, SE</p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
} 