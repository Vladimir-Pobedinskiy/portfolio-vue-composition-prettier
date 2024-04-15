import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { router } from './router'
import { store } from './store'
import './assets/scss/main.scss'

import '@/plugins/iconify-vue'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

// Глобальные компоненты
import UIIcon from '@/components/UI/UIIcon'
import UIBreadcrumbs from '@/components/UI/UIBreadcrumbs'

const app = createApp(App)
app.use(router)
app.use(store)

if (app.config.globalProperties.$store) {
	app.config.globalProperties.$store.dispatch('getNavLinks')
}

const vfm = createVfm()
app.use(vfm)
app.use(VueDOMPurifyHTML)
app.use(autoAnimatePlugin)

// Регистрируем глобальные компоненты
app.component('UIIcon', UIIcon)
app.component('UIBreadcrumbs', UIBreadcrumbs)

app.mount('#app')
