---
title: 修复Hexo无法显示图片
date: 2023-10-09 13:50:14
updated: 2023-10-09 13:50:14
tags:
  - 教程
  - Hexo
categories:
  - 教程
  - Hexo
---

# 起因
刚写完第一篇文章满怀期待的上传，然后 Hexo 给了我个惊喜 ———— 没有图片！  

![](./Hexo无法显示图片/卖惨.png)

![](../images/表情包/快乐,啪!没了.jpg)

# 具体问题

使用 Markdown 插入**本地图片**时Hexo渲染的静态页面中的图片路径错误
> 使用 Markdown 插入图片：`![](./Hexo自动化部署/DeployKeys位置.png)` 

![](./Hexo无法显示图片/无法加载图片.png)

# 解决方案

1. 使用 hexo-asset-image 给hexo中的资源图片指定绝对路径  
   在控制台中输入 `npm install hexo-asset-image --save` 安装
   > 由于 hexo-asset-image 太久未维护，直接使用会有些问题
   >
   > ![](./Hexo无法显示图片/使用hexo-asset-image无法直接加载.png)
2. 所以需要在 Hexo/_config.yml 中修改 `permalink` 配置
   ```yaml
   # permalink: :year/:month/:day/:title/
   permalink: :year/:month/:day/:title.html
   ```
   > 使博客的链接地址显示 `.html` 后缀

   ![](./Hexo无法显示图片/修改_config.png)
3. 修改工作流配置，将 **判断是否已缓存** 暂时注释，来让 GitHub Actions 安装 hexo-asset-image
   > 未使用 GitHub Actions 无视

   ![](./Hexo无法显示图片/修改CL.png)

# 成功！

![](./Hexo无法显示图片/成功.png)