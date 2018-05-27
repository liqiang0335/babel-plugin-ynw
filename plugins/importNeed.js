module.exports = function(babel, path) {
  const { node } = path;
  const source = node.source.value;
  if (source !== "ynw") return;
  const specs = node.specifiers.map(item => {
    const name = item.imported.name;
    return `import ${name} from "${source}/${name}"`;
  });
  const asts = specs.map(item => {
    return babel.transform(item).ast;
  });
  path.replaceWithMultiple(asts);
};
