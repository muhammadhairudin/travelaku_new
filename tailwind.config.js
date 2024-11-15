import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3D59',
        secondary: '#E8B75D',
        accent: '#2D6187',
        neutral: '#F5E6CC',
        'base-100': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        travelaku: {
          "primary": "#1E3D59",
          "secondary": "#E8B75D",
          "accent": "#2D6187",
          "neutral": "#F5E6CC",
          "base-100": "#FFFFFF",
          "base-content": "#1E3D59",
          "info": "#2D6187",
          "success": "#40A798",
          "warning": "#E8B75D",
          "error": "#FF6B6B",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
  },
}
