import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#ef4444',
          secondary: '#dc2626',
          background: '#000000',
          surface: '#0a0a0a',
        },
      },
    },
  },
})