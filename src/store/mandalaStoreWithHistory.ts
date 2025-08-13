import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MandalaChart, MandalaCell, Template } from '../types'

// 歷史記錄接口
interface ChartHistory {
  id: string
  chart: MandalaChart
  timestamp: Date
  action: string
}

interface HistoryState {
  past: ChartHistory[]
  future: ChartHistory[]
}

interface MandalaStoreWithHistory {
  charts: MandalaChart[]
  currentChart: MandalaChart | null
  templates: Template[]
  history: HistoryState
  tempChart: MandalaChart | null  // 临时图表，未保存到列表
  
  // 原有 Actions
  createChart: (title: string, template?: string) => void
  updateChart: (chartId: string, updates: Partial<MandalaChart>) => void
  deleteChart: (chartId: string) => void
  setCurrentChart: (chart: MandalaChart | null) => void
  
  updateCell: (chartId: string, cellId: string, content: string, options?: { autoRename?: boolean }) => void
  addChildChart: (chartId: string, cellId: string) => MandalaChart
  
  loadTemplate: (templateId: string) => MandalaChart | null
  loadTemplateAsTemp: (templateId: string) => MandalaChart | null  // 新增：加载为临时模板
  saveAsTemplate: (chart: MandalaChart, name: string, description: string) => void
  saveTempChart: () => MandalaChart | null  // 新增：保存临时图表
  
  // 新增歷史管理 Actions
  undo: () => boolean
  redo: () => boolean
  saveToHistory: (action: string) => void
  clearHistory: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  getHistorySize: () => number
  
  // 導航輔助函數
  findParentChart: (childChartId: string) => { parent: MandalaChart; cellId: string } | null
}

const MAX_HISTORY_SIZE = 10

const createEmptyChart = (title: string, template?: string): MandalaChart => {
  const now = new Date()
  const cells: MandalaCell[] = [
    { id: 'center', content: '', position: 'center' },
    { id: 'top', content: '', position: 'top' },
    { id: 'top-right', content: '', position: 'top-right' },
    { id: 'right', content: '', position: 'right' },
    { id: 'bottom-right', content: '', position: 'bottom-right' },
    { id: 'bottom', content: '', position: 'bottom' },
    { id: 'bottom-left', content: '', position: 'bottom-left' },
    { id: 'left', content: '', position: 'left' },
    { id: 'top-left', content: '', position: 'top-left' },
  ]
  
  return {
    id: Date.now().toString(),
    title,
    cells,
    createdAt: now,
    updatedAt: now,
    template,
    thinkingMode: 'radial'
  }
}

// 深拷貝函數
const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const useMandalaStoreWithHistory = create<MandalaStoreWithHistory>()(
  persist(
    (set, get) => ({
      charts: [],
      currentChart: null,
      tempChart: null,
      templates: [
        {
          id: 'creative',
          name: '創意發想模板',
          description: '用於頭腦風暴和創意發想，從中心主題向外輻射相關概念',
          category: 'creative',
          cells: [
            { position: 'center', content: '主要主題' },
            { position: 'top', content: '相關概念1' },
            { position: 'top-right', content: '相關概念2' },
            { position: 'right', content: '相關概念3' },
            { position: 'bottom-right', content: '相關概念4' },
            { position: 'bottom', content: '相關概念5' },
            { position: 'bottom-left', content: '相關概念6' },
            { position: 'left', content: '相關概念7' },
            { position: 'top-left', content: '相關概念8' },
          ],
          thinkingMode: 'radial'
        },
        {
          id: 'planning',
          name: '目標設定模板',
          description: '用於目標分解和計劃管理，按步驟順序排列執行計劃',
          category: 'planning',
          cells: [
            { position: 'center', content: '主要目標' },
            { position: 'top', content: '第一步驟：定義目標' },
            { position: 'top-right', content: '第二步驟：分析現況' },
            { position: 'right', content: '第三步驟：制定策略' },
            { position: 'bottom-right', content: '第四步驟：分配資源' },
            { position: 'bottom', content: '第五步驟：執行計劃' },
            { position: 'bottom-left', content: '第六步驟：監控進度' },
            { position: 'left', content: '第七步驟：評估結果' },
            { position: 'top-left', content: '第八步驟：持續改進' },
          ],
          thinkingMode: 'spiral'
        },
        {
          id: 'analysis',
          name: '問題分析模板',
          description: '用於5W1H問題分析，系統化分析問題的各個面向',
          category: 'analysis',
          cells: [
            { position: 'center', content: '核心問題' },
            { position: 'top', content: 'What (什麼)：問題的本質是什麼？' },
            { position: 'top-right', content: 'How (如何)：如何解決這個問題？' },
            { position: 'right', content: 'Who (誰)：誰來負責解決？' },
            { position: 'bottom-right', content: '結果：預期達到什麼效果？' },
            { position: 'bottom', content: 'When (何時)：什麼時候解決？' },
            { position: 'bottom-left', content: '資源：需要什麼資源？' },
            { position: 'left', content: 'Why (為什麼)：為什麼會出現這個問題？' },
            { position: 'top-left', content: 'Where (何地)：在哪裡解決？' },
          ],
          thinkingMode: 'cross'
        },
        {
          id: 'learning',
          name: '學習規劃模板',
          description: '用於知識學習和技能提升的系統化規劃',
          category: 'learning',
          cells: [
            { position: 'center', content: '學習主題' },
            { position: 'top', content: '基礎概念' },
            { position: 'top-right', content: '核心理論' },
            { position: 'right', content: '實踐應用' },
            { position: 'bottom-right', content: '案例分析' },
            { position: 'bottom', content: '練習鞏固' },
            { position: 'bottom-left', content: '知識整合' },
            { position: 'left', content: '評估測試' },
            { position: 'top-left', content: '反思總結' },
          ],
          thinkingMode: 'spiral'
        },
        {
          id: 'project',
          name: '專案管理模板',
          description: '用於專案規劃和執行管理的完整流程',
          category: 'project',
          cells: [
            { position: 'center', content: '專案目標' },
            { position: 'top', content: '專案啟動' },
            { position: 'top-right', content: '需求分析' },
            { position: 'right', content: '設計規劃' },
            { position: 'bottom-right', content: '開發實施' },
            { position: 'bottom', content: '測試驗證' },
            { position: 'bottom-left', content: '部署上線' },
            { position: 'left', content: '監控維護' },
            { position: 'top-left', content: '專案收尾' },
          ],
          thinkingMode: 'spiral'
        }
      ],
      history: {
        past: [],
        future: []
      },
      
      // 保存到歷史記錄
      saveToHistory: (action: string) => {
        const state = get()
        if (!state.currentChart) return
        
        const historyEntry: ChartHistory = {
          id: Date.now().toString(),
          chart: deepClone(state.currentChart),
          timestamp: new Date(),
          action
        }
        
        set((state) => ({
          history: {
            past: [...state.history.past.slice(-(MAX_HISTORY_SIZE - 1)), historyEntry],
            future: [] // 清除重做歷史
          }
        }))
      },
      
      // 撤銷操作
      undo: () => {
        const state = get()
        if (state.history.past.length === 0) return false
        
        const previous = state.history.past[state.history.past.length - 1]
        const newPast = state.history.past.slice(0, -1)
        
        // 保存當前狀態到future
        const currentHistoryEntry: ChartHistory | null = state.currentChart ? {
          id: Date.now().toString(),
          chart: deepClone(state.currentChart),
          timestamp: new Date(),
          action: '當前狀態'
        } : null
        
        set((state) => {
          // 更新圖表列表中的對應圖表
          const updatedCharts = state.charts.map(chart => 
            chart.id === previous.chart.id ? previous.chart : chart
          )
          
          return {
            charts: updatedCharts,
            currentChart: previous.chart,
            history: {
              past: newPast,
              future: currentHistoryEntry ? [currentHistoryEntry, ...state.history.future] : state.history.future
            }
          }
        })
        
        return true
      },
      
      // 重做操作
      redo: () => {
        const state = get()
        if (state.history.future.length === 0) return false
        
        const next = state.history.future[0]
        const newFuture = state.history.future.slice(1)
        
        // 保存當前狀態到past
        const currentHistoryEntry: ChartHistory | null = state.currentChart ? {
          id: Date.now().toString(),
          chart: deepClone(state.currentChart),
          timestamp: new Date(),
          action: '當前狀態'
        } : null
        
        set((state) => {
          // 更新圖表列表中的對應圖表
          const updatedCharts = state.charts.map(chart => 
            chart.id === next.chart.id ? next.chart : chart
          )
          
          return {
            charts: updatedCharts,
            currentChart: next.chart,
            history: {
              past: currentHistoryEntry ? [...state.history.past, currentHistoryEntry] : state.history.past,
              future: newFuture
            }
          }
        })
        
        return true
      },
      
      // 清除歷史記錄
      clearHistory: () => {
        set((state) => ({
          history: {
            past: [],
            future: []
          }
        }))
      },
      
      // 檢查是否可以撤銷
      canUndo: () => {
        return get().history.past.length > 0
      },
      
      // 檢查是否可以重做
      canRedo: () => {
        return get().history.future.length > 0
      },
      
      // 獲取歷史記錄大小
      getHistorySize: () => {
        const { past, future } = get().history
        return past.length + future.length
      },
      
      // 原有功能 - 修改後會自動保存到歷史
      createChart: (title: string, template?: string) => {
        const newChart = createEmptyChart(title, template)
        set((state) => ({
          charts: [...state.charts, newChart],
          currentChart: newChart
        }))
        
        // 保存到歷史
        get().saveToHistory('創建圖表')
      },
      
      updateChart: (chartId: string, updates: Partial<MandalaChart>) => {
        set((state) => {
          const updatedCharts = state.charts.map(chart => 
            chart.id === chartId 
              ? { ...chart, ...updates, updatedAt: new Date() }
              : chart
          )
          
          const updatedCurrentChart = state.currentChart?.id === chartId 
            ? { ...state.currentChart, ...updates, updatedAt: new Date() }
            : state.currentChart
            
          return {
            charts: updatedCharts,
            currentChart: updatedCurrentChart
          }
        })
        
        // 保存到歷史（排除自動更新時間戳的情況）
        if (!updates.updatedAt) {
          get().saveToHistory('更新圖表')
        }
      },
      
      deleteChart: (chartId: string) => {
        set((state) => ({
          charts: state.charts.filter(chart => chart.id !== chartId),
          currentChart: state.currentChart?.id === chartId ? null : state.currentChart
        }))
        
        // 清除與此圖表相關的歷史記錄
        set((state) => ({
          history: {
            past: state.history.past.filter(entry => entry.chart.id !== chartId),
            future: state.history.future.filter(entry => entry.chart.id !== chartId)
          }
        }))
      },
      
      setCurrentChart: (chart: MandalaChart | null) => {
        set({ currentChart: chart })
      },
      
      updateCell: (chartId: string, cellId: string, content: string, options?: { autoRename?: boolean }) => {
        set((state) => {
          const shouldAutoRename = options?.autoRename ?? false // 默認不自動重命名
          
          // 检查是否是临时图表且编辑中心格，如果是则需要先保存为正式图表
          const isEditingCenterOfTempChart = state.tempChart && state.tempChart.id === chartId && cellId === 'center' && content.trim()
          
          let updatedCharts = [...state.charts]
          let updatedCurrentChart = state.currentChart
          let updatedTempChart = state.tempChart
          
          if (isEditingCenterOfTempChart) {
            // 临时图表编辑中心格时，保存为正式图表
            console.log('🔄 临时图表编辑中心格，自动保存为正式图表:', content.trim())
            
            const savedChart = {
              ...state.tempChart,
              title: content.trim(), // 使用中心格内容作为标题
              cells: state.tempChart.cells.map(cell => 
                cell.id === cellId 
                  ? { ...cell, content }
                  : cell
              ),
              updatedAt: new Date()
            }
            
            updatedCharts = [...state.charts, savedChart]
            updatedCurrentChart = savedChart
            updatedTempChart = null // 清除临时状态
            
            return {
              charts: updatedCharts,
              currentChart: updatedCurrentChart,
              tempChart: updatedTempChart
            }
          }
          
          // 正常的图表更新逻辑
          updatedCharts = state.charts.map(chart => {
            if (chart.id === chartId) {
              let updatedChart = {
                ...chart,
                cells: chart.cells.map(cell => 
                  cell.id === cellId 
                    ? { ...cell, content }
                    : cell
                ),
                updatedAt: new Date()
              }
              
              // 只有在明確要求自動重命名時才執行
              if (shouldAutoRename && cellId === 'center' && content.trim()) {
                const isTemplateTitle = chart.title.endsWith(' - 副本')
                if (isTemplateTitle || chart.title === '新曼陀羅圖') {
                  console.log('🔄 自動重命名觸發:', { 
                    oldTitle: chart.title, 
                    newTitle: content.trim(),
                    shouldAutoRename,
                    cellId 
                  })
                  updatedChart = {
                    ...updatedChart,
                    title: content.trim()
                  }
                }
              }
              
              return updatedChart
            }
            return chart
          })
          
          // 更新 currentChart (包括临时图表)
          if (state.currentChart?.id === chartId) {
            let updatedChart = {
              ...state.currentChart,
              cells: state.currentChart.cells.map(cell => 
                cell.id === cellId 
                  ? { ...cell, content }
                  : cell
              ),
              updatedAt: new Date()
            }
            
            // 对正式图表应用自动重命名逻辑
            if (shouldAutoRename && cellId === 'center' && content.trim() && !state.tempChart) {
              const isTemplateTitle = state.currentChart.title.endsWith(' - 副本')
              if (isTemplateTitle || state.currentChart.title === '新曼陀羅圖') {
                console.log('🔄 currentChart 自動重命名觸發:', { 
                  oldTitle: state.currentChart.title, 
                  newTitle: content.trim(),
                  shouldAutoRename,
                  cellId 
                })
                updatedChart = {
                  ...updatedChart,
                  title: content.trim()
                }
              }
            }
            
            updatedCurrentChart = updatedChart
            
            // 如果是临时图表，也要更新临时图表状态
            if (state.tempChart && state.tempChart.id === chartId) {
              updatedTempChart = updatedChart
            }
          }
            
          return {
            charts: updatedCharts,
            currentChart: updatedCurrentChart,
            tempChart: updatedTempChart
          }
        })
        
        // 保存到歷史
        get().saveToHistory('編輯單元格')
      },
      
      addChildChart: (chartId: string, cellId: string) => {
        const state = get()
        const parentChart = state.charts.find(chart => chart.id === chartId)
        const parentCell = parentChart?.cells.find(cell => cell.id === cellId)
        
        // 使用父格子的內容作為子主題標題，如果為空則使用預設值
        const childTitle = parentCell?.content 
          ? `${parentCell.content} - 詳細探討`
          : '子主題'
        
        const childChart = createEmptyChart(childTitle, 'creative')
        
        // 在子圖表的中心格子預填父格子的內容
        if (parentCell?.content) {
          childChart.cells[0].content = parentCell.content
        }
        
        set((state) => ({
          charts: [
            ...state.charts.map(chart => 
              chart.id === chartId 
                ? {
                    ...chart,
                    cells: chart.cells.map(cell => 
                      cell.id === cellId 
                        ? { ...cell, children: [...(cell.children || []), childChart] }
                        : cell
                    ),
                    updatedAt: new Date()
                  }
                : chart
            ),
            childChart // 將子圖表添加到圖表列表
          ],
          currentChart: childChart // 直接設置為當前圖表
        }))
        
        // 保存到歷史
        get().saveToHistory('添加子圖表')
        
        return childChart
      },
      
      loadTemplate: (templateId: string) => {
        const template = get().templates.find(t => t.id === templateId)
        if (template) {
          // 使用模板名稱作為圖表標題
          const newChart = createEmptyChart(`${template.name} - 副本`, templateId)
          newChart.thinkingMode = template.thinkingMode
          newChart.cells = template.cells.map(cell => ({
            ...cell,
            id: cell.position || 'center',
            content: cell.content || ''
          })) as MandalaCell[]
          
          set((state) => ({
            charts: [...state.charts, newChart],
            currentChart: newChart
          }))
          
          // 保存到歷史
          get().saveToHistory('載入模板')
          
          return newChart
        }
        return null
      },
      
      // 新增：加载模板为临时图表（不保存到图表列表）
      loadTemplateAsTemp: (templateId: string) => {
        const template = get().templates.find(t => t.id === templateId)
        if (template) {
          const tempChart = createEmptyChart(template.name, templateId)
          tempChart.thinkingMode = template.thinkingMode
          tempChart.cells = template.cells.map(cell => ({
            ...cell,
            id: cell.position || 'center',
            content: cell.content || ''
          })) as MandalaCell[]
          
          set((state) => ({
            tempChart: tempChart,
            currentChart: tempChart
          }))
          
          return tempChart
        }
        return null
      },
      
      // 新增：保存临时图表到正式列表
      saveTempChart: () => {
        const state = get()
        if (state.tempChart) {
          const savedChart = { ...state.tempChart }
          set((prevState) => ({
            charts: [...prevState.charts, savedChart],
            currentChart: savedChart,
            tempChart: null  // 清除临时状态
          }))
          
          // 保存到历史
          get().saveToHistory('保存图表')
          
          return savedChart
        }
        return null
      },
      
      saveAsTemplate: (chart: MandalaChart, name: string, description: string) => {
        const newTemplate: Template = {
          id: Date.now().toString(),
          name,
          description,
          category: 'creative',
          cells: chart.cells.map(cell => ({
            position: cell.position,
            content: cell.content
          })),
          thinkingMode: chart.thinkingMode
        }
        
        set((state) => ({
          templates: [...state.templates, newTemplate]
        }))
      },
      
      // 查找父圖表
      findParentChart: (childChartId: string) => {
        const state = get()
        for (const chart of state.charts) {
          for (const cell of chart.cells) {
            if (cell.children) {
              for (const childChart of cell.children) {
                if (childChart.id === childChartId) {
                  return { parent: chart, cellId: cell.id }
                }
              }
            }
          }
        }
        return null
      }
    }),
    {
      name: 'mandala-storage-with-history',
      partialize: (state) => ({ 
        charts: state.charts, 
        templates: state.templates,
        // 不持久化歷史記錄和臨時圖表，避免存儲過大
      })
    }
  )
)