import { Outlet, Link, useLocation } from 'react-router-dom'
import { Brain, Home, FileText, Info, Plus, BookOpen } from 'lucide-react'

const Layout = () => {
  const location = useLocation()
  
  const navigation = [
    { name: '首頁', href: '/', icon: Home },
    { name: '編輯器', href: '/editor', icon: Plus },
    { name: '模板', href: '/templates', icon: FileText },
    { name: '教學', href: '/guide', icon: BookOpen },
    { name: '關於', href: '/about', icon: Info },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={`${import.meta.env.BASE_URL}Marga_AI.png`} alt="Marga AI Logo" className="h-8 w-8 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">MARGA_AI研究室</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      isActive
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <nav className="flex space-x-8 px-4 py-2 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 曼陀羅思考法系統. MARGA_AI研究室.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
