<template>
  <v-dialog v-model="dialog" scrollable :width="widthDialog">
    <template v-slot:activator="{ on }">
      <v-btn text icon color="primary" v-on="on" @click="clickEdit(taskID)">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="warning">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Task Details</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text style="padding:0px;">
        <v-row no-gutters class="mx-10">
          <v-col cols="12" sm="12">
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="title"
                  :value="title"
                  :counter="255"
                  label="Title:"
                  prepend-inner-icon="title"
                  class="text__14"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="writer.id"
                  :items="listWriter"
                  :value="writer.id"
                  item-text="name"
                  item-value="id"
                  label="Writer"
                  prepend-inner-icon="edit"
                  required
                  readonly
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" align-self="center">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col sm="1" class="d-none d-sm-block">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>
                  <v-col cols="12" sm="11">
                    {{
                      this.endtime | localTime() | moment("HH:mm DD/MM/YYYY")
                    }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  readonly
                  v-model="selectedTag"
                  item-text="name"
                  item-value="id"
                  :items="listTagByCampaignID"
                  :value="selectedTag"
                  chips
                  label="Category"
                  prepend-inner-icon="category"
                  multiple
                  required
                >
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      @click="select"
                      color="blue"
                      class="chips"
                      style="color:white"
                    >
                      <strong class="text__14">{{ item.name }}</strong>
                    </v-chip>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" align-self="center">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col sm="1" class="d-none d-sm-block">
                    <v-icon>publish</v-icon>
                  </v-col>
                  <v-col cols="12" sm="11">
                    {{
                      this.publishDate
                        | localTime()
                        | moment("HH:mm DD/MM/YYYY")
                    }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row justify="center">
              <div
                style="color: black"
                v-html="content"
                class="ck-content content px-2 py-4"
              ></div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  props: ["taskID", "campID", "fromManageTask"],
  data() {
    return {
      dialog: false,
      widthDialog: "800px",
      menu: false,
      selectedTag: [],
      endtime: "",
      publishDate: "",
      mintime: "",
      maxtime: "",
      content: "Write Content ...",
      writer: "",
      title: "",
      id: "",
      check: false,
      loadingSave: false,
      //Local TimeZone
      localISOTime: "",
      tzoffset: new Date().getTimezoneOffset() * 60000 //offset in milliseconds
    };
  },
  validations: {
    title: { required, maxLength: maxLength(255) },
    endtime: { required },
    publishDate: { required },
    writer: { required },
    content: { required },
    selectedTag: { required },
    form: [
      "title",
      "writer",
      "content",
      "endtime",
      "publishDate",
      "selectedTag"
    ]
  },
  computed: {
    ...mapGetters(["listWriter", "listTagByCampaignID", "taskDetailUpdate"])
  },
  mounted() {
    let now = new Date();
    this.mintime = now.toISOString();
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
  methods: {
    ...mapActions({
      getTaskDetailUpdate: "contentprocess/getTaskDetailUpdate",
      editTaskByID: "contentprocess/editTaskByID",
      getListTaskByEditorID: "contentprocess/getListTaskByEditorID",
      getListCampaignTask: "contentprocess/getListCampaignTask",
      getListTagByCampaignID: "contentprocess/getListTagByCampaignID"
    }),
    async clickEdit(taskID) {
      this.check = false;
      let campaignID = "";
      if (this.fromManageTask) {
        campaignID = this.campID;
      } else {
        campaignID = sessionStorage.getItem("CampaignID");
      }
      await Promise.all([
        this.getTaskDetailUpdate(taskID),
        this.getListTagByCampaignID(campaignID)
      ]);
      this.selectedTag = this.taskDetailUpdate.tags;
      // Convert Time to LocalTime
      var endtimeMilisTime = Date.parse(this.taskDetailUpdate.deadline + "Z");
      var endtimeUTC7 = new Date(endtimeMilisTime - this.tzoffset)
        .toISOString()
        .slice(0, -1);
      this.endtime = endtimeUTC7;

      var publishDateMilisTime = Date.parse(
        this.taskDetailUpdate.deadline + "Z"
      );
      var publicDateUTC7 = new Date(publishDateMilisTime - this.tzoffset)
        .toISOString()
        .slice(0, -1);
      this.publishDate = publicDateUTC7;
      this.content = this.taskDetailUpdate.description;
      this.writer = this.taskDetailUpdate.writer;
      this.title = this.taskDetailUpdate.title;
      this.id = this.taskDetailUpdate.id;
    }
  }
};
</script>

<style>
.out-endtime {
  display: flex;
  align-items: center;
  height: 100%;
}
.endtime {
  height: 32px;
  width: 100%;
  padding-top: 5px;
}
.datetime {
  width: 100%;
  padding-left: 10px;
}
.content {
  max-height: 500px;
  overflow-y: auto;
}
.content img {
  max-width: 100%;
  max-height: 100%;
}
.content table {
  border-collapse: collapse;
}
.table table {
  width: 100%;
}
.image {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
}
.image img {
  max-width: 100%;
  max-height: 100%;
}

.content .table th {
  border: 1px solid grey !important;
}
.content .table td {
  padding-left: 10px;
  border: 1px solid grey !important;
}
</style>
