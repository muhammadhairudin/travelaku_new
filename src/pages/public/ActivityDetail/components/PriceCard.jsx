import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../../store/slices/cartSlice'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

export default function PriceCard({ activity }) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const isAdmin = user?.role === 'admin'
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!activity) {
    return null
  }

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({
        activityId: activity.id,
        quantity
      })).unwrap()
      // Tampilkan notifikasi sukses
    } catch (err) {
      console.error('Failed to add to cart:', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Rp {activity?.price?.toLocaleString('id-ID')}
          </h2>
          {activity?.rating && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-400">★</span>
              <span className="font-medium">{activity.rating}</span>
              <span className="text-gray-500">({activity.totalReviews || 0})</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`p-2 rounded-full ${
            isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          {isWishlisted ? (
            <HeartSolidIcon className="w-6 h-6" />
          ) : (
            <HeartIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Hanya tampilkan form pemesanan jika bukan admin */}
      {!isAdmin && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Pemesanan
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm mb-6">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold text-lg">
              Rp {(activity.price * quantity).toLocaleString('id-ID')}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full btn btn-primary"
          >
            Pesan Sekarang
          </button>
        </>
      )}

      {/* Pesan untuk admin */}
      {isAdmin && (
        <div className="text-center text-gray-500 mt-4">
          Admin tidak dapat melakukan pemesanan aktivitas
        </div>
      )}
    </div>
  )
}

PriceCard.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
    totalReviews: PropTypes.number,
  }).isRequired,
} 