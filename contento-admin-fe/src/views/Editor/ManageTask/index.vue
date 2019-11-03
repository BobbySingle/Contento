<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Manage Task</h1>
    </v-row>
    <!-- /**Begin Search  */ -->
    <v-row no-gutters class="mx-6 mb-2">
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
                      title="[End]From Time"
                      type="datetime"
                      v-model="endFromDate"
                      placeholder="[End] From time"
                      input-class="css_time"
                      value-zone="UTC+07:00"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="endFromDate">
                    <v-btn icon @click="clearEndFromDate()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-row class=".flex-nowrap mt-3" no-gutters>
                  <v-col cols="10">
                    <datetime
                      title="[End]To Time"
                      type="datetime"
                      v-model="endToDate"
                      placeholder="[End] To time"
                      input-class="css_time"
                      value-zone="UTC+07:00"
                      class="text__14 out_css_time"
                      auto
                    ></datetime>
                  </v-col>
                  <v-col cols="2" v-if="endToDate">
                    <v-btn icon @click="clearEndToDate()">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="status"
                  :items="listStatusTask"
                  item-text="name"
                  item-value="id"
                  label="Status"
                  prepend-inner-icon="filter_list"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-row justify="center">
                  <v-btn color="primary" @click="reset()">Reset</v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <!-- /** End Search */ -->

    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listTaskByEditorID"
            :search="search"
            style="width:100%"
            :mobile-breakpoint="600"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            :loading="loading"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.campaign="{item}">
              <v-col class="text__14" style="display:flex; align-items:center;">
                <div>
                  <span class="content-inner-table text__14">{{item.campaign}}</span>
                </div>
              </v-col>
            </template>
            <template
              v-slot:item.modifiedDate="{item}"
            >{{item.modifiedDate | moment("HH:mm DD/MM/YYYY")}}</template>
            <template v-slot:item.deadline="{item}">{{item.deadline| moment("HH:mm DD/MM/YYYY")}}</template>
            <template v-slot:item.contentTitle="{item}">
              <div class="content_details">
                <div>
                  <span class="text__14">{{ item.contentTitle }}</span>
                </div>
              </div>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="item.status.color"
                style="color:white"
                class="text__14"
              >{{item.status.name}}</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-row class="flex-nowrap" justify="center">
                <edit-task v-if="item.status.id < 5 && item.status.id != 3" :taskID="item.id" />
                <v-btn
                  text
                  icon
                  color="error"
                  v-if="item.status.id == 1"
                  @click="clickDelete(item.id)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>

                <v-btn
                  color="primary"
                  v-if="item.status.id == 3"
                  @click="changeToReview(item.id)"
                >Review</v-btn>
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
import moment from "moment";
import axios from "axios";
import EditTask from "../../../components/Popup/EditTask.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { EditTask },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      panel: [],
      /**End Pagination */
      dialog: false,
      menu: false,
      search: "",
      endFromDate: "",
      endToDate: "",
      status: "",

      loading: false,
      /**List Content */
      headers: [
        {
          text: "Campaign",
          align: "center",
          value: "campaign",
          width: "15%"
        },
        { text: "Title", value: "title", sortable: false, width: "30%" },
        {
          text: "Last Update",
          value: "modifiedDate",
          align: "center",
          width: "12.5%"
        },
        {
          text: "End",
          value: "deadline",
          align: "center",
          width: "12.5%",
          filter: value => {
            if (!this.endFromDate && !this.endToDate) return true;
            if (this.endFromDate != "" && this.endToDate == "") {
              return this.endFromDate <= value;
            } else if (this.endFromDate == "" && this.endToDate != "") {
              return value <= this.endToDate;
            } else {
              return this.endFromDate <= value && value <= this.endToDate;
            }
          }
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          width: "10%",
          filter: value => {
            if (!this.status) return true;
            return value.id == this.status;
          }
        },
        {
          text: "Action",
          value: "action",
          sortable: false,
          align: "center",
          width: "10%"
        }
      ]
    };
  },
  methods: {
    reset() {
      this.endFromDate = "";
      this.endToDate = "";
      this.status = "";
    },
    clearEndFromDate() {
      this.endFromDate = "";
    },
    clearEndToDate() {
      this.endToDate = "";
    },
    changeToReview(event) {
      sessionStorage.setItem("ApproveRequestID", event);
      this.$router.push("/ReviewContent");
    },
    ...mapActions({
      getListTaskByEditorID: "contentprocess/getListTaskByEditorID",
      deleteTaskByID: "contentprocess/deleteTaskByID",
      getListWriter: "authentication/getListWriter",
      getListStatusTask: "contentprocess/getListStatusTask"
    }),
    async clickDelete(id) {
      await this.deleteTaskByID(id);
      await this.getListTaskByEditorID(this.$store.getters.getUser.id);
    },
    async fetchData() {
      this.loading = true;
      await this.getListTaskByEditorID(this.$store.getters.getUser.id);
      await this.getListWriter(this.$store.getters.getUser.id);
      this.getListStatusTask();
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters(["getUser", "listTaskByEditorID", "listStatusTask"])
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Editor" && role != null) {
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

.content-inner-table:hover {
  color: rgb(83, 138, 255);
  transition: 0.5s;
  cursor: pointer;
}
.content_details span {
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.content_details:hover {
  cursor: pointer;
}
.tr-table-content:hover {
  background-color: rgba(100, 100, 100, 0.1);
}
.tag-content-details {
  margin-right: 3px;
}
.tag-content-details:hover {
  /* cursor: pointer; */
  font-weight: bold;
  transition: 0.5s;
}
</style>