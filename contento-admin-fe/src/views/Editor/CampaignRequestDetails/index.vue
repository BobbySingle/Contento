<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="my-3">
      <h1 class="text__h1">Work Assignment</h1>
    </v-row>
    <v-expansion-panels
      :accordion="true"
      :focusable="true"
      multiple
      v-model="panel"
    >
      <v-row justify="center" class="mx-5" no-gutters>
        <v-col cols="12">
          <v-expansion-panel>
            <v-expansion-panel-header class="text__14"
              >Campaign Information:</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Title</span
                  >
                  <br />
                  <span class="text__14">{{ campaign_title }}</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Customer</span
                  >
                  <br />
                  <span class="text__14">{{ campaign_customer.name }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Categorys</span
                  >
                  <br />
                  <v-chip
                    v-for="item in campaign_tags"
                    :key="item.id"
                    color="blue"
                    style="color:white;"
                    class="ma-1"
                  >
                    <strong class="text__14">{{ item.name }}</strong>
                  </v-chip>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >End Date</span
                  >
                  <br />
                  <span class="text__14">
                    {{ campaign_enddate | localTime() | moment("DD/MM/YYYY") }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <v-row no-gutters>
          <v-col cols="12">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14"
                >Campaign Request:</v-expansion-panel-header
              >
              <v-expansion-panel-content class="my-2 py-2">
                <div
                  v-html="campaign_content"
                  class="work content ck-content px-2 py-4"
                ></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>

          <v-col cols="12">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14"
                >Work Assignment:</v-expansion-panel-header
              >
              <v-expansion-panel-content class="py-2">
                <div class="work">
                  <v-row class="my-2" justify="center">
                    <create-task :disableStatus="disableStatus" />
                  </v-row>
                  <v-data-table
                    :headers="headers"
                    :items="listCampaignTaskNotFormated"
                    style="width:100%"
                    :mobile-breakpoint="600"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    :loading="loading"
                    @page-count="pageCount = $event"
                  >
                    <template v-slot:item.deadline="{ item }">
                      <span v-if="item.deadline">
                        {{ item.deadline | localTime() | moment("DD/MM/YYYY") }}
                      </span>
                    </template>
                    <template v-slot:item.writer="{ item }">
                      <span v-if="item.writer">{{ item.writer.name }}</span>
                    </template>
                    <template v-slot:item.status="{ item }">
                      <v-chip
                        :color="item.status.color"
                        style="color:white"
                        class="text__14"
                        >{{ item.status.name }}</v-chip
                      >
                    </template>
                    <template v-slot:item.action="{ item }">
                      <v-row
                        class="flex-nowrap"
                        justify="end"
                        v-if="item.status"
                      >
                        <v-btn
                          color="primary"
                          icon
                          fab
                          v-if="item.status.id == 3"
                          @click="changeToReview(item.id)"
                        >
                          <v-icon>gavel</v-icon>
                        </v-btn>
                        <v-btn
                          text
                          icon
                          color="error"
                          v-if="item.status.id == 1"
                          @click="clickDelete(item.id)"
                        >
                          <v-icon>delete</v-icon>
                        </v-btn>
                        <edit-task
                          v-if="item.status.id == 1"
                          :taskID="item.id"
                          :fromManageTask="false"
                        />
                        <edit-task-over-due
                          v-if="item.status.id == 2 || item.status.id == 4"
                          :taskID="item.id"
                          :fromManageTask="false"
                        />
                        <task-details
                          :taskID="item.id"
                          :fromManageTask="false"
                        />
                      </v-row>
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
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
        </v-row>
      </v-row>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import moment from "moment";
import CreateTask from "../../../components/Popup/CreateTask.vue";
import EditTask from "../../../components/Popup/EditTask.vue";
import TaskDetails from "../../../components/Popup/TaskDetails.vue";
import EditTaskOverDue from "../../../components/Popup/EditTaskOverDue.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { CreateTask, EditTask, EditTaskOverDue, TaskDetails },
  data() {
    return {
      panel: [0, 2],
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      /**End Pagination */
      dialog: false,
      menu: false,
      loading: false,
      /**Campaign Information */
      campaign_title: "",
      campaign_tags: undefined,
      campaign_customer: "",
      campaign_enddate: "",
      tags: [],
      campaign_content: undefined,
      disableStatus: false,
      headers: [
        { text: "Title", value: "title", sortable: false, width: "40%" },
        {
          text: "Implementer",
          value: "writer",
          sortable: false,
          width: "15%"
        },
        {
          text: "End",
          value: "deadline",
          sortable: false,
          width: "20%"
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          width: "15%",
          align: "center"
        },
        { text: "Action", value: "action", align: "center", width: "10%" }
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
  computed: {
    ...mapGetters(["getUser", "detailCampaign", "listCampaignTaskNotFormated"])
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
  mounted() {
    this.fetchData();
  },
  methods: {
    /**fetch data - dialog process success */

    ...mapActions({
      getDetailCampaign: "campaign/getDetailCampaign",
      getListCampaignTask: "contentprocess/getListCampaignTask",
      deleteTaskByID: "contentprocess/deleteTaskByID",
      getListTagByCampaignID: "contentprocess/getListTagByCampaignID",
      getListWriter: "authentication/getListWriter",
      spinnerLoading: "spinner/spinnerLoading"
    }),
    changeToReview(event) {
      sessionStorage.setItem("ApproveRequestID", event);
      this.$router.push("/ReviewContent");
    },
    async clickDelete(id) {
      await this.deleteTaskByID(id);
    },
    async fetchData() {
      /**Load list task */
      this.loading = true;
      let campaignID = sessionStorage.getItem("CampaignID");
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
        this.getListCampaignTask(campaignID),
        this.getListTagByCampaignID(campaignID),
        this.getListWriter(this.$store.getters.getUser.id),
        this.getDetailCampaign(campaignID)
      ]);
      debugger;
      this.campaign_title = this.detailCampaign.title;
      this.campaign_tags = this.detailCampaign.tagFull;
      this.campaign_customer = this.detailCampaign.customer;
      this.campaign_enddate = this.detailCampaign.endDate;
      let now = new Date();
      let endFlag;
      endFlag = this.$moment(this.detailCampaign.endDate)
        .subtract(2, "days")
        .add(7, "hours")
        .toISOString();
      if (endFlag < now.toISOString()) {
        this.disableStatus = true;
      }
      sessionStorage.setItem("Task-MaxTime", this.detailCampaign.endDate);
      this.campaign_content = this.detailCampaign.description;
      await this.spinnerLoading(false);
      this.loading = false;
    }
  }
};
</script>

<style scoped>
/* .work {
  min-height: 500px;
  max-height: 500px;
} */
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
