<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Manage Publish Content</h1>
    </v-row>
    <!-- /**Begin Search  */ -->
    <v-row no-gutters class="mx-6">
      <v-col cols="12">
        <div class="search-filter">
          <v-icon class="icon">searchs</v-icon>
          <input
            class="input-field text__14"
            type="text"
            placeholder="Title"
            name="search"
            v-model="search"
          />
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-6 mb-2">
      <v-expansion-panels :accordion="true" :focusable="true" multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14">Advanced Filter:</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class=".flex-nowrap">
              <v-col cols="12" sm="6" md="3">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="[Publish]From Time"
                      type="datetime"
                      v-model="publishFromDate"
                      placeholder="[Publish] From time"
                      input-class="css_time"
                      value-zone="UTC+07:00"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="publishFromDate">
                    <v-btn icon @click="clearPublishFromDate()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="[Publish]To Time"
                      type="datetime"
                      v-model="publishToDate"
                      placeholder="[Publish] To time"
                      input-class="css_time"
                      value-zone="UTC+07:00"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="publishToDate">
                    <v-btn icon @click="clearPublishToDate()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="writer"
                  :items="listWriterByMarketerID"
                  item-text="name"
                  item-value="id"
                  label="Writer"
                  prepend-inner-icon="edit"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="status"
                  :items="listStatusPublish"
                  item-text="name"
                  item-value="id"
                  label="Status"
                  prepend-inner-icon="filter_list"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-row justify="end">
                  <v-btn color="primary" @click="Clear()">Clear</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <!-- /** End Search */ -->

    <v-row no-gutters class="mx-10">
      <v-col cols="12">
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
            <template v-slot:item.writer="{ item }">{{item.writer.name}}</template>
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
      panel: [],
      /**End Pagination */
      dialog: false,
      menu: false,
      loading: false,
      /**Filter */
      search: "",
      publishFromDate: "",
      publishToDate: "",
      writer: "",
      status: "",

      /**List Content */
      headers: [
        // {
        //   text: "#",
        //   align: "left",
        //   value: "id",
        //   width: "8%"
        // },
        { text: "Title", value: "title", sortable: false, width: "40%" },
        {
          text: "Implementer",
          value: "writer",
          align: "center",
          width: "16%",
          sortable: false,
          filter: value => {
            if (!this.writer) return true;
            return value.id == this.writer;
          }
        },
        {
          text: "Publish Time",
          value: "publishTime",
          align: "center",
          width: "16%",
          filter: value => {
            if (!this.publishFromDate && !this.publishToDate) return true;
            if (this.publishFromDate != "" && this.publishToDate == "") {
              return this.publishFromDate <= value;
            } else if (this.publishFromDate == "" && this.publishToDate != "") {
              return value <= this.publishToDate;
            } else {
              return (
                this.publishFromDate <= value && value <= this.publishToDate
              );
            }
          }
        },
        {
          text: "Status",
          value: "status",
          align: "center",
          width: "10%",
          sortable: false,
          filter: value => {
            if (!this.status) return true;
            return value.id == this.status;
          }
        },
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
    Clear() {
      this.publishFromDate = "";
      this.publishToDate = "";
      this.writer = "";
      this.status = "";
    },
    clearPublishFromDate() {
      this.publishFromDate = "";
    },
    clearPublishToDate() {
      this.publishToDate = "";
    },
    publish(event) {
      sessionStorage.setItem("ContentID", JSON.stringify(event));
      this.$router.push("/PublishChannel");
    },
    ...mapActions({
      getListTaskByMarketerID: "contentprocess/getListTaskByMarketerID",
      getListStatusPublish: "contentprocess/getListStatusPublish",
      getListWriterByMarketerID: "authentication/getListWriterByMarketerID"
    }),
    async fetchData() {
      this.loading = true;
      await Promise.all([
        this.getListTaskByMarketerID(this.$store.getters.getUser.id),
        this.getListWriterByMarketerID(this.$store.getters.getUser.id),
        this.getListStatusPublish()
      ]);
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters([
      "getUser",
      "listTaskByMarketerID",
      "listWriterByMarketerID",
      "listStatusPublish"
    ])
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
<style scoped>
::v-deep .css_time {
  cursor: pointer;
  padding-left: 10px;
  padding-top: 10px;
}
.out_css_time {
  background: url(../../../assets/calendar.png) no-repeat scroll 7px 7px;
  width: 100%;
  padding-left: 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #737373;
  overflow: hidden;
}

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

.filter {
  height: 40px;
  display: flex;
}
</style>


