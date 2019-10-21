<template>
  <v-app>
    <login v-if="!$store.state.authentication.isAuthen" />
    <v-content class="mt-4" v-if="$store.state.authentication.isAuthen">
      <Header />
      <Drawer />
      <router-view />
    </v-content>
    <Footer v-if="$store.state.authentication.isAuthen" />
  </v-app>
</template>

<script>
import Header from "@/components/Header/index";
import Drawer from "@/components/Drawer/index";
import Footer from "@/components/Footer/index";
import Login from "./views/Login/index.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Drawer,
    Footer,
    Login
  },
  data: () => ({}),
};
</script>
<style>
@import "../src/assets/scrollbar.css";
@import "../src/assets/font.css";
</style>
