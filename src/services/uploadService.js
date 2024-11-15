import axiosInstance from '../lib/axios'

export const uploadService = {
  uploadImage: async (file) => {
    // Validasi ukuran file (max 1MB)
    const MAX_FILE_SIZE = 1024 * 1024 // 1MB
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('Ukuran file terlalu besar. Maksimal 1MB')
    }

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Tipe file tidak didukung. Gunakan JPG, JPEG atau PNG')
    }

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axiosInstance.post('/api/v1/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      // Sesuaikan dengan format response API yang benar
      if (response.data && response.data.url) {
        return {
          imageUrl: response.data.url // Ambil URL langsung dari response.data.url
        }
      } else {
        throw new Error('Format response tidak sesuai')
      }
    } catch (error) {
      if (error.response?.status === 413) {
        throw new Error('Ukuran file terlalu besar')
      }
      throw error
    }
  }
} 