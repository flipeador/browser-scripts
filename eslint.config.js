// ESLint Flat Configuration File
// https://eslint.org/docs/latest/use/configure

export default [
    'eslint:all',
    {
        languageOptions: {
            // shared-node-browser
            // https://github.com/sindresorhus/globals/blob/main/globals.json
            globals: {
                'clearTimeout': false,
                'console': false,
                'setTimeout': false
            }
        },
        rules: {
            'array-bracket-newline': 'off',
            'array-element-newline': 'off',
            'arrow-body-style': 'off',
            'arrow-parens': 'off',
            'arrow-spacing': 'off',
            'brace-style': 'off',
            'camelcase': 'off',
            'capitalized-comments': 'off',
            'class-methods-use-this': 'off',
            'comma-spacing': 'off',
            'complexity': 'off',
            'consistent-return': 'off',
            'consistent-this': 'off',
            'curly': 'off',
            'default-case': 'off',
            'dot-location': 'off',
            'func-names': 'off',
            'func-style': 'off',
            'function-call-argument-newline': 'off',
            'function-paren-newline': 'off',
            'guard-for-in': 'off',
            'id-length': 'off',
            'import/no-anonymous-default-export': 'off',
            'indent': 'off',
            'init-declarations': 'off',
            'line-comment-position': 'off',
            'linebreak-style': ['error', 'windows'],
            'lines-around-comment': 'off',
            'lines-between-class-members': 'off',
            'max-classes-per-file': 'off',
            'max-len': 'off',
            'max-lines': 'off',
            'max-lines-per-function': 'off',
            'max-params': 'off',
            'max-statements': 'off',
            'max-statements-per-line': 'off',
            'multiline-comment-style': 'off',
            'multiline-ternary': 'off',
            'newline-per-chained-call': 'off',
            'new-cap': 'off',
            'no-async-promise-executor': 'off',
            'no-await-in-loop': 'off',
            'no-bitwise': 'off',
            'no-case-declarations': 'off',
            'no-cond-assign': 'off',
            'no-console': 'off',
            'no-constant-condition': 'off',
            'no-continue': 'off',
            'no-control-regex': 'off',
            'no-eval': 'off',
            'no-extra-parens': 'off',
            'no-implicit-coercion': 'off',
            'no-inline-comments': 'off',
            'no-invalid-this': 'off',
            'no-lonely-if': 'off',
            'no-magic-numbers': 'off',
            'no-misleading-character-class': 'off',
            'no-mixed-operators': 'off',
            'no-multi-spaces': 'off',
            'no-multiple-empty-lines': 'off',
            'no-negated-condition': 'off',
            'no-nested-ternary': 'off',
            'no-param-reassign': 'off',
            'no-plusplus': 'off',
            'no-promise-executor-return': 'off',
            'no-prototype-builtins': 'off',
            'no-return-assign': 'off',
            'no-return-await': 'off',
            'no-sequences': 'off',
            'no-shadow': 'off',
            'no-ternary': 'off',
            'no-throw-literal': 'off',
            'no-undefined': 'off',
            'no-underscore-dangle': 'off',
            'no-unused-expressions': 'off',
            'no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }],
            'no-use-before-define': 'off',
            'no-useless-call': 'off',
            'no-useless-constructor': 'off',
            'no-warning-comments': 'off',
            'nonblock-statement-body-position': 'off',
            'object-curly-spacing': 'off',
            'object-property-newline': 'off',
            'one-var': 'off',
            'one-var-declaration-per-line': 'off',
            'operator-linebreak': 'off',
            'padded-blocks': 'off',
            'prefer-destructuring': 'off',
            'prefer-named-capture-group': 'off',
            'prefer-template': 'off',
            'quote-props': 'off',
            'quotes': ['error', 'single'],
            'radix': 'off',
            'require-await': 'off',
            'semi': ['error', 'always'],
            'sort-imports': 'off',
            'sort-keys': 'off',
            'space-before-function-paren': 'off',
            'space-infix-ops': 'off',
            'space-unary-ops': 'off',
            'spaced-comment': 'off',
            'yield-star-spacing': 'off'
        }
    }
];
