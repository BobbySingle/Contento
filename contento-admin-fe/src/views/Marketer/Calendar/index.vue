<template>
  <v-container>
    <v-row>
      <v-btn text @click="$router.go(-1)">Back</v-btn>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn outlined class="mr-4" @click="setToday">Today</v-btn>
            <v-btn fab text small @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-menu bottom right>
              <template v-slot:activator="{ on }">
                <v-btn outlined v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            interval-height="100"
            :events="events"
            event-color="black"
            :event-margin-bottom="3"
            :now="today"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <!-- /**Begin Popup Event Details */ -->
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-y
          >
            <v-card
              color="grey lighten-4"
              min-width="250px"
              max-width="250px"
              flat
              v-if="selectedEvent"
            >
              <!-- /**Begin Event endDate */ -->
              <v-row class="flex-nowrap pa-2" style="background-color:#1976d2" no-gutters>
                <v-col cols="6">
                  <span class="pl-1" style="color:white">Deadline</span>
                </v-col>
                <v-col
                  cols="6"
                  style="color:white;font-size:14px; font-weight:bold;"
                >{{selectedEvent.deadline | moment("hh:mm DD/MM/YYYY")}}</v-col>
              </v-row>
              <!-- /**End Event endDate */ -->
              <!-- /**Begin Event Title */ -->
              <v-row>
                <v-col cols="12" class="px-5">
                  <span class="event__title">{{selectedEvent.title}}</span>
                </v-col>
              </v-row>
              <!-- /**End Event Title */ -->
              <v-divider></v-divider>
              <!-- /**Begin Event Writer & Status  */ -->
              <v-row class="pa-2" align="center" no-gutters>
                <v-col cols="6">
                  <v-row class="px-2">
                    <v-icon color="#1976d2">edit</v-icon>
                    <span class="px-2 event__writer">{{selectedEvent.writer.name}}</span>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <span
                    class="event__status"
                    :style="{'color':selectedEvent.status.color}"
                  >{{selectedEvent.status.name}}</span>
                </v-col>
              </v-row>
              <!-- /**End Event Writer & Status  */ -->
              <v-divider></v-divider>
              <!-- /**Begin Button Publish & Cancel */ -->
              <v-row no-gutters>
                <v-col cols="6" class="pa-0" style="display:flex; justify-content:center;">
                  <v-btn
                    text
                    color="#1976d2"
                    style="font-size:12px;"
                    disabled
                    v-if="selectedEvent.status.id != 5"
                  >Publish</v-btn>
                  <v-btn
                    text
                    color="#1976d2"
                    style="font-size:12px;"
                    v-if="selectedEvent.status.id == 5"
                    @click="publish(selectedEvent.id)"
                  >Publish</v-btn>
                </v-col>
                <v-col cols="6" class="pa-0" style="display:flex; justify-content:center;">
                  <v-btn
                    text
                    color="secondary"
                    style="font-size:12px;"
                    @click="selectedOpen = false"
                  >Cancel</v-btn>
                </v-col>
              </v-row>
              <!-- /**End Button Publish & Cancel */ -->
            </v-card>
          </v-menu>
          <!-- /**End Popup Event Details */ -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  data: () => ({
    today: "2019-10-10",
    focus: "2019-10-10",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    start: null,
    end: null,
    selectedEvent: undefined,
    selectedElement: null,
    selectedOpen: false,
    events: []
  }),
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();

    var currentDate = new Date();
    this.today = this.$moment(String(currentDate)).format("YYYY-MM-DD hh:mm");

    let campaignID = JSON.parse(localStorage["CampaignID"].toString());
    axios
      .get(
        `http://34.87.31.23:5002/api/contentprocess/task/campaign/${campaignID}`
      )
      .then(rs => {
        this.events = rs.data;
        console.log(this.events);
        this.formatListContent();
      })
      .catch(er => {
        console.log(er);
      });
    /** End Get list campaign */
  },
  beforeMount() {
    this.formatListContent();
  },
  methods: {
    publish(event) {
      localStorage.setItem("ContentID", JSON.stringify(event));
      this.$router.push("/PublishChannel");
    },
    click(event) {
      console.log(event);
    },
    /**Begin format time endDate */
    formatListContent() {
      this.events.forEach(el => {
        el.name = el.title;
        el.start = this.$moment(String(el.publishTime)).format(
          "YYYY-MM-DD hh:mm"
        );
        el.deadline = this.$moment(String(el.deadline)).format(
          "YYYY-MM-DD hh:mm"
        );
      });
    },
    /**End format time endDate */
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    // /**Begin set event color */
    // getEventColor(event) {
    //   if (event.status == 1) {
    //     return "#4caf50";
    //   } else if (2 <= event.status <= 4) {
    //     return "#fb8c00";
    //   } else if (event.status == 5) {
    //     return "#ff5252";
    //   } else {
    //     return "#1976d2";
    //   }
    // },
    // /**End set event color */
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        console.log(event);
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    }
  }
};
</script>
<style scoped>
.event__title {
  font-size: 12px;
  font-weight: bold;
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.event__writer {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
}
.event__status {
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
}
</style>