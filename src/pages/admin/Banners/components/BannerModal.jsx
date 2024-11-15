import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { uploadService } from '../../../../services/uploadService'

export default function BannerModal({ 
  isOpen, 
  onClose, 
  banner = null,
  onSubmit,
  error 
}) {
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    isActive: true
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  useEffect(() => {
    if (banner) {
      setFormData({
        name: banner.name || '',
        imageUrl: banner.imageUrl || '',
        isActive: banner.isActive ?? true
      })
    } else {
      setFormData({
        name: '',
        imageUrl: '',
        isActive: true
      })
    }
  }, [banner])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    try {
      const response = await uploadService.uploadImage(file)
      setFormData(prev => ({
        ...prev,
        imageUrl: response.imageUrl
      }))
    } catch (err) {
      console.error('Upload error:', err)
      setUploadError(err.message || 'Gagal mengupload gambar')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.imageUrl) {
      setUploadError('Silakan upload gambar terlebih dahulu')
      return
    }
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {banner ? 'Edit Banner' : 'Tambah Banner'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Banner
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Banner
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1">
                  <div className="btn btn-secondary w-full cursor-pointer">
                    <PhotoIcon className="w-5 h-5" />
                    <span>Pilih Gambar</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {formData.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                    className="text-red-600 hover:text-red-700"
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>

            {/* Preview Image */}
            {formData.imageUrl && (
              <div className="mt-2">
                <div className="aspect-[16/9] relative rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/640x360?text=Invalid+Image+URL'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Error Messages */}
            {(error || uploadError) && (
              <div className="text-sm text-red-600">
                {error || uploadError}
              </div>
            )}

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
                disabled={isUploading}
                className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? 'Mengupload...' : banner ? 'Simpan' : 'Tambah'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

BannerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  banner: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
} 