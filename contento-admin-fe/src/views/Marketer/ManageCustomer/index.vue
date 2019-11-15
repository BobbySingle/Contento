<template>
  <v-container>
    <v-row justify="center" no-gutters class="mx-4">
      <v-col cols="12" sm="8" md="9" style="display:flex; justify-content:center;">
        <h1 class="text__h1">Manage Customer</h1>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <v-row class="ml-1 mb-5">
          <v-col cols="12" style="display: flex;
    justify-content: center;">
            <popup-create-customer :isSmallBtn="false" />
          </v-col>
        </v-row>
      </v-col>
      <v-row class="mx-4">
        <v-data-table
          :headers="headers"
          :items="listInfoCustomer"
          style="width:100%;"
          class="text__14"
          :mobile-breakpoint="600"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          :loading="loading"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.fullname="{item}">
            <div style="text-align:left">{{item.fullname}}</div>
          </template>
          <template v-slot:item.action="{item}">
            <v-row justify="center" class="flex-nowrap">
              <popup-edit-customer :customerID="item.id"></popup-edit-customer>
              <v-btn color="primary" @click="details(item.id)" class="text__14">Details</v-btn>
            </v-row>
          </template>
        </v-data-table>
        <v-row justify="center">
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
          </div>
        </v-row>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
import PopupCreateCustomer from "../../../components/Popup/CreateCustomer.vue";
import PopupEditCustomer from "../../../components/Popup/EditCustomer.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { PopupCreateCustomer, PopupEditCustomer },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      loading: false,
      /**End Pagination */
      headers: [
        { text: "Fullname", value: "fullName", align: "center" },
        { text: "Email", value: "email", align: "center" },
        { text: "Company", value: "companyName", align: "center" },
        { text: "Phone", value: "phone", align: "center" },
        { text: "Action", value: "action", align: "center", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters(["getUser", "listInfoCustomer"])
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Marketer" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    details(event) {
      sessionStorage.setItem("customerID", event);
      this.$router.push("/CustomerCampaigns");
    },
    ...mapActions({
      getListInfoCustomer: "authentication/getListInfoCustomer"
    }),
    async fetchData() {
      this.loading = true;
      await this.getListInfoCustomer(this.$store.getters.getUser.id);
      this.loading = false;
    }
  }
};
</script>
<style scoped>
/**Begin Status - line */

.campaign_success {
  /* border-left: 4px solid #3cd1c2; */
  border-left: 4px solid #4caf50;
  height: 100%;
}
.campaign_on_going {
  /* border-left: 4px solid orange; */
  border-left: 4px solid #fb8c00;
  height: 100%;
}
.campaign_overdue {
  /* border-left: 4px solid tomato; */
  border-left: 4px solid #ff5252;
  height: 100%;
}
/**End Status - line */
</style>