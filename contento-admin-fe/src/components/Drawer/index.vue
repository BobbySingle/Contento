<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    app
    dark
    style="background-color:#1976d2;"
  >
    <v-list-item style="background-color:#004ba0; height:48px;" dark>
      <v-list-item-avatar>
        <v-img src="../../assets/logo.png"></v-img>
      </v-list-item-avatar>
      <v-list-item-title>Contento</v-list-item-title>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider class="mx-auto" inset></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        v-if="item.role === role"
        router
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      role: "",
      items: [
        {
          title: "Campaign",
          icon: "emoji_events",
          link: "/ManageCampaign",
          role: "Marketer"
        },
        {
          title: "Publish Content",
          icon: "edit",
          link: "/ManagePublish",
          role: "Marketer"
        },
        {
          title: "Customer",
          icon: "people",
          link: "/ManageCustomer",
          role: "Marketer"
        },
        {
          title: "Channel",
          icon: "public",
          link: "/ManageChannel",
          role: "Marketer"
          // role: "Marketer"
        },
        {
          title: "Statistics",
          icon: "mdi-poll-box",
          link: "/Statistics",
          role: "Marketer"
          // role: "Marketer"
        },
        {
          title: "Campaign Request",
          icon: "flag",
          link: "/CampaignRequest",
          role: "Editor"
          // role: "Marketer"
        },
        {
          title: "Approve Request",
          icon: "notes",
          link: "/ApproveRequest",
          role: "Editor"
          // role: "Marketer"
        },
        {
          title: "Manage Task",
          icon: "view_list",
          link: "/ManageTask",
          role: "Editor"
          // role: "Marketer"
        },
        {
          title: "Task Management",
          icon: "view_list",
          link: "/TaskManagement",
          role: "Writer"
          // role: "Marketer"
        },
        {
          title: "Manage Account",
          icon: "view_list",
          link: "/ManageSystemAccount",
          role: "Admin"
        },
        {
          title: "Freelance Account",
          icon: "mdi-account-outline",
          link: "/ManageFreelanceAccount",
          role: "Admin"
        },
        {
          title: "User Account",
          icon: "mdi-account-circle",
          link: "/ManageViewerAccount",
          role: "Admin"
        },
      ],
      mini: true
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted() {
    this.role = this.getUser.role;
  }
};
</script>