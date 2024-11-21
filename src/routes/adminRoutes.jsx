import AdminDashboard from '../pages/admin/Dashboard'
import AdminTransactions from '../pages/admin/Transactions'
import TransactionDetail from '../pages/admin/Transactions/TransactionDetail'
import Users from '../pages/admin/Users'
import Activities from '../pages/admin/Activities'
import Categories from '../pages/admin/Categories'
import Banners from '../pages/admin/Banners'
import Promos from '../pages/admin/Promos'
import MediaLibrary from '../pages/admin/Media'

const adminRoutes = [
  {
    path: '',
    element: <AdminDashboard />
  },
  {
    path: 'transactions',
    element: <AdminTransactions />
  },
  {
    path: 'transactions/:id',
    element: <TransactionDetail />
  },
  {
    path: 'users',
    element: <Users />
  },
  {
    path: 'activities',
    element: <Activities />
  },
  {
    path: 'categories',
    element: <Categories />
  },
  {
    path: 'banners',
    element: <Banners />
  },
  {
    path: 'promos',
    element: <Promos />
  },
  {
    path: 'media',
    element: <MediaLibrary />
  }
]

export default adminRoutes 