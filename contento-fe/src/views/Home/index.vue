<template>
  <v-container>
    <!-- /** Slide post */ -->
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <h2 class="topic-title">
          <v-icon color="black" class="mb-2">grade</v-icon>Recommend
        </h2>
        <v-carousel cycle hide-delimiter-background show-arrows-on-hover class="slide">
          <v-carousel-item v-for="(item,i) in news" :key="i" :src="item.image">
            <div class="slide-title">
              <v-row class="line-clamp">
                <router-link to="/">
                  <h2>{{item.title}}</h2>
                </router-link>
              </v-row>
              <v-row justify="end">
                <v-icon small class="mr-1">today</v-icon>
                <h4>
                  {{item.releaseDate}}
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
            <div style="margin-bottom:10px;" v-for="item in news" :key="item.id">
              <small-news :news="item" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="py-12">
      <v-col cols="3" v-for="item in getPaginationNews" :key="item.id">
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
  </v-container>
</template>
<script>
import SmallNews from "../../components/SmallNews/index.vue";
import CardNews from "../../components/CardNews/index.vue";
import axios from "axios";
import Cookie from "js-cookie";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { SmallNews, CardNews },
  data() {
    return {
      tags: [{ id: 1, name: "THỂ THAO" }, { id: 2, name: "DU LỊCH" }],
      news: [
        {
          id: 1,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=15",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 2,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=16",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 3,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=17",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 4,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=25",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 5,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=19",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 6,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=20",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 7,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1053",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 8,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1052",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 9,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1051",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 10,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1043",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 11,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1042",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 12,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1040",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 13,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=104",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 14,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1031",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 15,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1029",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 16,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1022",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 17,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1021",
          releaseDate: "30/9/2019",
          link: "/"
        },
        {
          id: 18,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
          image: "https://picsum.photos/1500/1000?image=1063",
          releaseDate: "30/9/2019",
          link: "/"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getPaginationNews"]),
    isInFirstPage() {
      return this.$store.state.currentPage === 1;
    },
    isInLastPage() {
      return this.$store.state.currentPage === this.$store.state.totalPages;
    }
  },
  methods: {
    ...mapActions({
      setCurrentSelectedPage: "viewer/setCurrentSelectedPage",
      setNewsData: "viewer/setNewsData",
      postTags: "viewer/postTags"
    }),
    onClickPage(selectedPage) {
      this.setCurrentSelectedPage(selectedPage);
    },
    setData() {
      this.setNewsData(this.news);
      let category = JSON.stringify(this.tags);
      // let message = "{[]}";
      let thisa = [1, 2, 3];

      Cookie.set("test", thisa, { expires: 365 });
      // this.$cookies.set("user_session", message);
      console.log(Cookie.getJSON("test"));
      this.postTags({ tags: thisa });
    }
  },
  mounted() {
    axios.defaults.withCredentials = true;
    // axios.create({
    //   withCredentials: true
    // });
    axios.defaults.headers = {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Content-Type": "application/json"
      // Authorization: localStorage.getItem("access-token")
    };
    this.setData();
  }
};
</script>
<style scoped>
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
  left: 0px;
  bottom: 0px;
}
/* .slide-title {
  position: absolute;
  background: rgba(0, 0, 0, 0.65);
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding-left: 30px;
  padding-right: 30px;
  max-width: 100%;
  margin-right: 20px;
  left: 20px;
  bottom: 40px;
} */
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