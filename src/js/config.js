// src/js/config.js
// 配置加载功能

/**
 * 从config.json加载配置
 * @returns {Promise<Object>} 配置对象
 */
async function fetchConfig() {
    try {
        console.log('正在请求config.json...');
        const response = await fetch('config.json');
        
        // 检查响应状态
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const config = await response.json();
        console.log('成功加载配置:', config);
        return config;
    } catch (error) {
        console.error('加载配置失败:', error);
        console.warn('使用默认配置');
        return {
            domains: [
                "aHR0cHM6Ly9kdWppYW8udXV1aXguY29tCg==",
                "aHR0cHM6Ly9iYWlkdS5jb20=",
                "aHR0cHM6Ly8xLjEuMS4x"
            ],
            countdownDuration: 5,
            logoText: "WF",
            logoColor: "linear-gradient(45deg, #ff6b6b, #ffa502)",
            pageTitle: "跳转到我的网站",
            theme: "default"
        };
    }
}

// 导出函数
export { fetchConfig };