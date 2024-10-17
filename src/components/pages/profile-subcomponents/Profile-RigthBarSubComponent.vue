<template>
      <div class="d-none d-md-block col-md-5 col-xl-4 right-wrapper">
         <h2 class="fw-bolder mb-3"><i class="fa-solid fa-circle-info"></i>&nbsp;Sobre mi</h2>
        <div class="card rounded">
          <div class="card-body">
            <ul class="list-unstyled mb-0" v-if="usuario.bio || usuario.ubication || usuario.link || usuario.interests">
              <li class="mb-2" v-if="usuario.bio">
                <span class="d-flex align-items-center gap-3 mb-2"><i class="fa-solid fa-book-user fs-6"></i>
                <h6 class="fs-4 fw-semibold mb-0">Biografia</h6></span>
                <p>{{ usuario.bio }}</p>
              </li>
              <li class="d-flex align-items-center gap-3 mb-2" v-if="usuario.ubication">
                <i class="fa-solid fa-map-pin fs-6"></i>
                <h6 class="fs-4 fw-semibold mb-0">{{usuario.ubication}}</h6>
              </li>
              <li class="d-flex align-items-center gap-3 mb-4" v-if="usuario.link">
                <i class="fa-solid fa-link fs-6"></i>
                <a :href="usuario.link" target="_blank" rel="noopener noreferrer" class="fs-4 fw-semibold mb-0">{{usuario.link}}</a>
              </li>
              <li class=" align-items-centermb-4" v-if="usuario.interests">

                <span class="mb-0 d-flex gap-3 "><i class="fa-solid fa-game-console-handheld fs-6"></i>
                  <h6 class="fs-4 fw-semibold">Intereses:</h6>
                </span>
                <p>{{usuario.interests}}</p>
              </li>
            </ul>
            <span v-else>
              <p class="alert alert-info text-center" v-if="this.currentUser.username == this.profileUsernameParam || !this.profileUsernameParam">No tienes ningun tipo de información
                 para mostrar aqui (Biografia,Ubicacion, Enlace o Intereses/Hobbies)<br>ve a los ajustes para modificar estos campos. <br>
              <a href="/settings" class="btn btn-primary">Ir a los Ajustes</a>
              </p>
              <p v-else class="alert alert-info">{{ usuario.fullname }} no tiene ningun tipo de información que mostrar.</p>
            </span>
          </div>
        </div>
      </div>
</template>

<script>

import API from "./../../../api.js";
export default {
    name: "RightBarSubComponent",
    computed: {
  currentUser() {
    return this.$store.state.auth.user;
  },
  loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  },
    profileUsernameParam(){
        return this.$route.params.username;
    }
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
    let username ="";
    if(this.profileUsernameParam && this.profileUsernameParam != this.currentUser.username) {
      username = this.profileUsernameParam;
    }
    else username = this.currentUser.username;
    API.get('/usuarios/'+username)
        .then(response => {
        this.usuario = response.data.body;
        })
        .catch(error => {
        console.error(error);
        });
    },
},

};
</script>