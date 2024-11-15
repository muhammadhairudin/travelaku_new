import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StarIcon } from '@heroicons/react/24/solid'
import { fetchActivityReviews, createReview } from '../../../../store/slices/reviewSlice'
import LoadingSpinner from '../../../../components/common/LoadingSpinner'

export default function Reviews({ activityId }) {
  const dispatch = useDispatch()
  const { items: reviews, isLoading, error } = useSelector((state) => state.reviews)
  const { token } = useSelector((state) => state.auth)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  })

  useEffect(() => {
    dispatch(fetchActivityReviews(activityId))
  }, [dispatch, activityId])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!token) {
      // Handle not logged in state
      return
    }

    try {
      await dispatch(createReview({
        activityId,
        ...newReview
      })).unwrap()
      // Reset form
      setNewReview({ rating: 5, comment: '' })
    } catch (err) {
      console.error('Failed to submit review:', err)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-serif font-bold text-primary mb-6">
        Ulasan ({reviews.length})
      </h2>

      {/* Review Form */}
      {token && (
        <form onSubmit={handleSubmitReview} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                  className="focus:outline-none"
                >
                  <StarIcon
                    className={`h-6 w-6 ${
                      star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Komentar
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Mengirim...' : 'Kirim Ulasan'}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{review.user?.name || 'Anonymous'}</h3>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`h-4 w-4 ${
                        index < review.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString('id-ID')}
              </span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

Reviews.propTypes = {
  activityId: PropTypes.string.isRequired,
} 