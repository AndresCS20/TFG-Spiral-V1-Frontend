<template>
    <div class="tab-pane fade" id="v-pills-security" role="tabpanel" aria-labelledby="v-pills-security-tab" tabindex="0">
        <h3><i class="fa-regular fa-shield"></i>&nbsp;Ajustes de Seguridad</h3>
        <Form @submit="updateSecurity" :validation-schema="schemaSettings">
     <div class="form-group">
          <label for="newpassword"><i class="fa-solid fa-lock"></i>&nbsp;Contraseña nueva</label>
          <Field name="newpassword" type="password" class="form-control" v-model="newpassword"/>
          <ErrorMessage name="newpassword" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="renewpassword"><i class="fa-solid fa-lock-keyhole"></i>&nbsp;Repite la contraseña nueva</label>
          <Field name="renewpassword" type="password" class="form-control" v-model="repassword"/>
          <ErrorMessage name="renewpassword" class="error-feedback" />
        </div>
        <hr>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Actualizar datos de seguridad</span>
          </button>
        </div>
  
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
        </div>
      </Form>
      <hr>
        <div class="form-group">
             <label class="d-block"><i class="fa-solid fa-signature-lock"></i>&nbsp;Autenticación de dos factores (Proximamente)</label> 
             <button class="btn btn-info disabled" type="button">Habilitar la autenticación de dos factores</button>
        <p class="small text-muted mt-2">
            La autenticación de dos factores agrega una capa adicional de seguridad a su cuenta al requerir más que una contraseña para iniciar sesión.
        </p>
    </div>

</div></template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import API from "./../../../api";

export default {
  name: "SecuritySettingsSubComponent",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schemaSettings = yup.object().shape({
      newpassword: yup
        .string()
        .required("La contraseña antigua es requerida!")
        .min(6, "Debe de tener como minimo 6 caracteres!")
        .max(40, "Debe de tener como maximo 40 caracteres!"),
      renewpassword: yup
        .string()
        .required("La contraseña antigua es requerida!")
        .min(6, "Debe de tener como minimo 6 caracteres!")
        .max(40, "Debe de tener como maximo 40 caracteres!")
        .oneOf([yup.ref("newpassword"), null], "Las contraseñas deben coincidir"),
    });

    return {
      usuario:{},
      successful: false,
      loading: false,
      message: "",
      schemaSettings,
      newpassword: "",
      repassword: ""
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
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
  },
    showAlertUsername() {
      this.$swal({
        icon: "success",
        title: "¡Perfecto!",
        text: "Has actualizado tu contraseña correctamente. Recuerda iniciar sesión con tu nueva contraseña",
        showConfirmButton: false,
        timer: 5000
      });
    },
    updateSecurity() {
      const updatedSecurity = {
        password: this.newpassword,
      };

      API.patch('/usuarios/'+this.currentUser.username, updatedSecurity)
        .then(() => {
                this.showAlertUsername();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>