/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'beige': '#FFF4E6',
                orange: {
                    900: "#803313",
                    800: "#A44511",
                    700: "#C2550C",
                    600: "#EA6D0C",
                    500: "#F27D0F",
                    400: "#F89A3B",
                    300: "#FBBB73",
                    200: "#FFDAA9",
                    100: "#FFEDD5",
                    75: "#FFF4E6",
                    50: "#FFF7ED",
                },
            },
            aspectRatio: {
                '3/2': '3 / 2',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
}
