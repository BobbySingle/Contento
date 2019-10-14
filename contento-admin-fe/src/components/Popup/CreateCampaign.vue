<template>
  <v-dialog v-model="dialog" persistent width="1000px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" class="text__14">Create Campaign</v-btn>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="text__h1">Add New Campaign</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10">
        <v-col md="12">
          <v-row>
            <v-col md="6">
              <v-text-field v-model="title" :counter="255" label="Title:" required class="text__14"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="5">
              <v-row class="out-endtime">
                <v-col md="1">
                  <v-icon>mdi-calendar-range</v-icon>
                </v-col>

                <v-col md="11">
                  <datetime
                    title="End Time"
                    type="datetime"
                    v-model="endtime"
                    class="endtime text__14"
                  ></datetime>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-row no-gutters>
                <v-col md="10">
                  <v-select
                    v-model="customer"
                    :items="customers"
                    item-text="name"
                    item-value="id"
                    label="Customer"
                  ></v-select>
                </v-col>
                <v-col md="2" class="pl-5" style="width:100%;" align-self="center">
                  <!-- <v-btn fab color="primary" small>
                    <v-icon color="white">add</v-icon>
                  </v-btn>-->

                  <!-- /**Popup CreateCustomer */ -->
                  <popup-create-customer :isSmallBtn="true"></popup-create-customer>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="5">
              <v-select
                v-model="editor"
                :items="editors"
                item-text="name"
                item-value="id"
                label="Editor"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-combobox
                v-model="tags"
                item-text="name"
                item-value="id"
                :items="categorys"
                chips
                clearable
                label="Category"
                multiple
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    @click="select"
                    color="blue"
                    class="chips"
                  >
                    <strong class="text__14">{{ item.name }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <CKEditor ref="ckeditor" :content="content" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false" class="text__14">Cancel</v-btn>
        <v-btn type="submit" color="success" @click="create()" class="text__14">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CKEditor from "../CKEditor/Ckeditor5";
import PopupCreateCustomer from "./CreateCustomer.vue";
export default {
  components: {
    CKEditor,
    PopupCreateCustomer
  },
  data() {
    return {
      dialog: false,
      menu: false,
      customers: [],
      editors: [],
      tags: [],
      categorys: [],
      endtime: "",
      content: "",
      customer: [],
      editor: [],
      title: ""
    };
  },
  methods: {
    create() {
      this.$axios({
        method: "post",
        url: "campaignservice/api/campaign/campaign",
        data: {
          title: this.title,
          description: this.$refs.ckeditor.editorData,
          endDate: this.endtime,
          tags: this.tags,
          editor: { id: this.editor },
          customer: { id: this.customer }
        }
      })
        .then(rs => {
          console.log(rs);
          this.$emit("createCampaign");
        })
        .catch(er => {
          alert("Create failed!");
          console.log(er);
        });
      this.dialog = false;
    }
  },
  mounted() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.endtime = tomorrow.toISOString();
    /**Begin Get list customer */
    this.$axios({
      method: "get",
      url: "authenticationservice/api/authentication/list-customer/0"
    })
      .then(rs => {
        this.customers = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Get list customer */
    /**Begin Get list editor */
    this.$axios({
      method: "get",
      url: "authenticationservice/api/authentication/list-editor/0"
    })
      .then(rs => {
        this.editors = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Get list editor */
    /**Begin Get list editor */
    this.$axios({
      method: "get",
      url: "contentproccessservice/api/contentprocess/tags"
    })
      .then(rs => {
        this.categorys = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Get list editor */
    this.content =
      '<h2>1. Coke’s&nbsp;“Share A Coke”&nbsp;Campaign</h2><p>If you&nbsp;haven’t seen or heard of <a href="http://www.coca-colacompany.com/stories/share-a-coke-how-the-groundbreaking-campaign-got-its-start-down-under/"><u>this campaign</u></a>, then&nbsp;you’ve probably been living under a rock.</p><p>Welcome back to the world.</p><p>Coke’s&nbsp;“Share A Coke” campaign gave everyone the&nbsp;opportunity to personalize their favorite drink.</p><p>They took the 150 most popular names in Australia and added them to the side of the bottles. And, well… people went crazy for it.</p><p>Everyone was talking about Coke.</p><figure class="image"><img src="https://firebasestorage.googleapis.com/v0/b/contento-admin.appspot.com/o/images%2Fcontent%2Fcoke-campaignpng.png?alt=media&amp;token=509516b7-18c3-4c20-913e-1400949446a3"></figure><p>Since then, the campaign has spread all around the world.</p><p>Why was it so successful? <a href="https://marketingland.com/4-steps-successful-content-personalization-96854"><u>Personalization</u></a>.</p><p>Coke made you feel special. It was just you and your bottle against the world.</p><p>And this personal touch is&nbsp;the crux of content marketing.</p><p>Coke wasn’t tracking online behavior, (re)targeting customers or looking at vanity metrics.</p><p>Instead, they targeted the most important thing to customers — <strong>their name</strong>. After all, everyone’s favorite subject is themselves. And if you want to get someone to pay attention, using their name is a great place to start.</p><p><a href="https://econsultancy.com/reports/quarterly-digital-intelligence-briefing-personalisation-trust-and-roi"><u>Research</u></a> shows that 74 percent of marketers know personalization increases customer engagement. But, <a href="https://econsultancy.com/blog/63212-three-major-benefits-of-using-personalisation-in-marketing/"><u>only 19 percent of them</u></a> ever use it.</p><p>That’s like <i>knowing </i>you’ve got a clean diaper in your bag but never actually changing the baby.</p><p>Coke&nbsp;revolutionized <strong>emotional connections</strong> by asking people to “share” its product. It’s a viral campaign in a bottle.</p><h3>What You Can Learn:</h3><p>Think of your customers as people with emotions, just like you. How do you want to make them <i>feel?&nbsp;</i>Personalization and emotional connection are key.</p>';
  }
  // watch: {
  //   endtime() {
  //     console.log(this.endtime);
  //   }
  // }
};
</script>
<style scoped>
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
</style>