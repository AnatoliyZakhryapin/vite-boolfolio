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
    faFilter as fasFilter,
} from '@fortawesome/free-solid-svg-icons'

import { 
	faSquare as farSquare,
} from '@fortawesome/free-regular-svg-icons'

library.add(
    fasTableCellsLarge,
    fasTableCells,
    farSquare,
    fasFilter
	)

createApp(App).use( router ).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
