import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import ActivityCard from './components/ActivityCard'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import ErrorDisplay from '../../../components/common/ErrorDisplay'
import { fetchActivities } from '../../../store/slices/activitySlice'

export default function Activities() {
  const dispatch = useDispatch()
  const { items: activities, isLoading, error } = useSelector((state) => state.activities)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    const params = {
      ...(searchQuery && { q: searchQuery }),
      ...(selectedCategory && { categoryId: selectedCategory }),
    }
    dispatch(fetchActivities(params))
  }, [dispatch, searchQuery, selectedCategory])

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorDisplay error={error} />

  return (
    <Container className="py-12">
      <h1 className="mb-8 font-serif text-3xl font-bold md:text-4xl text-primary">
        Jelajahi Aktivitas
      </h1>

      <div className="flex flex-col gap-6 mb-8 md:flex-row">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
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
    </Container>
  )
} 