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
                :items="this.$store.getters.listTags"
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
customers: [
        {
          id: 1,
          name: "Customer1"
        },
        {
          id: 5,
          name: "Customer2"
        },
        {
          id: 3,
          name: "Customer3"
        },
        {
          id: 4,
          name: "Customer4"
        }
      ],
      editors: [
        {
          id: 7,
          name: "Editor1"
        },
        {
          id: 2,
          name: "Editor2"
        },
        {
          id: 3,
          name: "Editor3"
        },
        {
          id: 4,
          name: "Editor4"
        }
      ],
      listTag: [],
      // categorys: [],
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

    }
  },
  mounted() {
    this.content = this.campaign.description;
    this.title = this.campaign.title;
    this.endDate = this.$moment(this.campaign.endDate).toISOString();
    this.listTag = this.campaign.listTag;
    this.customer = this.campaign.customer;
    this.editor = this.campaign.editor;
    this.id = this.campaign.id;
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