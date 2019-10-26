<template>
  <v-app>
    <notifications
      classes="css-notification"
      group="notice"
      position="top right"
      animation-type="velocity"
      :max="4"
    />
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
<style lang="scss">
@import "../src/assets/scrollbar.css";
@import "../src/assets/font.css";
.css-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 12px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.err {
    background: #e54d42;
    border-left-color: #b82e24;
  }

  &.suc {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
</style>
