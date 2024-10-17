<template>
<div class="modal fade" id="createCommunityModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createCommunityModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Comunidad</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
          <div class="modal-body">
            <Form @submit="createCommunity" :validation-schema="schemaSettings">
              <div class="form-group mb-2">
                <label for="nombre_comunidad"><i class="fa-regular fa-input-text"></i>&nbsp;Nombre Comunidad</label>
                <Field name="nombre_comunidad" type="text" class="form-control" v-model="nombre_comunidad"/>
                <ErrorMessage name="nombre_comunidad" class="error-feedback" />
              </div>
              <div class="form-group my-2">
                <label for="nombre_completo_comunidad"><i class="fa-regular fa-input-text"></i>&nbsp;Nombre Completo Comunidad</label>
                <Field name="nombre_completo_comunidad" type="text" class="form-control" v-model="nombre_completo_comunidad"/>
                <ErrorMessage name="nombre_completo_comunidad" class="error-feedback" />
              </div>
              <div class="form-group my-2">
                <label for="descripcion"><i class="fa-regular fa-input-text"></i>&nbsp;Descripcion</label>
                <Field name="descripcion" type="text" class="form-control" v-model="descripcion"/>
                <ErrorMessage name="descripcion" class="error-feedback" />
              </div>

              <div class="form-group my-2">
          <label for="imagen_perfil"><i class="fa-regular fa-image"></i>&nbsp;Enlace Foto de Perfil</label>
          <Field name="imagen_perfil" type="text" class="form-control" placeholder="https://i.gifer.com/4KO.gif" v-model="imagen_perfil"/>
          <ErrorMessage name="imagen_perfil" class="error-feedback" />
          <p class="text-body-secondary">Formatos admitidos: PNG, JPG, JPEG y GIF</p>
        </div>

          

        <div class="form-group mt-2">
          <label for="imagen_portada"><i class="fa-regular fa-image"></i>&nbsp;Enlace Foto de Portada</label>
          <Field name="imagen_portada" type="text" class="form-control" placeholder="https://i.gifer.com/4KO.gif" v-model="imagen_portada"/>
          <ErrorMessage name="imagen_portada" class="error-feedback" />
          <p class="text-body-secondary">Formatos admitidos: PNG, JPG, JPEG y GIF</p>
        </div>

             
              
              <button class="btn btn-success btn-block me-2" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Crear Comnidad&nbsp;<i class="fa-solid fa-hexagon-plus"></i></span>
          </button></Form>
        <button type="button" class="btn btn-danger me2-2" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import API from "./../../../api";

export default {
  name: "CreateCommunitySubComponent",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schemaSettings = yup.object().shape({
      imagen_perfil: yup
        .string()
        .nullable()
        .max(200, "Debe tener como máximo 200 caracteres!")
        .url("La URL de la imagen no es válida")
        .test("avatar-extension", "La imagen debe ser un archivo PNG, JPG, JPEG o GIF", (value) => {
          if (!value) return true; // Si el campo está vacío, no se realiza la validación

          const supportedExtensions = [".png", ".jpg", ".jpeg",".gif"];
          const extension = value.substr(value.lastIndexOf(".")).toLowerCase();

          return supportedExtensions.includes(extension);
        }),
      imagen_portada: yup
        .string()
        .nullable()
        .max(200, "Debe tener como máximo 200 caracteres!")
        .url("La URL de la imagen no es válida")
        .test("avatar-extension", "La imagen debe ser un archivo PNG, JPG, JPEG o GIF", (value) => {
          if (!value) return true; // Si el campo está vacío, no se realiza la validación

          const supportedExtensions = [".png", ".jpg", ".jpeg",".gif"];
          const extension = value.substr(value.lastIndexOf(".")).toLowerCase();

          return supportedExtensions.includes(extension);
        }),       
      nombre_comunidad: yup
        .string()
        .required("Nombre comunidad es requerido!")
        .min(3, "Debe tener al menos 3 caracteres!")
        .max(100, "Debe tener como máximo 100 caracteres!"),
      nombre_completo_comunidad: yup
        .string()
        .required("Nombre completo comunidad es requerido!")
        .min(3, "Debe tener al menos 3 caracteres!")
        .max(100, "Debe tener como máximo 100 caracteres!"),        
        descripcion: yup
        .string()
        .nullable()
        .max(300, "Debe tener como máximo 300 caracteres!"),
    });

    return {
      usuario:{},
      successful: false,
      loading: false,
      message: "",
      schemaSettings,
      imagen_perfil:"",
      imagen_portada:"",
      nombre_comunidad: "",
      nombre_completo_comunidad: "",
      descripcion: "",
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
  methods: {
    showAlert() {
      this.$swal({
        icon: "success",
        title: "¡Perfecto!",
        text: "Has creado una nueva comunidad correctamente.",
        showConfirmButton: true,
      });
    },
    createCommunity() {
      const communityInfo = {
        nombre_comunidad: this.nombre_comunidad,
        nombre_completo_comunidad: this.nombre_completo_comunidad,
        descripcion: this.descripcion,
        imagen_perfil: this.imagen_perfil,
        imagen_portada: this.imagen_portada,
        username: this.currentUser.username,
      };

      API.post('/communities/create', communityInfo)
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
