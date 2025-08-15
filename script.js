// script.js
document.addEventListener('DOMContentLoaded', async () => {
    // 从config.json加载配置
    const config = await fetchConfig();
    
    // 设置页面元素
    document.title = config.pageTitle;
    document.querySelector('.logo span').textContent = config.logoText;
    document.querySelector('.logo').style.background = config.logoColor;
    
    // 创建粒子效果
    createParticles();
    // 设置复制按钮
    setupCopyUrlButton();
    
    // 检测是否为微信/QQ浏览器
    if (isWeixinOrQQBrowser()) {
        // 显示引导遮罩层
        document.getElementById('browserOverlay').classList.add('active');
        // 隐藏主内容
        document.querySelector('.container').style.display = 'none';
        // 停止倒计时
        return;
    }
    
    // 解密base64域名
    const domains = decodeDomains(config.domains);
    
    // 更新目标URL显示
    updateTargetUrl("测速中...");
    
    // 测试域名速度并选择最快的
    const results = await testDomainSpeed(domains);
    const fastest = selectFastestDomain(results);
    
    // 获取hash路径
    const hashPath = window.location.hash.substring(1);
    let targetUrl = fastest;
    
    // 如果有hash路径，添加到目标URL
    if (hashPath) {
        // 确保目标URL以斜杠结尾
        if (!targetUrl.endsWith('/')) {
            targetUrl += '/';
        }
        // 移除hash路径开头的斜杠（如果有）
        const cleanHash = hashPath.startsWith('/') ? hashPath.substring(1) : hashPath;
        targetUrl += cleanHash;
    }
    
    updateTargetUrl(targetUrl);
    
    // 开始倒计时
    startCountdown(targetUrl, config.countdownDuration);
});

// 从config.json加载配置
async function fetchConfig() {
    try {
        const response = await fetch('config.json');
        return await response.json();
    } catch (error) {
        console.error('加载配置失败，使用默认配置', error);
        return {
            domains: [
                "aHR0cHM6Ly9kdWppYW8udXV1aXguY29tCg==",
                "aHR0cHM6Ly9iYWlkdS5jb20=",
                "aHR0cHM6Ly8xLjEuMS4x"
            ],
            countdownDuration: 5,
            logoText: "WF",
            logoColor: "linear-gradient(45deg, #ff6b6b, #ffa502)",
            pageTitle: "跳转到我的网站"
        };
    }
}

// 检测微信/QQ浏览器
function isWeixinOrQQBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('micromessenger') || ua.includes('qq/');
}

// 解密base64域名
function decodeDomains(domains) {
    return domains.map(d => atob(d));
}

// 测试域名速度
function testDomainSpeed(domains, timeout = 2000) {
    return Promise.all(domains.map(domain => {
        return new Promise(resolve => {
            const img = new Image();
            const start = performance.now();
            let finished = false;
            img.onload = () => {
                if (!finished) {
                    finished = true;
                    resolve({domain, time: performance.now() - start});
                }
            };
            img.onerror = () => {
                if (!finished) {
                    finished = true;
                    resolve({domain, time: Infinity});
                }
            };
            img.src = domain + "/favicon.ico?_t=" + Math.random();
            setTimeout(() => {
                if (!finished) {
                    finished = true;
                    resolve({domain, time: Infinity});
                }
            }, timeout);
        });
    }));
}

// 选择最快的域名
function selectFastestDomain(results) {
    results.sort((a, b) => a.time - b.time);
    return results[0].domain;
}

// 更新目标URL显示
function updateTargetUrl(url) {
    document.getElementById('targetUrl').textContent = url;
}

// 开始倒计时
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

// 重定向到目标URL
function redirectToTarget(url) {
    window.location.href = url;
}

// 创建粒子效果
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

// 复制URL功能
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

// 添加一个辅助函数来解析hash路径
function parseHashPath() {
    const hash = window.location.hash.substring(1);
    if (!hash) return null;
    
    // 尝试解析hash为对象（如果是JSON格式）
    try {
        return JSON.parse(decodeURIComponent(hash));
    } catch (e) {
        // 如果不是JSON，返回原始字符串
        return hash;
    }
}

// 示例用法（可选）
// const pathInfo = parseHashPath();
// if (typeof pathInfo === 'string') {
//   console.log("Hash路径:", pathInfo);
// } else if (pathInfo) {
//   console.log("解析的Hash对象:", pathInfo);
// }