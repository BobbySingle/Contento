<template>
  <v-dialog v-model="dialog" persistent scrollable width="800px">
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
          <v-btn dark text @click="create()" :loading="loadingSave">Save</v-btn>
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
                  class="text__14"
                  prepend-inner-icon="title"
                  required
                  @blur="$v.title.$touch()"
                  @input="$v.title.$touch()"
                ></v-text-field>
                <div style="color:red" v-if="!$v.title.required && check">The title cannot be empty.</div>
                <div
                  style="color:red"
                  v-if="!$v.title.maxLength && check"
                >Title up to 255 characters.</div>
              </v-col>
              <v-col cols="12" md="6" align-self="center">
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
                      clear
                      required
                      @blur="$v.endtime.$touch()"
                    ></datetime>
                  </v-col>
                </v-row>
                <div style="color:red" v-if="!$v.endtime.required && check">Please select endtime.</div>
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
                      prepend-inner-icon="account_circle"
                      clearable
                      required
                      @blur="$v.customer.$touch()"
                    ></v-select>
                    <div
                      style="color:red"
                      v-if="!$v.customer.required && check"
                    >Please select customer.</div>
                  </v-col>
                  <v-col
                    cols="2"
                    md="2"
                    class="pl-5"
                    style="width:100%;"
                    align-self="center"
                    justify-self="center"
                  >
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
                  prepend-inner-icon="edit"
                  clearable
                  required
                  @blur="$v.editor.$touch()"
                ></v-select>
                <div style="color:red" v-if="!$v.editor.required && check">Please select editor.</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-select
                  v-model="tags"
                  item-text="name"
                  item-value="id"
                  :items="listTag"
                  chips
                  clearable
                  label="Category"
                  prepend-inner-icon="category"
                  multiple
                  required
                  @blur="$v.tags.$touch()"
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
                </v-select>
                <div style="color:red" v-if="!$v.tags.required && check">Please select category.</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <div
                  style="color:red"
                  v-if="!$v.content.required && check"
                >The content cannot empty !</div>
              </v-col>
              <v-col cols="12" md="12">
                <CKEditor
                  style="color: black;"
                  ref="ckeditor"
                  :content="content"
                  v-model="content"
                  required
                  @ckeditorContent="content = $event"
                />
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";
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
      title: "",
      firstTimeLoad: true,
      check: false,
      loadingSave: false,
      campaignForm:
        '<figure class="table"><table><thead><tr><th colspan="2"><h3 style="text-align:center;">Campaign Request</h3></th></tr></thead><tbody><tr><th>Promise</th><td>&nbsp;</td></tr><tr><th>Slogan</th><td>&nbsp;</td></tr><tr><th>Target Customers</th><td>&nbsp;</td></tr><tr><th>Reasons to believe</th><td>&nbsp;</td></tr><tr><th>Function Products</th><td>&nbsp;</td></tr><tr><th>Story</th><td>&nbsp;</td></tr><tr><th>Brand Logo</th><td>&nbsp;</td></tr><tr><th>Positioning maps</th><td>&nbsp;</td></tr><tr><th>Character</th><td>&nbsp;</td></tr><tr><th>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th><td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td></tr></tbody></table></figure>'
    };
  },
  validations: {
    title: { required, maxLength: maxLength(255) },
    endtime: { required },
    customer: { required },
    editor: { required },
    content: { required },
    tags: { required },
    form: ["title", "tags", "customer", "editor", "content", "endtime"]
  },
  computed: {
    ...mapGetters(["listCustomer", "listEditor", "listTag"])
    // contentErrors() {
    //   const errors = [];
    //   if (!this.$v.content.$dirty) return errors;
    //   !this.$v.content.required && errors.push("Please enter content");
    //   return errors;
    // }
  },
  methods: {
    ...mapActions({
      createCampaign: "campaign/createCampaign",
      getListCampaign: "campaign/getListCampaign"
    }),

    async create() {
      this.check = true;
      this.loadingSave = true;
      this.content = this.$refs.ckeditor.editorData;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let status = await this.createCampaign({
          title: this.title,
          description: this.$refs.ckeditor.editorData,
          endDate: this.endtime,
          tags: this.tags,
          editor: { id: this.editor },
          customer: { id: this.customer },
          idMarketer: this.$store.getters.getUser.id
        });
        if (status == 202) {
          await this.getListCampaign(this.$store.getters.getUser.id);
          this.loadingSave = false;
          this.dialog = false;
        }
      }
      this.loadingSave = false;
    },

    clickCreate() {
      this.check = false;
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.mintime = tomorrow.toISOString();
      this.title = "";
      if (this.firstTimeLoad) {
        this.content = this.campaignForm;
        this.firstTimeLoad = !this.firstTimeLoad;
      } else {
        this.$refs.ckeditor.editorData = this.campaignForm;
      }
      this.endtime = "";
      this.tags = "";
      this.editor = "";
      this.customer = "";
    }
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
  height: 32px;
  width: 100%;
  padding-top: 5px;
}
.chips {
  color: white !important;
}

.datetime {
  width: 100%;
  padding-left: 10px;
}
</style>