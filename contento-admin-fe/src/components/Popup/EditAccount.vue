<template>
  <v-dialog v-model="dialog" scrollable width="800px">
    <template v-slot:activator="{ on }">
      <v-btn icon color="warning" v-on="on" @click="clickEdit(accountID)">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Account</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="edit()" :loading="loadingCreate">Edit</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="min-height: 300px; padding:0px;">
        <v-row class="mx-10">
          <v-col cols="12">
            <v-text-field
              v-model="email"
              label="Email*"
              class="text__14"
              readonly
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
              required
              :value="lastname"
              :error-messages="lastnameErrors"
              @blur="$v.lastname.$touch()"
              @input="$v.lastname.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-select
              v-model="gender"
              label="Gender"
              class="text__14"
              item-value="id"
              item-text="name"
              :value="gender"
              :items="genders"
            ></v-select>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="age"
              type="number"
              label="Age"
              class="text__14"
              :value="age"
              :error-messages="ageErrors"
              @blur="$v.age.$touch()"
              @input="$v.age.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
              type="number"
              v-model="phone"
              label="Phone"
              class="text__14"
              :value="phone"
              :error-messages="phoneErrors"
              @blur="$v.phone.$touch()"
              @input="$v.phone.$touch()"
            ></v-text-field>
          </v-col>

          <!-- ROLE -->
          <v-col cols="6">
            <v-select
              v-model="role"
              label="Role*"
              class="text__14"
              item-value="id"
              item-text="name"
              :value="role"
              :items="roles"
              @change="listEmployees"
              :error-messages="roleErrors"
              @blur="$v.role.$touch()"
              @input="$v.role.$touch()"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-row>
              <!-- Select Employees  -->
              <v-col cols="6" v-if="isMarketer">
                <v-select
                  v-model="editor"
                  label="Editor"
                  class="text__14"
                  item-value="id"
                  item-text="name"
                  :value="editor"
                  :items="listEditorsBasic"
                  multiple
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
              <v-col cols="6" v-if="isEditor">
                <v-select
                  v-model="marketer"
                  label="Marketer"
                  class="text__14"
                  item-value="id"
                  item-text="name"
                  :value="marketer"
                  :items="listMarketersBasic"
                  chips
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip color="blue" class="chips">{{ item.name }}</v-chip>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6" v-if="isEditor">
                <v-select
                  v-model="writer"
                  label="Writer"
                  class="text__14"
                  item-value="id"
                  item-text="name"
                  :value="writer"
                  :items="listWritersBasic"
                  multiple
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
              <v-col cols="6" v-if="isWriter">
                <v-select
                  v-model="editor"
                  label="Editor"
                  class="text__14"
                  item-value="id"
                  item-text="name"
                  :value="editor"
                  :items="listEditorsBasic"
                  chips
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip color="blue" class="chips">{{ item.name }}</v-chip>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      age: "",
      phone: "",
      genders: [
        {
          id: 1,
          name: "Male"
        },
        {
          id: 2,
          name: "Female"
        },
        {
          id: 3,
          name: "Others"
        }
      ],
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
      loadingCreate: false
    };
  },
  validations: {
    firstname: { required, maxLength: maxLength(50) },
    lastname: { required, maxLength: maxLength(50) },
    phone: {
      maxLength: maxLength(10),
      between: between(0, 9999999999)
    },
    age: { between: between(18, 100) },
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
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.maxLength && errors.push("Phone up to 10 numbers");
      !this.$v.phone.between && errors.push("Phone must be integer");
      return errors;
    },
    ageErrors() {
      const errors = [];
      if (!this.$v.age.$dirty) return errors;
      !this.$v.age.between && errors.push("Age must be between 18 - 100");
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
        await Promise.all([this.getMarketersBasic(), this.getWritersBasic()]);
        if (this.adminUserDetail.role.id == 2) {
          await this.setWritersBasic(this.adminUserDetail.writer);
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
      this.loadingCreate = true;
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
        this.loadingCreate = false;
        this.dialog = false;
      }
      this.loadingCreate = false;
    },

    async clickEdit(event) {
      await Promise.all([
        this.getMarketersBasic(),
        this.getEditorsBasic(),
        this.getWritersBasic(),
        this.getAdminUserDetails(event)
      ]);
      this.firstname = this.adminUserDetail.firstName;
      this.lastname = this.adminUserDetail.lastName;
      this.email = this.adminUserDetail.email;
      this.gender = this.adminUserDetail.gender;
      this.age = this.adminUserDetail.age;
      this.phone = this.adminUserDetail.phone;
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
.chips {
  color: white !important;
}
</style>