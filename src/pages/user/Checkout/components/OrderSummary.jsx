import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTransaction } from '../../../../store/slices/transactionSlice'

export default function OrderSummary({ items }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.transaction)
  const [promoCode, setPromoCode] = useState('')

  const subtotal = items.reduce((total, item) => {
    const price = item.activity.priceDiscount || item.activity.price
    return total + price
  }, 0)

  const handleCheckout = async () => {
    try {
      const result = await dispatch(createTransaction({
        cartIds: items.map(item => item.id),
        promoCode: promoCode || undefined
      })).unwrap()

      // Redirect ke halaman pembayaran dengan ID transaksi
      navigate(`/payment/${result.id}`)
    } catch (err) {
      console.error('Failed to create transaction:', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-xl font-serif font-bold text-primary mb-6">
        Ringkasan Pesanan
      </h2>

      {/* Item List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.activity.title}</span>
            <span className="font-medium">
              Rp {(item.activity.priceDiscount || item.activity.price).toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kode Promo
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Masukkan kode promo"
          />
          <button className="btn btn-outline btn-sm">
            Terapkan
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2 border-t pt-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">
            Rp {subtotal.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        className={`w-full btn btn-primary ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Memproses...' : 'Bayar Sekarang'}
      </button>
    </div>
  )
}

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      activity: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        priceDiscount: PropTypes.number,
      }).isRequired,
    })
  ).isRequired,
} 