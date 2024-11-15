import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function AdminRoute({ children }) {
  const location = useLocation()
  const { user, isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return <LoadingSpinner />
  }

  // Cek apakah user login dan memiliki role admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
} 