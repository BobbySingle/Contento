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
                  <span style="color:grey; font-weight:300; font-size:12px;">Title</span>
                  <br />
                  <span class="text__14">{{title}}</span>
                  <!-- <v-text-field label="Title:" required v-model="title" readonly class="text__14"></v-text-field> -->
                </v-col>
                <v-col sm="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Writer</span>
                  <br />
                  <span class="text__14">{{writer.name}}</span>
                </v-col>
                <v-col sm="6" md="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Editor</span>
                  <br />
                  <span class="text__14">{{editor.name}}</span>
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
                  <span v-html="contentData"></span>
                </div>
                <!-- <v-btn @click="changeEditorReadOnly"> Button</v-btn> -->
                <!-- <CKEditor ref="ckeditor" :content="contentData" :readOnly="true"/> -->
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
                :items="categorys"
                chips
                clearable
                label="Category"
                multiple
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip v-bind="attrs" :input-value="selected" color="blue" class="chips">
                    <strong class="text__14">{{ item }}</strong>
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
export default {
  components: { CKEditor },
  data() {
    return {
      panel: [0],
      contentData:
        '<h2>1. Coke’s&nbsp;“Share A Coke”&nbsp;Campaign</h2><p>If you&nbsp;haven’t seen or heard of <a href="http://www.coca-colacompany.com/stories/share-a-coke-how-the-groundbreaking-campaign-got-its-start-down-under/"><u>this campaign</u></a>, then&nbsp;you’ve probably been living under a rock.</p><p>Welcome back to the world.</p><p>Coke’s&nbsp;“Share A Coke” campaign gave everyone the&nbsp;opportunity to personalize their favorite drink.</p><p>They took the 150 most popular names in Australia and added them to the side of the bottles. And, well… people went crazy for it.</p><p>Everyone was talking about Coke.</p><figure class="image"><img src="https://firebasestorage.googleapis.com/v0/b/contento-admin.appspot.com/o/images%2Fcontent%2Fcoke-campaignpng.png?alt=media&amp;token=509516b7-18c3-4c20-913e-1400949446a3"></figure><p>Since then, the campaign has spread all around the world.</p><p>Why was it so successful? <a href="https://marketingland.com/4-steps-successful-content-personalization-96854"><u>Personalization</u></a>.</p><p>Coke made you feel special. It was just you and your bottle against the world.</p><p>And this personal touch is&nbsp;the crux of content marketing.</p><p>Coke wasn’t tracking online behavior, (re)targeting customers or looking at vanity metrics.</p><p>Instead, they targeted the most important thing to customers — <strong>their name</strong>. After all, everyone’s favorite subject is themselves. And if you want to get someone to pay attention, using their name is a great place to start.</p><p><a href="https://econsultancy.com/reports/quarterly-digital-intelligence-briefing-personalisation-trust-and-roi"><u>Research</u></a> shows that 74 percent of marketers know personalization increases customer engagement. But, <a href="https://econsultancy.com/blog/63212-three-major-benefits-of-using-personalisation-in-marketing/"><u>only 19 percent of them</u></a> ever use it.</p><p>That’s like <i>knowing </i>you’ve got a clean diaper in your bag but never actually changing the baby.</p><p>Coke&nbsp;revolutionized <strong>emotional connections</strong> by asking people to “share” its product. It’s a viral campaign in a bottle.</p><h3>What You Can Learn:</h3><p>Think of your customers as people with emotions, just like you. How do you want to make them <i>feel?&nbsp;</i>Personalization and emotional connection are key.</p>',
      dialog: false,
      menu: false,
      writers: ["Writer 1", "Writer 2", "Writer 3", "Writer 4"],
      editors: ["Editor 1", "Editor 2", "Editor 3"],
      tags: ["THỂ THAO"],
      categorys: [
        "THỂ THAO",
        "Travel",
        "Food & Drink",
        "2Tek",
        "Social",
        "Business",
        "Film"
      ],
      title: "",
      endDate: "",
      writer: "",
      editor: ""
    };
  },
  methods: {
    // changeEditorReadOnly() {
    //   this.$refs.ckeditor.changeEditorReadOnly();
    // }
  },
  created() {
    let role = localStorage.getItem("role");
    if (role !== "Marketer") {
      this.$router.push("/403");
    }
  },
  mounted() {
    console.log(this.$refs.ckeditor);
    let content = JSON.parse(localStorage.getItem("Content"));
    this.title = content.title;
    this.endDate = this.$moment(content.publishTime).toISOString();
    this.writer = content.writer;
    this.editor = JSON.parse(localStorage.getItem("ContentEditor"));
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
.content {
  width: 100%;
  border: 2px solid grey;
}
.content img{
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