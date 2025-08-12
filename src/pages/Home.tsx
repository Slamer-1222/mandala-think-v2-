import { Link } from 'react-router-dom'
import { useMandalaStoreWithHistory } from '../store/mandalaStoreWithHistory'
import { Brain, Target, Lightbulb, BookOpen, Users, ArrowRight, Plus, Clock, Star } from 'lucide-react'

const Home = () => {
  const { charts, createChart } = useMandalaStoreWithHistory()

  const features = [
    {
      icon: Brain,
      title: '創意思考',
      description: '利用九宮格結構激發創意，從多角度探索主題'
    },
    {
      icon: Target,
      title: '目標設定',
      description: '將大目標分解為具體可執行的步驟'
    },
    {
      icon: Lightbulb,
      title: '問題分析',
      description: '運用5W1H方法系統化分析問題'
    },
    {
      icon: BookOpen,
      title: '知識整理',
      description: '將複雜知識結構化，提升學習效率'
    }
  ]

  const recentCharts = charts.slice(-3).reverse()

  const handleCreateNew = () => {
    createChart('新曼陀羅圖')
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary-100 rounded-full">
            <Brain className="h-16 w-16 text-primary-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          曼陀羅思考法
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          基於日本學者今泉浩晃的曼陀羅圖表法，幫助您進行創意思考、目標設定和問題分析。
          透過九宮格結構，將複雜的資訊整理得更具體且有條理。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/editor"
            className="btn-primary inline-flex items-center"
            onClick={handleCreateNew}
          >
            <Plus className="h-5 w-5 mr-2" />
            開始創建
          </Link>
          <Link to="/templates" className="btn-secondary inline-flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            查看模板
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          核心功能特色
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-full">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          如何使用曼陀羅思考法
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">定義主題</h3>
            <p className="text-gray-600">在九宮格中央寫下你想思考的主要主題或問題</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">展開思考</h3>
            <p className="text-gray-600">在周圍八格填入與主題相關的延伸內容或執行方案</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">深度探索</h3>
            <p className="text-gray-600">對重要概念進一步展開，形成多層次的思考結構</p>
          </div>
        </div>
      </div>

      {/* Recent Charts */}
      {recentCharts.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">最近創建的圖表</h2>
            <Link to="/editor" className="text-primary-600 hover:text-primary-700 font-medium">
              查看全部 <ArrowRight className="h-4 w-4 inline ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentCharts.map((chart) => (
              <div key={chart.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{chart.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(chart.updatedAt).toLocaleDateString('zh-TW')}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(chart.updatedAt).toLocaleString('zh-TW')}
                </div>
                <Link
                  to={`/editor?chart=${chart.id}`}
                  className="btn-primary w-full text-center"
                >
                  繼續編輯
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">準備好開始您的曼陀羅思考之旅了嗎？</h2>
        <p className="text-primary-100 mb-6">
          立即創建您的第一個曼陀羅圖，體驗結構化思考的力量
        </p>
        <Link
          to="/editor"
          className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
          onClick={handleCreateNew}
        >
          <Plus className="h-5 w-5 mr-2" />
          免費開始
        </Link>
      </div>
    </div>
  )
}

export default Home
