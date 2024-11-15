import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from '../../../components/common/Container'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchWishlist, removeFromWishlist } from '../../../store/slices/wishlistSlice'
import { HeartIcon } from '@heroicons/react/24/solid'

export default function Wishlist() {
  const dispatch = useDispatch()
  const { items, isLoading, error } = useSelector((state) => state.wishlist)

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])

  const handleRemove = async (wishlistId) => {
    try {
      await dispatch(removeFromWishlist(wishlistId)).unwrap()
    } catch (err) {
      console.error('Failed to remove from wishlist:', err)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-red-500 text-center">{error}</div>
  if (items.length === 0) {
    return (
      <Container className="py-16">
        <div className="max-w-md mx-auto text-center">
          <HeartIcon className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">
            Wishlist Kosong
          </h2>
          <p className="text-gray-600 mb-8">
            Anda belum menambahkan aktivitas ke wishlist. Jelajahi berbagai aktivitas menarik yang kami tawarkan.
          </p>
          <Link 
            to="/activities"
            className="btn btn-primary"
          >
            Jelajahi Aktivitas
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">
        Wishlist Saya
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
          >
            <Link to={`/activities/${item.activityId}`}>
              <div className="aspect-[4/3] relative">
                <img 
                  src={item.activity.imageUrls[0]} 
                  alt={item.activity.title}
                  className="w-full h-full object-cover"
                />
                {item.activity.priceDiscount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    Diskon!
                  </div>
                )}
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/activities/${item.activityId}`}>
                <h3 className="font-medium text-lg mb-2 hover:text-primary">
                  {item.activity.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {item.activity.description}
              </p>
              
              <div className="flex justify-between items-center">
                <div>
                  {item.activity.priceDiscount ? (
                    <>
                      <span className="text-lg font-bold text-primary">
                        Rp {item.activity.priceDiscount.toLocaleString('id-ID')}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        Rp {item.activity.price.toLocaleString('id-ID')}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-primary">
                      Rp {item.activity.price.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <HeartIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
} 