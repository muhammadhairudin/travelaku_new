import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import { UserIcon } from '@heroicons/react/24/outline'
import { uploadService } from '../../../services/uploadService'
import { updateProfile, logout } from '../../../store/slices/authSlice'
import LoadingSpinner from '../../../components/common/LoadingSpinner'

export default function Profile() {
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    profilePictureUrl: user?.profilePictureUrl || '',
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(user?.profilePictureUrl)
  const [uploadError, setUploadError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setUploadError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let updatedData = { ...formData }

      if (selectedFile) {
        const uploadResponse = await uploadService.uploadImage(selectedFile)
        updatedData.profilePictureUrl = uploadResponse.data.imageUrl
      }

      await dispatch(updateProfile(updatedData)).unwrap()
      // Bisa tambahkan toast/notification sukses
    } catch (err) {
      console.error('Failed to update profile:', err)
      setUploadError(err.message)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <UserIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Profil Saya
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={previewUrl || '/default-avatar.png'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profile-picture"
                />
                <label
                  htmlFor="profile-picture"
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90"
                >
                  <UserIcon className="h-5 w-5" />
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>

            {(error || uploadError) && (
              <div className="text-sm text-red-500 text-center">
                {error || uploadError}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                className={`flex-1 btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline"
              >
                Keluar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
} 