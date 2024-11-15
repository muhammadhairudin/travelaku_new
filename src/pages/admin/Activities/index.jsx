import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchAllActivities, createActivity, updateActivity, deleteActivity } from '../../../store/slices/adminSlice'
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline'
import ActivityModal from './components/ActivityModal'

export default function AdminActivities() {
  const dispatch = useDispatch()
  const { activities, isLoading } = useSelector((state) => state.admin)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)

  useEffect(() => {
    dispatch(fetchAllActivities())
  }, [dispatch])

  const handleEdit = (activity) => {
    setSelectedActivity(activity)
    setShowModal(true)
  }

  const handleDelete = async (activityId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus aktivitas ini?')) {
      try {
        await dispatch(deleteActivity(activityId)).unwrap()
        dispatch(fetchAllActivities())
      } catch (err) {
        console.error('Failed to delete activity:', err)
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (selectedActivity) {
        await dispatch(updateActivity({
          id: selectedActivity.id,
          data: formData
        })).unwrap()
      } else {
        await dispatch(createActivity(formData)).unwrap()
      }
      dispatch(fetchAllActivities())
      setShowModal(false)
      setSelectedActivity(null)
    } catch (err) {
      console.error('Failed to save activity:', err)
    }
  }

  const filteredActivities = activities?.filter(activity => 
    activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (isLoading) return <LoadingSpinner />

  return (
    <Container className="py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Manajemen Aktivitas
          </h1>
          <p className="text-gray-600">
            Kelola data aktivitas wisata
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedActivity(null)
            setShowModal(true)
          }}
          className="btn btn-primary gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Aktivitas
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari aktivitas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Activities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <div 
            key={activity.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
          >
            {/* Activity Image */}
            <div className="aspect-[4/3] relative">
              {activity.imageUrls?.[0] ? (
                <img
                  src={activity.imageUrls[0]}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <PhotoIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                Rp {activity.price?.toLocaleString('id-ID')}
              </div>
            </div>

            {/* Activity Info */}
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2 line-clamp-1">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {activity.description}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {activity.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {activity.category?.name || '-'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Modal */}
      <ActivityModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedActivity(null)
        }}
        activity={selectedActivity}
        onSubmit={handleSubmit}
      />
    </Container>
  )
} 