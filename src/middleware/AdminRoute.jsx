import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminRoute({ children }) {
  const { user, token } = useSelector((state) => state.auth)
  
  if (!token) return <Navigate to="/login" />
  if (user?.role !== 'admin') return <Navigate to="/" />
  
  return children
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
} 