import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function PromoModal({ 
  isOpen, 
  onClose, 
  promo = null,
  onSubmit 
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    promoCode: '',
    promoDiscountPrice: '',
    minimumClaimPrice: '',
    termsCondition: '',
    isActive: true
  })

  useEffect(() => {
    if (promo) {
      setFormData({
        title: promo.title || '',
        description: promo.description || '',
        imageUrl: promo.imageUrl || '',
        promoCode: promo.promoCode || '',
        promoDiscountPrice: promo.promoDiscountPrice || '',
        minimumClaimPrice: promo.minimumClaimPrice || '',
        termsCondition: promo.termsCondition || '',
        isActive: promo.isActive ?? true
      })
    } else {
      // Reset form saat membuat promo baru
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        promoCode: '',
        promoDiscountPrice: '',
        minimumClaimPrice: '',
        termsCondition: '',
        isActive: true
      })
    }
  }, [promo])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      promoDiscountPrice: Number(formData.promoDiscountPrice),
      minimumClaimPrice: Number(formData.minimumClaimPrice)
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {promo ? 'Edit Promo' : 'Tambah Promo'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Judul Promo
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  URL Gambar
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kode Promo
                </label>
                <input
                  type="text"
                  name="promoCode"
                  value={formData.promoCode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              {/* Discount & Minimum Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nilai Diskon (Rp)
                  </label>
                  <input
                    type="number"
                    name="promoDiscountPrice"
                    value={formData.promoDiscountPrice}
                    onChange={handleChange}
                    min="0"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Minimum Pembelian (Rp)
                  </label>
                  <input
                    type="number"
                    name="minimumClaimPrice"
                    value={formData.minimumClaimPrice}
                    onChange={handleChange}
                    min="0"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Syarat & Ketentuan
                </label>
                <textarea
                  name="termsCondition"
                  value={formData.termsCondition}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              {/* Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Aktif
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
              >
                {promo ? 'Simpan' : 'Tambah'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

PromoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  promo: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
} 