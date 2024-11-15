import { lazy } from 'react'
import PublicLayout from '../layouts/PublicLayout'

const Home = lazy(() => import('../pages/public/Home'))
const Activities = lazy(() => import('../pages/public/Activities'))
const ActivityDetail = lazy(() => import('../pages/public/ActivityDetail'))
const About = lazy(() => import('../pages/public/About'))

const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'activities',
        element: <Activities />,
      },
      {
        path: 'activities/:id',
        element: <ActivityDetail />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]

export default publicRoutes 