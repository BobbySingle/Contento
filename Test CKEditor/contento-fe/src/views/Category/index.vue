<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="topic-title">
          <v-icon color="black" class="mb-2">grade</v-icon>
          {{this.$store.state.viewer.categoryName}}
        </h2>
      </v-col>
      <v-col cols="12" v-for="item in getPaginationCate" :key="item.id">
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
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MediumNews from "../../components/MediumNews/index.vue";
export default {
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
    }),
    onClickPage(selectedPage) {
      this.setCurrentSelectedPage(selectedPage);
    },
    async setData() {
      let category = JSON.parse(sessionStorage.getItem("category"));
      await Promise.all([
        this.getNewsTags(category.id),
        this.setCategoryName(category.name)
      ]);
    }
  },
  mounted() {
    this.setData();
  }
};
</script>

<style>
</style>