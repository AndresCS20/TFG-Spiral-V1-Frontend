import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router';
import store from "@/store";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Feed from './components/pages/FeedComponent.vue';
import Error from "./components/ErrorComponent.vue";
import Login from "./components/pages/LoginComponent.vue";
import Register from "./components/pages/RegisterComponent.vue";
import Settings from "./components/pages/SettingsComponent.vue";
import Community from "./components/pages/CommunityComponent.vue";
import Communities from "./components/pages/CommunitiesComponent.vue";
import Profile from "./components/pages/ProfileComponent.vue";
import Explore from "./components/pages/ExploreComponent.vue";
import Admin from "./components/pages/AdminHomeComponent.vue";
import Example from "./components/pages/ExampleComponent.vue";

import Color from "./components/ColorThiefComponent.vue";




const routes = [
    //{ path: '/', name: "Home", component: HelloWorld },
    { path: '/login', component: Login,meta: {title: 'Iniciar Sesión'}},
    { path: '/register', component: Register, meta: {title: 'Registrate'} },
    { path: '/settings', component: Settings, meta: {title: 'Ajustes'} },
    { path: '/communities', component: Communities, meta: {title: 'Comunidades'} },
    { path: '/community/:nombre?', component: Community, meta: {title: 'Comunidad'} },
    { path: '/explore', component: Explore, meta: {title: 'Explorar'}},
    { path: '/profile/:username?', component: Profile, meta:{title: `Perfil`}},
    { path: '/admin/', component: Admin, meta: {title: 'Panel Admin'} },
    { path: '/example', component: Example, meta: {title: 'Ejemplos'} },
   
    { path: '/color', component: Color, meta: {title: 'Color'} },

    //{ path: '/login', name: Login ,component: Login},
    //{ path: '/register', component: Register},
    //{ path: '/profile', name: Profile , component: Profile},
    {
      path: '/',
      component: () => {
        if (store.state.auth.status.loggedIn) {
          return Feed; // Ruta a Feed.vue
        } else {
          return Login; // Ruta a Login.vue
        }
      },
      key: store.state.auth.status.loggedIn ? 'feed' : 'login'

    },
    { path: '/:catchAll(.*)', component: Error, meta: {title: 'Error - Spiral'}} 
    //{ path : '/pagina/:id?', name:'pagina', component: Pagina }, 

];

const route = new createRouter({
    routes : routes,
    history : createWebHistory()
});

// route.beforeEach((to, from, next) => {
//   document.title = to.meta.title || 'Spiral'
//   next()
// });

route.beforeEach((to, from, next) => {
  const defaultTitle = 'Spiral'; // Título predeterminado para otras rutas
  const metaTitle = to.meta && to.meta.title; // Obtiene el meta título de la ruta actual

  document.title = metaTitle ? `${metaTitle} - ${defaultTitle}` : defaultTitle; // Establece el título de la página

  next();
});

const app = createApp(App);
app.use(store)
app.use(route)
app.mount('#app');
app.use(VueSweetalert2);
//createApp(App).mount('#app')
