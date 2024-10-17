<template>
    <div class="container-fluid">
        <div class="card bg-primary shadow-none position-relative">
            <div class="card-body px-4 py-3">
                <div class="row align-items-center">
                    <div class="col-md-10">
                        <h4 class="fw-semibold mb-8 text-light"><i class="fa-solid fa-users"></i>&nbsp;Explora</h4>
                        <p class="mb-0 text-light">Descubre y Conecta!

                            Sumérgete en un fascinante viaje a través de nuestras publicaciones globales. Descubre lugares
                            asombrosos, culturas vibrantes y experiencias únicas de todo el mundo. Además, conoce a personas
                            inspiradoras que comparten tus intereses.</p>
                    </div>
                    <div class="col-md-2">
                        <div class="text-center mb-n5"><img src="../../assets/images/explore.svg" class="img-fluid w-75 mb-n4 svgBanner"></div>
                </div>
            </div>
            <ul class="nav nav-pills p-3 rounded-2" style="background: var(--bs-body-bg); width: fit-content; margin: 0px auto;" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="globalFeed-tab" data-bs-toggle="tab" data-bs-target="#globalFeed-tab-pane" type="button" role="tab" aria-controls="globalFeed-tab-pane" aria-selected="true"> <i class="fa-regular fa-earth-europe"></i>&nbsp;Publicaciones Globales</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="meetPeople-tab" data-bs-toggle="tab" data-bs-target="#meetPeople-tab-pane" type="button" role="tab" aria-controls="meetPeople-tab-pane" aria-selected="false"> <i class="fa-solid fa-people"></i>&nbsp;Conoce gente nueva</button>
  </li>
</ul>
        </div>
    </div>

    <div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="globalFeed-tab-pane" role="tabpanel" aria-labelledby="globalFeed-tab" tabindex="0"><GlobalFeed></GlobalFeed>  </div>
  <div class="tab-pane fade" id="meetPeople-tab-pane" role="tabpanel" aria-labelledby="meetPeople-tab" tabindex="0"><MeetPeople></MeetPeople></div>
</div>
    


</div></template>

<script>
import GlobalFeed from './explore-subcomponents/GlobalFeedSubComponent.vue';
import MeetPeople from './explore-subcomponents/MeetPeopleSubComponent.vue';
export default {
    name: "ExploreComponent",
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
    components: {
        GlobalFeed,
        MeetPeople
    },
};
</script>