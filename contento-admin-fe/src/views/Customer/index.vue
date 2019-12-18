<template>
  <v-container>
    <v-row justify="center" class="mb-2">
      <h1 class="text__h1">Statistics</h1>
    </v-row>
    <v-card>
      <v-row justify="center" class="my-8">
        <v-col cols="4" align-self="center">
          <div style="width:150px; height:150px;  margin: 0 auto;">
            <v-progress-circular
              :rotate="-90"
              :size="150"
              :width="20"
              :value="100"
              color="#009688"
            >
              <div>
                <p
                  style="font-size:15px; font-weigth:400; margin:0; text-align:center"
                >
                  Campaign
                </p>
                <p
                  style="font-size:35px; font-weigth:500;  margin:0; text-align:center"
                >
                  {{ StatisticsTotalCampaign.totalCampaign }}
                </p>
              </div>
            </v-progress-circular>
          </div>
        </v-col>
        <v-col cols="4">
          <div style="width:150px; height:150px;  margin: 0 auto;">
            <v-progress-circular
              :rotate="-90"
              :size="150"
              :width="20"
              :value="
                Math.round(
                  (StatisticsTotalCampaign.campaignInProcess /
                    StatisticsTotalCampaign.totalCampaign) *
                    100
                )
              "
              color="warning"
            >
              <div>
                <p
                  style="font-size:15px; font-weigth:400; margin:0; text-align:center"
                >
                  In Process
                </p>
                <p
                  style="font-size:35px; font-weigth:500;  margin:0; text-align:center"
                >
                  {{ StatisticsTotalCampaign.campaignInProcess }}
                </p>
              </div>
            </v-progress-circular>
          </div>
        </v-col>
        <v-col cols="4">
          <div style="width:150px; height:150px;  margin: 0 auto;">
            <v-progress-circular
              :rotate="-90"
              :size="150"
              :width="20"
              :value="
                Math.round(
                  (StatisticsTotalCampaign.campaignCompleted /
                    StatisticsTotalCampaign.totalCampaign) *
                    100
                )
              "
              color="success"
            >
              <div>
                <p
                  style="font-size:15px; font-weigth:400; margin:0; text-align:center"
                >
                  Completed
                </p>
                <p
                  style="font-size:35px; font-weigth:500;  margin:0; text-align:center"
                >
                  {{ StatisticsTotalCampaign.campaignCompleted }}
                </p>
              </div>
            </v-progress-circular>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="mx-6">
        <v-col cols="12">
          <v-data-table
            :headers="headersCustomerCampaign"
            :items="StatisticsByCustomer"
            :items-per-page="5"
            class="mb-4"
          >
            <template v-slot:item.startDate="{ item }">
              <span>
                {{ item.startDate | localTime() | moment("HH:mm DD/MM/YYYY") }}
              </span>
            </template>
            <template v-slot:item.endDate="{ item }">
              <span>
                {{ item.endDate | localTime() | moment("HH:mm DD/MM/YYYY") }}
              </span>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="item.status.color"
                style="color:white"
                class="text__14"
                >{{ item.status.name }}</v-chip
              >
            </template>
            <template v-slot:item.progress="{ item }">
              <v-progress-linear
                :height="15"
                striped
                rounded
                :value="getCampaignProgress(item.startDate, item.endDate)"
                :color="item.status.color"
              >
                <span style="color:white; font-size:12px;"
                  >{{
                    getCampaignProgress(item.startDate, item.endDate)
                  }}%</span
                >
              </v-progress-linear>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                color="primary"
                @click="campaignDetail(item.id)"
                class="text__14"
                icon
              >
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row v-if="isSelectedCampaign">
        <v-container>
          <v-row justify="center">
            <h2>Facebook</h2>
          </v-row>
          <v-row
            justify="center"
            no-gutters
            v-if="campaignFacebook"
            class="my-8"
            ref="refCampaignFacebook"
          >
            <v-col cols="4" class="my-2">
              <v-row justify="center">
                <v-progress-circular
                  :rotate="-90"
                  :size="150"
                  :width="20"
                  :value="campaignProcess"
                  :color="kpiCampaign.status.color"
                >
                  <div>
                    <p style="margin:0; text-align:center">
                      {{ this.campaignProcess }}%
                    </p>
                    <p style="font-size:12px;">
                      {{ this.kpiCampaign.status.name }}
                    </p>
                  </div></v-progress-circular
                >
              </v-row>
              <v-row justify="center" class="mt-2">
                <strong>Campaign Progress</strong>
              </v-row>
              <v-row justify="center">
                <span style="font-size:12px">
                  {{
                    kpiCampaign.start_date | localTime() | moment("DD/MM/YYYY")
                  }}
                  -
                  {{
                    kpiCampaign.end_date | localTime() | moment("DD/MM/YYYY")
                  }}
                </span>
              </v-row>
            </v-col>
            <v-col cols="4" class="my-2">
              <v-row justify="center">
                <v-progress-circular
                  :rotate="-90"
                  :size="150"
                  :width="20"
                  :value="
                    Math.round((kpiCampaign.interaction / 500) * 100) > 100
                      ? 100
                      : Math.round((kpiCampaign.interaction / 500) * 100)
                  "
                  color="teal"
                >
                  <div>
                    <p style="text-align:center; margin-bottom:0px">
                      {{
                        Math.round((kpiCampaign.interaction / 1000) * 100) > 100
                          ? "Completed"
                          : Math.round((kpiCampaign.interaction / 1000) * 100) +
                            "%"
                      }}
                    </p>
                    <span style="font-size:12px;"
                      >{{ kpiCampaign.interaction }}/{{ 1000 }}</span
                    >
                  </div>
                </v-progress-circular>
              </v-row>
              <v-row justify="center" class="mt-2">
                <strong>KPI Interaction</strong>
              </v-row>
            </v-col>
            <v-col cols="4" class="my-2">
              <v-row justify="center">
                <v-progress-circular
                  :rotate="-90"
                  :size="150"
                  :width="20"
                  :value="
                    Math.round((kpiCampaign.inbox / 500) * 100) > 100
                      ? 100
                      : Math.round((kpiCampaign.inbox / 500) * 100)
                  "
                  color="pink"
                >
                  <div>
                    <p style="text-align:center; margin-bottom:0px">
                      {{
                        Math.round((kpiCampaign.inbox / 500) * 100) > 100
                          ? "Completed"
                          : Math.round((kpiCampaign.inbox / 500) * 100) + "%"
                      }}
                    </p>
                    <span style="font-size:12px;"
                      >{{ kpiCampaign.inbox }}/{{ 500 }}</span
                    >
                  </div>
                </v-progress-circular>
              </v-row>
              <v-row justify="center" class="mt-2">
                <strong>KPI Inbox</strong>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" no-gutters v-if="campaignFacebook">
            <v-col cols="12">
              <GChart
                type="BarChart"
                :data="chartCustomerCampaignFacebookDetailData"
                :options="chartCustomerCampaignFacebookDetailOptions"
                style="height:450px"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <h2>Contento</h2>
          </v-row>
          <v-row
            justify="center"
            no-gutters
            style="background-color: white;"
            v-if="showMoreDetail"
            class="my-4"
          >
            <v-col
              cols="12"
              v-for="fanpage in listInteractionFanpageByCampaign.data"
              :key="fanpage.index"
            >
              <h3 class="my-2 mx-4">{{ fanpage.name }}</h3>
              <v-data-table
                :headers="headersFanpage"
                :items="fanpage.data"
                :items-per-page="5"
                class="mb-4"
              >
                <template v-slot:item.publicDate="{ item }">
                  <span>
                    {{
                      item.publicDate | localTime() | moment("HH:mm DD/MM/YYYY")
                    }}
                  </span>
                </template>
                <template v-slot:item.reactiontCount="{ item }">
                  <span>
                    {{ item.reactiontCount }}
                    <v-icon small class="mb-1 ml-1">mdi-thumb-up</v-icon>
                  </span>
                </template>
                <template v-slot:item.shareCount="{ item }">
                  <span>
                    {{ item.shareCount }}
                    <v-icon small class="mb-1 ml-1">mdi-share</v-icon>
                  </span>
                </template>
                <template v-slot:item.commentCount="{ item }">
                  <span>
                    {{ item.commentCount }}
                    <v-icon small class="mb-1 ml-1">mdi-comment-outline</v-icon>
                  </span>
                </template>
                <template v-slot:item.possitiveCommentCount="{ item }">
                  <span>
                    {{ item.possitiveCommentCount }}
                    <v-icon small class="mb-1 ml-1">mdi-comment</v-icon>
                  </span>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-btn icon color="primary" fab @click="linkTo(item.link)">
                    <v-icon>mdi-link</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <!-- TAB CONTENTO -->
          <!-- CAMPAIGN -->
          <v-row
            v-if="campaignContento"
            no-gutters
            ref="refCampaignContento"
            class="mx-6"
          >
            <v-col cols="12" class="mx-4">
              <h3>{{ campaignDetialContentoTitle }}</h3>
            </v-col>
            <v-col cols="12" md="6">
              <v-data-table
                :headers="headersCustomerCampaignDetails"
                :items="StatisticsCampaign"
                :items-per-page="5"
                class="mb-4 mt-12"
              >
                <template v-slot:item.published="{ item }">
                  <span v-if="!item.published">
                    <v-icon color="success" small class="mb-1 ml-1"
                      >check</v-icon
                    >
                  </span>
                  <span v-else>
                    <v-icon color="red" small class="mb-1 ml-1">close</v-icon>
                  </span>
                </template>
              </v-data-table>
            </v-col>
            <v-col cols="12" md="6">
              <GChart
                type="ColumnChart"
                :data="chartCustomerCampaignDetailData"
                :options="chartCustomerCampaignDetailOptions"
                style="height:450px"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  components: {
    GChart
  },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      loading: false,
      isSelectedCampaign: false,
      campaignFacebookStartDate: "",
      campaignFacebookEndDate: "",
      campaignProcess: "",
      categoryWeek: "",
      categoryMonth: "",
      categoryMonthRowSelected: "",
      listCategory: [
        { id: 1, name: "THỂ THAO" },
        { id: 2, name: "DU LỊCH" },
        { id: 3, name: "ẨM THỰC" },
        { id: 4, name: "PHIM ẢNH" },
        { id: 5, name: "ÂM NHẠC" },
        { id: 6, name: "KINH DOANH" },
        { id: 7, name: "CÔNG NGHỆ" },
        { id: 8, name: "XE" },
        { id: 9, name: "GIẢI TRÍ" },
        { id: 10, name: "THỜI TRANG" }
      ],
      headers: [
        {
          text: "Campaign",
          align: "center",
          value: "name"
        },
        {
          text: "End",
          value: "deadline",
          align: "center"
        },
        {
          text: "Status",
          value: "status",
          align: "center"
        },
        {
          text: "Action",
          value: "action",
          align: "center",
          sortable: false
        }
      ],
      headersCustomerCampaign: [
        {
          text: "Name",
          align: "left",
          value: "name",
          width: "30%"
        },
        {
          text: "Start",
          value: "startDate",
          align: "center",
          width: "20%"
        },
        {
          text: "End",
          value: "endDate",
          align: "center",
          width: "10%"
        },
        {
          text: "Status",
          value: "status",
          align: "center",
          width: "10%"
        },
        {
          text: "Progress",
          value: "progress",
          align: "center",
          width: "10%"
        },
        {
          text: "Action",
          value: "action",
          align: "center",
          width: "10%"
        }
      ],
      headersCustomerCampaignDetails: [
        {
          text: "Title",
          align: "left",
          value: "title",
          width: "30%"
        },
        {
          text: "View",
          value: "view",
          align: "center",
          width: "20%"
        },
        {
          text: "Published",
          value: "published",
          align: "center",
          width: "10%"
        }
      ],
      headersFanpage: [
        {
          text: "Title",
          align: "left",
          value: "title",
          width: "30%"
        },
        {
          text: "Publish Date",
          value: "publicDate",
          align: "center",
          width: "20%"
        },
        {
          text: "Reaction",
          value: "reactiontCount",
          align: "center",
          width: "10%"
        },
        {
          text: "Comment",
          value: "commentCount",
          align: "center",
          width: "10%"
        },
        {
          text: "Possitive Comment",
          value: "possitiveCommentCount",
          align: "center",
          width: "10%"
        },
        {
          text: "Share",
          value: "shareCount",
          align: "center",
          width: "10%"
        },
        {
          text: "Action",
          value: "action",
          align: "center",
          sortable: false,
          width: "10%"
        }
      ],
      campaignFacebook: "",
      campaignContento: "",
      campaignDetialContentoTitle: "",

      chartCustomerCampaignDetailData: [],
      chartCustomerCampaignDetailOptions: {
        colors: ["mediumseagreen"],
        animation: {
          duration: 1000,
          easing: "linear"
        },
        hAxis: { textPosition: "none" },
        legend: "none"
      },
      chartCustomerCampaignFacebookDetailData: [],
      chartCustomerCampaignFacebookDetailOptions: {
        animation: {
          duration: 1000,
          easing: "linear"
        },
        hAxis: { minValue: 0 }
      }
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
  computed: {
    ...mapGetters([
      "getUser",
      "listCustomer",
      "listCampaignByCustomerID",
      "listCampaignByCustomerIDFacebook",
      "listInteractionFanpageByCampaign",
      "StatisticsByCustomer",
      "StatisticsCampaign",
      "StatisticsTotalCampaign",
      "StatisticsTotalCampaignFacebook",
      "kpiCampaign"
    ])
  },
  methods: {
    ...mapActions({
      spinnerLoading: "spinner/spinnerLoading",
      getListCustomerByMarketerID: "authentication/getListCustomerByMarketerID",
      getListCampaignByCustomerID: "campaign/getListCampaignByCustomerID",
      getListCampaignByCustomerIDFacebook:
        "campaign/getListCampaignByCustomerIDFacebook",
      getInteractionFanpageByCampaignId:
        "batchjob/getInteractionFanpageByCampaignId",
      getStatisticsByCustomer: "campaign/getStatisticsByCustomer",
      getStatisticsCampaign: "contentprocess/getStatisticsCampaign",
      getStatisticsTotalCampaign: "campaign/getStatisticsTotalCampaign",
      getStatisticsTotalCampaignFacebook:
        "campaign/getStatisticsTotalCampaignFacebook",
      getKPICampaign: "batchjob/getKPICampaign"
    }),
    getCampaignProgress(start, end) {
      var startTime = Date.parse(start + "Z");
      var endTime = Date.parse(end + "Z");
      var currentTime = Date.parse(new Date());
      var campaignProcess = 0;
      if (currentTime >= endTime) {
        campaignProcess = 100;
      } else {
        campaignProcess = Math.round(
          100 *
            ((parseInt(currentTime) - parseInt(startTime)) /
              (parseInt(endTime) - parseInt(startTime)))
        );
      }
      return campaignProcess;
    },
    async campaignDetail(event) {
      this.isSelectedCampaign = true;
      this.spinnerLoading(true);
      if (event) {
        this.listCampaignByCustomerID.forEach(element => {
          if (element.id == event) {
            this.campaignDetialContentoTitle = element.title;
          }
        });
      } else {
        this.campaignDetialContentoTitle = "";
      }
      let status = await this.getStatisticsCampaign(event);
      this.campaignContento = true;
      let data = [["Title", "View"]];
      if (status == 200) {
        this.StatisticsCampaign.forEach(element => {
          if (!element.published) {
            data.push([element.title, element.view]);
          }
        });
        this.chartCustomerCampaignDetailData = data;
      }
      this.showMoreDetail = false;
      this.campaignFacebook = true;
      sessionStorage.setItem("CP_FB", event);
      const timeOut = t => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("");
          }, t);
        });
      };
      await Promise.all([timeOut(500), this.getKPICampaign(event)]);
      this.campaignFacebookStartDate = Date.parse(
        this.kpiCampaign.start_date + "Z"
      );
      this.campaignFacebookEndDate = Date.parse(
        this.kpiCampaign.end_date + "Z"
      );
      var currentTime = Date.parse(new Date());
      if (currentTime >= this.campaignFacebookEndDate) {
        this.campaignProcess = 100;
      } else {
        this.campaignProcess = Math.round(
          100 *
            ((parseInt(currentTime) -
              parseInt(this.campaignFacebookStartDate)) /
              (parseInt(this.campaignFacebookEndDate) -
                parseInt(this.campaignFacebookStartDate)))
        );
      }
      let dataFb = [["Type", "Number", { role: "style" }]];
      dataFb.push(["Like", this.kpiCampaign.reaction, "color: #1b9e77"]);
      dataFb.push(["Comment", this.kpiCampaign.comment, "color: #d95f02"]);
      dataFb.push(["Share", this.kpiCampaign.share, "color:#7570b3"]);
      this.chartCustomerCampaignFacebookDetailData = dataFb;
      this.chartCustomerCampaignFacebookDetailOptions.title = this.kpiCampaign.name;

      this.$nextTick(function() {
        this.$vuetify.goTo(this.$refs.refCampaignFacebook);
      });
      this.spinnerLoading(false);
    },
    async fetchData() {
      //WEEK
      this.spinnerLoading(true);
      const timeOut = t => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("");
          }, t);
        });
      };
      await Promise.all([
        timeOut(500),
        this.getListCampaignByCustomerID(this.getUser.id),
        this.getStatisticsByCustomer(this.getUser.id),
        //TOTAL CAMPAIGN CONTENTO
        this.getStatisticsTotalCampaign({
          idCustomer: this.getUser.id
        }),
        this.getStatisticsTotalCampaignFacebook({
          idCustomer: this.getUser.id
        })
      ]);
      this.spinnerLoading(false);
    }
  },
  mounted() {
    this.fetchData();
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Customer" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
