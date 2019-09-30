<template>
  <v-container fluid>
    <!-- /** Slide post */ -->
    <v-carousel cycle hide-delimiter-background height="600px" show-arrows-on-hover class="slide">
      <v-carousel-item v-for="(item,i) in news" :key="i" :src="item.image">
        <div class="slide-title">
          <v-row class="line-clamp">
            <router-link to="/">
              <h1>{{item.title}}</h1>
            </router-link>
          </v-row>
          <v-row>
            <h3>
              <v-icon>today</v-icon>
              {{item.releaseDate}}
              <v-icon>bar_chart</v-icon>2.4k
            </h3>
          </v-row>
        </div>
      </v-carousel-item>
      <!-- /** frame-post */ -->
      <div class="frame-post">
        <!-- /**List post */ -->
        <div class="inner-frame-post">
          <h2 style="text-align: center;">What's Hot</h2>
          <!-- /**Small post */ -->
          <div style="margin-bottom:10px;" v-for="items in news" :key="items.id">
            <small-news :news="items" />
          </div>
        </div>
      </div>
    </v-carousel>
  </v-container>
</template>
<script>
import SmallNews from "../../components/Small News/index.vue";
export default {
  components: { SmallNews },
  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      news: [
        {
          id: 1,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups",
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
        }
      ]
    };
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.slide {
  position: relative;
}
.slide-title {
  position: absolute;
  background: rgba(0, 0, 0, 0.65);
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding-left: 30px;
  padding-right: 20px;
  max-width: 60%;
  left: 20px;
  bottom: 40px;
}
.slide-title h3 {
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
.line-clamp h1 {
  color: white;
  font-weight: 200;
}
.frame-post {
  position: absolute;
  border-radius: 5px;
  box-shadow: 0px 0px 8px 8px #00000036;
  max-width: 33.3%;
  min-width: 300px;
  height: 500px;
  right: 0px;
  margin-right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.65);
  overflow-y: scroll;
}
.frame-post::-webkit-scrollbar {
  display: none;
}
.inner-frame-post {
  margin: 30px;
}
.inner-frame-post h2 {
  color: white;
  font-weight: 200;
  margin-top: 10px;
  margin-bottom: 20px;
}
/* From 768 to 1023 px */
@media (max-width: 940px) {
  .frame-post {
    display: none;
  }
}
</style>