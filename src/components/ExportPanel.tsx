import { useState } from 'react'
import { Download, FileImage, FileText, Upload } from 'lucide-react'
import { useExport } from '../hooks/useExport'
import { useMandalaStoreWithHistory } from '../store/mandalaStoreWithHistory'
import { MandalaChart } from '../types'

interface ExportPanelProps {
  isOpen: boolean
  onClose: () => void
}

const ExportPanel = ({ isOpen, onClose }: ExportPanelProps) => {
  const { currentChart, charts, createChart, setCurrentChart } = useMandalaStoreWithHistory()
  const { exportAsPNG, exportAsJSON, importFromJSON } = useExport()
  const [isExporting, setIsExporting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handlePNGExport = async () => {
    if (!currentChart) {
      showMessage('error', '請先選擇一個圖表')
      return
    }

    setIsExporting(true)
    const success = await exportAsPNG('mandala-grid', `${currentChart.title}-${Date.now()}.png`)
    setIsExporting(false)

    if (success) {
      showMessage('success', 'PNG 圖片導出成功!')
    } else {
      showMessage('error', 'PNG 導出失敗，請重試')
    }
  }

  const handleJSONExport = () => {
    if (!currentChart) {
      showMessage('error', '請先選擇一個圖表')
      return
    }

    const success = exportAsJSON(currentChart)
    if (success) {
      showMessage('success', 'JSON 數據導出成功!')
    } else {
      showMessage('error', 'JSON 導出失敗，請重試')
    }
  }

  const handleJSONImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const chart = await importFromJSON(file)
      if (chart) {
        // 生成新的ID避免衝突
        const newChart: MandalaChart = {
          ...chart,
          id: Date.now().toString(),
          title: `${chart.title} (導入)`
        }
        
        createChart(newChart.title)
        const createdChart = useMandalaStore.getState().charts.find(c => c.title === newChart.title)
        if (createdChart) {
          // 更新導入的數據
          useMandalaStore.getState().updateChart(createdChart.id, {
            cells: newChart.cells,
            thinkingMode: newChart.thinkingMode
          })
        }
        
        showMessage('success', 'JSON 數據導入成功!')
      } else {
        showMessage('error', '導入失敗：文件格式無效')
      }
    } catch (error) {
      showMessage('error', '導入失敗：' + (error as Error).message)
    }

    // 清除文件選擇
    event.target.value = ''
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">導出/導入</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* 當前圖表信息 */}
        {currentChart && (
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">當前圖表</p>
            <p className="font-medium">{currentChart.title}</p>
            <p className="text-xs text-gray-500">
              {currentChart.thinkingMode === 'radial' && '放射狀思考'}
              {currentChart.thinkingMode === 'spiral' && '螺旋狀思考'}
              {currentChart.thinkingMode === 'cross' && '十字型思考'}
            </p>
          </div>
        )}

        {/* 導出功能 */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium text-gray-900">導出</h3>
          
          <button
            onClick={handlePNGExport}
            disabled={!currentChart || isExporting}
            className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FileImage className="w-5 h-5" />
            <span>{isExporting ? '導出中...' : '導出為 PNG 圖片'}</span>
          </button>

          <button
            onClick={handleJSONExport}
            disabled={!currentChart}
            className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>導出為 JSON 數據</span>
          </button>
        </div>

        {/* 導入功能 */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">導入</h3>
          
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleJSONImport}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="json-import"
            />
            <label
              htmlFor="json-import"
              className="w-full flex items-center justify-center space-x-2 bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <Upload className="w-5 h-5" />
              <span>導入 JSON 數據</span>
            </label>
          </div>
        </div>

        {/* 說明 */}
        <div className="mt-6 text-xs text-gray-500">
          <p>• PNG 格式：適合分享和打印</p>
          <p>• JSON 格式：完整數據備份，可重新導入</p>
        </div>
      </div>
    </div>
  )
}

export default ExportPanel