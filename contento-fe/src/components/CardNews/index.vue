<template>
  <v-card class="mx-auto" height="320px" @click="clickNews(news)">
    <v-img
      ref="refImg"
      :src="news.image[0]"
      max-height="200px"
      aspect-ratio="1"
      lazy-src="https://picsum.photos/1920/1080"
      @error="imgError"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-text class="black--text" style="height:70px">
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
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["news"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    ...mapActions({
      countContent: "viewer/countContent"
    }),
    async clickNews(event) {
      sessionStorage.setItem("NewsID", event.idTask);
      if (this.$store.state.authentication.loggedUser) {
        await this.countContent({
          idUser: this.getUser.id,
          idTask: event.idTask,
          tags: event.listIntTags
        });
      }
      this.$router.push("/News");
    },
    imgError() {
      // this.$refs.refImg.image.src =
      //   "https://picsum.photos/id/403/3997/2665?blur=5";
      this.$refs.refImg.isLoading = true;

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