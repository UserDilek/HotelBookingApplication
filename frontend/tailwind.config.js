/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors :{
        mainColor: {
          DEFAULT: "#88BDBC",
        },
        red:{
          DEFAULT:"#FF5733"
        }
    
      }
    },
    
  },
  plugins: [],
}

