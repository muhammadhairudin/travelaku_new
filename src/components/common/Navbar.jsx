import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from './Container'
import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon, HeartIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
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
            <Link to="/about" className="text-gray-600 hover:text-primary">
              About
            </Link>

            {user ? (
              <div className="flex gap-4 items-center">
                <Link to="/wishlist" className="text-gray-600 hover:text-primary">
                  <HeartIcon className="w-6 h-6" />
                </Link>
                <Link to="/cart" className="relative text-gray-600 hover:text-primary">
                  <ShoppingCartIcon className="w-6 h-6" />
                  {cartItems.length > 0 && (
                    <span className="flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="text-gray-600 hover:text-primary">
                    <UserIcon className="w-6 h-6" />
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profil Saya
                    </Link>
                    <Link 
                      to="/transactions" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Transaksi
                    </Link>
                    <button
                      onClick={() => dispatch(clearAuth())}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Keluar
                    </button>
                  </div>
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
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/wishlist" 
                    className="text-gray-600 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <Link 
                    to="/cart" 
                    className="text-gray-600 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Keranjang ({cartItems.length})
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-600 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Profil
                  </Link>
                  <Link 
                    to="/transactions" 
                    className="text-gray-600 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Transaksi
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(clearAuth())
                      setIsOpen(false)
                    }}
                    className="text-red-600 hover:text-red-700 text-left"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
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