const fs = require("fs");
const path = require("path");

const handler = {
  ynRegisteVueComps(babel, p, params) {
    const file = path.join(__dirname, "./src/registeVueComps.js");
    var content = fs.readFileSync(file, "utf-8");
    content = content.replace(/@h(\d+)/g, (match, index) => {
      const i = index - 1;
      return params[i];
    });
    const { transform } = babel;
    const gen = transform(content).ast;
    const body = gen.program.body;
    p.replaceWithMultiple(body);
  }
};

module.exports = function(babel) {
  return {
    visitor: {
      CallExpression(path) {
        const { node } = path;
        const name = node.callee.name;
        const params = node.arguments.map(item => item.value);
        handler[name] && handler[name](babel, path, params);
      }
    }
  };
};
