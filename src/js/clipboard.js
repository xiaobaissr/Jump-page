// src/js/clipboard.js
// 复制URL功能

/**
 * 设置复制URL按钮
 */
function setupCopyUrlButton() {
    const btn = document.getElementById('copyUrlBtn');
    btn.addEventListener('click', () => {
        // 复制当前页面URL（包含hash）
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            const originalText = btn.textContent;
            btn.innerHTML = '<i class="fas fa-check"></i> 已复制';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('复制失败:', err);
            btn.textContent = '复制失败';
        });
    });
}

// 导出函数
export { setupCopyUrlButton };