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
              :value="lastname"
              :error-messages="lastnameErrors"
              @blur="$v.lastname.$touch()"
              @input="$v.lastname.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              label="Email:"
              class="text__14"
              required
              :value="email"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="gender"
              label="Gender:"
              class="text__14"
              item-value="id"
              item-text="name"
              :value="gender"
              :items="genders"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="age"
              type="number"
              label="Age"
              class="text__14"
              :value="age"
              :error-messages="ageErrors"
              @blur="$v.age.$touch()"
              @input="$v.age.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              type="number"
              v-model="phone"
              label="Phone*"
              class="text__14"
              :value="phone"
              required
              :error-messages="phoneErrors"
              @blur="$v.phone.$touch()"
              @input="$v.phone.$touch()"
            ></v-text-field>
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
          <v-btn color="success" @click="update()" :loading="loading">Update</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, between, maxLength, email } from "vuelidate/lib/validators";
import { async } from "q";
export default {
  data() {
    return {
      loading: false,
      avaterName: "",
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
  validations: {
    firstname: { required, maxLength: maxLength(50) },
    lastname: { required, maxLength: maxLength(50) },
    phone: {
      required,
      maxLength: maxLength(10),
      between: between(0, 9999999999)
    },
    age: { between: between(18, 100) },
    email: { email },
    company: { maxLength: maxLength(50) },
    form: ["firstname", "lastname", "phone", "age"]
  },
  computed: {
    ...mapGetters(["profile"]),
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
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.maxLength && errors.push("Phone up to 10 numbers");
      !this.$v.phone.between && errors.push("Phone must be type number");
      !this.$v.phone.required && errors.push("Please enter your phone");
      return errors;
    },
    ageErrors() {
      const errors = [];
      if (!this.$v.age.$dirty) return errors;
      !this.$v.age.between && errors.push("Age must be between 18 - 100");
      return errors;
    }
  },
  methods: {
    ...mapActions({
      getProfileInfo: "authentication/getProfileInfo",
      editProfileInfo: "authentication/editProfileInfo"
    }),
    async fetchData() {
      await this.getProfileInfo(this.$store.getters.getUser.id);
      this.avaterName =
        this.profile.firstName.slice(0, 1) + this.profile.lastName.slice(0, 1);
      this.firstname = this.profile.firstName;
      this.lastname = this.profile.lastName;
      this.email = this.profile.email;
      this.gender = this.profile.gender;
      this.age = this.profile.age;
      this.phone = this.profile.phone;
      this.company = this.profile.companyName;
    },
    async update() {
      this.loading = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        await this.editProfileInfo({
          id: this.$store.getters.getUser.id,
          firstName: this.firstname,
          lastName: this.lastname,
          companyName: this.company,
          phone: this.phone,
          gender: this.gender,
          age: this.age
        });
        this.loading = false;
      }
      this.loading = false;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style>
</style>