<template>
  <nav>
    <v-app-bar app dark dense style="background-color:#004ba0" flat>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu
          bottom
          left
          max-height="300"
          min-width="200"
          max-width="200"
          :offset-y="true"
          transition="slide-y-transition"
          :close-on-click="true"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-badge :overlap="true" class="align-self-center">
                <template v-slot:badge>
                  <span>0</span>
                </template>
                <v-icon color="white">notifications</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <!-- /**Begin List Notifications */ -->
          <v-list v-for="i in 10" :key="i">
            <v-list-item>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on" class="notifications-line-clamp">
                    <router-link to="/">Notifications {{i}} do something</router-link>
                  </span>
                </template>
                <span>Notifications {{i}} do something</span>
              </v-tooltip>
            </v-list-item>
          </v-list>
          <!-- /**End List Notifications */ -->
        </v-menu>
        <v-divider vertical inset></v-divider>
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
    logout() {
      localStorage.clear();
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
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
.notifications-line-clamp {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.notifications-line-clamp a {
  text-decoration: none;
}
</style>