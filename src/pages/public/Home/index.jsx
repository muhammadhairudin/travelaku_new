import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import { ArrowRightIcon, MapPinIcon, CalendarDaysIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import ActivityCard from '../Activities/components/ActivityCard'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchCategories } from '../../../store/slices/categorySlice'
import { fetchAllBanners } from '../../../store/slices/adminSlice'
import { fetchPromos } from '../../../store/slices/promoSlice'
import { fetchActivities } from '../../../store/slices/activitySlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Mousewheel, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const features = [
  {
    icon: <MapPinIcon className="w-8 h-8" />,
    title: 'Destinasi Terbaik',
    description: 'Lokasi wisata pilihan yang telah diverifikasi',
  },
  {
    icon: <CalendarDaysIcon className="w-8 h-8" />,
    title: 'Fleksibel',
    description: 'Jadwal yang bisa disesuaikan dengan kebutuhanmu',
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: 'Guide Profesional',
    description: 'Dipandu oleh guide lokal berpengalaman',
  },
]

export default function Home() {
  const dispatch = useDispatch()
  const { items: activities } = useSelector((state) => state.activities)
  const { items: categories, isLoading: isCategoriesLoading } = useSelector((state) => state.categories)
  const { banners = [] } = useSelector((state) => state.admin)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const { items: promos, isLoading: isPromosLoading } = useSelector((state) => state.promos)
  const featuredActivities = activities.slice(0, 6)

  useEffect(() => {
    dispatch(fetchActivities())
    dispatch(fetchCategories())
    dispatch(fetchAllBanners())
    dispatch(fetchPromos())
  }, [dispatch])

  // Auto rotate banner setiap 10 detik
  useEffect(() => {
    if (banners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      )
    }, 10000) // 10 detik

    return () => clearInterval(interval)
  }, [banners.length])

  // Hitung jumlah aktivitas per kategori
  const categoriesWithCount = categories.map(category => {
    const activityCount = activities.filter(
      activity => activity.categoryId === category.id
    ).length

    return {
      ...category,
      totalActivities: activityCount
    }
  })

  if (isCategoriesLoading || isPromosLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="pb-24 space-y-24">
      {/* Hero Section with Banner */}
      <section className="relative min-h-[600px] text-white bg-gray-900">
        {/* Banner Background dengan Fade Effect */}
        {banners.length > 0 && (
          <div className="absolute inset-0">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.name}
                  className="object-cover w-full h-full"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/10" />
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <Container className="relative py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="mb-6 font-serif text-4xl font-bold lg:text-5xl">
              Jelajahi Keindahan Indonesia
            </h1>
            <p className="mb-8 text-lg text-gray-300">
              Temukan pengalaman perjalanan tak terlupakan bersama TravelAku. 
              Kami menyediakan berbagai pilihan aktivitas wisata terbaik untuk liburanmu.
            </p>
            <div className="flex gap-4">
              <Link
                to="/activities"
                className="gap-2 btn btn-primary"
              >
                Mulai Petualangan
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/activities"
                className="btn btn-secondary"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </Container>

        {/* Banner Navigation Dots */}
        {banners.length > 1 && (
          <div className="flex absolute bottom-4 left-1/2 gap-2 -translate-x-1/2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentBannerIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section>
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 text-center bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="inline-flex p-3 mb-4 rounded-lg bg-primary/5 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="bg-gray-50">
        <Container>
          <div className="py-16">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
                Kategori Wisata
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Temukan berbagai aktivitas wisata yang sesuai dengan preferensimu. Dari wisata alam hingga wisata budaya, semua ada di sini.
              </p>
            </div>

            {/* Category Carousel */}
            <div className="relative px-4">
              <Swiper
                modules={[Navigation, Pagination, Keyboard, Mousewheel, A11y]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                mousewheel={true}
                grabCursor={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
                className="!pb-12"
              >
                {categoriesWithCount.map((category) => (
                  <SwiperSlide key={category.id}>
                    <Link 
                      to={`/activities?category=${category.id}`}
                      className="group block relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 aspect-[4/3]"
                    >
                      {/* Image Background */}
                      <div className="absolute inset-0">
                        <img 
                          src={category.imageUrl} 
                          alt={category.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/80 via-black/30" />
                      </div>

                      {/* Content */}
                      <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                        <h3 className="mb-2 font-serif text-xl font-bold transition-colors group-hover:text-secondary">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-200 transition-colors line-clamp-2 group-hover:text-white/90">
                          {category.description}
                        </p>

                        {/* Activity Count Badge */}
                        <div className="inline-flex gap-1 items-center px-3 py-1 mt-4 text-sm rounded-full backdrop-blur-sm bg-white/20">
                          <span className="font-medium">{category.totalActivities}</span>
                          <span>Aktivitas</span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 justify-center mt-12">
              <Link 
                to="/activities?category=nature"
                className="px-4 py-2 text-sm text-gray-700 bg-white rounded-full shadow-sm transition-shadow hover:shadow-md hover:text-primary"
              >
                🏞️ Wisata Alam
              </Link>
              <Link 
                to="/activities?category=culture"
                className="px-4 py-2 text-sm text-gray-700 bg-white rounded-full shadow-sm transition-shadow hover:shadow-md hover:text-primary"
              >
                🏛️ Wisata Budaya
              </Link>
              <Link 
                to="/activities?category=culinary"
                className="px-4 py-2 text-sm text-gray-700 bg-white rounded-full shadow-sm transition-shadow hover:shadow-md hover:text-primary"
              >
                🍜 Wisata Kuliner
              </Link>
              <Link 
                to="/activities?category=adventure"
                className="px-4 py-2 text-sm text-gray-700 bg-white rounded-full shadow-sm transition-shadow hover:shadow-md hover:text-primary"
              >
                🏃 Petualangan
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Activities */}
      <section>
        <Container>
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
                Aktivitas Populer
              </h2>
              <p className="text-gray-600">
                Jelajahi aktivitas yang paling diminati
              </p>
            </div>
            <Link 
              to="/activities"
              className="hidden gap-2 items-center md:flex text-primary hover:text-primary/80"
            >
              Lihat Semua
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                id={activity.id}
                title={activity.title}
                description={activity.description}
                imageUrl={activity.imageUrls[0]}
                price={activity.price}
                rating={activity.rating}
              />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link 
              to="/activities"
              className="btn btn-outline"
            >
              Lihat Semua Aktivitas
            </Link>
          </div>
        </Container>
      </section>

      {/* Promo Section */}
      {promos.length > 0 && (
        <section className="bg-secondary/10">
          <Container>
            <div className="py-16">
              <h2 className="mb-8 font-serif text-3xl font-bold text-center md:text-4xl text-primary">
                Promo Spesial
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {promos.map((promo) => (
                  <div 
                    key={promo.id}
                    className="flex overflow-hidden flex-col bg-white rounded-lg shadow-sm transition-shadow group hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="relative">
                      <img 
                        src={promo.imageUrl} 
                        alt={promo.title}
                        className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                        Hemat Rp {promo.promo_discount_price.toLocaleString('id-ID')}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-6">
                      {/* Title & Code */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {promo.title}
                        </h3>
                        <span className="px-2 py-1 font-mono text-sm rounded bg-primary/5 text-primary">
                          {promo.promo_code}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mb-4 text-gray-600 line-clamp-2">
                        {promo.description}
                      </p>

                      {/* Terms & Min Claim */}
                      <div className="mt-auto space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>Minimum Pembelian:</span>
                          <span className="font-medium">
                            Rp {promo.minimum_claim_price.toLocaleString('id-ID')}
                          </span>
                        </div>
                        
                        {/* Divider */}
                        <hr className="border-gray-100" />

                        {/* Terms & Conditions */}
                        <div>
                          <p className="mb-1 font-medium text-gray-600">Syarat & Ketentuan:</p>
                          <p className="text-sm text-gray-500">
                            {promo.terms_condition}
                          </p>
                        </div>

                        {/* Valid Until */}
                        <div className="text-sm text-gray-500">
                          Berlaku hingga: {new Date(promo.updatedAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link 
                        to="/activities" 
                        className="block px-4 py-2 mt-6 text-center text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
                      >
                        Gunakan Sekarang
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Trust Banner */}
      <section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-serif text-3xl font-bold text-primary">
              Dipercaya oleh Ribuan Traveler
            </h2>
            <p className="mb-8 text-gray-600">
              TravelAku telah membantu lebih dari 10,000 traveler menemukan pengalaman wisata terbaik mereka. Bergabunglah bersama kami dan mulai petualanganmu!
            </p>
            <div className="flex gap-8 justify-center">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-gray-600">Pengguna Aktif</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Destinasi</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4.8/5</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
} 