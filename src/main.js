import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { router } from './router'

import { 
	faTableCellsLarge as fasTableCellsLarge,
    faTableCells as fasTableCells,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    fasTableCellsLarge,
    fasTableCells,
	)

createApp(App).use( router ).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
