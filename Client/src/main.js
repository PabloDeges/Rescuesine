import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

import { createMemoryHistory, createRouter, useRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ProfileView from './views/ProfileView.vue'
import RecipeView from './views/RecipeView.vue'
import LoginView from './views/LoginView.vue'
import RecipeCreateView from './views/RecipeCreateView.vue'



const routes = [
  { path: '/', component: HomeView },
  { path: '/profile', component: ProfileView },
  { path: '/recipe', component: RecipeView },
  { path: '/login', component: LoginView },
  { path: '/recipe/create', component: RecipeCreateView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


createApp(App).use(router).use(Autocomplete).mount('#app');



