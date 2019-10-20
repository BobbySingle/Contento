<template>
  <v-dialog v-model="dialog" persistent width="1000px">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" large v-on="on">Create Campaign</v-btn> -->
      <v-btn color="primary" fab small v-on="on">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="text__h1">Edit Campaign</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10">
        <v-col md="12">
          <v-row>
            <v-col md="6">
              <v-text-field
                :counter="255"
                label="Title:"
                required
                v-model="title"
                :value="campaign.title"
                class="text__14"
              ></v-text-field>
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
                    :value="campaign.endDate"
                    :min-datetime="minDate"
                    v-model="endDate"
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
                    :items="customers"
                    item-text="name"
                    item-value="id"
                    label="Customer"
                    v-model="customer.id"
                    :value="campaign.customer"
                    class="text__14"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="5">
              <v-select
                :items="editors"
                item-text="name"
                item-value="id"
                label="Editor"
                v-model="editor.id"
                :value="campaign.editor"
                class="text__14"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-combobox
                v-model="listTag"
                item-text="name"
                item-value="id"
                :value="campaign.listTag"
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
              <CKEditor ref="ckeditor" :content="content" v-model="ckeditor" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false" class="text__14">Cancel</v-btn>
        <v-btn color="success" @click="dialog = false, update()" class="text__14">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CKEditor from "../CKEditor/Ckeditor5";
import PopupCreateCustomer from "./CreateCustomer.vue";
import axios from "axios";
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
      customers: [],
      editors: [],
      listTag: [],
      categorys: [],
      minDate: new Date().toISOString(),
      endDate: "",
      content: "",
      title: "",
      customer: "",
      editor: "",
      ckeditor: "",
      id: ""
    };
  },
  methods: {
    update() {
      axios
        .put(`http://34.87.31.23:5001/api/campaign/campaign`, {
          id: this.id,
          title: this.title,
          description: this.$refs.ckeditor.editorData,
          endDate: this.endDate,
          tags: this.listTag,
          editor: this.editor,
          customer: this.customer
        })
        .then(rs => {
          console.log(rs);
          this.$emit("emitCampaign");
        })
        .catch(er => {
          alert("Edit failed!");
          console.log(er);
        });
      this.dialog = false;
    }
  },
  mounted() {
    /**Begin Get list customer */
    axios
      .get(
        `http://34.87.31.23:5000/api/authentication/customers/marketers-basic/0`
      )
      .then(rs => {
        this.customers = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Get list customer */

    /**Begin Get list editor */
    axios
      .get(`http://34.87.31.23:5000/api/authentication/editors/marketers/10`)
      .then(rs => {
        this.editors = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Get list editor */

    /**Begin Get list tags */
    axios
      .get(`http://34.87.31.23:5002/api/contentprocess/tags`)
      .then(rs => {
        this.categorys = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Get list tags */
    axios
      .get(`http://34.87.31.23:5001/api/campaign/campaigns/${this.campaign}`)
      .then(rs => {
        this.content = rs.data.description;
        this.title = rs.data.title;
        this.endDate = this.$moment(rs.data.endDate).toISOString();
        this.listTag = rs.data.listTag;
        this.customer = rs.data.customer;
        this.editor = rs.data.editor;
        this.id = rs.data.id;
        
      })
      .catch(er => {
        console.log(er);
      });
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
/*
.chips:hover {
  background-color: rgba(100, 100, 100, 0.5) !important;
  color: black !important;
  transition: 0.5s;
} */
</style>