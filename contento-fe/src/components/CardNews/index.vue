<template>
  <v-card class="mx-auto" height="300px">
    <v-img :src="news.image" height="200px"></v-img>

    <v-card-text class="black--text">
      <span style="font-size:17px;" class="line-clamp">{{news.title}}</span>
    </v-card-text>
    <v-row justify="end" class="mr-4">
      <span style="font-size:14px;">
        <v-icon small class="mr-1">today</v-icon>
        {{news.releaseDate}}
      </span>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["news"],
  data() {
    return {};
  }
};
</script>

<style>
.line-clamp {
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>