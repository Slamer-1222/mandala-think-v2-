import html2canvas from 'html2canvas'
import { MandalaChart } from '../types'

export const useExport = () => {
  const exportAsPNG = async (elementId: string = 'mandala-grid', filename?: string) => {
    try {
      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error('找不到要導出的元素')
      }

      // 使用 html2canvas 捕獲元素
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // 高分辨率
        useCORS: true,
        allowTaint: false
      })

      // 創建下載鏈接
      const link = document.createElement('a')
      link.download = filename || `mandala-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      
      // 觸發下載
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      return true
    } catch (error) {
      console.error('PNG導出失敗:', error)
      return false
    }
  }

  const exportAsJSON = (chart: MandalaChart) => {
    try {
      // 創建完整的備份數據
      const exportData = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        chart: {
          ...chart,
          createdAt: chart.createdAt.toISOString(),
          updatedAt: chart.updatedAt.toISOString()
        }
      }

      const data = JSON.stringify(exportData, null, 2)
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.download = `${chart.title || 'mandala'}-${Date.now()}.json`
      link.href = url
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
      return true
    } catch (error) {
      console.error('JSON導出失敗:', error)
      return false
    }
  }

  const importFromJSON = async (file: File): Promise<MandalaChart | null> => {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      
      // 驗證數據格式
      if (!data.chart || !data.chart.id || !data.chart.cells) {
        throw new Error('無效的JSON格式')
      }
      
      // 轉換日期字符串回Date對象
      const chart: MandalaChart = {
        ...data.chart,
        createdAt: new Date(data.chart.createdAt),
        updatedAt: new Date(data.chart.updatedAt)
      }
      
      return chart
    } catch (error) {
      console.error('JSON導入失敗:', error)
      return null
    }
  }

  return {
    exportAsPNG,
    exportAsJSON,
    importFromJSON
  }
}