<template>
  <v-dialog v-model="dialog" persistent scrollable width="400px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <v-btn color="warning" class="text__14" @click="clickEdit(channelID)">Edit</v-btn>
      </div>
    </template>
    <v-card>
      <v-toolbar dark color="warning">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Channel</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="update()" :loading="loadingSave">Save</v-btn>
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
                  :error-messages="channelErrors"
                  @blur="$v.channel.$touch()"
                  @input="$v.channel.$touch()"
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
                  :error-messages="nameErrors"
                  @blur="$v.name.$touch()"
                  @input="$v.name.$touch()"
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
                  :error-messages="tokenErrors"
                  @blur="$v.token.$touch()"
                  @input="$v.token.$touch()"
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
  props: ["channelID"],
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
          id: 2,
          name: "Facebook"
        },
        {
          id: 3,
          name: "Wordpress"
        }
      ],
      check: false,
      loadingSave: false
    };
  },
  validations: {
    name: { required, maxLength: maxLength(50) },
    token: { required },
    channel: { required },
    form: ["name", "token", "channel"]
  },
  computed: {
    ...mapGetters(["listCustomer", "fanpage"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name of fanpage up to 50 characters");
      !this.$v.name.required && errors.push("Please enter name of fanpage");
      return errors;
    },
    tokenErrors() {
      const errors = [];
      if (!this.$v.token.$dirty) return errors;
      !this.$v.token.required && errors.push("Please enter token of fanpage");
      return errors;
    },
    channelErrors() {
      const errors = [];
      if (!this.$v.channel.$dirty) return errors;
      !this.$v.channel.required &&
        errors.push("Please select channel of fanpage");
      return errors;
    }
  },
  methods: {
    ...mapActions({
      getFanPage: "batchjob/getFanPage",
      getFanPages: "batchjob/getFanPages",
      editFanPage: "batchjob/editFanPage"
    }),
    async clickEdit(event) {
      await this.getFanPage(event);
      this.name = this.fanpage.name;
      this.token = this.fanpage.token;
      this.channel = this.fanpage.channel;
      this.customer = this.fanpage.customer;
      this.id = event;
      this.$v.form.$reset();
    },
    async update() {
      this.loadingSave = true;
      if (this.customer == "") {
        this.customer = 0;
      }
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let status = await this.editFanPage({
          fanpageId: this.id,
          channelId: this.channel,
          customerId: this.customer,
          name: this.name,
          token: this.token
        });
        if (status == 202) {
          this.getFanPages(this.$store.getters.getUser.id);
          this.loadingSave = false;
          this.dialog = false;
        }
      }
      this.loadingSave = false;
    }
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