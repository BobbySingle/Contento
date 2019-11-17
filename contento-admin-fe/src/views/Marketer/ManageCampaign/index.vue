<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Manage Campaign</h1>
    </v-row>
    <!-- /**Begin Search  */ -->
    <v-row no-gutters class="mx-6">
      <v-col sm="8" md="9">
        <div class="search-filter">
          <v-icon class="icon">searchs</v-icon>
          <input
            class="input-field text__14"
            type="text"
            placeholder="Title"
            name="search"
            v-model="search"
          />
        </div>
      </v-col>
      <v-col sm="4" md="3" style="display:flex; justify-content: center;">
        <popup-create-campaign />
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-6 mb-2">
      <v-expansion-panels :accordion="true" :focusable="true" multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14">Advanced Filter:</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class=".flex-nowrap">
              <v-col cols="12" sm="6" md="3">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="[Start]From Time"
                      type="datetime"
                      v-model="startFromDate"
                      placeholder="[Start] From time"
                      input-class="css_time"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="startFromDate">
                    <v-btn icon @click="clearStartFromDate()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="[Start]To Time"
                      type="datetime"
                      v-model="startToDate"
                      placeholder="[Start] To time"
                      input-class="css_time"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="startToDate">
                    <v-btn icon @click="clearStartToDate()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="customer"
                  :items="listCustomer"
                  item-text="name"
                  item-value="id"
                  label="Customer"
                  prepend-inner-icon="account_circle"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="status"
                  :items="listStatusCampaign"
                  item-text="name"
                  item-value="id"
                  label="Status"
                  prepend-inner-icon="filter_list"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="[End]From Time"
                      type="datetime"
                      v-model="endFromDate"
                      placeholder="[End] From time"
                      input-class="css_time"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="endFromDate">
                    <v-btn icon @click="clearEndFromDate()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="[End]To Time"
                      type="datetime"
                      v-model="endToDate"
                      placeholder="[End] To time"
                      input-class="css_time"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="endToDate">
                    <v-btn icon @click="clearEndToDate()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="tagFilter"
                  :items="listTag"
                  item-text="name"
                  item-value="id"
                  label="Category"
                  prepend-inner-icon="category"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3" align-self="center">
                <v-row justify="center">
                  <v-btn color="primary" @click="Clear()">Clear</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <!-- /** End Search */ -->

    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listCampaign"
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
                  <span class="customer-inner-table text__14">{{item.customer.name}}</span>
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
                <v-chip x-small light v-for="topic in item.listTag" :key="topic.id">{{topic.name}}</v-chip>
              </div>
            </template>
            <template
              v-slot:item.startedDate="{ item }"
            >{{item.startedDate | localTime()|moment("HH:mm DD/MM/YYYY")}}</template>
            <template
              v-slot:item.endDate="{ item }"
            >{{item.endDate | localTime()| moment("HH:mm DD/MM/YYYY") }}</template>
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
              <v-pagination v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
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
      panel: [],
      dialog: false,
      menu: false,
      /**Filter */
      search: "",
      startFromDate: "",
      startToDate: "",
      endFromDate: "",
      endToDate: "",
      customer: "",
      tagFilter: "",
      status: "",

      loading: false,
      /**List Content */
      headers: [
        {
          text: "Customer",
          align: "left",
          value: "customer",
          width: "15%",
          sortable: false,
          filter: value => {
            if (!this.customer) return true;
            return value.id == this.customer;
          }
        },
        {
          text: "Title",
          value: "title",
          sortable: false,
          width: "35%",
          filter: value => {
            if (!this.search) return true;
            return (
              value
                .toString()
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) !== -1
            );
          }
        },
        {
          text: "Start",
          value: "startedDate",
          align: "center",
          width: "15%",
          filter: value => {
            if (!this.startFromDate && !this.startToDate) return true;
            if (this.startFromDate != "" && this.startToDate == "") {
              return this.startFromDate <= value;
            } else if (this.startFromDate == "" && this.startToDate != "") {
              return value <= this.startToDate;
            } else {
              return this.startFromDate <= value && value <= this.startToDate;
            }
          }
        },
        {
          text: "End",
          value: "endDate",
          filter: value => {
            if (!this.endFromDate && !this.endToDate) return true;
            if (this.endFromDate != "" && this.endToDate == "") {
              return this.endFromDate <= value;
            } else if (this.endFromDate == "" && this.endToDate != "") {
              return value <= this.endToDate;
            } else {
              return this.endFromDate <= value && value <= this.endToDate;
            }
          },
          align: "center",
          width: "15%"
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          width: "10%",
          filter: value => {
            if (!this.status) return true;
            return value.id == this.status;
          }
        },
        {
          text: "Action",
          value: "action",
          sortable: false,
          align: "center",
          width: "10%"
        },
        {
          text: "",
          value: "listTag",
          sortable: false,
          align: " d-none",
          filter: value => {
            if (!this.tagFilter) return true;
            for (const i in value) {
              if (value[i].id == this.tagFilter) {
                return value[i].id == this.tagFilter;
              }
            }
          }
        }
      ]
    };
  },
  filters: {
    localTime: function(value) {
      if (!value) {
        return "";
      }
      //Local TimeZone
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      var millisecondsTime = Date.parse(value + "Z");
      var newDateUTC7 = new Date(millisecondsTime - tzoffset)
        .toISOString()
        .slice(0, -1);
      return newDateUTC7;
    }
  },
  methods: {
    Clear() {
      this.startFromDate = "";
      this.startToDate = "";
      this.endFromDate = "";
      this.endToDate = "";
      this.customer = "";
      this.tagFilter = "";
      this.status = "";
    },
    clearStartFromDate() {
      this.startFromDate = "";
    },
    clearStartToDate() {
      this.startToDate = "";
    },
    clearEndFromDate() {
      this.endFromDate = "";
    },
    clearEndToDate() {
      this.endToDate = "";
    },
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
      loadUser: "authentication/setUser",
      getListStatusCampaign: "contentprocess/getListStatusCampaign"
    }),

    async fetchData() {
      this.loading = true;
      await Promise.all([
        this.getCampaigns(this.getUser.id),
        this.getListStatusCampaign(),
        this.getListCustomer(this.$store.getters.getUser.id),
        this.getListEditor(this.$store.getters.getUser.id),
        this.getListTag()
      ]);
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters([
      "getUser",
      "listCampaign",
      "listCustomer",
      "listStatusCampaign",
      "listTag"
    ])
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
::v-deep .css_time {
  cursor: pointer;
  padding-left: 10px;
  padding-top: 10px;
}
.out_css_time {
  background: url(../../../assets/calendar.png) no-repeat scroll 7px 7px;
  width: 100%;
  padding-left: 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #737373;
  overflow: hidden;
}

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