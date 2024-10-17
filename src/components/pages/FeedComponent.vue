<template>
    <div class="container-fluid">
        <div class="card bg-primary shadow-none position-relative">
            <div class="card-body px-4 py-3">
                <div class="row align-items-center">
                    <div class="col-md-10">
                        <h4 class="fw-semibold mb-8 text-light"><i class="fa-solid fa-users"></i>&nbsp;Feed / Lista de
                            Publicaciones</h4>
                        <p class="mb-0 text-light">Nuestro feed te permite ver publicaciones de personas a las que sigues y
                            explorar comunidades que te interesen. Mantén la conexión con lo que te importa en nuestra red
                            social. </p>
                    </div>
                    <div class="col-md-2">
                        <div class="text-center mb-n5"><img src="../../assets/images/feed.svg"
                                class="img-fluid w-75 svgBanner mb-n4"></div>
                    </div>
                </div>
                <ul class="nav nav-pills p-3 rounded-2" style="background: var(--bs-body-bg); width: fit-content; margin: 0px auto;" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="feedglobal-tab" data-bs-toggle="pill" data-bs-target="#feedglobal" type="button" role="tab" aria-controls="feedglobal" aria-selected="true">
        <i class="fa-solid fa-person-walking-arrow-loop-left"></i>&nbsp;Seguidos
    </button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="feedcomunidad-tab" data-bs-toggle="pill" data-bs-target="#feedcomunidad" type="button" role="tab" aria-controls="feedcomunidad" aria-selected="false">
        <i class="fa-solid fa-users"></i>&nbsp;Comunidades
    </button>
  </li>
</ul>
        </div>
    </div>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="feedglobal" role="tabpanel" aria-labelledby="feedglobal-tab" tabindex="0">
    <h2><i class="fa-solid fa-person-walking-arrow-loop-left"></i>&nbsp;Seguidos</h2><hr>
    <FollowingFeed></FollowingFeed>
</div>
  <div class="tab-pane fade" id="feedcomunidad" role="tabpanel" aria-labelledby="feedcomunidad-tab" tabindex="0">
    <h2><i class="fa-solid fa-users"></i>&nbsp;Comunidades</h2><hr>
    <CommunityFeed></CommunityFeed>
</div>
</div>
</div></template>
  

<script>
import CommunityFeed from './feed-subcomponents/CommunityFeedSubComponent.vue';
import FollowingFeed from './feed-subcomponents/FollowingFeedSubComponent.vue';

export default {
    name: "FeedComponent",
    components: {
        CommunityFeed,
        FollowingFeed
    }
};
</script>