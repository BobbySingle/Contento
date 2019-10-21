<template>
  <v-container fluid class="login">
    <v-row class="login-child">
      <div class="login-form">
        <v-col>
          <v-row justify="center" class="mb-2">
            <h1 style="color:white; font-weight:300;">Producer Login</h1>
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
          ></v-text-field>
          <v-row justify="end" class="px-3">
            <v-btn block color="primary" height="56" @click="submit">Login</v-btn>
          </v-row>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: "visibility"
    };
  },
  methods: {
    ...mapActions({
      login: "authentication/login"
    }),
    async submit() {
      await this.login({ email: this.email, password: this.password });
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