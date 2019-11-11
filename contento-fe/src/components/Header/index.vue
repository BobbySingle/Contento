<template>
  <!-- <v-app-bar app dense elevate-on-scroll> -->
  <v-app-bar flat>
    <!-- <v-menu
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
          v-for="(item,i) in items"
          :key="i"
          @click="clickCategory(item.title)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>-->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-toolbar-title
        class="headline text-uppercase logo"
        style="display: flex;
    justify-content: center;
    align-items: center;"
        @click="goHome()"
      >
        <img src="@/assets/Logo.png" style="display:block; height:90%;" />
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
    <sign-in />
    <sign-up />
  </v-app-bar>
</template>
<script>
import SignIn from "../Dialog/SignIn.vue";
import SignUp from "../Dialog/SignUp.vue";
export default {
  components: { SignIn, SignUp },
  data: () => ({
    search: "",
    items: [
      { title: "Topic 1" },
      { title: "Topic 2" },
      { title: "Topic 3" },
      { title: "Topic 4" },
      { title: "Topic 5" },
      { title: "Topic 6" },
      { title: "Topic 7" },
      { title: "Topic 8" },
      { title: "Topic 9" },
      { title: "Topic 10" },
      { title: "Topic 11" },
      { title: "Topic 12" }
    ],
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
    goHome() {
      this.$router.push("/").catch(err => {});
    },
    clickCategory(event) {
      alert(event);
    },
    validate() {
      if (this.$refs.form.validate()) {
        alert("OK");
      }
    },
    reset() {
      this.$refs.form.reset();
    }
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