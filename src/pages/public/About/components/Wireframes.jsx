import { 
  HomeIcon, 
  MagnifyingGlassIcon,
  PhotoIcon,
  UserIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

// Reusable components
const Card = ({ className = '', children }) => (
  <div className={`bg-gray-200 rounded-lg ${className}`}>
    {children}
  </div>
)

const PlaceholderText = ({ width = 'w-3/4', className = '' }) => (
  <div className={`h-4 bg-gray-300 rounded ${width} ${className}`} />
)

export default function Wireframes() {
  return (
    <div className="space-y-12">
      {/* User Interface */}
      <section>
        <h3 className="mb-4 text-lg font-bold">User Interface</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Homepage Wireframe */}
          <div className="p-6 rounded-lg border">
            <p className="mb-4 text-sm text-center text-gray-600">Homepage</p>
            <div className="bg-white rounded-lg shadow">
              {/* Navbar */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="font-bold">Logo</div>
                <div className="flex gap-4">
                  <HomeIcon className="w-6 h-6" />
                  <UserIcon className="w-6 h-6" />
                  <ShoppingCartIcon className="w-6 h-6" />
                </div>
              </div>
              
              {/* Hero */}
              <div className="flex justify-center items-center h-64 bg-gray-200">
                <PhotoIcon className="w-12 h-12 text-gray-400" />
              </div>

              {/* Search */}
              <div className="p-4">
                <div className="flex gap-2 p-2 rounded border">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                  <div className="flex-1 h-6 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-3 gap-4 p-4">
                {[1,2,3,4,5,6].map(i => (
                  <Card key={i} className="aspect-[4/3]" />
                ))}
              </div>
            </div>
          </div>

          {/* Activity Detail Wireframe */}
          <div className="p-6 rounded-lg border">
            <p className="mb-4 text-sm text-center text-gray-600">Activity Detail</p>
            <div className="bg-white rounded-lg shadow">
              <div className="grid grid-cols-3 gap-6 p-4">
                <div className="col-span-2">
                  <Card className="mb-4 h-64" />
                  <PlaceholderText className="mb-2" />
                  <PlaceholderText width="w-1/2" className="mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="h-32" />
                    <Card className="h-32" />
                  </div>
                </div>
                <div>
                  <div className="p-4 rounded-lg border">
                    <PlaceholderText className="mb-4" />
                    <div className="space-y-4">
                      <div className="h-10 bg-gray-200 rounded" />
                      <div className="h-10 bg-gray-200 rounded" />
                      <div className="h-10 rounded bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Interface */}
      <section>
        <h3 className="mb-4 text-lg font-bold">Admin Interface</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Admin Dashboard */}
          <div className="p-6 rounded-lg border">
            <p className="mb-4 text-sm text-center text-gray-600">Admin Dashboard</p>
            <div className="bg-white rounded-lg shadow">
              <div className="flex">
                {/* Sidebar - Lebih kecil */}
                <div className="p-4 w-48 bg-gray-50 border-r">
                  {/* Logo */}
                  <div className="mb-6 h-8 bg-gray-200 rounded" />
                  {/* Menu Items */}
                  <div className="space-y-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex gap-2 items-center p-2 rounded hover:bg-gray-200">
                        <div className="w-5 h-5 bg-gray-300 rounded" />
                        <div className="flex-1 h-4 bg-gray-300 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {[1,2,3,4].map(i => (
                      <Card key={i} className="p-4">
                        <div className="flex gap-3 items-center mb-2">
                          <div className="w-8 h-8 bg-gray-300 rounded" />
                          <PlaceholderText width="w-1/2" />
                        </div>
                        <div className="text-lg font-bold">0</div>
                      </Card>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <Card className="aspect-[4/3] p-4">
                      <PlaceholderText className="mb-4" />
                      <div className="flex-1 bg-gray-100 rounded" />
                    </Card>
                    <Card className="aspect-[4/3] p-4">
                      <PlaceholderText className="mb-4" />
                      <div className="flex-1 bg-gray-100 rounded" />
                    </Card>
                  </div>

                  {/* Tables */}
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg border">
                      <PlaceholderText className="mb-4" width="w-48" />
                      <table className="w-full">
                        <thead>
                          <tr>
                            {['ID', 'Name', 'Email', 'Role', 'Action'].map(col => (
                              <th key={col} className="m-1 h-8 bg-gray-200 rounded" />
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[1,2,3].map(row => (
                            <tr key={row}>
                              {[1,2,3,4,5].map(col => (
                                <td key={col} className="m-1 h-12 bg-gray-100 rounded" />
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <PlaceholderText className="mb-4" width="w-48" />
                      <table className="w-full">
                        <thead>
                          <tr>
                            {['ID', 'User', 'Amount', 'Status', 'Action'].map(col => (
                              <th key={col} className="m-1 h-8 bg-gray-200 rounded" />
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[1,2,3].map(row => (
                            <tr key={row}>
                              {[1,2,3,4,5].map(col => (
                                <td key={col} className="m-1 h-12 bg-gray-100 rounded" />
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="p-6 rounded-lg border">
            <p className="mb-4 text-sm text-center text-gray-600">Data Management</p>
            <div className="bg-white rounded-lg shadow">
              <div className="flex">
                {/* Sidebar - Lebih kecil */}
                <div className="p-4 w-48 bg-gray-50 border-r">
                  {/* Logo */}
                  <div className="mb-6 h-8 bg-gray-200 rounded" />
                  {/* Menu Items */}
                  <div className="space-y-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex gap-2 items-center p-2 rounded hover:bg-gray-200">
                        <div className="w-5 h-5 bg-gray-300 rounded" />
                        <div className="flex-1 h-4 bg-gray-300 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-64">
                      <div className="flex gap-2 p-2 rounded border">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                        <div className="flex-1 h-5 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm text-white rounded bg-primary">
                      Add New
                    </button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <table className="w-full">
                      <thead>
                        <tr>
                          {['ID', 'Name', 'Status', 'Created', 'Action'].map(col => (
                            <th key={col} className="m-1 h-8 bg-gray-200 rounded" />
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[1,2,3,4,5].map(row => (
                          <tr key={row}>
                            {[1,2,3,4,5].map(col => (
                              <td key={col} className="m-1 h-12 bg-gray-100 rounded" />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Interface */}
      <section>
        <h3 className="mb-4 text-lg font-bold">Mobile Interface</h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {/* Mobile Home */}
          <div className="p-4 rounded-lg border">
            <p className="mb-4 text-sm text-center text-gray-600">Mobile Home</p>
            <div className="bg-white rounded-lg shadow w-full max-w-[320px] mx-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="font-bold">Logo</div>
                <Bars3Icon className="w-6 h-6" />
              </div>
              <Card className="h-40" />
              <div className="p-4">
                <div className="flex gap-2 p-2 mb-4 rounded border">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                  <div className="flex-1 h-6 bg-gray-200 rounded" />
                </div>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <Card key={i} className="aspect-video" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Detail */}
          <div className="p-4 rounded-lg border">
            <p className="mb-4 text-sm text-center text-gray-600">Mobile Detail</p>
            <div className="bg-white rounded-lg shadow w-full max-w-[320px] mx-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <ChevronLeftIcon className="w-6 h-6" />
                <ShareIcon className="w-6 h-6" />
              </div>
              <Card className="h-48" />
              <div className="p-4 space-y-4">
                <PlaceholderText />
                <PlaceholderText width="w-1/2" />
                <div className="space-y-2">
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 rounded bg-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Cart */}
          <div className="p-4 rounded-lg border">
            <p className="mb-4 text-sm text-center text-gray-600">Mobile Cart</p>
            <div className="bg-white rounded-lg shadow w-full max-w-[320px] mx-auto">
              <div className="flex items-center p-4 border-b">
                <ChevronLeftIcon className="mr-2 w-6 h-6" />
                <h1 className="font-medium">Keranjang</h1>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {[1,2].map(i => (
                    <Card key={i} className="h-24" />
                  ))}
                </div>
                <div className="pt-4 mt-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span>Total</span>
                    <PlaceholderText width="w-24" />
                  </div>
                  <div className="h-10 rounded bg-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Checkout */}
          <div className="p-4 rounded-lg border">
            <p className="mb-4 text-sm text-center text-gray-600">Mobile Checkout</p>
            <div className="bg-white rounded-lg shadow w-full max-w-[320px] mx-auto">
              <div className="flex items-center p-4 border-b">
                <ChevronLeftIcon className="mr-2 w-6 h-6" />
                <h1 className="font-medium">Checkout</h1>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <PlaceholderText width="w-24" className="mb-2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                  <div>
                    <PlaceholderText width="w-24" className="mb-2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                  <div>
                    <PlaceholderText width="w-24" className="mb-2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span>Total</span>
                    <PlaceholderText width="w-24" />
                  </div>
                  <div className="h-10 rounded bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 