// src/js/particles.js
// 粒子效果功能

/**
 * 创建粒子效果
 */
function createParticles() {
    const p = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const d = document.createElement('div');
        d.className = 'particle';
        const s = Math.random() * 10 + 5;
        d.style.width = d.style.height = s + 'px';
        d.style.left = (Math.random() * 100) + '%';
        d.style.animationDelay = (Math.random() * 15) + 's';
        d.style.animationDuration = (10 + Math.random() * 20) + 's';
        p.appendChild(d);
    }
}

// 导出函数
export { createParticles };