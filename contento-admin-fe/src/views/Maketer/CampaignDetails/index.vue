<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="mb-5">
      <h1>Campaign Details</h1>
    </v-row>
    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-col sm="6" md="6">
            <v-text-field label="Title:" v-model="title" readonly></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col sm="5" md="5">
            <v-row class="out-endtime">
              <v-col sm="2" md="1">
                <v-icon>mdi-calendar-range</v-icon>
              </v-col>

              <v-col sm="10" md="11">
                <datetime
                  title="End Time"
                  type="datetime"
                  v-model="endtime"
                  class="endtime"
                  disabled
                ></datetime>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="6" md="6">
            <v-row no-gutters>
              <v-col sm="12" md="12">
                <v-select :items="customers" label="Customer" v-model="customer" readonly></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
          <v-col sm="5" md="5">
            <v-select :items="editors" label="Editor" v-model="editor" readonly></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" md="12">
            <v-combobox
              v-model="chips"
              :items="categorys"
              chips
              clearable
              label="Category"
              multiple
              disabled
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  @click="select"
                  color="blue"
                  class="chips"
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="12" md="12">
        <v-row class="ml-1">
          <h3 style="color:grey;">List Task</h3>
        </v-row>
        <v-row>
          <v-data-table :headers="headers" :items="listtasks" style="width:100%;">
            <template v-slot:item.status="{ item }">
              <v-chip color="success" dark v-if="item.status === 1">Completed</v-chip>
              <v-chip color="warning" dark v-if="item.status === 2">Under Review</v-chip>
              <v-chip color="warning" dark v-if="item.status === 3">In Progress</v-chip>
              <v-chip color="error" dark v-if="item.status === 4">Overdue</v-chip>
              <v-chip color="secondary" dark v-if="item.status === 5">Publishing</v-chip>
              <v-chip color="primary" dark v-if="item.status === 6">Published</v-chip>
            </template>
            <template v-slot:item.action="{item}">
              <v-btn color="primary" v-if="item.status === 1" @click="publish(item.id)">Publish</v-btn>
              <v-btn disabled v-if="item.status != 1">Publish</v-btn>
            </template>
          </v-data-table>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      menu: false,
      customers: ["Customer 1", "Customer 2", "Customer 3", "Customer 4"],
      editors: ["Editor 1", "Editor 2", "Editor 3"],
      chips: ["Sport", "Travel", "Food & Drink"],
      categorys: [
        "Sport",
        "Travel",
        "Food & Drink",
        "2Tek",
        "Social",
        "Business",
        "Film"
      ],
      endtime: "",
      title: "",
      customer: "",
      editor: "",
      /**List Tasks */
      headers: [
        {
          text: "#",
          align: "left",
          value: "id"
        },
        { text: "Task", value: "title", sortable: false },
        { text: "Current Assignee", value: "writer", align: "center" },
        { text: "Deadline", value: "deadline", align: "center" },
        { text: "Status", value: "status", align: "center" },
        { text: "Action", value: "action", align: "center" }
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
      localStorage.setItem("ContentID", event);
      this.$router.push("/PublishChannel");
    },
    /**Begin format time Deadline */
    formatListContent() {
      this.listtasks.forEach(el => {
        el.deadline = this.$moment(String(el.deadline)).format(
          "YYYY-MM-DD hh:mm"
        );
      });
    }
    /**End format time Deadline */
  },
  mounted() {
    let campaign = JSON.parse(localStorage["Campaign"].toString());
    this.title = campaign.titleCampaign;
    this.customer = campaign.customer;
    this.editor = "Editor 2";
    this.endtime = campaign.deadline;
    this.chips = campaign.topicCampaign;
    this.formatListContent();
  }
};
</script>
<style scoped>
.chips {
  color: white !important;
}
</style>

