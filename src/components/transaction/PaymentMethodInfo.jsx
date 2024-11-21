import PropTypes from 'prop-types'

export default function PaymentMethodInfo({ method }) {
  if (!method) return null

  return (
    <div>
      <h4 className="text-sm text-gray-500 mb-2">Metode Pembayaran</h4>
      <div className="flex items-center gap-3 mb-4">
        {method.imageUrl && (
          <img 
            src={method.imageUrl} 
            alt={method.name}
            className="h-8 w-auto object-contain"
          />
        )}
        <div>
          <p className="font-medium">{method.name}</p>
          {method.virtual_account_number && (
            <p className="text-sm text-gray-500">
              VA: {method.virtual_account_number}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

PaymentMethodInfo.propTypes = {
  method: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    virtual_account_number: PropTypes.string
  })
} 