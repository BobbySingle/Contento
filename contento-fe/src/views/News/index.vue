<template>
  <v-container v-if="newsDetails" @scroll="handleScroll">
    <v-btn fab color="warning" @click="$router.go(-1)" class="scroll-back"
      >Back</v-btn
    >
    <v-btn
      fab
      color="primary"
      @click="$vuetify.goTo(0)"
      v-if="isShowScroll"
      class="scroll"
      >Top</v-btn
    >
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <h1 class="my-4">{{ newsDetails.contents.name }}</h1>
        <div
          v-html="newsDetails.contents.content"
          class="content ck-content"
        ></div>
        <v-row justify="end" class="mx-4">
          <h3>{{ newsDetails.writer.name }}</h3>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      content: "",
      writer: "",
      isShowScroll: false
    };
  },
  computed: {
    ...mapGetters(["newsDetails"])
  },
  methods: {
    ...mapActions({
      getNewsDetails: "viewer/getNewsDetails",
      spinnerLoading: "spinner/spinnerLoading"
    }),
    async fetchData() {
      await this.spinnerLoading(true);
      let newsID = sessionStorage.getItem("NewsID");
      let status = await this.getNewsDetails(newsID);
      if (status == 200) {
        this.title = this.newsDetails.contents.name;
        this.content = this.newsDetails.contents.content;
        this.writer = this.newsDetails.writer.name;
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
    this.fetchData();
    this.$vuetify.goTo(0);
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
.scroll-back {
  position: fixed;
  bottom: 20px;
  left: 20px;
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
::v-deep p {
  text-align: justify;
}
::v-deep .table {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
::v-deep .image {
  display: flex;
  flex-direction: column;
  align-items: center;
}
::v-deep .image img {
  max-width: 100%;
  max-height: 100%;
}
::v-deep .table td {
  font-size: 14px;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}
</style>
