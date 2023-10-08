---
title: Hexo + Github Actions 实现自动部署
date: 2023-10-07 14:55:45
updated: 2023-10-07 14:55:45
tags:
  - 教程
  - Hexo
---
# 准备工作

1. 简单了解 [Hexo](https://hexo.io/docs/index.html)，[GitHub Actions](https://docs.github.com/actions) 以及 [Github Secrets](https://docs.github.com/actions/security-guides/using-secrets-in-github-actions)
2. 安装Hexo
3. 熟练使用Baidu或Bing大小姐

# 源码与网页同仓库方案

源码与渲染后的博客静态页面放在同一个仓库的不同分支，  
以 Hexo 分支为源码，master 分支为渲染后的静态页面网页
# GitHub 工作流配置
1. 在 Hexo 目录或 GitHub 中新建 `.github/workflows/` 目录，目录中新建 `HexoCI.yml` 文件  
   这里给一个示例 GitHub 工作流配置的方式可查阅 GitHub 官方文档说明

2. 编写 `HexoCI.yml` 工作流配置


