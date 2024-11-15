import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from '../../../components/common/Container'
import CartItem from './components/CartItem'
import CartSummary from './components/CartSummary'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchCart } from '../../../store/slices/cartSlice'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items = [], isLoading, error } = useSelector((state) => state.cart)
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const handleItemSelect = (itemId, isSelected) => {
    setSelectedItems(prev => {
      if (isSelected) {
        return [...prev, itemId]
      } else {
        return prev.filter(id => id !== itemId)
      }
    })
  }

  const handleSelectAll = (isSelected) => {
    if (isSelected && items) {
      setSelectedItems(items.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      // Tampilkan pesan error
      return
    }
    navigate('/checkout', { state: { cartItems: selectedItems } })
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-red-500 text-center">{error}</div>
  if (!items || items.length === 0) {
    return (
      <Container className="py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBagIcon className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">
            Keranjang Kosong
          </h2>
          <p className="text-gray-600 mb-8">
            Anda belum menambahkan aktivitas ke keranjang. Jelajahi berbagai aktivitas menarik yang kami tawarkan.
          </p>
          <button
            onClick={() => navigate('/activities')}
            className="btn btn-primary w-full md:w-auto"
          >
            Jelajahi Aktivitas
          </button>
        </div>
      </Container>
    )
  }

  const selectedItemsData = items.filter(item => item && item.id && selectedItems.includes(item.id)) || []
  const totalPrice = selectedItemsData.reduce((sum, item) => sum + (item.activity?.price * item.quantity), 0)

  return (
    <Container className="py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-primary">
            Keranjang Belanja
          </h1>
          <span className="text-gray-600">
            {items.length} {items.length > 1 ? 'items' : 'item'}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow space-y-6">
            {/* Select All */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={items.length > 0 && selectedItems.length === items.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="font-medium">Pilih Semua ({items.length})</span>
              </label>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => item && (
                <CartItem
                  key={item.id}
                  {...item}
                  isSelected={selectedItems.includes(item.id)}
                  onSelect={handleItemSelect}
                />
              ))}
            </div>
          </div>

          {/* Summary - Memperlebar container */}
          <div className="lg:w-[400px]">
            <CartSummary
              totalItems={selectedItems.length}
              totalPrice={totalPrice}
              onCheckout={handleCheckout}
              disabled={selectedItems.length === 0}
            />
          </div>
        </div>
      </div>
    </Container>
  )
} 