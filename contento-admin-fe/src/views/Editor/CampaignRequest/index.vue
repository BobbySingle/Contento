<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Approve request</h1>
    </v-row>
    <!-- /**Begin Search  */ -->
    <v-row no-gutters class="mx-10">
      <v-col cols="12" sm="12">
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
    <v-row class="mx-10 .flex-nowrap">
      <v-col cols="6">
        <v-text-field
          v-model="fromDate"
          type="date"
          label="[End date] From:"
          prepend-icon="date_range"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="toDate"
          type="date"
          label="[End date] To:"
          prepend-icon="date_range"
        />
      </v-col>
    </v-row>
    <!-- /** End Search */ -->

    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listCampaignByEditorID"
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
                  <span class="text__14">{{item.customer.name}}</span>
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
            <template v-slot:item.startedDate="{item}">
              <span>{{item.startedDate | moment("HH:mm DD/MM/YYYY")}}</span>
            </template>
            <template v-slot:item.endDate="{item}">
              <span>{{item.endDate | moment("HH:mm DD/MM/YYYY")}}</span>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="item.status.color"
                style="color:white;"
                class="text__14"
              >{{item.status.name}}</v-chip>
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
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
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
      fromDate: "",
      toDate: "",
      loading: false,
      /**List Content */
      headers: [
        {
          text: "Customer",
          align: "left",
          value: "customer",
          sortable: false,
          width: "15%"
        },
        { text: "Title", value: "title", sortable: false, width: "35%" },
        {
          text: "Start",
          value: "startedDate",
          align: "center",
          width: "15%"
        },
        {
          text: "End",
          value: "endDate",
          align: "center",
          width: "15%",
          filter: value => {
            if (!this.fromDate && !this.toDate) return true;
            if (this.fromDate != "" && this.toDate == "") {
              return this.fromDate <= value;
            } else if (this.fromDate == "" && this.toDate != "") {
              return value <= this.toDate;
            } else {
              return this.fromDate <= value && value <= this.toDate;
            }
          }
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          width: "10%"
        }
      ],
      listCampaigns: []
    };
  },
  computed: {
    ...mapGetters(["getUser", "listCampaignByEditorID"])
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Editor" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
  },
  methods: {
    clickCampaign: function(event) {
      sessionStorage.setItem("CampaignID", JSON.stringify(event.id));
      this.$router.push("/CampaignRequestDetails");
    },
    ...mapActions({
      getListCampaign: "campaign/getListCampaignByEditorID",
      loadUser: "authentication/setUser"
    }),
    async fetchData() {
      this.loading = true;
      await this.getListCampaign(this.$store.getters.getUser.id);
      this.loading = false;
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