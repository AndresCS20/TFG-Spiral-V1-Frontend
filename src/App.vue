<template>
<sidebar></sidebar> 
<container>
</container>
<modals></modals>
<button id="backToTopBtn" class="btn btn-info btn-lg scrollToTopBtn d-none" @click="backToTopBtn()"><i class="fa-solid fa-chevron-up"></i></button>
</template>

<script>
import Sidebar from "./components/structure/SidebarComponent.vue";
import Container from "./components/structure/ContainerComponent.vue";
import Modals from "./components/structure/ModalsComponent.vue";

//import General from "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js";
const url = new URL(window.location.href);
export default {
  name: 'App',
  components: {
    Sidebar,
    Container,
    Modals
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods:{
    closeSidebar() {
      let sidebar = document.querySelector(".sidebar");
      sidebar.classList.remove("close");
    },
    backToTopBtn() {
      document.body.scrollTop = 0; // Para navegadores webkit
      document.documentElement.scrollTop = 0; // Para navegadores compatibles con estándares
    }
  },
  data(){
    return {
      url: url
    }
  }  ,
  mounted() {
    (() => {
  "use strict";

  const storedTheme = localStorage.getItem("theme");

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = function (theme) {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  window.addEventListener("DOMContentLoaded", () => {
    getPreferredTheme();
    document
      .querySelectorAll("[data-bs-theme-value]")
      .forEach((toggle) => {
        toggle.addEventListener("click", () => {
          const theme = toggle.getAttribute("data-bs-theme-value");
          localStorage.setItem("theme", theme);
          setTheme(theme);
        });
      });
      
  });

  window.onscroll = function() {
  var backToTopBtn = document.getElementById("backToTopBtn");
  
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.classList.add("d-fixed")
    backToTopBtn.classList.remove("d-none")
  } else {
    backToTopBtn.classList.remove("d-fixed")
    backToTopBtn.classList.add("d-none")
  }
};


})();
  },
} 
</script>

<style>
@import url(./assets/css/style.css);
@import url(./assets/css/themes.css);
@import url(./assets/css/bootstrap.min.css);
@import url(https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css);
</style>
