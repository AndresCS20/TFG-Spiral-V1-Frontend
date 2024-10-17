<template>
    <div class="profile-header card rounded-3 overflow-hidden">
        <div class="cover">
            <div class="gray-shade"></div>
            <div class="profile-header-image" v-if="usuario.banner_pic" :style="{ background: `url(${usuario.banner_pic})` }"></div>
            <div class="profile-header-image" v-else style=" background: linear-gradient(to right, rgb(0, 242, 96), rgb(5, 117, 230));"></div>
            <div class="cover-body d-flex justify-content-between align-items-center">
                <div class="d-lg-flex d-sm-block profile-info-zone">
                  <div class="profile-pic-border rounded-circle" style="background: linear-gradient(to right, #2193b0, #6dd5ed);">
                    <img class="profile-pic" :src="usuario.profile_pic" alt="profile"></div>
                    <div class="profile-info ms-2 mt-4">
                        <h4 class="profile-name fw-bold">{{ usuario.fullname }}</h4>
                        <span class="profile-nick"><i class="fa fa-at" aria-hidden="true"></i>{{ usuario.username }}</span>
                        <p><span class="badge bg-info me-1"><i
                                    class="fa-duotone fa-person-walking-arrow-right"></i>&nbsp;{{ followersCount }} Seguidores</span><span
                                class="badge bg-info ms-1"><i
                                    class="fa-solid fa-person-walking-arrow-loop-left"></i>&nbsp;{{ followingCount }} Seguidos</span></p>
                    </div>
                </div>
                <div class="d-none d-md-block">
  <button class="btn btn-primary" @click="createFollower" v-if="!siguiendo && profileUsernameParam">
    <i class="fa-solid fa-user-check"></i>&nbsp;Seguir
  </button>
  <button class="btn btn-danger" @click="deleteFollower" v-else-if="siguiendo && profileUsernameParam">
    <i class="fa-solid fa-user-slash"></i>&nbsp;Dejar de seguir
  </button>
  <router-link class="btn btn-outline-primary" v-else-if="!profileUsernameParam" to="/settings">
    <i class="fa-solid fa-user-pen"></i>&nbsp;Editar perfil
  </router-link>
</div>
            </div>
        </div>
        <div class="header-links mt-3">
          <p></p>
        <ul class="nav nav-pills" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <a class="nav-link active" id="profile-publications-tab" data-bs-toggle="pill" data-bs-target="#profile-publications" type="button" role="tab" aria-controls="profile-publications" aria-selected="true"><i class="fa-solid fa-rectangle-vertical"></i>&nbsp;Publicaciones</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" id="profile-multimedia-tab" data-bs-toggle="pill" data-bs-target="#profile-multimedia" type="button" role="tab" aria-controls="profile-multimedia" aria-selected="false"><i class="fa-solid fa-rectangle-history-circle-user"></i>&nbsp;Multimedia</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" id="profile-communities-tab" data-bs-toggle="pill" data-bs-target="#profile-communities" type="button" role="tab" aria-controls="profile-communities" aria-selected="false"><i class="fa-solid fa-users"></i>&nbsp;Comunidades</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" id="profile-followers-tab" data-bs-toggle="pill" data-bs-target="#profile-followers" type="button" role="tab" aria-controls="profile-followers" aria-selected="false"><i class="fa-duotone fa-person-walking-arrow-right"></i>&nbsp;Lista Seguidores</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" id="profile-following-tab" data-bs-toggle="pill" data-bs-target="#profile-following" type="button" role="tab" aria-controls="profile-following" aria-selected="false"><i class="fa-solid fa-person-walking-arrow-loop-left"></i>&nbsp;Lista Seguidos</a>
  </li>
</ul>
        </div>
    </div>
    <p>{{ this.resultado }}</p>
</template>

<script>
import API from "./../../../api.js";
export default {
    name: "ProfileHeaderSubComponent",
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
        followersCount : {},
        followingCount : {},
        resultado : "",
        siguiendo: false
    }
},
created() {
  if(this.loggedIn){
    this.getUserInfo();
    this.getFollowersCount();
    this.getFollowingCount()
}

  if(this.profileUsernameParam){
    this.checkIfFollowing()
  }

  if(this.profileUsernameParam.toLowerCase() == this.currentUser.username.toLowerCase()){
    this.$router.push("/profile");
  }

},
watch: {
  loggedIn(newLoggedInStatus) {
    if (newLoggedInStatus) {
      this.getUserInfo();
      this.getFollowersCount();
      this.getFollowingCount()
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
    createFollower() {
    API.post('/follows/createfollow', {
      usernameFollower: this.currentUser.username,
      usernameFollowing: this.profileUsernameParam
    })
    .then(response => {
      this.response = response
      this.siguiendo = true; // Actualiza el estado a "siguiendo"
      this.getFollowersCount(); // Actualiza el valor de seguidores
      this.getFollowingCount(); // Actualiza el valor de seguidos
    })
    .catch(error => {
      console.error("Error al seguir al usuario:", error);
    });
    },
    
    deleteFollower() {
    API.delete('/follows/deletefollow', {
      data:{
      usernameFollower: this.currentUser.username,
      usernameFollowing: this.profileUsernameParam
      }
    })
    .then(response => {
      this.response = response
      this.siguiendo = false; // Actualiza el estado a "siguiendo"
      this.getFollowersCount(); // Actualiza el valor de seguidores
      this.getFollowingCount(); // Actualiza el valor de seguidos
    })
    .catch(error => {
      console.error("Error al dejar de seguir al usuario:", error);
    });
},

    getFollowersCount() {
      let username ="";
      if(this.profileUsernameParam && this.profileUsernameParam != this.currentUser.username) {
        username = this.profileUsernameParam;
      }
      else username = this.currentUser.username;
      API.get('/follows/followers/'+username+"/count")
          .then(response => {
          this.followerResponse = response.data.body;
          this.followersCount = this.followerResponse[0].followersCount;
          })
          .catch(error => {
          console.error(error);
          });
      },

      getFollowingCount() {
      let username ="";
      if(this.profileUsernameParam && this.profileUsernameParam != this.currentUser.username) {
        username = this.profileUsernameParam;
      }
      else username = this.currentUser.username;
      API.get('/follows/following/'+username+"/count")
          .then(response => {
          this.followingResponse = response.data.body;
          this.followingCount = this.followingResponse[0].followingCount;
          })
          .catch(error => {
          console.error(error);
          });
      },

  async checkIfFollowing() {
    try {
      const response = await API.post('/follows/isFollowing', {
        usernameFollower: this.currentUser.username,
        usernameFollowing: this.profileUsernameParam
      });
      this.check = response.data.body;
      this.siguiendo = this.check[0].isFollowing;
    } catch (error) {
      console.error("Error al comprobar el seguimiento:", error);
    }
  },
},

};
</script>