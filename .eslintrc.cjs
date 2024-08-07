module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended', // Accessibility linting
        'plugin:import/errors', // Import/export syntax checks
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended', // Integrates Prettier with ESLint
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react-refresh',
        'react',
        'react-hooks',
        '@typescript-eslint',
        'jsx-a11y', // Accessibility linting
        'import', // Import/export syntax checks
        'prettier', // Prettier for code formatting
    ],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react/prop-types': 'off', // Disable prop-types as we are using TypeScript
        '@typescript-eslint/no-unused-vars': ['error'], // Catch unused variables
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
            },
        ], // Organize imports
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
                aspects: ['noHref', 'invalidHref', 'preferButton'],
            },
        ], // Accessibility for anchor elements
        'prettier/prettier': 'error', // Ensure Prettier formatting is enforced
    },
    settings: {
        react: {
            version: 'detect', // Automatically detect the react version
        },
        'import/resolver': {
            typescript: {
                project: './tsconfig.json', // Point to the root tsconfig.json file
            },
        },
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: __dirname,
    },
};
