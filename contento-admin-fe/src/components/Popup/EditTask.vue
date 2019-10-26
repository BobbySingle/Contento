<template>
  <v-dialog v-model="dialog" scrollable width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text icon color="warning" v-on="on" @click="clickEdit(taskID)">
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
          <v-btn dark text @click="update()">Save</v-btn>
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
                  :items="listWriter"
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
                  :items="listTagByCampaignID"
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
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["taskID"],
  components: {
    CKEditor
  },
  data() {
    return {
      dialog: false,
      menu: false,
      selectedTag: [],
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
  computed: {
    ...mapGetters(["listWriter", "listTagByCampaignID", "taskDetailUpdate"])
  },
  mounted() {
    let now = new Date();
    this.mintime = now.toISOString();
    this.maxtime = sessionStorage.getItem("Task-MaxTime").toString();
  },
  methods: {
    ...mapActions({
      getTaskDetailUpdate: "contentprocess/getTaskDetailUpdate",
      editTaskByID: "contentprocess/editTaskByID"
    }),
    async clickEdit(taskID) {
      await this.getTaskDetailUpdate(taskID);
      if (this.taskDetailUpdate != null) {
        this.selectedTag = this.taskDetailUpdate.tags;
        this.endtime = this.taskDetailUpdate.deadline;
        this.publishDate = this.taskDetailUpdate.publishTime;
        this.content = this.taskDetailUpdate.description;
        this.writer = this.taskDetailUpdate.writer;
        this.title = this.taskDetailUpdate.title;
        this.id = this.taskDetailUpdate.id;
      }
    },

    async update() {
      let status = await this.editTaskByID({
        idTask: this.id,
        idWriter: this.writer.id,
        title: this.title,
        description: this.$refs.ckeditor.editorData,
        deadline: this.endtime,
        publishTime: this.publishDate,
        tags: this.selectedTag
      });
      if(status == 202){
        this.dialog = false;
      }
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