<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center">
      <h1 class="text__h1">Publish Channel</h1>
    </v-row>
    <v-row no-gutters class="mx-10" justify="center">
      <v-expansion-panels :accordion="true" :focusable="true" multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14">Task Details:</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-col cols="12" class="px-8">
              <v-row>
                <v-col sm="12" md="12">
                  <span style="color:grey; font-weight:300; font-size:12px;">Task Title</span>
                  <br />
                  <span class="text__14">{{title}}</span>
                  <!-- <v-text-field label="Title:" required v-model="title" readonly class="text__14"></v-text-field> -->
                </v-col>
                <v-col sm="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Writer</span>
                  <br />
                  <span class="text__14">{{writer}}</span>
                </v-col>
                <v-col sm="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Editor</span>
                  <br />
                  <span class="text__14">{{editor}}</span>
                </v-col>
                <v-col sm="12" md="12">
                  <span style="color:grey; font-weight:300; font-size:12px;">Content Title</span>
                  <br />
                  <span class="text__14">{{name}}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14">Content Preview:</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="my-8" style="width:100%;">
              <v-col sm="12" md="12">
                <div class="content px-12 py-4" style="max-width:795px;margin: 0 auto;">
                  <span v-html="content"></span>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row>
        <v-col cols="12" class="px-8">
          <v-row>
            <v-col sm="12" md="6">
              <v-row class="out-endtime">
                <v-col sm="1" md="1">
                  <v-icon>mdi-calendar-range</v-icon>
                </v-col>
                <v-col sm="11" md="11">
                  <span style="color:grey; font-weight:300; font-size:12px;">Publish Time</span>
                  <datetime
                    title="Publish Time"
                    type="datetime"
                    placeholder="Select Publish Time"
                    input-class="datetime"
                    input-style="cursor:pointer;"
                    class="endtime text__14"
                    v-model="publishTime"
                  ></datetime>
                </v-col>
              </v-row>
            </v-col>
            <v-col sm="12" md="6" class="pt-7">
              <v-combobox
                v-model="tags"
                :value="tags"
                :items="listTag"
                item-text="name"
                item-value="id"
                chips
                clearable
                label="Category"
                multiple
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip v-bind="attrs" :input-value="selected" color="blue" class="chips">
                    <strong class="text__14">{{ item.name }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn color="primary" class="text__14" @click="publish()">Publish</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
import CKEditor from "../../../components/CKEditor/Ckeditor5.vue";
import { mapGetters, mapActions } from "vuex";

import axios from "axios";
export default {
  components: { CKEditor },
  data() {
    return {
      panel: [0],
      content: "",
      dialog: false,
      menu: false,
      tags: [],
      title: "",
      name: "",
      publishTime: "",
      writer: "",
      editor: ""
    };
  },
  methods: {
    ...mapActions({
      getTaskDetail: "contentprocess/getTaskDetail",
      getListTag: "contentprocess/getListTag",
      publishContent: "batchjob/publishContent"
    }),
    async fetchData() {
      let contentID = JSON.parse(sessionStorage.getItem("ContentID"));
      await this.getTaskDetail(contentID);
      this.title = this.taskDetail.title;
      this.publishTime = this.$moment(
        this.taskDetail.publishTime
      ).toISOString();
      this.writer = this.taskDetail.writer.name;
      this.editor = this.taskDetail.editor.name;
      this.content = this.taskDetail.content.content;
      this.tags = this.taskDetail.tags;
      this.name = this.taskDetail.content.name;
      this.getListTag();
    },
    publish() {
      let contentID = JSON.parse(sessionStorage.getItem("ContentID"));
      this.publishContent({
        id: this.taskDetail.content.id,
        time: this.publishTime
      });
    }
  },
  computed: {
    ...mapGetters(["getUser", "listTag", "taskDetail"])
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Marketer" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
<style scoped>
::v-deep .v-expansion-panels {
  z-index: inherit;
}
.out-endtime {
  display: flex;
  align-items: center;
  height: 100%;
}
.endtime {
  border-bottom: 1px solid #999999;
  height: 32px;
  width: 100%;
}
.chips {
  color: white !important;
}
::v-deep .content {
  width: 100%;
  border: 2px solid grey;
}
::v-deep .content img {
  max-width: 100%;
  max-height: 100%;
}
.datetime {
  width: 100%;
  padding-left: 10px;
}
</style>