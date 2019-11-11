<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Sign Up</v-btn>
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
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="lastname"
              label="Last name*"
              class="text__14"
              required
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
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              label="Password*"
              clearable
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              @click:append="() => (showPassword = !showPassword)"
              :type="showPassword ? 'password' : 'text'"
              required
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
          <v-btn block color="primary" @click="create()">Sign In</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      tags: "",
      showPassword: "visibility"
    };
  },
  computed: {
    ...mapGetters(["getUser", "listTag"])
  },
  methods: {
    ...mapActions({
      getListTag: "contentprocess/getListTag"
    }),
    async fetchData() {
      await Promise.all([this.getListTag()]);
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