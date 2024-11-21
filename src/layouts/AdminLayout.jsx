import { Link, useLocation, Outlet } from 'react-router-dom'
import { 
  HomeIcon, 
  UsersIcon, 
  TicketIcon,
  TagIcon,
  PhotoIcon,
  TagIcon as BannerIcon,
  TicketIcon as PromoIcon,
  FolderIcon,
  ArrowLeftOnRectangleIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuth } from '../store/slices/authSlice'

const menuItems = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: HomeIcon
  },
  {
    path: '/admin/transactions',
    label: 'Transactions',
    icon: CreditCardIcon
  },
  {
    path: '/admin/users',
    label: 'Users',
    icon: UsersIcon
  },
  {
    path: '/admin/activities',
    label: 'Activities',
    icon: TicketIcon
  },
  {
    path: '/admin/categories',
    label: 'Categories',
    icon: TagIcon
  },
  {
    path: '/admin/banners',
    label: 'Banners',
    icon: BannerIcon
  },
  {
    path: '/admin/promos',
    label: 'Promos',
    icon: PromoIcon
  },
  {
    path: '/admin/media',
    label: 'Media Library',
    icon: FolderIcon
  }
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    dispatch(clearAuth())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-40">
        <div className="flex items-center justify-between h-full px-4 ml-64">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">
              Selamat datang, {user?.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Beranda
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              About
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-white border-r z-30">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b">
          <img 
            src="/Logo.svg" 
            alt="TravelAku Logo"
            className="w-8 h-8 object-contain"
          />
          <div>
            <h1 className="font-serif text-xl font-bold text-primary">
              TravelAku
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 h-[calc(100vh-4rem-4rem)]">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Version Info */}
        <div className="absolute bottom-0 left-0 right-0 h-16 p-4 border-t bg-white">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">TravelAku Admin</p>
            <p className="text-xs text-gray-500">Version 1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen pb-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 right-0 left-64 h-16 bg-white border-t z-20">
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-600">
            © 2024 TravelAku. Created with ❤️ by Muhammad Hairudin, SE
          </p>
        </div>
      </footer>
    </div>
  )
} 