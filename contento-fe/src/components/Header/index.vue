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
        <span>Contento</span>
      </v-toolbar-title>
      <div style="min-width:30px; width:100px;" />
      <v-btn text to="/">Trending</v-btn>
      <v-btn text to="/profile">Video</v-btn>
      <!-- <v-btn text>Category</v-btn> -->
      <v-menu bottom max-height="200" min-width="400"  max-width="400" offset-y="true" origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Category</v-btn>
        </template>
        <div v-bar>
        <v-list>
          <v-list-item style="float: left;  width:50%; background: white;" v-for="(item, i) in items" :key="i" @click>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        </div>
      </v-menu>
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
    ]
  })
};
</script>
<style scoped>

</style>