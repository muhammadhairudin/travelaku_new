import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

export default function OrderSummary({ selectedPaymentMethod }) {
  const location = useLocation()
  const selectedItems = location.state?.selectedItems || []

  // Hitung subtotal dari item yang dipilih
  const subtotal = selectedItems.reduce((acc, item) => {
    const price = item.activity?.price || 0
    const quantity = item.quantity || 1
    return acc + (price * quantity)
  }, 0)

  // Hitung biaya layanan (5% dari subtotal)
  const serviceFee = subtotal * 0.05

  // Total pembayaran
  const total = subtotal + serviceFee

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">Ringkasan Pesanan</h3>
      
      {/* Daftar Item */}
      <div className="space-y-4 mb-6">
        {selectedItems.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-medium">{item.activity?.title}</p>
              <p className="text-sm text-gray-500">
                {item.quantity || 1} x Rp {item.activity?.price?.toLocaleString('id-ID')}
              </p>
            </div>
            <p className="font-medium">
              Rp {((item.activity?.price || 0) * (item.quantity || 1)).toLocaleString('id-ID')}
            </p>
          </div>
        ))}
      </div>

      {/* Rincian Pembayaran */}
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Biaya Layanan (5%)</p>
          <p className="font-medium">Rp {serviceFee.toLocaleString('id-ID')}</p>
        </div>
        {selectedPaymentMethod?.name && (
          <div className="flex justify-between">
            <p className="text-gray-600">Metode Pembayaran</p>
            <p className="font-medium">{selectedPaymentMethod.name}</p>
          </div>
        )}
        <div className="flex justify-between border-t pt-3">
          <p className="font-bold">Total</p>
          <p className="font-bold text-primary">
            Rp {total.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  )
}

OrderSummary.propTypes = {
  selectedPaymentMethod: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
} 