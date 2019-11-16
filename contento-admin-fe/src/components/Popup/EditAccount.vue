<template>
  <v-dialog v-model="dialog" scrollable width="800px">
    <template v-slot:activator="{ on }">
      <v-btn icon color="warning" v-on="on" @click="clickEdit(accountID)">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-stepper v-model="stepper" alt-labels>
      <v-stepper-header flat>
        <v-stepper-step :complete="stepper > 1" step="1">Information</v-stepper-step>
        <v-divider v-if="isWriter || isEditor"></v-divider>
        <v-stepper-step :complete="stepper > 2" step="2" v-if="isWriter || isEditor">
          <div>Select Manager</div>
          <small>Optional</small>
        </v-stepper-step>
        <v-divider v-if="isMarketer"></v-divider>
        <v-stepper-step step="2" v-if="isMarketer">
          <div>Select Member</div>
          <small>Optional</small>
        </v-stepper-step>
        <v-divider v-if="isEditor"></v-divider>
        <v-stepper-step step="3" v-if="isEditor">
          Select Member
          <small>Optional</small>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" height="300px" flat>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email*"
                  class="text__14"
                  flat
                  outlined
                  required
                  :value="email"
                  :error-messages="emailErrors"
                  @blur="$v.email.$touch()"
                  @input="$v.email.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="firstname"
                  label="First name*"
                  class="text__14"
                  :value="firstname"
                  flat
                  outlined
                  required
                  :error-messages="firstnameErrors"
                  @blur="$v.firstname.$touch()"
                  @input="$v.firstname.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="lastname"
                  label="Last name*"
                  class="text__14"
                  flat
                  outlined
                  required
                  :value="lastname"
                  :error-messages="lastnameErrors"
                  @blur="$v.lastname.$touch()"
                  @input="$v.lastname.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="role"
                  label="Role*"
                  class="text__14"
                  item-value="id"
                  item-text="name"
                  flat
                  outlined
                  :value="role"
                  :items="roles"
                  @change="listEmployees"
                  :error-messages="roleErrors"
                  @blur="$v.role.$touch()"
                  @input="$v.role.$touch()"
                ></v-select>
              </v-col>
            </v-row>
          </v-card>
          <v-row justify="end">
            <v-btn color="primary" @click="checkData">Continue</v-btn>
            <v-btn text @click="cancelStepper()">Cancel</v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2" v-if="isWriter">
          <v-card class="mb-12" height="300px" flat>
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
            <v-btn color="primary" @click="edit()" :loading="loadingEdit">Update</v-btn>
            <v-btn text @click="cancelStepper()">Cancel</v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2" v-if="isEditor">
          <v-card class="mb-12" height="300px" flat>
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
            <v-btn color="primary" @click="stepper = 3">Continue</v-btn>

            <v-btn text @click="cancelStepper()">Cancel</v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="2" v-if="isMarketer">
          <v-card class="mb-12" height="300px" flat>
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
                  multiple
                  clearable
                  chips
                >
                  <template v-slot:selection="{ attrs, item,index, select, selected }">
                    <v-chip color="blue" class="chips" v-if="index === 0">{{ item.name }}</v-chip>
                    <v-chip
                      color="blue"
                      v-if="index === 1"
                      class="chips caption"
                    >+{{ editor.length - 1}} others selected</v-chip>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-card>
          <v-row justify="end">
            <v-btn color="primary" @click="edit()" :loading="loadingEdit">Update</v-btn>

            <v-btn text @click="cancelStepper()">Cancel</v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="3" v-if="isEditor">
          <v-card class="mb-12" height="300px" flat>
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
            <v-btn color="primary" @click="edit()" :loading="loadingEdit">Update</v-btn>

            <v-btn text @click="cancelStepper()">Cancel</v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  between,
  email
} from "vuelidate/lib/validators";
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
  validations: {
    firstname: { required, maxLength: maxLength(50) },
    lastname: { required, maxLength: maxLength(50) },
    email: { required, email },
    role: { required },
    form: ["firstname", "lastname", "role"]
  },
  computed: {
    ...mapGetters([
      "listMarketersBasic",
      "listEditorsBasic",
      "listWritersBasic",
      "adminUserDetail"
    ]),
    firstnameErrors() {
      const errors = [];
      if (!this.$v.firstname.$dirty) return errors;
      !this.$v.firstname.maxLength &&
        errors.push("Firstname up to 50 characters");
      !this.$v.firstname.required && errors.push("Please enter your firstname");
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      if (!this.$v.lastname.$dirty) return errors;
      !this.$v.lastname.maxLength &&
        errors.push("Lastname up to 50 characters");
      !this.$v.lastname.required && errors.push("Please enter your lastname");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Invalid email");
      return errors;
    },
    roleErrors() {
      const errors = [];
      if (!this.$v.role.$dirty) return errors;
      !this.$v.role.required && errors.push("Role must be select");
      return errors;
    }
  },
  methods: {
    ...mapActions({
      editAccount: "authentication/editAccount",
      getAdminAccounts: "authentication/getAdminAccounts",
      getMarketersBasic: "authentication/getMarketersBasic",
      getEditorsBasic: "authentication/getEditorsBasic",
      getWritersBasic: "authentication/getWritersBasic",
      getEditorsForWriter: "authentication/getEditorsForWriter",
      getAdminUserDetails: "authentication/getAdminUserDetails",
      setMaketersBasic: "authentication/setMaketersBasic",
      setEditorsBasic: "authentication/setEditorsBasic",
      setWritersBasic: "authentication/setWritersBasic",
      removeElementMarketer: "authentication/removeElementMarketer",
      removeElementEditor: "authentication/removeElementEditor",
      removeElementWriter: "authentication/removeElementWriter"
    }),
    async listEmployees(event) {
      if (event == 1) {
        await this.getEditorsBasic();
        if (this.adminUserDetail.role.id == 1) {
          await this.setEditorsBasic(this.adminUserDetail.editor);
        } else {
          await Promise.all([
            this.removeElementEditor(this.adminUserDetail.id),
            this.removeElementMarketer(this.adminUserDetail.id),
            this.removeElementWriter(this.adminUserDetail.id)
          ]);
        }
        this.isMarketer = true;
        this.isEditor = false;
        this.isWriter = false;
        this.editor = [];
        this.marketer = [];
        this.writer = [];
        if (
          this.adminUserDetail.role.id == 1 &&
          this.adminUserDetail.choiceEditor
        ) {
          this.editor = this.adminUserDetail.choiceEditor;
        }
      } else if (event == 2) {
        await Promise.all([
          this.getMarketersBasic(),
          this.getWritersBasic(),
          this.getEditorsBasic()
        ]);
        if (this.adminUserDetail.role.id == 2) {
          await this.setWritersBasic(this.adminUserDetail.writer);
          await this.setMaketersBasic(this.adminUserDetail.marketer);
        } else {
          await Promise.all([
            this.removeElementEditor(this.adminUserDetail.id),
            this.removeElementMarketer(this.adminUserDetail.id),
            this.removeElementWriter(this.adminUserDetail.id)
          ]);
        }
        this.isMarketer = false;
        this.isEditor = true;
        this.isWriter = false;
        this.editor = [];
        this.marketer = [];
        this.writer = [];
        if (
          this.adminUserDetail.role.id == 2 &&
          this.adminUserDetail.choiceMarketer
        ) {
          this.marketer = this.adminUserDetail.choiceMarketer[0];
        }
        if (
          this.adminUserDetail.role.id == 2 &&
          this.adminUserDetail.choiceWriter
        ) {
          this.writer = this.adminUserDetail.choiceWriter;
        }
      } else if (event == 3) {
        await this.getEditorsBasic();
        if (this.adminUserDetail.role.id == 3) {
          await this.setEditorsBasic(this.adminUserDetail.editor);
        } else {
          await Promise.all([
            this.removeElementEditor(this.adminUserDetail.id),
            this.removeElementMarketer(this.adminUserDetail.id),
            this.removeElementWriter(this.adminUserDetail.id)
          ]);
        }
        this.isMarketer = false;
        this.isEditor = false;
        this.isWriter = true;
        this.editor = [];
        this.marketer = [];
        this.writer = [];
        if (
          this.adminUserDetail.role.id == 3 &&
          this.adminUserDetail.choiceEditor
        ) {
          this.editor = this.adminUserDetail.choiceEditor[0];
        }
      }
    },
    async edit() {
      this.loadingEdit = true;
      this.$v.form.$touch();
      let listMarketers = [];
      let listEditors = [];
      if (!this.$v.form.$invalid) {
        await this.editAccount({
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
        await this.getAdminAccounts();
        this.loadingEdit = false;
        this.dialog = false;
      }
      this.loadingEdit = false;
    },
    checkData() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.stepper = 2;
      }
    },
    cancelStepper() {
      this.dialog = false;
      this.stepper = 1;
    },
    async clickEdit(event) {
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
      if (this.adminUserDetail.role.id == 1) {
        await this.setEditorsBasic(this.adminUserDetail.editor);
        this.isMarketer = true;
        this.isEditor = false;
        this.isWriter = false;
        this.editor = this.adminUserDetail.choiceEditor;
      } else if (this.adminUserDetail.role.id == 2) {
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
      this.$v.form.$reset();
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