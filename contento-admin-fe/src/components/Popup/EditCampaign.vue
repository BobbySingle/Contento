<template>
  <v-dialog v-model="dialog" persistent scrollable width="800px">
    <template v-slot:activator="{ on }">
      <v-btn color="warning" icon fab small v-on="on" @click="clickEdit(campaignID)">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="warning">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Campaign</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="update()" :loading="loadingSave">Save</v-btn>
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
                  prepend-inner-icon="title"
                  @blur="$v.title.$touch()"
                ></v-text-field>
                <div style="color:red" v-if="!$v.title.required && check">Please enter title.</div>
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
                      :value="endDate"
                      :min-datetime="minDate"
                      v-model="endDate"
                      placeholder="Select End time"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      class="endtime text__14"
                      required
                      @blur="$v.endDate.$touch()"
                    ></datetime>
                  </v-col>
                </v-row>
                <div style="color:red" v-if="!$v.endDate.required && check">Please select end time.</div>
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
                      prepend-inner-icon="account_circle"
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
                  :items="listEditor"
                  item-text="name"
                  item-value="id"
                  label="Editor"
                  v-model="editor.id"
                  :value="editor"
                  class="text__14"
                  prepend-inner-icon="edit"
                  :readonly="!isOpen"
                  required
                  @blur="$v.editor.$touch()"
                ></v-select>
                <div style="color:red" v-if="!$v.editor.required && check">Please select editor.</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-select
                  v-model="selectedTag"
                  item-text="name"
                  item-value="id"
                  :value="selectedTag"
                  :items="listTag"
                  chips
                  clearable
                  label="Category"
                  prepend-inner-icon="category"
                  multiple
                  required
                  @blur="$v.selectedTag.$touch()"
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
                <div
                  style="color:red"
                  v-if="!$v.selectedTag.required && check"
                >Please select category.</div>
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
                  style="color: black"
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
      minDate: new Date().toISOString(),
      endDate: "",
      title: "",
      customer: "",
      editor: "",
      content: "",
      isOpen: false,
      id: "",
      check: false,
      loadingSave: false,
      //Local TimeZone
      localISOTime: "",
      tzoffset: new Date().getTimezoneOffset() * 60000 //offset in milliseconds
    };
  },
  validations: {
    title: { required, maxLength: maxLength(255) },
    endDate: { required },
    customer: { required },
    editor: { required },
    content: { required },
    selectedTag: { required },
    form: ["title", "selectedTag", "customer", "editor", "content", "endDate"]
  },
  methods: {
    ...mapActions({
      editCampaign: "campaign/editCampaign",
      getDetailCampaign: "campaign/getDetailCampaign",
      getListCampaign: "campaign/getListCampaign"
    }),
    async clickEdit(event) {
      this.check = false;
      await this.getDetailCampaign(event);
      this.selectedTag = this.detailCampaign.listTag;
      this.content = this.detailCampaign.description;
      this.title = this.detailCampaign.title;
      this.customer = this.detailCampaign.customer;
      this.editor = this.detailCampaign.editor;
      var millisecondsTime = Date.parse(this.detailCampaign.endDate + "Z");
      var newDateUTC7 = new Date(millisecondsTime - this.tzoffset)
        .toISOString()
        .slice(0, -1);
      this.endDate = newDateUTC7;
      if (this.detailCampaign.status == 1) {
        this.isOpen = true;
      }
      this.id = this.detailCampaign.id;
    },
    async update() {
      this.loadingSave = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let status = await this.editCampaign({
          id: this.id,
          title: this.title,
          description: this.$refs.ckeditor.editorData,
          endDate: this.endDate,
          tags: this.selectedTag,
          editor: this.editor,
          customer: this.customer
        });
        if (status == 202) {
          await this.getListCampaign(this.$store.getters.getUser.id);
          this.loadingSave = false;
          this.dialog = false;
        }
      }
      this.loadingSave = false;
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