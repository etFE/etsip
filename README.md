# 亦童集成平台 #

etsip 使用文档

## 工具 ##

- git （[下载](https://git-scm.com/download)）
- node（版本号8.11.3）（[下载](https://nodejs.org/dist/v8.11.3/node-v8.11.3-x64.msi)）
- npm（node下载后npm自动下载）

> 注意：
>
> npm下载包时用的国外资源，可能下载速度慢或者丢包
>
> 考虑使用淘宝镜像（[查看淘宝镜像官网](https://npm.taobao.org/)）
>
> 首次使用方式：命令行键入
>
> `npm install -g cnpm --registry=https://registry.npm.taobao.org`
>
> 安装完以后，所有的`npm install` 命令改为`cnpm install`使用



## 使用 ##

1. 克隆项目到本地

```
git clone https://github.com/etFE/etsip.git
```

2. 安装所有包

```
npm install
```

或者，建议安装淘宝镜像后，使用cnpm，下载资源更快

```
cnpm install
```

3. 启动项目

```
npm start
```

4. 构建打包项目


```
npm run build
```



> 注意： 打包完后，由于是直接放在后台项目中使用的方式
>
> 打包完需要手动修改 index.html 文件中的资源引用。引用的前面加个`./`即可

## 工程目录解释 ##

```
- mock // 模拟数据文件，可以不管
- public // 打包输出文件，打包后的文件夹
- src // 所有代码位置
	|
	|- assets // 静态资源文件夹
	|- common // 公用文件
		|
		|- menu.js // 菜单配置
		|- router.js // 项目路由配置
		|
	|- components // 组件文件夹
	|- layouts // 通用布局组件文件夹
	|- models // 状态管理文件夹（包含所有的store，effects，注意使用了namespace命名空间）
	|- routes // 一一对应每个页面，每个页面都有文件夹，也是每个页面的入口文件
	|- servies // 项目请求api
		|
		|- createAPI.js // axios的封装，用导出的createAPI使用请求后台
		|- api.js // 所有请求的配置都在这里，调用对应的方法即可
		|- 其他没有用到
		|
	|- utils // 工具文件夹
		|
		|- Authorized.js 权限控制
		|- authority.js 从localStorage设置或调用权限的公用方法
		|- 其他都是工具函数
		|
	|- index.ejs // 页面模板，相当于是index.html
	|- index.js // 项目的主入口文件
	|- index.less // 根级的样式
	|- rollbar.js // 可以不用管
	|- router.js // 项目总体路由的配置文件
	|- theme.js // 主题样式文件，替换ant design的主题
- babelrc.js // babel转译配置文件 (!重要文件!)
- .editorconfig // 编写代码自动格式化文件
- .eslintrc // 代码格式检查配置
- .gitignore // 不会被版本控制的列表
- webpackrc.js // 工程环境配置文件 (!重要文件!)
- package.json // 包列表，脚本命令配置等 (!重要文件!)
- 其他文件 // 都是工程配置文件，可以不用管
```

## 技术栈 ##

1. React
2. Redux
3. Redux-Saga
4. Es6
5. Ant Design



## 其他参考资料 ##

> Ant Design ----- ui组件库 [查看](https://ant.design/index-cn)
>
> Ant Design Pro ------ 后台管理模板，整个项目从这个模板来的 [查看](https://pro.ant.design/index-cn)
>
> Webpack ------- 工程配置工具。项目中用的是roadhog，可以不用关注，已经配置好了的 [查看](https://webpack.js.org/)
>
> Babel ------ es6转译工具 [查看](http://babeljs.io/)
>
> Es6 ------ js新的语法 [查看](http://es6.ruanyifeng.com/)
>
> React ------- 所用的框架 [查看](https://doc.react-china.org/)
>
> Redux --------- 状态管理 [查看](https://redux.js.org/)
>
> Redux-Saga -------- 状态管理中间件 [查看](https://redux-saga.js.org/)
>
> Axios -------- 请求工具 [查看](https://www.kancloud.cn/yunye/axios/234845)
