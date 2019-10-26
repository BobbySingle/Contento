<template>
  <v-container fluid class="login">
    <v-row class="login-child">
      <div class="login-form">
        <v-col>
          <v-row justify="center" class="mb-2">
            <h1 style="color:white; font-weight:300;">CONTENTO</h1>
          </v-row>
          <v-text-field
            v-model="email"
            label="Email"
            placeholder="Input Email"
            outlined
            solo
            single-line
            clearable
            prepend-inner-icon="email"
            required
            :error-messages="emailErrors"
            @blur="$v.email.$touch()"
            @input="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            placeholder="Input Password"
            outlined
            solo
            single-line
            clearable
            prepend-inner-icon="vpn_key"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            @click:append="() => (showPassword = !showPassword)"
            :type="showPassword ? 'password' : 'text'"
            required
            :error-messages="passwordErrors"
            @blur="$v.password.$touch()"
            @input="$v.password.$touch()"
          ></v-text-field>
          <v-row justify="end" class="px-3">
            <v-btn block color="primary" height="56" @click="submit" :loading="loading">Login</v-btn>
          </v-row>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import {
  required,
  minLength,
  maxLength,
  email
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
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
      login: "authentication/login"
    }),
    async submit() {
      this.$v.login.$touch();
      if (!this.$v.login.$invalid) {
        this.loading = true;
        const logged = await this.login({
          email: this.email,
          password: this.password
        });
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login {
  background: linear-gradient(135deg, #242e4d, #897e79);
  height: 100%;
  position: relative;
}
.login-child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-form {
  border-top: 3px solid #1976d2;
  width: 400px;
  height: 320px;
  background-color: #0000003b;
}
</style>