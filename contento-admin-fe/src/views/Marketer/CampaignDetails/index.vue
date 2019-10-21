<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Campaign Details</h1>
    </v-row>
    <v-row no-gutters class="mx-10">
      <v-expansion-panels :accordion="true" :focusable="true" multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14">Infomation:</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-col sm="12" md="12">
              <v-row>
                <v-col sm="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Title</span>
                  <br />
                  <span class="text__14">{{title}}</span>
                  <!-- <v-text-field label="Title:" v-model="title" readonly class="text__14"></v-text-field> -->
                </v-col>
                <v-spacer></v-spacer>
                <v-col sm="5" md="5">
                  <span style="color:grey; font-weight:300; font-size:12px;">End Date</span>
                  <br />
                  <span class="text__14">{{endDate}}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Customer</span>
                  <br />
                  <span class="text__14">{{customer.name}}</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col sm="5" md="5">
                  <span style="color:grey; font-weight:300; font-size:12px;">Editor</span>
                  <br />
                  <span class="text__14">{{editor.name}}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="12">
                  <span style="color:grey; font-weight:300; font-size:12px;">Categorys</span>
                  <br />
                  <v-chip
                    class="text__14 chips ma-1"
                    v-for="item in listTag"
                    :key="item.id"
                    color="blue"
                    :input-value="item"
                  >{{item.name}}</v-chip>
                </v-col>
              </v-row>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14">List Tasks:</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-col sm="12" md="12">
              <v-row>
                <v-data-table
                  :headers="headers"
                  :items="listtasks"
                  style="width:100%;"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  @page-count="pageCount = $event"
                >
                  <template v-slot:item.status="{ item }">
                    <v-chip
                      class="text__14"
                      color="success"
                      dark
                      v-if="item.status.id === 1"
                    >{{item.status.name}}</v-chip>
                    <v-chip
                      class="text__14"
                      color="warning"
                      dark
                      v-if="item.status.id === 2"
                    >{{item.status.name}}</v-chip>
                    <v-chip
                      class="text__14"
                      color="warning"
                      dark
                      v-if="item.status.id === 3"
                    >{{item.status.name}}</v-chip>
                    <v-chip
                      class="text__14"
                      color="error"
                      dark
                      v-if="item.status.id === 4"
                    >{{item.status.name}}</v-chip>
                    <v-chip
                      class="text__14"
                      color="secondary"
                      dark
                      v-if="item.status.id === 5"
                    >{{item.status.name}}</v-chip>
                    <v-chip
                      class="text__14"
                      color="primary"
                      dark
                      v-if="item.status.id === 6"
                    >{{item.status.name}}</v-chip>
                  </template>
                  <template v-slot:item.action="{item}">
                    <v-btn
                      class="text__14"
                      color="primary"
                      v-if="item.status.id === 5"
                      @click="publish(item.id)"
                    >Publish</v-btn>
                    <v-btn class="text__14" disabled v-if="item.status.id != 5">Publish</v-btn>
                  </template>
                </v-data-table>
                <v-row justify="center">
                  <div class="text-center pt-2">
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      /**End Pagination */
      /**Begin Expension Panel */
      panel: [0, 1],
      /**End Expension Panel */
      dialog: false,
      menu: false,
      endDate: "",
      title: "",
      listTag: [],
      customer: "",
      editor: "",
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
        { text: "Deadline", value: "deadline", align: "center", width: "16%" },
        { text: "Status", value: "status", align: "center", width: "10%" },
        {
          text: "Action",
          value: "action",
          align: "center",
          width: "10%",
          sortable: false
        }
      ],
      listtasks: [
        // {
        //   id: 1,
        //   title:
        //     "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
        //   writer: "Writer 1",
        //   deadline: "2019-10-17T15:20:03.146Z",
        //   status: 1
        // },
      ]
    };
  },
  methods: {
    publish(event) {
      localStorage.setItem("ContentID", JSON.stringify(event));
      this.$router.push("/PublishChannel");
    },
    /**Begin format time created */
    formatListTask() {
      this.listtasks.forEach(el => {
        el.deadline = this.$moment(String(el.deadline)).format(
          "YYYY-MM-DD hh:mm"
        );
      });
    }
    /**End format time created */
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Marketer") {
      this.$router.push("/403");
    }
  },
  mounted() {
    /**Begin Load data campaign details */
    let campaignID = JSON.parse(localStorage["CampaignID"].toString());
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$store.getters.getAccessToken;

    axios
      .get(`http://34.87.31.23:5001/api/campaign/campaigns/${campaignID}`)
      .then(rs => {
        this.title = rs.data.title;
        this.customer = rs.data.customer;
        this.editor = rs.data.editor;
        /**Convert Date to ISO */
        this.endDate = rs.data.endDate;
        this.listTag = rs.data.listTag;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Load data campaign details */

    /**Begin Get list tasks */
    axios
      .get(
        `http://34.87.31.23:5002/api/contentprocess/task/campaign/${campaignID}`
      )
      .then(rs => {
        this.listtasks = rs.data;
        this.formatListTask();
        console.log(rs.data);
      })
      .catch(er => {
        console.log(er);
      });
    /** End Get list campaign */
  }
};
</script>
<style scoped>
::v-deep .v-expansion-panels {
  z-index: inherit;
}
.chips {
  color: white !important;
}
</style>

