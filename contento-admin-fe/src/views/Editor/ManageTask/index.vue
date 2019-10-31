<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Manage Task</h1>
    </v-row>
    <!-- /**Begin Search  */ -->
    <v-row no-gutters class="mx-10">
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
    <v-row class="mx-10 .flex-nowrap">
      <v-col cols="6">
        <v-text-field
          v-model="fromDate"
          type="date"
          label="[End date] From:"
          prepend-icon="date_range"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="toDate"
          type="date"
          label="[End date] To:"
          prepend-icon="date_range"
        />
      </v-col>
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
      /**End Pagination */
      dialog: false,
      menu: false,
      search: "",
      fromDate: "",
      toDate: "",
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
            if (!this.fromDate && !this.toDate) return true;
            if (this.fromDate != "" && this.toDate == "") {
              return this.fromDate <= value;
            } else if (this.fromDate == "" && this.toDate != "") {
              return value <= this.toDate;
            } else {
              return this.fromDate <= value && value <= this.toDate;
            }
          }
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          width: "10%"
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
    changeToReview(event) {
      sessionStorage.setItem("ContentRequestID", event);
      this.$router.push("/ReviewContent");
    },
    ...mapActions({
      getListTaskByEditorID: "contentprocess/getListTaskByEditorID",
      deleteTaskByID: "contentprocess/deleteTaskByID",
      getListWriter: "authentication/getListWriter"
    }),
    async clickDelete(id) {
      await this.deleteTaskByID(id);
      await this.getListTaskByEditorID(this.$store.getters.getUser.id);
    },
    async fetchData() {
      this.loading = true;
      await this.getListTaskByEditorID(this.$store.getters.getUser.id);
      await this.getListWriter(this.$store.getters.getUser.id);
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters(["getUser", "listTaskByEditorID"])
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