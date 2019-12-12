<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center">
      <h1 class="text__h1">Publish Channel</h1>
    </v-row>
    <v-row no-gutters class="mx-10" justify="center">
      <v-expansion-panels
        :accordion="true"
        :focusable="true"
        multiple
        v-model="panel"
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14"
            >Task Details:</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-col cols="12" class="px-8">
              <v-row>
                <v-col cols="12" md="12">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Task Title</span
                  >
                  <br />
                  <span class="text__14">{{ title }}</span>
                  <!-- <v-text-field label="Title:" required v-model="title" readonly class="text__14"></v-text-field> -->
                </v-col>
                <v-col cols="4" md="4">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Writer</span
                  >
                  <br />
                  <span class="text__14">{{ writer }}</span>
                </v-col>
                <v-col cols="4" md="4">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Editor</span
                  >
                  <br />
                  <span class="text__14">{{ editor }}</span>
                </v-col>
                <v-col cols="4" md="4">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Customer</span
                  >
                  <br />
                  <span class="text__14">{{ customer }}</span>
                </v-col>
                <v-col cols="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Content Title</span
                  >
                  <br />
                  <span class="text__14">{{ name }}</span>
                </v-col>
                <v-col cols="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;"
                    >Publish Time</span
                  >
                  <br />
                  <span class="text__14">{{
                    publishTime | localTime() | moment("HH:mm DD/MM/YYYY")
                  }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14"
            >Content Preview:</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row class="my-8" style="width:100%;">
              <v-col cols="12" md="12">
                <div
                  class="content px-12 py-4"
                  style="max-width:795px;margin: 0 auto;"
                >
                  <span v-html="content" class="ck-content"></span>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script>
import CKEditor from "../../../components/CKEditor/Ckeditor5.vue";
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  components: { CKEditor },
  data() {
    return {
      /**Loading Overlay */
      panel: [0, 1],
      content: "",
      dialog: false,
      menu: false,
      tags: [],
      fanpages: [],
      fanpageFB: [],
      fanpageWP: [],
      // fanpageCS: [],

      isAds: false,
      showAds: false,
      endAds: "",

      websiteCTT: [],
      title: "",
      name: "",
      publishTime: "",
      writer: "",
      editor: "",
      customerID: "",
      customer: "",
      website: [
        {
          id: 1,
          name: "Contento"
        }
      ],
      check: false,

      //Local TimeZone
      localISOTime: "",
      tzoffset: new Date().getTimezoneOffset() * 60000, //offset in milliseconds

      loading: false
    };
  },
  filters: {
    localTime: function(value) {
      if (!value) return "";
      //Local TimeZone
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      var millisecondsTime = Date.parse(value + "Z");
      var newDateUTC7 = new Date(millisecondsTime - tzoffset)
        .toISOString()
        .slice(0, -1);
      return newDateUTC7;
    }
  },
  validations: {
    publishTime: { required },
    tags: { required },
    form: ["tags", "publishTime"]
  },
  methods: {
    ...mapActions({
      getTaskDetail: "contentprocess/getTaskDetail",
      getListTag: "contentprocess/getListTag",
      publishContent: "batchjob/publishContent",
      getFanPageFacebook: "batchjob/getFanPageFacebook",
      getFanPageWordpress: "batchjob/getFanPageWordpress",
      // getFanPagesByContentID: "batchjob/getFanPagesByContentID",
      getFanPagesByTagsID: "batchjob/getFanPagesByTagsID",
      spinnerLoading: "spinner/spinnerLoading"
    }),
    async fetchData() {
      this.overlay = true;
      this.indeterminate = true;
      let contentID = JSON.parse(sessionStorage.getItem("ContentID"));
      const timeOut = t => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("");
          }, t);
        });
      };
      await this.spinnerLoading(true);

      await Promise.all([
        timeOut(500),
        this.getListTag(),
        this.getFanPageFacebook(this.getUser.id),
        this.getFanPageWordpress(this.getUser.id),
        this.getTaskDetail(contentID)
      ]);
      this.title = this.taskDetail.title;
      // Convert Time to LocalTime
      var millisecondsTime = Date.parse(this.taskDetail.publishTime + "Z");
      var newDateUTC7 = new Date(millisecondsTime - this.tzoffset)
        .toISOString()
        .slice(0, -1);
      this.publishTime = newDateUTC7;
      this.writer = this.taskDetail.writer.name;
      this.editor = this.taskDetail.editor.name;
      this.content = this.taskDetail.content.content;
      this.tags = this.taskDetail.tag;
      this.name = this.taskDetail.content.name;
      this.customer = this.taskDetail.customer.name;
      // await this.getFanPagesByContentID(this.taskDetail.content.id);
      await this.getFanPagesByTagsID({
        lstTags: this.tags,
        idCustomer: this.taskDetail.customer.id
      });

      this.customerID = this.taskDetail.customer;
      this.fanpageFB = this.fanpagesTag.Facebook;
      this.fanpageWP = this.fanpagesTag.Wordpress;
      this.websiteCTT = this.fanpagesTag.Contento;
      if (this.websiteCTT == "") {
        this.showAds = false;
      } else {
        this.showAds = true;
      }
      this.endAds = this.$moment(this.publishTime)
        .add(5, "days")
        .startOf("day")
        .toISOString();
      await this.spinnerLoading(false);
    },
    async publish() {
      this.loading = true;
      this.check = true;
      this.fanpages = [];
      this.fanpages = this.fanpages.concat(
        this.fanpageFB,
        this.fanpageWP,
        // this.fanpageCS,
        this.websiteCTT
      );
      this.$v.form.$touch();
      if (this.fanpages == "") {
        Swal.fire({
          title: "Please select at least one channel to post.",
          type: "warning",
          timer: 3000
        });
      }
      if (
        !this.$v.form.$invalid &&
        this.fanpages != "" &&
        this.$v.publishTime.$model >= this.localISOTime
      ) {
        if (this.isAds) {
          await this.publishContent({
            listFanpage: this.fanpages,
            listTag: this.tags,
            contentId: this.taskDetail.content.id,
            time: this.publishTime,
            adsTime: this.endAds,
            isAds: true
          });
        } else {
          await this.publishContent({
            listFanpage: this.fanpages,
            listTag: this.tags,
            contentId: this.taskDetail.content.id,
            time: this.publishTime
          });
        }
        console.log(this.publishTime);
        this.loading = false;
      }
      this.loading = false;
    },
    async changeCategory() {
      await this.getFanPagesByTagsID({
        lstTags: this.tags,
        idCustomer: this.taskDetail.customer.id
      });
      this.fanpageFB = this.fanpagesTag.Facebook;
      this.fanpageWP = this.fanpagesTag.Wordpress;
      this.websiteCTT = this.fanpagesTag.Contento;
    },
    changeWebsite() {
      if (this.websiteCTT == "") {
        this.showAds = false;
      } else {
        this.showAds = true;
      }
    }
  },
  computed: {
    ...mapGetters([
      "getUser",
      "listTag",
      "taskDetail",
      "facebook",
      "wordpress",
      "fanpagesContent",
      "fanpagesTag"
    ])
  },
  watch: {
    publishTime() {
      this.endAds = this.$moment(this.publishTime)
        .add(5, "days")
        .startOf("day")
        .toISOString();
    }
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
    this.check = false;
    // timezone +7
    this.localISOTime = new Date(Date.now() - this.tzoffset)
      .toISOString()
      .slice(0, -1);
    this.fetchData();
  }
};
</script>
<style scoped>
::v-deep .css_time {
  cursor: pointer;
  padding-left: 10px;
  padding-top: 10px;
  width: 100%;
}
.out_css_time {
  background: url(../../../assets/calendar.png) no-repeat scroll 7px 7px;
  max-width: 400px;
  min-width: 300px;
  padding-left: 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #737373;
  overflow: hidden;
}

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
/* 
::v-deep .content table th {
  border: 1px solid grey;
}
::v-deep .content table td {
  padding-left: 10px;
  border: 1px solid grey;
} */
.datetime {
  width: 100%;
  padding-left: 10px;
}

::v-deep p {
  text-align: justify;
}
/* ::v-deep .table {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
::v-deep .image {
  display: flex;
  flex-direction: column;
  align-items: center;
}
::v-deep .image img {
  max-width: 100%;
  max-height: 100%;
}
::v-deep .table td {
  font-size: 14px;
  text-align: center;
  font-style: italic;
  font-weight: bold;
} */
</style>
