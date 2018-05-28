# babel-plugin-ynw

## 使用

1.安装

```js
npm i --save-dev babel-plugin-ynw
```

2.配置

```js
// .babelrc文件
{
  plugins: ["ynw"];
}
```

## ynRegisteVueComps

> 自动注册 Vue 组件

```js
// 注册comps文件夹下面的所有.vue文件为Vue组件
// header.vue  => yn-header
ynRegisteVueComps("./comps");

//等价于执行以下代码
const compContext = require.context("./comps", true, /\.vue$/);
compContext.keys().forEach(p => {
  const getCompPathName = path => {
    const match = path.match(/\w+?(?=\/)/g);
    if (!match) return "";
    return match.map(item => item.replace(/\//g, "")).join("-") + "-";
  };
  const name = p.match(/([\w\-]+)\.vue$/)[1];
  const folder = getCompPathName(p);
  const option = compContext(p).default;
  Vue.component("yn-" + folder + name, option);
});
```
