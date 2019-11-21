<template>
  <v-container>
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
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              type="number"
              v-model="phone"
              label="Phone"
              class="text__14"
              :value="phone"
              :error-messages="phoneErrors"
              @blur="$v.phone.$touch()"
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
                <v-chip v-bind="attrs" :input-value="selected" color="blue" style="color:white">
                  <strong class="text__14">{{ item.name }}</strong>
                </v-chip>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row justify="center" class=".flex-nowrap my-4">
          <v-dialog v-model="dialog" persistent max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" class="mr-2" v-on="on">Change Password</v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Change Password</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="change()" :loading="loadingUpdate">Update</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text class="my-6" style="min-height:250px; padding:0px;">
                <v-row no-gutters class="mx-10">
                  <v-col cols="12">
                    <v-text-field
                      v-model="oldPassword"
                      label="Old Password"
                      placeholder="Input Old Password"
                      clearable
                      :append-icon="showOldPassword ? 'visibility' : 'visibility_off'"
                      @click:append="() => (showOldPassword = !showOldPassword)"
                      :type="showOldPassword ? 'password' : 'text'"
                      required
                      :error-messages="oldPasswordErrors"
                      @blur="$v.oldPassword.$touch(),checkOldPassword()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newPassword"
                      label="New Password"
                      placeholder="Input New Password"
                      clearable
                      :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
                      @click:append="() => (showNewPassword = !showNewPassword)"
                      :type="showNewPassword ? 'password' : 'text'"
                      required
                      :error-messages="newPasswordErrors"
                      @blur="$v.newPassword.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="confirmPassword"
                      label="Confirm Password"
                      placeholder="Input Confirm Password"
                      clearable
                      :append-icon="showConfirmPassword ? 'visibility' : 'visibility_off'"
                      @click:append="() => (showConfirmPassword = !showConfirmPassword)"
                      :type="showConfirmPassword ? 'password' : 'text'"
                      required
                      :error-messages="confirmPasswordErrors"
                      @blur="$v.confirmPassword.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-btn color="success" @click="update()" :loading="loading">Update</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  required,
  between,
  minLength,
  maxLength,
  email,
  sameAs,
  helpers
} from "vuelidate/lib/validators";
import { async } from "q";

const passwordRegex = helpers.regex(
  "passwordRegex",
  /^([^\s]*)+(?=(.*[a-z]){1,})+(?=(.*[A-Z]){1,})+(?=(.*[@#\$]){1,})+(?=(.*\d){1,})+([^\s]+)*$/
);
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      loadingUpdate: false,
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
      ],
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      showOldPassword: "visibility",
      showNewPassword: "visibility",
      showConfirmPassword: "visibility",
      isOldPassword: false,
      tags: []
    };
  },
  validations: {
    firstname: { required, maxLength: maxLength(50) },
    lastname: { required, maxLength: maxLength(50) },
    phone: {
      maxLength: maxLength(10),
      minLength: minLength(10),
      between: between(0, 9999999999)
    },
    age: { between: between(18, 100) },
    email: { email },
    company: { maxLength: maxLength(50) },
    oldPassword: {},
    newPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32),
      passwordRegex
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32),
      passwordRegex,
      sameAsPassword: sameAs("newPassword")
    },
    form: ["firstname", "lastname", "age"],
    formPassword: ["newPassword", "confirmPassword"]
  },
  computed: {
    ...mapGetters(["profile", "listTag"]),
    firstnameErrors() {
      const errors = [];
      if (!this.$v.firstname.$dirty) return errors;
      !this.$v.firstname.maxLength &&
        errors.push("Firstname up to 50 characters");
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
      !this.$v.phone.minLength && errors.push("Phone up to 10 numbers");
      !this.$v.phone.between && errors.push("Phone must be type number");
      !this.$v.phone.required && errors.push("Please enter your phone");
      return errors;
    },
    ageErrors() {
      const errors = [];
      if (!this.$v.age.$dirty) return errors;
      !this.$v.age.between && errors.push("Age must be between 18 - 100");
      return errors;
    },
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.oldPassword.$dirty) return errors;
      !this.isOldPassword &&
        errors.push("The old password you have entered is incorrect");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.minLength &&
        errors.push("Password at least 6 characters");
      !this.$v.newPassword.maxLength &&
        errors.push("Password up to 32 characters");
      !this.$v.newPassword.required &&
        errors.push("Please enter your password");
      !this.$v.newPassword.passwordRegex &&
        errors.push(
          "Password at least one lowercase letters, one uppercase letters, one digits, and one special characters (@,#,$)."
        );
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.minLength &&
        errors.push("Password at least 6 characters");
      !this.$v.confirmPassword.maxLength &&
        errors.push("Password up to 32 characters");
      !this.$v.confirmPassword.required &&
        errors.push("Please enter your password");
      !this.$v.confirmPassword.passwordRegex &&
        errors.push(
          "Password at least one lowercase letters, one uppercase letters, one digits, and one special characters (!,@,#)."
        );
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Confirm password must be same New password");
      return errors;
    }
  },
  methods: {
    ...mapActions({
      getProfileInfo: "authentication/getProfileInfo",
      editProfileInfo: "authentication/editProfileInfo",
      checkPassword: "authentication/checkPassword",
      changePassword: "authentication/changePassword",
      getTags: "viewer/getTags"
    }),
    async fetchData() {
      if (!this.$store.getters.getUser.id) {
        let user = JSON.parse(localStorage.getItem("ProfileUser"));
        await Promise.all([this.getTags(), this.getProfileInfo(user.id)]);
      } else {
        await Promise.all([
          this.getTags(),
          this.getProfileInfo(this.$store.getters.getUser.id)
        ]);
      }
      this.firstname = this.profile.firstName;
      this.lastname = this.profile.lastName;
      this.email = this.profile.email;
      this.gender = this.profile.gender;
      this.age = this.profile.age;
      this.phone = this.profile.phone;
      this.company = this.profile.companyName;
      this.tags = this.profile.idTags;
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
          age: this.age,
          idTags: this.tags
        });
        this.loading = false;
      }
      this.loading = false;
    },
    async change() {
      this.loadingUpdate = true;
      this.$v.formPassword.$touch();
      if (!this.$v.formPassword.$invalid && this.isOldPassword) {
        await this.changePassword({
          email: this.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
        this.loadingUpdate = false;
        this.dialog = false;
      }
      this.loadingUpdate = false;
      this.dialog = false;
    },
    async checkOldPassword() {
      let status = await this.checkPassword({
        email: this.email,
        oldPassword: this.oldPassword
      });
      if (status == 202) {
        this.isOldPassword = true;
      } else {
        this.isOldPassword = false;
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style>
</style>