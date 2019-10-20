<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="my-3">
      <h1 class="text__h1">Work Assignment</h1>
    </v-row>
    <v-expansion-panels :accordion="true" :focusable="true" multiple v-model="panel">
      <v-row justify="center" class="mx-5" no-gutters>
        <v-col cols="12">
          <v-expansion-panel>
            <v-expansion-panel-header class="text__14">Campaign Information:</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Title</span>
                  <br />
                  <span class="text__14">{{campaign_title}}</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Customer</span>
                  <br />
                  <span class="text__14">{{campaign_customer.name}}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Categorys</span>
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
                  <span style="color:grey; font-weight:300; font-size:12px;">End Date</span>
                  <br />
                  <span class="text__14">{{campaign_enddate | moment("DD/MM/YYYY")}}</span>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Campaign Request:</v-expansion-panel-header>
              <v-expansion-panel-content class="my-2 py-2">
                <div v-html="campaign_content" class="work content px-2 py-4"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>

          <v-col cols="12" md="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Work Assignment:</v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">
                <div class="work">
                  <v-row class="my-2" justify="center">
                    <create-task @createTask="createTask" />
                  </v-row>
                  <v-data-table
                    :headers="headers"
                    :items="listTasks"
                    :search="search"
                    style="width:100%"
                    :mobile-breakpoint="600"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    @page-count="pageCount = $event"
                  >
                    <template v-slot:item.deadline="{item}">
                      <span>{{item.deadline| moment("DD/MM/YYYY")}}</span>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <v-row class="flex-nowrap" justify="center">
                        <edit-task v-if="item.status.id !== 5" :taskID="item.id" @editTask="editTask"/>
                        <v-btn text icon color="error" v-if="item.status.id == 1">
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </v-row>
                    </template>
                  </v-data-table>
                  <v-row justify="center">
                    <div class="text-center pt-2">
                      <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
import axios from "axios";
import CreateTask from "../../../components/Popup/CreateTask.vue";
import EditTask from "../../../components/Popup/EditTask.vue";
export default {
  components: { CreateTask, EditTask },
  data() {
    return {
      panel: [0, 1, 2],
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      /**End Pagination */
      dialog: false,
      menu: false,
      search: "",
      loading: true,
      /**Campaign Information */
      campaign_title: "",
      campaign_tags: undefined,
      campaign_customer: "",
      campaign_enddate: "",
      tags: [],
      campaign_content: undefined,
      headers: [
        { text: "Title", value: "title", sortable: false, width: "40%" },
        {
          text: "Implementer",
          value: "writer.name",
          sortable: false,
          width: "20%"
        },
        { text: "End", value: "deadline", sortable: false, width: "20%" },
        { text: "Action", value: "action", align: "center", width: "10%" }
      ],
      listTasks: []
    };
  },
  mounted() {
    /**Load campaign information */
    let campaignID = JSON.parse(localStorage.getItem("Campaign").toString());
    console.log(campaignID);
    axios
      .get(`http://34.87.31.23:5001/api/campaign/campaigns/${campaignID}`)
      .then(rs => {
        console.log(rs.data);
        this.campaign_title = rs.data.title;
        this.campaign_tags = rs.data.listTag;
        this.campaign_customer = rs.data.customer;
        this.campaign_enddate = rs.data.endDate;
        localStorage.setItem("Task-MaxTime", rs.data.endDate);
        this.campaign_content = rs.data.description;
      })
      .catch(er => {
        console.log(er);
      });
      this.fetchData();
  },
  methods: {
    /**fetch data - dialog process success */
    createTask() {
      alert("Create task success!");
      this.fetchData();
    },
     editTask() {
      alert("Edit task success!");
      this.fetchData();
    },

    fetchData() {
      /**Load list task */
      let campaignID = JSON.parse(localStorage.getItem("Campaign").toString());
      axios
        .get(
          `http://34.87.31.23:5002/api/contentprocess/task/campaign/${campaignID}`
        )
        .then(rs => {
          this.listTasks = rs.data.reverse();
          console.log(this.listTasks);
        })
        .catch(er => {
          console.log(er);
        });
    }
  }
};
</script>

<style scoped>
.work {
  min-height: 500px;
  max-height: 500px;
}
::v-deep .content {
  max-height: 500px;
  overflow-y: auto;
}
::v-deep .content img {
  max-width: 100%;
  max-height: 100%;
}
</style>