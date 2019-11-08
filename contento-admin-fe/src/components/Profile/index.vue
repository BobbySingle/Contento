<template>
  <v-container>
    <v-row justify="center" class="mt-3">
      <v-avatar color="grey" size="100">
        <span class="white--text headline">{{avaterName}}</span>
      </v-avatar>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="firstname"
              label="First name:"
              class="text__14"
              :value="firstname"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="lastname"
              label="Last name:"
              class="text__14"
              required
              :value="lastname"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="email" label="Email:" class="text__14" required :value="email"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select v-model="gender" label="Gender:" class="text__14" item-value="id" item-text="name" :value="gender" :items="genders" required></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="age"
              type="number"
              label="Age"
              class="text__14"
              required
              :value="age"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="phone" label="Phone" class="text__14" :value="phone" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="company"
              label="Company:"
              class="text__14"
              required
              :value="company"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" class=".flex-nowrap my-4">
          <v-btn color="primary" class="mr-2">Change Password</v-btn>
          <v-btn color="success">Update</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { async } from "q";
export default {
  data() {
    return {
      avaterName: "V",
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      age: "",
      phone: "",
      company: "",
      genders: [
        {
          id: 1,
          name: "Male"
        },
        {
          id: 2,
          name: "Female"
        },
        {
          id: 3,
          name: "Others"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["profile"])
  },
  methods: {
    ...mapActions({ getProfileInfo: "authentication/getProfileInfo" }),
    async fetchData() {
      await this.getProfileInfo(this.$store.getters.getUser.id);
      this.firstname = this.profile.firstName;
      this.lastname = this.profile.lastName;
      this.email = this.profile.email;
      this.gender = this.profile.gender;
      this.age = this.profile.age;
      this.phone = this.profile.phone;
      this.company = this.profile.companyName;
    }
  },
  mounted(){
    this.fetchData();
  }
};
</script>

<style>
</style>