<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Content Request</h1>
    </v-row>
    <!-- /**Begin Search  */ -->
    <v-row no-gutters class="mx-10">
      <v-col sm="8" md="9">
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
      <v-col sm="4" md="3" style="display:flex; justify-content:flex-end;"></v-col>
    </v-row>
    <!-- /** End Search */ -->

    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listContents"
            :search="search"
            style="width:100%"
            :mobile-breakpoint="600"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
          >
            <template v-slot:item.campaign="{item}">
              <v-col
                class="text__14"
                style="display:flex; align-items:center;"
                v-bind:class="{ content_success:item.status.id == 1, content_on_going:item.status.id == 2,content_overdue:item.status.id == 3}"
              >
                <div>
                  <span class="content-inner-table text__14">{{item.campaign}}</span>
                </div>
              </v-col>
            </template>
            <template v-slot:item.modifiedDate="{item}">{{item.modifiedDate | moment("DD/MM/YYYY")}}</template>
            <template v-slot:item.deadline="{item}"> {{item.deadline| moment("DD/MM/YYYY")}}</template>
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
              <v-btn color="primary" v-if="item.status.id === 3" @click="changeToReview(item.id)">Review</v-btn>
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
import moment from 'moment';
import axios from "axios";
export default {
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
      loading: true,
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
          text: "Release",
          value: "modifiedDate",
          align: "center",
          width: "12.5%"
        },
        { text: "End", value: "deadline", align: "center", width: "12.5%" },
        { text: "Status", value: "status", align: "center", width: "10%" },
        { text: "Action", value: "action", align: "center", width: "10%" }
      ],
      listContents: [
        // {
        //   id: 1,
        //   campaign: "Campaign 1",
        //   contentTitle:
        //     "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
        //   releaseDate: "2019-10-18T15:20:03.146Z",
        //   endDate: "2019-10-18T15:20:03.146Z",
        //   status: {
        //     id: 1,
        //     name: "Under Review"
        //   }
        // }
      ]
    };
  },
  methods: {
    changeToReview(event) {
      localStorage.setItem("ContentRequestID", event)
      this.$router.push("/ReviewContent");
    },
    /**Begin format time created */
    formatDate() {
      this.listContents.forEach(el => {
        el.releaseDate = this.$moment(String(el.releaseDate)).format(
          "YYYY-MM-DD hh:mm"
        );
        el.endDate = this.$moment(String(el.endDate)).format(
          "YYYY-MM-DD hh:mm"
        );
      });
    }
    /**End format time created */
  },
  created() {
    // let role = localStorage.getItem("role");
    // if (role !== "Marketer") {
    //   this.$router.push("/403");
    // }
  },
  mounted() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$store.getters.getAccessToken;

    /**Load Content Request */
    axios
      .get(
        `http://34.87.31.23:5002/api/contentprocess/task/editor/${this.$store.getters.getUser.id}`
      )
      .then(rs => {
        console.log(rs.data);
        this.listContents = rs.data;
      })
      .catch(er => {
        console.log(er);
      });

    this.formatDate();
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
/**Begin Status - line */

.content_success {
  /* border-left: 4px solid #3cd1c2; */
  border-left: 4px solid #4caf50;
  height: 100%;
}
.content_on_going {
  /* border-left: 4px solid orange; */
  border-left: 4px solid #fb8c00;
  height: 100%;
}
.content_overdue {
  /* border-left: 4px solid tomato; */
  border-left: 4px solid #ff5252;
  height: 100%;
}
/** End Status - line */
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