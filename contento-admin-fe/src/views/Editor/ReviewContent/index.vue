<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="my-3">
      <h1 class="text__h1">Review Content</h1>
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
                  <span class="text__14">{{deadline | moment("DD/MM/YYYY")}}</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Publish Date</span>
                  <br />
                  <span class="text__14">{{publishTime | moment("DD/MM/YYYY")}}</span>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <v-row no-gutters>
          <v-col cols="12">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Request Details:</v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">
                <div class="my-1">
                  <div v-html="requestDetails" class="content px-2 py-4"></div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Content Details:</v-expansion-panel-header>
              <v-expansion-panel-content
                class="my-2 py-2 expansion-bg"
                v-bind:style="{ width: computedWidth}"
              >
                <v-row class=".flex-nowrap" align="center">
                  <v-text-field v-model="name" :value="name" class="mr-2"></v-text-field>
                  <!-- <v-btn class="d-none d-md-block" v-on:click="changeWidth()">Normal/Wide Screen</v-btn> -->
                </v-row>
                <div class="work">
                  <CKEditor ref="ckeditor" class="content" :content="content" />
                </div>

                <v-row justify="center" class="flex-nowrap">
                  <v-radio-group v-model="radios" row>
                    <v-radio label="Reject" value="false"></v-radio>
                    <v-radio label="Approve" value="true"></v-radio>
                  </v-radio-group>
                </v-row>
                <v-row justify="center" class="flex-nowrap">
                  <v-btn color="warning" class="mx-1" @click="$router.go(-1)">Cancel</v-btn>
                  <v-btn color="primary" class="mx-1" @click="submit()">Submit</v-btn>
                </v-row>
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
      panel: [0, 1, 2],
      radios: "",
      requestDetails: "",
      content: "",
      tags: [],
      title: "",
      campaign: "",
      deadline: "",
      publishTime: "",
      comment: [],
      name: "",
      idContent: "",
      computedWidth: ""
    };
  },
  methods: {
    // changeWidth() {
    //   this.computedWidth = this.computedWidth == "" ? "200%" : "";
    //   this.panel = [1];
    // },
    async submit() {
      let ContentRequestID = sessionStorage.getItem("ContentRequestID");
      if (this.radios === "true") {
        await this.setApprovalContentRequest({
          idTask: ContentRequestID,
          idContent: this.idContent,
          comments: this.$refs.ckeditor.editorData,
          name: this.name,
          button: true
        });
      } else if (this.radios === "false") {
        await this.setApprovalContentRequest({
          idTask: ContentRequestID,
          idContent: this.idContent,
          comments: this.$refs.ckeditor.editorData,
          name: this.name,
          button: false
        });
      } else {
        alert("Choose Reject - Accept");
      }
    },
    ...mapActions({
      getTaskDetail: "contentprocess/getTaskDetail",
      setApprovalContentRequest: "contentprocess/setApprovalContentRequest"
    }),

    async fetchData() {
      let ContentRequestID = sessionStorage.getItem("ContentRequestID");
      await this.getTaskDetail(ContentRequestID);
      this.requestDetails = this.taskDetail.description;
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
      this.comment = this.taskDetail.comment.comment;
    }
  },
  computed: {
    ...mapGetters(["getUser", "taskDetail"])
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Editor" && role != null) {
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