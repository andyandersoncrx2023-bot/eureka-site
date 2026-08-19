# Eureka 官网

Eureka 软件的官方下载页面：介绍功能、提供安装包下载与自愿赞助入口。

## 目录结构

```
website/
├─ index.html            # 官网首页（单页，纯静态，无需构建）
├─ css/style.css         # Apple 风格样式
├─ js/main.js            # 少量交互（赞助二维码占位降级）
├─ img/
│  ├─ icon.png           # 站点 Logo / 图标（黑白沉思者）
│  ├─ sponsor-wechat.png # 【待替换】微信赞赏二维码
│  └─ sponsor-alipay.png # 【待替换】支付宝赞赏二维码
└─ downloads/
   └─ Eureka Setup 1.0.0.exe   # 安装包（98.9 MB）
```

## 部署

纯静态站点，任意方式托管均可：

- **本地查看**：直接双击 `index.html` 即可在浏览器打开（下载链接为相对路径，可用）。
- **线上托管**：把整个 `website/` 文件夹上传到任意静态托管（GitHub Pages、Vercel、Netlify、
  阿里云 OSS、腾讯云 COS 等）或自己的服务器根目录即可，无需任何后端。

## 发布新版本

1. 重新打包安装包（`npx electron-builder --win nsis`）；
2. 把新的 `release\Eureka Setup 1.0.0.exe` 复制到 `downloads\`（覆盖同名文件即可）；
3. 若版本号变化，同步修改 `index.html` 中标题、`.download-name` 与按钮里的版本号/大小文案。

## 界面截图（“为什么选择 Eureka”栏目）

该栏目 5 个要点各预留了一个截图位（交替左右布局）。把截图按下面命名放入即可显示，
未放入时页面自动显示占位框（不影响其他内容）：

```
img/shots/why-1.png   01 数据永远属于你
img/shots/why-2.png   02 永久免费，无广告无内购
img/shots/why-3.png   03 为中文写作精心打磨
img/shots/why-4.png   04 轻量、安静、快
img/shots/why-5.png   05 细节之处见用心
```

建议尺寸：横图，16:10 左右（如 1280×800），PNG/JPG 均可。

## 赞助二维码

1. 把微信赞赏码保存为 `img/sponsor-wechat.png`、支付宝赞赏码保存为 `img/sponsor-alipay.png`；
2. 二维码未上传前，页面会自动显示“待开发者上传二维码”的占位框，不影响其他内容；
3. 页面文案已说明软件永久免费、赞助自愿。
