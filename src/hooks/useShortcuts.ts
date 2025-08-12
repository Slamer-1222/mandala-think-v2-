import { useEffect, useCallback } from 'react'

export interface ShortcutConfig {
  key: string
  ctrl?: boolean
  meta?: boolean
  alt?: boolean
  shift?: boolean
  action: () => void
  description: string
  preventDefault?: boolean
}

export interface ShortcutGroup {
  name: string
  shortcuts: ShortcutConfig[]
}

// 預設快捷鍵配置
export const DEFAULT_SHORTCUTS: ShortcutGroup[] = [
  {
    name: '編輯操作',
    shortcuts: [
      {
        key: 's',
        ctrl: true,
        meta: true,
        action: () => {},
        description: '保存當前圖表',
        preventDefault: true
      },
      {
        key: 'z',
        ctrl: true,
        meta: true,
        action: () => {},
        description: '撤銷上一步操作',
        preventDefault: true
      },
      {
        key: 'y',
        ctrl: true,
        meta: true,
        action: () => {},
        description: '重做已撤銷操作',
        preventDefault: true
      }
    ]
  },
  {
    name: '導航操作',
    shortcuts: [
      {
        key: 'n',
        ctrl: true,
        meta: true,
        action: () => {},
        description: '創建新圖表',
        preventDefault: true
      },
      {
        key: 'e',
        ctrl: true,
        meta: true,
        action: () => {},
        description: '導出當前圖表',
        preventDefault: true
      }
    ]
  },
  {
    name: '幫助',
    shortcuts: [
      {
        key: 'F1',
        action: () => {},
        description: '顯示快捷鍵幫助',
        preventDefault: true
      },
      {
        key: '?',
        shift: true,
        action: () => {},
        description: '顯示快捷鍵幫助'
      }
    ]
  }
]

// 檢查按鍵組合是否匹配
const isShortcutMatch = (event: KeyboardEvent, shortcut: ShortcutConfig): boolean => {
  // 檢查主鍵
  if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) {
    return false
  }

  // 檢查修飾鍵
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
  
  // 在 Mac 上使用 Meta (Cmd)，其他平台使用 Ctrl
  if (shortcut.ctrl || shortcut.meta) {
    if (isMac && !event.metaKey) return false
    if (!isMac && !event.ctrlKey) return false
  }

  if (shortcut.alt && !event.altKey) return false
  if (shortcut.shift && !event.shiftKey) return false

  return true
}

// 格式化快捷鍵顯示
export const formatShortcut = (shortcut: ShortcutConfig): string => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const parts: string[] = []

  if (shortcut.ctrl || shortcut.meta) {
    parts.push(isMac ? '⌘' : 'Ctrl')
  }
  if (shortcut.alt) {
    parts.push(isMac ? '⌥' : 'Alt')
  }
  if (shortcut.shift) {
    parts.push(isMac ? '⇧' : 'Shift')
  }
  
  // 特殊鍵名處理
  let keyName = shortcut.key
  if (shortcut.key === ' ') keyName = 'Space'
  else if (shortcut.key.startsWith('F') && shortcut.key.length > 1) keyName = shortcut.key
  else keyName = shortcut.key.toUpperCase()
  
  parts.push(keyName)
  
  return parts.join(isMac ? '' : '+')
}

export const useShortcuts = (
  shortcuts: ShortcutConfig[], 
  enabled: boolean = true
) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return

    // 忽略在輸入框中的按鍵
    const target = event.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true'
    ) {
      return
    }

    // 查找匹配的快捷鍵
    for (const shortcut of shortcuts) {
      if (isShortcutMatch(event, shortcut)) {
        if (shortcut.preventDefault !== false) {
          event.preventDefault()
        }
        
        try {
          shortcut.action()
        } catch (error) {
          console.error('快捷鍵執行錯誤:', error)
        }
        
        break // 只執行第一個匹配的快捷鍵
      }
    }
  }, [shortcuts, enabled])

  useEffect(() => {
    if (!enabled) return

    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [handleKeyDown, enabled])

  return {
    formatShortcut,
    isEnabled: enabled
  }
}

// 快捷鍵幫助對話框 Hook
export const useShortcutHelp = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openHelp = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeHelp = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleHelp = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return {
    isOpen,
    openHelp,
    closeHelp,
    toggleHelp
  }
}

// 修正 import
import { useState } from 'react'