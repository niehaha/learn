module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'project': './tsconfig.json',
    },
    extends: ['plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    env:{                         
        browser: true,
        node: true,
    },
    rules: {
        'semi':[2, 'never'],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-function-return-type': 0
    }
};