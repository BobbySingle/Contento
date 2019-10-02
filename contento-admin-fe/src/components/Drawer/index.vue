<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    app
    dark
    style="background-color:#424242;"
  >
    <v-list-item style="background-color:#424242" dark>
      <v-list-item-avatar>
        <v-img src="../../assets/Logo.png" sizes="85"></v-img>
      </v-list-item-avatar>
      <v-list-item-title>Contento</v-list-item-title>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider class="mx-auto" inset></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link v-if="item.role === role">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <router-link :to="item.link" style="text-decoration: none; color:white;">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      role: "",
      items: [
        {
          title: "Campaign Management",
          icon: "emoji_events",
          link: "/CampaignManagement",
          role: "Maketer"
        },
        {
          title: "Content Managerment",
          icon: "edit",
          link: "/",
          role: "Maketer"
        },
        {
          title: "Customer Managerment",
          icon: "people",
          link: "/",
          role: "Maketer"
        },
        {
          title: "Campaign Request",
          icon: "flag",
          link: "/CampaignManagement",
          role: "Editor"
        },
        { title: "Content Request", icon: "notes", link: "/", role: "Editor" },
        {
          title: "Task Managerment",
          icon: "view_list",
          link: "/",
          role: "Writer"
        }
      ],
      mini: true
    };
  },
  mounted() {
    this.role = localStorage.getItem("role");
  }
};
</script>