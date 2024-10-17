<template>
    <div class="row g-3">
        <div class="col-sm-6 col-lg-4" v-for="community in listuserCommunities" :key="community.id">
        <div class="card">
          <div class="h-80px rounded-top"
            :style="`background-image: linear-gradient(to bottom, rgba(var(--bs-body-bg-rgb), 0.52), rgba(var(--bs-primary-rgb), 0.73)),url(${community.imagen_portada});background-position:center;background-size:cover;background-repeat:no-repeat;height:80px; `">
          </div>
          <div class="card-body text-center pt-0">
            <div class="avatar avatar-lg mt-n5 mb-3">
              <img class="profile-pic avatar-img rounded-circle border border-white border-3 bg-white" width="80px"
                :src="community.imagen_perfil" style="width: 80px; height: 80px;">
            </div>
            <h5 class="mb-0 row">
              <router-link :to="`/community/${community.nombre_comunidad}`" class="col-12 text-truncate m-auto">{{
                community.nombre_completo_comunidad }}</router-link>
            </h5>
            <p>{{ community.nombre_comunidad }}</p>
            <div class="hstack gap-2 gap-xl-3 justify-content-center mt-3"><span>
                <h6 class="mb-0">{{community.num_miembros}}</h6><small>Miembros</small>
              </span>
              <div class="vr"></div><span><small>Fecha de union:</small>
                <h6 class="mb-0">{{ this.moment(community.fecha_union).format('L') }}</h6>
              </span>
            </div>
          </div>
          <div class="card-footer text-center">
            <router-link :to="`/community/${community.nombre_comunidad}`" class="btn btn-success btn-sm">Ver Comunidad</router-link>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import API from "./../../../api.js";
import moment from 'moment'
import 'moment/locale/es' // 

// Configura el idioma por defecto
moment.locale('es') // 

export default {
    name: "ProfileCommunitiesSubComponent",
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
        usuario :{},
        listuserCommunities : [],
        moment: moment,
    }
},
created() {
  if(this.loggedIn){
    this.getUserCommunities();
}

},
methods: {   
    getUserCommunities() {
        let username ="";
          if(this.profileUsernameParam && this.profileUsernameParam != this.currentUser.username) {
            username = this.profileUsernameParam;
          }
          else username = this.currentUser.username;
      API.get('/communities/user/'+username)
          .then(response => {
          this.listuserCommunities = response.data.communities;
          })
          .catch(error => {
          console.error(error);
          });
      },

},

};
</script>