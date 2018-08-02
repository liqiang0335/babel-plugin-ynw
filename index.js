const babel = require("babel-core");
const path = require("path");
const fs = require("fs");
const getSource = name => path.join(__dirname, `./src/${name}.js`);
const compsSource = fs.readFileSync(getSource("comps"), "utf-8");
const dynamicSource = fs.readFileSync(getSource("dynamic"), "utf-8");
const defAst = babel.transform(compsSource).ast;

const transform = function(source) {
  return babel.transform(source).ast;
};

/**
 * handler
 */
const cache = {};
const handler = {
  importVueComps(path) {
    const { node } = path;
    if (node.arguments.length < 1) {
      path.replaceWithMultiple(defAst);
    } else {
      const folderName = node.arguments[0].value;
      const comps = node.arguments[1].elements.map(item => item.value);
      const regName = comps.join("|");
      if (cache[regName]) {
        path.replaceWithMultiple(cache[regName]);
        return;
      }
      const source = dynamicSource
        .replace("@folderName", folderName)
        .replace("@regName", regName);
      const ast = transform(source);
      cache[regName] = ast;
      path.replaceWithMultiple(ast);
    }
  }
};

module.exports = function() {
  return {
    visitor: {
      CallExpression(path) {
        const name = path.node.callee.name;
        if (handler[name]) {
          handler[name](path);
        }
      }
    }
  };
};
