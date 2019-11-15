<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" @click="clickSignUp()">Sign Up</v-btn>
    </template>
    <v-card min-height="250px">
      <v-toolbar dark color="primary">
        <v-spacer></v-spacer>
        <v-toolbar-title>Sign Up</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
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
              :error-messages="lastnameErrors"
              @blur="$v.lastname.$touch()"
              @input="$v.lastname.$touch()"
              :value="lastname"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
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
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="password"
              label="Password*"
              clearable
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              @click:append="() => (showPassword = !showPassword)"
              :type="showPassword ? 'password' : 'text'"
              required
              :error-messages="passwordErrors"
              @blur="$v.password.$touch()"
              @input="$v.password.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="confirmPassword"
              label="Confirm-Password*"
              clearable
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              @click:append="() => (showPassword = !showPassword)"
              :type="showPassword ? 'password' : 'text'"
              required
              :error-messages="confirmPasswordErrors"
              @blur="$v.confirmPassword.$touch()"
              @input="$v.confirmPassword.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="tags"
              :value="tags"
              :items="listTag"
              item-text="name"
              item-value="id"
              chips
              clearable
              label="Category"
              prepend-inner-icon="category"
              multiple
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip v-bind="attrs" :input-value="selected" color="blue" class="chips">
                  <strong class="text__14">{{ item.name }}</strong>
                </v-chip>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters class=".flex-nowrap">
          <v-btn block color="primary" @click="signUp()" :loading="loading">Sign Up</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  required,
  between,
  minLength,
  maxLength,
  email,
  sameAs,
  helpers
} from "vuelidate/lib/validators";
import { async } from "q";

const passwordRegex = helpers.regex(
  "passwordRegex",
  /^([^\s]*)+(?=(.*[a-z]){1,})+(?=(.*[A-Z]){1,})+(?=(.*[@#\$]){1,})+(?=(.*\d){1,})+([^\s]+)*$/
);
export default {
  data() {
    return {
      dialog: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      tags: [],
      showPassword: "visibility",
      loading: false
    };
  },
  validations: {
    firstname: { required, maxLength: maxLength(50) },
    lastname: { required, maxLength: maxLength(50) },
    email: { required, email },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32),
      passwordRegex
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32),
      passwordRegex,
      sameAsPassword: sameAs("password")
    },
    form: ["firstname", "lastname", "email", "password", "confirmPassword"]
  },
  computed: {
    ...mapGetters(["getUser", "listTag"]),
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
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password at least 6 characters");
      !this.$v.password.maxLength &&
        errors.push("Password up to 32 characters");
      !this.$v.password.required && errors.push("Please enter your password");
      !this.$v.password.passwordRegex &&
        errors.push(
          "Password at least one lowercase letters, one uppercase letters, one digits, and one special characters (@,#,$)."
        );
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.minLength &&
        errors.push("Password at least 6 characters");
      !this.$v.confirmPassword.maxLength &&
        errors.push("Password up to 32 characters");
      !this.$v.confirmPassword.required &&
        errors.push("Please enter your password");
      !this.$v.confirmPassword.passwordRegex &&
        errors.push(
          "Password at least one lowercase letters, one uppercase letters, one digits, and one special characters (!,@,#)."
        );
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Confirm password must be same Password");
      return errors;
    }
  },
  methods: {
    ...mapActions({
      getTags: "viewer/getTags",
      register: "authentication/register",
      getContent: "viewer/getContent",
      getRecommendNews: "viewer/getRecommendNews"
    }),
    async fetchData() {
      await Promise.all([this.getTags()]);
    },
    async signUp() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.loading = true;
        const status = await this.register({
          email: this.email,
          password: this.password,
          lastName: this.firstname,
          firstName: this.lastname,
          tags: this.tags
        });
        if (status == 202) {
          await this.getContent({ id: this.getUser.id, tags: [0] });
          if (this.$store.state.authentication.loggedUser) {
            await this.getRecommendNews(this.getUser.id);
          }
          this.loading = false;
          this.dialog = false;
        }
      }
    },
    clickSignUp() {
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.tags = "";
      this.$v.form.$reset();
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.chips {
  color: white !important;
}
</style>