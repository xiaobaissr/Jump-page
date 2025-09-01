// src/js/countdown.js
// 倒计时功能

/**
 * 开始倒计时
 * @param {string} targetUrl - 目标URL
 * @param {number} duration - 倒计时持续时间（秒）
 * @param {Array} domainResults - 域名测速结果
 */
function startCountdown(targetUrl, duration, domainResults) {
    let c = duration, el = document.getElementById('countdown');
    el.textContent = c;
    
    // 动态设置进度条动画时间
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.animation = `progress ${duration}s linear forwards`;
    }
    
    const timer = setInterval(() => {
        el.textContent = --c;
        if (c <= 0) {
            clearInterval(timer);
            redirectToTarget(targetUrl, domainResults);
        }
    }, 1000);
}

/**
 * 重定向到目标URL
 * @param {string} url - 目标URL
 * @param {Array} domainResults - 域名测速结果
 */
async function redirectToTarget(url, domainResults) {
    // 检查是否有可用域名（响应时间不是Infinity的域名）
    if (domainResults) {
        const availableDomains = domainResults.filter(result => result.time !== Infinity);
        if (availableDomains.length === 0) {
            // 没有可用域名，在页面内显示弹窗
            console.log('没有可用域名，在页面内显示弹窗');
            showPopup();
            return;
        }
    }
    
    // 有可用域名，正常跳转
    window.location.href = url;
}

/**
 * 在页面内显示弹窗
 */
async function showPopup() {
    // 动态导入popup.js中的函数
    const { fetchConfig } = await import('./config.js');
    
    // 获取配置
    const config = await fetchConfig();
    
    // 获取当前主题
    const bodyClass = document.body.className;
    const currentTheme = bodyClass.split(' ').find(cls => cls.endsWith('-theme')) || 'default-theme';
    
    // 创建弹窗元素
    const popupContainer = document.createElement('div');
    popupContainer.className = 'popup-overlay';
    popupContainer.innerHTML = `
        <div class="popup-container">
            <div class="popup-box">
                <div class="popup-header">
                    <h2 class="popup-title">${config.popup?.title || '重要通知'}</h2>
                </div>
                <div class="popup-content">
                    <p class="popup-message">${config.popup?.content || '这是一个弹窗通知内容。'}</p>
                </div>
                <div class="popup-footer">
                    <button class="popup-btn ${currentTheme}" id="popupButton">${config.popup?.buttonText || '确定'}</button>
                </div>
            </div>
        </div>
    `;
    
    // 添加弹窗样式
    const style = document.createElement('style');
    style.textContent = `
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .popup-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        
        .popup-box {
            text-align: center;
            background: rgba(255, 255, 255, .08);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 2.5rem 1.5rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, .2);
            border: 1px solid rgba(255, 255, 255, .15);
            max-width: 95%;
            width: 400px;
            position: relative;
            z-index: 10;
        }
        
        .popup-header {
            margin-bottom: 1.5rem;
        }
        
        .popup-title {
            color: #fff;
            font-size: 1.8rem;
            margin: 0;
            font-weight: 500;
            text-shadow: 0 2px 10px rgba(0, 0, 0, .2);
        }
        
        .popup-content {
            margin-bottom: 2rem;
        }
        
        .popup-message {
            color: rgba(255, 255, 255, .85);
            font-size: 1.1rem;
            line-height: 1.7;
            margin: 0;
        }
        
        .popup-footer {
            margin-top: 1rem;
        }
        
        .popup-btn {
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1.1rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .popup-btn:hover {
            transform: translateY(-3px);
        }
        
        /* 默认按钮样式 */
        .popup-btn.default-theme {
            background: linear-gradient(45deg, #ff6b6b, #ffa502);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }
        
        .popup-btn.default-theme:hover {
            box-shadow: 0 8px 20px rgba(255, 107, 107, 0.6);
        }
        
        /* 响应式设计 */
        @media (max-width: 480px) {
            .popup-box {
                padding: 1.8rem 1.5rem;
                width: 95%;
            }
            
            .popup-title {
                font-size: 1.5rem;
            }
            
            .popup-message {
                font-size: 1rem;
            }
        }
    `;
    
    // 添加元素到页面
    document.head.appendChild(style);
    document.body.appendChild(popupContainer);
    
    // 设置按钮点击事件
    const popupButton = popupContainer.querySelector('#popupButton');
    if (popupButton) {
        popupButton.addEventListener('click', () => {
            // 移除弹窗
            document.body.removeChild(popupContainer);
            document.head.removeChild(style);
            
            // 如果配置中有按钮链接，则跳转
            if (config.popup?.buttonLink) {
                window.location.href = config.popup.buttonLink;
            }
        });
    }
}

// 导出函数
export { startCountdown, redirectToTarget };