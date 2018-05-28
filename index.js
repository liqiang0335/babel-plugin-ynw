const registeVueCompsAst = require("./src/registeVueComps");

/**
 * handler
 */
const handler = {
  ynRegisteVueComps(path) {
    path.replaceWithMultiple(registeVueCompsAst);
  }
};

module.exports = function(babel) {
  return {
    visitor: {
      CallExpression(path) {
        const { node } = path;
        const name = node.callee.name;
        const params = node.arguments.map(item => item.value);
        handler[name] && handler[name](path, params);
      }
    }
  };
};
