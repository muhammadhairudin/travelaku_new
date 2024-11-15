import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import ImageGallery from './components/ImageGallery'
import ActivityInfo from './components/ActivityInfo'
import PriceCard from './components/PriceCard'
import FacilitiesList from './components/FacilitiesList'
import LocationMap from './components/LocationMap'
import Reviews from './components/Reviews'
import RelatedActivities from './components/RelatedActivities'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchActivityById } from '../../../store/slices/activitySlice'

export default function ActivityDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentActivity: activity, isLoading, error } = useSelector((state) => state.activities)

  useEffect(() => {
    dispatch(fetchActivityById(id))
  }, [dispatch, id])

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-center text-red-500">{error}</div>
  if (!activity) return null

  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery images={activity.imageUrls || []} />
          <ActivityInfo activity={activity} />
          <FacilitiesList facilities={activity.facilities || []} />
          <LocationMap 
            address={activity.address || ''} 
            province={activity.province || ''}
            city={activity.city || ''}
            locationMap={activity.locationMap}
          />
          <Reviews activityId={activity.id} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <PriceCard 
              activityId={activity.id}
              title={activity.title}
              description={activity.description}
              imageUrl={activity.imageUrls?.[0]}
              price={activity.price || 0}
              priceDiscount={activity.priceDiscount}
              rating={activity.rating || 0}
              totalReviews={activity.totalReviews || 0}
            />
          </div>
        </div>
      </div>

      {/* Related Activities */}
      <div className="mt-16">
        <RelatedActivities currentActivityId={activity.id} />
      </div>
    </Container>
  )
} 