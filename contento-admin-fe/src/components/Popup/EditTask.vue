<template>
  <v-dialog v-model="dialog" scrollable width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text icon color="warning" v-on="on">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Task</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false,  update()">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="min-height: 300px; padding:0px;">
        <v-row no-gutters class="mx-10">
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  :counter="255"
                  label="Title:"
                  required
                  class="text__14"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="writer.id"
                  :items="writers"
                  item-text="name"
                  item-value="id"
                  label="Writer"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col cols="1">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>
                  <v-col cols="11">
                    <datetime
                      title="End Time"
                      placeholder="Select End-date"
                      type="datetime"
                      v-model="endtime"
                      :value="endtime"
                      class="text__14"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      :min-datetime="mintime"
                      :max-datetime="maxtime"
                    ></datetime>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-combobox
                  v-model="selectedTag"
                  item-text="name"
                  item-value="id"
                  :items="listTag"
                  chips
                  clearable
                  label="Category"
                  multiple
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
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
                </v-combobox>
              </v-col>
              <v-col cols="6" align-self="center">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col cols="1">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>
                  <v-col cols="11">
                    <datetime
                      title="End Time"
                      placeholder="Select Publish Date"
                      type="datetime"
                      v-model="publishDate"
                      :value="publishDate"
                      class="text__14"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      :min-datetime="mintime"
                      :max-datetime="maxtime"
                    ></datetime>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <CKEditor ref="ckeditor" :content="content" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CKEditor from "../CKEditor/Ckeditor5";
import axios from "axios";
export default {
  props: ["taskID"],
  components: {
    CKEditor
  },
  data() {
    return {
      dialog: false,
      menu: false,
      writers: [],
      selectedTag: [],
      listTag: [],
      endtime: "",
      publishDate: "",
      mintime: "",
      maxtime: "",
      content: "Write Content ...",
      writer: "",
      title: "",
      id: ""
    };
  },
  mounted() {
    let now = new Date();
    this.mintime = now.toISOString();
    this.maxtime = localStorage.getItem("Task-MaxTime").toString();

    let campaignID = localStorage.getItem("CampaignID");
    /**Begin Get list writer by editor id */
    axios
      .get(
        `http://34.87.31.23:5000/api/authentication/writers/editors/${this.$store.getters.getUser.id}`
      )
      .then(rs => {
        this.writers = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End  Get list writer by editor id */

    /**Begin Get list tag by campaign id */
    axios
      .get(
        `http://34.87.31.23:5002/api/contentprocess/tags/campaign/${campaignID}`
      )
      .then(rs => {
        this.listTag = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Get list tag by campaign id */

    /**Begin Get details task */
    axios
      .get(
        `http://34.87.31.23:5002/api/contentprocess/task-detail-update/campaign/${this.taskID}`
      )
      .then(rs => {
        this.selectedTag = rs.data.tags;
        this.endtime = rs.data.deadline;
        this.publishDate = rs.data.publishTime;
        this.content = rs.data.description;
        this.writer = rs.data.writer;
        this.title = rs.data.title;
        this.id = rs.data.id;
      })
      .catch(er => {
        console.log("Marketer - Edit Campaign - LoadData [ERROR]");
        console.log(er);
      });

    /**End Get details task  */
  },
  methods: {
    update() {
      axios
        .put(`http://34.87.31.23:5002/api/contentprocess/task`, {
          idTask: this.id,
          idWriter: this.writer.id,
          title: this.title,
          description: this.$refs.ckeditor.editorData,
          deadline: this.endtime,
          publishTime: this.publishDate,
          tags: this.selectedTag
        })
        .then(rs => {
          console.log("Editor - Edit Task");
          console.log(rs.data);
          this.$emit("editTask");
        })
        .catch(er => {
          console.log("Marketer - Edit Campaign  [ERROR]");
          console.log(er);
        });
    }
  }
};
</script>

<style>
.datetime {
  width: 100%;
  padding-left: 10px;
}
</style>