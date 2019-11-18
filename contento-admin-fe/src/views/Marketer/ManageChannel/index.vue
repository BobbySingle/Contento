<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Manage Channel Publish</h1>
    </v-row>
    <v-row no-gutters class="mx-6">
      <v-col sm="8" md="9">
        <div class="search-filter">
          <v-icon class="icon">searchs</v-icon>
          <input
            class="input-field text__14"
            type="text"
            placeholder="Name"
            name="search"
            v-model="search"
          />
        </div>
      </v-col>
      <v-col sm="4" md="3" style="display:flex; justify-content:flex-end;">
        <create-channel />
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
                      title="From Time"
                      type="datetime"
                      v-model="fromFilter"
                      placeholder="From time"
                      input-class="css_time"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="fromFilter">
                    <v-btn icon @click="clearFromFilter()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="To Time"
                      type="datetime"
                      v-model="toFilter"
                      placeholder="To time"
                      input-class="css_time"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="toFilter">
                    <v-btn icon @click="clearToFilter()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="customerFilter"
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
                  v-model="channelFilter"
                  :items="channels"
                  item-text="name"
                  item-value="id"
                  label="Channel"
                  prepend-inner-icon="public"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" align-self="center">
                <v-row justify="end">
                  <v-btn color="primary" @click="Clear()">Clear</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="fanpages"
            style="width:100%"
            :mobile-breakpoint="600"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            :loading="loading"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.name="{item}">
              <div class="title py-2" @click="clickFanpage(item)">
                <span class="text__14">{{ item.name }}</span>
              </div>
            </template>
            <template v-slot:item.channel="{item}">
              <div>
                <v-chip
                  style="color: white;"
                  color="success"
                  small
                  v-if="item.channel.id == 1"
                >{{item.channel.name}}</v-chip>
              </div>
              <div>
                <v-chip
                  style="color: white;"
                  color="#1874ec"
                  small
                  v-if="item.channel.id == 2"
                >{{item.channel.name}}</v-chip>
              </div>
              <div>
                <v-chip
                  style="color: white;"
                  color="#444444"
                  small
                  v-if="item.channel.id == 3"
                >{{item.channel.name}}</v-chip>
              </div>
            </template>
            <template v-slot:item.tags="{item}">
              <div>
                <v-chip x-small light v-for="topic in item.tags" :key="topic.id">{{topic.name}}</v-chip>
              </div>
            </template>
            <template v-slot:item.customer="{item}">{{item.customer.name}}</template>
            <template v-slot:item.modifiedDate="{item}">
              <span
                v-if="item.channel.id != 1"
              >{{item.modifiedDate|localTime()|moment("HH:mm DD/MM/YYYY")}}</span>
            </template>
            <template v-slot:item.action="{item}">
              <v-row class="flex-nowrap" justify="center">
                <edit-channel :channelID="item.id" v-if="item.id > 1" />
                <v-btn
                  icon
                  color="error"
                  class="ml-2"
                  @click="deleteFP(item.id)"
                  v-if="item.id > 1"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn icon color="primary" class="ml-2" @click="gotoURL(item)">
                  <v-icon>mdi-link</v-icon>
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
import { mapGetters, mapActions } from "vuex";
import CreateChannel from "../../../components/Popup/CreateChannel.vue";
import EditChannel from "../../../components/Popup/EditChannel.vue";
import { METHODS } from "http";
export default {
  components: { CreateChannel, EditChannel },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      loading: false,
      panel: [],
      fromFilter: "",
      toFilter: "",
      customerFilter: "",
      channelFilter: "",
      channels: [
        { id: 1, name: "Contento" },
        { id: 2, name: "Facebook" },
        { id: 3, name: "Wordpress" }
      ],
      headers: [
        {
          text: "Name",
          align: "left",
          value: "name",
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
          text: "Channel",
          value: "channel",
          sortable: false,
          filter: value => {
            if (!this.channelFilter) return true;
            return value.id == this.channelFilter;
          }
        },
        {
          text: "Category",
          value: "tags",
          sortable: false,
          width: "20%"
        },
        {
          text: "Customer",
          value: "customer",
          align: "center",
          sortable: false,
          filter: value => {
            if (!this.customerFilter) return true;
            return value.id == this.customerFilter;
          }
        },
        {
          text: "Last Update",
          value: "modifiedDate",
          align: "center",
          filter: value => {
            if (!this.fromFilter && !this.toFilter) return true;
            if (this.fromFilter != "" && this.toFilter == "") {
              return this.fromFilter <= value;
            } else if (this.fromFilter == "" && this.toFilter != "") {
              return value <= this.toFilter;
            } else {
              return this.fromFilter <= value && value <= this.toFilter;
            }
          }
        },
        {
          text: "Action",
          value: "action",
          sortable: false,
          align: "center"
        }
      ]
    };
  },
  filters: {
    localTime: function(value) {
      if (!value) return "";

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
      this.fromFilter = "";
      this.toFilter = "";
      this.customerFilter = "";
      this.channelFilter = "";
    },
    clearFromFilter() {
      this.fromFilter = "";
    },
    clearToFilter() {
      this.toFilter = "";
    },
    async gotoURL(event) {
      if (event.id == 1) {
        window.open("http://contento-view.s3-website-ap-southeast-1.amazonaws.com/");
      } else {
        let status = await this.checkTokenGetLink({
          channelId: event.channel.id,
          token: event.token
        });
        if (status == 202) {
          window.open(this.linkFanpage);
        }
      }
    },
    clickFanpage(event) {
      sessionStorage.setItem("Fanpage", JSON.stringify(event));
      this.$router.push("/ManageContentFanpage");
    },
    ...mapActions({
      getListCustomer: "authentication/getListCustomerByMarketerID",
      getFanPages: "batchjob/getFanPages",
      deleteFanPage: "batchjob/deleteFanPage",
      getListTag: "contentprocess/getListTag",
      checkTokenGetLink: "batchjob/checkTokenGetLink"
    }),
    async deleteFP(id) {
      this.loading = true;
      let status = await this.deleteFanPage(id);
      if (status == 200) {
        this.loading = false;
      }
      this.loading = false;
    },
    async fetchData() {
      this.loading = true;
      await Promise.all([
        this.getListCustomer(this.$store.getters.getUser.id),
        this.getFanPages(this.$store.getters.getUser.id),
        this.getListTag()
      ]);
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters(["listCustomer", "fanpages", "linkFanpage"])
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

.title span {
  font-weight: bold;
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.title:hover {
  cursor: pointer;
}
</style>