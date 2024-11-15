import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">
              Oops! Terjadi Kesalahan
            </h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Silakan coba lagi nanti'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
} 