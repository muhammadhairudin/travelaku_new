import PropTypes from 'prop-types'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ActionButtons({ status, onApprove, onReject }) {
  if (status !== 'pending') return null

  return (
    <div className="flex gap-2">
      <button
        onClick={onApprove}
        className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
      >
        <CheckIcon className="w-4 h-4" />
        Terima
      </button>
      <button
        onClick={onReject}
        className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
      >
        <XMarkIcon className="w-4 h-4" />
        Tolak
      </button>
    </div>
  )
}

ActionButtons.propTypes = {
  status: PropTypes.string.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
} 