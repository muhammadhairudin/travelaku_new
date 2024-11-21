import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/authSlice'

export default function ProfileDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const timeoutRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleOpen = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleClose = () => {
    // Delay closing to allow clicking menu items
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div 
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:text-primary"
      >
        <img
          src={user?.profilePictureUrl || '/default-avatar.png'}
          alt={user?.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-medium">{user?.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b">
            <p className="font-medium truncate">{user?.name}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>

          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Profil Saya
          </Link>

          <Link
            to="/transactions"
            className="block px-4 py-2 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Transaksi
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
          >
            Keluar
          </button>
        </div>
      )}
    </div>
  )
} 