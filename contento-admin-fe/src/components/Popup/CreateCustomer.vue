 <template>
  <v-dialog v-model="dialog" persistent width="400px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <v-btn fab color="primary" small v-if="isSmallBtn" @click="clickCreate()">
          <v-icon color="white">add</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          v-if="!isSmallBtn"
          class="text__14"
          @click="clickCreate()"
        >Create Customer</v-btn>
      </div>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="text__17">Add Customer</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10 mb-4" justify="center">
        <v-col md="10">
          <v-row>
            <v-text-field
              v-model="firstname"
              label="First name:"
              required
              class="text__14"
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
              :error-messages="emailErrors"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="company"
              label="Company:"
              required
              class="text__14"
              :error-messages="companyErrors"
              @blur="$v.company.$touch()"
            ></v-text-field>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false" class="text__14">Cancel</v-btn>
        <v-btn color="success" @click="create()" class="text__14">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
import {
  required,
  maxLength,
  email,
  minLength
} from "vuelidate/lib/validators";
export default {
  props: {
    isSmallBtn: Boolean
  },
  data() {
    return {
      dialog: false,
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      company: ""
    };
  },
  validations: {
    firstname: { required, maxLength: maxLength(50) },
    lastname: { required, maxLength: maxLength(50) },
    phone: { required, maxLength: maxLength(10), minLength: minLength(10) },
    email: { required, email },
    company: { required, maxLength: maxLength(50) },
    form: ["firstname", "lastname", "phone", "email", "company"]
  },
  computed: {
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
      createCustomer: "authentication/createCustomer"
    }),
    async create() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let status = await this.createCustomer({
          email: this.email,
          firstName: this.firstname,
          lastName: this.lastname,
          phone: this.phone,
          companyName: this.company,
          idMarketer: this.$store.getters.getUser.id
        });
        if (status == 202) {
          this.dialog = false;
        }
      }
    },
    clickCreate() {
      this.firstname = "";
      this.lastname = "";
      this.phone = "";
      this.email = "";
      this.company = "";
      this.$v.form.$reset();
    }
  }
};
</script>