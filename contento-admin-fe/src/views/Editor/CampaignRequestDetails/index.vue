<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row justify="center" class="my-3">
      <h1 class="text__h1">Work Assignment</h1>
    </v-row>
    <v-expansion-panels :accordion="true" :focusable="true" multiple v-model="panel">
      <v-row justify="center" class="mx-5" no-gutters>
        <v-col cols="12">
          <v-expansion-panel>
            <v-expansion-panel-header class="text__14">Campaign Information:</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Title</span>
                  <br />
                  <span class="text__14">Campaign 4</span>
                </v-col>
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">Customer</span>
                  <br />
                  <span class="text__14">Customer 1</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
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
                <v-col cols="6">
                  <span style="color:grey; font-weight:300; font-size:12px;">End Date</span>
                  <br />
                  <span class="text__14">20/10/2019</span>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <v-row no-gutters>
          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Campaign Request:</v-expansion-panel-header>
              <v-expansion-panel-content class="my-2 py-2">
                <div v-html="contentData" class="content px-2 py-4"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-col>

          <v-col cols="6">
            <v-expansion-panel>
              <v-expansion-panel-header class="text__14">Work Assignment:</v-expansion-panel-header>
              <v-expansion-panel-content class="py-2">
                <div class="work">
                  <v-row class="my-2" justify="center">
                    <create-task />
                  </v-row>
                  <v-data-table
                    :headers="headers"
                    :items="listTasks"
                    :search="search"
                    style="width:100%"
                    :mobile-breakpoint="600"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    hide-default-footer
                    @page-count="pageCount = $event"
                  >
                    <template v-slot:item.action="{ item }">
                      <v-row class="flex-nowrap">
                        <edit-task />
                        <v-btn text icon color="error">
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </v-row>
                    </template>
                  </v-data-table>
                  <v-row justify="center">
                    <div class="text-center pt-2">
                      <v-pagination v-model="page" :length="pageCount"></v-pagination>
                    </div>
                  </v-row>
                  <v-row justify="end">
                    <v-btn color="primary" class="mr-4">Submit</v-btn>
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
import CreateTask from "../../../components/Popup/CreateTask.vue";
import EditTask from "../../../components/Popup/EditTask.vue";
export default {
  components: { CreateTask, EditTask },
  data() {
    return {
      panel: [0, 1, 2],
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      /**End Pagination */
      dialog: false,
      menu: false,
      search: "",
      loading: true,
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
      ],
      contentData:
        '<h2>1. Coke’s&nbsp;“Share A Coke”&nbsp;Campaign</h2><p>If you&nbsp;haven’t seen or heard of <a href="http://www.coca-colacompany.com/stories/share-a-coke-how-the-groundbreaking-campaign-got-its-start-down-under/"><u>this campaign</u></a>, then&nbsp;you’ve probably been living under a rock.</p><p>Welcome back to the world.</p><p>Coke’s&nbsp;“Share A Coke” campaign gave everyone the&nbsp;opportunity to personalize their favorite drink.</p><p>They took the 150 most popular names in Australia and added them to the side of the bottles. And, well… people went crazy for it.</p><p>Everyone was talking about Coke.</p><figure class="image"><img src="https://firebasestorage.googleapis.com/v0/b/contento-admin.appspot.com/o/images%2Fcontent%2Fcoke-campaignpng.png?alt=media&amp;token=509516b7-18c3-4c20-913e-1400949446a3"></figure><p>Since then, the campaign has spread all around the world.</p><p>Why was it so successful? <a href="https://marketingland.com/4-steps-successful-content-personalization-96854"><u>Personalization</u></a>.</p><p>Coke made you feel special. It was just you and your bottle against the world.</p><p>And this personal touch is&nbsp;the crux of content marketing.</p><p>Coke wasn’t tracking online behavior, (re)targeting customers or looking at vanity metrics.</p><p>Instead, they targeted the most important thing to customers — <strong>their name</strong>. After all, everyone’s favorite subject is themselves. And if you want to get someone to pay attention, using their name is a great place to start.</p><p><a href="https://econsultancy.com/reports/quarterly-digital-intelligence-briefing-personalisation-trust-and-roi"><u>Research</u></a> shows that 74 percent of marketers know personalization increases customer engagement. But, <a href="https://econsultancy.com/blog/63212-three-major-benefits-of-using-personalisation-in-marketing/"><u>only 19 percent of them</u></a> ever use it.</p><p>That’s like <i>knowing </i>you’ve got a clean diaper in your bag but never actually changing the baby.</p><p>Coke&nbsp;revolutionized <strong>emotional connections</strong> by asking people to “share” its product. It’s a viral campaign in a bottle.</p><h3>What You Can Learn:</h3><p>Think of your customers as people with emotions, just like you. How do you want to make them <i>feel?&nbsp;</i>Personalization and emotional connection are key.</p>',
      headers: [
        { text: "Title", value: "title", sortable: false, width: "40%" },
        { text: "Writer", value: "writer", sortable: false, width: "20%" },
        { text: "End", value: "deadline", sortable: false, width: "20%" },
        { text: "Action", value: "action", align: "center", width: "10%" }
      ],
      listTasks: [
        {
          id: 1,
          title: "Title Task 1",
          writer: "Writer 1",
          deadline: "10/20/2019"
        },
        {
          id: 2,
          title: "Title Task 2",
          writer: "Writer 3",
          deadline: "10/20/2019"
        },
        {
          id: 3,
          title: "Title Task 2",
          writer: "Writer 1",
          deadline: "10/20/2019"
        },
        {
          id: 4,
          title: "Title Task 4",
          writer: "Writer 1",
          deadline: "10/20/2019"
        },
        {
          id: 5,
          title: "Title Task 2",
          writer: "Writer 1",
          deadline: "10/20/2019"
        },
        {
          id: 6,
          title: "Title Task 6",
          writer: "Writer 2",
          deadline: "10/20/2019"
        },
        {
          id: 7,
          title: "Title Task 7",
          writer: "Writer 1",
          deadline: "10/20/2019"
        },
        {
          id: 8,
          title: "Title Task 8",
          writer: "Writer 3",
          deadline: "10/20/2019"
        }
      ]
    };
  }
};
</script>

<style scoped>
.work {
  min-height: 500px;
  max-height: 500px;
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