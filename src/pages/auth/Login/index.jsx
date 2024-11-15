import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login, getProfile, setError } from '../../../store/slices/authSlice'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const { isLoading, error } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('Login attempt with:', formData)
      const loginResult = await dispatch(login(formData)).unwrap()
      console.log('Login result:', loginResult)

      if (loginResult.token) {
        // Tunggu sampai profile diambil
        try {
          const profileResult = await dispatch(getProfile()).unwrap()
          console.log('Profile loaded:', profileResult)
          
          // Verifikasi user data
          if (profileResult.user) {
            console.log('Login successful, redirecting...')
            navigate(from, { replace: true })
          } else {
            dispatch(setError('Gagal memuat data profil'))
          }
        } catch (profileErr) {
          console.error('Failed to load profile:', profileErr)
          dispatch(setError('Gagal memuat data profil'))
        }
      }
    } catch (err) {
      console.error('Login failed:', err)
      const errorMessage = err?.message || 'Terjadi kesalahan saat login'
      dispatch(setError(errorMessage))
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-serif font-bold text-primary text-center mb-6">
        Masuk ke TravelAku
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {error && (
          <div className="text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className={`w-full btn btn-primary ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link to="/register" className="text-primary hover:text-primary/80">
          Daftar sekarang
        </Link>
      </p>
    </div>
  )
} 