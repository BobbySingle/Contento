<template>
  <!-- <v-app-bar app dense elevate-on-scroll> -->
  <v-app-bar flat>
    <v-menu
      bottom
      max-height="200"
      min-width="400"
      max-width="400"
      :open-on-hover="true"
      :offset-y="true"
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">Category</v-btn>
      </template>
      <v-list>
        <v-list-item
          style="float: left;  width:50%; background: white;"
          v-for="item in listTag"
          :key="item.id"
          @click="clickCategory(item)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-toolbar-title
        class="headline text-uppercase logo"
        style="display: flex;
    justify-content: center;
    align-items: center;"
        @click="goHome()"
      >
        <img src="@/assets/Logo.png" style="display:block; height:90%; width:auto;" />
        <span>ontento</span>
      </v-toolbar-title>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <!-- <v-toolbar-items>
      <v-text-field
        class="mt-2"
        single-line
        prepend-inner-icon="mdi-magnify"
        clearable
        v-model="search"
      ></v-text-field>
    </v-toolbar-items>-->
    <div v-if="!this.$store.state.authentication.loggedUser">
      <sign-in />
      <sign-up />
    </div>
    <div v-if="this.$store.state.authentication.loggedUser">
      <v-divider vertical inset dark></v-divider>
      <v-btn text style="text-transform: capitalize; color:black;" @click="profile()">{{fullname}}</v-btn>
      <v-divider vertical inset dark></v-divider>
      <v-btn icon @click="logout()" style=" color:black;">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>
<script>
import SignIn from "../Dialog/SignIn.vue";
import SignUp from "../Dialog/SignUp.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { SignIn, SignUp },
  data: () => ({
    search: "",
    valid: true,
    username: "",
    usernameRules: [
      v => !!v || "Username is required",
      v => (v && v.length >= 8) || "Username must be greater than 8 characters"
    ],
    password: "",
    passwordRules: [
      v => !!v || "E-mail is required",
      v => (v && v.length >= 6) || "Username must be greater than 6 characters"
    ],
    checkbox: false
  }),
  methods: {
    ...mapActions({
      getContent: "viewer/getContent",
      getNewsTags: "viewer/getNewsTags",
      setCategoryName: "viewer/setCategoryName"
    }),
    goHome() {
      this.$router.push("/").catch(err => {});
    },
    clickCategory(event) {
      sessionStorage.setItem("category", JSON.stringify(event));
      this.getNewsTags(event.id);
      this.setCategoryName(event.name);
      this.$router.push("/Category").catch(err => {});
    },
    reset() {
      this.$refs.form.reset();
    },
    profile(){
      this.$router.push("/Profile");
    },
    async logout() {
      localStorage.removeItem("ProfileUser");
      this.$store.state.authentication.loggedUser = false;
      let guest = JSON.parse(localStorage.getItem("guest"));
      if (guest == undefined) {
        await this.getContent({ tags: [0] });
        this.dialog = true;
      } else {
        if (guest == "") {
          await this.getContent({ tags: [0] });
        } else {
          await this.getContent({ tags: guest });
        }
      }
      this.$router.push("/").catch(err => {});
    },
    ...mapActions({
      refreshFullName: "authentication/refreshFullName",
      getTags: "viewer/getTags"
    }),
    async fetchData() {
      await this.getTags();
      if (localStorage.getItem("ProfileUser")) {
        await this.refreshFullName();
      }
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["fullname", "listTag", "getUser"])
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.logo:hover {
  cursor: pointer;
}
</style>