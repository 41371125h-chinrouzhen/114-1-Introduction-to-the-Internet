// frontend/src/DashboardComponent.js 

import React, { useState } from 'react';

const DashboardComponent = ({ componentId, title, width = 450, height = 400 }) => {
    
    // UI 狀態
    const [aiAnalysis, setAiAnalysis] = useState("點擊按鈕獲取 AI 分析結果...");
    const [isLoading, setIsLoading] = useState(false);
    
    // 組裝官方內嵌網址
    const embedUrl = `https://citydashboard.taipei/embed/${componentId}/taipei`;
    
    // AI 分析函數 (保持不變，只呼叫後端代理)
    const getAiAnalysis = async () => {
        setIsLoading(true);
        setAiAnalysis("AI 正在分析數據，請稍候...");
        
        const proxyUrl = `/api/ai-analysis?id=${componentId}&title=${encodeURIComponent(title)}`;

        try {
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP 錯誤：狀態碼 ${response.status}`);
            }
            
            setAiAnalysis(data.analysis);

        } catch (error) {
            console.error("代理伺服器呼叫失敗:", error);
            setAiAnalysis(`AI 分析失敗：${error.message}`);
            
        } finally {
            setIsLoading(false);
        }
    };

    // 渲染 iFrame 內嵌碼
    const EMBED_CODE = `
        <iframe
            id="Taipei-City-Dashboard-Component-${componentId}"
            title="${title}"
            src="${embedUrl}"
            width="${width}"
            height="${height}"
            style="border-radius: 8px; border: 1px solid #ddd; background-color: white;"
            frameborder="0"
            allow="fullscreen"
            loading="lazy"
        ></iframe>
    `;

    return (
        // 外部容器：調整背景色，提高對比度
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', textAlign: 'center', color: '#333' }}>
            <h2 style={{ marginBottom: '30px', fontWeight: 'bold' }}>{title} (Component ID: {componentId})</h2>
            
            {/* 核心佈局：使用 Flexbox 實現兩欄佈局 */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '20px', 
                maxWidth: '1200px', 
                margin: '0 auto' 
            }}>
                
                {/* 左側：圖表區 (寬度約 40%) */}
                <div style={{ flex: '0 0 auto', width: `${width}px` }}> 
                    <div 
                        dangerouslySetInnerHTML={{ __html: EMBED_CODE }} 
                        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
                
                {/* 右側：AI 分析區 (寬度約 60%) */}
                <div style={{ 
                    flex: 1, // 讓 AI 區塊佔滿剩餘空間
                    textAlign: 'left', 
                    backgroundColor: 'white', // AI 區塊設為白底
                    padding: '20px', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                }}>
                    
                    <h3 style={{ color: '#0056b3', borderBottom: '2px solid #0056b3', paddingBottom: '10px', marginBottom: '20px' }}>
                        💡 Gemini 數據洞察與建議
                    </h3>
                    
                    <button 
                        onClick={getAiAnalysis} 
                        disabled={isLoading} 
                        style={{ 
                            padding: '10px 20px', 
                            fontSize: '16px', 
                            fontWeight: 'bold',
                            backgroundColor: isLoading ? '#adb5bd' : '#007bff', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.3s',
                            marginBottom: '20px'
                        }}
                    >
                        {isLoading ? '分析中...' : `啟動 AI 分析 ${title}`}
                    </button>

                    {/* AI 輸出結果框：白底黑字 */}
                    <div style={{ 
                        textAlign: 'left', 
                        whiteSpace: 'pre-wrap', 
                        backgroundColor: '#ffffff', // 確保是白底
                        color: '#333333',         // 確保是黑字
                        padding: '15px', 
                        borderRadius: '5px', 
                        border: '1px solid #ddd',
                        minHeight: '200px'
                    }}>
                        {aiAnalysis}
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

export default DashboardComponent;