import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "ucla-blue": "#4d7298",
        "air-blue": "#77A6B6",
        "light-blue": "#9DC3C2",
        "light-dark-blue": "#8DB9B8",
        "celadon": "#B3D89C",
        "tea-green": "#D0EFB1",
        "ucla-dark-blue": "#3E5C7A",
      }
    },
  },
  plugins: [],
}
export default config
