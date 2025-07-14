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
      },
    },
    extend: {
      colors: {
        primary: "#EC2326",
        secondary: "#DDC084",
        sub: "#FFD9D9",
        iris: {
          100: "#ECECEC",
          200: "#D1D1D1",
          300: "#888888",
          400: "#6B6B6B",
          500: "#222222",
        },
      },
      backgroundImage: {
        "red-gradient":
          "linear-gradient(180deg, rgba(236, 35, 38, 0.2) 0%, rgba(236, 35, 38, 0) 100%)",
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
