<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Sign In</v-btn>
    </template>
    <v-card min-height="250px">
      <v-toolbar dark color="primary">
        <v-spacer></v-spacer>
        <v-toolbar-title>Sign In</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field type="password" v-model="password" label="Password" required></v-text-field>
        <v-row justify="center" no-gutters class=".flex-nowrap">
          <v-btn block color="primary" @click="create()">Sign In</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      email: "",
      password: ""
    };
  }
};
</script>

<style>
</style>