import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Container from '../../../components/common/Container'
import CustomerInfo from './components/CustomerInfo'
import PaymentMethods from './components/PaymentMethods'
import OrderSummary from './components/OrderSummary'
import { createTransaction } from '../../../store/slices/transactionSlice'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = location.state?.cartItems || []

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const transaction = await dispatch(createTransaction({
        cartItems,
        customerInfo,
        paymentMethod
      })).unwrap()
      
      // Redirect ke halaman pembayaran dengan ID transaksi
      navigate(`/payment/${transaction.id}`)
    } catch (err) {
      console.error('Failed to create transaction:', err)
    }
  }

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CustomerInfo 
            value={customerInfo}
            onChange={setCustomerInfo}
          />
          <PaymentMethods
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary 
            cartItems={cartItems}
            onSubmit={handleSubmit}
          />
        </div>
      </form>
    </Container>
  )
} 