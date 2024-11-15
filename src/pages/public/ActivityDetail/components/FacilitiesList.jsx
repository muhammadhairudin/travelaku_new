import PropTypes from 'prop-types'

export default function FacilitiesList({ facilities }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-serif font-bold text-primary mb-4">
        Fasilitas
      </h2>
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: facilities }}
      />
    </div>
  )
}

FacilitiesList.propTypes = {
  facilities: PropTypes.string.isRequired,
} 