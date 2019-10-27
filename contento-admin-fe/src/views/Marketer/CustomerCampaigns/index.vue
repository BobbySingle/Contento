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
            :items="listCampaignByCustomerID"
            :search="search"
            style="width:100%"
            :mobile-breakpoint="600"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            :loading="loading"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.customer="{item}">
              <v-col class="text__14" style="display:flex; align-items:center;">
                <div>
                  <span
                    @click="clickCampaign(item)"
                    class="customer-inner-table text__14"
                  >{{item.customer.name}}</span>
                </div>
              </v-col>
            </template>
            <template v-slot:item.title="{item}">
              <div class="campaign-details py-2" @click="clickCampaign(item.id)">
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
            <template v-slot:item.startedDate="{ item }">
              <span>{{item.startedDate | moment("HH:mm DD/MM/YYYY")}}</span>
            </template>
            <template v-slot:item.endDate="{ item }">
              <span>{{item.endDate | moment("HH:mm DD/MM/YYYY")}}</span>
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
                <popup-edit-campaign :campaignID="item.id" />
                <v-btn color="success" fab small @click="clickCalendar(item.id)" class="mx-3">
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
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
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
      loading: false,
      /**List Content */
      search: "",
      headers: [
        { text: "Title", value: "title", sortable: false, width: "50%" },
        { text: "Start", value: "startedDate", align: "center" },
        { text: "End", value: "endDate", align: "center" },
        { text: "Status", value: "status", align: "center" },
        { text: "Action", value: "action", align: "center", sortable: false }
      ]
    };
  },
  methods: {
    clickCalendar(event) {
      sessionStorage.setItem("CampaignID", JSON.stringify(event));
      this.$router.push("/Calendar");
    },
    /**Begin change to campaign details */
    clickCampaign: function(event) {
      sessionStorage.setItem("CampaignID", JSON.stringify(event));
      this.$router.push("/CampaignDetails");
    },
    /**End change to campaign details */
    ...mapActions({
      getListCampaign: "campaign/getListCampaignByCustomerID",
      getListCustomer: "authentication/getListCustomerByMarketerID",
      getListEditor: "authentication/getListEditorByMarketerID",
      getListTag: "contentprocess/getListTag"
    }),
    async fetchData() {
      this.loading = true;
      let customerID = sessionStorage.getItem("customerID");
      await this.getListCampaign(customerID);
      this.loading = false;
      this.getListCustomer(this.$store.getters.getUser.id);
      this.getListEditor(this.$store.getters.getUser.id);
      this.getListTag();
    }
  },
  computed: {
    ...mapGetters(["getUser", "listCampaignByCustomerID"])
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
    this.fetchData();
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