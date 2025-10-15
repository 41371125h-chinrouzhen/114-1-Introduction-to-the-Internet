// frontend/src/App.js (設定要顯示的元件)

import React from 'react';
import './App.css'; 
import DashboardComponent from './DashboardComponent'; 

function App() {
  
  // *** 元件 ID 和標題 ***
  const ID = 60; 
  const TITLE = "YouBike使用情況";
  
  return (
    <div className="App">
      <header className="App-header" style={{ padding: '20px' }}>
        <h1 style={{ color: '#333' }}>臺北城市儀表板元件展示與 AI 洞察</h1>
        
        {/* 渲染圖表元件和 AI 分析區塊 */}
        <DashboardComponent 
            componentId={ID} 
            title={TITLE} 
        />
        
      </header>
    </div>
  );
}

export default App;