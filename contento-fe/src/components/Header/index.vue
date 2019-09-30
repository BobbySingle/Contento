<template>
  <v-app-bar app>
    <v-toolbar-items>
      <v-toolbar-title
        class="headline text-uppercase"
        style="display: flex;
    justify-content: center;
    align-items: center;"
      >
        <img src="@/assets/Logo.png" style="height: 90%;" />
        <router-link to="/">
          <span>ontento</span>
        </router-link>
      </v-toolbar-title>
      <div style="min-width:30px; width:100px;" />
      <v-btn text>Trending</v-btn>
      <v-btn text to="/profile">Video</v-btn>
      <!-- <v-btn text>Category</v-btn> -->
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
            v-for="(item, i) in items"
            :key="i"
            @click
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <v-text-field hide-details prepend-icon="mdi-magnify" style="min-width:100px;"></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text>Sign Up</v-btn>
      <v-menu
        bottom
        max-height="300"
        min-width="300"
        max-width="300"
        :offset-y="true"
        origin="center center"
        transition="scale-transition"
        :close-on-click="true"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Sign In</v-btn>
        </template>
        <!--Begin Form Login -->
        <v-list
          style="display: flex;
            justify-content: center;
            align-items: center;"
        >
          <div style="width:80%;">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                :counter="8"
                :rules="usernameRules"
                label="Username"
                required
              ></v-text-field>

              <v-text-field
                type="password"
                v-model="password"
                :counter="8"
                :rules="passwordRules"
                label="Password"
                required
              ></v-text-field>

              <v-checkbox v-model="checkbox" label="Remember me."></v-checkbox>
              <v-layout justify-center block>
                <v-btn
                  type="submit"
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >Sign In</v-btn>

                <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn>
              </v-layout>
            </v-form>
          </div>
        </v-list>
        <!-- End From Login -->
      </v-menu>
      <!-- <v-btn flat text to="/profile">Profile</v-btn> -->
      <!-- <v-btn icon id="logout">
      <v-icon>mdi-export</v-icon>
      </v-btn>-->
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({
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
a{
  text-decoration: none;
}
</style>