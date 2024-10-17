<template>
<div class="container-fluid">
<CommunityHeader></CommunityHeader>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="communityFeed" role="tabpanel" aria-labelledby="communityFeed-tab" tabindex="0">
          <h2><i class="fa-solid fa-memo"></i>&nbsp;Feed de Publicaciones</h2><hr>
      <div class="col-md-8 grid-margin m-auto">
          <CommunityFeed></CommunityFeed>
      </div>
  </div>
  <div class="tab-pane fade" id="memberslist" role="tabpanel" aria-labelledby="memberslist-tab" tabindex="0">
        <h2><i class="fa-solid fa-people-group"></i>&nbsp;Lista de miembros</h2><hr>
<CommunityMembers></CommunityMembers>
  </div>
</div>
</div>
        

</template>


<script>
import CommunityFeed from "./community-subcomponents/CommunityFeedSubComponent.vue";
import CommunityHeader from "./community-subcomponents/CommunityHeadSubComponent.vue";
import CommunityMembers from "./community-subcomponents/CommunityMembersSubComponent.vue";
export default {
  name: "CommunityComponent",
  components:{
    CommunityHeader,
    CommunityFeed,
    CommunityMembers
  }
};
</script>