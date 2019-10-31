<template>
  <!-- /**Small card  */ -->
  <v-card class="mx-1" @click="clickNews(news.title)">
    <v-list-item three-line>
      <v-list-item-avatar color="white" tile size="80" style="border-radius:5px;">
        <!-- /**Small image */ -->
        <v-img :src="news.image"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <!-- /**Title */ -->
        <v-list-item-subtitle class="small-card-item--title black--text">{{news.title}}</v-list-item-subtitle>

        <!-- /**Release date */ -->
        <v-list-item-subtitle style="color:rgb(0, 0, 0, 0.6);">{{news.releaseDate}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: ["news"],
  data() {
    return {};
  },
  methods: {
    clickNews(event) {
      alert(event);
    }
  }
};
</script>
<style scoped>
.small-card-item--title {
  font-weight: 350;
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>