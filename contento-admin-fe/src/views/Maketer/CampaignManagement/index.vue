<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Campaign Management</h1>
    </v-row>
    <!-- /**Begin Search  */ -->
    <v-row no-gutters class="mx-10">
      <v-col sm="8" md="9">
        <div class="search-filter">
          <v-icon class="icon">searchs</v-icon>
          <input
            class="input-field text__14"
            type="text"
            placeholder="Customer,Title"
            name="search"
            v-model="search"
          />
        </div>
      </v-col>
      <v-col sm="4" md="3" style="display:flex; justify-content:flex-end;">
        <popup-create-campaign></popup-create-campaign>
      </v-col>
    </v-row>
    <!-- /** End Search */ -->

    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listCampaigns"
            :search="search"
            style="width:100%"
            :mobile-breakpoint="600"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
          >
            <template v-slot:item.customerName="{item}">
              <v-col
                class="text__14"
                style="display:flex; align-items:center;"
                v-bind:class="{ campaign_success:item.idStatus == 1, campaign_on_going:item.idStatus == 2,campaign_overdue:item.idStatus == 3}"
              >
                <div>
                  <span
                    @click="clickCampaign(item)"
                    class="customer-inner-table text__14"
                  >{{item.customerName}}</span>
                </div>
              </v-col>
            </template>
            <template v-slot:item.title="{item}">
              <div class="campaign-details py-2" @click="clickCampaign(item)">
                <div>
                  <span class="text__14">{{ item.title }}</span>
                </div>
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
                style="color:white;"
                class="text__14"
              >Success</v-chip>
              <v-chip
                v-if="item.idStatus === 2"
                color="warning"
                style="color:white;"
                class="text__14"
              >On Going</v-chip>
              <v-chip
                v-if="item.idStatus === 3"
                color="error"
                style="color:white;"
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
import PopupCreateCampaign from "../../../components/Popup/CreateCampaign.vue";
import PopupEditCampaign from "../../../components/Popup/EditCampaign.vue";
import axios from "axios";
import { timeout } from "q";
export default {
  components: { PopupCreateCampaign, PopupEditCampaign },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      /**End Pagination */
      dialog: false,
      menu: false,
      search: "",
      loading: true,
      /**List Content */
      headers: [
        {
          text: "Customer",
          align: "center",
          value: "customerName",
          width: "15%"
        },
        { text: "Title", value: "title", sortable: false, width: "35%" },
        { text: "Start", value: "startedDate", align: "center", width: "15%" },
        { text: "End", value: "endDate", align: "center", width: "15%" },
        { text: "Status", value: "idStatus", align: "center", width: "10%" },
        { text: "Action", value: "action", align: "center", width: "10%" }
      ],
      listCampaigns: [
        // {
        //   id: 2,
        //   customerName: "Customer 1",
        //   created: "2019-09-07T15:20:03.146Z",
        //   endDate: "2019-10-17T15:20:03.146Z",
        //   idStatus: 1,
        //   title: "What are you doing?",
        //   description:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        //   listTag: ["Film", "Social", "Food & Drink"]
        // },
        // {
        //   id: 3,
        //   customerName: "Customer 1",
        //   created: "2019-09-10T15:20:03.146Z",
        //   endDate: "2019-10-17T15:20:03.146Z",
        //   idStatus: 2,
        //   title: "How to Launch a Successful Marketing Campaign",
        //   description:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        //   listTag: ["Film", "Social", "Food & Drink"]
        // },
        // {
        //   id: 4,
        //   customerName: "Customer 1",
        //   created: "2019-09-12T15:20:03.146Z",
        //   endDate: "2019-10-17T15:20:03.146Z",
        //   idStatus: 3,
        //   title: "How to Launch a Successful Marketing Campaign",
        //   description:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        //   listTag: ["Film", "Social", "Food & Drink"]
        // }
      ]
    };
  },
  methods: {
    clickCampaign: function(event) {
      localStorage.setItem("Campaign", JSON.stringify(event));
      this.$router.push("/CampaignDetails");
    },
    /**Begin format time created */
    formatListCampaign() {
      this.listCampaigns.forEach(el => {
        el.startedDate = this.$moment(String(el.startedDate)).format(
          "YYYY-MM-DD hh:mm"
        );
        el.endDate = this.$moment(String(el.endDate)).format(
          "YYYY-MM-DD hh:mm"
        );
      });
    }
    /**End format time created */
  },
  mounted() {
    // this.$axios({
    //   method: "get",
    //   url: "api/campaign"
    // })
    axios
      .get(`http://34.87.31.23:8066/api/campaign`)
      .then(rs => {
        this.listCampaigns = rs.data;
        this.formatListCampaign();
        console.log(rs.data);
      })
      .catch(er => {
        console.log(er);
      });
    // this.formatListContent();
  }
};
</script>
<style scoped>
.search-filter {
  height: 40px;
  display: flex;
  margin-bottom: 10px;
}

/* Style the search icons */
.icon {
  padding-left: 25px;
  background: rgb(100, 100, 100);
  color: white;
  min-width: 50px;
  text-align: center;
}

/* Style the input fields */
.input-field {
  width: 100%;
  padding: 10px;
  border: 2px solid rgb(100, 100, 100);
}

.input-field:focus {
  box-shadow: 0px 0px 5px 5px rgba(45, 118, 255, 0.6);
}

.filter {
  height: 40px;
  display: flex;
}

.customer-inner-table:hover {
  color: rgb(83, 138, 255);
  transition: 0.5s;
  cursor: pointer;
}
/**Begin Status - line */

.campaign_success {
  /* border-left: 4px solid #3cd1c2; */
  border-left: 4px solid #4caf50;
  height: 100%;
}
.campaign_on_going {
  /* border-left: 4px solid orange; */
  border-left: 4px solid #fb8c00;
  height: 100%;
}
.campaign_overdue {
  /* border-left: 4px solid tomato; */
  border-left: 4px solid #ff5252;
  height: 100%;
}
/** End Status - line */
.campaign-details span {
  font-weight: bold;
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
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
  /* cursor: pointer; */
  font-weight: bold;
  transition: 0.5s;
}
</style>