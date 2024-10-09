/** @type {import('tailwindcss').Config} */
console.log('using tailwindcss config');
export default {
    content: ['./src/**/*.{ts,tsx,mdx}'],
    theme: {
        extend: {},
    },
    mode: 'jit',
};
