import PropTypes from 'prop-types'

export default function LocationMap({ address, province, city, locationMap }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-serif font-bold text-primary mb-6">
        Lokasi
      </h2>
      <p className="text-gray-600 mb-4">
        {address}, {city}, {province}
      </p>
      {locationMap && (
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={locationMap}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  )
}

LocationMap.propTypes = {
  address: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  locationMap: PropTypes.string,
} 