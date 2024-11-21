import PropTypes from 'prop-types'

export default function PaymentSummary({ totalAmount, serviceFee }) {
  return (
    <div>
      <h4 className="text-sm text-gray-500 mb-2">Ringkasan Pembayaran</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>Rp {(totalAmount - serviceFee).toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Biaya Layanan</span>
          <span>Rp {serviceFee.toLocaleString('id-ID')}</span>
        </div>
        <div className="pt-2 mt-2 border-t">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

PaymentSummary.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  serviceFee: PropTypes.number.isRequired
} 