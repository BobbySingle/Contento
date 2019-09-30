<template>
  <v-app>
    <v-content>
      <Header />
      <Drawer />
      <router-view />
      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import Header from "@/components/Header/index";
import Drawer from "@/components/Drawer/index";
import Footer from "@/components/Footer/index";
export default {
  name: "App",
  components: {
    Header,Drawer,Footer
  },
  data: () => ({
    //
  })
};
</script>
<style>
@import "../src/assets/scrollbar.css";
</style>
