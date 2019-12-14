<template>
  <v-container>
    <v-row justify="center" class="mb-2">
      <h1 class="text__h1">Statistics</h1>
    </v-row>
    <v-card>
      <v-tabs background-color="white" grow>
        <v-tab>Contento</v-tab>
        <v-tab>Facebook</v-tab>
        <!-- TAB CONTENTO -->
        <v-tab-item>
          <div class="ma-2">
            <v-btn
              style="float:right"
              color="primary"
              href="https://analytics.google.com/analytics/web/#/report-home/a153845471w217205691p207366696"
              target="_blank"
              >Google Analytics</v-btn
            >
          </div>
          <v-tabs background-color="white">
            <v-tab>Week</v-tab>
            <v-tab>Month</v-tab>
            <v-tab>Campaign</v-tab>
            <!-- TAB WEEK -->
            <v-tab-item>
              <v-container>
                <!-- <v-row
                  justify="center"
                  no-gutters
                  style="background-color: white;"
                >
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="categoryWeek"
                      :items="listCategory"
                      item-text="name"
                      item-value="id"
                      label="Category"
                      prepend-inner-icon="mdi-chart-donut"
                      @change="changeCategoryWeek"
                      class="mx-10"
                      clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6"> </v-col>
                </v-row> -->
                <v-row
                  justify="center"
                  no-gutters
                  style="background-color: white;"
                >
                  <v-col cols="12" md="12">
                    <GChart
                      type="ColumnChart"
                      :data="chartWeekData"
                      :options="chartWeekOptions"
                      style="height:500px"
                      :events="chartWeekEvents"
                      ref="chartWeek"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    v-if="this.categoryWeek"
                    ref="refWeek"
                  >
                    <GChart
                      type="ColumnChart"
                      :data="chartWeekTagsData"
                      :options="chartWeekTagsOptions"
                      style="height:500px"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <!-- TAB MONTH -->
            <v-tab-item>
              <v-container>
                <v-row justify="center" no-gutters>
                  <v-col cols="12">
                    <GChart
                      type="ColumnChart"
                      :data="chartMonthData"
                      :options="chartMonthOptions"
                      style="height:500px"
                      :events="chartMonthEvents"
                      ref="chartMonth"
                    />
                  </v-col>
                  <v-col cols="12" v-if="this.categoryMonth" ref="refMonth">
                    <GChart
                      type="ColumnChart"
                      :data="chartMonthTagsData"
                      :options="chartMonthTagsOptions"
                      style="height:500px"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <!-- CAMPAIGN -->
            <v-tab-item>
              <v-container>
                <v-row
                  justify="center"
                  no-gutters
                  style="background-color: white;"
                >
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="customer"
                      :items="listCustomer"
                      item-text="name"
                      item-value="id"
                      label="Customer"
                      prepend-inner-icon="mdi-chart-donut"
                      @change="changeCustomer"
                      class="mx-10"
                      clearable
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-if="customer"
                      v-model="campaign"
                      :items="listCampaignByCustomerID"
                      item-text="title"
                      item-value="id"
                      label="Campaign"
                      prepend-inner-icon="mdi-chart-donut"
                      class="mx-10"
                      clearable
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-tab-item>
        <!-- TAB FACEBOOK -->
        <v-tab-item>
          <v-container>
            <v-row justify="center" no-gutters style="background-color: white;">
              <v-col cols="12" md="6">
                <v-select
                  v-model="customer"
                  :items="listCustomer"
                  item-text="name"
                  item-value="id"
                  label="Customer"
                  prepend-inner-icon="mdi-chart-donut"
                  @change="changeCustomer"
                  class="mx-10"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-if="customer"
                  v-model="campaign"
                  :items="listCampaignByCustomerID"
                  item-text="title"
                  item-value="id"
                  label="Campaign"
                  prepend-inner-icon="mdi-chart-donut"
                  class="mx-10"
                  clearable
                  @change="changeCampaign"
                ></v-select>
              </v-col>
            </v-row>
            <v-row justify="center" no-gutters v-if="campaign">
              <v-col cols="4">
                <v-row justify="center">
                  <v-progress-circular
                    :rotate="-90"
                    :size="150"
                    :width="25"
                    :value="campaignProcess"
                    :color="campaignProcess > 50 ? 'success' : 'light-blue'"
                  >
                    {{ this.campaignProcess }}%
                  </v-progress-circular>
                </v-row>
                <v-row justify="center" class="mt-2">
                  <strong>Campaign Progress</strong>
                </v-row>
                <v-row justify="center">
                  <span style="font-size:12px">2000 - 2000</span>
                </v-row>
              </v-col>
              <v-col cols="4">
                <v-row justify="center">
                  <v-progress-circular
                    :rotate="-90"
                    :size="150"
                    :width="25"
                    :value="50"
                    color="teal"
                  >
                    {{ 50 }}/{{ 100 }}
                  </v-progress-circular>
                </v-row>
                <v-row justify="center" class="mt-2">
                  <strong>KPI</strong>
                </v-row>
                <v-row justify="center">
                  <span style="font-size:12px">2000 - 2000</span>
                </v-row>
              </v-col>
              <v-col cols="4">
                <v-row justify="center">
                  <v-progress-circular
                    :rotate="-90"
                    :size="150"
                    :width="25"
                    :value="50"
                    color="teal"
                  >
                    {{ 50 }}/{{ 100 }}
                  </v-progress-circular>
                </v-row>
                <v-row justify="center" class="mt-2">
                  <strong>View</strong>
                </v-row>
                <v-row justify="center">
                  <span style="font-size:12px">2000 - 2000</span>
                </v-row>
              </v-col>
            </v-row>
            <v-row
              justify="center"
              no-gutters
              style="background-color: white;"
              v-if="campaign"
            >
              <v-col
                cols="12"
                v-for="fanpage in listInteractionFanpageByCampaign.data"
                :key="fanpage.index"
              >
                <h3 class="my-2" style="text-align: center;">
                  {{ fanpage.name }}
                </h3>
                <v-data-table
                  :headers="headersFanpage"
                  :items="fanpage.data"
                  :items-per-page="5"
                  class="mb-4"
                >
                  <template v-slot:item.publicDate="{ item }">
                    <span>{{
                      item.publicDate | localTime() | moment("HH:mm DD/MM/YYYY")
                    }}</span>
                  </template>
                  <template v-slot:item.reactiontCount="{ item }">
                    <span
                      >{{ item.reactiontCount }}
                      <v-icon small class="mb-1 ml-1"
                        >mdi-thumb-up</v-icon
                      ></span
                    >
                  </template>
                  <template v-slot:item.shareCount="{ item }">
                    <span
                      >{{ item.shareCount }}
                      <v-icon small class="mb-1 ml-1">mdi-share </v-icon></span
                    >
                  </template>
                  <template v-slot:item.commentCount="{ item }">
                    <span
                      >{{ item.commentCount }}
                      <v-icon small class="mb-1 ml-1"
                        >mdi-comment-outline</v-icon
                      ></span
                    >
                  </template>
                  <template v-slot:item.possitiveCommentCount="{ item }">
                    <span
                      >{{ item.possitiveCommentCount }}
                      <v-icon small class="mb-1 ml-1">mdi-comment</v-icon></span
                    >
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-btn icon color="primary" fab @click="linkTo(item.link)">
                      <v-icon>mdi-link</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
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
      campaignStartDate: "",
      campaignEndDate: "",
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
      customer: "",
      campaign: "",

      // Array will be automatically processed with visualization.arrayToDataTable function
      week: 3,

      // color: [
      //   "#3366cc",
      //   "#dc3912",
      //   "#ff9900",
      //   "#109618",
      //   "#990099",
      //   "#0099c6",
      //   "#dd4477",
      //   "#66aa00",
      //   "#fdfd00"
      // ],
      chartWeekData: [],
      chartWeekOptions: {
        isStacked: true,
        title: "VIEWS OF THE WEEK",
        hAxis: { minValue: 0 }
      },
      categoryWeekSelected: "",
      chartWeekEvents: {
        select: () => {
          const chartSelected = this.$refs.chartWeek.chartObject;
          const selection = chartSelected.getSelection()[0];
          console.log(selection);
          if (selection) {
            this.categoryWeekSelected = this.chartWeekData[0][selection.column];
          } else {
            this.categoryWeekSelected = "";
          }
        }
      },

      month: 3,
      chartMonthData: [],
      chartMonthOptions: {
        isStacked: true,
        title: "VIEWS OF THE MONTH",
        hAxis: { minValue: 0 }
      },
      categoryMonthSelected: "",
      chartMonthEvents: {
        select: () => {
          const chartSelected = this.$refs.chartMonth.chartObject;
          const selection = chartSelected.getSelection()[0];
          console.log(selection);
          if (selection) {
            this.categoryMonthSelected = this.chartMonthData[0][
              selection.column
            ];
            this.categoryMonthRowSelected = selection.row;
          } else {
            this.categoryMonthSelected = "";
          }
        }
      },

      chartWeekTagsData: [],
      chartWeekTagsOptions: {
        colors: ["mediumseagreen"],
        animation: {
          duration: 1000,
          easing: "linear"
        }
      },
      chartMonthTagsData: [],
      chartMonthTagsOptions: {
        colors: ["mediumseagreen"],
        animation: {
          duration: 1000,
          easing: "linear"
        }
      }
    };
  },
  watch: {
    categoryWeekSelected() {
      var category;
      if (this.categoryWeekSelected) {
        this.listCategory.forEach(element => {
          if (element.name == this.categoryWeekSelected) {
            category = element;
            this.categoryWeek = element.id;
          }
        });
        this.$nextTick(function() {
          this.$vuetify.goTo(this.$refs.refWeek);
        });
        this.statisticWeekByTag(category);
      } else {
        this.categoryWeek = "";
      }
    },
    categoryMonthSelected() {
      var category;
      var dateData;
      if (this.categoryMonthSelected) {
        this.listCategory.forEach(element => {
          if (element.name == this.categoryMonthSelected) {
            category = element;
            this.categoryMonth = element.id;
          }
        });
        if (this.categoryMonthRowSelected) {
          for (let index = 0; index < this.StatisticsMonth.length; index++) {
            if (index == this.categoryMonthRowSelected) {
              dateData = {
                id: category.id,
                name: category.name,
                startDate: this.StatisticsMonth[index].stratDate,
                endDate: this.StatisticsMonth[index].endDate
              };
            }
          }
        }
        this.$nextTick(function() {
          this.$vuetify.goTo(this.$refs.refMonth);
        });
        this.statisticMonthByTag(dateData);
      } else {
        this.categoryMonth = "";
      }
    }
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
      "StatisticsWeek",
      "StatisticsMonth",
      "getUser",
      "listCustomer",
      "listCampaignByCustomerID",
      "StatisticsByTag",
      "StatisticsByTagMonth",
      "listInteractionFanpageByCampaign",
      "StatisticsWeekTrend",
      "StatisticsMonthTrend"
    ])
  },
  methods: {
    ...mapActions({
      getStatisticsOneWeek: "contentprocess/getStatisticsOneWeek",
      getStatisticsOneMonth: "contentprocess/getStatisticsOneMonth",
      getStatisticsTrend: "contentprocess/getStatisticsTrend",
      getStatisticsTrendMonth: "contentprocess/getStatisticsTrendMonth",
      spinnerLoading: "spinner/spinnerLoading",
      getListCustomerByMarketerID: "authentication/getListCustomerByMarketerID",
      getListCampaignByCustomerID: "campaign/getListCampaignByCustomerID",
      getStatisticsByTag: "contentprocess/getStatisticsByTag",
      getStatisticsByTagMonth: "contentprocess/getStatisticsByTagMonth",
      getInteractionFanpageByCampaignId:
        "batchjob/getInteractionFanpageByCampaignId"
    }),
    async statisticWeekByTag(tag) {
      let status = await this.getStatisticsByTag(tag.id);
      let weekTagsData = [["Date", "View"]];
      if (status == 200) {
        this.StatisticsByTag.forEach(element => {
          weekTagsData.push([
            moment(String(element.date)).format("DD-MM-YYYY"),
            element.timeInTeraction
          ]);
        });
        this.chartWeekTagsData = weekTagsData;
        this.chartWeekTagsOptions.title = "TOP VIEW OF " + tag.name;
      }
    },
    async statisticMonthByTag(tagData) {
      let status = await this.getStatisticsByTagMonth({
        id: tagData.id,
        startDate: tagData.startDate,
        endDate: tagData.endDate
      });
      let monthTagsData = [["Date", "View"]];
      if (status == 200) {
        this.StatisticsByTagMonth.forEach(element => {
          monthTagsData.push([
            moment(String(element.date)).format("DD-MM-YYYY"),
            element.timeInTeraction
          ]);
        });
        this.chartMonthTagsData = monthTagsData;
        this.chartMonthTagsOptions.title = "TOP VIEW OF " + tagData.name;
      }
    },
    async fetchData() {
      //WEEK
      this.spinnerLoading(true);
      this.getListCustomerByMarketerID(this.getUser.id);

      var headerChart = ["Date"];
      this.listCategory.forEach(element => {
        headerChart.push(element.name);
      });
      let dataWeek = [];
      dataWeek.push(headerChart);
      let statusWeek = await this.getStatisticsOneWeek();
      if (statusWeek == 200) {
        this.StatisticsWeek.forEach(element => {
          var row = [];
          row.push(moment(String(element.date)).format("DD-MM-YYYY"));
          element.timeInteraction.forEach(item => {
            row.push(item);
          });
          dataWeek.push(row);
        });
      }
      this.chartWeekData = dataWeek;

      //MONTH
      var headerChartMonth = ["Date"];
      this.listCategory.forEach(element => {
        headerChartMonth.push(element.name);
      });
      let dataMonth = [];
      dataMonth.push(headerChartMonth);
      let statusMonth = await this.getStatisticsOneMonth();
      if (statusMonth == 200) {
        this.StatisticsMonth.forEach(element => {
          var row = [];
          // row.push(moment(String(element.date)).format("DD-MM-YYYY"));
          row.push(element.date);
          element.timeInteraction.forEach(item => {
            row.push(item);
          });
          dataMonth.push(row);
        });
      }
      this.chartMonthData = dataMonth;
      this.spinnerLoading(false);
    },

    async changeCustomer(event) {
      await this.getListCampaignByCustomerID(event);
    },
    async changeCampaign(event) {
      await this.getInteractionFanpageByCampaignId(event);
      this.campaignStartDate = Date.parse(
        this.listInteractionFanpageByCampaign.startDate + "Z"
      );
      this.campaignEndDate = Date.parse(
        this.listInteractionFanpageByCampaign.endDate + "Z"
      );
      var currentTime = Date.parse(new Date());
      if (currentTime >= this.campaignEndDate) {
        this.campaignProcess = 100;
      } else {
        this.campaignProcess = Math.ceil(
          100 *
            ((parseInt(currentTime) - parseInt(this.campaignStartDate)) /
              (parseInt(this.campaignEndDate) -
                parseInt(this.campaignStartDate)))
        );
      }
    },
    async linkTo(event) {
      window.open(event);
    }
    // changeCategoryWeek(event) {
    //   if (event) {
    //     this.categoryWeek = event;
    //     this.listCategory.forEach(element => {
    //       if (event == element.id) {
    //         this.categoryWeekSelected = element.name;
    //       }
    //     });
    //     this.$nextTick(function() {
    //       this.$vuetify.goTo(this.$refs.refWeek);
    //     });
    //   } else {
    //     this.categoryWeek = "";
    //     this.categoryWeekSelected = "";
    //   }
    // }
  },
  mounted() {
    this.fetchData();
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Marketer" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
