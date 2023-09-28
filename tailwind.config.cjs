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
                yellow: {
                    '900': '#78370F',
                    '800': '#92460E',
                    '700': '#B55B0A',
                    '600': '#E07A0E',
                    '500': '#FA9913',
                    '400': '#FFAB2D',
                    '300': '#FFC04E',
                    '200': '#FFDA8B',
                    '100': '#FFF0C8',
                    '50': '#FFFBEB',
                },
                gray: {
                    950: "#03060B",
                    900: "#0B111B",
                    800: "#171E2B",
                    700: "#293445",
                    600: "#3D485C",
                    500: "#606D83",
                    400: "#8692A8",
                    300: "##B5C1D5",
                    200: "#D0D9E7",
                    100: "#E8EDF5",
                    50: "#F9F9FA",
                }
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
