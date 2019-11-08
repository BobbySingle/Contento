<template>
  <v-container>
    <v-btn
      fab
      color="primary"
      @click="$vuetify.goTo(0)"
      style="position: fixed; bottom: 20px; right: 20px; z-index:9"
    >Top</v-btn>
    <!-- /** Slide post */ -->
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <h2 class="topic-title">
          <v-icon color="black" class="mb-2">grade</v-icon>Recommend
        </h2>
        <v-carousel cycle hide-delimiter-background show-arrows-on-hover class="slide">
          <v-carousel-item v-for="(item,i) in topNews" :key="i" :src="item.image[0]">
            <div class="slide-title">
              <v-row class="line-clamp">
                <h2 class="news_title" @click="clickNews(item.idTask)">{{item.contents.name}}</h2>
              </v-row>
              <v-row justify="start">
                <v-icon small class="mr-1">today</v-icon>
                <h4>
                  {{item.publishTime | moment("DD/MM/YYYY")}}
                  <!-- <v-icon>bar_chart</v-icon>2.4k -->
                </h4>
              </v-row>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col class="d-none d-md-block" md="4">
        <!-- /** frame-post */ -->
        <div class="frame-post">
          <h2 style="text-align: center;">What's Hot</h2>
          <!-- /**List post */ -->
          <div class="inner-frame-post">
            <!-- /**Small post */ -->
            <div style="margin-bottom:10px;" v-for="item in topNews" :key="item.id">
              <small-news :news="item" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="py-12">
      <v-col cols="4" md="3" v-for="item in getPaginationNews" :key="item.id">
        <card-news :news="item" />
      </v-col>
    </v-row>
    <div class="text-xs-center" style="margin-bottom: 50px">
      <v-pagination
        v-model="this.$store.state.viewer.currentPage"
        :length="this.$store.state.viewer.totalPages"
        :total-visible="7"
        @input="onClickPage"
        next=":disabled='isInLastPage'"
        previous=":disabled='isInFirstPage'"
      ></v-pagination>
    </div>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title class="headline">You are interested in the topic:</v-card-title>
        <v-row no-gutters class="mx-4">
          <v-col cols="4" v-for="item in listCategory" :key="item.id">
            <v-checkbox v-model="userSelectedTopics" :label="item.name" :value="item.id"></v-checkbox>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="clickOK()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import SmallNews from "../../components/SmallNews/index.vue";
import CardNews from "../../components/CardNews/index.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { SmallNews, CardNews },
  data() {
    return {
      dialog: false,
      userSelectedTopics: []
    };
  },
  computed: {
    ...mapGetters(["getPaginationNews", "listCategory", "topNews"]),
    isInFirstPage() {
      return this.$store.state.currentPage === 1;
    },
    isInLastPage() {
      return this.$store.state.currentPage === this.$store.state.totalPages;
    }
  },
  methods: {
    clickNews(event) {
      sessionStorage.setItem("NewsID", event);
      this.$router.push("/News");
    },
    ...mapActions({
      setCurrentSelectedPage: "viewer/setCurrentSelectedPage",
      setNewsData: "viewer/setNewsData",
      createCookie: "viewer/createCookie",
      getContent: "viewer/getContent",
      getTags: "viewer/getTags"
    }),
    onClickPage(selectedPage) {
      this.setCurrentSelectedPage(selectedPage);
    },
    async clickOK() {
      await this.createCookie({ key: "CCTT", value: this.userSelectedTopics });
      await this.$cookies.set("CCTT", this.userSelectedTopics, Infinity);
      await this.getContent();
      this.dialog = false;
    },
    async setData() {
      await this.getTags();
      if (this.$cookies.get("CCTT") == undefined) {
        this.dialog = true;
      } else {
        await this.createCookie({
          key: "CCTT",
          value: this.$cookies.get("CCTT")
        });
        await this.$cookies.set("CCTT", this.$cookies.get("CCTT"), Infinity);
        await this.getContent();
      }
    }
  },
  mounted() {
    axios.defaults.headers = {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Content-Type": "application/json",
      withCredentials: true,
      crossDomain: true
    };
    this.setData();
  }
};
</script>
<style scoped>
.news_title:hover {
  cursor: pointer;
}
a {
  text-decoration: none;
}
.topic-title {
  text-align: left;
  color: black;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 20px;
}
.slide {
  position: relative;
}
.slide-title {
  position: absolute;
  padding-left: 30px;
  padding-right: 30px;
  height: 160px;
  padding-top: 40px;
  background-image: linear-gradient(
    to top,
    black 0%,
    rgba(0, 0, 0, 0.8) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  max-width: 100%;
  min-width: 100%;
  left: 0px;
  bottom: 0px;
}
.slide-title h4 {
  color: white;
  font-weight: 200;
  margin-top: 10px;
  margin-bottom: 10px;
}

.line-clamp {
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.line-clamp h2 {
  color: white;
  font-weight: 200;
}
.frame-post {
  width: 100%;
}
.inner-frame-post::-webkit-scrollbar {
  display: none;
}
.inner-frame-post {
  overflow-y: scroll;
  height: 500px;
  margin-left: 10px;
}
.frame-post h2 {
  color: black;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>