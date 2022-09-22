/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
			colors: {
				'primary': '#222831',
				'secondary': '#393E46',
				'accent': '#EEEEEE',
				'button': '#00ADB5',
			}
		},
  },
  plugins: [],
}
