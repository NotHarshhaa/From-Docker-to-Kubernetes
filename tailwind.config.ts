import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'bounce-slow': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '.7'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(-4px)',
          },
          '50%': {
            transform: 'translateY(4px)',
          },
        },
        'glow': {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(66, 153, 225, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 25px rgba(66, 153, 225, 0.8)',
          },
        },
        'rotate-icon': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'bounce-slow': 'bounce-slow 2s infinite',
        'pulse-slow': 'pulse-slow 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'rotate-icon': 'rotate-icon 2s linear'
      }
    }
  },
  plugins: []
} satisfies Config 