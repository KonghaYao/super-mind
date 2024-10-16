export default {
    arrowParens: 'always',
    semi: true,
    singleQuote: true,
    jsxSingleQuote: false,
    printWidth: 100,
    useTabs: false,
    tabWidth: 4,
    trailingComma: 'es5',
    tailwindConfig: './tailwind.config.js',
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
};
