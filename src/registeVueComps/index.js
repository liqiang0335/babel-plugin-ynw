const babel = require("babel-core");
const path = require("path");
const fs = require("fs");

const file = path.join(__dirname, "./target.js");
const source = fs.readFileSync(file, "utf-8");
const { transform } = babel;
const gen = transform(source).ast;

module.exports = gen;
