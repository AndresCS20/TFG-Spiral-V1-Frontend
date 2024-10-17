<template>
    <div class="card rounded mb-3" v-if="isMember">
        <div class="card-body">
                    <h3>Nueva Publicación</h3>
                    <Form @submit="createPublication" :validation-schema="schemaSettings">
                      <div class="form-floating">
          <textarea name="publication" type="textarea" class="form-control mb-2" id="bio" rows="3" v-model="publication" style="height: 140px;"/>
          <label for="publication"><i class="fa-solid fa-comment"></i>&nbsp;Comparte tus pensamientos...</label>
          <ErrorMessage name="publication" class="error-feedback" />
        </div>
                <div class="d-flex align-items-center gap-2">

                    <div class="btn-group">
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#imageModal"><i class="fa fa-image" aria-hidden="true"></i>&nbsp;Imagen</button>
                        <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#videoModal"><i class="fa fa-video-camera" aria-hidden="true"></i>&nbsp;Video</button>
                    </div>
                    <button class="btn btn-primary btn-block ms-auto" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Publicar&nbsp;<i class="fa-solid fa-paper-plane-top"></i></span>
          </button>
                </div>
                <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
            </div>
              </Form>
            </div>
    </div>
    <Publication :publicationList=listCommunity v-if="publicationlistLength"></Publication>
    <div class="alert alert-primary d-flex align-items-center" v-else role="alert">
      <i class="fa-solid fa-empty-set me-2" style="font-size: 32px;"></i>
    <span v-if="isMember">No hay publicaciones disponibles todavia. Escribe tu la primera!</span>
    <span v-else>Esta comunidad no tiene publicaciones disponibles todavia. Unete y escribe tu la primera!</span>
</div>
    </template>
<script>
import Publication from "./../global-subcomponents/publicationSubComponent.vue";
import { Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import API from "./../../../api.js";
import moment from 'moment'
import 'moment/locale/es' 

// Configura el idioma por defecto
moment.locale('es') 
export default {
    name: "CommunityFeedSubComponent",
    components: {
      Form,
      ErrorMessage,
      Publication
    },
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
    const schemaSettings = yup.object().shape({
          publication: yup
          .string()
          .min(3, "Debe de tener como minimo 3 caracteres!")
          .max(300, "Debe tener como máximo 300 caracteres!"),
      });
    return {
        usuario :{},
        listCommunity : [],
        moment: moment,
        successful: false,
        loading: false,
        message: "",
        schemaSettings,
        publication: "",
        isMember: "",
        publicationlistLength: 0

    }
},
created() {
  if(this.loggedIn){
    this.getAllCommunityPublications();
    this.userIsMember();

}

},
watch: {
  loggedIn(newLoggedInStatus) {
    if (newLoggedInStatus) {
      this.getUserInfo();
      this.getAllCommunityPublications();
    }
  }
},
methods: {
    async createPublication() {
  try {
    const response = await API.post('/communities/publications/create', {
      username: this.currentUser.username,
      contenido: this.publication,
      nombre_comunidad: this.communityShortnameParam
    });

    // Realizar otras acciones después de la creación de la publicación
    response;

    await this.getAllCommunityPublications();
  } catch (error) {
    console.error("Error al crear la publicación: ", error);
  }
},
    getAllCommunityPublications() {
      let nombre_comunidad = this.communityShortnameParam
      API.get('/communities/publications/community/'+nombre_comunidad)
          .then(response => {
          this.listCommunity = response.data.body;
          this.publicationlistLength = this.listCommunity.length
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

},

};
</script>