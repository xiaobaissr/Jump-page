// src/js/browser-detect.js
// 浏览器检测功能

/**
 * 检测微信/QQ浏览器
 * @returns {boolean} 如果是微信或QQ浏览器返回true，否则返回false
 */
function isWeixinOrQQBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('micromessenger') || ua.includes('qq/');
}

// 导出函数
export { isWeixinOrQQBrowser };