import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export default function CartSummary({ selectedItems = [] }) {
  const navigate = useNavigate()

  // Hitung subtotal
  const subtotal = selectedItems.reduce((acc, item) => {
    const price = item.activity?.price || 0
    const quantity = item.quantity || 1
    return acc + (price * quantity)
  }, 0)

  // Hitung biaya layanan (5%)
  const serviceFee = subtotal * 0.05

  // Total pembayaran
  const total = subtotal + serviceFee

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Pilih minimal 1 item untuk checkout')
      return
    }

    // Pastikan setiap item memiliki id yang valid
    const validItems = selectedItems.filter(item => item && item.id)
    if (validItems.length !== selectedItems.length) {
      alert('Ada item yang tidak valid')
      return
    }

    navigate('/checkout', { 
      state: { 
        selectedItems: validItems
      } 
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <h3 className="text-lg font-bold mb-4">Ringkasan Belanja</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <p className="text-gray-600">Total Item</p>
          <p>{selectedItems.length} items</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Biaya Layanan (5%)</p>
          <p className="font-medium">Rp {serviceFee.toLocaleString('id-ID')}</p>
        </div>
        <div className="flex justify-between border-t pt-3">
          <p className="font-bold">Total</p>
          <p className="font-bold text-primary">
            Rp {total.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={selectedItems.length === 0}
        className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors ${
          selectedItems.length === 0 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        Checkout ({selectedItems.length} items)
      </button>
    </div>
  )
}

CartSummary.propTypes = {
  selectedItems: PropTypes.array,
} 