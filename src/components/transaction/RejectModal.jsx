import PropTypes from 'prop-types'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function RejectModal({ show, onClose, onReject }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Tolak Pembayaran</h3>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alasan Penolakan
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            rows="3"
            placeholder="Masukkan alasan penolakan..."
            onChange={(e) => onReject(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Batal
          </button>
          <button
            onClick={() => onReject()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Tolak Pembayaran
          </button>
        </div>
      </div>
    </div>
  )
}

RejectModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
} 