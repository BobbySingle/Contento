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
                  <span class="text__14">{{ title }}</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Campaign</span>
                  <br />
                  <span class="text__14">{{ campaign }}</span>
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
                  <span class="text__14">
                    {{
                    deadline|localTime() | moment("hh:mm DD/MM/YYYY")
                    }}
                  </span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Publish Date</span>
                  <br />
                  <span class="text__14">
                    {{
                    publishTime |localTime() | moment("hh:mm DD/MM/YYYY")
                    }}
                  </span>
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
                  <div v-html="requestDetails" class="content ck-content px-2 py-4"></div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
          <v-col cols="12">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Content Details:</v-expansion-panel-header>
              <v-expansion-panel-content
                class="my-2 py-2 expansion-bg"
                v-bind:style="{ width: computedWidth }"
              >
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Title"
                      outlined
                      prepend-inner-icon="edit"
                      :value="name"
                      readonly
                      required
                      @blur="$v.name.$touch()"
                    ></v-text-field>
                    <div
                      style="color:red"
                      v-if="!$v.name.required && check"
                    >The title of content cannot be empty.</div>
                    <div
                      style="color:red"
                      v-if="!$v.name.maxLength && check"
                    >Title up to 255 characters.</div>
                    <div
                      style="color:red"
                      v-if="!$v.content.required && check"
                    >The content cannot be empty.</div>
                  </v-col>
                  <v-col cols="12">
                    <CKEditor
                      ref="ckeditor"
                      class="content"
                      :content="content"
                      required
                      @ckeditorContent="content = $event"
                    />
                  </v-col>
                </v-row>
                <v-row justify="end">
                  <span class="mr-3">Words: {{ countWord }}</span>
                </v-row>
                <v-row justify="center" class="flex-nowrap mt-3">
                  <v-btn color="warning" class="mx-1" @click="$router.go(-1)">Cancel</v-btn>
                  <v-btn
                    color="primary"
                    class="mx-1"
                    @click="rewrite()"
                    :loading="loadingRewrite"
                  >Rewrite</v-btn>
                  <v-btn
                    color="success"
                    class="mx-1"
                    @click="submit()"
                    :loading="loadingSubmit"
                  >Complete</v-btn>
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
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  components: { CKEditor },
  data() {
    return {
      panel: [0, 2],
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
      computedWidth: "",
      check: false,
      loadingRewrite: false,
      loadingSubmit: false,
    };
  },
  validations: {
    name: { required, maxLength: maxLength(255) },
    content: { required },
    form: ["name", "content"]
  },
  filters: {
    localTime: function(value) {
      if (!value) {
        return "";
      }
      //Local TimeZone
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      var millisecondsTime = Date.parse(value + "Z");
      var newDateUTC7 = new Date(millisecondsTime - tzoffset)
        .toISOString()
        .slice(0, -1);
      return newDateUTC7;
    }
  },
  methods: {
    // changeWidth() {
    //   this.computedWidth = this.computedWidth == "" ? "200%" : "";
    //   this.panel = [1];
    // },
    async submit() {
      this.check = true;
      this.loadingSubmit = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let ApproveRequestID = sessionStorage.getItem("ApproveRequestID");
        await this.setApprovalContentRequest({
          idTask: ApproveRequestID,
          idContent: this.idContent,
          comments: this.$refs.ckeditor.editorData,
          name: this.name,
          button: true
        });
        this.check = false;
      }
      setTimeout(3000);
      this.loadingSubmit = false;
    },
    async rewrite() {
      this.check = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let ApproveRequestID = sessionStorage.getItem("ApproveRequestID");
        await this.setApprovalContentRequest({
          idTask: ApproveRequestID,
          idContent: this.idContent,
          comments: this.$refs.ckeditor.editorData,
          name: this.name,
          button: false
        });
        this.check = false;
      }
    },
    ...mapActions({
      getTaskDetail: "contentprocess/getTaskDetail",
      setApprovalContentRequest: "contentprocess/setApprovalContentRequest",
      spinnerLoading: "spinner/spinnerLoading"
    }),

    async fetchData() {
      let ApproveRequestID = sessionStorage.getItem("ApproveRequestID");
      const timeOut = t => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("");
          }, t);
        });
      };
      await this.spinnerLoading(true);

      await Promise.all([timeOut(500), this.getTaskDetail(ApproveRequestID)]);
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
      await this.spinnerLoading(false);
    }
  },
  computed: {
    ...mapGetters(["getUser", "taskDetail"]),
        countWord() {
      if (this.content) {
        var cont = this.content;
        console.log(this.content);
        cont = cont.replace(/<[^>]*>/g, " "); //remove tag html
        // cont = cont.replace(/(^\s*)|(\s*$)/g, ""); //exclude  start and end white-space
        cont = cont.replace(/&nbsp;/g, ""); // remove &nbsp
        cont = cont.replace(/[!@#$%^&*(),.?":{}|<>\`\~\/\\]+/g, ""); //remove special charactor
        cont = cont.replace(/[ ]{2,}/g, " "); //2 or more space to 1
        cont = cont.trim();
        console.log(cont);
        var words = cont.split(" ").length;
        return words;
      }
      return 0;
    }
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
::v-deep .content table {
  border-collapse: collapse;
}
::v-deep .table table {
  width: 100%;
}
::v-deep .image {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
}
::v-deep .image img {
  max-width: 100%;
  max-height: 100%;
}

::v-deep .content table th {
  border: 1px solid grey;
}
::v-deep .content table td {
  padding-left: 10px;
  border: 1px solid grey;
}
</style>
