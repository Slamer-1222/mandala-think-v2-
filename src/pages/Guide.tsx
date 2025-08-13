import { BookOpen, Zap, Keyboard, Download, Layers, ChevronRight, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Guide = () => {
  const Key = ({ children }: { children: string }) => (
    <kbd className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded border border-gray-300 text-xs font-mono">
      {children}
    </kbd>
  )

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary-100 rounded-full">
            <BookOpen className="h-10 w-10 text-primary-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">快速教學</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          10 分鐘上手曼陀羅思考系統：建立、編輯、分層、匯出，一頁看懂核心功能與操作步驟。
        </p>
      </div>

      {/* 快速開始 */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">快速開始（3 步）</h2>
        <ol className="space-y-3 list-decimal list-inside text-gray-700">
          <li>
            進入首頁後點擊「開始創建」建立新圖表（或前往 <Link to="/templates" className="text-primary-600 hover:text-primary-700 underline">模板</Link> 選擇樣板）。
          </li>
          <li>
            點九宮格填寫內容；必要時在外圈格點擊「+」建立子主題以進一步分層。
          </li>
          <li>
            右上工具列可「儲存」「切換思考模式」「導出 PNG/JSON」。
          </li>
        </ol>
      </section>

      {/* 介面重點 */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">介面重點</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">導覽</h3>
            <ul className="space-y-1 text-gray-700">
              <li>首頁｜編輯器｜模板｜關於｜教學</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">編輯器工具列</h3>
            <ul className="space-y-1 text-gray-700">
              <li>撤銷/重做、思考模式、導出、刪除</li>
              <li>麵包屑：從子主題一鍵返回父主題</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 三種思考模式 */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">三種思考模式（何時用）</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-1">放射狀（發想）</h3>
            <p className="text-gray-700 text-sm">中心主題 → 外圈 8 個概念，適合頭腦風暴與多角度探索。</p>
          </div>
          <div className="p-4 rounded border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-1">螺旋狀（計畫）</h3>
            <p className="text-gray-700 text-sm">按 1→8 順時針步驟安排任務，適合專案與時間管理。</p>
          </div>
          <div className="p-4 rounded border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-1">十字型（5W1H）</h3>
            <p className="text-gray-700 text-sm">What / Why / Who / When / Where / How，加上資源與結果。</p>
          </div>
        </div>
      </section>

      {/* 子主題與模板 */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">子主題</h2>
          </div>
          <ul className="space-y-1 text-gray-700">
            <li>外圈格點擊「+」建立子主題，可無限分層。</li>
            <li>使用麵包屑在父子主題間快速切換。</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">模板</h2>
          </div>
          <ul className="space-y-1 text-gray-700">
            <li>
              前往 <Link to="/templates" className="text-primary-600 hover:text-primary-700 underline">模板頁</Link>，選用情境化模板。
            </li>
            <li>支援臨時編輯，滿意後保存為正式圖表。</li>
          </ul>
        </div>
      </section>

      {/* 匯出/匯入 與 快捷鍵 */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Download className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">匯出 / 匯入</h2>
          </div>
          <ul className="space-y-1 text-gray-700">
            <li>PNG：適合分享與列印。</li>
            <li>JSON：完整備份，可再次導入繼續編修。</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Keyboard className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">快捷鍵</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>
              儲存：<Key>Ctrl/Cmd</Key> + <Key>S</Key>
            </li>
            <li>
              撤銷/重做：<Key>Ctrl/Cmd</Key> + <Key>Z</Key> / <Key>Y</Key>
            </li>
            <li>
              新圖：<Key>Ctrl/Cmd</Key> + <Key>N</Key>
            </li>
            <li>
              幫助：<Key>F1</Key> 或 <Key>Shift</Key> + <Key>?</Key>
            </li>
          </ul>
        </div>
      </section>

      {/* Case Study 簡版 */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <ChevronRight className="h-5 w-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">小案例：兩週內辦一場線上工作坊</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">放射狀（發想）</h3>
            <p className="text-sm">外圈示例：受眾｜主題｜課綱｜講者｜通路｜素材｜報名｜平台</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">十字型（5W1H）</h3>
            <p className="text-sm">What/Why/Who/When/Where/How＋資源/結果（KPI）</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">螺旋狀（計畫）</h3>
            <p className="text-sm">1 定目標→2 需求→3 內容→4 分工→5 宣傳→6 彩排→7 執行→8 復盤</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          交付：導出 PNG（提案海報）與 JSON（團隊備份）。
        </div>
      </section>

      {/* FAQ 與建議 */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">常見問題</h2>
          </div>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>資料儲存：保存在瀏覽器本地，同電腦同瀏覽器可持續使用。</li>
            <li>路由刷新：若 404，請回首頁再進入編輯器。</li>
            <li>備份：建議定期以 JSON 匯出保存。</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">使用建議</h2>
          </div>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>片語式命名、層級清晰；複雜主題拆分為子主題。</li>
            <li>重要頁面可先導出 PNG 以防遺失。</li>
            <li>一張圖只解一個主題，避免資訊混雜。</li>
          </ul>
        </div>
      </section>

      {/* 行動區塊 */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-center text-white">
        <h3 className="text-xl font-semibold mb-2">立即開始你的第一張曼陀羅圖</h3>
        <p className="text-primary-100 mb-4">從中心主題出發，三種模式快速展開思考與落地計畫。</p>
        <Link to="/editor" className="bg-white text-primary-600 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 inline-block">
          開始創建
        </Link>
      </div>
    </div>
  )
}

export default Guide


