<template>
  <v-dialog v-model="dialog" persistent scrollable width="600px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <v-btn color="primary" class="text__14" @click="clickCreate()">Create Channel</v-btn>
      </div>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add New Channel</v-toolbar-title>
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
                  :error-messages="channelErrors"
                  @change="changeChannel"
                  @blur="$v.channel.$touch(),setLink()"
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
                <v-select
                  v-model="tags"
                  :items="listTag"
                  item-text="name"
                  item-value="id"
                  label="Category"
                  prepend-inner-icon="category"
                  multiple
                  chips
                  clearable
                  required
                  :error-messages="tagsErrors"
                  @blur="$v.tags.$touch()"
                >
                  <template v-slot:prepend-item>
                    <v-list-item ripple @click="toggle">
                      <v-list-item-action>
                        <v-icon :color="listTag.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>Select All</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                </v-select>
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
                  @blur="$v.token.$touch(),setLink()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="link"
                  label="Link"
                  class="text__14"
                  prepend-inner-icon="public"
                  :placeholder="placeholder"
                  required
                  readonly
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
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      menu: false,
      name: "",
      link: "",
      token: "",
      channel: "",
      customer: "",
      tags: [],
      loadingCreate: false,
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
      firstTimeLoad: true,
      check: false,
      loadingCreate: false,
      placeholder: "",
      wrongTokenErrors: ""
    };
  },
  validations: {
    name: { required, maxLength: maxLength(50) },
    token: { required },
    channel: { required },
    tags: { required },
    form: ["name", "token", "channel", "tags"]
  },
  computed: {
    icon() {
      if (this.selectAllTags) return "mdi-close-box";
      if (this.selectSomeTags) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    selectAllTags() {
      return this.tags.length === this.listTag.length;
    },
    selectSomeTags() {
      return this.tags.length > 0 && !this.selectAllTags;
    },
    ...mapGetters(["listCustomer", "listTag", "linkFanpage"]),
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
      if (this.wrongTokenErrors) {
        errors.push(this.wrongTokenErrors);
      }
      return errors;
    },
    channelErrors() {
      const errors = [];
      if (!this.$v.channel.$dirty) return errors;
      !this.$v.channel.required &&
        errors.push("Please select channel of fanpage");
      return errors;
    },
    tagsErrors() {
      const errors = [];
      if (!this.$v.tags.$dirty) return errors;
      !this.$v.tags.required &&
        errors.push("Please select category of fanpage");
      return errors;
    }
  },
  methods: {
    async setLink() {
      let status = await this.checkTokenGetLink({
        channelId: this.channel,
        token: this.token
      });
      if (status == 202) {
        this.link = this.linkFanpage;
        this.wrongTokenErrors = "";
      } else {
        if (!this.channel == "") {
          this.placeholder = "Link is not exist. Please check token again";
          this.wrongTokenErrors = "Token is not valid";
        } else {
          this.wrongTokenErrors = "Please choose a channel first";
        }
      }
    },
    async changeChannel() {
      let status = await this.checkTokenGetLink({
        channelId: this.channel,
        token: this.token
      });
      if (status == 202) {
        this.link = this.linkFanpage;
        this.wrongTokenErrors = "";
      } else {
        if (!this.channel == "") {
          this.wrongTokenErrors = "Token is not valid";
        } else {
          this.wrongTokenErrors = "Please choose a channel first";
        }
      }
    },
    toggle() {
      this.$nextTick(() => {
        if (this.selectAllTags) {
          this.tags = [];
        } else {
          this.tags = [];
          this.listTag.forEach(i => {
            this.tags = this.tags.concat(i.id);
          });
        }
      });
    },
    ...mapActions({
      createFanPage: "batchjob/createFanPage",
      getFanPages: "batchjob/getFanPages",
      checkTokenGetLink: "batchjob/checkTokenGetLink"
    }),
    async create() {
      this.check = true;
      this.loadingCreate = true;
      if (this.customer == "") {
        this.customer = 0;
      }
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let status = await this.createFanPage({
          channelId: this.channel,
          customerId: this.customer,
          marketerId: this.$store.getters.getUser.id,
          name: this.name,
          token: this.token,
          tags: this.tags
        });
        if (status == 202) {
          this.getFanPages(this.$store.getters.getUser.id);
          this.loadingCreate = false;
          this.dialog = false;
        }
      }
      this.loadingCreate = false;
    },
    clickCreate() {
      this.name = "";
      this.token = "";
      this.channel = "";
      this.customer = "";
      this.link = "";
      this.tags = [];
      this.placeholder = "";
      this.wrongTokenErrors = "";
      this.$v.form.$reset();
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