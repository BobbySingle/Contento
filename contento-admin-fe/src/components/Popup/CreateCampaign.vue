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
      axios
        .post(`http://34.87.31.23:5001/api/campaign/campaign`, {
          title: this.title,
          description: this.$refs.ckeditor.editorData,
          endDate: this.endtime,
          tags: this.tags,
          editor: { id: this.editor },
          customer: { id: this.customer },
          idMarketer: this.$store.getters.getUser.id
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
    axios
      .get(
        `http://34.87.31.23:5000/api/authentication/customers/marketers-basic/${this.$store.getters.getUser.id}`
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
      .get(`http://34.87.31.23:5000/api/authentication/editors/marketers/${this.$store.getters.getUser.id}`)
      .then(rs => {
        this.editors = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Get list editor */

    /**Begin Get list editor */
    axios
      .get(`http://34.87.31.23:5002/api/contentprocess/tags`)
      .then(rs => {
        this.categorys = rs.data;
      })
      .catch(er => {
        console.log(er);
      });
    /**End Get list editor */
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
</style>