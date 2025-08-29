/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        fontFamily: {
            'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
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
                blue: {
                    950: "#0A2F46",
                    900: "#0B4466",
                    800: "#0A5881",
                    700: "#0A6A9A",
                    600: "#0B84BE",
                    500: "#18A4DF",
                    400: "#41BDEF",
                    300: "#83D3F6",
                    200: "#BDE6FA",
                    100: "#E1F4FD",
                    50: "#F1F9FE",
                },
                yellow: {
                    950: "#3C1F08",
                    900: "#5F330B",
                    800: "#7F4A0E",
                    700: "#9E6208",
                    600: "#C88806",
                    500: "#E8AE0A",
                    400: "#F8C81B",
                    300: "#FBDC49",
                    200: "#FDED8B",
                    100: "#FDF8C4",
                    50: "#FEFCE8",
                },
                gray: {
                    950: "#03060B",
                    900: "#0B111B",
                    800: "#171E2B",
                    700: "#293445",
                    600: "#3D485C",
                    500: "#606D83",
                    400: "#8692A8",
                    300: "#B5C1D5",
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
