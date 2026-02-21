# Waaary 个人展示网站

一个现代化的个人作品集网站，采用 iOS26 高级质感设计风格，支持明暗双模式切换。

🌐 **在线预览**: https://waaary.github.io/personal-portfolio/

---

## ✨ 特性

- 🎨 **iOS26 高级质感设计** - 精致的视觉体验和流畅的动画效果
- 🌓 **明暗双模式** - 支持一键切换，自动保存用户偏好
- 📱 **响应式布局** - 完美适配各种屏幕尺寸
- ⚡ **纯前端实现** - 无需后端，快速加载
- 🔗 **GitHub Pages 部署** - 免费托管，自动更新

---

## 📁 项目结构

```
PersonalWeb/
├── index.html          # 首页 - 个人介绍与精选内容
├── works.html          # 作品页 - 项目展示与分类筛选
├── blog.html           # 博客页 - 多平台入口与二维码
├── contact.html        # 联系页 - 联系方式与社交链接
├── css/
│   ├── style.css       # 全局样式与主题变量
│   └── animations.css  # 动画效果与过渡
├── js/
│   └── main.js         # 交互逻辑与功能实现
└── README.md           # 项目说明文档
```

---

## 🚀 快速开始

### 本地预览

```bash
# 进入项目目录
cd /Users/waaary/Coding/PersonalWeb

# 启动本地服务器
python3 -m http.server 8080

# 浏览器访问
open http://localhost:8080
```

### 部署到 GitHub Pages

项目已配置 GitHub Pages，推送代码后自动部署：

```bash
# 修改内容后
git add .
git commit -m "更新内容描述"
git push origin main
```

等待 1-2 分钟后访问：https://waaary.github.io/personal-portfolio/

---

## 📝 内容管理

### 修改个人信息

| 内容 | 文件位置 | 说明 |
|------|---------|------|
| 网站名称/LOGO | `index.html` 第 16 行 | `<span class="logo-text">Waaary</span>` |
| 个人标签 | `index.html` 第 42-46 行 | Hero 区域的渐变文字 |
| 精选作品 | `index.html` 第 68-85 行 | `works-grid` 区域内的卡片 |
| 作品详情 | `works.html` | 完整的作品展示与分类 |
| 博客平台 | `blog.html` | 各平台入口与二维码 |
| 联系方式 | `contact.html` | 微信、邮箱、社交链接 |

### 修改主题颜色

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --primary: #007AFF;           /* 主色调 */
    --bg-primary: #F5F5F7;        /* 背景色 */
    --text-primary: #1D1D1F;      /* 文字颜色 */
}

[data-theme="dark"] {
    --primary: #0A84FF;
    --bg-primary: #000000;
    --text-primary: #FFFFFF;
}
```

---

## 🛠 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 现代样式与动画
- **JavaScript (ES6+)** - 交互逻辑
- **GitHub Pages** - 静态网站托管

---

## 📄 页面说明

### 首页 (index.html)
- 个人品牌展示
- 精选作品预览（2 个卡片）
- 博客平台入口（4 个图标）
- 联系方式预览

### 作品页 (works.html)
- 4 个分类筛选标签（全部/产品/程序项目/运营/摄影）
- 4 列响应式卡片布局
- Feishu 外部链接支持
- 固定 Feishu 快捷按钮

### 博客页 (blog.html)
- 4 个平台入口卡片（小红书/公众号/B站/抖音）
- 悬停显示二维码
- 一键跳转功能

### 联系页 (contact.html)
- 微信二维码（点击放大）
- 邮箱复制功能（带成功提示）
- 社交媒体链接

---

## 🎯 功能特性

### 全局功能
- ✅ 固定导航栏（滚动时缩小）
- ✅ 明暗主题切换（0.2-0.3s 过渡动画）
- ✅ 平滑滚动与页面过渡
- ✅ 交互元素悬停效果
- ✅ 键盘快捷键支持（Cmd/Ctrl+K 切换主题）

### 交互动效
- 按钮涟漪效果
- 卡片悬停放大与渐变边框
- 页面加载淡入动画
- 二维码点击放大模态框

---

## 🌐 浏览器兼容

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+

---

## 📸 截图预览

*（建议添加网站截图展示效果）*

---

## 📮 联系方式

- GitHub: [@Waaary](https://github.com/Waaary)
- 网站: https://waaary.github.io/personal-portfolio/

---

## 📄 许可证

MIT License © 2026 Waaary
