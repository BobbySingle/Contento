<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="my-3">
      <h1 class="text__h1">Write Content</h1>
    </v-row>
    <v-expansion-panels :accordion="true" :focusable="true" multiple v-model="panel">
      <v-row justify="center" class="mx-5" no-gutters>
        <v-col cols="12">
          <v-expansion-panel>
            <v-expansion-panel-header class="text__14">Content Information:</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Title</span>
                  <br />
                  <span class="text__14">{{title}}</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Campaign</span>
                  <br />
                  <span class="text__14">{{campaign}}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <span style="color:grey; font-weight:300; font-size:12px;">Categorys</span>
                  <br />
                  <v-chip
                    v-for="item in tags"
                    :key="item.id"
                    color="blue"
                    style="color:white;"
                    class="ma-1"
                  >
                    <strong class="text__14">{{ item.name }}</strong>
                  </v-chip>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">End Date</span>
                  <br />
                  <span class="text__14">{{deadline | moment("HH:mm DD/MM/YYYY")}}</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Publish Date</span>
                  <br />
                  <span class="text__14">{{publishTime | moment("HH:mm DD/MM/YYYY")}}</span>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12">
          <v-expansion-panel>
            <v-expansion-panel-header class="text__14">Request Details:</v-expansion-panel-header>
            <v-expansion-panel-content class="py-2">
              <div class="my-1">
                <div v-html="requestData" class="content px-2 py-4"></div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <v-row no-gutters>
          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Content Details:</v-expansion-panel-header>
              <v-expansion-panel-content
                class="expansion-bg"
                v-bind:style="{ width: computedWidth}"
              >
                <v-row class=".flex-nowrap" align="center">
                  <v-text-field v-model="name" :value="name" class="mr-2"></v-text-field>
                  <v-btn v-on:click="changeWidth()">Normal/Wide Screen</v-btn>
                </v-row>
                <div>
                  <CKEditor ref="ckeditor" class="content" :content="content" />
                  <v-row justify="center" class="flex-nowrap my-2">
                    <v-btn color="secondary" class="mx-1" @click="$router.go(-1)">Cancel</v-btn>
                    <v-btn color="warning" class="mx-1" @click="save()">Save</v-btn>
                    <v-btn color="primary" class="mx-1" @click="submit()">Submit</v-btn>
                  </v-row>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Editor Comment:</v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">
                <div class="my-1">
                  <div v-html="commentData" class="content px-2 pt-12"></div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
        </v-row>
      </v-row>
    </v-expansion-panels>
  </v-container>
</template>


<script>
import CKEditor from "../../../components/CKEditor/Ckeditor5.vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  components: { CKEditor },
  data() {
    return {
      panel: [0, 2, 3],
      radios: "",
      requestData: "",
      commentData: "",
      content: "",
      tags: [],
      title: "",
      campaign: "",
      deadline: "",
      publishTime: "",
      name: "",
      idContent: "",
      computedWidth: ""
    };
  },
  computed: {
    ...mapGetters(["getUser", "taskDetail"])
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Writer" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    changeWidth() {
      this.computedWidth = this.computedWidth == "" ? "200%" : "";
      this.panel = [1];
    },
    save() {
      this.saveContent({
        id: this.idContent,
        name: this.name,
        content: this.$refs.ckeditor.editorData
      });
    },
    async submit() {
      let TaskID = sessionStorage.getItem("TaskID");
      await this.submitContent({
        idTask: TaskID,
        idContent: this.idContent,
        name: this.name,
        content: this.$refs.ckeditor.editorData
      });
      this.$router.push("/TaskManagement");
    },
    ...mapActions({
      getTaskDetail: "contentprocess/getTaskDetail",
      setApprovalContentRequest: "contentprocess/setApprovalContentRequest",
      saveContent: "contentprocess/saveContent",
      submitContent: "contentprocess/submitContent"
    }),
    async fetchData() {
      let TaskID = sessionStorage.getItem("TaskID");
      await this.getTaskDetail(TaskID);
      this.requestData = this.taskDetail.description;
      this.content =
        this.taskDetail.content.content == null
          ? ""
          : this.taskDetail.content.content;
      this.name = this.taskDetail.content.name;
      this.idContent = this.taskDetail.content.id;
      this.tags = this.taskDetail.tags;
      this.title = this.taskDetail.title;
      this.campaign = this.taskDetail.campaign;
      this.deadline = this.taskDetail.deadline;
      this.publishTime = this.taskDetail.publishTime;
      this.commentData = this.taskDetail.comment.comment;
    }
  }
};
</script>

<style scoped>
.expansion-bg {
  background-color: white;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.75);
}
::v-deep .content {
  max-height: 500px;
  overflow-y: auto;
}
::v-deep .content img {
  max-width: 100%;
  max-height: 100%;
}
</style>