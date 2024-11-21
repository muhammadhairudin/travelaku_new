import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Container from '../../../components/common/Container'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import api from '../../../lib/axios'
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
import { Line, Bar } from 'react-chartjs-2'
import RecentTransactions from './components/RecentTransactions'
import ActivityStats from './components/ActivityStats'
import UserStats from './components/UserStats'
import TransactionAlert from './components/TransactionAlert'

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

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [activities, setActivities] = useState([])
  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])
  const [timeRange, setTimeRange] = useState('week')
  const [stats, setStats] = useState({
    totalTransactions: 0,
    pendingTransactions: 0,
    successTransactions: 0,
    totalRevenue: 0,
    revenueChart: {
      labels: [],
      data: []
    },
    transactionChart: {
      labels: [],
      data: []
    }
  })

  useEffect(() => {
    fetchDashboardData()
  }, [timeRange])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const [
        transactionsResponse,
        activitiesResponse,
        categoriesResponse,
        usersResponse
      ] = await Promise.all([
        api.get('/api/v1/all-transactions'),
        api.get('/api/v1/activities'),
        api.get('/api/v1/categories'),
        api.get('/api/v1/all-user')
      ])

      setTransactions(transactionsResponse.data.data || [])
      setActivities(activitiesResponse.data.data || [])
      setCategories(categoriesResponse.data.data || [])
      setUsers(usersResponse.data.data || [])

      // Hitung statistik dari data transaksi
      const calculatedStats = calculateStats(transactionsResponse.data.data || [])
      setStats(calculatedStats)
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError('Gagal memuat data dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  // Fungsi untuk menghitung statistik
  const calculateStats = (transactions) => {
    const now = new Date()
    const filteredTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.createdAt)
      if (timeRange === 'week') {
        return now - transactionDate <= 7 * 24 * 60 * 60 * 1000
      }
      if (timeRange === 'month') {
        return now.getMonth() === transactionDate.getMonth()
      }
      // year
      return now.getFullYear() === transactionDate.getFullYear()
    })

    // Hitung total dan status
    const totalTransactions = filteredTransactions.length
    const pendingTransactions = filteredTransactions.filter(t => 
      t.status === 'pending' && t.proofPaymentUrl
    ).length
    const successTransactions = filteredTransactions.filter(t => 
      t.status === 'success'
    ).length
    const totalRevenue = filteredTransactions
      .filter(t => t.status === 'success')
      .reduce((acc, t) => acc + (t.totalAmount || 0), 0)

    // Generate data untuk chart
    const chartData = generateChartData(filteredTransactions)

    return {
      totalTransactions,
      pendingTransactions,
      successTransactions,
      totalRevenue,
      revenueChart: chartData.revenue,
      transactionChart: chartData.transactions
    }
  }

  const generateChartData = (transactions) => {
    const dateLabels = []
    const revenueData = []
    const transactionData = []

    // Buat label dan data berdasarkan timeRange
    if (timeRange === 'week') {
      // Data per hari dalam seminggu
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dateLabels.push(date.toLocaleDateString('id-ID', { weekday: 'short' }))
        
        const dayTransactions = transactions.filter(t => {
          const tDate = new Date(t.createdAt)
          return tDate.toDateString() === date.toDateString()
        })

        revenueData.push(
          dayTransactions
            .filter(t => t.status === 'success')
            .reduce((acc, t) => acc + (t.totalAmount || 0), 0)
        )
        transactionData.push(dayTransactions.length)
      }
    } else if (timeRange === 'month') {
      // Data per minggu dalam sebulan
      for (let i = 0; i < 4; i++) {
        dateLabels.push(`Minggu ${i + 1}`)
        
        const weekTransactions = transactions.filter(t => {
          const tDate = new Date(t.createdAt)
          const weekNumber = Math.floor((tDate.getDate() - 1) / 7)
          return weekNumber === i
        })

        revenueData.push(
          weekTransactions
            .filter(t => t.status === 'success')
            .reduce((acc, t) => acc + (t.totalAmount || 0), 0)
        )
        transactionData.push(weekTransactions.length)
      }
    } else {
      // Data per bulan dalam setahun
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
      months.forEach((month, i) => {
        dateLabels.push(month)
        
        const monthTransactions = transactions.filter(t => {
          const tDate = new Date(t.createdAt)
          return tDate.getMonth() === i
        })

        revenueData.push(
          monthTransactions
            .filter(t => t.status === 'success')
            .reduce((acc, t) => acc + (t.totalAmount || 0), 0)
        )
        transactionData.push(monthTransactions.length)
      })
    }

    return {
      revenue: {
        labels: dateLabels,
        data: revenueData
      },
      transactions: {
        labels: dateLabels,
        data: transactionData
      }
    }
  }

  if (isLoading) {
    return (
      <Container className="min-h-[80vh] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="min-h-[80vh] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard Admin</h1>
        <p className="text-gray-600">
          Ringkasan data dan statistik
        </p>
      </div>

      {/* Transaction Alerts */}
      <TransactionAlert transactions={transactions} />

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

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Transaksi</p>
          <p className="text-2xl font-bold mt-2">{stats.totalTransactions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Menunggu Konfirmasi</p>
          <p className="text-2xl font-bold mt-2 text-blue-600">
            {stats.pendingTransactions}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Transaksi Sukses</p>
          <p className="text-2xl font-bold mt-2 text-green-600">
            {stats.successTransactions}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Pendapatan</p>
          <p className="text-2xl font-bold mt-2 text-primary">
            Rp {stats.totalRevenue.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Transaction Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Pendapatan</h3>
          <Line
            data={{
              labels: stats.revenueChart.labels,
              datasets: [
                {
                  label: 'Pendapatan',
                  data: stats.revenueChart.data,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.4,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `Rp ${value.toLocaleString('id-ID')}`
                  }
                }
              }
            }}
          />
        </div>

        {/* Transaction Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Transaksi</h3>
          <Bar
            data={{
              labels: stats.transactionChart.labels,
              datasets: [
                {
                  label: 'Jumlah Transaksi',
                  data: stats.transactionChart.data,
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* User Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">Statistik Pengguna</h2>
        <UserStats users={users} />
      </div>

      {/* Activity Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">Statistik Aktivitas</h2>
        <ActivityStats 
          activities={activities}
          categories={categories}
        />
      </div>

      {/* Recent Transactions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">Transaksi Terbaru</h2>
        <RecentTransactions 
          transactions={transactions.slice(0, 5)}
        />
      </div>
    </Container>
  )
} 