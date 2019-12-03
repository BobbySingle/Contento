<template >
  <v-container @scroll="handleScroll">
    <v-btn
      fab
      color="primary"
      @click="$vuetify.goTo(0)"
      v-if="isShowScroll"
      class="scroll"
      id="scrollTopBtn"
    >Top</v-btn>
    <v-row>
      <v-col cols="12">
        <h2 class="topic-title" ref="cate">
          <v-icon color="black" class="mb-2">grade</v-icon>
          {{this.$store.state.viewer.categoryName}}
        </h2>
      </v-col>
    </v-row>
    <div v-if="getPaginationCate.length > 0">
      <v-row>
        <v-col cols="12" md="4" v-for="item in getPaginationCate" :key="item.id">
          <medium-news :news="item" />
        </v-col>
      </v-row>
      <div class="text-xs-center" style="margin-bottom: 50px">
        <v-pagination
          v-model="$store.state.viewer.currentCatePage"
          :length="this.$store.state.viewer.totalCatePages"
          :total-visible="7"
          @input="onClickPage"
          next=":disabled='isInLastPage'"
          previous=":disabled='isInFirstPage'"
        ></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MediumNews from "../../components/MediumNews/index.vue";
export default {
  data() {
    return {
      isShowScroll: false
    };
  },
  components: { MediumNews },
  computed: {
    ...mapGetters(["getPaginationCate", "getUser"]),
    isInFirstPage() {
      return this.$store.state.viewer.currentCatePage === 1;
    },
    isInLastPage() {
      return (
        this.$store.state.viewer.currentCatePage ===
        this.$store.state.viewer.totalCatePages
      );
    }
  },
  methods: {
    ...mapActions({
      setCurrentCateSelectedPage: "viewer/setCurrentCateSelectedPage",
      getNewsTags: "viewer/getNewsTags",
      setCategoryName: "viewer/setCategoryName",
      spinnerLoading: "spinner/spinnerLoading"
    }),
    onClickPage(selectedPage) {
      this.setCurrentCateSelectedPage(selectedPage);
      this.$vuetify.goTo(this.$refs.cate);
    },
    async setData() {
      await this.spinnerLoading(true);
      let category = JSON.parse(sessionStorage.getItem("category"));
      await Promise.all([
        this.getNewsTags(category.id),
        this.setCategoryName(category.name)
      ]);
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
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
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
</style>