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
          <v-btn dark text @click="create()">Save</v-btn>
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
                  required
                  @blur="$v.title.$touch()"
                  @input="$v.title.$touch()"
                ></v-text-field>
                <div style="color:red" v-if="!$v.title.required && check">Please enter endtime.</div>
                <div
                  style="color:red"
                  v-if="!$v.title.maxLength && check"
                >Title up to 255 characters.</div>
              </v-col>
              <v-col cols="12" md="6">
                <v-row class="out-endtime">
                  <v-col class="d-none d-md-block" md="1">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>

                  <v-col cols="12" md="11">
                    <!-- <v-text-field type="hidden" :error-messages="endtimeErrors"></v-text-field> -->
                    <datetime
                      title="End Time"
                      type="datetime"
                      v-model="endtime"
                      :min-datetime="mintime"
                      placeholder="Select End-date"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      class="endtime text__14"
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
                  required
                  @blur="$v.editor.$touch()"
                ></v-select>
                <div style="color:red" v-if="!$v.editor.required && check">Please select editor.</div>
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
                </v-combobox>
                <div style="color:red" v-if="!$v.tags.required && check">Please select category.</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <div>*NOTE: The content cannot be empty ! </div>
              </v-col>
              <v-col cols="12" md="12">
                <CKEditor ref="ckeditor" :content="content" required @blur="$v.content.$touch()" />
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
      check: false
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
    ...mapGetters(["listCustomer", "listEditor", "listTag"]),
    // titleErrors() {
    //   const errors = [];
    //   if (!this.$v.title.$dirty) return errors;
    //   !this.$v.title.required && errors.push("Please enter title");
    //   !this.$v.title.maxLength && errors.push("Title up to 255 characters");
    //   return errors;
    // },
    // tagsErrors() {
    //   const errors = [];
    //   if (!this.$v.tags.$dirty) return errors;
    //   !this.$v.tags.required && errors.push("Please select category");
    //   return errors;
    // },
    // endtimeErrors() {
    //   const errors = [];
    //   if (!this.$v.endtime.$dirty) return errors;
    //   !this.$v.endtime.required && errors.push("Please select endtime");
    //   return errors;
    // },
    // customerErrors() {
    //   const errors = [];
    //   if (!this.$v.customer.$dirty) return errors;
    //   !this.$v.customer.required && errors.push("Please select customer");
    //   return errors;
    // },
    // editorErrors() {
    //   const errors = [];
    //   if (!this.$v.editor.$dirty) return errors;
    //   !this.$v.editor.required && errors.push("Please select editor");
    //   return errors;
    // },
    // contentErrors() {
    //   const errors = [];
    //   if (!this.$v.content.$dirty) return errors;
    //   !this.$v.content.required && errors.push("Please enter content");
    //   return errors;
    // }
  },
  methods: {
    ...mapActions({
      createCampaign: "campaign/createCampaign"
    }),

    async create() {
      this.check = true;
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
          this.dialog = false;
        }
      }
    },

    clickCreate() {
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.mintime = tomorrow.toISOString();
      this.title = "";
      if (this.firstTimeLoad) {
        this.content = "Write your request here... ";
        this.firstTimeLoad = !this.firstTimeLoad;
      } else {
        this.$refs.ckeditor.editorData = "Write your request here... ";
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