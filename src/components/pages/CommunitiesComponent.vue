<template>
  <div class="container-fluid">
    <div class="card bg-primary shadow-none position-relative overflow-hidden">
      <div class="card-body px-4 py-3">
        <div class="row align-items-center">
          <div class="col-md-10">
            <h4 class="fw-semibold mb-8 text-light"><i class="fa-solid fa-users"></i>&nbsp;Las Comunidades de Spiral</h4>
            <p class="mb-0 text-light">¡ Aquí encontrarás comunidades donde poder unirte a discusiones sobre tus temas
              favoritos y conectar con personas de todo el mundo que comparten tus intereses.
              Desde tecnología hasta deportes, hay una comunidad para todos. ¡Elige la que más te guste y conversa ahora
              mismo!</p>
          </div>
          <div class="col-md-2">
            <div class="text-center mb-2">
              <img src="../../assets/images/community.svg" class="img-fluid w-75 svgBanner mb-n4">
              <button type="button" class="btn btn-info" data-bs-toggle="modal"
                data-bs-target="#createCommunityModal">Crear Comunidad&nbsp;<i
                  class="fa-solid fa-hexagon-plus"></i></button> <!--- Esto abre un modal con el formulario-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-sm-6 col-lg-3" v-for="community in listcommunity" :key="community.id">
        <div class="card">
          <div class="h-80px rounded-top"
            :style="`background-image: linear-gradient(to bottom, rgba(var(--bs-body-bg-rgb), 0.52), rgba(var(--bs-primary-rgb), 0.73)),url(${community.imagen_portada});background-position:center;background-size:cover;background-repeat:no-repeat;height:80px; `">
          </div>
          <div class="card-body text-center pt-0">
            <div class="avatar avatar-lg mt-n5 mb-3">
              <img class="profile-pic avatar-img rounded-circle border border-white border-3 bg-white" width="80px"
                :src="community.imagen_perfil" style="width: 80px; height: 80px;">
            </div>
            <h5 class="mb-0 row">
              <router-link :to="`/community/${community.nombre_comunidad}`" class="col-12 text-truncate m-auto">{{
                community.nombre_completo_comunidad }}</router-link>
            </h5>
            <p>{{ community.nombre_comunidad }}</p>
            <div class="hstack gap-2 gap-xl-3 justify-content-center mt-3"><span>
                <h6 class="mb-0">{{ community.num_miembros }}</h6><small>Miembros</small>
              </span>
              <div class="vr"></div><span><small>Fecha de creación:</small>
                <h6 class="mb-0">{{ this.moment(community.fecha_creacion).format('L') }}</h6>
              </span>
            </div>
          </div>
          <div class="card-footer text-center">
            <router-link :to="`/community/${community.nombre_comunidad}`" class="btn btn-success btn-sm">Ver Comunidad</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import API from "./../../api.js";
import moment from 'moment'
import 'moment/locale/es'

// Configura el idioma por defecto
moment.locale('es')
export default {
  name: "CommunitiesComponent",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  data() {
    return {
      listcommunity: {},
      moment: moment,

    }
  },
  created() {
    if (this.loggedIn) {
      this.getCommunitiesInfo();
    }

  },
  watch: {
    loggedIn(newLoggedInStatus) {
      if (newLoggedInStatus) {
        this.getCommunitiesInfo();
      }
    }
  },
  methods: {
    getCommunitiesInfo() {
      API.get('/communities/')
        .then(response => {
          this.listcommunity = response.data.body;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>