# 🧠 曼陀羅思考法 (Mandala Think)

> 基於日本學者今泉浩晃的曼陀羅圖表法，幫助您進行創意思考、目標設定和問題分析的現代化Web應用

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.14-yellow.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.2-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ 功能特色

### 🎯 三種思考模式
- **放射狀思考 (Radial)**：從中心主題向外輻射，適合創意發想和多角度分析
- **螺旋狀思考 (Spiral)**：按步驟順序排列，適合計劃管理和時間安排  
- **十字型思考 (Cross)**：運用5W1H方法或SWOT分析，適合問題分析、策略規劃和決策

### 🎨 智能視覺化
- 每種思考模式都有獨特的色彩主題和視覺元素
- 螺旋狀模式：步驟編號和流程連接線
- 十字型模式：5W1H標籤和十字連接線
- 放射狀模式：發散式思維的藍色主題

### 📚 豐富模板系統 (6大分類)
- **創意發想模板**：頭腦風暴和創意發想
- **目標設定模板**：8步驟執行計劃和專案管理
- **學習整理模板**：9步驟學習流程
- **問題解決模板**：5W1H系統化問題分析
- **策略分析模板**：SWOT四象限策略分析 ⭐ 新增
- **分析工具模板**：多維度分析框架

### 🔧 核心功能
- 九宮格曼陀羅圖表編輯
- **多行內容編輯** ⭐ 支援條列式內容和換行 
- 無限層級子主題擴展
- **智能用戶反饋** ⭐ Toast 通知系統
- 本地數據持久化
- 響應式設計，支持移動端
- 實時編輯和預覽

## 🚀 快速開始

### 環境要求
- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

### 安裝步驟

1. **克隆專案**
```bash
git clone https://github.com/Slamer-1222/mandala-think-v2-.git
cd mandala-think-v2-
```

2. **安裝依賴**
```bash
npm install
```

3. **啟動開發服務器**
```bash
npm run dev
```

4. **打開瀏覽器**
訪問 `http://localhost:3000` 開始使用

### 構建生產版本
```bash
npm run build
npm run preview
```

## 📖 使用指南

### 1. 創建新圖表
- 點擊首頁的「開始創建」按鈕
- 或從模板庫選擇合適的模板

### 2. 選擇思考模式
- 在編輯器中點擊「思考模式」按鈕
- 選擇適合的思考方式：
  - **放射狀**：創意發想
  - **螺旋狀**：計劃執行和學習規劃
  - **十字型**：問題分析和策略分析

### 3. 編輯內容
- 點擊任意單元格開始編輯
- 中心格寫入主要主題
- 周圍八格填入相關內容
- **支援多行編輯**：按 Enter 換行，可建立條列式內容
- 支持添加子主題進一步展開

**多行編輯範例：**
```
• 技術能力強
• 團隊經驗豐富
• 品牌知名度高
• 資金充足
```

### 4. 保存和管理
- **智能儲存**：自動區分臨時模板和正式圖表
- **即時反饋**：Toast 通知確認操作成功/失敗
- 自動保存到本地存儲
- 可導出為模板重複使用
- 支持多個圖表管理

### 5. SWOT 策略分析模板使用 ⭐ 新功能
- **中心格**：填入分析主題（企業、專案、個人等）
- **四個主方向**：
  - 上方：Strengths (優勢) - 內部有利因素
  - 右方：Opportunities (機會) - 外部有利因素
  - 下方：Weaknesses (劣勢) - 內部不利因素
  - 左方：Threats (威脅) - 外部不利因素
- **四個策略角**：
  - 右上：SO策略（優勢+機會）
  - 右下：WO策略（劣勢+機會）
  - 左下：WT策略（劣勢+威脅）
  - 左上：ST策略（優勢+威脅）

## 📝 更新日誌

### v2.1.0 (最新) ⭐
- **多行內容編輯**：支援在單元格內建立條列式內容，按 Enter 換行
- **用戶反饋系統**：新增 Toast 通知，提供儲存/刪除操作的即時反饋
- **SWOT 策略分析模板**：新增專業策略分析工具
- **改善編輯體驗**：優化 textarea 樣式和互動設計
- **智能儲存機制**：自動區分臨時模板和正式圖表的儲存邏輯

### v2.0.0
- **6大模板分類**：重新整理模板系統架構
- **模板系統優化**：改善模板載入和管理機制
- **十字型思考增強**：支援 5W1H 和 SWOT 雙重應用

## 🛠️ 技術架構

### 前端技術棧
- **React 18** - 現代化UI框架
- **TypeScript** - 類型安全的JavaScript
- **Vite** - 快速構建工具
- **Tailwind CSS** - 實用優先的CSS框架
- **Zustand** - 輕量級狀態管理
- **React Router** - 單頁應用路由

### 項目結構
```
src/
├── components/          # 可重用組件
│   ├── Layout.tsx      # 頁面布局
│   └── MandalaGrid.tsx # 九宮格組件
├── pages/              # 頁面組件
│   ├── Home.tsx        # 首頁
│   ├── MandalaEditor.tsx # 編輯器
│   ├── Templates.tsx   # 模板頁
│   └── About.tsx       # 關於頁
├── store/              # 狀態管理
│   └── mandalaStore.ts # 曼陀羅數據存儲
├── types/              # TypeScript類型定義
│   └── index.ts        # 類型聲明
└── index.css           # 全局樣式
```

## 🎨 設計理念

### 曼陀羅思考法
曼陀羅思考法是一種起源於佛教曼陀羅圖像的視覺化思考工具，由日本學者今泉浩晃系統化推廣。它利用九宮格的結構，以中心主題為核心，周圍八格分別展開與主題相關的子主題或概念。

### 核心優勢
- **結構化思維**：將複雜資訊整理得更有條理
- **多角度分析**：避免片面思考，挖掘更多可能性
- **視覺化呈現**：圖像化思維便於理解和記憶
- **靈活應用**：適用於創意、規劃、分析等多種場景

## 📱 響應式設計

- 支持桌面端、平板和手機
- 觸控友好的操作界面
- 自適應九宮格布局
- 優化的移動端體驗

## 🤝 貢獻指南

我們歡迎所有形式的貢獻！

### 如何貢獻
1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 開發規範
- 使用 TypeScript 編寫代碼
- 遵循 ESLint 規則
- 添加適當的註釋和文檔
- 確保代碼的可讀性和可維護性

## 📄 授權條款

本專案採用 MIT 授權條款 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 🙏 致謝

- **今泉浩晃** - 曼陀羅圖表法的創始人
- **React 團隊** - 優秀的前端框架
- **Tailwind CSS** - 實用的CSS框架
- **所有貢獻者** - 為專案發展做出貢獻的開發者

## 📞 聯繫我們

- **專案主頁**：[GitHub Repository](https://github.com/Slamer-1222/mandala-think-v2-)
- **線上體驗**：[https://marga-ai.org/](https://marga-ai.org/)
- **問題反饋**：[Issues](https://github.com/Slamer-1222/mandala-think-v2-/issues)
- **功能建議**：[Discussions](https://github.com/Slamer-1222/mandala-think-v2-/discussions)

---

⭐ 如果這個專案對您有幫助，請給我們一個星標！
