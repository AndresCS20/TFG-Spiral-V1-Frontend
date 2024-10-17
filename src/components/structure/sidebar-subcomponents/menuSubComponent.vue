<template>

<div class="menu">
<li class="search-box" @click="closeSidebar">
    <i class='fa fa-magnifying-glass icon'></i>
    <input type="text" placeholder="Buscar...">
</li>



<ul class="menu-links ps-0">
    <li class="nav-link" v-if="!this.loggedIn">
        <router-link to="/" active-class="active">
            <i class='fa-solid fa-person-to-portal icon' ></i>
            <span class="text nav-text">Iniciar Sesión</span>
       </router-link>
    </li>
    <li class="nav-link" v-if="!this.loggedIn">
        <router-link to="/register" active-class="active">
            <i class='fa-solid fa-signature icon' ></i>
            <span class="text nav-text">Registrarse</span>
        </router-link>
    </li>
    <li class="nav-link" v-if="this.loggedIn">
        <router-link to="/" active-class="active">
            <i class='fa fa-earth-europe icon' ></i>
            <span class="text nav-text">Inicio</span>
        </router-link>
    </li>
   
    <li class="nav-link" v-if="this.loggedIn">
        <router-link to="/explore" active-class="active">
            <i class='fa fa-compass icon'></i>
            <span class="text nav-text">Explorar</span>
        </router-link>

    </li>

    <li class="nav-link" v-if="this.loggedIn">
        <router-link to="/communities" active-class="active">
            <i class='fa fa-people-group icon'></i>
            <span class="text nav-text">Comunidades</span>
        </router-link>
    </li>
    <li class="nav-link dropdown" active-class="active"  v-if="this.loggedIn && currentUser.roles[0] == 'ROLE_ADMIN'">
        <a class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-badge-sheriff icon"></i>
            <span class="text nav-text">Panel Admin</span>
        </a>
        <ul class="dropdown-menu w-100 p-2">
    <li><router-link to="/admin" active-class="active" class="dropdown-item" href="#">Inicio</router-link></li>
    <li><a class="dropdown-item" href="#">Usuarios</a></li>
    <li><a class="dropdown-item" href="#">Comunidades</a></li>
  </ul>

    </li>

    <li class="nav-link disabled" v-if="this.loggedIn">
        <router-link to="/notifications" active-class="active">
            <i class='fa fa-bell icon' ></i>
            <span class="text nav-text">Notificaciones</span>
        </router-link>
    </li> 
    <li class="nav-link disabled" v-if="this.loggedIn">
        <router-link to="/saves" active-class="active">
            <i class='fa fa-bookmark icon' ></i>
            <span class="text nav-text">Guardados</span>
        </router-link>
    </li>  
    <li class="nav-link">
        <router-link to="/example" active-class="active">
            <i class='fa fa-flask-vial icon'></i>
            <span class="text nav-text">Ejemplo</span>
        </router-link>
    </li>

</ul>
</div>

</template>
<script>
export default {
    name: 'menuSubComponent',
    computed: {
currentUser() {
return this.$store.state.auth.user;
},
loggedIn() {
return this.$store.state.auth.status.loggedIn;
}},
    data() {
            return {
                logeado: true,
                admin: true
            }
    },
    methods: {
            closeSidebar() {
                let sidebar = document.querySelector(".sidebar");
                let accordionButton = document.querySelector(".accordion-button");
                let accordioncollapse = document.querySelector(".accordion-collapse");
                sidebar.classList.remove("close");
                accordionButton.classList.add("collapsed");
                accordioncollapse.classList.remove("show");
            }

        }
}
</script>