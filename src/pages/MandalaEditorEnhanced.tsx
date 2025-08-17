import { useState, useEffect } from 'react'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { useMandalaStoreWithHistory } from '../store/mandalaStoreWithHistory'
import MandalaGrid from '../components/MandalaGrid'
import ExportPanel from '../components/ExportPanel'
import { useToast, ToastContainer } from '../components/Toast'
import { 
  Save, 
  Download, 
  Trash2, 
  Settings, 
  ArrowLeft, 
  Plus,
  Brain,
  Target,
  Lightbulb,
  BookOpen,
  AlertTriangle,
  Undo,
  Redo
} from 'lucide-react'

const MandalaEditorEnhanced = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const params = useParams()
  const { success, error, info, toasts, closeToast } = useToast()
  const { 
    charts, 
    currentChart, 
    tempChart,
    setCurrentChart, 
    createChart, 
    updateChart, 
    deleteChart,
    saveTempChart,
    undo,
    redo,
    canUndo,
    canRedo,
    getHistorySize,
    clearHistory,
    findParentChart
  } = useMandalaStoreWithHistory()
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showThinkingModeModal, setShowThinkingModeModal] = useState(false)
  const [showExportPanel, setShowExportPanel] = useState(false)

  // 從URL參數獲取圖表ID（支持路由參數和查詢參數）
  const chartId = params.chartId || searchParams.get('chart')

  useEffect(() => {
    if (chartId) {
      const chart = charts.find(c => c.id === chartId)
      if (chart) {
        setCurrentChart(chart)
      } else {
        // 如果指定的圖表不存在，回到首頁而不是創建新圖表
        navigate('/')
      }
    }
    // 移除自動創建邏輯，讓用戶主動創建
  }, [chartId, charts, setCurrentChart, navigate])

  const handleSave = () => {
    if (currentChart) {
      // 如果是臨時圖表，先保存為正式圖表
      if (tempChart && tempChart.id === currentChart.id) {
        const savedChart = saveTempChart()
        if (savedChart) {
          success('模板已保存為新圖表', { title: '儲存成功' })
        } else {
          error('保存失敗', { title: '儲存失敗' })
        }
      } else {
        // 正式圖表只需更新時間戳
        updateChart(currentChart.id, { updatedAt: new Date() })
        success('圖表已儲存', { title: '儲存成功' })
      }
    } else {
      error('沒有可儲存的圖表', { title: '儲存失敗' })
    }
  }

  const handleUndo = () => {
    if (canUndo()) {
      undo()
    }
  }

  const handleRedo = () => {
    if (canRedo()) {
      redo()
    }
  }

  const handleDelete = () => {
    if (currentChart) {
      const chartTitle = currentChart.title
      deleteChart(currentChart.id)
      setCurrentChart(null)
      success(`已刪除「${chartTitle}」`, { title: '刪除成功' })
      setShowDeleteConfirm(false)
      navigate('/')
    } else {
      error('沒有可刪除的圖表', { title: '刪除失敗' })
      setShowDeleteConfirm(false)
    }
  }

  const handleTitleChange = (title: string) => {
    if (currentChart) {
      updateChart(currentChart.id, { title })
    }
  }

  const handleThinkingModeChange = (mode: 'radial' | 'spiral' | 'cross') => {
    if (currentChart) {
      updateChart(currentChart.id, { thinkingMode: mode })
    }
    setShowThinkingModeModal(false)
  }

  const thinkingModes = [
    {
      id: 'radial',
      name: '放射狀思考',
      description: '從中心主題向外輻射，用於創意發想和多角度分析',
      icon: Brain,
      color: 'text-blue-600',
      tips: [
        '適合頭腦風暴和創意發想',
        '從多角度探索主題',
        '鼓勵發散性思維',
        '適合探索新想法和可能性'
      ]
    },
    {
      id: 'spiral',
      name: '螺旋狀思考',
      description: '順時針排列步驟，適合計劃管理和時間安排',
      icon: Target,
      color: 'text-green-600',
      tips: [
        '適合制定執行計劃',
        '按步驟順序排列',
        '便於時間管理',
        '適合專案規劃和目標分解'
      ]
    },
    {
      id: 'cross',
      name: '十字型思考',
      description: '中心加十字方向延伸，適合5W1H問題分析',
      icon: Lightbulb,
      color: 'text-purple-600',
      tips: [
        '適合問題分析和解決',
        '運用5W1H方法',
        '系統化分析問題',
        '適合深度思考和決策'
      ]
    }
  ]

  if (!currentChart) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">沒有選中的圖表</h2>
        <p className="text-gray-600 mb-6">請從首頁選擇一個圖表進行編輯，或創建新的圖表</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首頁
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            {/* 面包屑導航 */}
            {(() => {
              const parentInfo = findParentChart(currentChart.id)
              if (parentInfo) {
                const parentCell = parentInfo.parent.cells.find(cell => cell.id === parentInfo.cellId)
                return (
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <button
                      onClick={() => {
                        setCurrentChart(parentInfo.parent)
                        navigate(`/editor/${parentInfo.parent.id}`)
                      }}
                      className="hover:text-gray-700 hover:underline"
                    >
                      {parentInfo.parent.title}
                    </button>
                    <span className="mx-2">›</span>
                    <span>{parentCell?.content || '子主題'}</span>
                  </div>
                )
              }
              return null
            })()}
            
            <input
              type="text"
              value={currentChart.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-2xl font-bold text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0"
              placeholder="輸入標題..."
            />
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">
                創建於 {new Date(currentChart.createdAt).toLocaleDateString('zh-TW')}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">
                更新於 {new Date(currentChart.updatedAt).toLocaleDateString('zh-TW')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {/* 撤銷/重做按鈕 */}
          <div className="flex gap-1 mr-2">
            <button
              onClick={handleUndo}
              disabled={!canUndo()}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="撤銷 (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo()}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="重做 (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={() => setShowExportPanel(true)}
            className="btn-secondary inline-flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            導出
          </button>
          <button
            onClick={() => setShowThinkingModeModal(true)}
            className="btn-secondary inline-flex items-center"
          >
            <Settings className="h-4 w-4 mr-2" />
            思考模式
          </button>
          <button
            onClick={handleSave}
            className="btn-primary inline-flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            儲存
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium inline-flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            刪除
          </button>
        </div>
      </div>


      {/* Thinking Mode Indicator */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">當前思考模式：</span>
            {(() => {
              const mode = thinkingModes.find(m => m.id === currentChart.thinkingMode)
              if (!mode) return null
              const Icon = mode.icon
              return (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 ${mode.color}`}>
                  <Icon className="h-4 w-4 mr-2" />
                  {mode.name}
                </span>
              )
            })()}
          </div>
          
          <button
            onClick={() => setShowThinkingModeModal(true)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            切換模式
          </button>
        </div>
        
        <div className="mt-3 space-y-2">
          <p className="text-sm text-gray-600">
            {thinkingModes.find(m => m.id === currentChart.thinkingMode)?.description}
          </p>
          
          {/* 模式特定的提示 */}
          {currentChart.thinkingMode === 'radial' && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-md">
              <Brain className="h-4 w-4" />
              <span>💡 從中心主題向外發散思考，適合創意發想</span>
            </div>
          )}
          
          {currentChart.thinkingMode === 'spiral' && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
              <Target className="h-4 w-4" />
              <span>📋 按步驟順序排列，適合制定執行計劃</span>
            </div>
          )}
          
          {currentChart.thinkingMode === 'cross' && (
            <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-md">
              <Lightbulb className="h-4 w-4" />
              <span>🔍 運用5W1H方法，系統化分析問題</span>
            </div>
          )}
        </div>
      </div>

      {/* Mandala Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <MandalaGrid chart={currentChart} />
      </div>

      {/* Thinking Mode Modal */}
      {showThinkingModeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">選擇思考模式</h3>
            <div className="space-y-4">
              {thinkingModes.map((mode) => {
                const Icon = mode.icon
                return (
                  <div
                    key={mode.id}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      currentChart.thinkingMode === mode.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full bg-gray-100 ${mode.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{mode.name}</h4>
                          {currentChart.thinkingMode === mode.id && (
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                              當前模式
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{mode.description}</p>
                        
                        {/* 使用技巧 */}
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">使用技巧：</h5>
                          <ul className="space-y-1">
                            {mode.tips.map((tip, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 模式特定的说明 */}
                        {mode.id === 'radial' && (
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-sm text-blue-800">
                              💡 <strong>放射狀思考</strong>：從中心主題出發，向外發散思考，適合探索新想法和創意發想。
                            </p>
                          </div>
                        )}
                        
                        {mode.id === 'spiral' && (
                          <div className="bg-green-50 p-3 rounded-md">
                            <p className="text-sm text-green-800">
                              📋 <strong>螺旋狀思考</strong>：按順時針方向排列步驟，每個格子都有明確的步驟編號，適合制定執行計劃。
                            </p>
                          </div>
                        )}
                        
                        {mode.id === 'cross' && (
                          <div className="bg-purple-50 p-3 rounded-md">
                            <p className="text-sm text-purple-800">
                              🔍 <strong>十字型思考</strong>：運用5W1H方法，十字方向的格子有特定標籤，對角格子用於細節分析。
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleThinkingModeChange(mode.id as any)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentChart.thinkingMode === mode.id
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {currentChart.thinkingMode === mode.id ? '保持當前模式' : '選擇此模式'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            <button
              onClick={() => setShowThinkingModeModal(false)}
              className="w-full mt-6 btn-secondary"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">確認刪除</h3>
            </div>
            <p className="text-gray-600 mb-6">
              您確定要刪除「{currentChart.title}」嗎？此操作無法撤銷。
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                確認刪除
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 btn-secondary"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Panel */}
      <ExportPanel isOpen={showExportPanel} onClose={() => setShowExportPanel(false)} />
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={closeToast} />
    </div>
  )
}

export default MandalaEditorEnhanced