console.log('using postcss config');
export default {
    purge: ['./{src}/**/*.{ts,tsx}'],
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
