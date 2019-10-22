<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">List Campaigns</h1>
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
            <template v-slot:item.customer="{item}">
              <v-col
                class="text__14"
                style="display:flex; align-items:center;"
                v-bind:class="{ campaign_success:item.status.id == 1, campaign_on_going:item.status.id == 2,campaign_overdue:item.status.id == 3}"
              >
                <div>
                  <span
                    @click="clickCampaign(item)"
                    class="customer-inner-table text__14"
                  >{{item.customer.name}}</span>
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
                  :key="topic.id"
                  class="tag-campaign-details text__14"
                >#{{topic.name}}</span>
              </div>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="item.status.color"
                style="color:white"
                class="text__14"
              >{{item.status.name}}</v-chip>
            </template>
            <template v-slot:item.action="{item}">
              <v-row class="flex-nowrap">
                <popup-edit-campaign :campaign="item.id" @editCampaign="editCampaign" />
                <v-btn color="success" fab small @click="clickCalendar(item)" class="mx-3">
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
import { mapGetters } from "vuex";
import axios from "axios";

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
      search: "",
      headers: [
        { text: "Title", value: "title", sortable: false, width: "50%" },
        { text: "Start", value: "startedDate", align: "center" },
        { text: "End", value: "endDate", align: "center" },
        { text: "Status", value: "status", align: "center" },
        { text: "Action", value: "action", align: "center", sortable: false }
      ],
      listCampaigns: []
    };
  },
  methods: {
    clickCalendar(event) {
      localStorage.setItem("Campaign", JSON.stringify(event));
      this.$router.push("/Calendar");
    },
    /**Begin change to campaign details */
    clickCampaign: function(event) {
      localStorage.setItem("Campaign", JSON.stringify(event));
      this.$router.push("/CampaignDetails");
    },
    /**End change to campaign details */
    editCampaign() {
      alert("Edit success!");
      this.fetchData();
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
  computed: {
    ...mapGetters(["getUser"])
  },
   created() {
    let role = this.getUser.role;
    if (role !== "Marketer" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
  },
  mounted() {
    let customerID = localStorage.getItem("customerID");
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$store.getters.getAccessToken;

    axios
      .get(
        `http://34.87.31.23:5001/api/campaign/campaigns/customers/${customerID}`
      )
      .then(rs => {
        this.listCampaigns = rs.data.reverse();
        this.formatListCampaign();
        console.log(rs.data);
      })
      .catch(er => {
        console.log(er);
      });
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