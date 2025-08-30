// src/js/domain-speed.js
// 域名测速功能

/**
 * 解密base64域名
 * @param {Array<string>} domains - Base64编码的域名数组
 * @returns {Array<string>} 解密后的域名数组
 */
function decodeDomains(domains) {
    return domains.map(d => atob(d));
}

/**
 * 测试域名速度
 * @param {Array<string>} domains - 要测试的域名数组
 * @param {number} timeout - 超时时间（毫秒）
 * @returns {Promise<Array<Object>>} 包含域名和响应时间的数组
 */
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

/**
 * 选择最快的域名
 * @param {Array<Object>} results - 测试结果数组
 * @returns {string} 最快的域名
 */
function selectFastestDomain(results) {
    results.sort((a, b) => a.time - b.time);
    return results[0].domain;
}

// 导出函数
export { decodeDomains, testDomainSpeed, selectFastestDomain };