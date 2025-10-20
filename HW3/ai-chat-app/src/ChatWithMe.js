import React, { useState, useEffect, useRef } from 'react';
import './ChatWithMe.css'; // 我們稍後會建立這個 CSS 檔案來美化介面

function ChatWithMe() {
    // 'messages' 狀態用來儲存整個對話歷史
    const [messages, setMessages] = useState([
        { role: 'model', text: '嗨！我是虛擬陳柔蓁，很高興認識你。你可以問我關於我的專案、技能或興趣喔！' }
    ]);
    // 'userInput' 狀態用來追蹤使用者在輸入框中打的字
    const [userInput, setUserInput] = useState('');
    // 'isLoading' 狀態用來判斷是否正在等待 AI 回應，以顯示 "正在輸入中..."
    const [isLoading, setIsLoading] = useState(false);
    // 'chatEndRef' 是一個參考，用來幫助我們自動將聊天視窗滾動到最底部
    const chatEndRef = useRef(null);

    // 這個函式用來將聊天視窗滾動到最新訊息
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // 每當 messages 陣列更新時，就自動執行 scrollToBottom 函式
    useEffect(scrollToBottom, [messages]);

    // 當使用者送出訊息時觸發此函式
    const handleSendMessage = async (e) => {
        e.preventDefault(); // 防止表單提交時頁面重新整理
        if (!userInput.trim() || isLoading) return; // 如果沒輸入內容或正在等待 AI，則不執行

        // 建立一個包含使用者新訊息的對話列表
        const newMessages = [...messages, { role: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput(''); // 清空輸入框
        setIsLoading(true); // 開始顯示 "正在輸入中..."

        try {
            // 準備要傳送到後端 API 的對話歷史
            const historyForAPI = newMessages
              .slice(0, -1) // 排除系統的初始歡迎訊息
              .map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
              }));

            // 使用 fetch 與我們建立的後端伺服器溝通
            const response = await fetch('https://hw3-virtual-me-backend.onrender.com/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    history: historyForAPI,
                    message: userInput,
                }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            // 將 AI 的回覆加入到對話列表中
            setMessages(prev => [...prev, { role: 'model', text: data.message }]);
        } catch (error) {
            console.error("Error sending message:", error);
            // 如果出錯，也顯示一條錯誤訊息
            setMessages(prev => [...prev, { role: 'model', text: '抱歉，我現在好像有點問題，請稍後再試。' }]);
        } finally {
            setIsLoading(false); // 結束等待狀態
        }
    };

    // 這裡是元件的畫面結構 (JSX)
    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
                {isLoading && <div className="message model"><p>正在輸入中...</p></div>}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="跟虛擬陳柔蓁聊聊吧..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    傳送
                </button>
            </form>
        </div>
    );
}

export default ChatWithMe;