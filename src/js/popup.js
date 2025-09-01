// src/js/popup.js
// 弹窗页面逻辑

// 导入所需模块
import { fetchConfig } from './config.js';
import { createParticles } from './particles.js';

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 从config.json加载配置
        console.log('正在加载配置...');
        const config = await fetchConfig();
        console.log('配置加载完成:', config);
        
        // 应用主题样式
        if (config.theme) {
            applyTheme(config.theme);
        }
        
        // 设置弹窗内容
        if (config.popup) {
            document.querySelector('.popup-title').textContent = config.popup.title || '重要通知';
            document.querySelector('.popup-message').textContent = config.popup.content || '这是一个弹窗通知内容。';
            document.querySelector('.popup-btn').textContent = config.popup.buttonText || '确定';
        }
        
        // 创建粒子效果
        createParticles();
        
        // 设置按钮点击事件
        const popupButton = document.getElementById('popupButton');
        if (popupButton && config.popup && config.popup.buttonLink) {
            popupButton.addEventListener('click', () => {
                window.location.href = config.popup.buttonLink;
            });
        } else if (popupButton) {
            popupButton.addEventListener('click', () => {
                // 如果没有链接，则关闭窗口
                window.close();
            });
        }
    } catch (error) {
        console.error('弹窗页面执行出错:', error);
    }
});

/**
 * 应用主题样式
 * @param {string} theme - 主题名称
 */
function applyTheme(theme) {
    console.log('应用主题:', theme);
    
    // 获取body元素
    const body = document.body;
    
    // 根据主题切换样式
    if (theme === 'business') {
        body.classList.add('business-theme');
    } else {
        body.classList.remove('business-theme');
    }
}