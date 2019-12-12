<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Campaign Details</h1>
    </v-row>
    <v-row no-gutters class="mx-10">
      <v-expansion-panels
        :accordion="true"
        :focusable="true"
        multiple
        v-model="panel"
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14"
            >Infomation:</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-col sm="12" md="12">
              <v-row>
                <v-col sm="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Title</span
                  >
                  <br />
                  <span class="text__14">{{ title }}</span>
                  <!-- <v-text-field label="Title:" v-model="title" readonly class="text__14"></v-text-field> -->
                </v-col>
                <v-spacer></v-spacer>
                <v-col sm="5" md="5">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >End Date</span
                  >
                  <br />
                  <span class="text__14">{{
                    endDate | localTime() | moment("HH:mm DD/MM/YYYY")
                  }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Customer</span
                  >
                  <br />
                  <span class="text__14">{{ customer.name }}</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col sm="5" md="5">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Editor</span
                  >
                  <br />
                  <span class="text__14">{{ editor.name }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="12">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Categories</span
                  >
                  <br />
                  <v-chip
                    class="text__14 chips ma-1"
                    v-for="item in listTag"
                    :key="item.id"
                    color="blue"
                    :input-value="item"
                    >{{ item.name }}</v-chip
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14"
            >Campaign Request:</v-expansion-panel-header
          >
          <v-expansion-panel-content class="my-2 py-2">
            <div
              v-html="campaign_content"
              class="ck-content content px-2 py-4"
            ></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14"
            >List Tasks:</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="Deadline From"
                      type="datetime"
                      v-model="from"
                      placeholder="Deadline From"
                      input-class="css_time"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="from">
                    <v-btn icon @click="clearFrom()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="Deadline To"
                      type="datetime"
                      v-model="to"
                      placeholder="Deadline To"
                      input-class="css_time"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="to">
                    <v-btn icon @click="clearTo()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  v-model="status"
                  :items="listStatusTask"
                  item-text="name"
                  item-value="id"
                  label="Status"
                  prepend-inner-icon="filter_list"
                  clearable
                ></v-select>
              </v-col>
            </v-row>
            <v-col sm="12" md="12">
              <v-row>
                <v-data-table
                  :headers="headers"
                  :items="listCampaignTaskNotFormated"
                  style="width:100%;"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  :loading="loading"
                  @page-count="pageCount = $event"
                >
                  <template v-slot:item.status="{ item }">
                    <v-chip class="text__14" :color="item.status.color" dark>{{
                      item.status.name
                    }}</v-chip>
                  </template>
                  <template v-slot:item.deadline="{ item }">{{
                    item.deadline | localTime() | moment("HH:mm DD/MM/YYYY")
                  }}</template>
                  <template v-slot:item.action="{ item }">
                    <v-btn
                      class="text__14"
                      color="primary"
                      icon
                      fab
                      v-if="item.status.id === 5"
                      @click="publish(item.id)"
                    >
                      <v-icon>mdi-publish</v-icon>
                    </v-btn>
                    <v-btn
                      class="text__14"
                      color="warning"
                      icon
                      fab
                      v-if="item.status.id === 6"
                      @click="publish(item.id)"
                    >
                      <v-icon>mdi-autorenew</v-icon>
                    </v-btn>
                    <v-btn
                      class="text__14"
                      icon
                      fab
                      v-if="item.status.id === 7"
                      @click="clickDetail(item.id)"
                    >
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
                <v-row justify="center">
                  <div class="text-center pt-2">
                    <v-pagination
                      v-model="page"
                      :length="pageCount"
                      :total-visible="10"
                    ></v-pagination>
                  </div>
                </v-row>
              </v-row>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      /**End Pagination */
      /**Begin Expension Panel */
      panel: [0, 2],
      /**End Expension Panel */
      dialog: false,
      menu: false,
      endDate: "",
      title: "",
      listTag: [],
      customer: "",
      editor: "",
      campaign_content: "",
      loading: false,
      /**Filter */
      from: "",
      to: "",
      status: "",
      /**List Tasks */
      headers: [
        {
          text: "#",
          align: "center",
          value: "id",
          width: "8%"
        },
        { text: "Task", value: "title", sortable: false, width: "40%" },
        {
          text: "Implementer",
          value: "writer.name",
          align: "center",
          width: "16%"
        },
        {
          text: "Deadline",
          value: "deadline",
          align: "center",
          width: "16%",
          filter: value => {
            if (!this.from && !this.to) return true;
            if (this.from != "" && this.to == "") {
              return this.from <= value;
            } else if (this.from == "" && this.to != "") {
              return value <= this.from;
            } else {
              return this.from <= value && value <= this.to;
            }
          }
        },
        {
          text: "Status",
          value: "status",
          align: "center",
          sortable: false,
          width: "10%",
          filter: value => {
            if (!this.status) return true;
            return value.id == this.status;
          }
        },
        {
          text: "Action",
          value: "action",
          align: "center",
          width: "10%",
          sortable: false
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
    clearFrom() {
      this.from = "";
    },
    clearTo() {
      this.to = "";
    },
    clickDetail(event) {
      sessionStorage.setItem("ContentID", JSON.stringify(event));
      this.$router.push("/ContentPublishDetail");
    },
    ...mapActions({
      getDetailCampaign: "campaign/getDetailCampaign",
      getListCampaignTask: "contentprocess/getListCampaignTask",
      getListStatusTask: "contentprocess/getListStatusTask",
      spinnerLoading: "spinner/spinnerLoading"
    }),
    async fetchData() {
      this.loading = true;
      let campaignID = JSON.parse(sessionStorage["CampaignID"].toString());
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
        this.getDetailCampaign(campaignID),
        this.getListStatusTask(),
        this.getListCampaignTask(campaignID)
      ]);
      this.title = this.detailCampaign.title;
      this.customer = this.detailCampaign.customer;
      this.editor = this.detailCampaign.editor;
      this.endDate = this.detailCampaign.endDate;
      this.listTag = this.detailCampaign.tagFull;
      this.campaign_content = this.detailCampaign.description;
      await this.spinnerLoading(false);
      this.loading = false;
    },
    publish(event) {
      sessionStorage.setItem("ContentID", JSON.stringify(event));
      this.$router.push("/PublishChannel");
    }
  },
  computed: {
    ...mapGetters([
      "getUser",
      "detailCampaign",
      "listCampaignTaskNotFormated",
      "listStatusTask"
    ])
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

::v-deep .v-expansion-panels {
  z-index: inherit;
}
.chips {
  color: white !important;
}
::v-deep .content {
  max-height: 500px;
  overflow-y: auto;
}
::v-deep .content img {
  max-width: 100%;
  max-height: 100%;
}
::v-deep .content table {
  border-collapse: collapse;
}
::v-deep .table table {
  width: 100%;
}
::v-deep .image {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
}
::v-deep .image img {
  max-width: 100%;
  max-height: 100%;
}

::v-deep .content table th {
  border: 1px solid grey;
}
::v-deep .content table td {
  padding-left: 10px;
  border: 1px solid grey;
}
</style>
