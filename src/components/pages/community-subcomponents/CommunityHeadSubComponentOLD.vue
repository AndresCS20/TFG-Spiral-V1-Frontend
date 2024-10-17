<template>
  <div class="w-100 hero p-3 position-relative d-block rounded-top-3"
    :style="`background-image: linear-gradient(to bottom, rgba(var(--bs-body-bg-rgb), 0.52), rgba(var(--bs-primary-rgb), 0.73)),url(${community.imagen_portada});background-size: cover;background-position: center; `">
    <div class="container">
      <div class="row">
        <div class="col-md-2 position-relative">
          <img alt="Avatar" class="inline-block align-top rounded-5" width="150" height="150"
            :src="community.imagen_perfil" style=" margin: 0 auto; display: block;">
        </div>
        <div class="col-md-10">
          <h1>{{ community.nombre_completo_comunidad }}</h1>
          <h4> <img src="../../../assets/images/spiral-green.png" class="logo-img" alt="logo-icon" width="24">/&nbsp;{{
            community.nombre_comunidad }}</h4>
          <p>{{ community.descripcion }}</p>
          <button class="btn btn-primary" @click="joinCommunity" v-if="!isMember"><i
              class="fa-solid fa-door-open"></i>&nbsp;Unirse</button>
          <button class="btn btn-danger me-2" @click="leaveCommunity" v-if="isMember"><i
              class="fa-solid fa-door-closed"></i> Salirse</button>
          <button class="btn btn-info mx-2" v-if="isMember && isStaff"><i class="fa-solid fa-pen-to-square"></i>
            Editar</button>
          <button class="btn btn-danger ms-2" v-if="isMember && isStaff"><i class="fa-solid fa-delete-right"></i> Borrar
            Comunidad</button>
        </div>
      </div>
    </div>
  </div>
  <div class="card bg-primary rounded-top-0 rounded-bottom-3 shadow-none position-relative">
    <div class="card-body px-4 py-2">
      <ul class="nav nav-pills p-3 rounded-2" id="myTab" role="tablist"
        style="background: var(--bs-body-bg); width: fit-content; margin: 0px auto;">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="communityFeed-tab" data-bs-toggle="pill" data-bs-target="#communityFeed" type="button" role="tab" aria-controls="communityFeed" aria-selected="true">
      <i class="fa-regular fa-memo"></i>&nbsp;Publicaciones
    </button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="memberslist-tab" data-bs-toggle="pill" data-bs-target="#memberslist" type="button" role="tab" aria-controls="memberslist" aria-selected="false">
      <i class="fa-solid fa-people-group"></i>&nbsp;Lista miembros
    </button>
  </li>
</ul>
    </div>
  </div>
  <p>{{ isMember }}</p>
  <p>{{ isStaff }}</p>
</template>
<script>
import API from "./../../../api.js";

export default ({
  name: "CommunityHeaderSubComponent",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    communityShortnameParam() {
      return this.$route.params.nombre;
    }
  },
  data() {
    return {
      community: {},
      isMember: "",
      isStaff: ""
    }
  },
  created() {
    if (this.loggedIn) {
      this.getCommunityInfo();
      this.userIsMember();
      this.userIsStaff();
    }
    else {
      //Redireccionar a login si no esta logeado
    }

  },
  watch: {
    loggedIn(newLoggedInStatus) {
      if (newLoggedInStatus) {
        this.getCommunityInfo();
      }
    }
  },
  methods: {

    joinCommunity() {
      API.post('/communities/joincommunity', {
        username: this.currentUser.username,
        nombre_comunidad: this.communityShortnameParam
      })
        .then(response => {
          this.response = response
          this.isMember = true;
        })
        .catch(error => {
          console.error("Error al unirse a la comunidad:", error);
        });
    },

    leaveCommunity() {
      API.delete('/communities/leavecommunity', {
        data: {
          username: this.currentUser.username,
          nombre_comunidad: this.communityShortnameParam
        }
      })
        .then(response => {
          this.response = response
          this.isMember = false;
        })
        .catch(error => {
          console.error("Error al dejar de la comunidad:", error);
        });
    },
    userIsStaff() {
      API.post('/communities/isstaff', {
        username: this.currentUser.username,
        nombre_comunidad: this.communityShortnameParam
      })
        .then(response => {
          this.isStaff = response.data.isStaff;
        })
        .catch(error => {
          console.error(error);
        });
    },
    userIsMember() {
      API.post('/communities/ismember', {
        username: this.currentUser.username,
        nombre_comunidad: this.communityShortnameParam
      })
        .then(response => {
          this.isMember = response.data.isMember;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getCommunityInfo() {
      let shortname = this.communityShortnameParam;
      API.get('/communities/' + shortname)
        .then(response => {
          this.community = response.data.body;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },

})
</script>
