<template>
  <v-dialog v-model="dialog" scrollable width="800px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" class="text__14" @click="clickCreate()">Create Account</v-btn>
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
                  chips
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip color="blue" class="chips">{{ item.name }}</v-chip>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-card>
          <v-row justify="end">
            <v-btn color="primary" @click="create()" :loading="loadingCreate">Create</v-btn>
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
                  chips
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip color="blue" class="chips">{{ item.name }}</v-chip>
                  </template>
                </v-select>
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
            <v-btn color="primary" @click="create()" :loading="loadingCreate">Create</v-btn>

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
            <v-btn color="primary" @click="create()" :loading="loadingCreate">Create</v-btn>

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
    checkData() {
      this.loadingCreate = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.stepper = 2;
      }
    },

    async clickCreate() {
      this.stepper = 1;
      this.firstname = "";
      this.lastname = "";
      this.email = "";
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
    },
    cancelStepper() {
      this.dialog = false;
      this.stepper = 1;
      this.clickCreate();
    }
  }
};
</script>
<style scoped>
::v-deep .v-stepper__label {
  display: block !important;
}
.chips {
  color: white !important;
}
</style>