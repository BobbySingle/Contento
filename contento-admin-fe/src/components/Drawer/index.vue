<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    app
    dark
    style="background-color:#1976d2;"
  >
    <v-list-item style="background-color:#004ba0" dark>
      <v-list-item-avatar>
        <v-img src="../../assets/logo.png" sizes="85"></v-img>
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
export default {
  data() {
    return {
      drawer: true,
      role: "",
      items: [
        {
          title: "Campaign",
          icon: "emoji_events",
          link: "/CampaignManagement",
          role: "Marketer"
        },
        {
          title: "Content",
          icon: "edit",
          link: "/ContentManagement",
          role: "Marketer"
        },
        {
          title: "Customer",
          icon: "people",
          link: "/CustomerManagement",
          role: "Marketer"
        },
        {
          title: "Campaign Request",
          icon: "flag",
          link: "/CampaignRequest",
          // role: "Editor"
          role: "Marketer"
        },
        {
          title: "Content Request",
          icon: "notes",
          link: "/ContentRequest",
          // role: "Editor"
          role: "Marketer"
        },
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