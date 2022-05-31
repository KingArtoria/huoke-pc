module.exports = {
  content: [],
  theme: {
    extend: {
      gap: {
        '15': '15px',
        '16': '16px',
        '20': '20px',
        '26': '26px',
      }
    },
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}
