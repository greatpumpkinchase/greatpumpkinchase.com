/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'beige': '#FFEDD6',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
