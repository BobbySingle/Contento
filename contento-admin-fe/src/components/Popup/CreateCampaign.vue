<template>
  <v-dialog v-model="dialog" scrollable width="1000px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" class="text__14" @click="clickCreate()">Create Campaign</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add New Campaign</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false,  create()">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="min-height: 300px; padding:0px;">
        <v-row no-gutters class="mx-10">
          <v-col cols="12" md="12">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="title"
                  :counter="255"
                  label="Title:"
                  required
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
                      v-model="endtime"
                      :min-datetime="mintime"
                      placeholder="Select End-date"
                      input-class="datetime"
                      input-style="cursor:pointer;"
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
                      v-model="customer"
                      :items="listCustomer"
                      item-text="name"
                      item-value="id"
                      label="Customer"
                    ></v-select>
                  </v-col>
                  <v-col cols="2" md="2" class="pl-5" style="width:100%;" align-self="center"  justify-self="center">
                    <popup-create-customer :isSmallBtn="true"></popup-create-customer>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="editor"
                  :items="listEditor"
                  item-text="name"
                  item-value="id"
                  label="Editor"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-combobox
                  v-model="tags"
                  item-text="name"
                  item-value="id"
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
                <CKEditor ref="ckeditor" :content="content" />
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
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
    CKEditor,
    PopupCreateCustomer
  },
  data() {
    return {
      dialog: false,
      menu: false,
      tags: [],
      endtime: "",
      mintime: "",
      content: "",
      customer: [],
      editor: [],
      title: ""
    };
  },
  computed: {
    ...mapGetters(["listCustomer", "listEditor", "listTag"])
  },
  methods: {
    ...mapActions({
      createCampaign: "campaign/createCampaign"
    }),

    create() {
      this.createCampaign({
        title: this.title,
        description: this.$refs.ckeditor.editorData,
        endDate: this.endtime,
        tags: this.tags,
        editor: { id: this.editor },
        customer: { id: this.customer },
        idMarketer: this.$store.getters.getUser.id
      });
      this.dialog = false;
    },

    clickCreate() {
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.mintime = tomorrow.toISOString();
      this.title = "";
      this.$refs.ckeditor.editorData = "Write your request here... ";
      this.endtime = "";
      this.tags = "";
      this.editor = "";
      this.customer = "";
    }
  },
  mounted() {
    this.content = "Write your request here... ";
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