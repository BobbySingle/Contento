<template>
  <!-- /**Medium card  */ -->
  <v-card class="mx-1" @click="clickNews(news)">
    <v-list-item three-line>
      <v-list-item-avatar color="white" tile size="80" style="border-radius:5px;">
        <!-- /**Medium image */ -->
        <v-img
          :src="news.image[0]"
          aspect-ratio="1"
          lazy-src="https://picsum.photos/1920/1080"
          @error="imgError"
          ref="refImg"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <!-- /**Title */ -->
        <v-list-item-subtitle class="small-card-item--title black--text">{{news.contents.name}}</v-list-item-subtitle>

        <!-- /**Release date */ -->
        <v-list-item-subtitle
          style="color:rgb(0, 0, 0, 0.6);"
        >{{news.publishTime | moment("DD/MM/YYYY")}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
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
      event.listTags.forEach(el => {
        this.$ga.event({
          eventCategory: el.name,
          eventAction: "View",
          eventLabel: event.contents.name,
          eventValue: 1
        });
      });
      this.$ga.page("/News");
      this.$router.push("/News");
    },
    imgError() {
      console.log(this.$refs.refImg);
      // this.$refs.refImg.image.src =
      //   "https://picsum.photos/id/403/3997/2665?blur=5";
      this.$refs.refImg.isLoading = true;
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