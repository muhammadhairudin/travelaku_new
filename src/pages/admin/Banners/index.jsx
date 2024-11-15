import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchAllBanners, createBanner, updateBanner, deleteBanner } from '../../../store/slices/adminSlice'
import { PlusIcon } from '@heroicons/react/24/outline'
import BannerModal from './components/BannerModal'

export default function AdminBanners() {
  const dispatch = useDispatch()
  const { banners = [], isLoading, error } = useSelector((state) => state.admin)
  const [showModal, setShowModal] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    dispatch(fetchAllBanners())
  }, [dispatch])

  const handleSubmit = async (formData) => {
    try {
      setSubmitError(null)
      if (selectedBanner) {
        await dispatch(updateBanner({
          id: selectedBanner.id,
          data: formData
        })).unwrap()
      } else {
        await dispatch(createBanner(formData)).unwrap()
      }
      // Refresh data setelah sukses
      dispatch(fetchAllBanners())
      setShowModal(false)
      setSelectedBanner(null)
    } catch (err) {
      console.error('Failed to save banner:', err)
      setSubmitError(err.message || 'Gagal menyimpan banner')
    }
  }

  const handleDelete = async (bannerId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus banner ini?')) {
      try {
        await dispatch(deleteBanner(bannerId)).unwrap()
        dispatch(fetchAllBanners()) // Refresh data setelah hapus
      } catch (err) {
        console.error('Failed to delete banner:', err)
      }
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <Container className="py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Manajemen Banner
          </h1>
          <p className="text-gray-600">
            Kelola banner yang ditampilkan di halaman utama
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedBanner(null)
            setShowModal(true)
            setSubmitError(null)
          }}
          className="btn btn-primary gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Banner
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Banner Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(banners) && banners.map((banner) => (
          banner && (
            <div 
              key={banner.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              {/* Banner Image */}
              <div className="aspect-[16/9] relative">
                <img
                  src={banner.imageUrl || 'https://via.placeholder.com/640x360?text=No+Image'}
                  alt={banner.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/640x360?text=Image+Not+Found'
                  }}
                />
              </div>

              {/* Banner Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-lg text-gray-900">
                    {banner.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    banner.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {banner.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedBanner(banner)
                      setShowModal(true)
                      setSubmitError(null)
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Banner Modal */}
      <BannerModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedBanner(null)
          setSubmitError(null)
        }}
        banner={selectedBanner}
        onSubmit={handleSubmit}
        error={submitError}
      />
    </Container>
  )
} 