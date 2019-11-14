<template>
  <v-dialog v-model="dialog" scrollable width="800px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" class="text__14" @click="clickCreate()">Create Account</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add New Account</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="create()" :loading="loadingCreate">Create</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="min-height: 300px; padding:0px;">
        <v-row class="mx-10">
          <v-col cols="12">
            <v-text-field
              v-model="email"
              label="Email*"
              class="text__14"
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
      writers: [
        {
          id: 1,
          name: "Writer 1"
        },
        {
          id: 2,
          name: "Writer 2"
        },
        {
          id: 3,
          name: "Writer 3"
        }
      ],
      editors: [
        {
          id: 1,
          name: "Editor 1"
        },
        {
          id: 2,
          name: "Editor 2"
        },
        {
          id: 3,
          name: "Editor 3"
        }
      ],
      marketers: [
        {
          id: 1,
          name: "Marketer 1"
        },
        {
          id: 2,
          name: "Marketer 2"
        },
        {
          id: 3,
          name: "Marketer 3"
        }
      ],
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
    form: ["firstname", "lastname", "email", "role"]
  },
  computed: {
    ...mapGetters([
      "listMarketersBasic",
      "listEditorsBasic",
      "listWritersBasic"
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
      !this.$v.email.required && errors.push("Please enter your email");
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
      createAccount: "authentication/createAccount",
      getAdminAccounts: "authentication/getAdminAccounts",
      getMarketersBasic: "authentication/getMarketersBasic",
      getEditorsBasic: "authentication/getEditorsBasic",
      getWritersBasic: "authentication/getWritersBasic",
      getEditorsForWriter: "authentication/getEditorsForWriter"
    }),
    async listEmployees(event) {
      if (event == 1) {
        await this.getEditorsBasic();
        this.isMarketer = true;
        this.isEditor = false;
        this.isWriter = false;
      } else if (event == 2) {
        await Promise.all([this.getMarketersBasic(), this.getWritersBasic()]);
        this.isMarketer = false;
        this.isEditor = true;
        this.isWriter = false;
      } else {
        await this.getEditorsForWriter();
        this.isMarketer = false;
        this.isEditor = false;
        this.isWriter = true;
      }
    },
    async create() {
      this.loadingCreate = true;
      this.$v.form.$touch();
      let listMarketers = [];
      let listEditors = [];
      if (!this.$v.form.$invalid) {
        await this.createAccount({
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

    async clickCreate() {
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.gender = "";
      this.age = "";
      this.phone = "";
      this.role = "";
      this.writer = [];
      this.editor = [];
      this.marketer = [];
      this.isMarketer = false;
      this.isEditor = false;
      this.isWriter = false;
      this.$v.form.$reset();
      await Promise.all([
        this.getMarketersBasic(),
        this.getEditorsBasic(),
        this.getWritersBasic()
      ]);
    }
  }
};
</script>
<style scoped>
.chips {
  color: white !important;
}
</style>