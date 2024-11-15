import { useState } from 'react'
import Container from '../../../components/common/Container'
import { PhotoIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import { uploadService } from '../../../services/uploadService'

const IMAGE_CATEGORIES = [
  { id: 'banner', label: 'Banner' },
  { id: 'activity', label: 'Aktivitas' },
  { id: 'category', label: 'Kategori' },
  { id: 'promo', label: 'Promo' },
  { id: 'profile', label: 'Foto Profil' },
  { id: 'other', label: 'Lainnya' }
]

export default function MediaLibrary() {
  const [uploadedImages, setUploadedImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [copiedUrl, setCopiedUrl] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('other')
  const [imageDescription, setImageDescription] = useState('')

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files)
    setIsUploading(true)
    setUploadError(null)

    try {
      const uploadPromises = files.map(async (file) => {
        const response = await uploadService.uploadImage(file)
        return {
          url: response.imageUrl,
          name: file.name,
          category: selectedCategory,
          description: imageDescription || 'No description',
          uploadedAt: new Date().toISOString()
        }
      })

      const newImages = await Promise.all(uploadPromises)
      setUploadedImages(prev => [...newImages, ...prev])
      setImageDescription('')
    } catch (err) {
      console.error('Upload error:', err)
      setUploadError(err.message || 'Gagal mengupload gambar')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const filteredImages = uploadedImages.filter(img => {
    const matchesSearch = img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || img.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <Container className="py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Media Library
          </h1>
          <p className="text-gray-600">
            Upload dan kelola gambar untuk website
          </p>
        </div>

        {/* Upload Form */}
        <div className="flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {IMAGE_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>

          <label className="btn btn-primary gap-2 cursor-pointer">
            <PhotoIcon className="w-5 h-5" />
            Upload Gambar
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Description Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Deskripsi gambar (opsional)"
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari gambar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Semua Kategori</option>
          {IMAGE_CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      {uploadError && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {uploadError}
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
          >
            <div className="aspect-square relative">
              <img
                src={image.url}
                alt={image.description}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded-full bg-white/90 backdrop-blur-sm font-medium ${
                  image.category === 'banner' ? 'text-blue-600' :
                  image.category === 'activity' ? 'text-green-600' :
                  image.category === 'category' ? 'text-purple-600' :
                  image.category === 'promo' ? 'text-orange-600' :
                  image.category === 'profile' ? 'text-pink-600' :
                  'text-gray-600'
                }`}>
                  {IMAGE_CATEGORIES.find(cat => cat.id === image.category)?.label}
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-gray-900 truncate mb-1">
                {image.name}
              </p>
              <p className="text-xs text-gray-500 truncate mb-2">
                {image.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(image.uploadedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleCopyUrl(image.url)}
                  className={`p-2 rounded-lg transition-colors ${
                    copiedUrl === image.url
                      ? 'bg-green-50 text-green-600'
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                  title="Copy URL"
                >
                  <ClipboardIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {isUploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto" />
            <p className="mt-4 text-center text-gray-600">
              Mengupload gambar...
            </p>
          </div>
        </div>
      )}
    </Container>
  )
} 