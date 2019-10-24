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
        <v-row no-gutters>
          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Content Details:</v-expansion-panel-header>
              <v-expansion-panel-content class="my-2 py-2">
                <v-text-field v-model="name" :value="name"></v-text-field>
                <div class="work">
                  <CKEditor ref="ckeditor" class="content" :content="content" />
                  <v-row justify="center" class="flex-nowrap my-2">
                    <v-btn color="warning" class="mx-1" @click="$router.go(-1)">Cancel</v-btn>
                    <v-btn color="primary" class="mx-1" @click="submit()">Submit</v-btn>
                  </v-row>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Request Details:</v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">
                <div class="request my-1">
                  <div v-html="requestData" class="content px-2 py-4"></div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Editor Comment:</v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">
                <div class="comment my-1">
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
import moment from 'moment';
export default {
  components: { CKEditor },
  data() {
    return {
      panel: [0, 1, 2],
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
      idContent: ""
    };
  },
  methods: {
    submit() {
      console.log(this.$refs.ckeditor.editorData);
    }
  },
  computed: {
    ...mapGetters(["getUser", "writerContentDetail"])
  },
  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$store.getters.getAccessToken;
    let role = this.getUser.role;
    if (role !== "Writer" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
  },
  mounted() {
    this.requestData = this.writerContentDetail.description;
    this.content = this.writerContentDetail.content.content;
    this.name = this.writerContentDetail.content.name;
    this.idContent = this.writerContentDetail.content.id;
    this.tags = this.writerContentDetail.tags;
    this.title = this.writerContentDetail.title;
    this.campaign = this.writerContentDetail.campaign;
    this.deadline = this.writerContentDetail.deadline;
    this.publishTime = this.writerContentDetail.publishTime;
    this.commentData = this.writerContentDetail.comment;
  }
};
</script>

<style scoped>
.comment {
  min-height: 572px;
  max-height: 572px;
}
.request {
  min-height: 572px;
  max-height: 572px;
}
.work {
  min-height: 620px;
  max-height: 620px;
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