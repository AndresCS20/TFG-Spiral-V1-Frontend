<template>
    <div class="row g-4">
        <div class="col-sm-6 col-lg-4" v-for="member in listCommunitiesMembers" :key="member.id">
            <div class="card">
                <div class="ribbon" v-if="member.administrador"><i class="fa-solid fa-badge-sheriff"></i>&nbsp;Staff</div>
                <div class="h-80px rounded-top bannerpic" v-if="member.banner_pic" :style="`background-image: linear-gradient(to bottom, rgba(var(--bs-body-bg-rgb), 0.52), rgba(var(--bs-primary-rgb), 0.73)),url(${member.banner_pic})`"></div>
                <div class="h-80px rounded-top bannerpic" v-else style="background:linear-gradient(to right, rgb(0, 242, 96), rgb(5, 117, 230))"></div>

                <div class="card-body text-center pt-0">
                    <div class="avatar avatar-lg mt-n5 mb-3">
                        <div class="profile-pic-border rounded-circle"
                            style="background:linear-gradient(to right, #2193b0, #6dd5ed);width: fit-content;padding: 10px;margin: 0 auto;">
                            <img class="profile-pic rounded-circle"  :src="member.profile_pic" alt="profile" style="outline: 5px solid var(--bs-body-bg);width: 80px; height: 80px;"></div>
                    </div><span class="mb-0 row"><router-link :to="`/profile/${member.username}`" class="col-6 text-truncate m-auto fs-5">{{ member.fullname }}</router-link>
                        <small><i class="fa fa-at"></i>{{ member.username }}</small></span>
                    <div class="hstack gap-2 gap-xl-3 justify-content-center mt-3"><span>
                            <small>Fecha Union:</small><h6 class="mb-0">{{ this.moment(member.fecha_union).startOf('minute').fromNow() }}</h6>
                            </span>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <router-link class="btn btn-success btn-sm" :to="`/profile/${member.username}`">Ver Perfil&nbsp;<i class="fa-solid fa-right"></i></router-link>
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
    name: "CommunityMembersSubComponent",
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
        usuario :{},
        listCommunitiesMembers : [],
        moment: moment,
    }
},
created() {
  if(this.loggedIn){
    this.getCommunitiesMembers();
}

},
methods: {   
    getCommunitiesMembers() {
      API.get('/communities/members/'+this.communityShortnameParam)
          .then(response => {
          this.listCommunitiesMembers = response.data.body;
          })
          .catch(error => {
          console.error(error);
          });
      },

},

};
</script>