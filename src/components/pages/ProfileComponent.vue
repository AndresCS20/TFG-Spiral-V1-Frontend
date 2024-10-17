<template>
  <div class="container-fluid">
    <div class="profile-page tx-13">
      <div class="row">
        <div class="col-12 grid-margin">
          <ProfileHeader></ProfileHeader>
        </div>
      </div>
      <div class="row profile-body">
        <div class="col-md-12 col-xl-8 middle-wrapper">

<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="profile-publications" role="tabpanel" aria-labelledby="profile-publications" tabindex="0"> 
    <h2 class="fw-bolder"><i class="fa-solid fa-rectangle-vertical"></i>&nbsp;Publicaciones</h2>  
         <ProfilePublications></ProfilePublications>
</div>
  <div class="tab-pane fade" id="profile-multimedia" role="tabpanel" aria-labelledby="profile-multimedia" tabindex="0">
    <h2 class="fw-bolder"><i class="fa-solid fa-rectangle-history-circle-user"></i>&nbsp;Multimedia</h2>
    <ProfileMultimedia></ProfileMultimedia>
  </div>
  <div class="tab-pane fade" id="profile-communities" role="tabpanel" aria-labelledby="profile-communities" tabindex="0">
    <h2 class="fw-bolder"><i class="fa-solid fa-users"></i>&nbsp;Comunidades</h2>
    <ProfileCommunities></ProfileCommunities>
  </div>
  <div class="tab-pane fade" id="profile-followers" role="tabpanel" aria-labelledby="profile-followers" tabindex="0">
    <h2 class="fw-bolder"><i class="fa-duotone fa-person-walking-arrow-right"></i>&nbsp;Lista de Seguidores</h2>
    <ProfileFollowers></ProfileFollowers>
  </div>
  <div class="tab-pane fade" id="profile-following" role="tabpanel" aria-labelledby="profile-following" tabindex="0">
    <h2 class="fw-bolder"><i class="fa-solid fa-person-walking-arrow-loop-left"></i>&nbsp;Lista de Seguidos</h2>
    <ProfileFollowing></ProfileFollowing>
  </div>
</div>
</div>
        <ProfileRigthBar></ProfileRigthBar>
    </div>
  </div>
</div></template>

<script>
import ProfileHeader from "./profile-subcomponents/ProfileHeaderSubcomponent.vue";
import ProfilePublications from "./profile-subcomponents/Profile-PublicationsSubComponent.vue";
import ProfileRigthBar from "./profile-subcomponents/Profile-RigthBarSubComponent.vue";
import ProfileMultimedia from "./profile-subcomponents/Profile-MultimediaSubComponent.vue";
import ProfileCommunities from "./profile-subcomponents/Profile-CommunitiesSubComponent.vue";
import ProfileFollowers from "./profile-subcomponents/Profile-FollowersSubComponent.vue";
import ProfileFollowing from "./profile-subcomponents/Profile-FollowingSubComponent.vue";
//import API from "./../../api.js";
export default {
  name: "ProfileComponent",
  meta:{
    title: 'Perfil - '
  },
  components: {
    ProfileHeader,
    ProfilePublications,
    ProfileRigthBar,
    ProfileMultimedia,
    ProfileCommunities,
    ProfileFollowers,
    ProfileFollowing
  },
};
</script>

<style>@import url(./../../assets/css/pages/profile.css);</style>