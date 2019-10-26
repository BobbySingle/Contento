<template>
  <v-dialog v-model="dialog" scrollable width="1000px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" fab small v-on="on" @click="clickEdit(campaignID)">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Campaign</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="update()">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="min-height: 300px; padding:0px;">
        <v-row no-gutters class="mx-10">
          <v-col cols="12" md="12">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  :counter="255"
                  label="Title:"
                  required
                  v-model="title"
                  :value="title"
                  class="text__14"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-row class="out-endtime">
                  <v-col class="d-none d-md-block" md="1">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>

                  <v-col cols="12" md="11">
                    <datetime
                      title="End Time"
                      type="datetime"
                      :value="endDate"
                      :min-datetime="minDate"
                      v-model="endDate"
                      placeholder="Select End-date"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      value-zone="Asia/Ho_Chi_Minh"
                      zone="Asia/Ho_Chi_Minh"
                      class="endtime text__14"
                    ></datetime>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-row no-gutters>
                  <v-col cols="10" md="10">
                    <v-select
                      :items="listCustomer"
                      item-text="name"
                      item-value="id"
                      label="Customer"
                      v-model="customer.id"
                      :value="customer"
                      class="text__14"
                    ></v-select>
                  </v-col>
                  <v-col cols="2" md="2" class="pl-5" style="width:100%;" align-self="center"  justify-self="center">
                    <popup-create-customer :isSmallBtn="true"></popup-create-customer>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :items="listEditor"
                  item-text="name"
                  item-value="id"
                  label="Editor"
                  v-model="editor.id"
                  :value="editor"
                  class="text__14"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-combobox
                  v-model="selectedTag"
                  item-text="name"
                  item-value="id"
                  :value="selectedTag"
                  :items="listTag"
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
              <v-col cols="12" md="12">
                <CKEditor ref="ckeditor" :content="content" v-model="ckeditor" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import CKEditor from "../CKEditor/Ckeditor5";
import PopupCreateCustomer from "./CreateCustomer.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  props: ["campaignID"],
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
      selectedTag: [],
      // listTag: [],
      minDate: new Date().toISOString(),
      endDate: "",
      title: "",
      customer: "",
      editor: "",
      ckeditor: "",
      content: "",
      id: ""
    };
  },
  methods: {
    ...mapActions({
      editCampaign: "campaign/editCampaign",
      getDetailCampaign: "campaign/getDetailCampaign"
    }),
    async clickEdit(event) {
      await this.getDetailCampaign(event);
      if (this.detailCampaign != null) {
        this.selectedTag = this.detailCampaign.listTag;
        this.content = this.detailCampaign.description;
        this.title = this.detailCampaign.title;
        this.customer = this.detailCampaign.customer;
        this.editor = this.detailCampaign.editor;
        this.endDate = this.detailCampaign.endDate;
        this.id = this.detailCampaign.id;
      }
    },
    async update() {
      let status = await this.editCampaign({
        id: this.id,
        title: this.title,
        description: this.$refs.ckeditor.editorData,
        endDate: this.endDate,
        tags: this.selectedTag,
        editor: this.editor,
        customer: this.customer
      });
      if(status == 202){
        this.dialog = false;
      }
    }
  },
  computed: {
    ...mapGetters(["listCustomer", "listEditor", "listTag", "detailCampaign"])
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

.datetime {
  width: 100%;
  padding-left: 10px;
}
</style>