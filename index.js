const importNeed = require("./plugins/importNeed");
module.exports = function(babel) {
  return {
    visitor: {
      ImportDeclaration(path) {
        importNeed(babel, path);
      }
    }
  };
};
