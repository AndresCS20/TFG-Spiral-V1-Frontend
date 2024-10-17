<template>

  <section class="home content"> 
    <div class="mb-4 rounded-4 min-vh-100 contentbox">

  <router-view></router-view>

    </div>
  </section>
</template>

<script>
export default {
  name: "ContainerComponent",
};
</script>