export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500">Memuat data...</p>
    </div>
  )
} 