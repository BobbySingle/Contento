<template>
  <v-card class="mx-auto" height="300px" @click="clickNews(news.idTask)">
    <v-img :src="news.image[0]" height="200px"></v-img>

    <v-card-text class="black--text">
      <span style="font-size:17px;" class="line-clamp">{{news.contents.name}}</span>
    </v-card-text>
    <v-row justify="end" class="mr-4">
      <span style="font-size:14px;">
        <v-icon small class="mr-1">today</v-icon>
        {{news.publishTime | moment("DD/MM/YYYY")}}
      </span>
    </v-row>
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
      sessionStorage.setItem("NewsID", event);
      this.$router.push("/News");
    }
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