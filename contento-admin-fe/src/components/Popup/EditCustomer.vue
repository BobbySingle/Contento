 <template>
  <v-dialog v-model="dialog" persistent width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="warning" icon class="mr-2 text__14" v-on="on" @click="clickEdit(customerID)">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="text__h1">Edit Customer</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10 mb-4" justify="center">
        <v-col md="10">
          <v-row>
            <v-text-field
              v-model="firstname"
              label="First name:"
              required
              class="text__14"
              :value="firstname"
              :error-messages="firstnameErrors"
              @blur="$v.firstname.$touch()"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="lastname"
              label="Last name:"
              required
              class="text__14"
              :value="lastname"
              :error-messages="lastnameErrors"
              @blur="$v.lastname.$touch()"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="phone"
              type="number"
              label="Phone:"
              required
              class="text__14"
              :value="phone"
              :error-messages="phoneErrors"
              @blur="$v.phone.$touch()"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="email"
              label="Email:"
              required
              class="text__14"
              :value="email"
              :error-messages="emailErrors"
              readonly
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="company"
              label="Company:"
              required
              class="text__14"
              :value="company"
              :error-messages="companyErrors"
              @blur="$v.company.$touch()"
            ></v-text-field>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false" class="text__14">Cancel</v-btn>
        <v-btn color="success" @click="update()" class="text__14">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {
  required,
  maxLength,
  email,
  minLength
} from "vuelidate/lib/validators";
export default {
  props: ["customerID"],
  data() {
    return {
      dialog: false,
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      company: "",
      id: ""
    };
  },
  validations: {
    firstname: { required, maxLength: maxLength(50) },
    lastname: { required, maxLength: maxLength(50) },
    phone: { required, minLength: minLength(10), maxLength: maxLength(10) },
    email: { required, email },
    company: { required, maxLength: maxLength(50) },
    form: ["firstname", "lastname", "phone", "email", "company"]
  },
  computed: {
    ...mapGetters(["customerDetail"]),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Please enter your email");
      !this.$v.email.email && errors.push("Invalid email");
      return errors;
    },
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
      !this.$v.phone.minLength && errors.push("Phone up to 10 numbers");
      !this.$v.phone.required && errors.push("Please enter your phone");
      return errors;
    },
    companyErrors() {
      const errors = [];
      if (!this.$v.company.$dirty) return errors;
      !this.$v.company.maxLength && errors.push("Company up to 50 characters");
      !this.$v.company.required && errors.push("Please enter your company");
      return errors;
    }
  },
  methods: {
    ...mapActions({
      editCustomer: "authentication/editCustomer",
      getCustomerDetailByCustomerID:
        "authentication/getCustomerDetailByCustomerID"
    }),
    async clickEdit(event) {
      await this.getCustomerDetailByCustomerID(event);
      this.firstname = this.customerDetail.firstName;
      this.lastname = this.customerDetail.lastName;
      this.email = this.customerDetail.email;
      this.phone = this.customerDetail.phone;
      this.company = this.customerDetail.companyName;
      this.id = this.customerDetail.id;
      this.$v.form.$reset();
    },
    async update() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let status = await this.editCustomer({
          id: this.id,
          email: this.email,
          firstName: this.firstname,
          lastName: this.lastname,
          phone: this.phone,
          companyName: this.company
        });
        if (status == 202) {
          this.dialog = false;
        }
      }
    }
  }
};
</script>