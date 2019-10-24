<template>
  <v-app>
    <login v-if="!this.$store.state.authentication.loggedUser" />
    <v-content class="mt-4" v-if="this.$store.state.authentication.loggedUser">
      <Header />
      <Drawer />
      <router-view />
    </v-content>
    <Footer v-if="this.$store.state.authentication.loggedUser" />
  </v-app>
</template>

<script>
import Header from "@/components/Header/index";
import Drawer from "@/components/Drawer/index";
import Footer from "@/components/Footer/index";
import Login from "./views/Login/index.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Drawer,
    Footer,
    Login
  },
  data: () => ({}),
  methods: {
    ...mapActions({
      loadLoggedUser: "authentication/setLoggedUser",
      loadUser: "authentication/setUser",
      loadAccessToken: "authentication/setAccessToken"
    })
  },
  mounted() {
    if (localStorage.getItem("Profile") != null) {
      let user = JSON.parse(localStorage.getItem("Profile").toString());
      if (user != null) {
        this.loadUser(user);
        this.loadLoggedUser(true);
        this.loadAccessToken(user.token);
      }
    }
  }
};
</script>
<style>
@import "../src/assets/scrollbar.css";
@import "../src/assets/font.css";
</style>
