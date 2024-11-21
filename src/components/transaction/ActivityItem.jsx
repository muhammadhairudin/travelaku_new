import PropTypes from 'prop-types'

export default function ActivityItem({ item, activity }) {
  if (!item || !activity) return null

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      {activity.imageUrl && (
        <img 
          src={activity.imageUrl} 
          alt={activity.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
      )}
      <div className="flex-1">
        <h4 className="font-medium mb-1">{activity.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{activity.location}</p>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Jumlah</p>
            <p className="font-medium">{item.quantity}x</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="font-medium">
              Rp {(item.quantity * activity.price).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

ActivityItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }),
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string
  })
} 