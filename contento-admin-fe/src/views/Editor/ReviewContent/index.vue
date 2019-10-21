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
          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Content Details:</v-expansion-panel-header>
              <v-expansion-panel-content class="my-2 py-2">
                <div class="work">
                  <CKEditor ref="ckeditor" class="content" :content="content.content" />
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Request Details:</v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">
                <div class="work my-1">
                  <div v-html="requestDetails" class="content px-2 py-4"></div>

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
import axios from "axios";
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
      comment: []
    };
  },
  methods: {
    submit() {
       let ContentRequestID = localStorage.getItem("ContentRequestID");
       alert(this.radios);
      if (this.radios === 'true') {
        axios
          .post(`http://34.87.31.23:5002/api/contentprocess/approvals`,{
            idTask: ContentRequestID,
            button: true,
          })
          .then(rs =>{
            this.$router.push("/ContentRequest");
          })
          .catch(er =>{
            console.log(er);
          });
      } else if (this.radios === 'false') {
      } else {
        alert("Choose Reject - Accept");
      }
    }
  },
  mounted() {
    let ContentRequestID = localStorage.getItem("ContentRequestID");
    axios
      .get(
        `http://34.87.31.23:5002/api/contentprocess/task-detail/campaign/${ContentRequestID}`
      )
      .then(rs => {
        this.requestDetails = rs.data.description;
        this.content = rs.data.content;
        this.tags = rs.data.tags;
        this.title = rs.data.title;
        this.campaign = rs.data.campaign;
        this.deadline = rs.data.deadline;
        this.publishTime = rs.data.publishTime;
        this.comment = rs.data.comment;
      })
      .catch(er => {
        console.log("ERROR - Review Content");
        console.log(er);
      });
  }
};
</script>

<style scoped>
.work {
  min-height: 600px;
  max-height: 600px;
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