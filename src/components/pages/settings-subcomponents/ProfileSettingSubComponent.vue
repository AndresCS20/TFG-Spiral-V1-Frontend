<template>
    <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
      <h3><i class="fa-regular fa-user"></i>&nbsp;Ajustes de Perfil</h3>
      <hr>
      <Form @submit="updateProfile" :validation-schema="schemaSettings">

      <label class="mb-2"><i class="fa-solid fa-head-side"></i>&nbsp;Foto de Perfil</label>
      <div class="row">
        <div class="col-md-3">
          
          <img alt="Avatar" v-if="usuario.profile_pic" class="inline-block align-top rounded-circle justify-content-start" width="200" height="200" :src="usuario.profile_pic">
          <div class="profile-header-image rounded-circle" v-else style=" background: linear-gradient(to right, rgb(0, 242, 96), rgb(5, 117, 230)); width:200px; height: 200px;text-align: center;line-height: 200px;">Sin imagen</div>
        </div>
        <div class="col-md-8">
          <!--<h6>Archivo menor a 5MB y un tamaño al menos de 200x200 pixeles</h6>-->
          <p class="text-body-secondary">Formatos admitidos: PNG, JPG, JPEG y GIF</p>
          <div class="d-flex align-items-center">
            <!--Upload Button -->
            <div class="position-relative w-100">
              <div class="form-group">
          <label for="profile_pic"><i class="fa-regular fa-head-side"></i>&nbsp;Enlace Foto de Perfil</label>
          <Field name="profile_pic" type="text" class="form-control" placeholder="https://i.gifer.com/4KO.gif" v-model="profile_pic"/>
          <ErrorMessage name="profile_pic" class="error-feedback" />
        </div>
              <!--<input type="file" class="d-none w-0 h-0 position-absolute">
              <label for="profile-upload" data-tippy-placement="bottom" data-tippy-content="Subir imagen" class="btn btn-primary me-3 disabled">Subir Imagen</label>-->
            </div>
          </div>
        </div>
      </div>
  
      <hr>
      <label class="mb-2"><i class="fa-solid fa-image"></i>&nbsp;Foto de Portada</label>
      <div class="row">
        <div class="col-md-5">
          <div v-if="usuario.banner_pic"  :style="`background: url(${usuario.banner_pic}); background-size: cover;background-position: center;height: 150px;`"  class="profile-header-image w-100 img-fluid rounded"></div>
          <div class="profile-header-image rounded" v-else style=" background: linear-gradient(to right, rgb(0, 242, 96), rgb(5, 117, 230)); height: 150px;text-align: center;line-height: 150px;">Sin imagen</div>

        </div>
        <div class="col-md-5">
          <!--<h6 class="text-decoration-line-through">Archivo menor a 15MB y un tamaño al menos de 600x300 pixeles</h6>-->
          <p class="text-body-secondary">Formatos admitidos: PNG, JPG, JPEG y GIF</p>
          <div class="d-flex align-items-center">
            <!--Upload Button -->
            <div class="position-relative w-100">
              <div class="form-group">
          <label for="banner_pic"><i class="fa-regular fa-image"></i>&nbsp;Enlace Foto de Portada</label>
          <Field name="banner_pic" type="text" class="form-control" placeholder="https://i.gifer.com/4KO.gif" v-model="banner_pic"/>
          <ErrorMessage name="banner_pic" class="error-feedback" />
        </div>
              <!--<input type="file" class="d-none w-0 h-0 position-absolute">
              <label for="profile-upload" data-tippy-placement="bottom" data-tippy-content="Subir imagen" class="btn btn-primary me-3 disabled">Subir Imagen</label>-->
            </div>
          </div>
        </div>
      </div>
  
      <hr>
        <div class="form-group">
          <label for="fullname"><i class="fa-regular fa-input-text"></i>&nbsp;Nombre Completo</label>
          <Field name="fullname" type="text" class="form-control" v-model="nombreCompleto"/>
          <ErrorMessage name="fullname" class="error-feedback" />
        </div>
  <hr>
  <div class="form-group">
          <label for="bio"><i class="fa-solid fa-book-user"></i>&nbsp;Biografía</label>
          <textarea name="bio" type="textarea" class="form-control mb-2" id="bio" rows="3" v-model="biografia"/>
          <ErrorMessage name="bio" class="error-feedback" />
        </div>
         <hr>
        <div class="form-group">
          <label for="ubication"><i class="fa fa-map-pin"></i>&nbsp;Ubicación</label>
          <Field name="ubication" type="text" class="form-control" v-model="ubicacion"/>
          <ErrorMessage name="ubication" class="error-feedback" />
        </div>
        <hr>
        <div class="form-group">
          <label for="spotify_playlist"><i class="fa fa-brands fa-spotify" aria-hidden="true"></i>&nbsp;Lista de Reproducción de Spotify</label>
          <Field name="spotify_playlist" type="text" class="form-control" v-model="listaSpotify"/>
          <ErrorMessage name="spotify_playlist" class="error-feedback" />
        </div>
        <hr>
        <div class="form-group">
          <label for="link"><i class="fa-solid fa-link"></i>&nbsp;Enlace</label>
          <Field name="link" type="text" class="form-control" v-model="enlace"/>
          <ErrorMessage name="link" class="error-feedback" />
        </div>
        <hr>
        <div class="form-group">
          <label for="interest"><i class="fa fa-gamepad" aria-hidden="true"></i>&nbsp;Intereses / Hobbies</label>
          <Field name="interest" type="text" class="form-control" v-model="hobbies"/>
          <ErrorMessage name="interest" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Actualizar datos</span>
          </button>
        </div>
  
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
        </div>
      </Form>
    </div>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import API from "./../../../api";
  
  export default {
    name: "ProfileSettingsSubComponent",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const schemaSettings = yup.object().shape({
        profile_pic: yup
          .string()
          .nullable()
          .min(5, "Debe tener al menos 5 caracteres!")
          .max(200, "Debe tener como máximo 200 caracteres!")
          .url("La URL de la imagen no es válida")
          .test("avatar-extension", "La imagen debe ser un archivo PNG, JPG, JPEG o GIF", (value) => {
            if (!value) return true; // Si el campo está vacío, no se realiza la validación

            const supportedExtensions = [".png", ".jpg", ".jpeg",".gif"];
            const extension = value.substr(value.lastIndexOf(".")).toLowerCase();

            return supportedExtensions.includes(extension);
          }),
        banner_pic: yup
          .string()
          .nullable()
          .min(5, "Debe tener al menos 5 caracteres!")
          .max(200, "Debe tener como máximo 200 caracteres!")
          .url("La URL de la imagen no es válida")
          .test("avatar-extension", "La imagen debe ser un archivo PNG, JPG, JPEG o GIF", (value) => {
            if (!value) return true; // Si el campo está vacío, no se realiza la validación

            const supportedExtensions = [".png", ".jpg", ".jpeg",".gif"];
            const extension = value.substr(value.lastIndexOf(".")).toLowerCase();

            return supportedExtensions.includes(extension);
          }),       
        fullname: yup
          .string()
          .required("Nombre completo es requerido!")
          .min(3, "Debe tener al menos 3 caracteres!")
          .max(100, "Debe tener como máximo 100 caracteres!"),
          bio: yup
          .string()
          .nullable()
          .max(300, "Debe tener como máximo 300 caracteres!"),
          ubication: yup
          .string()
          .nullable()
          .max(100, "Debe tener como máximo 100 caracteres!"),
          spotify_playlist: yup
          .string()
          .nullable()
          .max(40, "Debe tener como máximo 40 caracteres!"),
          link: yup
          .string()
          .nullable()
          .max(100, "Debe tener como máximo 100 caracteres!"),
          interest: yup
          .string()
          .nullable()
          .max(100, "Debe tener como máximo 100 caracteres!"),
      });
  
      return {
        usuario:{},
        successful: false,
        loading: false,
        message: "",
        schemaSettings,
        profile_pic:"",
        banner_pic:"",
        nombreCompleto: "",
        biografia: "",
        ubicacion: "",
        listaSpotify: "",
        enlace: "",
        hobbies: "",
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      currentUser() {
        return this.$store.state.auth.user;
    },
    },
    mounted() {
      if (!this.loggedIn) {
        this.$router.push("/login");
      }
    },
    created() {
if(this.loggedIn){
  this.getUserInfo();
  
}

},
    methods: {
      showAlert() {
        this.$swal({
          icon: "success",
          title: "¡Perfecto!",
          text: "Has actualizado los datos del perfil correctamente.",
          showConfirmButton: true,
        });
      },
      getUserInfo() {
        API.get('/usuarios/'+this.currentUser.username)
      .then(response => {
      this.usuario = response.data.body;
      this.nombreCompleto= this.usuario.fullname;
      this.profile_pic = this.usuario.profile_pic;
      this.banner_pic = this.usuario.banner_pic;
      this.biografia = this.usuario.bio;
      this.ubicacion = this.usuario.ubication;
      this.listaSpotify = this.usuario.spotify_playlist,
      this.enlace = this.usuario.link,
      this.hobbies = this.usuario.interests
      })
      .catch(error => {
      console.error(error);
      });
  },
      updateProfile() {
        const updatedProfile = {
          profile_pic: this.profile_pic,
          banner_pic: this.banner_pic,
          fullname: this.nombreCompleto,
          bio: this.biografia,
          ubication: this.ubicacion,
          spotify_playlist: this.listaSpotify,
          link: this.enlace,
          interests: this.hobbies,
        };
  
          API.patch('/usuarios/'+this.currentUser.username, updatedProfile)
          .then(() => {
            this.showAlert();
            })
          .catch((error) => {
            console.error(error);
            });
      },
    },
  };
  </script>
  