import PropTypes from 'prop-types'

export default function ProofOfPayment({ url }) {
  if (!url) return null

  return (
    <div>
      <img 
        src={url} 
        alt="Bukti Pembayaran"
        className="max-w-sm rounded-lg"
      />
    </div>
  )
}

ProofOfPayment.propTypes = {
  url: PropTypes.string.isRequired
} 