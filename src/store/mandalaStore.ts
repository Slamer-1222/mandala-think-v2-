import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MandalaChart, MandalaCell, Template } from '../types'

interface MandalaStore {
  charts: MandalaChart[]
  currentChart: MandalaChart | null
  templates: Template[]
  
  // Actions
  createChart: (title: string, template?: string) => void
  updateChart: (chartId: string, updates: Partial<MandalaChart>) => void
  deleteChart: (chartId: string) => void
  setCurrentChart: (chart: MandalaChart | null) => void
  
  updateCell: (chartId: string, cellId: string, content: string) => void
  addChildChart: (chartId: string, cellId: string) => void
  
  loadTemplate: (templateId: string) => void
  saveAsTemplate: (chart: MandalaChart, name: string, description: string) => void
}

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

export const useMandalaStore = create<MandalaStore>()(
  persist(
    (set, get) => ({
      charts: [],
      currentChart: null,
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
      
      createChart: (title: string, template?: string) => {
        const newChart = createEmptyChart(title, template)
        set((state) => ({
          charts: [...state.charts, newChart],
          currentChart: newChart
        }))
      },
      
      updateChart: (chartId: string, updates: Partial<MandalaChart>) => {
        set((state) => ({
          charts: state.charts.map(chart => 
            chart.id === chartId 
              ? { ...chart, ...updates, updatedAt: new Date() }
              : chart
          ),
          currentChart: state.currentChart?.id === chartId 
            ? { ...state.currentChart, ...updates, updatedAt: new Date() }
            : state.currentChart
        }))
      },
      
      deleteChart: (chartId: string) => {
        set((state) => ({
          charts: state.charts.filter(chart => chart.id !== chartId),
          currentChart: state.currentChart?.id === chartId ? null : state.currentChart
        }))
      },
      
      setCurrentChart: (chart: MandalaChart | null) => {
        set({ currentChart: chart })
      },
      
      updateCell: (chartId: string, cellId: string, content: string) => {
        set((state) => ({
          charts: state.charts.map(chart => 
            chart.id === chartId 
              ? {
                  ...chart,
                  cells: chart.cells.map(cell => 
                    cell.id === cellId 
                      ? { ...cell, content }
                      : cell
                  ),
                  updatedAt: new Date()
                }
              : chart
          ),
          currentChart: state.currentChart?.id === chartId 
            ? {
                ...state.currentChart,
                cells: state.currentChart.cells.map(cell => 
                  cell.id === cellId 
                    ? { ...cell, content }
                    : cell
                ),
                updatedAt: new Date()
              }
            : state.currentChart
        }))
      },
      
      addChildChart: (chartId: string, cellId: string) => {
        const childChart = createEmptyChart('子主題', 'creative')
        set((state) => ({
          charts: state.charts.map(chart => 
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
          )
        }))
      },
      
      loadTemplate: (templateId: string) => {
        const template = get().templates.find(t => t.id === templateId)
        if (template) {
          const newChart = createEmptyChart('新曼陀羅圖', templateId)
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
        }
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
      }
    }),
    {
      name: 'mandala-storage',
      partialize: (state) => ({ 
        charts: state.charts, 
        templates: state.templates 
      })
    }
  )
)
