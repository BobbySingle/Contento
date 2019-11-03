<template>
  <v-dialog v-model="dialog" persistent scrollable width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on" class="text__14" @click="clickCreate()">Create Channel</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Channel</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="create()" :loading="loadingCreate">Create</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="min-height: 300px; padding:0px;">
        <v-row no-gutters class="mx-10">
          <v-col cols="12" md="12">
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="channel"
                  :items="listChannel"
                  item-text="name"
                  item-value="id"
                  label="Channel"
                  prepend-inner-icon="public"
                  clearable
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="customer"
                  :items="listCustomer"
                  item-text="name"
                  item-value="id"
                  label="Customer"
                  prepend-inner-icon="account_circle"
                  clearable
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  :counter="50"
                  label="Name"
                  class="text__14"
                  prepend-inner-icon="title"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="token"
                  label="Token"
                  class="text__14"
                  prepend-inner-icon="vpn_key"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      menu: false,
      name: "",
      token: "",
      channel: "",
      customer: "",
      listChannel: [
        {
          id: 1,
          name: "Facebook"
        },
        {
          id: 2,
          name: "Wordpress"
        }
      ],
      firstTimeLoad: true,
      check: false,
      loadingCreate: false
    };
  },
  validations: {},
  computed: {
    ...mapGetters(["listCustomer"])
  },
  methods: {
    clickCreate() {},
    create() {}
  }
};
</script>
<style scoped>
.out-endtime {
  display: flex;
  align-items: center;
  height: 100%;
}
.endtime {
  height: 32px;
  width: 100%;
  padding-top: 5px;
}
.chips {
  color: white !important;
}

.datetime {
  width: 100%;
  padding-left: 10px;
}
</style>