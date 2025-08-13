import { ReactNode, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import ErrorBoundary from './ErrorBoundary'
import ShortcutHelp from './ShortcutHelp'
import { ToastContainer, useToast } from './Toast'
import { useShortcuts, DEFAULT_SHORTCUTS, ShortcutConfig } from '../hooks/useShortcuts'
import { useMandalaStoreWithHistory } from '../store/mandalaStoreWithHistory'
import Home from '../pages/Home'
import MandalaEditor from '../pages/MandalaEditorEnhanced'
import Templates from '../pages/Templates'
import About from '../pages/About'
import Guide from '../pages/Guide'

const AppWithFeatures = () => {
  const [showShortcutHelp, setShowShortcutHelp] = useState(false)
  const { toasts, closeToast, success, error, info } = useToast()
  
  // 從 store 獲取歷史管理功能
  const { 
    undo, 
    redo, 
    canUndo, 
    canRedo, 
    currentChart,
    updateChart 
  } = useMandalaStoreWithHistory()

  // 定義快捷鍵動作
  const shortcutActions: ShortcutConfig[] = [
    {
      key: 's',
      ctrl: true,
      meta: true,
      action: () => {
        if (currentChart) {
          updateChart(currentChart.id, { updatedAt: new Date() })
          success('已保存')
        } else {
          info('沒有要保存的圖表')
        }
      },
      description: '保存當前圖表',
      preventDefault: true
    },
    {
      key: 'z',
      ctrl: true,
      meta: true,
      action: () => {
        if (canUndo()) {
          const success_undo = undo()
          if (success_undo) {
            success('已撤銷')
          } else {
            error('撤銷失敗')
          }
        } else {
          info('沒有可撤銷的操作')
        }
      },
      description: '撤銷上一步操作',
      preventDefault: true
    },
    {
      key: 'y',
      ctrl: true,
      meta: true,
      action: () => {
        if (canRedo()) {
          const success_redo = redo()
          if (success_redo) {
            success('已重做')
          } else {
            error('重做失敗')
          }
        } else {
          info('沒有可重做的操作')
        }
      },
      description: '重做已撤銷操作',
      preventDefault: true
    },
    {
      key: 'n',
      ctrl: true,
      meta: true,
      action: () => {
        // 導航到創建新圖表（不使用 window.location 以保持 SPA 特性）
        const newUrl = '/editor'
        if (window.location.pathname !== newUrl) {
          window.history.pushState({}, '', newUrl)
          window.dispatchEvent(new PopStateEvent('popstate'))
        }
        success('創建新圖表')
      },
      description: '創建新圖表',
      preventDefault: true
    },
    {
      key: 'F1',
      action: () => {
        setShowShortcutHelp(true)
      },
      description: '顯示快捷鍵幫助',
      preventDefault: true
    },
    {
      key: '?',
      shift: true,
      action: () => {
        setShowShortcutHelp(true)
      },
      description: '顯示快捷鍵幫助'
    }
  ]

  // 啟用快捷鍵
  useShortcuts(shortcutActions, true)

  // 轉換為快捷鍵幫助格式
  const shortcutGroups = [
    {
      name: '編輯操作',
      shortcuts: shortcutActions.filter(s => ['s', 'z', 'y'].includes(s.key))
    },
    {
      name: '導航操作',
      shortcuts: shortcutActions.filter(s => ['n'].includes(s.key))
    },
    {
      name: '幫助',
      shortcuts: shortcutActions.filter(s => ['F1', '?'].includes(s.key))
    }
  ]

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="editor" element={<MandalaEditor />} />
          <Route path="editor/:chartId" element={<MandalaEditor />} />
          <Route path="editor/temp/:templateId" element={<MandalaEditor />} />
          <Route path="templates" element={<Templates />} />
          <Route path="about" element={<About />} />
          <Route path="guide" element={<Guide />} />
        </Route>
      </Routes>
      
      {/* Toast 通知 */}
      <ToastContainer toasts={toasts} onClose={closeToast} />
      
      {/* 快捷鍵幫助 */}
      <ShortcutHelp 
        isOpen={showShortcutHelp}
        onClose={() => setShowShortcutHelp(false)}
        shortcutGroups={shortcutGroups}
      />
    </ErrorBoundary>
  )
}

export default AppWithFeatures