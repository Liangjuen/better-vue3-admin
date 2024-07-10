### 介绍

better-vue3-admin 是一个基于Vue3、Vite3、TypeScript、Element Plus 实现的功能强、高颜值、清新优雅、可扩展的中后台模板。 拥有丰富的主题设置及基础组件， 实现了基于菜单管理的自动化的文件路由系统， 基于 RBAC 模型实现按钮级别权限控制， 基于mockjs的数据模拟。

[![vite](https://img.shields.io/badge/Vite-5.0.8-informational?logo=Vite&color=43853D)](https://cn.vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/Typescript-5.2.2-informational?logo=typescript&color=2F74C0)](https://www.typescriptlang.org/)
[![vue](https://img.shields.io/badge/Vue-3.3.11-informational?logo=vue&color=42b883)](https://cn.vuejs.org/)

### 仓库

**gitee**: https://gitee.com/liang-juen/better-vue3-admin

**github**: https://github.com/Liangjuen/better-vue3-admin

### 特性

-   基于基于角色的访问控制(RBAC)
-   基于 pinia  的状态管理及持久化实现
-   基于 自定义指令 实现的按钮级别权限控制
-   基于 菜单管理 的动态路由添加
-   基于菜单管理的自动化的文件路由系统
-   通用组件、hook 封装(svg图标、右键菜单、useEcharts、usePermission...)
-   主题配置(动画、布局、dark/light切换、主颜色...)
-   多端适配，实现自适应布局
-   全局使用 css 变量,可根据预设变量实现个性化
-   使用 Prettier 统一格式化代码，集成 ESLint、Stylelint 代码校验规范
-   使用 husky、lint-staged、commitlint、czg、cz-git 规范提交信息

### 获取

- 克隆项目

```
git clone https://github.com/Liangjuen/better-vue3-admin.git
```

- 安装依赖

```
npm install
```

- 运行项目
```
npm run dev
```

### 项目结构

```
better-vue3-admin
├─ .husky                		# husky 配置文件
├─ mock							# 数据 mock
├─ public						# 静态资源文件
├─ src
│  ├─ assets					# 静态资源
│  ├─ components				# 自定义组件
│  ├─ config					# 应用配置
│  ├─ directives				# 自定义指令
│  ├─ enums						# 枚举
│  ├─ hooks						# hooks
│  ├─ locales					# 国际化
│  ├─ layouts					# 布局组件
│  ├─ modules					# 应用模块
│  │    ├─ views			    # 模块(会使用布局组件包裹)
│  │    └─ pages			    # page(同登录页面一样为单独的页面，不使用布局组件包裹)
│  ├─ network					# 网络请求、api接口
│  ├─ plugins					# 应用插件
│  ├─ router					# 路由
│  ├─ store						# 状态管理仓库
│  ├─ utils						# 工具库
│  ├─ views						# page
│  ├─ App.vue					# 应用组件
│  └─ main.ts					# 应用入口文件
├─ typings						# 全局类型声明
├─ .cz-config.cjs				# git 提交规范配置
├─ .editorconfig				# 统一不同编辑器的编码风格
├─ .env							# 基础环境
├─ .env.dev						# 开发环境
├─ .env.prod					# 生产环境
├─ .env.test					# 测试环境
├─ .eslintignore				# 忽略 Eslint 校验
├─ .eslintrc.cjs				# Eslint 校验配置
├─ .gitignore					# 忽略 git 提交
├─ .prettierignore				# 忽略 prettier 格式化
├─ .prettierrc.cjs				# prettier 格式化配置
├─ commitlint.config.cjs		# git 提交规范配置
├─ index.html					# 入口 html
├─ LICENSE						# 开源协议文件
├─ package-lock.json			# 依赖包包版本锁
├─ package.json					# 依赖包管理
├─ README.md					# readme
├─ tsconfig.json				# typescript 全局配置
└─ vite.config.ts				# vite 配置

```
