import { Brain, BookOpen, Users, Globe, Award, Lightbulb } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Brain,
      title: '結構化思考',
      description: '九宮格結構幫助您將複雜的資訊整理得更具體且有條理'
    },
    {
      icon: Lightbulb,
      title: '創意激發',
      description: '多角度思考模式激發創意，避免片面思考'
    },
    {
      icon: BookOpen,
      title: '知識管理',
      description: '將抽象思維具象化，便於理解和記憶'
    },
    {
      icon: Users,
      title: '協作溝通',
      description: '提供共同清晰的思維架構，方便團隊協作'
    }
  ]

  const benefits = [
    '跳脫傳統線性思考限制',
    '激發更多創新想法',
    '結構化、視覺化地整理思路',
    '使思考更有層次、更創新',
    '達到高效思考與行動的效果'
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary-100 rounded-full">
            <Brain className="h-16 w-16 text-primary-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          關於曼陀羅思考法
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          曼陀羅思考法是一種起源於佛教曼陀羅圖像的視覺化思考工具，
          由日本學者今泉浩晃系統化推廣，幫助人們進行創意思考、目標設定和問題分析。
        </p>
      </div>

      {/* What is Mandala */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          什麼是曼陀羅思考法？
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              曼陀羅思考法利用九宮格的結構，以中心主題為核心，周圍八格分別展開與主題相關的子主題或概念。
              這種結構化的思考方式幫助將複雜的資訊整理得更具體且有條理，促進創意發想和問題解決。
            </p>
            <p className="text-gray-700 leading-relaxed">
              透過曼陀羅思考法，可以幫助使用者跳脫傳統線性思考限制，激發更多想法，
              並且結構化、視覺化地整理思路，使思考更有層次、更創新。
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }, (_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded border-2 ${
                    i === 4 ? 'border-primary-500 bg-primary-100' : 'border-gray-300 bg-white'
                  } flex items-center justify-center text-sm font-medium`}
                >
                  {i === 4 ? '中心主題' : `子主題${i + 1}`}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              九宮格基本結構示意圖
            </p>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          核心特色
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-full">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Thinking Modes */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          三種思考模式
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">放射狀思考</h3>
            <p className="text-gray-600 text-sm mb-3">
              從中心主題向外輻射出八個子項目，用於腦力激盪、創意發想及多角度分析。
            </p>
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                適用於創意發想
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">螺旋狀思考</h3>
            <p className="text-gray-600 text-sm mb-3">
              以順時針方向排列思考步驟或計劃，適合用來安排流程、時間管理或專案計畫。
            </p>
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                適用於計劃管理
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">十字型思考</h3>
            <p className="text-gray-600 text-sm mb-3">
              中心加十字方向延伸次主題，並在次主題周圍展開細節，兼具發散與結構化的分析框架。
            </p>
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                適用於問題分析
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          使用曼陀羅思考法的好處
        </h2>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Applications */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          應用場景
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-8 w-8 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">創意發想</h3>
            </div>
            <p className="text-gray-600 text-sm">
              激發靈感，探索主題多種面向與關聯，促進創新思維
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-8 w-8 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">目標設定</h3>
            </div>
            <p className="text-gray-600 text-sm">
              明確規劃目標及達成步驟，視覺化執行路徑，提高行動力
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">知識整理</h3>
            </div>
            <p className="text-gray-600 text-sm">
              將複雜知識分解，結構化學習內容，提升記憶與理解
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-8 w-8 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">問題分析</h3>
            </div>
            <p className="text-gray-600 text-sm">
              系統化拆分問題，從多角度找出解決方案
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">團隊協作</h3>
            </div>
            <p className="text-gray-600 text-sm">
              提供共同清晰的思維架構，方便成員間理解與協同
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">個人成長</h3>
            </div>
            <p className="text-gray-600 text-sm">
              培養結構化思維習慣，提升個人思考品質和效率
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-600">
        <p>
          曼陀羅思考法系統基於日本學者今泉浩晃的研究成果開發，
          旨在為使用者提供一個直觀、高效的思考工具。
        </p>
      </div>
    </div>
  )
}

export default About
