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
                  <span class="text__14">Title task 1</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Campaign</span>
                  <br />
                  <span class="text__14">Campaign 1</span>
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
                  <span class="text__14">20/10/2019</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Publish Date</span>
                  <br />
                  <span class="text__14">31/10/2019</span>
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
export default {
  components: { CKEditor },
  data() {
    return {
      panel: [0, 1, 2],
      radios: "",
      requestData:
        "<p>Thực hiện một bài viết bất kỳ về chủ để bất kỳ</p><br/><p>Ngày hết hạn: bất kỳ</p><br/><b>Yêu cầu:</b><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
      commentData:
        '<h2>1. Coke’s&nbsp;“Share A Coke”&nbsp;Campaign</h2><p><mark class="pen-red">If you&nbsp;haven’t seen or heard of </mark><a href="http://www.coca-colacompany.com/stories/share-a-coke-how-the-groundbreaking-campaign-got-its-start-down-under/"><mark class="pen-red"><u>this campaign</u></mark></a><mark class="pen-red">, then&nbsp;you’ve probably been living under a rock.</mark></p><p>Welcome back to the world.</p><p><mark class="marker-yellow">Coke’s&nbsp;“Share A Coke” campaign gave everyone the&nbsp;opportunity to personalize their favorite drink.</mark></p><p>They took the 150 most popular names in Australia and added them to the side of the bottles. And, well… people went crazy for it.</p><p>Everyone was talking about Coke.</p><figure class="image"><img src="https://firebasestorage.googleapis.com/v0/b/contento-admin.appspot.com/o/images%2Fcontent%2Fcoke-campaignpng.png?alt=media&amp;token=509516b7-18c3-4c20-913e-1400949446a3"></figure><p>Since then, the campaign has spread all around the world.</p><p>Why was it so successful? <a href="https://marketingland.com/4-steps-successful-content-personalization-96854"><u>Personalization</u></a>.</p><p>Coke made you feel special. It was just you and your bottle against the world.</p><p>And this personal touch is&nbsp;the crux of content marketing.</p><p>Coke wasn’t tracking online behavior, (re)targeting customers or looking at vanity metrics.</p><p>Instead, they targeted the most important thing to customers — <strong>their name</strong>. After all, everyone’s favorite subject is themselves. And if you want to get someone to pay attention, using their name is a great place to start.</p><p><a href="https://econsultancy.com/reports/quarterly-digital-intelligence-briefing-personalisation-trust-and-roi"><u>Research</u></a> shows that 74 percent of marketers know personalization increases customer engagement. But, <a href="https://econsultancy.com/blog/63212-three-major-benefits-of-using-personalisation-in-marketing/"><u>only 19 percent of them</u></a> ever use it.</p><p>That’s like <i>knowing </i>you’ve got a clean diaper in your bag but never actually changing the baby.</p><p>Coke&nbsp;revolutionized <strong>emotional connections</strong> by asking people to “share” its product. It’s a viral campaign in a bottle.</p><h3>What You Can Learn:</h3><p>Think of your customers as people with emotions, just like you. How do you want to make them <i>feel?&nbsp;</i>Personalization and emotional connection are key.</p>',
      content:
        '<h2>1. Coke’s&nbsp;“Share A Coke”&nbsp;Campaign</h2><p>If you&nbsp;haven’t seen or heard of <a href="http://www.coca-colacompany.com/stories/share-a-coke-how-the-groundbreaking-campaign-got-its-start-down-under/"><u>this campaign</u></a>, then&nbsp;you’ve probably been living under a rock.</p><p>Welcome back to the world.</p><p>Coke’s&nbsp;“Share A Coke” campaign gave everyone the&nbsp;opportunity to personalize their favorite drink.</p><p>They took the 150 most popular names in Australia and added them to the side of the bottles. And, well… people went crazy for it.</p><p>Everyone was talking about Coke.</p><figure class="image"><img src="https://firebasestorage.googleapis.com/v0/b/contento-admin.appspot.com/o/images%2Fcontent%2Fcoke-campaignpng.png?alt=media&amp;token=509516b7-18c3-4c20-913e-1400949446a3"></figure><p>Since then, the campaign has spread all around the world.</p><p>Why was it so successful? <a href="https://marketingland.com/4-steps-successful-content-personalization-96854"><u>Personalization</u></a>.</p><p>Coke made you feel special. It was just you and your bottle against the world.</p><p>And this personal touch is&nbsp;the crux of content marketing.</p><p>Coke wasn’t tracking online behavior, (re)targeting customers or looking at vanity metrics.</p><p>Instead, they targeted the most important thing to customers — <strong>their name</strong>. After all, everyone’s favorite subject is themselves. And if you want to get someone to pay attention, using their name is a great place to start.</p><p><a href="https://econsultancy.com/reports/quarterly-digital-intelligence-briefing-personalisation-trust-and-roi"><u>Research</u></a> shows that 74 percent of marketers know personalization increases customer engagement. But, <a href="https://econsultancy.com/blog/63212-three-major-benefits-of-using-personalisation-in-marketing/"><u>only 19 percent of them</u></a> ever use it.</p><p>That’s like <i>knowing </i>you’ve got a clean diaper in your bag but never actually changing the baby.</p><p>Coke&nbsp;revolutionized <strong>emotional connections</strong> by asking people to “share” its product. It’s a viral campaign in a bottle.</p><h3>What You Can Learn:</h3><p>Think of your customers as people with emotions, just like you. How do you want to make them <i>feel?&nbsp;</i>Personalization and emotional connection are key.</p>',

      tags: [
        {
          id: 1,
          name: "DU LỊCH"
        },
        {
          id: 2,
          name: "THỂ THAO"
        },
        {
          id: 3,
          name: "ĂN UỐNG"
        }
      ]
    };
  },
  methods: {
    submit() {
      console.log(this.$refs.ckeditor.editorData);
    }
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