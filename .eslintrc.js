// module.exports = {
//   extends: [
//     'semistandard'
//   ]
// };

module.exports = {
  extends: ['semistandard'],
  rules: {
    'space-before-function-paren': 0,
    'comma-dangle': 0,
  },
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
};
