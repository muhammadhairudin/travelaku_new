import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartQuantity } from '../../../../store/slices/cartSlice'
import { TrashIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function CartItem({ 
  id, 
  activity, 
  quantity,
  isSelected,
  onSelect 
}) {
  const dispatch = useDispatch()
  const [showImageModal, setShowImageModal] = useState(false)

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return
    try {
      await dispatch(updateCartQuantity({ cartId: id, quantity: newQuantity })).unwrap()
    } catch (err) {
      console.error('Failed to update quantity:', err)
    }
  }

  const handleRemove = async () => {
    try {
      await dispatch(removeFromCart(id)).unwrap()
    } catch (err) {
      console.error('Failed to remove item:', err)
    }
  }

  return (
    <>
      <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
        <div className="flex gap-4">
          {/* Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(id, e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
          </div>

          {/* Image */}
          <div 
            className="overflow-hidden flex-shrink-0 w-24 h-24 cursor-pointer"
            onClick={() => setShowImageModal(true)}
          >
            <img
              src={activity.imageUrls[0]}
              alt={activity.title}
              className="object-cover w-full h-full rounded-lg transition-opacity hover:opacity-90"
            />
          </div>

          {/* Info */}
          <div className="flex-grow min-w-0">
            <h3 className="mb-1 text-base font-medium text-gray-900 truncate">{activity.title}</h3>
            <p className="mb-3 text-sm text-gray-600 line-clamp-2">{activity.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-base font-semibold text-primary">
                Rp {activity.price.toLocaleString('id-ID')}
              </div>
              
              <div className="flex gap-4 items-center">
                {/* Quantity Controls */}
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="flex justify-center items-center w-7 h-7 rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-sm font-medium text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="flex justify-center items-center w-7 h-7 rounded-full border border-gray-300 transition-colors hover:bg-gray-50"
                  >
                    <PlusIcon className="w-3 h-3" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={handleRemove}
                  className="p-1.5 text-red-500 transition-colors hover:text-red-600"
                  title="Hapus"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black bg-opacity-75">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute right-0 -top-12 text-white transition-colors hover:text-gray-300"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            <img
              src={activity.imageUrls[0]}
              alt={activity.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
} 