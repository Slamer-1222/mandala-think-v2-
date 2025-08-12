import { useState, useCallback } from 'react'
import { MandalaChart } from '../types'

export interface HistoryState {
  past: MandalaChart[]
  present: MandalaChart | null
  future: MandalaChart[]
}

export interface HistoryActions {
  undo: () => MandalaChart | null
  redo: () => MandalaChart | null
  saveToHistory: (chart: MandalaChart) => void
  clearHistory: () => void
  canUndo: boolean
  canRedo: boolean
  historySize: number
}

const MAX_HISTORY_SIZE = 10 // 限制為10步，避免內存問題

export const useHistory = (initialChart: MandalaChart | null = null): HistoryActions => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialChart,
    future: []
  })

  const saveToHistory = useCallback((chart: MandalaChart) => {
    setHistory(prev => {
      // 如果當前圖表和新圖表相同，不保存
      if (prev.present && 
          prev.present.id === chart.id && 
          JSON.stringify(prev.present.cells) === JSON.stringify(chart.cells) &&
          prev.present.title === chart.title &&
          prev.present.thinkingMode === chart.thinkingMode) {
        return prev
      }

      const newPast = prev.present 
        ? [...prev.past.slice(-(MAX_HISTORY_SIZE - 1)), prev.present]
        : prev.past

      return {
        past: newPast,
        present: { ...chart, updatedAt: new Date() }, // 創建副本避免引用問題
        future: [] // 清除重做歷史
      }
    })
  }, [])

  const undo = useCallback((): MandalaChart | null => {
    let result: MandalaChart | null = null
    
    setHistory(prev => {
      if (prev.past.length === 0) {
        return prev
      }

      const previous = prev.past[prev.past.length - 1]
      const newPast = prev.past.slice(0, -1)
      
      result = previous
      
      return {
        past: newPast,
        present: previous,
        future: prev.present ? [prev.present, ...prev.future] : prev.future
      }
    })
    
    return result
  }, [])

  const redo = useCallback((): MandalaChart | null => {
    let result: MandalaChart | null = null
    
    setHistory(prev => {
      if (prev.future.length === 0) {
        return prev
      }

      const next = prev.future[0]
      const newFuture = prev.future.slice(1)
      
      result = next
      
      return {
        past: prev.present ? [...prev.past, prev.present] : prev.past,
        present: next,
        future: newFuture
      }
    })
    
    return result
  }, [])

  const clearHistory = useCallback(() => {
    setHistory(prev => ({
      past: [],
      present: prev.present,
      future: []
    }))
  }, [])

  return {
    undo,
    redo,
    saveToHistory,
    clearHistory,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    historySize: history.past.length + (history.present ? 1 : 0) + history.future.length
  }
}