<template>
      <div class="col-md-8 grid-margin m-auto" v-if="publicationlistLength<1">
    <div class="alert alert-primary d-flex align-items-center" role="alert">
      <i class="fa-solid fa-empty-set me-2" style="font-size: 32px;"></i>
    No hay publicaciones disponibles todavia. Escribe tu la primera!
</div>
    </div>
        <div class="col-md-8 grid-margin m-auto" v-if="publicationlistLength">
            <div class="card rounded"  v-for="publication in listMemberCommunityPublications" :key="publication.id">
            <div class="card-body">
                <div class="d-lg-flex d-sm-block justify-content-between align-items-center gap-2">
                    <div class="d-flex align-items-center gap-3">
                        <img :src="publication.profile_pic" alt="" class="rounded-circle" width="40" height="40">
                        <router-link :to="`/profile/${publication.username}`">
                      <h6 class="fw-semibold mb-0 fs-4">{{ publication.fullname }}</h6>
                      <i><i class="fa fa-at"></i>{{ publication.username }}</i>
                    </router-link>
                    <span class="fs-2"><span class="p-1 bg-light rounded-circle d-inline-block"></span> {{ this.moment(publication.fecha_publicacion).startOf('minute').fromNow() }}</span>
                    </div>
                    <router-link :to="`/community/${publication.nombre_comunidad}`" class="d-flex ms-3 btn btn-success" style="line-height:31px;width:fit-content;margin-top:-5px;">
                        <img alt="Avatar" class="inline-block align-top rounded-5 me-2" width="35" height="35" :src="publication.imagen_perfil"> 
                        {{ publication.nombre_completo_comunidad }}</router-link>
                </div>
                <p class="my-3"> {{publication.contenido}} </p>
                <div class="d-flex align-items-center my-3">
                    <div class="d-flex align-items-center gap-2"><a
                            class="text-white d-flex align-items-center justify-content-center bg-primary p-2 fs-4 rounded-circle"
                            href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="Like"><i class="fa-solid fa-thumbs-up"></i></a><span class="fw-semibold">67
                            Reacciones</span></div>
                    <div class="d-flex align-items-center gap-2 ms-4"><a
                            class="text-white d-flex align-items-center justify-content-center bg-secondary p-2 fs-4 rounded-circle"
                            href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="Comment"><i class="fa-solid fa-message"></i></a><span class="fw-semibold">2
                            Comentarios</span></div><a
                        class="ms-auto d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle"
                        href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top"
                        data-bs-title="Share"><i class="ti ti-share"></i></a>
                </div>
                <div class="position-relative">
                    <div class="p-4 rounded-2 border border-dark-subtle mb-3">
                        <div class="d-flex align-items-center gap-3"><img
                                src="https://playcontestofchampions.com/wp-content/uploads/2021/11/champion-iron-man-infinity-war-720x720.jpg"
                                alt="" class="rounded-circle" width="33" height="33">
                            <h6 class="fw-semibold mb-0 fs-4">Iron Man</h6><span class="fs-2"><span
                                    class="p-1 bg-muted rounded-circle d-inline-block"></span> 8 min ago</span>
                        </div>
                        <p class="mt-3 mb-0">Lorem ipsum dolor sit amet consectetur, adipiscing elit mattis pharetra
                            scelerisque, porta blandit erat laoreet. Sodales placerat phasellus congue parturient odio
                            curae mus, tristique ullamcorper taciti vestibulum dictum netus euismod, enim dis risus et
                            feugiat integer. </p>
                    </div>
                    <div class="p-4 rounded-2 border border-dark-subtle mb-3">
                        <div class="d-flex align-items-center gap-3"><img
                                src="https://www.disneyplusinformer.com/wp-content/uploads/2022/06/Doctor-Strange-Avatar.png"
                                alt="" class="rounded-circle" width="33" height="33">
                            <h6 class="fw-semibold mb-0 fs-4">Doctor Strange</h6><span class="fs-2"><span
                                    class="p-1 bg-muted rounded-circle d-inline-block"></span> 5 min ago</span>
                        </div>
                        <p class="mt-3 mb-0">Lorem ipsum dolor sit amet consectetur, adipiscing elit mattis pharetra
                            scelerisque, porta blandit erat laoreet. Sodales placerat phasellus congue parturient odio
                            curae mus, tristique ullamcorper taciti vestibulum dictum netus euismod, enim dis risus et
                            feugiat integer.<br><br>Lorem ipsum dolor sit amet consectetur, adipiscing elit mattis
                            pharetra scelerisque, porta blandit erat laoreet. Sodales placerat phasellus congue
                            parturient odio curae mus, tristique ullamcorper taciti vestibulum dictum netus euismod,
                            enim dis risus et feugiat integer. </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import API from "./../../../api.js";
import moment from 'moment'
import 'moment/locale/es' 

// Configura el idioma por defecto
moment.locale('es') 
export default {
    name: "CommunityFeedComponent",
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
        listMemberCommunityPublications : [],
        moment: moment,
        publication: "",
        publicationlistLength: 0

    }
},
created() {
  if(this.loggedIn){
    this.getAllMemberCommunitiesPublications();
}

},
watch: {
  loggedIn(newLoggedInStatus) {
    if (newLoggedInStatus) {
      this.getUserInfo();
      this.getAllMemberCommunitiesPublications();
    }
  }
},
methods: {
    async getAllMemberCommunitiesPublications() {
      let username = this.currentUser.username;
      try {
        const response = await API.get('/communities/publications/member/' + username);
        this.listMemberCommunityPublications = response.data.body;
        this.publicationlistLength = this.listMemberCommunityPublications;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>