<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Manage Content's Fanpage</h1>
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
            <v-row class=".flex-nowrap"></v-row>
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
            :items="example"
            style="width:100%"
            :mobile-breakpoint="600"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            :loading="loading"
            @page-count="pageCount = $event"
          >
            <template
              v-slot:item.publishTime="{item}"
            >{{item.publishTime| localTime()| moment("HH:mm DD/MM/YYYY")}}</template>
            <template v-slot:item.status="{item}">
              <v-chip style="color: white;" :color="item.status.color" small>{{item.status.name}}</v-chip>
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
          text: "Title",
          value: "title",
          sortable: false,
          width: "30%",
          filter: value => {
            if (!this.search) return true;
            return (
              value
                .toString()
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) !== -1
            );
          }
        },
        {
          text: "Publish Time",
          value: "publishTime",
          align: "center",
          width: "12.5%"
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
      ],
      example: [
        {
          id: 1,
          title: "Banana Milk Almond,...",
          publishTime: "",
          status: { id: 7, name: "Published", color: "success" }
        }
      ]
    };
  },
  filters: {
    localTime: function(value) {
      if (!value) return "";
      //Local TimeZone
      var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
      var millisecondsTime = Date.parse(value + "Z");
      var newDateUTC7 = new Date(millisecondsTime - tzoffset)
        .toISOString()
        .slice(0, -1);
      return newDateUTC7;
    }
  },
  methods: {
    Clear() {
      this.endFromDate = "";
      this.endToDate = "";
      this.status = "";
      this.campaign = "";
    },
    clearEndFromDate() {
      this.endFromDate = "";
    },
    clearEndToDate() {
      this.endToDate = "";
    },

    ...mapActions({}),
    async fetchData() {
      this.loading = true;
      // await Promise.all([
      // ]);
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters(["getUser"])
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