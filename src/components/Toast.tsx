import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  autoClose?: boolean
}

interface ToastProps {
  toast: ToastMessage
  onClose: (id: string) => void
}

const Toast = ({ toast, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // 進場動畫
    const showTimer = setTimeout(() => setIsVisible(true), 10)
    
    // 自動關閉
    let autoCloseTimer: NodeJS.Timeout
    if (toast.autoClose !== false) {
      const duration = toast.duration || 3000
      autoCloseTimer = setTimeout(() => {
        handleClose()
      }, duration)
    }

    return () => {
      clearTimeout(showTimer)
      if (autoCloseTimer) clearTimeout(autoCloseTimer)
    }
  }, [toast])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose(toast.id)
    }, 300) // 等待動畫完成
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getColorClasses = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-white border-green-200 text-green-800'
      case 'error':
        return 'bg-white border-red-200 text-red-800'
      case 'warning':
        return 'bg-white border-yellow-200 text-yellow-800'
      case 'info':
      default:
        return 'bg-white border-blue-200 text-blue-800'
    }
  }

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-80 max-w-md
        transition-all duration-300 ease-in-out transform
        ${getColorClasses()}
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      {getIcon()}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="font-medium text-sm mb-1">{toast.title}</h4>
        )}
        <p className="text-sm leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Toast 容器組件
interface ToastContainerProps {
  toasts: ToastMessage[]
  onClose: (id: string) => void
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  )
}

// Toast Hook
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (
    message: string, 
    type: ToastMessage['type'] = 'info', 
    options?: Partial<ToastMessage>
  ) => {
    const toast: ToastMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      message,
      duration: 3000,
      autoClose: true,
      ...options
    }

    setToasts(prev => [...prev, toast])
  }

  const closeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const clearAllToasts = () => {
    setToasts([])
  }

  // 便捷方法
  const success = (message: string, options?: Partial<ToastMessage>) => 
    showToast(message, 'success', options)
  
  const error = (message: string, options?: Partial<ToastMessage>) => 
    showToast(message, 'error', options)
  
  const warning = (message: string, options?: Partial<ToastMessage>) => 
    showToast(message, 'warning', options)
  
  const info = (message: string, options?: Partial<ToastMessage>) => 
    showToast(message, 'info', options)

  return {
    toasts,
    showToast,
    closeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  }
}