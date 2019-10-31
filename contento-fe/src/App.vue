<template>
  <v-app style="background-color:white;">
    <v-content>
      <Header/>
      <router-view/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Header from '@/components/Header/index';
import Footer from '@/components/Footer/index';
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  data: () => ({
    //
  }),
};
</script>
<style>
@import "../src/assets/scrollbar.css";
</style>
