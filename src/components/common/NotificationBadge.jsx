import PropTypes from 'prop-types'

export default function NotificationBadge({ count }) {
  if (!count) return null
  
  return (
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
      {count > 99 ? '99+' : count}
    </span>
  )
}

NotificationBadge.propTypes = {
  count: PropTypes.number
} 