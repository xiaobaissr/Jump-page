// src/js/countdown.js
// 倒计时功能

/**
 * 开始倒计时
 * @param {string} targetUrl - 目标URL
 * @param {number} duration - 倒计时持续时间（秒）
 */
function startCountdown(targetUrl, duration) {
    let c = duration, el = document.getElementById('countdown');
    el.textContent = c;
    const timer = setInterval(() => {
        el.textContent = --c;
        if (c <= 0) { 
            clearInterval(timer); 
            redirectToTarget(targetUrl); 
        }
    }, 1000);
    setTimeout(() => redirectToTarget(targetUrl), duration * 1000);
}

/**
 * 重定向到目标URL
 * @param {string} url - 目标URL
 */
function redirectToTarget(url) {
    window.location.href = url;
}

// 导出函数
export { startCountdown, redirectToTarget };