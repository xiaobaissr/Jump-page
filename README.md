<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Web-brightgreen.svg)
![Dependencies](https://img.shields.io/badge/dependencies-None-lightgrey.svg)

**🎯 为追求极致体验而生的前端智能跳转神器**

_无需后端 ·静态页面· 开箱即用 · 炫酷特效_

[![演示预览](src/assets/img/演示.jpg)](src/assets/img/演示.jpg)

[📖 详细教程](https://blog.wufeng.me/archives/tiao-zhuan-ye-mian-xiang-mu) | [💬 交流群](https://t.me/htpnu) | [⭐ Star](https://github.com/aklibk86-dev/jump-page)

</div>

---

## ✨ 核心特性

### 🚀 智能跳转

- **⚡ 多域名测速**：内置测速，自动选择最快的目标站点
- **🎯 精准跳转**：支持 Hash 路径深度跳转，保留完整页面路径
- **🔄 备用机制**：多域名容错，确保跳转成功率

### 🎨 视觉体验

- **✨ 动态粒子背景**：Canvas 粒子飞舞，科技感爆棚
- **🔮 玻璃拟态 UI**：半透明+模糊效果，潮流设计语言
- **📱 响应式布局**：完美适配桌面、平板、手机
- **🎭 多主题支持**：支持默认主题和商务风主题切换
- **🎨 自定义主题**：支持个性化颜色和样式定制

### 🛡️ 用户体验

- **📱 防红功能**：智能检测微信/QQ，自动引导外部浏览器
- **⏱️ 倒计时显示**：大数字倒计时 + 进度条，紧张感拉满

### 🛠️ 技术优势

- **⚡ 零依赖**：纯原生实现，轻如鸿毛，快如闪电
- **🔧 配置简单**：JSON 配置文件，无需编程基础
- **🌐 部署灵活**：支持本地、服务器、CDN 等多种部署方式

---

## 🚀 快速开始

### 📦 安装部署

1. **下载项目**

   ```bash
   # Git clone
   git clone https://github.com/aklibk86-dev/jump-page.git ./

   # 或下载代码后解压即可
   ```

2. **配置参数**

   编辑 `config.json` 文件 ( [在线 BASE64 编解码](https://www.toolhelper.cn/EncodeDecode/Base64) )：

   ```json
   {
     "domains": ["aHR0cHM6Ly9leGFtcGxlLmNvbQ=="],
     "countdownDuration": 5,
     "logoText": "Jump-page",
     "logoColor": "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
     "pageTitle": "正在跳转...",
     "theme": "default"
   }
   ```

3. **启动使用**

   ```bash
   # 本地使用
   双击 index.html

   # 或借助 Vscode Live Server 插件
   ```

### ⚙️ 配置说明

| 参数                | 类型   | 说明                        | 示例                                                 |
| ------------------- | ------ | --------------------------- | ---------------------------------------------------- |
| `domains`           | Array  | 跳转域名列表（Base64 编码） | `["aHR0cHM6Ly9leGFtcGxlLmNvbQ=="]`                   |
| `countdownDuration` | Number | 倒计时秒数                  | `5`                                                  |
| `logoText`          | String | Logo 显示文字               | `"Jump-page"`                                        |
| `logoColor`         | String | Logo 渐变颜色               | `"linear-gradient(45deg, #667eea 0%, #764ba2 100%)"` |
| `pageTitle`         | String | 浏览器标签页标题            | `"正在跳转..."`                                      |
| `theme`             | String | 主题样式（default/business）| `"default"`                                          |

### 🔗 Hash 路径跳转

支持深度链接跳转，保留页面路径信息 ( **注意原始链接的#** )：

```
原始链接：https://jump.page/#/products/details
跳转结果：https://fastest-domain.com/products/details
```

---

## 🎨 主题样式

### 🎭 默认主题
项目默认使用炫酷的科技风格主题，具有动态粒子背景和玻璃拟态UI效果。

### 🏢 商务风主题
新增商务风主题，采用专业蓝灰色调，适合企业级应用场景。

要使用商务风主题，只需将配置文件中的`theme`值改为`business`：

```json
{
  "theme": "business"
}
```

或者直接使用项目中提供的`config-business.json`示例文件：

```bash
# 重命名文件以应用商务风样式
mv config-business.json config.json
```

### 🖌️ 自定义主题
项目支持完全自定义主题样式，可以通过以下方式实现：

1. 创建新的CSS样式文件
2. 在`index.html`中添加新的样式表引用
3. 在JavaScript中添加主题切换逻辑
4. 在配置文件中添加新的主题选项

---

## 🎨 个性化定制

### 🎨 样式定制

#### 背景渐变

```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

#### 粒子特效

```javascript
// 调整粒子数量和速度
const particleCount = 100;
const particleSpeed = 2;
```

#### 倒计时样式

```css
.countdown {
  font-size: 4rem;
  font-weight: bold;
  color: #ffffff;
}
```

---

## ⭐ 使用小贴士

- 🎯 **微信/QQ 用户**：自动显示引导页，建议使用外部浏览器
- ⚙️ **配置修改**：所有设置都在 `config.json` 中，无需修改代码
- 🔄 **备用域名**：建议配置多个备用域名，提高跳转成功率
- 🎨 **主题切换**：通过修改`theme`配置项轻松切换不同主题样式
- 🎨 **样式定制**：可根据喜好调整颜色和样式

---

<div align="center">

**🌟 如果这个项目对你有帮助，请给我们一个 Star！**

_这不是普通的跳转页面，这是属于极客的跳转神器！_

</div>
