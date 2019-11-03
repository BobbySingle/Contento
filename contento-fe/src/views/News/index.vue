<template>
  <v-container v-if="newsDetails">
    <h1>{{newsDetails.contents.name}}</h1>
    <span v-html="newsDetails.contents.content"></span>
    <h5>{{newsDetails.writer.name}}</h5>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      content: "",
      writer: ""
    };
  },
  computed: {
    ...mapGetters(["newsDetails"])
  },
  methods: {
    ...mapActions({ getNewsDetails: "viewer/getNewsDetails" }),
    async fetchData() {
      let newsID = sessionStorage.getItem("NewsID");
      let status = await this.getNewsDetails(newsID);
      if (status == 200) {
        this.title = this.newsDetails.contents.name;
        this.content = this.newsDetails.contents.content;
        this.writer = this.newsDetails.writer.name;
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style>
</style>