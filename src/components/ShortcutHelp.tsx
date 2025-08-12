import { Keyboard, X } from 'lucide-react'
import { ShortcutGroup, formatShortcut } from '../hooks/useShortcuts'

interface ShortcutHelpProps {
  isOpen: boolean
  onClose: () => void
  shortcutGroups: ShortcutGroup[]
}

const ShortcutHelp = ({ isOpen, onClose, shortcutGroups }: ShortcutHelpProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">鍵盤快捷鍵</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {shortcutGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                {group.name}
              </h3>
              
              <div className="grid gap-2">
                {group.shortcuts.map((shortcut, shortcutIndex) => (
                  <div 
                    key={shortcutIndex}
                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50"
                  >
                    <span className="text-gray-700">{shortcut.description}</span>
                    <kbd className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm font-mono border border-gray-300">
                      {formatShortcut(shortcut)}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Keyboard className="w-4 h-4" />
            <span>
              提示：快捷鍵在輸入框中不會觸發。按 ESC 或點擊外部區域關閉此對話框。
            </span>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShortcutHelp