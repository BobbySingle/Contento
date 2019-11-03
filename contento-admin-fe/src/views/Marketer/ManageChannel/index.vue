<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Manage Channel Publish</h1>
    </v-row>
    <v-row no-gutters class="mx-10">
      <v-col sm="8" md="9">
        <div class="search-filter">
          <v-icon class="icon">searchs</v-icon>
          <input
            class="input-field text__14"
            type="text"
            placeholder="Name"
            name="search"
            v-model="search"
          />
        </div>
      </v-col>
      <v-col sm="4" md="3" style="display:flex; justify-content:flex-end;">
        <create-channel />
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listItems"
            :search="search"
            style="width:100%"
            :mobile-breakpoint="600"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            :loading="loading"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.action="{item}">
              <v-row class="flex-nowrap" justify="center">
                <edit-channel :channelID="item.id" />
              </v-row>
            </template>
          </v-data-table>
          <v-row justify="center">
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateChannel from "../../../components/Popup/CreateChannel.vue";
import EditChannel from "../../../components/Popup/EditChannel.vue";
export default {
  components: { CreateChannel, EditChannel },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      loading: false,
      listItems: [
        {
          id: 1,
          name: "Contento FB Travel",
          channel: "Facebook",
          customer: "",
          lastUpdate: "30/9/2019"
        },
        {
          id: 2,
          name: "FB Sport",
          channel: "Facebook",
          customer: "Customer 1",
          lastUpdate: "30/9/2019"
        },
        {
          id: 3,
          name: "Contento WP Sport",
          channel: "Wordpress",
          customer: "Customer 2",
          lastUpdate: "30/9/2019"
        }
      ],
      headers: [
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        { text: "Channel", value: "channel", sortable: false },
        {
          text: "Customer",
          value: "customer",
          align: "center"
        },
        {
          text: "Last Update",
          value: "lastUpdate",
          align: "center"
        },
        {
          text: "Action",
          value: "action",
          sortable: false,
          align: "center"
        }
      ]
    };
  }
};
</script>

<style scoped>
.search-filter {
  height: 40px;
  display: flex;
  margin-bottom: 10px;
}

/* Style the search icons */
.icon {
  padding-left: 25px;
  background: rgb(100, 100, 100);
  color: white;
  min-width: 50px;
  text-align: center;
}

/* Style the input fields */
.input-field {
  width: 100%;
  padding: 10px;
  border: 2px solid rgb(100, 100, 100);
}

.input-field:focus {
  box-shadow: 0px 0px 5px 5px rgba(45, 118, 255, 0.6);
}
</style>