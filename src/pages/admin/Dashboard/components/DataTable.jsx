import PropTypes from 'prop-types'

export default function DataTable({ 
  title,
  columns, 
  data,
  actions,
  limit = 5
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-3">
                  {column.label}
                </th>
              ))}
              {actions && <th className="px-6 py-3">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, limit).map((item, index) => (
              <tr 
                key={item.id || index}
                className="border-b hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => action.onClick(item)}
                          className={`text-sm px-2 py-1 rounded ${action.className}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      className: PropTypes.string,
    })
  ),
  limit: PropTypes.number,
} 