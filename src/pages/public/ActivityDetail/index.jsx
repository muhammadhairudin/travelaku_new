import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import { addToCart } from '../../../store/slices/cartSlice'
import api from '../../../lib/axios'
import { HeartIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

export default function ActivityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  
  const [activity, setActivity] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(`/api/v1/activity/${id}`)
        setActivity(response.data.data)
      } catch (err) {
        console.error('Failed to fetch activity:', err)
        setError('Gagal memuat data aktivitas')
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
  }, [id])

  const handleAddToCart = async () => {
    if (!token) {
      navigate('/login', { state: { from: `/activities/${id}` } })
      return
    }

    try {
      await dispatch(addToCart({ 
        activityId: id,
        quantity 
      })).unwrap()
      
      setTimeout(() => {
        alert('Berhasil ditambahkan ke keranjang')
      }, 500)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      alert(error.message || 'Gagal menambahkan ke keranjang')
    }
  }

  const handleToggleWishlist = async () => {
    if (!token) {
      navigate('/login', { state: { from: `/activities/${id}` } })
      return
    }

    try {
      if (isWishlisted) {
        await api.delete(`/api/v1/remove-wishlist/${id}`)
      } else {
        await api.post('/api/v1/add-wishlist', { activityId: id })
      }
      setIsWishlisted(!isWishlisted)
    } catch (error) {
      console.error('Failed to toggle wishlist:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!activity) return <div>Aktivitas tidak ditemukan</div>

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={activity.imageUrls?.[0] || '/placeholder.png'}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {activity.imageUrls?.slice(1).map((url, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={url}
                  alt={`${activity.title} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Activity Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{activity.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span>{activity.rating}</span>
                <span className="text-gray-500">({activity.total_reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPinIcon className="w-5 h-5" />
                <span>{activity.city}, {activity.province}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-b py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-primary">
                  Rp {activity.price?.toLocaleString('id-ID')}
                </p>
                {activity.price_discount && (
                  <p className="text-sm text-gray-500 line-through">
                    Rp {activity.price_discount?.toLocaleString('id-ID')}
                  </p>
                )}
              </div>
              <button
                onClick={handleToggleWishlist}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Deskripsi</h2>
            <p className="text-gray-600">{activity.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Fasilitas</h2>
            <p className="text-gray-600">{activity.facilities}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Lokasi</h2>
            <p className="text-gray-600">{activity.address}</p>
            {activity.location_maps && (
              <a
                href={activity.location_maps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Lihat di Google Maps
              </a>
            )}
          </div>

          {/* Add to Cart Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-2 hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 btn btn-primary"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
} 