<template>
  <v-app style="background-color:white;">
    <notifications
      classes="css-notification"
      group="notice"
      position="top right"
      animation-type="velocity"
      :max="4"
    />
    <v-content>
      <Header />
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";
import {mapActions} from 'vuex';
export default {
  name: "App",
  components: {
    Header,
    Footer
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
    if (localStorage.getItem("ProfileUser") != null) {
      let user = JSON.parse(localStorage.getItem("ProfileUser").toString());
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
