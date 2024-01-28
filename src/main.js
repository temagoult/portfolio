import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import '../src/assets/index.css'
import "./style/style.css"
import 'vuetify/styles';
loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
