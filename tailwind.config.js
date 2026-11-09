/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#310B18',
          light: '#4B1627',
          dark: '#1D060E',
          deep: '#150308',
        },
        midnight: {
          DEFAULT: '#100C0D',
          surface: '#181315',
          card: '#22191C',
          lighter: '#2C2226',
        },
        gold: {
          DEFAULT: '#D6AD60',
          light: '#F4D89A',
          dark: '#B08838',
          shimmer: '#FFE8A8',
        },
        marigold: {
          DEFAULT: '#E89A27',
          light: '#F7B34D',
          dark: '#BF7810',
          fire: '#FF6F1E',
        },
        ivory: {
          DEFAULT: '#F5EBDD',
          muted: '#C8BEAE',
          dim: '#8E8373',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Poppins"', '"Inter"', 'system-ui', 'sans-serif'],
        hindi: ['"Rozha One"', '"Yatra One"', '"Poppins"', 'serif'],
      },
      backgroundImage: {
        'royal-gradient': 'radial-gradient(ellipse at top, #4B1627 0%, #1D060E 45%, #100C0D 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #F4D89A 0%, #D6AD60 50%, #B08838 100%)',
        'gold-border': 'linear-gradient(90deg, rgba(214,173,96,0) 0%, rgba(214,173,96,0.8) 50%, rgba(214,173,96,0) 100%)',
        'carpet-gradient': 'linear-gradient(180deg, rgba(75, 22, 39, 0.9) 0%, rgba(31, 6, 14, 0.98) 100%)',
      },
      boxShadow: {
        'diya': '0 0 40px 10px rgba(232, 154, 39, 0.4), 0 0 80px 25px rgba(214, 173, 96, 0.2)',
        'diya-lg': '0 0 70px 20px rgba(232, 154, 39, 0.55), 0 0 120px 45px rgba(214, 173, 96, 0.3)',
        'gold-glow': '0 0 25px -2px rgba(214, 173, 96, 0.4)',
        'royal-card': '0 12px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(214, 173, 96, 0.2)',
      },
      animation: {
        'flicker': 'flicker 2.5s infinite ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) translateY(0)', opacity: '0.95', filter: 'drop-shadow(0 0 12px #E89A27)' },
          '25%': { transform: 'scale(1.05) translateY(-2px) skewX(1deg)', opacity: '1', filter: 'drop-shadow(0 0 20px #FF6F1E)' },
          '50%': { transform: 'scale(0.97) translateY(1px)', opacity: '0.9', filter: 'drop-shadow(0 0 10px #E89A27)' },
          '75%': { transform: 'scale(1.03) translateY(-1px) skewX(-1deg)', opacity: '0.98', filter: 'drop-shadow(0 0 18px #F7B34D)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

