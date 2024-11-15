import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchDashboardStats } from '../../../store/slices/adminSlice'
import { 
  UsersIcon, 
  TicketIcon, 
  TagIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import DataTable from './components/DataTable'
import { fetchAllActivities, fetchAllUsers, fetchAllTransactions, fetchAllCategories } from '../../../store/slices/adminSlice'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// Fix untuk icon marker
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function AdminDashboard() {
  const dispatch = useDispatch()
  const { 
    stats, 
    activities, 
    users, 
    transactions, 
    categories,
    isLoading 
  } = useSelector((state) => state.admin)

  // Tambahkan state untuk timeRange
  const [timeRange, setTimeRange] = useState('week')

  useEffect(() => {
    // Fetch data dengan timeRange
    dispatch(fetchDashboardStats(timeRange))
    dispatch(fetchAllActivities())
    dispatch(fetchAllUsers())
    dispatch(fetchAllTransactions())
    dispatch(fetchAllCategories())
  }, [dispatch, timeRange]) // Tambahkan timeRange sebagai dependency

  if (isLoading) return <LoadingSpinner />

  // Stat cards data dari API
  const statCards = [
    {
      title: 'Total Pengguna',
      value: stats?.totalUsers || 0,
      icon: <UsersIcon className="w-8 h-8" />,
      change: stats?.userGrowth || '+0%',
      isIncrease: stats?.userGrowth?.startsWith('+'),
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Total Aktivitas',
      value: stats?.totalActivities || 0,
      icon: <TicketIcon className="w-8 h-8" />,
      change: stats?.activityGrowth || '+0%',
      isIncrease: stats?.activityGrowth?.startsWith('+'),
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      title: 'Total Kategori',
      value: stats?.totalCategories || 0,
      icon: <TagIcon className="w-8 h-8" />,
      change: stats?.categoryGrowth || '+0%',
      isIncrease: stats?.categoryGrowth?.startsWith('+'),
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      title: 'Total Transaksi',
      value: `Rp ${(stats?.totalTransactionAmount || 0).toLocaleString('id-ID')}`,
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      change: stats?.transactionGrowth || '+0%',
      isIncrease: stats?.transactionGrowth?.startsWith('+'),
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
  ]

  // Chart data dari API
  const revenueData = {
    labels: stats?.revenueChart?.labels || [],
    datasets: [
      {
        label: 'Pendapatan',
        data: stats?.revenueChart?.data || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
    ],
  }

  const transactionData = {
    labels: stats?.transactionChart?.labels || [],
    datasets: [
      {
        label: 'Transaksi',
        data: stats?.transactionChart?.data || [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  }

  // Ubah categoryDistribution menjadi map distribution
  const locationDistributionData = stats?.locationDistribution || []

  // Columns definition
  const activityColumns = [
    { key: 'title', label: 'Judul' },
    { key: 'price', label: 'Harga', render: (item) => `Rp ${item.price.toLocaleString('id-ID')}` },
    { key: 'rating', label: 'Rating' },
    { 
      key: 'status', 
      label: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.isActive ? 'Aktif' : 'Nonaktif'}
        </span>
      )
    },
  ]

  const userColumns = [
    { key: 'name', label: 'Nama' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { 
      key: 'createdAt', 
      label: 'Terdaftar',
      render: (item) => new Date(item.createdAt).toLocaleDateString('id-ID')
    },
  ]

  const transactionColumns = [
    { key: 'id', label: 'ID Transaksi' },
    { 
      key: 'amount', 
      label: 'Total',
      render: (item) => `Rp ${item.amount.toLocaleString('id-ID')}`
    },
    { key: 'status', label: 'Status' },
    { 
      key: 'createdAt', 
      label: 'Tanggal',
      render: (item) => new Date(item.createdAt).toLocaleDateString('id-ID')
    },
  ]

  // Action handlers
  const handleEditActivity = (activity) => {
    console.log('Edit activity:', activity)
  }

  const handleViewUser = (user) => {
    console.log('View user:', user)
  }

  const handleViewTransaction = (transaction) => {
    console.log('View transaction:', transaction)
  }

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Dashboard Admin
        </h1>
        <p className="mt-2 text-gray-600">
          Selamat datang kembali, berikut adalah ringkasan data hari ini
        </p>
      </div>

      {/* Time Range Filter */}
      <div className="mb-8">
        <div className="inline-flex p-1 rounded-lg border border-gray-200">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {range === 'week' ? 'Minggu' : range === 'month' ? 'Bulan' : 'Tahun'} Ini
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg p-6 transition-transform hover:scale-105`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`${stat.iconColor} ${stat.bgColor} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.isIncrease ? (
                <ArrowTrendingUpIcon className="mr-1 w-4 h-4 text-green-500" />
              ) : (
                <ArrowTrendingDownIcon className="mr-1 w-4 h-4 text-red-500" />
              )}
              <span className={stat.isIncrease ? 'text-green-500' : 'text-red-500'}>
                {stat.change}
              </span>
              <span className="ml-1 text-sm text-gray-500">vs periode sebelumnya</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Grafik Pendapatan
          </h3>
          <Line
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>

        {/* Transaction Chart */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Transaksi per Hari
          </h3>
          <Bar
            data={transactionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Ganti chart distribusi kategori dengan peta */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Distribusi Aktivitas per Wilayah
        </h3>
        <div className="h-[500px] rounded-lg overflow-hidden">
          <MapContainer 
            center={[-2.5489, 118.0149]} // Koordinat tengah Indonesia
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locationDistributionData.map((location) => (
              <Marker 
                key={location.id}
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-medium">{location.city}, {location.province}</h4>
                    <p className="text-sm text-gray-600">
                      {location.totalActivities} Aktivitas
                    </p>
                    <p className="text-sm text-gray-600">
                      Total Transaksi: Rp {location.totalRevenue?.toLocaleString('id-ID')}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Legend/Summary */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {locationDistributionData.slice(0, 4).map((location) => (
            <div key={location.id} className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-sm">{location.city}</h4>
              <p className="text-xs text-gray-500">{location.totalActivities} Aktivitas</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Data Tables */}
      <div className="grid grid-cols-1 gap-8 mt-8">
        {/* Recent Activities */}
        <DataTable
          title="Aktivitas Terbaru"
          columns={activityColumns}
          data={activities}
          actions={[
            {
              label: 'Edit',
              onClick: handleEditActivity,
              className: 'text-blue-600 hover:text-blue-800'
            }
          ]}
        />

        {/* Recent Users */}
        <DataTable
          title="Pengguna Terbaru"
          columns={userColumns}
          data={users}
          actions={[
            {
              label: 'Lihat',
              onClick: handleViewUser,
              className: 'text-green-600 hover:text-green-800'
            }
          ]}
        />

        {/* Recent Transactions */}
        <DataTable
          title="Transaksi Terbaru"
          columns={transactionColumns}
          data={transactions}
          actions={[
            {
              label: 'Detail',
              onClick: handleViewTransaction,
              className: 'text-purple-600 hover:text-purple-800'
            }
          ]}
        />
      </div>
    </Container>
  )
} 