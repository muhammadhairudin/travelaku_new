import PropTypes from 'prop-types'
import { useState } from 'react'

export default function ImageGallery({ images }) {
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <img
          src={images[activeImage]}
          alt="Activity"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`aspect-w-16 aspect-h-9 rounded-lg overflow-hidden ${
              index === activeImage ? 'ring-2 ring-primary' : ''
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
} 