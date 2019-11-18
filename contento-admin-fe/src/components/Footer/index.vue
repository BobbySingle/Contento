<template>
  <v-footer height="auto" light >
    <v-row justify="center" no-gutters>
      <h5 class="title font-weight-medium">A CAPSTONE PROJECT AT</h5>
      <v-col cols="12" class="text-xs-center mb-3">
        <v-img contain :src="logoFPT" height="60"></v-img>
      </v-col>
      <v-col class="py-4 text-center black--text" cols="12">
        {{ new Date().getFullYear() }} — Copyright
        <router-link to="/">Contento Project Team</router-link>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      logoFPT: require("../../assets/fpt-university-logo.png")
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>