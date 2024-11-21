import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  TicketIcon,
  TagIcon,
  PhotoIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  TagIcon,
  CreditCardIcon,
  GiftIcon,
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const location = useLocation()
  
  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: <HomeIcon className="w-5 h-5" />,
      label: 'Dashboard'
    },
    {
      path: '/admin/transactions',
      icon: <CreditCardIcon className="w-5 h-5" />,
      label: 'Transaksi'
    },
    {
      path: '/admin/users',
      icon: <UsersIcon className="w-5 h-5" />,
      label: 'Pengguna'
    },
    {
      path: '/admin/activities',
      icon: <TicketIcon className="w-5 h-5" />,
      label: 'Aktivitas'
    },
    {
      path: '/admin/categories',
      icon: <TagIcon className="w-5 h-5" />,
      label: 'Kategori'
    },
    {
      path: '/admin/banners',
      icon: <PhotoIcon className="w-5 h-5" />,
      label: 'Banner'
    },
    {
      path: '/admin/promos',
      icon: <GiftIcon className="w-5 h-5" />,
      label: 'Promo'
    }
  ]

  return (
    <div className="w-64 bg-white border-r h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 ${
              location.pathname === item.path ? 'bg-primary/5 text-primary' : ''
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
} 