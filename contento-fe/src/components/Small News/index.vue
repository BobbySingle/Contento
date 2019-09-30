<template>
  <!-- /**Small card  */ -->
  <v-card class="mx-auto small-card">
    <v-list-item three-line class="small-card-item">
      <v-list-item-avatar color="white" tile size="80" style="border-radius:5px;">
        <!-- /**Small image */ -->
        <v-img :src="news.image"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <!-- /**Title */ -->
        <v-list-item-subtitle class="small-card-item--title"><router-link :to="news.link">{{news.title}}</router-link></v-list-item-subtitle>

        <!-- /**Release date */ -->
        <v-list-item-subtitle style="color:rgb(60, 60, 60);">{{news.releaseDate}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: ["news"]
};
</script>
<style scoped>
a{
  text-decoration: none;
  color: white !important;
}
.small-card{
  background:rgba(0, 0, 0, 0.0);
}
.small-card-item {
  background: rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 5px 5px #6f6f6f36;
}
.small-card-item--title {
  color: white;
  font-weight: 400;
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>