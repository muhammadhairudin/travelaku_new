import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from './Container'
import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getProfile, clearAuth } from '../../store/slices/authSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { token, user, isLoading, lastFetched } = useSelector((state) => state.auth)
  const { items: cartItems = [] } = useSelector((state) => state.cart)
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    const shouldFetchProfile = !user || !lastFetched || Date.now() - lastFetched > 5 * 60 * 1000

    if (token && shouldFetchProfile && !isLoading) {
      dispatch(getProfile())
        .unwrap()
        .catch(err => {
          console.error('Failed to fetch profile:', err)
          dispatch(clearAuth())
        })
    }
  }, [dispatch, token, user, lastFetched, isLoading])

  const handleLogout = () => {
    dispatch(clearAuth())
  }

  // Jika user adalah admin, tampilkan navbar sederhana
  if (isAdmin) {
    return (
      <nav className="bg-white shadow">
        <Container>
          <div className="flex justify-between items-center h-16">
            {/* Logo & Links */}
            <div className="flex items-center gap-8">
              <Link to="/" className="font-serif text-2xl font-bold text-primary">
                TravelAku
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Beranda
                </Link>
                <Link to="/admin" className="text-gray-600 hover:text-primary">
                  Dashboard
                </Link>
              </div>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </Container>
      </nav>
    )
  }

  // Navbar untuk user biasa
  return (
    <nav className="bg-white shadow">
      <Container>
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-serif text-2xl font-bold text-primary">
            TravelAku
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden gap-6 items-center md:flex">
            <Link to="/" className="text-gray-600 hover:text-primary">
              Beranda
            </Link>
            <Link to="/activities" className="text-gray-600 hover:text-primary">
              Aktivitas
            </Link>

            {user ? (
              <div className="flex items-center gap-6">
                {/* Cart */}
                <Link to="/cart" className="text-gray-600 hover:text-primary">
                  Keranjang {cartItems.length > 0 && `(${cartItems.length})`}
                </Link>

                {/* User Menu */}
                <div className="flex items-center gap-6">
                  <Link to="/transactions" className="text-gray-600 hover:text-primary">
                    Transaksi
                  </Link>
                  <Link to="/profile" className="text-gray-600 hover:text-primary">
                    Profil Saya
                  </Link>
                  <Link to="/about" className="text-gray-600 hover:text-primary">
                    About
                  </Link>
                  <button
                    onClick={() => dispatch(clearAuth())}
                    className="text-red-600 hover:text-red-700"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="btn btn-primary">
                  Masuk
                </Link>
                <Link to="/register" className="btn btn-outline">
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/activities" 
                className="text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Aktivitas
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/cart" 
                    className="text-gray-600 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Keranjang {cartItems.length > 0 && `(${cartItems.length})`}
                  </Link>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <Link 
                      to="/transactions" 
                      className="block text-gray-600 hover:text-primary py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Transaksi
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block text-gray-600 hover:text-primary py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Profil Saya
                    </Link>
                    <Link 
                      to="/about" 
                      className="block text-gray-600 hover:text-primary py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(clearAuth())
                        setIsOpen(false)
                      }}
                      className="w-full text-left text-red-600 hover:text-red-700 py-2"
                    >
                      Keluar
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4 pt-4 mt-4 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="btn btn-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Masuk
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
} 