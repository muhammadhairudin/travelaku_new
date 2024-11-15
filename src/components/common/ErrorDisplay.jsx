import PropTypes from 'prop-types'

export default function ErrorDisplay({ error }) {
  if (!error) return null

  const errorMessage = typeof error === 'string' 
    ? error 
    : error?.message || 'Terjadi kesalahan'

  return (
    <div className="text-center text-red-500 p-4">
      {errorMessage}
    </div>
  )
}

ErrorDisplay.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
} 