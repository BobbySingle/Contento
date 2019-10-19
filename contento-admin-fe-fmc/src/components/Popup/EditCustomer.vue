 <template>
  <v-dialog v-model="dialog" persistent width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="warning" class="mr-2 text__14" v-on="on" >Edit</v-btn>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="text__h1">Edit Customer</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10 mb-4" justify="center">
        <v-col md="10">
          <v-row>
            <v-text-field
              :counter="255"
              label="Fullname:"
              required
              v-model="fullname"
              :value="customer.fullname"
              class="text__14"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              :counter="255"
              label="Phone:"
              required
              v-model="phone"
              :value="customer.phone"
              class="text__14"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              :counter="255"
              label="Email:"
              required
              v-model="email"
              :value="customer.email"
              class="text__14"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              :counter="255"
              label="Company:"
              required
              v-model="company"
              :value="customer.company"
              class="text__14"
            ></v-text-field>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false" class="text__14">Cancel</v-btn>
        <v-btn color="success" @click="dialog = false" class="text__14">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["customer"],
  data() {
    return {
      dialog: false,
      fullname: "",
      email: "",
      phone: "",
      company: ""
    };
  },
  mounted() {
    this.fullname = this.customer.fullname;
    this.email = this.customer.email;
    this.phone = this.customer.phone;
    this.company = this.customer.company;
  }
};
</script>