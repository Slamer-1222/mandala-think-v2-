#!/bin/bash

# 曼陀羅思考法系統 - 服務器啟動腳本

echo "🚀 啟動曼陀羅思考法系統..."

# 停止現有進程
echo "停止現有服務..."
pkill -f "vite preview" 2>/dev/null || true
pkill -f "http.server 8080" 2>/dev/null || true

# 確保構建是最新的
echo "檢查構建..."
if [ ! -d "dist" ]; then
    echo "構建項目..."
    npm run build
fi

# 啟動服務器
echo "啟動服務器..."
cd dist
python3 -m http.server 8080 > /dev/null 2>&1 &
SERVER_PID=$!

# 等待服務器啟動
sleep 2

# 檢查服務器狀態
if curl -s http://localhost:8080/ > /dev/null; then
    echo "✅ 服務器啟動成功！"
    echo "📡 訪問地址: http://localhost:8080/"
    echo "🌐 網絡地址: http://$(ipconfig getifaddr en0):8080/ (如果適用)"
    echo "🔴 停止服務器請按 Ctrl+C"
    echo ""
    echo "服務器進程 ID: $SERVER_PID"
    
    # 保持腳本運行
    wait $SERVER_PID
else
    echo "❌ 服務器啟動失敗"
    exit 1
fi