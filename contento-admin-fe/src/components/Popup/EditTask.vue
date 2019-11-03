<template>
  <v-dialog v-model="dialog" scrollable width="800px">
    <template v-slot:activator="{ on }">
      <v-btn text icon color="warning" v-on="on" @click="clickEdit(taskID)">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="warning">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Task</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="update()" :loading="loadingSave">Save</v-btn>
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
                  prepend-inner-icon="title"
                  class="text__14"
                  @blur="$v.title.$touch()"
                  @input="$v.title.$touch()"
                ></v-text-field>
                <div style="color:red" v-if="!$v.title.required && check">The title cannot be empty.</div>
                <div
                  style="color:red"
                  v-if="!$v.title.maxLength && check"
                >Title up to 255 characters.</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="writer.id"
                  :items="listWriter"
                  item-text="name"
                  item-value="id"
                  label="Writer"
                  prepend-inner-icon="edit"
                  required
                ></v-select>
                <div style="color:red" v-if="!$v.writer.required && check">Please select writer.</div>
              </v-col>
              <v-col cols="12" sm="6" align-self="center">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col sm="1" class="d-none d-sm-block">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>
                  <v-col cols="12" sm="11">
                    <datetime
                      title="End Time"
                      placeholder="Select End Time"
                      value-zone="UTC+07:00"
                      type="datetime"
                      v-model="endtime"
                      :value="endtime"
                      class="text__14"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      :min-datetime="mintime"
                      :max-datetime="maxtime"
                      required
                    ></datetime>
                  </v-col>
                </v-row>
                <div style="color:red" v-if="!$v.endtime.required && check">Please select endtime.</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-combobox
                  v-model="selectedTag"
                  item-text="name"
                  item-value="id"
                  :items="listTagByCampaignID"
                  chips
                  clearable
                  label="Category"
                  prepend-inner-icon="category"
                  multiple
                  required
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
                <div
                  style="color:red"
                  v-if="!$v.selectedTag.required && check"
                >Please select category.</div>
              </v-col>
              <v-col cols="12" sm="6" align-self="center">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col sm="1" class="d-none d-sm-block">
                    <v-icon>publish</v-icon>
                  </v-col>
                  <v-col cols="12" sm="11">
                    <datetime
                      title="Publish Time"
                      placeholder="Select Publish Time"
                      type="datetime"
                      v-model="publishDate"
                      :value="publishDate"
                      value-zone="UTC+07:00"
                      class="text__14"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      :min-datetime="mintime"
                      :max-datetime="maxtime"
                      required
                    ></datetime>
                  </v-col>
                </v-row>
                <div
                  style="color:red"
                  v-if="!$v.publishDate.required && check"
                >Please select publish time.</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <div
                  style="color:red"
                  v-if="!$v.content.required && check"
                >The content cannot empty !</div>
              </v-col>
              <v-col cols="12" sm="12">
                <CKEditor
                  ref="ckeditor"
                  :content="content"
                  required
                  @ckeditorContent="content = $event"
                />
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";
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
      id: "",
      check: false,
      loadingSave: false
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
    this.maxtime = sessionStorage.getItem("Task-MaxTime");
  },
  methods: {
    ...mapActions({
      getTaskDetailUpdate: "contentprocess/getTaskDetailUpdate",
      editTaskByID: "contentprocess/editTaskByID",
      getListTaskByEditorID: "contentprocess/getListTaskByEditorID"
    }),
    async clickEdit(taskID) {
      this.check = false;
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
      this.loadingSave = true;
      this.check = true;
      this.$v.form.$touch();
      console.log(this.taskDetailUpdate.id);
      if (!this.$v.form.$invalid) {
        let status = await this.editTaskByID({
          idTask: this.id,
          idWriter: this.writer.id,
          title: this.title,
          description: this.$refs.ckeditor.editorData,
          deadline: this.endtime,
          publishTime: this.publishDate,
          tags: this.selectedTag
        });
        if (status == 202) {
          await this.getListTaskByEditorID(this.$store.getters.getUser.id);
          this.loadingSave = false;
          this.dialog = false;
        }
      }
      this.loadingSave = false;
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
</style>