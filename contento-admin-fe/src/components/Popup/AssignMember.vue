<template>
  <v-dialog v-model="dialog" scrollable width="800px">
    <template v-slot:activator="{ on }">
      <v-btn icon color="grey" v-on="on" @click="clickAssign(accountID)">
        <v-icon>mdi-account-network</v-icon>
      </v-btn>
    </template>
    <v-stepper v-model="stepper" alt-labels>
      <v-stepper-header flat>
        <v-stepper-step :complete="stepper > 1" step="1" v-if="isWriter || isEditor">
          <div>Select Manager</div>
          <small>Optional</small>
        </v-stepper-step>
        <v-divider v-if="isEditor"></v-divider>
        <v-stepper-step step="2" v-if="isEditor">
          Select Member
          <small>Optional</small>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1" v-if="isWriter">
          <v-card class="mb-12" height="120px" flat>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="editor"
                  label="Editor"
                  class="text__14"
                  item-value="id"
                  item-text="name"
                  :value="editor"
                  flat
                  outlined
                  :items="listEditorsBasic"
                ></v-select>
              </v-col>
            </v-row>
          </v-card>
          <v-row justify="end">
            <v-btn color="primary" @click="assign()" :loading="loadingEdit">Update</v-btn>
            <v-btn text @click="cancelStepper()">Cancel</v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="1" v-else>
          <v-card class="mb-12" height="120px" flat>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="marketer"
                  label="Marketer"
                  class="text__14"
                  item-value="id"
                  item-text="name"
                  :value="marketer"
                  flat
                  outlined
                  :items="listMarketersBasic"
                ></v-select>
              </v-col>
            </v-row>
          </v-card>
          <v-row justify="end">
            <v-btn color="primary" @click="stepper = 2">Continue</v-btn>

            <v-btn text @click="cancelStepper()">Cancel</v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="2" v-if="isEditor">
          <v-card class="mb-12" height="120px" flat>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="writer"
                  label="Writer"
                  class="text__14"
                  item-value="id"
                  item-text="name"
                  flat
                  outlined
                  :value="writer"
                  :items="listWritersBasic"
                  multiple
                  clearable
                  chips
                >
                  <template v-slot:selection="{ attrs, item,index, select, selected }">
                    <v-chip color="blue" class="chips" v-if="index == 0">{{ item.name }}</v-chip>
                    <v-chip
                      color="blue"
                      v-if="index === 1"
                      class="chips caption"
                    >+{{ writer.length -1 }} others selected</v-chip>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-card>
          <v-row justify="end">
            <v-btn color="primary" @click="assign()" :loading="loadingEdit">Update</v-btn>

            <v-btn text @click="cancelStepper()">Cancel</v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  props: ["accountID"],
  data() {
    return {
      dialog: false,
      menu: false,
      stepper: 1,

      firstname: "",
      lastname: "",
      email: "",
      role: "",
      roles: [
        {
          id: 1,
          name: "Marketer"
        },
        {
          id: 2,
          name: "Editor"
        },
        {
          id: 3,
          name: "Writer"
        }
      ],
      editor: [],
      writer: [],
      marketer: [],
      isMarketer: false,
      isEditor: false,
      isWriter: false,
      loadingEdit: false
    };
  },
  computed: {
    ...mapGetters([
      "listMarketersBasic",
      "listEditorsBasic",
      "listWritersBasic",
      "adminUserDetail"
    ])
  },
  methods: {
    ...mapActions({
      assignMember: "authentication/assignMember",
      getMarketersBasic: "authentication/getMarketersBasic",
      getEditorsBasic: "authentication/getEditorsBasic",
      getWritersBasic: "authentication/getWritersBasic",
      getAdminUserDetails: "authentication/getAdminUserDetails",
      setEditorsBasic: "authentication/setEditorsBasic",
      setWritersBasic: "authentication/setWritersBasic",
      getFreelanceAccount: "authentication/getFreelanceAccount"
    }),
    async assign() {
      this.loadingEdit = true;
      let listMarketers = [];
      let listEditors = [];
      let status = await this.assignMember({
        id: this.accountID,
        email: this.email,
        lastName: this.lastname,
        firstName: this.firstname,
        gender: this.gender,
        age: this.age,
        phone: this.phone,
        role: this.role,
        idMarketer: listMarketers.concat(this.marketer),
        idEditor: listEditors.concat(this.editor),
        idWriter: this.writer
      });
      if (status == 202) {
        await this.getFreelanceAccount();
        this.loadingEdit = false;
        this.dialog = false;
      }
    },
    cancelStepper() {
      this.dialog = false;
      this.stepper = 1;
    },
    async clickAssign(event) {
      this.stepper = 1;
      await Promise.all([
        this.getMarketersBasic(),
        this.getEditorsBasic(),
        this.getWritersBasic(),
        this.getAdminUserDetails(event)
      ]);
      this.firstname = this.adminUserDetail.firstName;
      this.lastname = this.adminUserDetail.lastName;
      this.email = this.adminUserDetail.email;
      this.writer = [];
      this.editor = [];
      this.marketer = [];
      if (this.adminUserDetail.role.id == 2) {
        await Promise.all([
          this.getMarketersBasic(),
          this.setWritersBasic(this.adminUserDetail.writer)
        ]);
        this.isMarketer = false;
        this.isEditor = true;
        this.isWriter = false;
        if (this.adminUserDetail.choiceMarketer) {
          this.marketer = this.adminUserDetail.choiceMarketer[0];
        }
      } else if (this.adminUserDetail.role.id == 3) {
        await this.setEditorsBasic(this.adminUserDetail.editor);
        this.isMarketer = false;
        this.isEditor = false;
        this.isWriter = true;
        if (this.adminUserDetail.choiceEditor) {
          this.editor = this.adminUserDetail.choiceEditor[0];
        }
      }
      this.role = this.adminUserDetail.role.id;
      this.writer = this.adminUserDetail.choiceWriter;
    }
  }
};
</script>
<style scoped>
::v-deep .v-stepper__label {
  display: block !important;
}
::v-deep .v-stepper__header {
  box-shadow: none !important;
}
.chips {
  color: white !important;
}
</style>