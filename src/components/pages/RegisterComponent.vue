<template>
    <div class="container" id="centerContainer">
    <div class="row">
      <div class="col-md-6">
        <div class="card text-white bg-primary py-5 d-md-down-none">
          <div class="card-body text-center">
            <h2>¿Ya tienes cuenta?</h2>
            <img src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" alt="Image" class="img-fluid float-end w-50" id="registerImage" />
            <p id="registerText">
              ¡Bienvenido/a de vuelta! Ingresa tus datos para iniciar sesión en nuestra red social y seguir conectando con tus amigos y descubrir nuevas amistades. ¡Vamos allá!</p>
              <a href="/login" class="btn btn-primary btn-lg active mt-3"><i class="fa-solid fa-person-to-portal"></i>&nbsp;Inicia Sesión Ahora!</a>
            <div></div>
          </div>
        </div>
      </div>
      <div class="col-md-6 px-5">
            <div class="mb-4">
              <h3>Registrate</h3>
            </div>
            <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="fullname">Nombre completo</label>
            <Field name="fullname" type="text" class="form-control" placeholder="Alfredo Perez"/>
            <ErrorMessage name="fullname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="username">Nombre de usuario</label>
            <Field name="username" type="text" class="form-control" placeholder="Alfredo"/>
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Correo Electronico</label>
            <Field name="email" type="email" class="form-control" placeholder="alfredo@correo.es"/>
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <Field name="password" type="password" class="form-control" placeholder="***********"/>
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <span class="me-auto control control--checkbox mb-3">
                  <Field name="terms" type="checkbox" class="form-check-input" value="false"/>
                  <ErrorMessage name="terms" class="error-feedback"/>
                  <span class="caption">&nbsp;Acepto los <a href="#" class="text">Términos y Condiciones</a> de Spiral. </span>
                  <div class="control__indicator"></div>
                </span>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Registrate
            </button>
          </div>
        </div>
        <span class="d-block text-left my-4 text-muted">— o registrate con —</span>

<div class="btn-group">
  <a href="#" class="btn btn-info">
    <i class="fa-brands fa-facebook"></i>
  </a>
  <a href="#" class="btn btn-outline-info">
    <span class="fa-brands fa-twitter"></span>
  </a>
  <a href="#" class="btn btn-info">
    <span class="fa-brands fa-google"></span>
  </a>
</div>
      </Form>
     <!-- <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "RegisterComponent",
  meta:{
    title: 'Registrate - Spiral'
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      fullname: yup
        .string()
        .required("Nombre completo es requerido!")
        .min(6, "Minimo 6 caracteres!")
        .max(100, "Maximo 100 caracteres!"),
      username: yup
        .string()
        .required("Nombre de usuario es requerido!")
        .min(3, "Minimo 3 caracteres!")
        .max(20, "Maximo 20 caracteres!"),
      email: yup
        .string()
        .required("Correo electronico es requerido!")
        .email("Correo electronico introducido es invalido!")
        .max(50, "Maximo 50 caracteres!"),
      password: yup
        .string()
        .required("Contraseña es requerida!")
        .min(6, "Minimo 6 caracteres!")
        .max(40, "Maximo 40 caracteres!"),
      terms : yup
        .boolean()
        .required('Tienes que Aceptar los Terminos y Condiciones!')
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    showAlert() {
      // Use sweetalert2
      this.$swal({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Te has registrado correctamente, en 5 segundos seras redirigido al login para iniciar sesión',
        showConfirmButton: false,
        timer: 5000,
        allowOutsideClick: false
    });
    setTimeout(() => {
      this.$router.push("/login");
    }, 5001);
    },

    errorAlert(message){
      this.$swal({
        icon: 'error',
        title: 'Ups ha ocurrido un error!',
        text: message,
        showConfirmButton: false,
        timer: 5000
    });
    },

    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.showAlert();

        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.errorAlert(this.message);
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>