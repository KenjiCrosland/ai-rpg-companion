module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  plugins: [
    // Transform import.meta.env for Jest tests
    function() {
      return {
        visitor: {
          MemberExpression(path) {
            // Transform import.meta.env.* → process.env.* or defaults
            if (
              path.node.object.type === 'MemberExpression' &&
              path.node.object.object.type === 'MetaProperty' &&
              path.node.object.object.meta.name === 'import' &&
              path.node.object.object.property.name === 'meta' &&
              path.node.object.property.name === 'env'
            ) {
              const propName = path.node.property.name;
              // Replace import.meta.env.DEV with true for tests
              if (propName === 'DEV') {
                path.replaceWith({ type: 'BooleanLiteral', value: true });
              }
              // Replace other import.meta.env.* with undefined
              else {
                path.replaceWith({ type: 'Identifier', name: 'undefined' });
              }
            }
          }
        }
      };
    }
  ],
};
