import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <div data-theme="travelaku">
        <RouterProvider router={router} />
      </div>
    </ErrorBoundary>
  )
}

export default App
