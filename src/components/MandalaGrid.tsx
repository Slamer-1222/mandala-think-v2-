import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MandalaCell, MandalaChart } from '../types'
import { useMandalaStoreWithHistory } from '../store/mandalaStoreWithHistory'
import { Plus, Edit3, Save, X, ArrowRight, Eye } from 'lucide-react'

interface MandalaGridProps {
  chart: MandalaChart
  onCellClick?: (cell: MandalaCell) => void
  editable?: boolean
}

const MandalaGrid = ({ chart, onCellClick, editable = true }: MandalaGridProps) => {
  const navigate = useNavigate()
  const { updateCell, addChildChart, setCurrentChart } = useMandalaStoreWithHistory()
  const [editingCell, setEditingCell] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [showChildrenFor, setShowChildrenFor] = useState<string | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  // 點擊外部關閉彈出層
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowChildrenFor(null)
      }
    }

    if (showChildrenFor) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showChildrenFor])

  const handleCellClick = (cell: MandalaCell) => {
    if (onCellClick) {
      onCellClick(cell)
    }
  }

  const handleEditStart = (cell: MandalaCell) => {
    setEditingCell(cell.id)
    setEditContent(cell.content)
  }

  const handleEditSave = (cellId: string) => {
    // 當保存中心格內容時，啟用自動重命名功能
    const shouldAutoRename = cellId === 'center'
    console.log('💾 handleEditSave 調用:', { 
      cellId, 
      content: editContent, 
      shouldAutoRename,
      chartTitle: chart.title 
    })
    updateCell(chart.id, cellId, editContent, { autoRename: shouldAutoRename })
    setEditingCell(null)
    setEditContent('')
  }

  const handleEditCancel = () => {
    setEditingCell(null)
    setEditContent('')
  }

  const handleAddChild = (cellId: string) => {
    addChildChart(chart.id, cellId)
  }

  const handleNavigateToChild = (childChart: MandalaChart) => {
    setCurrentChart(childChart)
    navigate(`/editor/${childChart.id}`)
  }

  // 获取螺旋状思考模式的步骤编号
  const getStepNumber = (position: string) => {
    const stepMap: Record<string, number> = {
      'top-left': 1,
      'top': 2,
      'top-right': 3,
      'left': 4,
      'right': 5,
      'bottom-left': 6,
      'bottom': 7,
      'bottom-right': 8
    }
    return stepMap[position]
  }

  // 获取十字型思考模式的5W1H标签
  const getWHLabel = (position: string) => {
    const labelMap: Record<string, string> = {
      'top': 'What',
      'left': 'Why',
      'right': 'Who',
      'bottom': 'When',
      'top-left': 'Where',
      'top-right': 'How',
      'bottom-left': '資源',
      'bottom-right': '結果'
    }
    return labelMap[position]
  }

  // 获取单元格的提示文本
  const getPlaceholderText = (position: string, thinkingMode: string) => {
    if (position === 'center') {
      return '點擊輸入主要主題'
    }

    switch (thinkingMode) {
      case 'radial':
        return '點擊輸入相關概念'
      case 'spiral':
        const step = getStepNumber(position)
        return `步驟${step}：點擊輸入內容`
      case 'cross':
        const label = getWHLabel(position)
        return `${label}：點擊輸入內容`
      default:
        return '點擊輸入內容'
    }
  }

  const renderCell = (cell: MandalaCell) => {
    const isCenter = cell.position === 'center'
    const isEditing = editingCell === cell.id
    const stepNumber = !isCenter && chart.thinkingMode === 'spiral' ? getStepNumber(cell.position) : null
    const whLabel = !isCenter && chart.thinkingMode === 'cross' ? getWHLabel(cell.position) : null

    return (
      <div
        key={cell.id}
        className={`mandala-cell ${isCenter ? 'mandala-center' : ''} relative group`}
        onClick={() => handleCellClick(cell)}
      >
        {/* 步骤编号 */}
        {stepNumber && (
          <div className="step-number">
            {stepNumber}
          </div>
        )}

        {/* 5W1H标签 */}
        {whLabel && (
          <div className="wh-label">
            {whLabel}
          </div>
        )}

        {isEditing ? (
          <div className="h-full flex flex-col">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 resize-none border-0 focus:ring-0 text-sm"
              placeholder="輸入內容..."
              autoFocus
            />
            <div className="flex justify-end space-x-1 mt-2">
              <button
                onClick={() => handleEditSave(cell.id)}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={handleEditCancel}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="h-full flex flex-col">
              <div className="flex-1 text-sm leading-relaxed">
                {cell.content || (
                  <span className="text-gray-400 italic">
                    {getPlaceholderText(cell.position, chart.thinkingMode)}
                  </span>
                )}
              </div>
              
              {editable && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditStart(cell)
                      }}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                      title="編輯"
                    >
                      <Edit3 className="h-3 w-3" />
                    </button>
                    {!isCenter && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddChild(cell.id)
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="添加子主題"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* 子主題指示器 */}
            {cell.children && cell.children.length > 0 && (
              <div className="absolute bottom-1 left-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowChildrenFor(showChildrenFor === cell.id ? null : cell.id)
                  }}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                  title="點擊查看子主題列表"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  {cell.children.length} 子主題
                </button>
              </div>
            )}

            {/* 子主題列表彈出層 */}
            {showChildrenFor === cell.id && cell.children && (
              <div 
                ref={popupRef}
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px] z-20">
                <div className="text-xs font-medium text-gray-600 mb-2">子主題列表</div>
                <div className="space-y-2">
                  {cell.children.map((childChart, index) => (
                    <div
                      key={childChart.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleNavigateToChild(childChart)}
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {childChart.title || `子主題 ${index + 1}`}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(childChart.updatedAt).toLocaleDateString('zh-TW')}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowChildrenFor(null)
                  }}
                  className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700"
                >
                  關閉
                </button>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  // 按照九宮格位置排列單元格
  const getCellByPosition = (position: string) => {
    return chart.cells.find(cell => cell.position === position)
  }

  const positions = [
    'top-left', 'top', 'top-right',
    'left', 'center', 'right',
    'bottom-left', 'bottom', 'bottom-right'
  ]

  return (
    <div id="mandala-grid" className={`mandala-grid ${chart.thinkingMode}`}>
      {positions.map(position => {
        const cell = getCellByPosition(position)
        if (!cell) return null
        return renderCell(cell)
      })}
    </div>
  )
}

export default MandalaGrid
