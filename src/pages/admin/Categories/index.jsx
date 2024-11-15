import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../components/common/Container'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchAllCategories, createCategory, updateCategory, deleteCategory } from '../../../store/slices/adminSlice'
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline'
import CategoryModal from './components/CategoryModal'

export default function AdminCategories() {
  const dispatch = useDispatch()
  const { categories, activities, isLoading } = useSelector((state) => state.admin)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    dispatch(fetchAllCategories())
  }, [dispatch])

  const handleEdit = (category) => {
    setSelectedCategory(category)
    setShowModal(true)
  }

  const handleDelete = async (categoryId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      try {
        await dispatch(deleteCategory(categoryId)).unwrap()
        dispatch(fetchAllCategories())
      } catch (err) {
        console.error('Failed to delete category:', err)
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (selectedCategory) {
        await dispatch(updateCategory({
          id: selectedCategory.id,
          data: formData
        })).unwrap()
      } else {
        await dispatch(createCategory(formData)).unwrap()
      }
      dispatch(fetchAllCategories())
      setShowModal(false)
      setSelectedCategory(null)
    } catch (err) {
      console.error('Failed to save category:', err)
    }
  }

  // Hitung jumlah aktivitas per kategori
  const categoriesWithCount = categories.map(category => {
    const activityCount = activities.filter(
      activity => activity.categoryId === category.id
    ).length

    return {
      ...category,
      totalActivities: activityCount
    }
  })

  const filteredCategories = categoriesWithCount.filter(category => 
    category.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <Container className="py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Manajemen Kategori
          </h1>
          <p className="text-gray-600">
            Kelola kategori aktivitas wisata
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedCategory(null)
            setShowModal(true)
          }}
          className="btn btn-primary gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Tambah Kategori
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari kategori..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div 
            key={category.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
          >
            {/* Category Image */}
            <div className="aspect-[16/9] relative">
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <PhotoIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              {/* Activity Count Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                {category.totalActivities} Aktivitas
              </div>
            </div>

            {/* Category Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-lg text-gray-900">
                  {category.name}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  category.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {category.isActive ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedCategory(null)
        }}
        category={selectedCategory}
        onSubmit={handleSubmit}
      />
    </Container>
  )
} 