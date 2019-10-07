<template>
  <v-dialog v-model="dialog" persistent width="1000px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" large v-on="on">Create Campaign</v-btn>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="heading">Add New Campaign</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10">
        <v-col md="12">
          <v-row>
            <v-col md="6">
              <v-text-field :counter="255" label="Title:" required></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="5">
              <v-row class="out-endtime">
                <v-col md="1">
                  <v-icon>mdi-calendar-range</v-icon>
                </v-col>

                <v-col md="11">
                  <datetime title="End Time" type="datetime" v-model="endtime" class="endtime"></datetime>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-row no-gutters>
                <v-col md="10">
                  <v-select :items="customers" label="Customer"></v-select>
                </v-col>
                <v-col md="2" class="pl-5" style="width:100%;" align-self="center">
                  <!-- <v-btn fab color="primary" small>
                    <v-icon color="white">add</v-icon>
                  </v-btn>-->

                  <!-- /**Popup CreateCustomer */ -->
                  <popup-create-customer></popup-create-customer>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="5">
              <v-select :items="editors" label="Editor"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-combobox
                v-model="chips"
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
                    <strong>{{ item }}</strong>
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
  components: {
    CKEditor,
    PopupCreateCustomer
  },
  data() {
    return {
      dialog: false,
      menu: false,
      customers: ["Customer 1", "Customer 2", "Customer 3"],
      editors: ["Editor 1", "Editor 2", "Editor 3"],
      chips: [],
      categorys: ["Sport", "Travel", "Food & Drink", "2Tek", "Social","Business","Film"],
      endtime: new Date().toISOString(),
      content: ""
    };
  },
  methods: {
    // remove(item) {
    //   this.chips.splice(this.chips.indexOf(item), 1);
    //   this.chips = [...this.chips];
    // },
    update() {
      console.log(this.$refs.ckeditor.editorData);
    }
  },
  mounted() {
    this.content =
      '<p>Ghi cai nay vao content ok gi roi lam gi tiep gio</p><figure class="image"><img src="https://firebasestorage.googleapis.com/v0/b/contento-admin.appspot.com/o/images%2Fcontent%2Fa.png?alt=media&amp;token=2860ba48-8ee3-41ab-8c5e-96b935d65d51"></figure>"';
  },
  watch: {
    endtime() {
      console.log(this.endtime);
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
/* .chips:hover {
  background-color: rgba(100, 100, 100, 0.5) !important;
  color: black !important;
  transition: 0.5s;
} */ 
</style>