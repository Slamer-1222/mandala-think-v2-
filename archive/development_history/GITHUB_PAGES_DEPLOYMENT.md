# 🚀 GitHub Pages 部署指南

## 系統兼容性確認 ✅

這個曼陀羅思考法系統完全支持 GitHub Pages 部署：

- ✅ **純前端應用** - React SPA，無需後端
- ✅ **靜態資源** - 所有文件都是靜態的
- ✅ **本地存儲** - 使用 localStorage，無需數據庫
- ✅ **SPA 路由** - 已配置 `_redirects` 文件

## 部署方法

### 方法一：GitHub Actions 自動部署（推薦）

#### 1. 上傳到 GitHub Repository

```bash
# 初始化 git repository
git init
git add .
git commit -m "Initial commit - 曼陀羅思考法系統"

# 添加遠程倉庫（替換為你的 GitHub 倉庫地址）
git remote add origin https://github.com/你的用戶名/mandala-think.git
git branch -M main
git push -u origin main
```

#### 2. 啟用 GitHub Pages

1. 前往你的 GitHub 倉庫
2. 點擊 **Settings** 標籤
3. 滾動到 **Pages** 部分
4. 在 **Source** 下選擇 **GitHub Actions**
5. 保存設定

#### 3. 自動部署觸發

- 每次 `git push` 到 `main` 分支都會自動部署
- 部署完成後可在 `https://你的用戶名.github.io/mandala-think/` 訪問

### 方法二：手動部署

#### 1. 安裝 gh-pages 套件

```bash
npm install --save-dev gh-pages
```

#### 2. 部署到 GitHub Pages

```bash
# 構建並部署
npm run deploy
```

## 部署配置說明

### 已配置的文件：

#### 1. `.github/workflows/deploy.yml` - GitHub Actions 工作流程
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: npm ci
    - run: npm run build  
    - uses: peaceiris/actions-gh-pages@v3
```

#### 2. `vite.config.ts` - Vite 配置更新
```typescript
export default defineConfig({
  base: '/', // GitHub Pages 路徑配置
  // ... 其他配置
})
```

#### 3. `package.json` - 新增部署腳本
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### 4. `public/_redirects` - SPA 路由支持
```
/*    /index.html   200
```

## 部署後驗證

### 功能檢查清單：

- [ ] **首頁載入** - 主頁面正常顯示
- [ ] **路由導航** - 所有頁面間跳轉正常
- [ ] **模板功能** - 模板選擇和使用正常
- [ ] **編輯功能** - 圖表編輯和保存正常
- [ ] **導出功能** - PNG/JSON 導出正常
- [ ] **快捷鍵** - 鍵盤快捷鍵響應正常
- [ ] **數據持久** - 本地存儲和恢復正常
- [ ] **響應式** - 不同設備尺寸顯示正常

### 訪問地址：

- **主要地址**: `https://你的用戶名.github.io/倉庫名稱/`
- **自定義域名**: 可在 Pages 設定中配置

## 優勢特性

### ✅ **完美適合 GitHub Pages**

1. **零成本託管** - GitHub Pages 免費提供
2. **HTTPS 支持** - 自動提供 SSL 憑證
3. **全球 CDN** - GitHub 的全球內容分發網絡
4. **自動更新** - 推送代碼即自動部署
5. **版本控制** - 完整的版本歷史記錄

### ✅ **系統特性保持**

1. **離線功能** - 載入後可離線使用（localStorage）
2. **快速載入** - 靜態檔案，載入速度快
3. **跨平台** - 支援所有現代瀏覽器
4. **響應式** - 適配手機、平板、電腦
5. **無需登入** - 直接使用，數據本地存儲

## 使用建議

### **倉庫命名建議：**
- `mandala-think` - 簡潔專業
- `mandala-thinking-tool` - 功能明確
- `nine-grid-thinking` - 英文描述

### **README.md 建議內容：**
```markdown
# 曼陀羅思考法線上工具

🧠 一個基於九宮格的創意思考工具

## 特色功能
- 三種思考模式：放射狀、螺旋狀、十字型
- 完整的圖表管理和編輯功能
- PNG/JSON 導出功能
- 歷史撤銷/重做系統
- 鍵盤快捷鍵支援

## 線上使用
👉 [立即開始使用](https://你的用戶名.github.io/mandala-think/)

## 本地運行
\`\`\`bash
npm install
npm run dev
\`\`\`
```

## 部署檢查清單

- [ ] GitHub 倉庫已創建
- [ ] 代碼已推送到 main 分支
- [ ] GitHub Pages 已在 Settings 中啟用
- [ ] GitHub Actions 工作流程運行成功
- [ ] 網站可正常訪問
- [ ] 所有功能測試通過

## 結論

這個曼陀羅思考法系統完全適合部署到 GitHub Pages！它是一個純前端應用，所有功能都在客戶端運行，使用本地存儲進行數據持久化，完美符合 GitHub Pages 的托管要求。

部署後，任何人都可以通過網址直接使用這個思考工具，無需安裝任何軟體，體驗與本地運行完全相同。