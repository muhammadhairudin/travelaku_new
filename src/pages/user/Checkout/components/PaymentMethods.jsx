import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import api from '../../../../lib/axios'

export default function PaymentMethods({ selected, onSelect }) {
  const [expandedMethod, setExpandedMethod] = useState('bank')
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/api/v1/payment-methods')
        if (response?.data?.data) {
          setPaymentMethods(response.data.data)
        }
      } catch (err) {
        console.error('Failed to fetch payment methods:', err)
        setError('Gagal memuat metode pembayaran')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPaymentMethods()
  }, [])

  const handleMethodClick = (method) => {
    if (selected?.id === method.id) {
      onSelect(null)
    } else {
      onSelect(method)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Metode Pembayaran</h3>
        {!selected && (
          <span className="text-sm text-red-500">
            * Pilih metode pembayaran
          </span>
        )}
      </div>

      <div className={`border rounded-lg overflow-hidden ${!selected ? 'border-red-200' : ''}`}>
        <div className="p-4 bg-white border-b">
          <div className="flex justify-between items-center">
            <span className="font-medium">Transfer Bank</span>
            <ChevronDownIcon 
              className={`w-5 h-5 transition-transform ${
                expandedMethod === 'bank' ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>

        <div className="divide-y">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              type="button"
              onClick={() => handleMethodClick(method)}
              className={`w-full p-4 text-left hover:bg-gray-50 ${
                selected?.id === method.id ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {method.imageUrl && (
                    <img 
                      src={method.imageUrl} 
                      alt={method.name}
                      className="h-8 w-auto object-contain"
                    />
                  )}
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-gray-500">
                      Transfer Bank {method.name}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-primary">
                  {selected?.id === method.id && (
                    <div className="m-auto w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="p-4 mt-4 rounded-lg bg-primary/5">
          <div className="flex items-center gap-3">
            {selected.imageUrl && (
              <img 
                src={selected.imageUrl} 
                alt={selected.name}
                className="h-8 w-auto object-contain"
              />
            )}
            <div>
              <p className="font-medium">Metode Pembayaran Dipilih:</p>
              <p className="text-primary">Transfer Bank {selected.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

PaymentMethods.propTypes = {
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
} 