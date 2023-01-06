module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'fluid':'repeat(auto-fill,minmax(250px,1fr))'
      }
    },
  },
  plugins: [],
}