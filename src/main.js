// Vuetify's CSS reset must load before the app's styles, otherwise its `[type="button"] { color: inherit }`
// beats same-specificity app classes like .btn-primary (white text turned black on <button>s).
import 'vuetify/styles'
import './assets/main.css'
import 'primeicons/primeicons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            // Vuetify ships its own .bg-primary/.text-primary utilities, so keep them in sync with the Tailwind brand color.
            light: { colors: { primary: '#309689' } },
        },
    },
})

const app = createApp(App)
app.use(vuetify)
// Pinia must be installed before the router: the navigation guard reads the auth store.
app.use(createPinia())
app.use(router)
app.use(Toast)


app.mount('#app')
