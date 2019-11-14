<template>
  <v-container>
    <v-overlay :value="overlay" opacity="1" color="white" absolute>
      <v-progress-circular
        :indeterminate="indeterminate"
        rotate="0"
        size="80"
        width="8"
        color="black"
      >Loading</v-progress-circular>
    </v-overlay>
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
                <v-col cols="12" md="12">
                  <span style="color:grey; font-weight:300; font-size:12px;">Task Title</span>
                  <br />
                  <span class="text__14">{{title}}</span>
                  <!-- <v-text-field label="Title:" required v-model="title" readonly class="text__14"></v-text-field> -->
                </v-col>
                <v-col cols="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Writer</span>
                  <br />
                  <span class="text__14">{{writer}}</span>
                </v-col>
                <v-col cols="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Editor</span>
                  <br />
                  <span class="text__14">{{editor}}</span>
                </v-col>
                <v-col cols="12" md="12">
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
              <v-col cols="12" md="12">
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
            <v-col cols="12" md="6">
              <v-row class="out-endtime">
                <v-col cols="0" md="1" class="d-none d-md-block">
                  <v-icon>mdi-calendar-range</v-icon>
                </v-col>
                <v-col cols="12" md="11">
                  <span style="color:grey; font-weight:300; font-size:12px;">Publish Time</span>
                  <datetime
                    title="Publish Time"
                    type="datetime"
                    placeholder="Select Publish Time"
                    input-class="datetime"
                    input-style="cursor:pointer;"
                    class="endtime text__14"
                    v-model="publishTime"
                    value-zone="UTC+07:00"
                    :min-datetime="localISOTime"
                    required
                    @blur="$v.publishTime.$touch()"
                  ></datetime>
                </v-col>
              </v-row>
              <div
                style="color:red"
                v-if="!$v.publishTime.required && check"
              >Please select publish time.</div>
              <div
                style="color:red"
                v-if="$v.publishTime.$model < localISOTime && check"
              >Please select publish time > time now.</div>
            </v-col>
            <v-col cols="12" md="6" class="pt-7">
              <v-select
                v-model="tags"
                :value="tags"
                :items="listTag"
                item-text="name"
                item-value="id"
                chips
                clearable
                label="Category"
                prepend-inner-icon="category"
                multiple
                required
                @change="changeCategory"
                @blur="$v.tags.$touch()"
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip v-bind="attrs" :input-value="selected" color="blue" class="chips">
                    <strong class="text__14">{{ item.name }}</strong>
                  </v-chip>
                </template>
              </v-select>
              <div style="color:red" v-if="!$v.tags.required && check">Please select category.</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="fanpageFB"
                :items="facebook"
                :value="fanpageFB"
                item-text="name"
                item-value="id"
                chips
                clearable
                label="Facebook Channel"
                prepend-inner-icon="mdi-facebook-box"
                multiple
                attach
              >
                <template v-slot:selection="{ attrs, item,index, select, selected }">
                  <v-chip
                    color="blue"
                    v-if="index === 0"
                    class="chips caption"
                  >+{{ fanpageFB.length }} others selected</v-chip>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="fanpageWP"
                :items="wordpress"
                :value="fanpageWP"
                item-text="name"
                item-value="id"
                chips
                clearable
                label="Wordpress Channel"
                prepend-inner-icon="mdi-wordpress"
                multiple
                attach
              >
                <template v-slot:selection="{ attrs, item,index, select, selected }">
                  <v-chip
                    color="blue"
                    v-if="index === 0"
                    class="chips caption"
                  >+{{ fanpageWP.length }} others selected</v-chip>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="websiteCTT"
                :items="website"
                :value="websiteCTT"
                item-text="name"
                item-value="id"
                chips
                clearable
                label="Contento Website"
                prepend-inner-icon="mdi-web"
                multiple
                @change="changeWebsite"
              >
                <template v-slot:selection="{ attrs, item,index, select, selected }">
                  <v-chip
                    color="blue"
                    v-if="index === 0"
                    class="chips caption"
                  >+{{ websiteCTT.length }} others selected</v-chip>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row no-gutters class=".flex-nowrap" justify="end" v-if="showAds">
            <v-switch v-model="isAds" label="Advertise this content" class="mr-3"></v-switch>
            <div class="mt-2">
              <datetime
                title="Set time to end advertise"
                type="datetime"
                v-model="endAds"
                placeholder="Time end advertise"
                :min-datetime="minAds"
                input-class="css_time"
                class="text__14 out_css_time"
                auto
              ></datetime>
            </div>
          </v-row>
          <v-row justify="end">
            <v-btn
              color="primary"
              class="text__14 ml-3"
              @click="publish()"
              :loading="loading"
            >Publish</v-btn>
          </v-row>
        </v-col>
      </v-row>
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
      overlay: false,
      indeterminate: false,

      panel: [0],
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
      minAds: "",
      websiteCTT: [],
      title: "",
      name: "",
      publishTime: "",
      writer: "",
      editor: "",
      customerID: "",
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
      getFanPagesByTagsID: "batchjob/getFanPagesByTagsID"
    }),
    async fetchData() {
      this.overlay = true;
      this.indeterminate = true;
      let contentID = JSON.parse(sessionStorage.getItem("ContentID"));
      await Promise.all([
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
      console.log(newDateUTC7);
      this.publishTime = newDateUTC7;
      this.writer = this.taskDetail.writer.name;
      this.editor = this.taskDetail.editor.name;
      this.content = this.taskDetail.content.content;
      this.tags = this.taskDetail.tag;
      this.name = this.taskDetail.content.name;
      // await this.getFanPagesByContentID(this.taskDetail.content.id);
      await this.getFanPagesByTagsID(this.tags);

      this.customerID = this.taskDetail.customer;
      this.fanpageFB = this.fanpagesTag.Facebook;
      this.fanpageWP = this.fanpagesTag.Wordpress;
      this.websiteCTT = this.fanpagesTag.Contento;
      if (this.websiteCTT == "") {
        this.showAds = false;
      } else {
        this.showAds = true;
      }
      this.minAds = this.$moment()
        .add(4, "days")
        .startOf("day")
        .toISOString();
      this.endAds = this.$moment()
        .add(5, "days")
        .startOf("day")
        .toISOString();
      this.overlay = false;
      this.indeterminate = false;
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
        await this.publishContent({
          listFanpage: this.fanpages,
          listTag: this.tags,
          contentId: this.taskDetail.content.id,
          time: this.publishTime
        });
        console.log(this.publishTime);
        this.loading = false;
      }
      this.loading = false;
    },
    async changeCategory() {
      await this.getFanPagesByTagsID(this.tags);
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
      this.minAds = this.$moment()
        .add(4, "days")
        .startOf("day")
        .toISOString();
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
.datetime {
  width: 100%;
  padding-left: 10px;
}
</style>