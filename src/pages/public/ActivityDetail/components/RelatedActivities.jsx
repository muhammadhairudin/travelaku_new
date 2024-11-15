import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivities } from '../../../../store/slices/activitySlice'
import ActivityCard from '../../Activities/components/ActivityCard'
import LoadingSpinner from '../../../../components/common/LoadingSpinner'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function RelatedActivities({ currentActivityId }) {
  const dispatch = useDispatch()
  const { items: activities, isLoading, error } = useSelector((state) => state.activities)

  useEffect(() => {
    // Hanya fetch jika belum ada activities
    if (activities.length === 0) {
      dispatch(fetchActivities())
    }
  }, [dispatch, activities.length])

  if (isLoading && activities.length === 0) return <LoadingSpinner />
  if (error) return <div className="text-red-500">{error}</div>

  // Filter out current activity and get max 6 related activities
  const relatedActivities = activities
    .filter(activity => activity.id !== currentActivityId)
    .slice(0, 6)

  if (relatedActivities.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-primary mb-8">
        Aktivitas Terkait
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          loop={relatedActivities.length > 3}
          className="!pb-12"
        >
          {relatedActivities.map((activity) => (
            <SwiperSlide key={activity.id}>
              <ActivityCard
                id={activity.id}
                title={activity.title}
                description={activity.description}
                imageUrl={activity.imageUrls[0]}
                price={activity.price}
                rating={activity.rating}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

RelatedActivities.propTypes = {
  currentActivityId: PropTypes.string.isRequired,
} 