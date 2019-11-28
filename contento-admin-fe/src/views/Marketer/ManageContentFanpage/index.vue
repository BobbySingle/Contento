<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Manage Content's Fanpage</h1>
    </v-row>
    <!-- /**Begin Search  */ -->
    <v-row no-gutters class="mx-6 mb-2">
      <v-col cols="12">
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
    </v-row>
    <v-row no-gutters class="mx-6 mb-2">
      <v-expansion-panels :accordion="true" :focusable="true" multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14">Advanced Filter:</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class=".flex-nowrap"></v-row>
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
            :items="listContentOfFanpage"
            style="width:100%"
            :mobile-breakpoint="600"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            :loading="loading"
            @page-count="pageCount = $event"
          >
            <template
              v-slot:item.publish_time="{item}"
            >{{item.publish_time| localTime()| moment("HH:mm DD/MM/YYYY")}}</template>
            <template v-slot:item.listTag="{item}">
              <div>
                <v-chip x-small light v-for="topic in item.listTag" :key="topic.id">{{topic.name}}</v-chip>
              </div>
            </template>
            <template v-slot:item.isAds="{item}">
              <div>
                <v-chip v-if="item.isAds" color="success">Advertising</v-chip>
                <v-chip v-else color="warning">No Advertising</v-chip>
              </div>
            </template>
            <template v-slot:item.action="{item}">
              <v-btn icon fab @click="clickDetail(item.id)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <v-row justify="center">
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount" :total-visible="10"></v-pagination>
            </div>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import axios from "axios";
import EditTask from "../../../components/Popup/EditTask.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { EditTask },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      panel: [],
      /**End Pagination */
      dialog: false,
      menu: false,
      search: "",
      endFromDate: "",
      endToDate: "",
      status: "",
      dataFanpage: [],
      loading: false,
      /**List Content */
      headers: [
        {
          text: "Title",
          value: "name",
          sortable: false,
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
          text: "Publish Time",
          value: "publish_time",
          align: "center"
        },
        {
          text: "Category",
          value: "listTag",
          sortable: false,
          width: "20%"
        },
        {
          text: "Action",
          value: "action",
          sortable: false,
          align: "center",
          width: "10%"
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
      this.endFromDate = "";
      this.endToDate = "";
      this.status = "";
      this.campaign = "";
    },
    clearEndFromDate() {
      this.endFromDate = "";
    },
    clearEndToDate() {
      this.endToDate = "";
    },
    clickDetail(event) {
      sessionStorage.setItem("ContentID", JSON.stringify(event));
      this.$router.push("/ContentPublishDetail");
    },
    ...mapActions({
      getListContentByFanPagesID: "batchjob/getListContentByFanPagesID",
      spinnerLoading: "spinner/spinnerLoading"
    }),
    async fetchData() {
      this.loading = true;
      this.dataFanpage = JSON.parse(sessionStorage.getItem("Fanpage"));
      if (this.dataFanpage.channel.id == 1) {
        this.headers = [];
        this.headers = [
          {
            text: "Title",
            value: "name",
            sortable: false,
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
            text: "Publish Time",
            value: "publish_time",
            align: "center"
          },
          {
            text: "Category",
            value: "listTag",
            sortable: false,
            width: "20%"
          },
          {
            text: "Ads Status",
            value: "isAds",
            sortable: false,
            align: "center",
            width: "10%"
          },
          {
            text: "Action",
            value: "action",
            sortable: false,
            align: "center",
            width: "10%"
          }
        ];
      }
      const timeOut = t => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("");
          }, t);
        });
      };
      await this.spinnerLoading(true);

      await Promise.all([
        timeOut(500),
        this.getListContentByFanPagesID(this.dataFanpage.id)
      ]);
      await this.spinnerLoading(false);
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters(["getUser", "listContentOfFanpage"])
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


.content_details span {
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.content_details:hover {
  cursor: pointer;
}
.tr-table-content:hover {
  background-color: rgba(100, 100, 100, 0.1);
}
.tag-content-details {
  margin-right: 3px;
}
.tag-content-details:hover {
  /* cursor: pointer; */
  font-weight: bold;
  transition: 0.5s;
}
</style>