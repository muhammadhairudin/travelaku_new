import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import Container from '../../../components/common/Container'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function PaymentSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { amount, items, paymentMethod } = location.state || {}

  useEffect(() => {
    // Redirect ke home jika tidak ada data transaksi
    if (!amount || !items || !paymentMethod) {
      navigate('/')
    }
  }, [amount, items, paymentMethod, navigate])

  if (!amount || !items || !paymentMethod) {
    return null
  }

  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold mb-4">
          Pembayaran Berhasil!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Silakan lakukan pembayaran sesuai dengan metode yang dipilih
        </p>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <span className="font-medium">Total Pembayaran</span>
            <span className="text-xl font-bold">
              Rp {amount.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Metode Pembayaran</span>
            <div className="flex items-center gap-2">
              {paymentMethod.imageUrl && (
                <img 
                  src={paymentMethod.imageUrl} 
                  alt={paymentMethod.name}
                  className="h-6 w-auto"
                />
              )}
              <span>Transfer Bank {paymentMethod.name}</span>
            </div>
          </div>

          <div className="text-sm text-gray-600 text-left">
            <p className="font-medium mb-2">Instruksi Pembayaran:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Buka aplikasi m-banking atau internet banking Anda</li>
              <li>Pilih menu transfer</li>
              <li>Masukkan nominal sesuai total pembayaran</li>
              <li>Simpan bukti pembayaran</li>
              <li>Upload bukti pembayaran di halaman transaksi</li>
            </ol>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link 
            to="/transactions" 
            className="btn btn-primary"
          >
            Lihat Transaksi
          </Link>
          <Link 
            to="/" 
            className="btn btn-outline"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </Container>
  )
} 