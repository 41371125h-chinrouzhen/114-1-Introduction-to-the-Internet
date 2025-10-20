# 114-1-Introduction-to-the-Internet
授課教師：蔡芸琤老師

姓名：陳柔蓁

系級：科技系2年級

##  作業一：個人網站
[這裏！](https://41371125h-chinrouzhen.github.io/114-1-Introduction-to-the-Internet/)

##  作業二：React專案（臺北市儀表板）—— YOUTUBE
[影片鏈接](https://youtu.be/BZgmRUJqkuQ)
修改過的檔案與更新重點：
--> Backend
      1. 新增server.js: Node.js/Express 服務器，運行 Port 4000
      2. 新增依賴：express, node-fetch, @google/genai
      3. 主要邏輯委派給 DashboardComponent
      4. app.js設計通用模板
--> Frontend
      1. UI交互
      2. 請求轉向到我的Node.js代理路由
--> 要求
      1. API 呼叫與驗證：定義了 curl 所驗證的數據 URL (/api/v1/component/60/chart?city=taipei)，并保持數據一致性。
      2.AI 串接：使用 fetch (node-fetch) 獲取數據、使用 @google/genai 呼叫模型構造個人化 Prompt
      3. 介面修改：與原始儀表板單一圖表畫面明顯不同。


##  作業三：個人網站結合react專案
[新個人網站](https://hw3-my-personal-website.onrender.com)

