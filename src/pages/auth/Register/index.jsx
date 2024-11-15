import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../../store/slices/authSlice'
import { uploadService } from '../../../services/uploadService'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    phoneNumber: '',
    profilePictureUrl: '',
    role: 'user',
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
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
      // Upload profile picture if selected
      if (selectedFile) {
        const uploadResponse = await uploadService.uploadImage(selectedFile)
        formData.profilePictureUrl = uploadResponse.data.imageUrl
      }

      await dispatch(register(formData)).unwrap()
      navigate('/')
    } catch (err) {
      console.error('Failed to register:', err)
      setUploadError(err.message)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-serif font-bold text-primary text-center mb-6">
        Daftar Akun TravelAku
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ulangi Password
          </label>
          <input
            type="password"
            name="passwordRepeat"
            value={formData.passwordRepeat}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto Profil
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-full"
            />
          )}
        </div>

        {(error || uploadError) && (
          <div className="text-sm text-red-500 text-center">
            {error || uploadError}
          </div>
        )}

        <button
          type="submit"
          className={`w-full btn btn-primary ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Daftar'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-primary hover:text-primary/80">
          Masuk di sini
        </Link>
      </p>
    </div>
  )
} 