// backend/server.js 

const express = require('express');
const path = require('path');
const cors = require('cors');

const { GoogleGenAI } = require('@google/genai'); 

const app = express();
const PORT = 4000;

app.use(cors());


const GEMINI_API_KEY = "AIzaSyCQEzlzTfHfUCIew6Ryd6VediF1J6cYHeE"; 

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY }); 

// *** JSON API 網址 ***
const YOUBIKE_DATA_API_URL = "https://citydashboard.taipei/api/v1/component/60/chart?city=taipei"; 


const BUILD_PATH = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(BUILD_PATH)); 



const getYouBikeDataForAi = async () => {
    
    const dataParser = (json) => {
        if (!json || !json.data || !json.data[0] || !json.data[0].data) return "無有效數據。";
        
        const stats = json.data[0].data; 
        
        const description = stats.map(item => 
            `${item.x}: ${item.y.toFixed(0)} 個`
        ).join('；');
        
        return `最新數據統計：${description}。`;
    };

    try {
        console.log(`[Server Proxy] 嘗試從 ${YOUBIKE_DATA_API_URL} 獲取數據...`);
        const response = await fetch(YOUBIKE_DATA_API_URL); 
        
        if (!response.ok) {
            throw new Error(`HTTP 錯誤 ${response.status}：無法獲取 YouBike 數據`);
        }
        
        const json = await response.json(); 
        const dataDescription = dataParser(json);
        
        return dataDescription;
        
    } catch (error) {
        console.error(`[Server Proxy] 獲取或解析數據失敗:`, error.message);
        return "自動數據擷取失敗，AI 將根據常識進行分析。";
    }
};


// --- AI 代理路由 ---
app.get('/api/ai-analysis', async (req, res) => {
    
    const { id, title } = req.query; 

    // 檢查 API Key 
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_HERE") {
        return res.status(500).json({ error: "Server Error: GEMINI_API_KEY is not configured." });
    }

    // 只接受 ID 60
    if (id !== '60') {
         return res.status(400).json({ error: "此伺服器配置僅支援 YouBike (ID 60) 的個人化分析。" });
    }
    
    
    const dataDetails = await getYouBikeDataForAi(); 
    const prompt = `
        你是一位城市交通顧問，請根據最新的 YouBike 使用情況數據，為一位準備現在出門騎 YouBike 的市民提供建議。
        
        數據摘要：${dataDetails}。
        
        請以市民現在準備出發的角度，分析他可能會遇到的 **問題** 與 **解決問題的建議**。
        
        請提供以下三點：
        1. 潛在問題分析：根據數據，現在最可能遇到什麼問題？（例如：站點空位少或熱門站點已滿）
        2. 騎行建議：針對這個問題，提供一項可立即執行的建議（例如：建議前往哪個方向的備用站點，或建議避開哪個時段）。
        3. 額外提示：提供一項關於騎行安全或還車的實用小提示。

        請使用繁體中文，並以以下條列式格式輸出：
        - 潛在問題：...
        - 騎行建議：...
        - 額外提示：...
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [prompt],
        });
        
        res.json({ analysis: response.text });

    } catch (error) {
        console.error("Gemini API 呼叫失敗 (Proxy):", error);
        res.status(500).json({ error: `Gemini API 呼叫失敗，請檢查 Key 或權限: ${error.message}` });
    }
});



app.get('/api/v1/component/:id/chart', (req, res) => {
    res.sendFile(path.join(BUILD_PATH, 'index.html'));
});

app.get(/^(.*)$/, (req, res) => {
    if (req.path.includes('.')) {
         return res.status(404).send('Not Found');
    }
    res.sendFile(path.join(BUILD_PATH, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`curl: http://localhost:${PORT}/api/v1/component/60/chart?city=taipei`);
});