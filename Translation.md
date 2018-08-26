# 翻译

## 路径
* 文档主要是在 `docs` 目录下，生成到 `gh-pages-docs` 分支
* API 则是直接写在源码里，通过工具生成的，生成到 `gh-pages` 分支

## 命令
* 安装依赖，请使用 `yarn install`
* 文档运行 `npm run docs:dev`，表示开发，`npm run docs:build` 表示生成生成环境文件，运行 `npm run gh-pages-docs`，将生产环境代码生成到 `gh-pages-docs` 分支里。
