import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../../../store/slices/categorySlice'

export default function CategoryFilter({ value, onChange }) {
  const dispatch = useDispatch()
  const { items: categories, isLoading } = useSelector((state) => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  if (isLoading) return null

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={`px-4 py-2 rounded-full text-sm transition-colors ${
          value === '' 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            value === category.id 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

CategoryFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
} 