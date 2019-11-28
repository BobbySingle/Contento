<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" @click="clickSignIn()">Sign In</v-btn>
    </template>
    <v-card min-height="300px">
      <v-toolbar dark color="primary">
        <v-spacer></v-spacer>
        <v-toolbar-title>Sign In</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-8">
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          clearable
          required
          :error-messages="emailErrors"
          @blur="$v.email.$touch()"
          @input="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          @keyup.enter="signIn"
          label="Password"
          outlined
          clearable
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          @click:append="() => (showPassword = !showPassword)"
          :type="showPassword ? 'password' : 'text'"
          required
          :error-messages="passwordErrors"
          @blur="$v.password.$touch()"
          @input="$v.password.$touch()"
        ></v-text-field>
        <!-- <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field type="password" v-model="password" label="Password" required></v-text-field>-->
        <v-row justify="center" no-gutters class=".flex-nowrap">
          <v-btn block color="primary" @click="signIn()">Sign In</v-btn>
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
  email
} from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      email: "",
      password: "",
      showPassword: "visibility",
      loading: false
    };
  },
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32)
    },
    login: ["email", "password"]
  },
  computed: {
    ...mapGetters(["getUser"]),
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
      return errors;
    }
  },
  methods: {
    ...mapActions({
      login: "authentication/login",
      getContent: "viewer/getContent",
      getRecommendNews: "viewer/getRecommendNews"
    }),
    async signIn() {
      this.$v.login.$touch();
      if (!this.$v.login.$invalid) {
        this.loading = true;
        const status = await this.login({
          email: this.email,
          password: this.password
        });
        if (status == 200) {
          await this.getContent({ id: this.getUser.id, tags: [0] });
          if (this.$store.state.authentication.loggedUser) {
            await this.getRecommendNews(this.getUser.id);
          }
          this.loading = false;
          this.dialog = false;
        } else {
          this.loading = false;
        }
      }
    },
    clickSignIn() {
      this.email = "";
      this.password = "";
      this.$v.login.$reset();
    }
  }
};
</script>

<style>
</style>