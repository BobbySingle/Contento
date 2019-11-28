<template>
  <v-container>
    <v-row justify="center" class="mb-5">
      <h1 class="text__h1">Statistics</h1>
    </v-row>
    <v-row justify="center" no-gutters style="background-color: white;">
      <v-col cols="12" md="6">
        <v-select
          v-model="week"
          :items="weeks"
          item-text="name"
          item-value="id"
          label="Statistics Week"
          prepend-inner-icon="mdi-chart-donut"
          @change="changeTopWeek"
          class="mx-10"
        ></v-select>
        <GChart
          type="PieChart"
          :data="chartWeekData"
          :options="chartWeekOptions"
          style="height:500px"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="month"
          :items="months"
          item-text="name"
          item-value="id"
          label="Statistics Month"
          prepend-inner-icon="mdi-chart-donut"
          @change="changeTopMonth"
          class="mx-10"
        ></v-select>
        <GChart
          type="PieChart"
          :data="chartMonthData"
          :options="chartMonthOptions"
          style="height:500px"
        />
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="6">
        <GChart
          type="ColumnChart"
          :data="chartWeekAllData"
          :options="chartWeekAllOptions"
          style="height:500px"
        />
      </v-col>
      <v-col cols="12" md="6">
        <GChart
          type="ColumnChart"
          :data="chartMonthAllData"
          :options="chartMonthAllOptions"
          style="height:500px"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    GChart
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      week: 3,
      weeks: [
        { id: 3, name: "Top 3 category in the week" },
        { id: 5, name: "Top 5 category in the week" },
        { id: 10, name: "Top 10 category in the week" }
      ],
      month: 3,
      months: [
        { id: 3, name: "Top 3 category in the month" },
        { id: 5, name: "Top 5 category in the month" },
        { id: 10, name: "Top 10 category in the month" }
      ],
      chartWeekData: [],
      chartWeekOptions: {
        // legend: 'none',
        // pieSliceText: 'label',
        // title: "Top 5 Category In Week",
        pieStartAngle: 0
      },
      chartMonthData: [],
      chartMonthOptions: {
        // legend: 'none',
        // pieSliceText: 'label',
        // title: "Top 5 Category In Week",
        pieStartAngle: 0
      },
      chartWeekAllData: [],
      chartWeekAllOptions: {
        legend: "none",
        pieSliceText: "label",
        title: "Interaction in the week",
        pieStartAngle: 0
      },
      chartMonthAllData: [],
      chartMonthAllOptions: {
        legend: "none",
        pieSliceText: "label",
        title: "Interaction in the month",
        pieStartAngle: 0
      }
    };
  },
  computed: {
    ...mapGetters([
      "StatisticsWeek",
      "StatisticsMonth",
      "StatisticsAllWeek",
      "StatisticsAllMonth",
      "getUser"
    ])
  },
  methods: {
    ...mapActions({
      getStatisticsOneWeek: "contentprocess/getStatisticsOneWeek",
      getStatisticsOneMonth: "contentprocess/getStatisticsOneMonth",
      getStatisticsAllOneWeek: "contentprocess/getStatisticsAllOneWeek",
      getStatisticsAllOneMonth: "contentprocess/getStatisticsAllOneMonth",
      spinnerLoading: "spinner/spinnerLoading"
    }),
    async fetchData() {
      //WEEK
      this.spinnerLoading(true);
      let dataWeek = [["Category", "Interaction"]];
      let statusWeek = await this.getStatisticsOneWeek(3);
      if (statusWeek == 200) {
        this.StatisticsWeek.forEach(element => {
          dataWeek.push([element.tags, element.timeInTeraction]);
        });
      }
      this.chartWeekData = dataWeek;
      //MONTH
      let dataMonth = [["Category", "Interaction"]];
      let statusMonth = await this.getStatisticsOneMonth(3);
      if (statusMonth == 200) {
        this.StatisticsMonth.forEach(element => {
          dataMonth.push([element.tags, element.timeInTeraction]);
        });
      }
      this.chartMonthData = dataMonth;
      //WEEK ALL
      let dataWeekAll = [["Category", "Interaction"]];
      let statusWeekAll = await this.getStatisticsAllOneWeek(0);
      if (statusWeekAll == 200) {
        this.StatisticsAllWeek.forEach(element => {
          dataWeekAll.push([element.tags, element.timeInTeraction]);
        });
      }
      this.chartWeekAllData = dataWeekAll;
      //MONTH ALL
      let dataMonthAll = [["Category", "Interaction"]];
      let statusMonthAll = await this.getStatisticsAllOneMonth(0);
      if (statusMonthAll == 200) {
        this.StatisticsAllMonth.forEach(element => {
          dataMonthAll.push([element.tags, element.timeInTeraction]);
        });
      }
      this.chartMonthAllData = dataMonthAll;
      this.spinnerLoading(false);
    },
    async changeTopWeek(event) {
      let dataWeek = [["Category", "Interaction"]];
      let statusWeek = await this.getStatisticsOneWeek(event);
      if (statusWeek == 200) {
        this.StatisticsWeek.forEach(element => {
          dataWeek.push([element.tags, element.timeInTeraction]);
        });
      }
      this.chartWeekData = dataWeek;
    },
    async changeTopMonth(event) {
      let dataMonth = [["Category", "Interaction"]];
      let statusMonth = await this.getStatisticsOneMonth(event);
      if (statusMonth == 200) {
        this.StatisticsMonth.forEach(element => {
          dataMonth.push([element.tags, element.timeInTeraction]);
        });
      }
      this.chartMonthData = dataMonth;
    }
  },
  mounted() {
    this.fetchData();
  },
  created() {
    let role = this.getUser.role;
    if (role !== "Marketer" && role != null) {
      this.$router.push("/403");
    } else if (role == null) {
      this.$store.state.authentication.loggedUser = false;
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>