<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1>List Content</h1>
    </v-row>
    <v-row no-gutters class="mx-10">
      <v-col sm="12" md="12">
        <v-row>
          <v-data-table :headers="headers" :items="listtasks" style="width:100%;">
            <template v-slot:item.status="{ item }">
              <v-chip color="success" dark v-if="item.status === 1">Completed</v-chip>
            </template>
            <template v-slot:item.action="{item}">
              <v-btn color="primary" v-if="item.status === 1" @click="publish(item.id)">Publish</v-btn>
              <v-btn disabled v-if="item.status != 1">Publish</v-btn>
            </template>
          </v-data-table>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      menu: false,
      /**List Content */
      headers: [
        {
          text: "#",
          align: "left",
          value: "id"
        },
        { text: "Title", value: "title", sortable: false },
        { text: "Implementer", value: "writer", align: "center" },
        { text: "ReleaseDate", value: "releaseDate", align: "center" },
        { text: "Status", value: "status", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],
      listtasks: [
        {
          id: 127,
          title:
            " Content 1: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 1",
          releaseDate: "2019-10-17T15:20:03.146Z",
          status: 1
        },
        {
          id: 125,
          title:
            "Content 2: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 2",
          releaseDate: "2019-10-17T15:20:03.146Z",
          status: 1
        },
        {
          id: 96,
          title:
            "Content 3: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 3",
          releaseDate: "2019-10-17T15:20:03.146Z",
          status: 1
        },
        {
          id: 325,
          title:
            "Content 4: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 4",
          releaseDate: "2019-10-17T15:20:03.146Z",
          status: 1
        },
        {
          id: 45,
          title:
            "Content 5: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 1",
          releaseDate: "2019-10-17T15:20:03.146Z",
          status: 1
        },
        {
          id: 55,
          title:
            "Content 6:Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
          writer: "Writer 2",
          releaseDate: "2019-10-17T15:20:03.146Z",
          status: 1
        }
      ]
    };
  },
  methods: {
    publish(event) {
      localStorage.setItem("ContentID", event);
      this.$router.push("/PublishChannel");
    },
    /**Begin format time releaseDate */
    formatListContent() {
      this.listtasks.forEach(el => {
        el.releaseDate = this.$moment(String(el.releaseDate)).format(
          "YYYY-MM-DD hh:mm"
        );
      });
    }
    /**End format time releaseDate */
  },
  mounted() {
    this.formatListContent();
  }
};
</script>


