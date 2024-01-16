import { createRouter, createWebHistory } from 'vue-router';

import HomePageVue from './pages/HomePage.vue';
import ProjectsIndex from './pages/projects/Index.vue';
import ProjectsShow from './pages/projects/Show.vue';
import Contacts from './pages/Contacts.vue';
import NotFound from './pages/404.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePageVue,
        },
        {
            path: '/portfolio',
            name: 'projects.index',
            component: ProjectsIndex,
        },
        {
            path: '/portfolio/:slug',
            name: 'projects.show',
            component: ProjectsShow,
        },
        {
            path: '/contacts',
            name: 'contacts',
            component: Contacts,
        },
        {
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: NotFound,
		},
    ]
});

export { router };