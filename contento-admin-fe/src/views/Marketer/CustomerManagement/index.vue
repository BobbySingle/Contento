<template>
  <v-container>
    <v-row justify="center" no-gutters class="mx-4">
      <v-col cols="12" sm="8" md="9" style="display:flex; justify-content:center;">
        <h1 class="text__h1">List Customer</h1>
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
          :items="listCampaigns"
          style="width:100%;"
          class="text__14"
          :mobile-breakpoint="600"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item.fullname="{item}">
            <div style="text-align:left">{{item.fullname}}</div>
          </template>
          <template v-slot:item.action="{item}">
            <v-row justify="center" class="flex-nowrap">
              <popup-edit-customer :customer="item"></popup-edit-customer>
              <v-btn color="primary" router to="/CustomerCampaigns" class="text__14">Details</v-btn>
            </v-row>
          </template>
        </v-data-table>
        <v-row justify="center">
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-row>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
import PopupCreateCustomer from "../../../components/Popup/CreateCustomer.vue";
import PopupEditCustomer from "../../../components/Popup/EditCustomer.vue";
export default {
  components: { PopupCreateCustomer, PopupEditCustomer },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      /**End Pagination */
      headers: [
        { text: "Fullname", value: "fullname", align: "center" },
        { text: "Email", value: "email", align: "center" },
        { text: "Company", value: "company", align: "center" },
        { text: "Phone", value: "phone", align: "center" },
        { text: "Action", value: "action", align: "center" ,sortable:false}
      ],
      listCampaigns: [
        {
          id: 5,
          fullname: "Hachiko",
          email: "Hachiko@gmail.com",
          phone: "0123456789",
          company: "Hachiko lnc"
        },
        {
          id: 6,
          fullname: "Cậu Vàng",
          email: "CauVang@gmail.com",
          phone: "0123456789",
          company: "Lao Hac lnc"
        },
        {
          id: 9,
          fullname: "Big Pull",
          email: "BigPull@gmail.com",
          phone: "0123456789",
          company: "Pet lnc"
        },
        {
          id: 19,
          fullname: "Big Pull",
          email: "BigPull@gmail.com",
          phone: "0123456789",
          company: "Pet lnc"
        },
        {
          id: 29,
          fullname: "Big Pull",
          email: "BigPull@gmail.com",
          phone: "0123456789",
          company: "Pet lnc"
        },
        {
          id: 39,
          fullname: "Big Pull",
          email: "BigPull@gmail.com",
          phone: "0123456789",
          company: "Pet lnc"
        }
      ]
    };
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