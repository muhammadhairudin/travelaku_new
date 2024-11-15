import PropTypes from 'prop-types'

export default function Container({ children, className }) {
  return (
    <div className={`container mx-auto px-4 md:px-6 ${className || ''}`}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
} 