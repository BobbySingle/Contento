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
                <v-row
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
                </v-row>
                <v-row
                  justify="center"
                  no-gutters
                  style="background-color: white;"
                >
                  <v-col cols="12" md="6">
                    <!-- <v-select
                      v-model="week"
                      :items="weeks"
                      item-text="name"
                      item-value="id"
                      label="Statistics Week"
                      prepend-inner-icon="mdi-chart-donut"
                      @change="changeTopWeek"
                      class="mx-10"
                    ></v-select> -->
                    <GChart
                      type="ColumnChart"
                      :data="chartWeekData"
                      :options="chartWeekOptions"
                      style="height:500px"
                      :events="chartWeekEvents"
                      ref="chartWeek"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
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
                  <v-col cols="12" md="6">
                    <!-- <v-select
                      v-model="month"
                      :items="months"
                      item-text="name"
                      item-value="id"
                      label="Statistics Month"
                      prepend-inner-icon="mdi-chart-donut"
                      @change="changeTopMonth"
                      class="mx-10"
                    ></v-select> -->
                    <GChart
                      type="ColumnChart"
                      :data="chartMonthData"
                      :options="chartMonthOptions"
                      style="height:500px"
                      :events="chartMonthEvents"
                      ref="chartMonth"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
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
            <v-row justify="center" no-gutters style="background-color: white;">
              <v-col
                cols="12"
                v-for="fanpage in listInteractionFanpageByCampaign"
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
      categoryWeek: "",
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
      // weeks: [
      //   { id: 3, name: "Top 3 category in the week" },
      //   { id: 5, name: "Top 5 category in the week" },
      //   { id: 10, name: "Top 10 category in the week" },
      //   { id: 0, name: "All category in the week" }
      // ],
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
        // legend: "none",
        isStacked: true,
        // pieSliceText: 'label',
        title: "VIEWS OF THE WEEK",
        // pieStartAngle: 0
        legend: { position: "bottom" },
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
      months: [
        { id: 3, name: "Top 3 category in the month" },
        { id: 5, name: "Top 5 category in the month" },
        { id: 10, name: "Top 10 category in the month" }
      ],

      chartMonthData: [],
      chartMonthOptions: {
        isStacked: true,
        legend: { position: "bottom" },
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
          } else {
            this.categoryMonthSelected = "";
          }
        }
      },

      chartWeekTagsData: [],
      chartWeekTagsOptions: {
        title: "Interaction in the week",
        colors: ["mediumseagreen"],
        animation: {
          duration: 1000,
          easing: "linear"
        }
      },
      chartMonthTagsData: [],
      chartMonthTagsOptions: {
        legend: "none",
        pieSliceText: "label",
        title: "Interaction in the month",
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
        this.statisticWeekByTag(category);
      } else {
        this.categoryWeek = "";

        this.statisticWeekTrend();
      }
    },
    categoryMonthSelected() {
      var category;
      if (this.categoryMonthSelected) {
        this.listCategory.forEach(element => {
          if (element.name == this.categoryMonthSelected) {
            category = element;
          }
        });
        this.statisticMonthByTag(category);
      } else {
        this.statisticMonthTrend();
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
      let weekTagsData = [["Content", "View"]];
      if (status == 200) {
        this.StatisticsByTag.forEach(element => {
          weekTagsData.push([element.title, element.view]);
        });
        this.chartWeekTagsData = weekTagsData;
        this.chartWeekTagsOptions.title = "TOP VIEW OF " + tag.name;
      }
    },
    async statisticWeekTrend() {
      let statusWeekTrend = await this.getStatisticsTrend();
      let weekTrendData = [["Content", "View"]];
      if (statusWeekTrend == 200) {
        this.StatisticsWeekTrend.forEach(element => {
          weekTrendData.push([element.title, element.view]);
        });
        this.chartWeekTagsData = weekTrendData;
        this.chartWeekTagsOptions.title = "TOP CONTENT OF THE WEEK";
      }
    },
    async statisticMonthByTag(tag) {
      let status = await this.getStatisticsByTagMonth(tag.id);
      let monthTagsData = [["Content", "View"]];
      if (status == 200) {
        this.StatisticsByTagMonth.forEach(element => {
          monthTagsData.push([element.title, element.view]);
        });
        this.chartMonthTagsData = monthTagsData;
        this.chartMonthTagsOptions.title = "TOP VIEW OF " + tag.name;
      }
    },
    async statisticMonthTrend() {
      let statusMonthTrend = await this.getStatisticsTrendMonth();
      let monthTrendData = [["Content", "View"]];
      if (statusMonthTrend == 200) {
        this.StatisticsMonthTrend.forEach(element => {
          monthTrendData.push([element.title, element.view]);
        });
        this.chartMonthTagsData = monthTrendData;
        this.chartMonthTagsOptions.title = "TOP CONTENT OF THE MONTH";
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
      dataMonth.push(headerChart);
      let statusMonth = await this.getStatisticsOneMonth();
      if (statusMonth == 200) {
        this.StatisticsMonth.forEach(element => {
          var row = [];
          row.push(moment(String(element.date)).format("DD-MM-YYYY"));
          element.timeInteraction.forEach(item => {
            row.push(item);
          });
          dataMonth.push(row);
        });
      }
      this.chartMonthData = dataMonth;
      //WEEK TREND
      let statusWeekTrend = await this.getStatisticsTrend();
      let weekTrendData = [["Content", "View"]];
      if (statusWeekTrend == 200) {
        this.StatisticsWeekTrend.forEach(element => {
          weekTrendData.push([element.title, element.view]);
        });
        this.chartWeekTagsData = weekTrendData;
        this.chartWeekTagsOptions.title = "TOP CONTENT OF THE WEEK";
      }
      //MONTH TREND
      let dataMonthTrend = [["Category", "Interaction"]];
      let statusMonthTrend = await this.getStatisticsTrendMonth();
      if (statusMonthTrend == 200) {
        this.StatisticsMonthTrend.forEach(element => {
          dataMonthTrend.push([element.title, element.view]);
        });
        this.chartMonthTagsData = dataMonthTrend;
        this.chartMonthTagsOptions.title = "TOP CONTENT OF THE WEEK";
      }
      this.spinnerLoading(false);
    },
    // async changeTopWeek(event) {
    //   let dataWeek = [["Category", "Interaction"]];
    //   let statusWeek = await this.getStatisticsOneWeek();
    //   if (statusWeek == 200) {
    //     this.StatisticsWeek.forEach(element => {
    //       dataWeek.push([element.tags, element.timeInTeraction]);
    //     });
    //   }
    //   this.chartWeekData = dataWeek;
    // },
    // async changeTopMonth(event) {
    //   let dataMonth = [["Category", "Interaction"]];
    //   let statusMonth = await this.getStatisticsOneMonth(event);
    //   if (statusMonth == 200) {
    //     this.StatisticsMonth.forEach(element => {
    //       dataMonth.push([element.tags, element.timeInTeraction]);
    //     });
    //   }
    //   this.chartMonthData = dataMonth;
    // },
    async changeCustomer(event) {
      await this.getListCampaignByCustomerID(event);
    },
    async changeCampaign(event) {
      await this.getInteractionFanpageByCampaignId(event);
    },
    async linkTo(event) {
      window.open(event);
    },
    changeCategoryWeek(event) {
      if (event) {
        this.categoryWeek = event;
        this.listCategory.forEach(element => {
          if (event == element.id) {
            this.categoryWeekSelected = element.name;
          }
        });
      } else {
        this.categoryWeek = "";
        this.categoryWeekSelected = "";
      }
    }
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
