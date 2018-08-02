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
