import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

import { createRouter, createWebHistory, useRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ProfileView from './views/ProfileView.vue'
import RecipeCreateView from './views/RecipeCreateView.vue'
import RecipeView from './views/RecipeView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/profile', component: ProfileView },
    { path: '/recipe/:ident', component: RecipeView },
    { path: '/recipe/create', component: RecipeCreateView }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).use(Autocomplete).mount('#app');