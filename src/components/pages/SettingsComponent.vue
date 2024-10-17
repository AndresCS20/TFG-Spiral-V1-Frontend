<template>
    <div class="container-fluid">
        <div class="card bg-primary shadow-none position-relative overflow-hidden">
            <div class="card-body px-4 py-3">
              <div class="row align-items-center">
                <div class="col-md-10">
                  <h4 class="fw-semibold mb-8 text-light"><i class="fa-solid fa-user-gear"></i> Ajustes</h4>
                  <p class="mb-0 text-light">¡Personaliza tu perfil y ajusta tus preferencias en nuestra página de ajustes! Haz que tu experiencia en nuestra red social sea única y adaptada a tus necesidades.</p>
                </div>
                <div class="col-md-2">
                  <div class="text-center mb-n5">  
                    <img src="./../../assets/images/settings.svg" class="img-fluid w-75 dnone-md  mb-n4">
                  </div>
                </div>
              </div>
            </div>
          </div>

    <div class="row mx-1 align-items-start">
  <div class="col-md-3 card rounded-2 p-2 nav flex-column nav-pills nav-fill me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button class="nav-link px-4 active" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="true"><i class="fa-solid fa-user"></i>&nbsp;Perfil</button>
    <button class="nav-link px-4" id="v-pills-personal-tab" data-bs-toggle="pill" data-bs-target="#v-pills-personal" type="button" role="tab" aria-controls="v-pills-personal" aria-selected="false"><i class="fa-solid fa-cog"></i>&nbsp;Personal</button>
    <button class="nav-link px-4" id="v-pills-security-tab" data-bs-toggle="pill" data-bs-target="#v-pills-security" type="button" role="tab" aria-controls="v-pills-security" aria-selected="false"><i class="fa-solid fa-shield"></i>&nbsp;Seguridad</button>
  </div>
  <div class="col-md-8 tab-content" id="v-pills-tabContent">
    <ProfileSettings></ProfileSettings>
    <PersonalSettings></PersonalSettings>
    <SecuritySettings></SecuritySettings>
  </div>
</div>

   </div>  
</template>

<script>
import ProfileSettings from './settings-subcomponents/ProfileSettingSubComponent.vue';
import PersonalSettings from './settings-subcomponents/PersonalSettingSubComponent.vue';
import SecuritySettings from './settings-subcomponents/SecuritySettingSubComponent.vue';


export default {
  name: "SettingsComponent",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  components:{
    ProfileSettings,
    PersonalSettings,
    SecuritySettings
  }
};
</script>