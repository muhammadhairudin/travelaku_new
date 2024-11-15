import PropTypes from 'prop-types'

export default function ActivityInfo({ activity }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
          {activity.title}
        </h1>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <span>{activity.city},</span>
          <span>{activity.province}</span>
        </div>
      </div>

      <div className="prose max-w-none">
        <p>{activity.description}</p>
      </div>
    </div>
  )
}

ActivityInfo.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
  }).isRequired,
} 