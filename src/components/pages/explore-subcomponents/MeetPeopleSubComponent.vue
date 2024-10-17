<template>
    <h2><i class="fa-solid fa-people"></i>&nbsp;Conoce gente nueva</h2>
    <div class="row g-4">
        <div class="col-sm-6 col-lg-3" v-for="usuario in listusuario" :key="usuario.id">
            <div class="card">
                <div class="h-80px rounded-top bannerpic" v-if="usuario.banner_pic" :style="`background-image: linear-gradient(to bottom, rgba(var(--bs-body-bg-rgb), 0.52), rgba(var(--bs-primary-rgb), 0.73)),url(${usuario.banner_pic})`"></div>
                <div class="h-80px rounded-top bannerpic" v-else style="background:linear-gradient(to right, rgb(0, 242, 96), rgb(5, 117, 230))"></div>

                <div class="card-body text-center pt-0">
                    <div class="avatar avatar-lg mt-n5 mb-3">
                        <div class="profile-pic-border rounded-circle"
                            style="background:linear-gradient(to right, #2193b0, #6dd5ed);width: fit-content;padding: 10px;margin: 0 auto;">
                            <img class="profile-pic rounded-circle"  :src="usuario.profile_pic" alt="profile" style="outline: 5px solid var(--bs-body-bg);width: 80px; height: 80px;"></div>
                    </div><span class="mb-0 row"><router-link :to="`/profile/${usuario.username}`" class="col-6 text-truncate m-auto fs-5">{{ usuario.fullname }}</router-link>
                        <small><i class="fa fa-at"></i>{{ usuario.username }}</small></span>
                    <div class="hstack gap-2 gap-xl-3 justify-content-center mt-3"><span>
                            <h6 class="mb-0">100</h6><small>Seguidores</small>
                        </span>
                        <div class="vr"></div><span>
                            <h6 class="mb-0">1000</h6><small>Seguidos</small>
                        </span>
                        <div class="vr"></div><span>
                            <h6 class="mb-0">40</h6><small>Publicaciones</small>
                        </span>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <router-link class="btn btn-success btn-sm" :to="`/profile/${usuario.username}`">Ver Perfil&nbsp;<i class="fa-solid fa-right"></i></router-link>
                </div>
            </div>
        </div>
        {{ followercount }}
</div></template>
<script>
import API from "./../../../api.js";

export default {
    name: "MeetPeopleSubComponent",
    computed:{
    currentUser() {
        return this.$store.state.auth.user;
    },
    loggedIn() {
        return this.$store.state.auth.status.loggedIn;
    }
},
  data() {
    return {
        listusuario :{},
        followercount :{},
    }
},
created() {
  if(this.loggedIn){
    this.getUsersInfo();
    this.getFollowerUser()
}

},
watch: {
  loggedIn(newLoggedInStatus) {
    if (newLoggedInStatus) {
      this.getUsersInfo();
    }
  }
},
methods: {
    getFollowerUser() {
    API.get('/follows/followers/'+"andres"+"/count")
        .then(response => {
        this.followercount = response.data.body.followerscount;

        // for (let i = 0; i < this.listusuario.length; i++) {
        //     this.listusuario[i].append
            
        // }
        })
        .catch(error => {
        console.error(error);
        });
    },    
  getUsersInfo() {
    API.get('/usuarios/')
        .then(response => {
        this.listusuario = response.data.body;

        // for (let i = 0; i < this.listusuario.length; i++) {
        //     this.listusuario[i].append
            
        // }
        })
        .catch(error => {
        console.error(error);
        });
    },
},
};
</script>