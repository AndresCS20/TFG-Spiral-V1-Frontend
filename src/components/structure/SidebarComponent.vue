<template>
  <nav class="sidebar" id="sidebar">
  <header>
      <div class="image-text">
          <span class="image">
              <img src="../../assets/images/spiral.png" class="logo-img" alt="logo-icon">
          </span>

          <div class="text logo-text">
              <span class="logoname">Spiral</span>
              
          </div>
      </div>

      <i class='fa fa-chevron-right right toggle' id="togglebar" @click="toggleSidebar"></i>
  </header>

  <div class="menu-bar">
      <Menu></Menu>
                  <div class="bottom-content">
                      <div class="userzone mb-2">

                          

                          <div class="accordion" id="accordionExample" @click="openSidebar" v-if="this.loggedIn">
<div class="accordion-item border-0">
<h2 class="accordion-header">
<button class="accordion-button border-0 shadow-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
  <div class="d-flex items-center"><div class="position-relative w-10">
      <img alt="Avatar" class="inline-block align-top rounded-5 justify-content-start" width="48" height="48" :src=usuario.profile_pic></div>
      <div class="mx-4">
          <span class="fs-6 fw-bold text-body">{{usuario.fullname}}</span><br>
          <span class="fs-3 fw-semibold text-body"><i class="fa-solid fa-at"></i>{{usuario.username}}</span>
  </div></div>
</button>
</h2>
<div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample" style="">
  <div class="accordion-body d-grid gap-2">
  <router-link to="/profile" active-class="active" class="btn btn-outline-primary"><i class="fa-solid fa-head-side"></i>&nbsp;Perfil</router-link>
  <router-link to="/settings" active-class="active" class="btn btn-outline-info"><i class="fa-solid fa-user-gear"></i>&nbsp;Ajustes</router-link>
  <a @click.prevent="logOut" class="btn btn-danger"><i class="fa-solid fa-hexagon-xmark"></i>&nbsp;Cerrar Sesión</a>
</div>
</div>
</div>
<div class="accordion-item border-0" v-if="usuario.spotify_playlist"><h2 class="accordion-header"><button class="accordion-button border-0 shadow-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#spotify" aria-expanded="false" aria-controls="spotify"><div class="d-flex items-center"><div class="position-relative w-10"><img alt="Avatar" class="inline-block align-top rounded-5 justify-content-start" width="48" height="48" src="https://cdn-icons-png.flaticon.com/512/174/174872.png"></div><div class="mx-4 mt-3"><div class="fw-bold text-body fs-6">Spotify</div></div></div></button></h2><div id="spotify" class="accordion-collapse collapse" data-bs-parent="#spotify" style=""><div class="accordion-body p-1">
  <iframe style="border-radius:12px" :src="'https://open.spotify.com/embed/playlist/' + usuario.spotify_playlist + '?utm_source=generator&theme=0'" width="100%" height="152" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div></div></div>
</div>

</div>
                   <button type="button" class="btn btn-warning text-white w-100" data-bs-toggle="modal" data-bs-target="#themes"><i class="fa-solid fa-palette  text-white"></i> <span class="text nav-text text-white">Personalizar</span></button>
          
              </div>
  </div>
</nav>
</template>

<script>

import Menu from "./sidebar-subcomponents/menuSubComponent.vue"
import API from "./../../api.js";

export default {
name: 'SidebarComponent',
computed: {
currentUser() {
return this.$store.state.auth.user;
},
loggedIn() {
return this.$store.state.auth.status.loggedIn;
}
},
components: {
  Menu
},
data() {
  return {
      usuario :{}
  }
},
created() {
if(this.loggedIn){
  this.getUserInfo();
}

},
watch: {
  loggedIn(newLoggedInStatus) {
    if (newLoggedInStatus) {
      this.getUserInfo();
    }
  }
},
methods: {
  getUserInfo() {
  API.get('/usuarios/'+this.currentUser.username)
      .then(response => {
      this.usuario = response.data.body;
      })
      .catch(error => {
      console.error(error);
      });
  },
  toggleSidebar() {
  let sidebar = document.querySelector(".sidebar");
  if (sidebar !== null) {
    sidebar.classList.toggle("close");
    let accordionButton = document.querySelector(".accordion-button");
    let accordionCollapse = document.querySelector(".accordion-collapse");
    if (accordionButton !== null) {
      accordionButton.classList.add("collapsed");
    }
    if (accordionCollapse !== null) {
      accordionCollapse.classList.remove("show");
    }
  }
},
  // toggleSidebar() {
  //         let sidebar = document.querySelector(".sidebar");
  //         let accordionButton = document.querySelector(".accordion-button");
  //         let accordioncollapse = document.querySelector(".accordion-collapse");
  //         sidebar.classList.toggle("close");
  //         if (sidebar.classList.contains("close")) {
  //             accordionButton.classList.add("collapsed");
  //             accordioncollapse.classList.remove("show");                   
  //         }
  //     },
  openSidebar() {
      let sidebar = document.querySelector(".sidebar");
      sidebar.classList.remove("close");       
  },
  logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
  },
}
}
</script>