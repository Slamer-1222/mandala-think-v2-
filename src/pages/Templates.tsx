import { useNavigate } from 'react-router-dom'
import { useMandalaStoreWithHistory } from '../store/mandalaStoreWithHistory'
import { Brain, Target, Lightbulb, BookOpen, AlertTriangle, Plus, Play } from 'lucide-react'

const Templates = () => {
  const navigate = useNavigate()
  const { templates, loadTemplateAsTemp } = useMandalaStoreWithHistory()

  const categoryIcons = {
    creative: Brain,
    planning: Target,
    analysis: Lightbulb,
    learning: BookOpen,
    'problem-solving': AlertTriangle
  }

  const categoryNames = {
    creative: '創意發想',
    planning: '目標設定',
    analysis: '問題分析',
    learning: '學習整理',
    'problem-solving': '問題解決'
  }

  const handleUseTemplate = (templateId: string) => {
    const tempChart = loadTemplateAsTemp(templateId)
    // 进入临时编辑模式
    if (tempChart) {
      navigate(`/editor/temp/${templateId}`)
    } else {
      navigate('/editor')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">曼陀羅思考法模板</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          選擇適合您需求的模板，快速開始您的曼陀羅思考之旅。
          每個模板都針對不同的應用場景進行優化設計。
        </p>
      </div>

      {/* Template Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = categoryIcons[template.category] || Brain
          const categoryName = categoryNames[template.category] || '其他'
          
          return (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {categoryName}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    思考模式: {
                      template.thinkingMode === 'radial' ? '放射狀' :
                      template.thinkingMode === 'spiral' ? '螺旋狀' : '十字型'
                    }
                  </span>
                  
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="btn-primary inline-flex items-center"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    使用模板
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Template Usage Guide */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          如何使用模板
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">選擇模板</h3>
            <p className="text-gray-600">根據您的需求選擇合適的思考模式模板</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">自定義內容</h3>
            <p className="text-gray-600">在模板基礎上填入您的具體內容和想法</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">展開思考</h3>
            <p className="text-gray-600">根據需要進一步展開子主題，形成多層次結構</p>
          </div>
        </div>
      </div>

      {/* Thinking Mode Explanation */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          三種思考模式說明
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">放射狀思考</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              從中心主題向外輻射，八個方向可以寫與核心相關但不一定相互關聯的點子。
            </p>
            <p className="text-gray-600 text-sm">
              <strong>適用場景：</strong>創意發想、頭腦風暴、多角度分析
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">螺旋狀思考</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              以順時針方向安排要執行的步驟，適合用於計劃和時間管理。
            </p>
            <p className="text-gray-600 text-sm">
              <strong>適用場景：</strong>目標設定、專案規劃、流程設計
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-8 w-8 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">十字型思考</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              中心加十字方向延伸次主題，並在次主題周圍展開細節，適合綜合分析。
            </p>
            <p className="text-gray-600 text-sm">
              <strong>適用場景：</strong>問題分析、5W1H分析、系統思考
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Templates
