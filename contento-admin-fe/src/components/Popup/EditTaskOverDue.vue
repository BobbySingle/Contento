<template>
  <v-dialog v-model="dialog" scrollable :width="widthDialog">
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
      <v-card-text style="padding:0px;">
        <v-row no-gutters class="mx-10">
          <!-- Over due -->
          <v-row>
            <v-col cols="12" align-self="center">
              <v-row class="out-endtime flex-nowrap" align="center">
                <v-col sm="1" class="d-none d-sm-block">
                  <v-icon>mdi-calendar-range</v-icon>
                </v-col>
                <v-col cols="12" sm="11">
                  <datetime
                    title="End Time"
                    placeholder="Select End Time"
                    type="datetime"
                    v-model="endtime"
                    :value="endtime"
                    class="text__14"
                    input-class="datetime"
                    input-style="cursor:pointer;"
                    :min-datetime="mintime"
                    :max-datetime="publishDate"
                    required
                  ></datetime>
                </v-col>
              </v-row>
              <div style="color:red" v-if="!$v.endtime.required && check">Please select endtime.</div>
            </v-col>
            <v-col cols="12" align-self="center">
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
                    class="text__14"
                    input-class="datetime"
                    input-style="cursor:pointer;"
                    :min-datetime="minPublish"
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
      widthDialog: "300px",
      menu: false,
      selectedTag: [],
      endtime: "",
      publishDate: "",
      mintime: "",
      minPublish: "",
      maxtime: "",
      content: "Write Content ...",
      writer: "",
      title: "",
      id: "",
      tags: [],
      check: false,
      loadingSave: false,
      //Local TimeZone
      localISOTime: "",
      tzoffset: new Date().getTimezoneOffset() * 60000 //offset in milliseconds
    };
  },
  validations: {
    endtime: { required },
    publishDate: { required },
    overdue: ["publishDate", "endtime"]
  },
  mounted() {
    let now = new Date();
    this.mintime = now.toISOString();
    if (this.endtime < this.mintime) {
      this.minPublish = now.toISOString();
    } else {
      this.minPublish = this.endtime;
    }
  },
  computed: {
    ...mapGetters(["taskDetailUpdate"])
  },
  methods: {
    ...mapActions({
      editTaskByID: "contentprocess/editTaskByID",
      getListCampaignTask: "contentprocess/getListCampaignTask",
      getTaskDetailUpdate: "contentprocess/getTaskDetailUpdate",
      getListTaskByEditorID: "contentprocess/getListTaskByEditorID"
    }),
    async clickEdit(taskID) {
      this.check = false;
      await this.getTaskDetailUpdate(taskID);
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
      this.widthDialog = "300px";
    },

    async update() {
      this.loadingSave = true;
      let campaignID = sessionStorage.getItem("CampaignID");
      this.check = true;
      this.$v.overdue.$touch();
      if (!this.$v.overdue.$invalid) {
        let status = await this.editTaskByID({
          idTask: this.id,
          idWriter: this.writer.id,
          title: this.title,
          description: this.content,
          deadline: this.endtime,
          publishTime: this.publishDate,
          tags: this.selectedTag
        });
        if (status == 202) {
          await Promise.all([
            this.getListCampaignTask(campaignID),
            this.getListTaskByEditorID(this.$store.getters.getUser.id)
          ]);
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