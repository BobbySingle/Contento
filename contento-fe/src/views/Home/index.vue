<template>
  <v-container @scroll="handleScroll">
    <v-btn
      fab
      color="primary"
      @click="$vuetify.goTo(0)"
      v-if="isShowScroll"
      class="scroll"
      >Top</v-btn
    >
    <!-- /** Slide post */ -->
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <h2 class="topic-title">
          <v-icon color="black" class="mb-2">grade</v-icon>Hot News
        </h2>
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          class="slide"
        >
          <v-carousel-item
            v-for="(item, i) in trends"
            :key="i"
            :src="item.image[0]"
            ref="carousel"
          >
            <div class="slide-title">
              <v-row class="line-clamp">
                <h2 class="news_title" @click="clickNews(item)">
                  {{ item.contents.name }}
                </h2>
              </v-row>
              <v-row justify="start">
                <v-icon small class="mr-1">today</v-icon>
                <h4>
                  {{ item.publishTime | moment("DD/MM/YYYY") }}
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
          <h2 style="text-align: center;">Sponsored Content</h2>
          <!-- /**List post */ -->
          <div class="inner-frame-post">
            <!-- /**Small post */ -->
            <div style="margin-bottom:10px;" v-for="item in ads" :key="item.id">
              <small-news :news="item" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="my-12" v-if="getPaginationNews.length > 0">
      <v-divider />
      <v-row>
        <v-col cols="12">
          <h2 class="topic-title" ref="forYou">
            <v-icon color="black" class="mb-2">grade</v-icon>For you
          </h2>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          md="3"
          v-for="item in getPaginationNews"
          :key="item.id"
        >
          <card-news :news="item" />
        </v-col>
      </v-row>
      <div class="text-xs-center my-8">
        <v-pagination
          v-model="$store.state.viewer.currentPage"
          :length="this.$store.state.viewer.totalPages"
          :total-visible="7"
          @input="onClickPage"
          next=":disabled='isInLastPage'"
          previous=":disabled='isInFirstPage'"
        ></v-pagination>
      </div>
    </div>
    <div
      v-if="
        this.$store.state.authentication.loggedUser &&
          getPaginationRecommend.length > 0
      "
    >
      <v-divider />
      <v-row>
        <v-col cols="12">
          <h2 class="topic-title" ref="recommend">
            <v-icon color="black" class="mb-2 ml-2"
              >mdi-newspaper-variant-multiple-outline</v-icon
            >Recommend for you
          </h2>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          md="3"
          v-for="item in getPaginationRecommend"
          :key="item.id"
        >
          <card-news :news="item" />
        </v-col>
      </v-row>
      <div class="text-xs-center my-8">
        <v-pagination
          v-model="$store.state.viewer.currentRecommendPage"
          :length="this.$store.state.viewer.totalRecommendPages"
          :total-visible="7"
          @input="onClickRecommendPage"
          next=":disabled='isInLastRecommendPage'"
          previous=":disabled='isInFirstRecommendPage'"
        ></v-pagination>
      </div>
    </div>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title class="headline"
          >You are interested in the topic:</v-card-title
        >
        <v-row no-gutters class="mx-4">
          <v-col cols="4" v-for="item in listCategory" :key="item.id">
            <v-checkbox
              v-model="userSelectedTopics"
              :label="item.name"
              :value="item.id"
            ></v-checkbox>
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
      userSelectedTopics: [],
      isShowScroll: false
    };
  },
  computed: {
    ...mapGetters([
      "getPaginationNews",
      "getPaginationRecommend",
      "listCategory",
      "trends",
      "getUser",
      "ads",
      "recommend"
    ]),
    isInFirstPage() {
      return this.$store.state.viewer.currentPage === 1;
    },
    isInLastPage() {
      return (
        this.$store.state.viewer.currentPage ===
        this.$store.state.viewer.totalPages
      );
    },
    isInFirstRecommendPage() {
      return this.$store.state.viewer.currentRecommendPage === 1;
    },
    isInLastRecommendPage() {
      return (
        this.$store.state.viewer.currentRecommendPage ===
        this.$store.state.viewer.totalRecommendPages
      );
    }
  },
  methods: {
    async clickNews(event) {
      sessionStorage.setItem("NewsID", event.idTask);
      if (this.$store.state.authentication.loggedUser) {
        await this.countContent({
          idUser: this.getUser.id,
          idTask: event.idTask,
          tags: event.listIntTags
        });
      } else {
        await this.countContent({
          idUser: 0,
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
    ...mapActions({
      setCurrentSelectedPage: "viewer/setCurrentSelectedPage",
      setCurrentRecommendSelectedPage: "viewer/setCurrentRecommendSelectedPage",
      getContent: "viewer/getContent",
      getTags: "viewer/getTags",
      getTrends: "viewer/getTrends",
      getAds: "viewer/getAds",
      countContent: "viewer/countContent",
      getRecommendNews: "viewer/getRecommendNews",
      spinnerLoading: "spinner/spinnerLoading"
    }),
    onClickPage(page) {
      this.setCurrentSelectedPage(page);
      this.$vuetify.goTo(this.$refs.forYou);
    },
    onClickRecommendPage(page) {
      this.setCurrentRecommendSelectedPage(page);
      this.$vuetify.goTo(this.$refs.recommend);
    },
    async clickOK() {
      localStorage.setItem("guest", JSON.stringify(this.userSelectedTopics));
      if (this.userSelectedTopics == "") {
        await this.getContent({ tags: [0] });
      } else {
        await this.getContent({ tags: this.userSelectedTopics });
      }
      this.dialog = false;
    },
    async setData() {
      await this.spinnerLoading(true);
      const timeOut = t => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("");
          }, t);
        });
      };
      await Promise.all([
        timeOut(700),
        this.getTags(),
        this.getTrends(),
        this.getAds()
      ]);
      let guest = JSON.parse(localStorage.getItem("guest"));
      if (this.$store.state.authentication.loggedUser) {
        await this.getRecommendNews(this.getUser.id);
        this.getContent({ id: this.getUser.id, tags: [0] });
      } else {
        if (guest == undefined) {
          await this.getContent({ tags: [0] });
          this.dialog = true;
        } else {
          if (guest == "") {
            await this.getContent({ tags: [0] });
          } else {
            await this.getContent({ tags: guest });
          }
        }
      }
      await this.spinnerLoading(false);
    },
    handleScroll() {
      if (window.scrollY > 100) {
        this.isShowScroll = true;
      } else {
        this.isShowScroll = false;
      }
    }
  },
  mounted() {
    this.setData();
    this.$ga.page("/");
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
.scroll {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9;
  animation: line 0.5s linear;
}
@keyframes line {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
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
