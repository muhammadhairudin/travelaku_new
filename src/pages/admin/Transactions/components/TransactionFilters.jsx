import PropTypes from 'prop-types'

const statusOptions = [
  { value: 'all', label: 'Semua Status' },
  { value: 'pending', label: 'Menunggu Pembayaran' },
  { value: 'waiting_confirmation', label: 'Menunggu Konfirmasi' },
  { value: 'success', label: 'Pembayaran Dikonfirmasi' },
  { value: 'rejected', label: 'Pembayaran Ditolak' },
  { value: 'cancelled', label: 'Transaksi Dibatalkan' }
]

export default function TransactionFilters({ filters, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value })
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dari Tanggal
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sampai Tanggal
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            min={filters.startDate}
            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Search Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cari
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="ID Transaksi / Nama"
            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      {/* Active Filters */}
      {(filters.status !== 'all' || filters.search || filters.startDate || filters.endDate) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.status !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
              Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
              Pencarian: {filters.search}
            </span>
          )}
          {(filters.startDate || filters.endDate) && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
              Periode: {filters.startDate || '...'} s/d {filters.endDate || '...'}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

TransactionFilters.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
} 