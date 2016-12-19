"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-inline-environment-variables",
    visitor: {
      CallExpression(path) {
        var line = path.parent.loc.start.line;
        if (isDebugPrintFunction(path.node)) {
          path.replaceWithSourceString(`console.log('DEBUG PRINT: line ' + ${line})`);
        }
      },
    },
  };
  function isDebugPrintFunction(node) {
    return t.isCallExpression(node) &&
           t.isIdentifier(node.callee, { name: "__DP__" });
  }
};
