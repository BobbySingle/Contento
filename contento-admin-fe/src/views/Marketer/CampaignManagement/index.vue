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
        <popup-create-campaign />
      </v-col>
    </v-row>
    <!-- /** End Search */ -->

    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listCampaign"
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
            <template
              v-slot:item.startedDate="{ item }"
            >{{item.startedDate | moment("HH:mm DD/MM/YYYY")}}</template>
            <template v-slot:item.endDate="{ item }">{{item.endDate | moment("HH:mm DD/MM/YYYY")}}</template>
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
import PopupCreateCampaign from "../../../components/Popup/CreateCampaign.vue";
import PopupEditCampaign from "../../../components/Popup/EditCampaign.vue";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
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
          value: "customer",
          width: "15%"
        },
        { text: "Title", value: "title", sortable: false, width: "35%" },
        { text: "Start", value: "startedDate", align: "center", width: "15%" },
        { text: "End", value: "endDate", align: "center", width: "15%" },
        { text: "Status", value: "status", align: "center", width: "10%" },
        { text: "Action", value: "action", align: "center", width: "10%" }
      ]
    };
  },
  methods: {
    clickCalendar(event) {
      sessionStorage.setItem("CampaignID", JSON.stringify(event));
      this.$router.push("/Calendar");
    },
    clickCampaign(event) {
      sessionStorage.setItem("CampaignID", JSON.stringify(event));
      this.$router.push("/CampaignDetails");
    },
    ...mapActions({
      getCampaigns: "campaign/getListCampaign",
      getListCustomer: "authentication/getListCustomerByMarketerID",
      getListEditor: "authentication/getListEditorByMarketerID",
      getListTag: "contentprocess/getListTag",
      loadUser: "authentication/setUser"
    }),

    async fetchData() {
      await this.getCampaigns(this.getUser.id);
      await this.getListCustomer(this.$store.getters.getUser.id);
      await this.getListEditor(this.$store.getters.getUser.id);
      await this.getListTag();
    }
  },
  computed: {
    ...mapGetters(["getUser", "listCampaign"])
  },
  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$store.getters.getAccessToken;
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