<template>
  <nav>
    <v-app-bar app dark dense style="background-color:#004ba0" flat>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text style="text-transform: capitalize; color:white;" @click="profile()">{{fullname}}</v-btn>
        <v-divider vertical inset></v-divider>
        <v-btn icon @click="logout()" style=" color:white;">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    profile() {
      this.$router.push("/Profile");
    },
    async logout() {
      await localStorage.clear();
       this.$store.state.authentication.loggedUser = false;
      await window.open("http://contento-admin.s3-website-ap-southeast-1.amazonaws.com/","_self");
    },
    ...mapActions({ refreshFullName: "authentication/refreshFullName" }),
    async fetchData() {
       await this.refreshFullName();
    }
  },
  mounted() {
    this.fetchData();
  }
  ,
  computed:{
    ...mapGetters(["fullname"])
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>