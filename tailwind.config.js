module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
    }),
    colors: {
      white: '#ffffffff',
      blue: {
        medium: '#005c98',
        light: 'rgba(52, 124, 207, 0.14)',
      },
      black: {
        light: '##262626',
        faded: '#00000059',
      },
      gray: {
        base: '#616161',
        backgroud: '#fafafa',
        primary: '#dbdbdb',
      },
      red: {
        primary: '#ed4956',
      },
    },
    extend: {},
  },
  plugins: [],
};
