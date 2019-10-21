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
                  <span v-html="content.content"></span>
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
                    title="End Time"
                    type="datetime"
                    class="endtime text__14"
                    v-model="endDate"
                  ></datetime>
                </v-col>
              </v-row>
            </v-col>
            <v-col sm="12" md="6" class="pt-7">
              <v-combobox
                v-model="tags"
                :value="tags"
                :items="categorys"
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
            <v-btn color="primary" class="text__14">Publish</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
import CKEditor from "../../../components/CKEditor/Ckeditor5.vue";
import { mapGetters } from "vuex";

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
      endDate: "",
      writer: "",
      editor: "",
      categorys: []
    };
  },
  methods: {
    // changeEditorReadOnly() {
    //   this.$refs.ckeditor.changeEditorReadOnly();
    // }
  },

  computed: {
    ...mapGetters(["getUser"])
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Marketer") {
      this.$router.push("/403");
    }
  },
  mounted() {
    let contentId = JSON.parse(localStorage.getItem("ContentID"));
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$store.getters.getAccessToken;

    axios
      .get(`http://34.87.31.23:5002/api/contentprocess/tags`)
      .then(rs => {
        this.categorys = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    axios
      .get(
        `http://34.87.31.23:5002/api/contentprocess/task-detail/campaign/${contentId}`
      )
      .then(rs => {
        console.log(rs.data);
        this.title = rs.data.title;
        this.endDate = this.$moment(rs.data.publishTime).toISOString();
        this.writer = rs.data.writer.name;
        this.editor = rs.data.editor.name;
        this.content = rs.data.content;
        this.tags = rs.data.tags;
        this.name = rs.data.name;
      })
      .catch(er => {
        console.log(er);
      });
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
/* ::v-deep .content img {
  position: relative;
  overflow: hidden;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  max-width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
} */
</style>