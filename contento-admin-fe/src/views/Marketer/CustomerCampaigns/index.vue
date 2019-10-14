<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">List Campaigns</h1>
    </v-row>
    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listtasks"
            style="width:100%;"
            class="text__14"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
          >
            <template v-slot:item.title="{item}">
              <div class="campaign-details py-2" @click="clickCampaign(item)">
                <div>
                  <span class="text__14" style="font-weight:bold;">{{ item.title }}</span>
                </div>
                <!-- <div>
              <h4>{{ item.description }}</h4>
                </div>-->
              </div>
              <div>
                <span
                  v-for="topic in item.listTag"
                  :key="topic"
                  class="tag-campaign-details text__14"
                >#{{topic}}</span>
              </div>
            </template>
            <template v-slot:item.idStatus="{ item }">
              <v-chip
                v-if="item.idStatus === 1"
                color="success"
                style="color:white"
                class="text__14"
              >Success</v-chip>
              <v-chip
                v-if="item.idStatus === 2"
                color="warning"
                style="color:white"
                class="text__14"
              >On Going</v-chip>
              <v-chip
                v-if="item.idStatus === 3"
                color="error"
                style="color:white"
                class="text__14"
              >Overdue</v-chip>
            </template>
            <template v-slot:item.action="{item}">
              <v-row class="flex-nowrap">
                <popup-edit-campaign :campaign="item" />
                <v-btn color="success" fab small router to="/Calendar" class="mx-3">
                  <v-icon>event</v-icon>
                </v-btn>
              </v-row>
            </template>
          </v-data-table>
          <v-row justify="center">
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PopupEditCampaign from "../../../components/Popup/EditCampaign.vue";
export default {
  components: { PopupEditCampaign },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      /**End Pagination */
      dialog: false,
      menu: false,
      /**List Content */
      headers: [
        { text: "Title", value: "title", sortable: false, width: "50%" },
        { text: "Start", value: "created", align: "center" },
        { text: "End", value: "endDate", align: "center" },
        { text: "Status", value: "idStatus", align: "center" },
        { text: "Action", value: "action", align: "center", sortable: false }
      ],
      listtasks: [
        {
          id: 2,
          customerName: "Customer 1",
          created: "2019-09-07T15:20:03.146Z",
          endDate: "2019-10-17T15:20:03.146Z",
          idStatus: 1,
          title: "How to Launch a Successful Marketing Campaign",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          listTag: ["Film", "Social", "Food & Drink"]
        },
        {
          id: 3,
          customerName: "Customer 1",
          created: "2019-09-10T15:20:03.146Z",
          endDate: "2019-10-17T15:20:03.146Z",
          idStatus: 2,
          title: "How to Launch a Successful Marketing Campaign",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          listTag: ["Film", "Social", "Food & Drink"]
        },
        {
          id: 4,
          customerName: "Customer 1",
          created: "2019-09-12T15:20:03.146Z",
          endDate: "2019-10-17T15:20:03.146Z",
          idStatus: 3,
          title: "How to Launch a Successful Marketing Campaign",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          listTag: ["Film", "Social", "Food & Drink"]
        }
      ]
    };
  },
  methods: {
    /**Begin change to campaign details */
    clickCampaign: function(event) {
      localStorage.setItem("Campaign", JSON.stringify(event));
      this.$router.push("/CampaignDetails");
    },
    /**End change to campaign details */

    /**Begin format time created */
    formatListContent() {
      this.listtasks.forEach(el => {
        el.created = this.$moment(String(el.created)).format(
          "YYYY-MM-DD hh:mm"
        );
        el.endDate = this.$moment(String(el.endDate)).format(
          "YYYY-MM-DD hh:mm"
        );
      });
    }
    /**End format time created */
  },
  created() {
    let role = localStorage.getItem("role");
    if (role !== "Marketer") {
      this.$router.push("/403");
    }
  },
  mounted() {
    this.formatListContent();
  }
};
</script>
<style scoped>
.campaign-details:hover {
  cursor: pointer;
}
.tr-table-campaign:hover {
  background-color: rgba(100, 100, 100, 0.1);
}
.tag-campaign-details {
  margin-right: 3px;
}
.tag-campaign-details:hover {
  cursor: pointer;
  font-weight: bold;
  transition: 0.5s;
}
</style>