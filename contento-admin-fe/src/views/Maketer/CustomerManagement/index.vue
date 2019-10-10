<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="12">
        <v-row class="ml-1 mb-5">
          <v-col cols="4" style="display: flex;
    justify-content: flex-start;">
            <h3 style="color:grey;">List Task</h3>
          </v-col>
          <v-col cols="8" style="display: flex;
    justify-content: flex-end;">
            <popup-create-customer :isSmallBtn="false"/>
          </v-col>
        </v-row>
        <v-row class="mx-4">
          <v-data-table :headers="headers" :items="listCampaigns" style="width:100%;">
            <template v-slot:item.fullname="{item}">
              <!-- <v-row
                style="height:100px;"
                justify="center"
                align="center"
                v-bind:class="{ campaign_success:item.status== 1, campaign_on_going:item.status == 2,campaign_overdue:item.status == 3}"
              >
              <v-col>-->
              <div style="text-align:left">{{item.fullname}}</div>
              <!-- </v-col>
              </v-row>-->
            </template>
            <template v-slot:item.action="{item}">
              <v-row justify="center">
                <v-btn color="warning" class="mr-2">Edit</v-btn>
                <v-btn color="primary">Details</v-btn>
              </v-row>
            </template>
          </v-data-table>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PopupCreateCustomer from "../../../components/Popup/CreateCustomer.vue";
export default {
  components: { PopupCreateCustomer },
  data() {
    return {
      headers: [
        { text: "Fullname", value: "fullname", align: "center" },
        { text: "Email", value: "email", align: "center" },
        { text: "Company", value: "company", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],
      listCampaigns: [
        {
          id: 5,
          fullname: "Hachiko",
          email: "Hachiko@gmail.com",
          company: "Hachiko lnc"
        },
        {
          id: 6,
          fullname: "Cậu Vàng",
          email: "CauVang@gmail.com",
          company: "Lao Hac lnc"
        },
        {
          id: 9,
          fullname: "Big Pull",
          email: "BigPull@gmail.com",
          company: "Pet lnc"
        },
                {
          id: 19,
          fullname: "Big Pull",
          email: "BigPull@gmail.com",
          company: "Pet lnc"
        },
                {
          id: 29,
          fullname: "Big Pull",
          email: "BigPull@gmail.com",
          company: "Pet lnc"
        },
                {
          id: 39,
          fullname: "Big Pull",
          email: "BigPull@gmail.com",
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