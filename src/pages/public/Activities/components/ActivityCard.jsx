import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import { PhotoIcon } from '@heroicons/react/24/outline'

export default function ActivityCard({ 
  id, 
  title, 
  description, 
  imageUrl, 
  price, 
  rating 
}) {
  return (
    <Link 
      to={`/activities/${id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
    >
      {/* Image Container */}
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <PhotoIcon className="w-16 h-16 text-gray-400" />
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-white font-semibold">
            Rp {price.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <span className="font-medium">{rating || 0}</span>
        </div>
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  )
}

ActivityCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
} 