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
                  <span class="text__14">{{customerName}}</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col sm="5" md="5">
                  <span style="color:grey; font-weight:300; font-size:12px;">Editor</span>
                  <br />
                  <span class="text__14">{{editor}}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" md="12">
                  <span style="color:grey; font-weight:300; font-size:12px;">Categorys</span>
                  <br />
                  <v-chip
                    class="text__14 chips ma-1"
                    v-for="item in listTag"
                    :key="item"
                    color="blue"
                    :input-value="item"
                  >{{item}}</v-chip>
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
                    <v-chip class="text__14" color="success" dark v-if="item.status === 1">Completed</v-chip>
                    <v-chip
                      class="text__14"
                      color="warning"
                      dark
                      v-if="item.status === 2"
                    >Under Review</v-chip>
                    <v-chip
                      class="text__14"
                      color="warning"
                      dark
                      v-if="item.status === 3"
                    >In Progress</v-chip>
                    <v-chip class="text__14" color="error" dark v-if="item.status === 4">Overdue</v-chip>
                    <v-chip
                      class="text__14"
                      color="secondary"
                      dark
                      v-if="item.status === 5"
                    >Publishing</v-chip>
                    <v-chip class="text__14" color="primary" dark v-if="item.status === 6">Published</v-chip>
                  </template>
                  <template v-slot:item.action="{item}">
                    <v-btn
                      class="text__14"
                      color="primary"
                      v-if="item.status === 1"
                      @click="publish(item)"
                    >Publish</v-btn>
                    <v-btn class="text__14" disabled v-if="item.status != 1">Publish</v-btn>
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
      listTag: [],
      categorys: [
        "Sport",
        "Travel",
        "Food & Drink",
        "2Tek",
        "Social",
        "Business",
        "Film"
      ],
      endDate: "",
      title: "",
      customerName: "",
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
          text: "Current Assignee",
          value: "writer",
          align: "center",
          width: "16%"
        },
        { text: "Deadline", value: "deadline", align: "center", width: "16%" },
        { text: "Status", value: "status", align: "center", width: "10%" },
        { text: "Action", value: "action", align: "center", width: "10%" ,sortable:false}
      ],
      listtasks: [
        {
          id: 1,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 1",
          deadline: "2019-10-17T15:20:03.146Z",
          status: 1
        },
        {
          id: 2,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 2",
          deadline: "2019-10-17T15:20:03.146Z",
          status: 2
        },
        {
          id: 3,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 3",
          deadline: "2019-10-17T15:20:03.146Z",
          status: 3
        },
        {
          id: 4,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 4",
          deadline: "2019-10-17T15:20:03.146Z",
          status: 5
        },
        {
          id: 5,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 1",
          deadline: "2019-10-17T15:20:03.146Z",
          status: 3
        },
        {
          id: 6,
          title:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 2",
          deadline: "2019-10-17T15:20:03.146Z",
          status: 6
        }
      ]
    };
  },
  methods: {
    publish(event) {
      localStorage.setItem("Content", JSON.stringify(event));
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
  mounted() {
    /**Begin Load data campaign details */
    let campaign = JSON.parse(localStorage["Campaign"].toString());
    this.title = campaign.title;
    this.customerName = campaign.customerName;
    this.editor = "Editor 2";
    /**Convert Date to ISO */
    this.endDate = campaign.endDate;
    this.listTag = campaign.listTag;
    this.formatListTask();
    /**End Load data campaign details */
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

