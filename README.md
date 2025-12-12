# 114-1-Introduction-to-the-Internet
#### 授課教師：蔡芸琤老師，      姓名：陳柔蓁，      系級：科技系2年級

##  作業一：個人網站
[這裏！](https://41371125h-chinrouzhen.github.io/114-1-Introduction-to-the-Internet/)

##  作業二：React專案（臺北市儀表板）—— YOUTUBE
[影片鏈接](https://youtu.be/BZgmRUJqkuQ)

#### 修改過的檔案與更新重點：
Backend
      1. 新增server.js: Node.js/Express 服務器，運行 Port 4000。
      2. 新增依賴：express, node-fetch, @google/genai。
      3. 主要邏輯委派給 DashboardComponent。
      4. app.js設計通用模板。

Frontend
      1. UI交互
      2. 請求轉向到我的Node.js代理路由

要求
      1. API 呼叫與驗證：定義了 curl 所驗證的數據 URL (/api/v1/component/60/chart?city=taipei)，并保持數據一致性。
      2. AI 串接：使用 fetch (node-fetch) 獲取數據、使用 @google/genai 呼叫模型構造個人化 Prompt。
      3. 介面修改：與原始儀表板單一圖表畫面明顯不同。

##  作業三：個人網站結合react專案（AI分身）—— YOUTUBE
[RENDER鏈接](https://github.com/41371125h-chinrouzhen/114-1-render-repo)
[影片鏈接](https://youtu.be/e12vDhJ2BpU)

-個人化 AI 整合： 建立了一個「虛擬分身」AI 聊天機器人，透過自訂知識庫，讓 Google Gemini AI 學習並模仿我的風格來互動。

-前後端架構： 前端： React，後端： Node.js 建立的 API 伺服器。

-Render： 將前端（Static Site）與後端（Web Service）專案完整部署至 Render.com。

##  作業四：個人網站結合react專案（串接API）
#### 1. 部署的平台名稱 & 雲端部署連結

[Render](https://one14-1-render-repo.onrender.com/index.html)

[Vercel](https://114-1-portfolio-r0akrn9du-rzhens-projects.vercel.app/index.html)


#### 2. 串接API

- Google Gemini API：用於 AI 聊天機器人，透過後端進行對話生成。

- iTunes Search API：用於音樂搜尋功能，抓取歌曲封面、資訊與試聽音檔。

- Lyrics.ovh API：用於抓取對應歌曲的歌詞。

- Open-Meteo API：用於世界數據儀表板，抓取即時天氣資訊。


#### 3.簡短部署方式說明:

前端（Poseify）託管於 Vercel，後端（portfolio-backend）託管於 Render。兩者皆直接連結 GitHub Repository 進行自動化部署。

API Key 等資訊透過 Render 的環境變數進行安全管理，前端透過 API 請求與後端溝通。

##  期末專題
#### Live Demo
[點擊這裡體驗網站](https://one14-1-spotify-project-frontend.onrender.com)

#### YouTube影片鏈接
[影片鏈接](https://youtu.be/NxBKJbQg1ok)
