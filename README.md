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
// 自动注册 comps 文件夹下面的 .vue 文件为  VUE 组件 (带有 yn 前缀)
// 出于性能的考虑, 没有设置自定义参数, 也就是说需要把组件放在 "comps" 文件夹
ynRegisteVueComps();

// 以上一行代码会转义为这一坨代码
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
