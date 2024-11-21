import PropTypes from 'prop-types'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { MapPinIcon, TagIcon, TicketIcon } from '@heroicons/react/24/outline'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ActivityStats({ activities, categories }) {
  // Hitung statistik aktivitas
  const totalActivities = activities.length
  const activeActivities = activities.filter(a => a.isActive).length
  
  // Hitung aktivitas per kategori
  const activityByCategory = categories.map(category => {
    const count = activities.filter(a => a.categoryId === category.id).length
    return {
      name: category.name,
      count,
      percentage: (count / totalActivities * 100).toFixed(1)
    }
  }).sort((a, b) => b.count - a.count)

  // Data untuk chart distribusi kategori
  const chartData = {
    labels: activityByCategory.map(c => c.name),
    datasets: [
      {
        data: activityByCategory.map(c => c.count),
        backgroundColor: [
          'rgba(99, 179, 237, 0.6)', // Biru
          'rgba(72, 187, 177, 0.6)',  // Tosca
          'rgba(246, 224, 94, 0.6)',  // Kuning
          'rgba(159, 122, 234, 0.6)', // Ungu
          'rgba(246, 173, 85, 0.6)',  // Orange
          'rgba(237, 100, 166, 0.6)'  // Pink
        ],
        borderColor: [
          'rgba(99, 179, 237, 1)',
          'rgba(72, 187, 177, 1)',
          'rgba(246, 224, 94, 1)',
          'rgba(159, 122, 234, 1)',
          'rgba(246, 173, 85, 1)',
          'rgba(237, 100, 166, 1)'
        ],
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Cards - Perbaiki tinggi */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Aktivitas */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <TicketIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Total Aktivitas</p>
              <p className="text-xl font-bold text-blue-900">{totalActivities}</p>
              <p className="text-xs text-blue-700">
                {activeActivities} Aktif
              </p>
            </div>
          </div>
        </div>

        {/* Total Kategori */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TagIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600">Total Kategori</p>
              <p className="text-xl font-bold text-purple-900">{categories.length}</p>
              <p className="text-xs text-purple-700">
                {categories.filter(c => c.isActive).length} Aktif
              </p>
            </div>
          </div>
        </div>

        {/* Lokasi Unik */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-sm border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <MapPinIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600">Lokasi Unik</p>
              <p className="text-xl font-bold text-green-900">
                {new Set(activities.map(a => a.location)).size}
              </p>
              <p className="text-xs text-green-700">Destinasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Distribution Chart - Sesuaikan tinggi */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-base font-bold mb-3 text-gray-800">Distribusi Kategori</h3>
        <div className="h-[200px]"> {/* Set tinggi tetap */}
          <Doughnut 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              cutout: '65%',
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    usePointStyle: true,
                    padding: 10,
                    font: {
                      size: 11
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Category List - Sesuaikan padding dan spacing */}
      <div className="lg:col-span-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-base font-bold mb-3 text-gray-800">Detail Kategori</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activityByCategory.map((category, index) => (
            <div 
              key={category.name}
              className="p-3 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full`} style={{
                      backgroundColor: chartData.datasets[0].backgroundColor[index]
                    }} />
                    <p className="font-medium text-gray-900 text-sm">{category.name}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {category.count} Aktivitas
                  </p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                  {category.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

ActivityStats.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
      location: PropTypes.string
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isActive: PropTypes.bool
    })
  ).isRequired
} 