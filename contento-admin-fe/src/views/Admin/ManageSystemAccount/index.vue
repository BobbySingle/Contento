<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Manage System Account</h1>
    </v-row>
    <!-- /**Begin Search  */ -->
    <v-row no-gutters class="mx-6">
      <v-col sm="8" md="9">
        <div class="search-filter">
          <v-icon class="icon">searchs</v-icon>
          <input
            class="input-field text__14"
            type="text"
            placeholder="Email"
            name="search"
            v-model="search"
          />
        </div>
      </v-col>
      <v-col sm="4" md="3" style="display:flex; justify-content: center;">
        <create-account />
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-6 mb-2">
      <v-expansion-panels :accordion="true" :focusable="true" multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header class="text__14">Advanced Filter:</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class=".flex-nowrap">
              <v-col cols="12" sm="4">
                <v-select
                  v-model="roleFilter"
                  :items="roles"
                  item-text="name"
                  item-value="id"
                  label="Role"
                  prepend-inner-icon="account_circle"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="activeFilter"
                  :items="actives"
                  item-text="name"
                  item-value="id"
                  label="Status"
                  prepend-inner-icon="account_circle"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" align-self="center">
                <v-row justify="center">
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
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table
            :headers="headers"
            :items="listAdminAccounts"
            style="width:100%"
            :mobile-breakpoint="600"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            :loading="loading"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.email="{item}">
              <v-col class="text__14" style="display:flex; align-items:center;">
                <div>
                  <span class="customer-inner-table text__14">{{item.email}}</span>
                </div>
              </v-col>
            </template>
            <template v-slot:item.role="{item}">
              <div>
                <span class="text__14">{{ item.role.name }}</span>
              </div>
            </template>
            <template v-slot:item.isActive="{item}">
              <div>
                <v-chip color="success" class="text__14" v-if="item.isActive">Active</v-chip>
                <v-chip color="error" class="text__14" v-if="!item.isActive">Disable</v-chip>
              </div>
            </template>
            <template v-slot:item.action="{item}">
              <!-- <v-btn icon color="warning">
                <v-icon>edit</v-icon>
              </v-btn>-->
              <v-row class="flex-nowrap">
              <edit-account :accountID="item.id" />
              <disable-account :account="item"  v-if="item.isActive"  />
              <v-btn icon color="success" v-if="!item.isActive" @click="enableAccount(item.id)">
                <v-icon>mdi-autorenew</v-icon>
              </v-btn>
              </v-row>
            </template>
          </v-data-table>
          <v-row justify="center">
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
            </div>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import CreateAccount from "../../../components/Popup/CreateAccount.vue";
import EditAccount from "../../../components/Popup/EditAccount.vue";
import DisableAccount from "../../../components/Popup/DisableAccount.vue";
export default {
  components: { CreateAccount, EditAccount, DisableAccount },
  data() {
    return {
      /**Begin Pagination */
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      /**End Pagination */
      panel: [],
      dialog: false,
      menu: false,
      /**Filter */
      search: "",
      loading: false,
      /**List Content */
      roleFilter: "",
      activeFilter: "",
      headers: [
        {
          text: "Email",
          align: "left",
          value: "email",
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
          text: "Fullname",
          align: "left",
          value: "fullName"
        },
        {
          text: "Role",
          align: "left",
          value: "role",
          filter: value => {
            if (!this.roleFilter) return true;
            return value.id == this.roleFilter;
          }
        },
        {
          text: "Status",
          value: "isActive",
          sortable: false,
          align: "center",
          filter: value => {
            if (!this.activeFilter) return true;
            if (this.activeFilter == 1) {
              return value == true;
            }
            if (this.activeFilter == 2) {
              return value == false;
            }
          }
        },
        {
          text: "Action",
          value: "action",
          sortable: false,
          align: "center"
        }
      ],
      roles: [
        {
          id: 1,
          name: "Marketer"
        },
        {
          id: 2,
          name: "Editor"
        },
        {
          id: 3,
          name: "Writer"
        }
      ],
      actives: [
        { id: 1, isActive: true, name: "Active" },
        { id: 2, isActive: false, name: "Disable" }
      ]
    };
  },
  filters: {
    localTime: function(value) {
      if (!value) {
        return "";
      }
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
    ...mapActions({
      getAdminAccounts: "authentication/getAdminAccounts",
      isActiveAccount: "authentication/isActiveAccount"
    }),
    disableAccount(event) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async result => {
        if (result.value) {
          await this.isActiveAccount({
            id: event,
            isActive: false
          });
        }
        await this.getAdminAccounts();
      });
    },
    async enableAccount(event) {
      await this.isActiveAccount({ id: event, isActive: true });
      await this.getAdminAccounts();
    },
    Clear() {
      this.startFromDate = "";
      this.startToDate = "";
      this.endFromDate = "";
      this.endToDate = "";
      this.customer = "";
      this.tagFilter = "";
      this.status = "";
    },
    clearStartFromDate() {
      this.startFromDate = "";
    },
    clearStartToDate() {
      this.startToDate = "";
    },
    clearEndFromDate() {
      this.endFromDate = "";
    },
    clearEndToDate() {
      this.endToDate = "";
    },

    async fetchData() {
      this.loading = true;
      await Promise.all([this.getAdminAccounts()]);
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters(["getUser", "listAdminAccounts"])
  },
  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$store.getters.getAccessToken;
    let role = this.getUser.role;
    if (role !== "Admin" && role != null) {
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

.customer-inner-table:hover {
  color: rgb(83, 138, 255);
  transition: 0.5s;
  cursor: pointer;
}
.campaign-details span {
  font-weight: bold;
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.campaign-details:hover {
  cursor: pointer;
}
.tr-table-campaign:hover {
  background-color: rgba(100, 100, 100, 0.1);
}
.tag-campaign-details {
  margin-right: 3px;
}
.tag-campaign-details:hover {
  /* cursor: pointer; */
  font-weight: bold;
  transition: 0.5s;
}
</style>