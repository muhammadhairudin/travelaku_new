import { useState, useEffect } from 'react'
import Container from '../../../components/common/Container'
import api from '../../../lib/axios'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function MediaLibrary() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [description, setDescription] = useState('')

  // Fetch images saat komponen dimount
  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/api/v1/media')
      setImages(response.data.data || [])
    } catch (err) {
      console.error('Failed to fetch images:', err)
      setError('Gagal memuat data media')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan')
      return
    }

    // Validasi ukuran file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB')
      return
    }

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('description', description)
      formData.append('category', selectedCategory)

      const response = await api.post('/api/v1/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(progress)
        }
      })

      if (response.data?.url) {
        alert('Gambar berhasil diupload')
        fetchImages() // Refresh data
        setDescription('')
        setUploadProgress(0)
      }
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Gagal mengupload gambar')
    }
  }

  const handleDelete = async (imageId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus gambar ini?')) return

    try {
      await api.delete(`/api/v1/delete-image/${imageId}`)
      alert('Gambar berhasil dihapus')
      fetchImages() // Refresh data
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Gagal menghapus gambar')
    }
  }

  // Filter images berdasarkan pencarian dan kategori
  const filteredImages = images.filter(image => {
    const matchesSearch = image.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) return <LoadingSpinner />

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center text-red-500">{error}</div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Media Library</h1>
        <p className="text-gray-600">
          Upload dan kelola gambar untuk website
        </p>
      </div>

      {/* Upload Section */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <div className="max-w-xl">
          <h2 className="text-lg font-bold mb-4">Upload Gambar</h2>
          
          {/* Description Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Deskripsi gambar (opsional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Category Select */}
          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Semua Kategori</option>
              <option value="banner">Banner</option>
              <option value="activity">Aktivitas</option>
              <option value="category">Kategori</option>
              <option value="other">Lainnya</option>
            </select>
          </div>

          {/* Upload Button */}
          <label className="block">
            <span className="sr-only">Choose File</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-primary file:text-white
                hover:file:bg-primary/90
              "
            />
          </label>

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Cari gambar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Semua Kategori</option>
          <option value="banner">Banner</option>
          <option value="activity">Aktivitas</option>
          <option value="category">Kategori</option>
          <option value="other">Lainnya</option>
        </select>
      </div>

      {/* Image Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative group bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-square">
                <img
                  src={image.url}
                  alt={image.description || 'Uploaded image'}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay with Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center">
                  {/* Preview Button */}
                  <a
                    href={image.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-100"
                  >
                    <PhotoIcon className="w-4 h-4 mr-1" />
                    Preview
                  </a>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="mt-2 inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Hapus
                  </button>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-3 border-t">
                <p className="text-sm font-medium truncate">
                  {image.description || 'No description'}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(image.createdAt).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Tidak ada gambar ditemukan</p>
        </div>
      )}
    </Container>
  )
} 