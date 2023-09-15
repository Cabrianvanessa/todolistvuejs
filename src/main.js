/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'


/* add icons to the library */
library.add(faUserSecret)

const app = createApp(App)

registerPlugins(app)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
