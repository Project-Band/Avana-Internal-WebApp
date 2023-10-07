/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
       "primary": "#1772a2",
       "secondary": "#00a2f8",
       "white0": "#f9f9f9",
       "white50": "#f6f5f5",
       "white100": "#e7e6e6",
       "black150": "#151414",
       "black100": "#3e3b3b",
       "grey100": "#605a5b",
       "grey50": "#b2aeaf",
       "green": "#17a236",
       "red": "#a21717"
      },
      "fontSize": {
       "sm": "0.75rem",
       "base": "1rem",
       "lg": "1.25rem",
       "xl": "1.5rem",
       "2xl": "1.75rem",
       "3xl": "2.625rem"
      },
      fontFamily: {
        sans: ['var(--font-ayuthaya)']
      },
    extend: {
      "borderRadius": {
        "none": "0",
        "xs": "0.8125rem",
        "sm": "1rem",
        "default": "1.25rem",
        "lg": "1.5rem",
        "xl": "1.75rem",
        "2xl": "2.125rem"
       },
    },
  },
  plugins: [],
}
