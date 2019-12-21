<template>
  <v-dialog v-model="dialog" persistent scrollable width="800px">
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        v-on="on"
        @click="clickCreate()"
        :disabled="disableStatus"
        >Create Task</v-btn
      >
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Task</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="create()" :loading="loadingCreate"
            >Create</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="min-height: 300px; padding:0px;">
        <v-row no-gutters class="mx-10">
          <v-col cols="12" sm="12">
            <v-expansion-panels focusable>
              <v-row no-gutters class="my-4">
                <v-col cols="12">
                  <v-expansion-panel>
                    <v-expansion-panel-header class="text__14"
                      >View Campaign Request:</v-expansion-panel-header
                    >
                    <v-expansion-panel-content class="my-2 py-2">
                      <div
                        v-html="campaign_content"
                        class="work content ck-content px-2 py-4"
                      ></div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-col>
              </v-row>
            </v-expansion-panels>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="title"
                  :counter="255"
                  label="Title"
                  class="text__14"
                  prepend-inner-icon="title"
                  required
                  @blur="$v.title.$touch()"
                ></v-text-field>
                <div style="color:red" v-if="!$v.title.required && check">
                  The title cannot be empty.
                </div>
                <div style="color:red" v-if="!$v.title.maxLength && check">
                  Title up to 255 characters.
                </div>
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
                  clearable
                  prepend-inner-icon="edit"
                  required
                ></v-select>
                <div style="color:red" v-if="!$v.writer.required && check">
                  Please select writer.
                </div>
              </v-col>
              <v-col cols="12" sm="6" align-self="center">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col class="d-none d-sm-block" sm="1">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>
                  <v-col cols="12" sm="11">
                    <datetime
                      title="End Time"
                      type="datetime"
                      v-model="endtime"
                      class="text__14"
                      placeholder="Select End Time"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      :min-datetime="mintime"
                      :max-datetime="maxEndtime"
                      required
                    ></datetime>
                  </v-col>
                </v-row>
                <div style="color:red" v-if="!$v.endtime.required && check">
                  Please select endtime.
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedTags"
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
                <div
                  style="color:red"
                  v-if="!$v.selectedTags.required && check"
                >
                  Please select category.
                </div>
              </v-col>
              <v-col cols="12" sm="6" align-self="center">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col class="d-none d-sm-block" sm="1">
                    <v-icon>publish</v-icon>
                  </v-col>
                  <v-col cols="12" sm="11">
                    <datetime
                      title="Publish Time"
                      placeholder="Select Publish Time"
                      type="datetime"
                      v-model="publishTime"
                      :value="publishTime"
                      class="text__14"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      :min-datetime="minPubishTime"
                      :max-datetime="maxtime"
                      required
                    ></datetime>
                  </v-col>
                </v-row>
                <div style="color:red" v-if="!$v.publishTime.required && check">
                  Please select publish time.
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <div style="color:red" v-if="!$v.content.required && check">
                  The content cannot empty !
                </div>
              </v-col>
              <v-col cols="12" sm="12">
                <CKEditor
                  style="color: black"
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
  props: ["disableStatus"],
  components: {
    CKEditor
  },
  data() {
    return {
      dialog: false,
      menu: false,
      selectedTags: [],
      panel: [],
      endtime: "",
      maxEndtime: "",
      publishTime: "",
      mintime: "",
      minPubishTime: "",
      maxtime: "",
      content: "",
      campaign_content: undefined,
      writer: [],
      title: "",
      firstTimeLoad: true,
      check: false,
      loadingCreate: false,
      taskForm:
        '<figure class="table"><table><thead><tr><th colspan="2"><h3 style="text-align:center;">Content Request</h3></th></tr></thead><tbody><tr><th>Number of words</th><td>&nbsp;</td></tr><tr><th>Key Message</th><td>&nbsp;</td></tr><tr><th>Meaning</th><td>&nbsp;</td></tr><tr><th>Color Picture</th><td>&nbsp;</td></tr><tr><th>Meaning Picture</th><td>&nbsp;</td></tr><tr><th>&nbsp;</th><td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</td></tr></tbody></table></figure>'
      // '<figure class="table"><table><tbody><tr><th>Number of words</th><td>&nbsp;</td></tr><tr><th>Meaning</th><td>&nbsp;</td></tr><tr><th>&nbsp;</th><td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</td></tr></tbody></table></figure>'
    };
  },
  validations: {
    title: { required, maxLength: maxLength(255) },
    endtime: { required },
    publishTime: { required },
    writer: { required },
    content: { required },
    selectedTags: { required },
    form: [
      "title",
      "writer",
      "content",
      "endtime",
      "publishTime",
      "selectedTags"
    ]
  },
  watch: {
    endtime() {
      this.minPubishTime = this.$moment(this.endtime)
        .add(1, "days")
        .toISOString();
    }
  },
  computed: {
    ...mapGetters(["listWriter", "listTagByCampaignID", "detailCampaign"])
  },
  mounted() {
    let now = new Date();
    this.mintime = now.toISOString();
    this.minPubishTime = now.toISOString();
  },
  methods: {
    ...mapActions({
      createTask: "contentprocess/createTask"
    }),
    async create() {
      this.check = true;
      this.loadingCreate = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let campaignID = sessionStorage.getItem("CampaignID");
        let status = await this.createTask({
          idCampaign: campaignID,
          idWriter: this.writer,
          title: this.title,
          description: this.$refs.ckeditor.editorData,
          deadline: this.endtime,
          publishTime: this.publishTime,
          tags: this.selectedTags
        });
        if (status == 202) {
          this.loadingCreate = false;
          this.dialog = false;
        }
      }
      this.loadingCreate = false;
    },
    clickCreate() {
      this.check = false;
      this.selectedTags = [];
      this.endtime = "";
      this.publishTime = "";
      if (this.firstTimeLoad) {
        this.content = this.taskForm;
        this.firstTimeLoad = !this.firstTimeLoad;
      } else {
        this.$refs.ckeditor.editorData = this.taskForm;
      }
      this.writer = [];
      this.title = "";
      var task_maxtime = sessionStorage.getItem("Task-MaxTime");
      this.maxtime = task_maxtime;
      this.maxEndtime = this.$moment(task_maxtime)
        .subtract(1, "days")
        .subtract(60, "minutes")
        .toISOString();
      this.campaign_content = this.detailCampaign.description;
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
