<template>
<nav>
  <v-app-bar app dark height="56" style="background-color:#004ba0" flat>
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
      <v-menu
        bottom
        max-height="300"
        min-width="188"
        max-width="188"
        :offset-y="true"
        origin="center center"
        transition="slide-y-transition"
        :close-on-click="true"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-list-item-title style="text-transform: capitalize; color:white;">{{fullname}}</v-list-item-title>
            <v-list-item-avatar>
              <v-img :src="imageURL" sizes="50"></v-img>
            </v-list-item-avatar>
          </v-btn>
        </template>
        <!--Begin List Menu Profile -->
        <v-list>
          <v-list-item>
            <v-btn text block ripple>Profile</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text block ripple @click="logout()">Log Out</v-btn>
          </v-list-item>
        </v-list>
        <!-- End List Menu Profile -->
      </v-menu>
      <!-- <v-btn flat text to="/profile">Profile</v-btn> -->
      <!-- <v-btn icon id="logout">
      <v-icon>mdi-export</v-icon>
      </v-btn>-->
    </v-toolbar-items>
  </v-app-bar>
</nav>
</template>
<script>
export default {
  data(){
    return{
      fullname:"",
      imageURL:""
    }
  },
  methods: {
    logout(){
      localStorage.clear();
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    },
    validate() {
      if (this.$refs.form.validate()) {
        alert("OK");
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  mounted(){
    let profile = JSON.parse(localStorage.getItem("Profile").toString());
    this.fullname = profile.fullName;
    if(profile.imagePath == null){
      this.imageURL = "https://picsum.photos/id/241/3456/2304"
    }else{
      this.imageURL = profile.imagePath;
    }
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