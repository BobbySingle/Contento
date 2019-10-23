 <template>
  <v-dialog v-model="dialog" persistent width="400px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <v-btn fab color="primary" small v-if="isSmallBtn">
          <v-icon color="white">add</v-icon>
        </v-btn>
        <v-btn color="primary" v-if="!isSmallBtn" class="text__14">Create New Customer</v-btn>
      </div>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="text__17">Add New Customer</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10 mb-4" justify="center">
        <v-col md="10">
          <v-row>
            <v-text-field v-model="fullname" label="Fullname:" required class="text__14"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field v-model="phone" label="Phone:" required class="text__14"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field v-model="email" label="Email:" required class="text__14"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field v-model="company" label="Company:" required class="text__14"></v-text-field>
            <!-- :counter="255" -->
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false" class="text__14">Cancel</v-btn>
        <v-btn color="success" @click="dialog = false, create()" class="text__14">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    isSmallBtn: Boolean
  },
  data() {
    return {
      dialog: false,
      fullname: "",
      phone: "",
      email: "",
      company: ""
    };
  },
  methods: {
    ...mapActions({
      createCustomer: "authentication/createCustomer"
    }),
    create() {
      this.createCustomer({
        email: this.email,
        fullName: this.fullname,
        companyName: this.company,
        idMarketer: this.$store.getters.getUser.id
      });
    }
  }
};
</script>