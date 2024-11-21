import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import CartItem from './components/CartItem'
import CartSummary from './components/CartSummary'
import { fetchCart } from '../../../store/slices/cartSlice'
import LoadingSpinner from '../../../components/common/LoadingSpinner'

export default function Cart() {
  const dispatch = useDispatch()
  const { items = [], isLoading, error } = useSelector((state) => state.cart)
  const [selectedItems, setSelectedItems] = useState([])
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const result = await dispatch(fetchCart()).unwrap()
        console.log('Cart loaded:', result)
        
        setRetryCount(0)
      } catch (err) {
        console.error('Failed to fetch cart:', err)
        
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1)
          }, 1000)
        }
      }
    }

    loadCart()
  }, [dispatch, retryCount])

  useEffect(() => {
    setSelectedItems([])
  }, [items])

  const handleSelectItem = (item, isSelected) => {
    if (isSelected) {
      setSelectedItems(prev => [...prev, item])
    } else {
      setSelectedItems(prev => prev.filter(i => i.id !== item.id))
    }
  }

  const handleSelectAll = (checked) => {
    if (checked && items?.length > 0) {
      setSelectedItems(items)
    } else {
      setSelectedItems([])
    }
  }

  if (isLoading && items.length === 0) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => setRetryCount(prev => prev + 1)}
            className="text-primary hover:underline"
          >
            Coba lagi
          </button>
        </div>
      </Container>
    )
  }

  if (!items || items.length === 0) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Keranjang Belanja</h2>
          <p className="text-gray-600 mb-4">Keranjang belanja Anda masih kosong</p>
          <button
            onClick={() => window.location.href = '/activities'}
            className="text-primary hover:underline"
          >
            Jelajahi Aktivitas
          </button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Keranjang Belanja</h1>
        <p>{items.length} items</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Select All Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={items && selectedItems.length === items.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span>Pilih Semua ({items.length})</span>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              item && (
                <CartItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.some(i => i.id === item.id)}
                  onSelect={(checked) => handleSelectItem(item, checked)}
                />
              )
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div>
          <CartSummary 
            selectedItems={selectedItems}
          />
        </div>
      </div>

      {isLoading && items.length > 0 && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </Container>
  )
} 