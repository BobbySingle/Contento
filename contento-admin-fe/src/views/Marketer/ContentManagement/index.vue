<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">List Content</h1>
    </v-row>
    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listTaskByMarketerID"
            style="width:100%;"
            class="text__14"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            :loading="loading"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="item.status.color" dark class="text__14">{{item.status.name}}</v-chip>
            </template>
            <template v-slot:item.publishTime="{ item }">
              <span>{{item.publishTime | moment("HH:mm DD/MM/YYYY")}}</span>
            </template>
            <template v-slot:item.action="{item}">
              <v-btn
                class="text__14"
                color="primary"
                v-if="item.status.id === 5"
                @click="publish(item.id)"
              >Publish</v-btn>
              <v-btn
                class="text__14"
                color="primary"
                v-if="item.status.id === 6"
                @click="publish(item.id)"
              >Change</v-btn>
              <v-btn
                class="text__14"
                disabled
                v-if="item.status.id != 5 && item.status.id != 6"
              >Publish</v-btn>
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
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      /**End Pagination */
      dialog: false,
      menu: false,
      loading: false,
      /**List Content */
      headers: [
        {
          text: "#",
          align: "left",
          value: "id",
          width: "8%"
        },
        { text: "Title", value: "title", sortable: false, width: "40%" },
        {
          text: "Implementer",
          value: "writer.name",
          align: "center",
          width: "16%"
        },
        {
          text: "Publish Time",
          value: "publishTime",
          align: "center",
          width: "16%"
        },
        { text: "Status", value: "status", align: "center", width: "10%" },
        {
          text: "Action",
          value: "action",
          align: "center",
          sortable: false,
          width: "10%"
        }
      ]
    };
  },
  methods: {
    publish(event) {
      sessionStorage.setItem("ContentID", JSON.stringify(event));
      this.$router.push("/PublishChannel");
    },
    ...mapActions({
      getListTaskByMarketerID: "contentprocess/getListTaskByMarketerID"
    }),
    async fetchData() {
      this.loading = true;
      await this.getListTaskByMarketerID(this.$store.getters.getUser.id);
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters(["getUser", "listTaskByMarketerID"])
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
  }
};
</script>


