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
  },
  // created() {
  //   //Yeu cau quyen thong bao tren trinh duyet
  //   Notification.requestPermission()
  //     .then(() => this.$messaging.getToken())
  //     .then(token => {
  //       console.log(token);
  //       // if (this.loggedUser) {
  //       //   this.registerFirebaseToken({
  //       //     username: this.loggedUser.username,
  //       //     webToken: token
  //       //   });
  //       // }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       // this.$notification.new(
  //       console.log("Vui lòng cấp quyền truy cập thông báo để nhận được thông tin mới nhất nhanh chóng"
  //       );
  //     });

  //   //Khi server gui message len firebase - firebase gui notification xuong user
  //   this.$messaging.onMessage(payload => {
  //     console.log(payload);
  //     // if (this.loggedUser) {
  //       const notificationTitle = "E-Broker thông báo";
  //       const notificationOptions = {
  //         body: payload.notification.body,
  //         icon: "./assets/logo.png"
  //       };
  //       new Notification(notificationTitle, notificationOptions);
  //       //Xu ly
  //       // this.getNotification(this.loggedUser.access_token);
  //     }
  //   // }
  //   );

  //   //Refresh token khi het han
  //   this.$messaging.onTokenRefresh(() => {
  //     this.$messaging
  //       .getToken()
  //       .then(refreshedToken => {
  //         console.log(refreshedToken);
  //         // if (this.loggedUser) {
  //         //   this.registerFirebaseToken({
  //         //     username: this.loggedUser.username,
  //         //     webToken: refreshedToken
  //         //   });
  //         // }
  //       })
  //       .catch(err => {
  //         console.log("Unable to retrieve refreshed token ", err);
  //       });
  //   });
  // }
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
