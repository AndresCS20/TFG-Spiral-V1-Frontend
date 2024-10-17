<template>
    <div class="col-md-8 grid-margin m-auto">
      <div class="card mb-3">
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
            <Publication :publicationList=listfollowingPublications v-if="publicationlistLength"></Publication>
    <div class="alert alert-primary d-flex align-items-center" v-else role="alert">
      <i class="fa-solid fa-empty-set me-2" style="font-size: 32px;"></i>
    No hay publicaciones disponibles todavia. Escribe tu la primera!
</div>
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
    name: "FollowingFeedSubComponent",
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
        listfollowingPublications : [],
        moment: moment,
        successful: false,
        loading: false,
        message: "",
        schemaSettings,
        publication: "",
        publicationlistLength: 0

    }
},
created() {
  if(this.loggedIn){
    this.getAllFollowingPublications();
}

},
watch: {
  loggedIn(newLoggedInStatus) {
    if (newLoggedInStatus) {
      this.getUserInfo();
      this.getAllFollowingPublications();
    }
  }
},
methods: {
    async createPublication() {
      try {
        const response = await API.post('/publications/createPublication', {
          username: this.currentUser.username,
          contenido: this.publication
        });
        response;
        // Actualizar las publicaciones después de la creación
        await this.getAllFollowingPublications();
      } catch (error) {
        console.error("Error al crear la publicación: ", error);
      }
    },

    async getAllFollowingPublications() {
      let username = this.currentUser.username;
      try {
        const response = await API.get('/publications/following/' + username);
        this.listfollowingPublications = response.data.body;
        this.publicationlistLength = this.listfollowingPublications.length
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>