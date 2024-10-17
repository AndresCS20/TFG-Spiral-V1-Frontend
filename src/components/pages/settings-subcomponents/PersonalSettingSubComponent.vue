<template>
    <div class="tab-pane fade" id="v-pills-personal" role="tabpanel" aria-labelledby="v-pills-personal-tab" tabindex="0">
        <h3><i class="fa-regular fa-cog"></i>&nbsp;Ajustes Personales</h3>
        <hr>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Cuidado!</strong> Piensatelo bien antes de cambiar de nombre de usuario, recuerda que la proxima vez que inicies sesión lo haras con ese nuevo usuario.
            Ademas de que quedará libre para cualquiera.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <Form @submit="updatePersonal" :validation-schema="schemaSettings">
        <div class="form-group">
          <label for="username"><i class="fa-regular fa-input-text"></i>&nbsp;Nombre Usuario</label>
          <Field name="username" type="text" class="form-control" v-model="nombreUsuario"/>
          <ErrorMessage name="username" class="error-feedback" />
        </div>
  <hr>
     <div class="form-group">
          <label for="oldemail"><i class="fa-light fa-at"></i>&nbsp;Email Actual</label>
          <input name="oldemail" disabled type="text" class="form-control" v-model="oldemail"/>
        </div>
        <div class="form-group mt-3">
          <label for="email"><i class="fa-solid fa-at"></i>&nbsp;Email Nuevo</label>
          <Field name="email" type="text" class="form-control" v-model="email"/>
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <hr>
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
  name: "PersonalSettingsSubComponent",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schemaSettings = yup.object().shape({
      username: yup
        .string()
        .required("Nombre completo es requerido!")
        .min(3, "Debe tener al menos 3 caracteres!")
        .max(50, "Debe tener como máximo 50 caracteres!"),
        email: yup
        .string()
        .max(50, "Debe tener como máximo 50 caracteres!"),
    });

    return {
      usuario:{},
      successful: false,
      loading: false,
      message: "",
      schemaSettings,
      nombreUsuario: "",
      email: "",
      oldemail: ""
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
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
  },
    showAlertUsername() {
      this.$swal({
        icon: "success",
        title: "¡Perfecto!",
        text: "Has actualizado tu nombre de usuario o correo electronico correctamente, la sesión se  cerrará en 5 segundos. Inicia sesión con tu nuevo nombre de usuario",
        showConfirmButton: false,
        timer: 5000,
        allowOutsideClick: false

      });
      setTimeout(() => {

      this.logOut();
    }, 5001);
    },
    getUserInfo() {
      API.get('/usuarios/'+this.currentUser.username)
    .then(response => {
    this.usuario = response.data.body;
    this.nombreUsuario= this.usuario.username;
    this.email = this.usuario.email;
    this.oldemail =this.usuario.email;
    })
    .catch(error => {
    console.error(error);
    });
},
    updatePersonal() {
      const updatedPersonal = {
        username: this.nombreUsuario,
        email: this.email
      };

      API.patch('/usuarios/'+this.currentUser.username, updatedPersonal)
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
