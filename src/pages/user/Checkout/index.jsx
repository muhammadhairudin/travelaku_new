import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import CustomerInfo from './components/CustomerInfo'
import OrderSummary from './components/OrderSummary'
import PaymentMethods from './components/PaymentMethods'
import { createTransaction } from '../../../store/slices/transactionSlice'
import { clearCart } from '../../../store/slices/cartSlice'

export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const { items: cartItems } = useSelector((state) => state.cart)
  
  const selectedItems = location.state?.selectedItems || []

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    notes: ''
  })

  useEffect(() => {
    if (user) {
      setCustomerInfo(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phoneNumber || prev.phone
      }))
    }
  }, [user])

  const isFormValid = () => {
    const phoneDigits = customerInfo.phone.replace(/\D/g, '')
    return (
      selectedItems.length > 0 &&
      selectedPaymentMethod !== null &&
      customerInfo.name.trim().length >= 3 &&
      customerInfo.email.includes('@') &&
      phoneDigits.length >= 10
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Validasi lebih detail
      if (!selectedItems.length) {
        throw new Error('Pilih item terlebih dahulu')
      }
      
      if (!selectedPaymentMethod) {
        throw new Error('Pilih metode pembayaran')
      }

      // Pastikan selectedPaymentMethod memiliki id
      if (!selectedPaymentMethod.id) {
        throw new Error('Metode pembayaran tidak valid')
      }

      // Pastikan cartIds dalam format array of strings
      const cartIds = selectedItems.map(item => item.id.toString())

      // Buat transaksi dengan format yang benar sesuai API
      const transactionData = {
        cartIds: cartIds,
        paymentMethodId: selectedPaymentMethod.id
      }

      // Kirim request
      const result = await dispatch(createTransaction(transactionData)).unwrap()
      
      console.log('Transaction Response:', result)

      if (result.status === 'OK' || result.code === '200') {
        dispatch(clearCart())
        // Redirect ke halaman transaksi user
        navigate('/transactions', {
          state: { message: 'Transaksi berhasil dibuat. Silakan upload bukti pembayaran.' }
        })
      } else {
        throw new Error(result.message || 'Gagal membuat transaksi')
      }
    } catch (error) {
      console.error('Checkout Error:', {
        error: error.message || error,
        selectedPaymentMethod,
        selectedItems,
        stack: error.stack
      })
      alert(error.message || 'Gagal melakukan checkout. Silakan coba lagi.')
    }
  }

  if (selectedItems.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <CustomerInfo 
            value={customerInfo}
            onChange={setCustomerInfo}
          />
          <PaymentMethods
            selected={selectedPaymentMethod}
            onSelect={setSelectedPaymentMethod}
          />
        </div>

        <div>
          <OrderSummary 
            selectedPaymentMethod={selectedPaymentMethod}
          />
          
          <button 
            type="submit"
            className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors ${
              isFormValid()
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isFormValid()}
          >
            {isFormValid() ? 'Bayar Sekarang' : 'Lengkapi Data'}
          </button>
        </div>
      </form>
    </Container>
  )
} 