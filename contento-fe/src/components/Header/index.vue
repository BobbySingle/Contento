<template>
  <v-app-bar app>
    <v-toolbar-items>
      <v-toolbar-title
        class="headline text-uppercase"
        style="display: flex;
    justify-content: center;
    align-items: center;">
      <span>Contento</span>
      </v-toolbar-title>
      <div style="min-width:30px; width:100px;"/>
      <v-btn text to="/">Trending</v-btn>
      <v-btn text to="/profile">Video</v-btn>
      <v-btn text>Category</v-btn>

    </v-toolbar-items>
    <v-text-field hide-details prepend-icon="mdi-magnify" style="min-width:100px;"></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text>Sign Up</v-btn>
      <v-btn text>Sign In</v-btn>
      <!-- <v-btn flat text to="/profile">Profile</v-btn> -->
      <!-- <v-btn icon id="logout">
      <v-icon>mdi-export</v-icon>
      </v-btn>-->
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
export default {};
</script>
<style scoped>
</style>