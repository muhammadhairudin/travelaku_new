import PropTypes from 'prop-types'

export default function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium">{value || '-'}</p>
    </div>
  )
}

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
} 