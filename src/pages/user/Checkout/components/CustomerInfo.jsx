import PropTypes from 'prop-types'

export default function CustomerInfo({ value, onChange }) {
  const handleChange = (e) => {
    const { name, value: inputValue } = e.target
    onChange(prev => ({
      ...prev,
      [name]: inputValue
    }))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Informasi Pemesan</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <input
          type="text"
          name="name"
          value={value.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={value.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nomor Telepon
        </label>
        <input
          type="tel"
          name="phone"
          value={value.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Catatan (opsional)
        </label>
        <textarea
          name="notes"
          value={value.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
        />
      </div>
    </div>
  )
}

CustomerInfo.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    notes: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
} 