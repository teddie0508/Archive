import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    container: {
      center: true,
      screens: {  
        DEFAULT: "100%",
        sm: "576px",
        md: "768px",
        lg: "970px",
        xl: "1170px",
      }
    },
    extend: {
      colors: {
        primary: "#ee1f23",
        secondary: "#666666",
        sub: "#EE1F23",
        border_primary: "#EE1F23",
        border_secondary: "#D1D1D1",
      },
      fontFamily: {
        sans: [
          '"Roboto"',
          "Arial",
          '"Helvetica Neue"',
          "Helvetica",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [typography, containerQueries],
} satisfies Config;
