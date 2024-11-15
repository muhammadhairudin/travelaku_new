import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchAllPromos } from '../../../store/slices/adminSlice'
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline'
import PromoModal from './components/PromoModal'

export default function AdminPromos() {
  const dispatch = useDispatch()
  const { promos, isLoading } = useSelector((state) => state.admin)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState(null)

  useEffect(() => {
    dispatch(fetchAllPromos())
  }, [dispatch])

  const handleEdit = (promo) => {
    setSelectedPromo(promo)
    setShowModal(true)
  }

  const handleDelete = async (promoId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus promo ini?')) {
      try {
        await dispatch(deletePromo(promoId)).unwrap()
        dispatch(fetchAllPromos())
      } catch (err) {
        console.error('Failed to delete promo:', err)
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (selectedPromo) {
        await dispatch(updatePromo({
          id: selectedPromo.id,
          data: formData
        })).unwrap()
      } else {
        await dispatch(createPromo(formData)).unwrap()
      }
      dispatch(fetchAllPromos())
      setShowModal(false)
      setSelectedPromo(null)
    } catch (err) {
      console.error('Failed to save promo:', err)
    }
  }

  const filteredPromos = promos?.filter(promo => 
    promo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (isLoading) return <LoadingSpinner />

  return (
    <Container className="py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Manajemen Promo
          </h1>
          <p className="text-gray-600">
            Kelola promo dan diskon
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedPromo(null)
            setShowModal(true)
          }}
          className="btn btn-primary gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Promo
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari promo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Promos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromos.map((promo) => (
          <div 
            key={promo.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
          >
            {/* Promo Image */}
            <div className="aspect-[16/9] relative">
              {promo.imageUrl ? (
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <PhotoIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              {/* Discount Badge */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Hemat Rp {promo.promo_discount_price.toLocaleString('id-ID')}
              </div>
            </div>

            {/* Promo Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg text-gray-900">
                  {promo.title}
                </h3>
                <span className="text-sm font-mono bg-primary/5 text-primary px-2 py-1 rounded">
                  {promo.promo_code}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {promo.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Minimum Pembelian:</span>
                  <span className="font-medium">
                    Rp {promo.minimum_claim_price.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    promo.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {promo.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleEdit(promo)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(promo.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Modal */}
      <PromoModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedPromo(null)
        }}
        promo={selectedPromo}
        onSubmit={handleSubmit}
      />
    </Container>
  )
} 