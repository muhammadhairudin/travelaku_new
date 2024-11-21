import PropTypes from 'prop-types'
import { UsersIcon, UserPlusIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Bar } from 'react-chartjs-2'

export default function UserStats({ users }) {
  // Hitung statistik user
  const totalUsers = users.length
  const totalAdmins = users.filter(u => u.role === 'admin').length
  const totalRegularUsers = totalUsers - totalAdmins

  // Data untuk chart
  const chartData = {
    labels: ['Admin', 'User'],
    datasets: [
      {
        label: 'Jumlah',
        data: [totalAdmins, totalRegularUsers],
        backgroundColor: ['rgba(99, 102, 241, 0.5)', 'rgba(72, 187, 177, 0.5)'],
        borderColor: ['rgb(99, 102, 241)', 'rgb(72, 187, 177)'],
        borderWidth: 1,
      }
    ]
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 lg:col-span-2 md:grid-cols-3">
        {/* Total Users */}
        <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 shadow-sm">
          <div className="flex gap-3 items-center">
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <UsersIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-600">Total User</p>
              <p className="text-xl font-bold text-indigo-900">{totalUsers}</p>
            </div>
          </div>
        </div>

        {/* Total Admins */}
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 shadow-sm">
          <div className="flex gap-3 items-center">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <UserPlusIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-600">Total Admin</p>
              <p className="text-xl font-bold text-emerald-900">{totalAdmins}</p>
            </div>
          </div>
        </div>

        {/* Total Regular Users */}
        <div className="p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl border border-violet-200 shadow-sm">
          <div className="flex gap-3 items-center">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <UserGroupIcon className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-violet-600">Total User</p>
              <p className="text-xl font-bold text-violet-900">{totalRegularUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Distribution Chart */}
      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h3 className="mb-3 text-base font-bold text-gray-800">Distribusi Pengguna</h3>
        <div className="h-[200px]">
          <Bar 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
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
    </div>
  )
}

UserStats.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })
  ).isRequired
}