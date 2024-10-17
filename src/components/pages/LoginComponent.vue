<template>
  <div class="container" id="centerContainer">
    <div class="row">
      <div class="col-md-6 px-5">
            <div class="mb-4">
              <h3>Inicia Sesión</h3>
              <p class="mb-4">
                ¡Bienvenido/a de vuelta! Ingresa tus datos para acceder a nuestra red social. ¡Conéctate con amigos y familiares en todo el mundo!</p>
            </div>
                  <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Nombre de Usuario</label>
          <Field name="username" type="text" class="form-control" placeholder="Alfredo"/>
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <Field name="password" type="password" class="form-control" placeholder="**************"/>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
 <div class="d-flex mb-5 align-items-center">
                <span class="me-auto control control--checkbox mb-0">
                  <span class="caption">Recuerdame </span>
                  <input type="checkbox" checked="checked" disabled/>
                  <div class="control__indicator"></div>
                </span>
                <span class="ml-auto">
                  <a href="#" class="forgot-pass" disabled>¿Contraseña Olvidada?</a>
                </span>
              </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

       <!-- <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>-->
        <span class="d-block text-left my-4 text-muted">— o inicia sesión con —</span>

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
      </div>
      <div class="col-md-6">
        <div class="card text-white bg-primary py-5 d-md-down-none">
          <div class="card-body text-center">
            <h2>¿No tienes cuenta?</h2>
            <img src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" alt="Image" class="img-fluid float-end w-50" id="registerImage" />
            <p id="registerText">
              ¡Únete a nuestra red social y conoce a personas de todo el mundo!
              Si aún no tienes una cuenta, puedes registrarte ahora mismo y
              empezar a conectarte con amigos, familiares y nuevos conocidos. Es
              fácil y rápido, simplemente completa unos pocos campos y estarás
              listo para comenzar. ¡Regístrate ahora y forma parte de nuestra
              comunidad!
            </p>
            <router-link to="/register" class="btn btn-primary active btn-lg mt-3"> <i class="fa-solid fa-signature"></i>&nbsp;Registrate Ahora!</router-link> 
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "LoginComponent",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Nombre de usuario es requerido!"),
      password: yup.string().required("Contraseña es requerida!"),
    });

    return {
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
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    alert(icon,title,message){
      this.$swal({
        icon: icon,
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 5000
    });
    },
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.alert("success","Hola!","Bienvenido de vuelta por Spiral.");
          this.$router.push("/profile");

        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            this.alert("error","Ups!",this.message);
        }
      );
    },
  },
};
</script>