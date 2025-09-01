// src/js/config.js
// 配置加载功能

/**
 * 从config.json加载配置
 * @returns {Promise<Object>} 配置对象
 */
async function fetchConfig() {
    console.log('正在请求config.json...');
    const response = await fetch('config.json');
    
    // 检查响应状态
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const config = await response.json();
    console.log('成功加载配置:', config);
    return config;
}

// 导出函数
export { fetchConfig };