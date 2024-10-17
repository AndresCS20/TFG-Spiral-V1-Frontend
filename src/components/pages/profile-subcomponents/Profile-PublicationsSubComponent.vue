<template>
          <div class="row">
            <div class="col-md-12 grid-margin">
              <Publication :publicationList=listuserPublications></Publication>
          </div>
        </div>
</template>

<script>
import API from "./../../../api.js";
import Publication from "./../global-subcomponents/publicationSubComponent.vue";
import moment from 'moment'
import 'moment/locale/es' // 

// Configura el idioma por defecto
moment.locale('es') // 

export default {
    name: "ProfilePublicationSubComponent",
    components:{
      Publication
    },
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
        listuserPublications : {},
        moment: moment,
    }
},
created() {
  if(this.loggedIn){
    this.getUserInfo();
    this.getUserPublications();
}

},
watch: {
  loggedIn(newLoggedInStatus) {
    if (newLoggedInStatus) {
      this.getUserInfo();
      this.getUserPublications();
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

    getUserPublications() {
      let username ="";
      if(this.profileUsernameParam && this.profileUsernameParam != this.currentUser.username) {
        username = this.profileUsernameParam;
      }
      else username = this.currentUser.username;
      API.get('/publications/'+username)
          .then(response => {
          this.listuserPublications = response.data.body;
          })
          .catch(error => {
          console.error(error);
          });
      },

},

};
</script>