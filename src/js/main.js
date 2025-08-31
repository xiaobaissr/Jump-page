// src/js/main.js
// 主入口文件

// 导入所有功能模块
import { fetchConfig } from './config.js';
import { isWeixinOrQQBrowser } from './browser-detect.js';
import { decodeDomains, testDomainSpeed, selectFastestDomain } from './domain-speed.js';
import { startCountdown, redirectToTarget } from './countdown.js';
import { createParticles } from './particles.js';
import { setupCopyUrlButton } from './clipboard.js';

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
        
        // 设置页面元素
        document.title = config.pageTitle;
        document.querySelector('.logo span').textContent = config.logoText;
        document.querySelector('.logo').style.background = config.logoColor;
        
        // 应用页脚代码
        applyFooterCode(config.footerCode);
        
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
        console.log('解密后的域名:', domains);
        
        // 更新目标URL显示
        updateTargetUrl("测速中...");
        
        // 测试域名速度并选择最快的
        console.log('开始域名测速...');
        const results = await testDomainSpeed(domains);
        console.log('域名测速结果:', results);
        const fastest = selectFastestDomain(results);
        console.log('最快的域名:', fastest);
        
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
    } catch (error) {
        console.error('主程序执行出错:', error);
        // 显示错误信息给用户
        updateTargetUrl("页面加载出错，请检查控制台了解详情");
    }
});

/**
 * 应用主题样式
 * @param {string} theme - 主题名称
 */
function applyTheme(theme) {
    console.log('应用主题:', theme);
    
    // 获取样式表元素
    const baseCss = document.getElementById('base-css');
    const particlesCss = document.getElementById('particles-css');
    const overlayCss = document.getElementById('overlay-css');
    const responsiveCss = document.getElementById('responsive-css');
    const businessCss = document.getElementById('business-css');
    
    // 根据主题切换样式
    if (theme === 'business') {
        // 启用商务风样式
        if (baseCss) baseCss.disabled = true;
        if (particlesCss) particlesCss.disabled = true;
        if (overlayCss) overlayCss.disabled = true;
        if (responsiveCss) responsiveCss.disabled = true;
        if (businessCss) businessCss.disabled = false;
    } else {
        // 使用默认样式
        if (baseCss) baseCss.disabled = false;
        if (particlesCss) particlesCss.disabled = false;
        if (overlayCss) overlayCss.disabled = false;
        if (responsiveCss) responsiveCss.disabled = false;
        if (businessCss) businessCss.disabled = true;
    }
}

/**
 * 更新目标URL显示
 * @param {string} url - 要显示的URL
 */
function updateTargetUrl(url) {
    const targetUrlElement = document.getElementById('targetUrl');
    if (targetUrlElement) {
        targetUrlElement.textContent = url;
    } else {
        console.error('未找到targetUrl元素');
    }
}

/**
 * 应用页脚代码
 * @param {string} footerCode - 要插入的页脚代码
 */
function applyFooterCode(footerCode) {
    // 如果页脚代码为空，则不执行任何操作
    if (!footerCode || footerCode.trim() === '') {
        return;
    }
    
    // 获取自定义页脚元素
    const customFooterElement = document.getElementById('customFooter');
    
    // 如果找到了自定义页脚元素，则插入代码
    if (customFooterElement) {
        customFooterElement.innerHTML = footerCode;
    } else {
        console.error('未找到customFooter元素');
    }
}