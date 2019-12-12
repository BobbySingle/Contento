<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="my-3">
      <h1 class="text__h1">Write Content</h1>
    </v-row>
    <v-expansion-panels
      :accordion="true"
      :focusable="true"
      multiple
      v-model="panel"
    >
      <v-row justify="center" class="mx-5" no-gutters>
        <v-col cols="12">
          <v-expansion-panel>
            <v-expansion-panel-header class="text__14"
              >Content Information:</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Title</span
                  >
                  <br />
                  <span class="text__14">{{ title }}</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Campaign</span
                  >
                  <br />
                  <span class="text__14">{{ campaign }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Categorys</span
                  >
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
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >End Date</span
                  >
                  <br />
                  <span class="text__14">{{
                    deadline | moment("HH:mm DD/MM/YYYY")
                  }}</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Publish Date</span
                  >
                  <br />
                  <span class="text__14">{{
                    publishTime | moment("HH:mm DD/MM/YYYY")
                  }}</span>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <v-col cols="12">
          <v-expansion-panel>
            <v-expansion-panel-header class="text__14"
              >Request Details:</v-expansion-panel-header
            >
            <v-expansion-panel-content class="py-2">
              <div class="my-1">
                <div
                  v-html="requestData"
                  class="content ck-content px-2 py-4"
                ></div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <v-row no-gutters>
          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14"
                >Content Details:</v-expansion-panel-header
              >
              <v-expansion-panel-content
                class="expansion-bg"
                v-bind:style="{ width: computedWidth }"
              >
                <v-row>
                  <v-col cols="12">
                    <v-row class=".flex-nowrap">
                      <v-text-field
                        label="Title"
                        outlined
                        prepend-inner-icon="edit"
                        v-model="name"
                        required
                        counter="255"
                        :value="name"
                        class="mr-2"
                        @blur="$v.name.$touch()"
                      ></v-text-field>
                      <v-btn
                        v-on:click="changeWidth()"
                        icon
                        class="mt-3"
                        color="black"
                      >
                        <v-icon>{{ btnChange }}</v-icon>
                      </v-btn>
                    </v-row>
                    <div style="color:red" v-if="!$v.name.required && check">
                      The title of content cannot be empty.
                    </div>
                    <div style="color:red" v-if="!$v.name.maxLength && check">
                      Title up to 255 characters.
                    </div>
                    <div style="color:red" v-if="!$v.content.required && check">
                      The content cannot be empty.
                    </div>
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
                <v-row justify="center" class="flex-nowrap my-2">
                  <v-btn color="secondary" class="mx-1" @click="$router.go(-1)"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="warning"
                    class="mx-1"
                    @click="save()"
                    :loading="loadingSave"
                    >Save</v-btn
                  >
                  <v-btn
                    color="primary"
                    class="mx-1"
                    @click="submit()"
                    :loading="loadingSubmit"
                    >Review</v-btn
                  >
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>
          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14"
                >Editor Comment:</v-expansion-panel-header
              >
              <v-expansion-panel-content class="py-2">
                <div class="my-1">
                  <div
                    v-html="commentData"
                    class="content ck-content px-2 pt-12"
                  ></div>
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
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  components: { CKEditor },
  data() {
    return {
      panel: [0, 2],
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
      computedWidth: "",
      check: false,
      loadingSave: false,
      loadingSubmit: false,
      btnChange: "fullscreen",
      runInterval: ""
    };
  },
  validations: {
    name: { required, maxLength: maxLength(255) },
    content: { required },
    form: ["name", "content"]
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
    if (role !== "Writer" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
    /**Refresh Data */
    this.runInterval = setInterval(async () => {
      if (!this.$v.form.$invalid) {
        console.log("Auto Save");
        await this.autoSaveContent({
          id: this.idContent,
          name: this.name,
          content: this.$refs.ckeditor.editorData
        });
      }
    }, 180000);
  },
  beforeDestroy() {
    clearInterval(this.runInterval);
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    changeWidth() {
      this.computedWidth = this.computedWidth == "" ? "200%" : "";
      this.btnChange =
        this.btnChange == "fullscreen" ? "fullscreen_exit" : "fullscreen";
      this.panel = [2];
    },
    async save() {
      this.check = true;
      this.loadingSave = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.loadingSave = true;
        let status = await this.saveContent({
          id: this.idContent,
          name: this.name,
          content: this.$refs.ckeditor.editorData
        });
        if (status == 200) {
          this.loadingSave = false;
          this.check = false;
        }
      }
      this.loadingSave = false;
    },
    async submit() {
      this.loadingSubmit = true;
      let TaskID = sessionStorage.getItem("TaskID");
      this.check = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let status = await this.submitContent({
          idTask: TaskID,
          idContent: this.idContent,
          name: this.name,
          content: this.$refs.ckeditor.editorData
        });
        this.loadingSubmit = false;
        if (status == 202) {
          this.$router.push("/TaskManagement");
        }
      }
      this.loadingSubmit = false;
    },
    ...mapActions({
      getTaskDetail: "contentprocess/getTaskDetail",
      setApprovalContentRequest: "contentprocess/setApprovalContentRequest",
      saveContent: "contentprocess/saveContent",
      autoSaveContent: "contentprocess/autoSaveContent",
      submitContent: "contentprocess/submitContent",
      spinnerLoading: "spinner/spinnerLoading"
    }),
    async fetchData() {
      let TaskID = sessionStorage.getItem("TaskID");
      const timeOut = t => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("");
          }, t);
        });
      };
      await this.spinnerLoading(true);

      await Promise.all([timeOut(500), this.getTaskDetail(TaskID)]);
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
      console.log(this.commentData);
      if (!this.commentData == "" || !this.commentData == null) {
        this.panel = [0, 2, 3];
      }
      await this.spinnerLoading(false);
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
::v-deep .content table {
  border-collapse: collapse;
}
::v-deep .table table {
  width: 100%;
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
