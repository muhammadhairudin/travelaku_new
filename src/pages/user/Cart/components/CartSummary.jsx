import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function CartSummary({ 
  totalItems = 0,
  totalPrice = 0,
  onCheckout,
  disabled = false 
}) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingBagIcon className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-serif font-bold text-primary">
          Ringkasan Belanja
        </h2>
      </div>

      {/* Summary Details */}
      <div className="space-y-4">
        {/* Items Count */}
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex items-center gap-2">
            <span>Total Item</span>
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              {totalItems} items
            </span>
          </div>
          <span className="font-medium">{totalItems}</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">
            Rp {totalPrice.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center text-gray-600">
          <span>Pajak (11%)</span>
          <span className="font-medium">
            Rp {Math.round(totalPrice * 0.11).toLocaleString('id-ID')}
          </span>
        </div>

        {/* Service Fee */}
        <div className="flex justify-between items-center text-gray-600">
          <span>Biaya Layanan</span>
          <span className="font-medium">
            Rp {(1_000).toLocaleString('id-ID')}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-4" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Total</span>
          <div className="text-right">
            <span className="block text-xl font-bold text-primary">
              Rp {(totalPrice + Math.round(totalPrice * 0.11) + 1_000).toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-gray-500">
              Termasuk pajak dan biaya layanan
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          disabled={disabled}
          className={`w-full btn btn-primary mt-6 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {disabled ? (
            'Pilih item untuk checkout'
          ) : (
            'Checkout'
          )}
        </button>

        {/* Continue Shopping */}
        <button
          onClick={() => navigate('/activities')}
          className="w-full btn btn-outline mt-2"
        >
          Lanjut Belanja
        </button>
      </div>
    </div>
  )
}

CartSummary.propTypes = {
  totalItems: PropTypes.number,
  totalPrice: PropTypes.number,
  onCheckout: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
} 