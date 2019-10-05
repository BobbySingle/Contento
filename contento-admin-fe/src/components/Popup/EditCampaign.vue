<template>
  <v-dialog v-model="dialog" persistent width="1000px">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" large v-on="on">Create Campaign</v-btn> -->
      <v-btn color="warning" fab small v-on="on">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="heading">Edit Campaign</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10">
        <v-col md="12">
          <v-row>
            <v-col md="6">
              <v-text-field :counter="255" label="Title:" required v-model="title" :value="campaign.titleCampaign"></v-text-field>
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
                    :value="campaign.deadline"
                    class="endtime"
                  ></datetime>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-row no-gutters>
                <v-col md="10">
                  <v-select :items="customers" label="Customer" v-model="customer" :value="campaign.customer"></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="5">
              <v-select :items="editors" label="Editor" v-model="editor" :value="'Editor 2'"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-combobox
                v-model="chipsEditor"
                :value="campaign.topicCampaign"
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
                    close
                    color="blue"
                    class="chips"
                  >
                    <strong>{{ item }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <CKEditor ref="ckeditor" :content="content" v-model="ckeditor" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false">Cancel</v-btn>
        <v-btn color="success" @click="dialog = false, update()">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CKEditor from "../CKEditor/Ckeditor5";
import PopupCreateCustomer from "./CreateCustomer.vue";
export default {
  props: ["campaign"],
  components: {
    CKEditor,
    PopupCreateCustomer
  },
  data() {
    return {
      dialog: false,
      menu: false,
      customers: ["Customer 1", "Customer 2", "Customer 3", "Customer 4"],
      editors: ["Editor 1", "Editor 2", "Editor 3"],
      chipsEditor: [],
      categorys: [
        "Sport",
        "Travel",
        "Food & Drink",
        "2Tek",
        "Social",
        "Business",
        "Film"
      ],
      endtime: "",
      content: "",
      title: "",
      customer: "",
      editor: "",
      ckeditor: ""
    };
  },
  methods: {
    // remove(item) {
    //   this.chipsEditor.splice(this.chipsEditor.indexOf(item), 1);
    //   this.chipsEditor = [...this.chipsEditor];
    // },
    update() {
      console.log(this.$refs.ckeditor.editorData);
      console.log(this.title);
      console.log(this.customer);
      console.log(this.editor);
      console.log(this.chipsEditor);
      console.log(this.endtime);
    }

  },
  mounted() {
    this.content =
      '<p>Ghi cai nay vao content ok gi roi lam gi tiep gio</p><figure class="image"><img src="https://firebasestorage.googleapis.com/v0/b/contento-admin.appspot.com/o/images%2Fcontent%2Fa.png?alt=media&amp;token=2860ba48-8ee3-41ab-8c5e-96b935d65d51"></figure>"';
    this.title = this.campaign.titleCampaign;
    this.customer = this.campaign.customer;
    this.editor = "Editor 2";
    this.endtime = this.campaign.deadline;
    this.chipsEditor = this.campaign.topicCampaign;
  }
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
.chips:hover {
  background-color: rgba(100, 100, 100, 0.5) !important;
  color: black !important;
  transition: 0.5s;
}
</style>