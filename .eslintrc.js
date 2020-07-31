/**
 * @typescript-eslint/eslint-plugin: A plugin that contains a bunch of ESLint rules that are TypeScript specific
 * @typescript-eslint/parser: The parser that will allow ESLint to lint TypeScript code

 */
module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        '@react-native-community'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {vars: 'all', args: 'after-used', ignoreRestSiblings: false}
        ], // change unused vars error to warn
        '@typescript-eslint/no-use-before-define': ['error', {functions: false, typedefs: false}], // disable declare before for function calls
        '@typescript-eslint/no-explicit-any': 0, // disable no any rule
        '@typescript-eslint/no-empty-function': {allow: ['arrowFunctions']}, // disable forbidden empty functions
        'comma-dangle': ['error', 'never'], // disable comma ending
        'linebreak-style': 0, // disable line break rule windows or unix
        'react/prop-types': 0,
        'react/destructuring-assignment': 0,
        'react/static-property-placement': 0,
        'jsx-a11y/alt-text': 0,
        'react/jsx-props-no-spreading': 0,
        'no-console': 1, // Means warning
        'prettier/prettier': 2 // Means error
    }
};
