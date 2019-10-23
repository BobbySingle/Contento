<template>
  <v-dialog v-model="dialog" scrollable width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">Create Task</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Task</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false,  create()">Create</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="min-height: 300px; padding:0px;">
        <v-row no-gutters class="mx-10">
          <v-col cols="12" sm="12">
            <v-row>
              <v-col cols="12" sm="12">
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
              <v-col cols="12" sm="6">
                <v-select
                  v-model="writer"
                  :items="listWriter"
                  item-text="name"
                  item-value="id"
                  label="Writer"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col class="d-none d-sm-block" sm="1">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>
                  <v-col cols="12" sm="11">
                    <datetime
                      title="End Time"
                      type="datetime"
                      v-model="endtime"
                      :value="endtime"
                      class="text__14"
                      placeholder="Select End-date"
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
              <v-col cols="12" sm="6">
                <v-combobox
                  v-model="selectedTags"
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
              <v-col cols="12" sm="6" align-self="center">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col class="d-none d-sm-block" sm="1">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>
                  <v-col cols="12" sm="11">
                    <datetime
                      title="End Time"
                      placeholder="Select Publish Date"
                      type="datetime"
                      v-model="publishTime"
                      :value="publishTime"
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
              <v-col cols="12" sm="12">
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
  components: {
    CKEditor
  },
  data() {
    return {
      dialog: false,
      menu: false,
      selectedTags: [],
      endtime: "",
      publishTime: "",
      mintime: "",
      maxtime: "",
      content: "",
      customer: [],
      writer: [],
      title: ""
    };
  },
  computed:{
...mapGetters(["listWriter","listTagByCampaignID"])
  },
  mounted() {
    let now = new Date();
    this.mintime = now.toISOString();
    this.maxtime = sessionStorage.getItem("Task-MaxTime");
  },
  methods: {
    ...mapActions({createTask: "contentprocess/createTask"}),
    create() {
      let campaignID = sessionStorage.getItem("CampaignID");
      this.createTask({
          idCampaign: campaignID,
          idWriter: this.writer,
          title: this.title,
          description: this.$refs.ckeditor.editorData,
          deadline: this.endtime,
          publishTime: this.publishTime,
          tags: this.selectedTags
      })
      /**Clear Data */
      this.selectedTags = [];
      this.endtime = "";
      this.publishTime = "";
      this.content = "";
      this.customer = [];
      this.writer = [];
      this.title = "";
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