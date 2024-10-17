<template>
  <div id="modals">
    <!-- Modal Global Personalización -->
    <ThemeModals></ThemeModals>
    <ImageModal></ImageModal>
    <VideoModal></VideoModal>
    <CreateCommunityModal></CreateCommunityModal>
  </div>
</template>

<script>
import ThemeModals from './modals-subcomponents/ThemesModalSubComponent.vue';
import ImageModal from './modals-subcomponents/ImageModalSubComponent.vue';
import VideoModal from './modals-subcomponents/VideoModalSubComponent.vue';
import CreateCommunityModal from './modals-subcomponents/CreateCommunityModalSubComponent.vue';
const url = new URL(window.location.href);
export default {
  name: 'ModalComponent',
  components: {
    ThemeModals,
    ImageModal,
    VideoModal,
    CreateCommunityModal,
  },
  data() {
    return {
        url: url.pathname
    }
  }

}
</script>