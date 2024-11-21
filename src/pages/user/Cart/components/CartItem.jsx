import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateCartQuantity, removeFromCart } from '../../../../store/slices/cartSlice'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function CartItem({ item, isSelected, onSelect }) {
  const dispatch = useDispatch()

  const handleQuantityChange = async (newQuantity) => {
    if (!item || !item.id) {
      console.error('Invalid item data:', item)
      return
    }

    if (newQuantity < 1) return

    try {
      console.log('Updating quantity:', { cartId: item.id, quantity: newQuantity })
      
      await dispatch(updateCartQuantity({
        cartId: item.id,
        quantity: newQuantity
      })).unwrap()
    } catch (error) {
      console.error('Failed to update quantity:', error)
      alert('Gagal mengubah jumlah item. Silakan coba lagi.')
    }
  }

  const handleRemove = async () => {
    if (!item || !item.id) {
      console.error('Invalid item data:', item)
      return
    }

    if (window.confirm('Hapus item ini dari keranjang?')) {
      try {
        await dispatch(removeFromCart(item.id)).unwrap()
      } catch (error) {
        console.error('Failed to remove item:', error)
        alert('Gagal menghapus item')
      }
    }
  }

  // Jika item tidak valid, jangan render apa-apa
  if (!item || !item.activity) {
    return null
  }

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => onSelect(e.target.checked)}
        className="mt-2"
      />

      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={item.activity?.imageUrls?.[0] || '/placeholder.png'}
          alt={item.activity?.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Info */}
      <div className="flex-grow">
        <h3 className="font-medium">{item.activity?.title}</h3>
        <p className="text-primary font-medium">
          Rp {item.activity?.price?.toLocaleString('id-ID')}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-2 py-1 border rounded"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-2 py-1 border rounded"
          >
            +
          </button>
          <button
            onClick={handleRemove}
            className="ml-4 text-red-600 hover:text-red-700"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    activity: PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.number,
      imageUrls: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
} 