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
                </v-row>-->
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
                  justify="start"
                  no-gutters
                  style="background-color: white;"
                >
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="customerContento"
                      :items="listCustomer"
                      item-text="name"
                      item-value="id"
                      label="Customer"
                      prepend-inner-icon="mdi-account-outline"
                      @change="changeCustomer"
                      class="mx-10"
                      clearable
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row
                  justify="center"
                  no-gutters
                  style="background-color: white;"
                  class="my-4"
                >
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
                <v-row justify="center" class="mx-6" v-if="customerContento">
                  <v-col cols="12">
                    <v-data-table
                      :headers="headersCustomerCampaign"
                      :items="StatisticsByCustomer"
                      :items-per-page="5"
                      class="mb-4"
                    >
                      <template v-slot:item.startDate="{ item }">
                        <span>
                          {{
                            item.startDate
                              | localTime()
                              | moment("HH:mm DD/MM/YYYY")
                          }}
                        </span>
                      </template>
                      <template v-slot:item.endDate="{ item }">
                        <span>
                          {{
                            item.endDate
                              | localTime()
                              | moment("HH:mm DD/MM/YYYY")
                          }}
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
                          :value="
                            getCampaignProgress(item.startDate, item.endDate)
                          "
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
                          <v-icon color="red" small class="mb-1 ml-1"
                            >close</v-icon
                          >
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
            </v-tab-item>
          </v-tabs>
        </v-tab-item>
        <!-- TAB FACEBOOK -->
        <v-tab-item>
          <v-container>
            <v-row justify="start" no-gutters style="background-color: white;">
              <v-col cols="12" md="6">
                <v-select
                  v-model="customerFacebook"
                  :items="listCustomer"
                  item-text="name"
                  item-value="id"
                  label="Customer"
                  prepend-inner-icon="mdi-account-outline"
                  @change="changeCustomerFacebook"
                  class="mx-10"
                  clearable
                ></v-select>
              </v-col>
            </v-row>
            <v-row
              justify="center"
              no-gutters
              style="background-color: white;"
              class="my-4"
              v-if="!campaignFacebook"
            >
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
                        {{ StatisticsTotalCampaignFacebook.totalCampaign }}
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
                        (StatisticsTotalCampaignFacebook.campaignInProcess /
                          StatisticsTotalCampaignFacebook.totalCampaign) *
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
                        {{ StatisticsTotalCampaignFacebook.campaignInProcess }}
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
                        (StatisticsTotalCampaignFacebook.campaignCompleted /
                          StatisticsTotalCampaignFacebook.totalCampaign) *
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
                        {{ StatisticsTotalCampaignFacebook.campaignCompleted }}
                      </p>
                    </div>
                  </v-progress-circular>
                </div>
              </v-col>
            </v-row>
            <v-row justify="center" class="mx-6" v-if="customerFacebook">
              <v-col cols="12">
                <v-data-table
                  :headers="headersCustomerCampaign"
                  :items="StatisticsByCustomerFacebook"
                  :items-per-page="5"
                  class="mb-4"
                >
                  <template v-slot:item.startDate="{ item }">
                    <span>
                      {{
                        item.startDate
                          | localTime()
                          | moment("HH:mm DD/MM/YYYY")
                      }}
                    </span>
                  </template>
                  <template v-slot:item.endDate="{ item }">
                    <span>
                      {{
                        item.endDate | localTime() | moment("HH:mm DD/MM/YYYY")
                      }}
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
                      class="text__14"
                      icon
                      @click="changeCampaignFacebook(item.id)"
                    >
                      <v-icon>mdi-information-outline</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
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
                      kpiCampaign.start_date
                        | localTime()
                        | moment("DD/MM/YYYY")
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
                          Math.round((kpiCampaign.interaction / 1000) * 100) >
                          100
                            ? "Completed"
                            : Math.round(
                                (kpiCampaign.interaction / 1000) * 100
                              ) + "%"
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
              <v-btn
                color="primary"
                @click="moreDetail()"
                v-if="!showMoreDetail"
                >More Detail</v-btn
              >
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
                        item.publicDate
                          | localTime()
                          | moment("HH:mm DD/MM/YYYY")
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
                      <v-icon small class="mb-1 ml-1"
                        >mdi-comment-outline</v-icon
                      >
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
      showMoreDetail: false,
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
      customerFacebook: "",
      campaignFacebook: "",

      customerContento: "",
      campaignContento: "",
      campaignDetialContentoTitle: "",

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
      },
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
      "listCampaignByCustomerIDFacebook",
      "StatisticsByTag",
      "StatisticsByTagMonth",
      "listInteractionFanpageByCampaign",
      "StatisticsWeekTrend",
      "StatisticsMonthTrend",
      "StatisticsByCustomer",
      "StatisticsByCustomerFacebook",
      "StatisticsCampaign",
      "StatisticsTotalCampaign",
      "StatisticsTotalCampaignFacebook",
      "kpiCampaign"
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
      getListCampaignByCustomerIDFacebook:
        "campaign/getListCampaignByCustomerIDFacebook",
      getStatisticsByTag: "contentprocess/getStatisticsByTag",
      getStatisticsByTagMonth: "contentprocess/getStatisticsByTagMonth",
      getInteractionFanpageByCampaignId:
        "batchjob/getInteractionFanpageByCampaignId",
      getStatisticsByCustomer: "campaign/getStatisticsByCustomer",
      getStatisticsByCustomerFacebook:
        "campaign/getStatisticsByCustomerFacebook",
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
    async changeCustomer(event) {
      await Promise.all([
        this.getListCampaignByCustomerID(event),
        this.getStatisticsByCustomer(event)
      ]);
      if (event) {
        await this.getStatisticsTotalCampaign({
          idMarketer: this.getUser.id,
          idCustomer: event
        });
      } else {
        this.campaignContento = false;
        await this.getStatisticsTotalCampaign({
          idMarketer: this.getUser.id,
          idCustomer: 0
        });
      }
    },
    async campaignDetail(event) {
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
        this.$nextTick(function() {
          this.$vuetify.goTo(this.$refs.refCampaignContento);
        });
      }
    },
    async moreDetail() {
      this.showMoreDetail = true;
      let id = sessionStorage.getItem("CP_FB");
      this.spinnerLoading(true);
      await this.getInteractionFanpageByCampaignId(id);
      this.spinnerLoading(false);
    },
    async changeCustomerFacebook(event) {
      this.showMoreDetail = false;
      await Promise.all([
        this.getListCampaignByCustomerIDFacebook(event),
        this.getStatisticsByCustomerFacebook(event)
      ]);
      if (event) {
        await this.getStatisticsTotalCampaignFacebook({
          idMarketer: this.getUser.id,
          idCustomer: event
        });
      } else {
        this.campaignFacebook = false;
        await this.getStatisticsTotalCampaignFacebook({
          idMarketer: this.getUser.id,
          idCustomer: 0
        });
      }
    },
    async changeCampaignFacebook(event) {
      this.spinnerLoading(true);
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
      let data = [["Type", "Number", { role: "style" }]];
      data.push(["Like", this.kpiCampaign.reaction, "color: #1b9e77"]);
      data.push(["Comment", this.kpiCampaign.comment, "color: #d95f02"]);
      data.push(["Share", this.kpiCampaign.share, "color:#7570b3"]);
      this.chartCustomerCampaignFacebookDetailData = data;
      this.chartCustomerCampaignFacebookDetailOptions.title = this.kpiCampaign.name;

      this.$nextTick(function() {
        this.$vuetify.goTo(this.$refs.refCampaignFacebook);
      });
      this.spinnerLoading(false);
    },
    async linkTo(event) {
      window.open(event);
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
        this.getListCustomerByMarketerID(this.getUser.id),
        //TOTAL CAMPAIGN CONTENTO
        this.getStatisticsTotalCampaign({
          idMarketer: this.getUser.id,
          idCustomer: 0
        }),
        this.getStatisticsTotalCampaignFacebook({
          idMarketer: this.getUser.id,
          idCustomer: 0
        })
      ]);
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
