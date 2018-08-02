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

## importVueComps

> 自动注册 Vue 组件

```js
/**
 * 自动注册项目文件夹下的 comps 文件夹中的 .vue 文件为组件
 * (带有yn前缀)
 */
importVueComps();

/**
 * 注册其他文件夹 Vue组件(带有yn前缀)
 * @param <String> path : 路径
 * @param <Array> compsName : 导入组件的名称数组
 */
importVueComps("@common/comps", ["compA", "compB"]);
```
