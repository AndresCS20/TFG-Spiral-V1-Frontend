<template>
    <div class="col-md-8 grid-margin m-auto">
                <h2><i class="fa-regular fa-earth-europe"></i>&nbsp;Publicaciones Globales</h2>
                <Publication :publicationList=listAllPublications></Publication>
            </div>
</template>

<script>
import API from "./../../../api.js";
import Publication from "./../global-subcomponents/publicationSubComponent.vue";
import moment from 'moment'
import 'moment/locale/es' 

// Configura el idioma por defecto
moment.locale('es') 
export default {
    name: "GlobalFeedSubComponent",
    components:{
      Publication
    },
    computed: {
  currentUser() {
    return this.$store.state.auth.user;
  },
  loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  }
},
  data() {
    return {
        usuario :{},
        listAllPublications : {},
        moment: moment,

    }
},
created() {
  if(this.loggedIn){
    this.getUserInfo();
    this.getAllPublications();
}

},
watch: {
  loggedIn(newLoggedInStatus) {
    if (newLoggedInStatus) {
      this.getUserInfo();
      this.getAllPublications();
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

    getAllPublications() {

      API.get('/publications/')
          .then(response => {
          this.listAllPublications = response.data.body;
          })
          .catch(error => {
          console.error(error);
          });
      },

},

};
</script>