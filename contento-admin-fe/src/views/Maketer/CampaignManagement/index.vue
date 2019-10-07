<template>
  <v-container>
    <!-- /** Begin Create Campaign */ -->
    <v-row no-gutters class="mb-6" justify="start">
      <popup-create-campaign></popup-create-campaign>
    </v-row>
    <!-- /** End Create Campaign */ -->

    <!-- /**Begin Search & Filter */ -->
    <v-row>
      <v-col sm="9" md="10">
        <div class="search-filter">
          <v-icon class="icon">searchs</v-icon>
          <input class="input-field" type="text" placeholder="Customer,Title" name="search" />
        </div>
      </v-col>
      <v-col sm="3" md="2">
        <div class="filter">
          <v-select :items="filters" label="Filter"></v-select>
        </div>
      </v-col>
    </v-row>
    <!-- /**End Search & Filter */ -->

    <!-- /**Begin Table Campaign */ -->
    <v-card flat v-for="item in campaigns" :key="item.id" class="tr-table-campaign">
      <v-row no-gutters>
        <v-col sm="3" md="2">
          <v-row
            justify="center"
            align="center"
            v-bind:class="{ campaign_success:item.statusCampaign == 1, campaign_on_going:item.statusCampaign == 2,campaign_overdue:item.statusCampaign == 3}"
          >
            <v-col>
              <div>
                <span text @click="clickCampaign(item)" class="customer-inner-table">{{item.customer}}</span>
              </div>
              <div>{{item.releaseDate}}</div>
              <div>Deadline: {{item.deadline}}</div>
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="5" md="6" align-self="center">
          <div class="campaign-details py-2" @click="clickCampaign(item)">
            <div>
              <h3>{{ item.titleCampaign }}</h3>
            </div>
            <!-- <div>
              <h4>{{ item.descriptionCampaign }}</h4>
            </div>-->
          </div>
          <div>
            <span
              v-for="topic in item.topicCampaign"
              :key="topic"
              class="tag-campaign-details"
            >#{{topic}}</span>
          </div>
        </v-col>
        <v-col sm="2" md="2">
          <v-row justify="center" align="center" style="height:100%">
            <v-chip v-if="item.statusCampaign === 1" color="success" style="color:white">Success</v-chip>
            <v-chip v-if="item.statusCampaign === 2" color="warning" style="color:white">On Going</v-chip>
            <v-chip v-if="item.statusCampaign === 3" color="error" style="color:white">Overdue</v-chip>
          </v-row>
        </v-col>
        <v-col sm="2" md="2">
          <v-row justify="center" align="center" style="height: 100%;">
            <div>
              <v-row class="py-1">
                <!-- <v-btn color="warning" fab small>
                  <v-icon>edit</v-icon>
                </v-btn>-->
                <popup-edit-campaign :campaign="item" />
              </v-row>
              <!-- <v-row class="py-1">
                <v-btn color="success" fab small>
                  <v-icon>more_horiz</v-icon>
                </v-btn>
              </v-row>-->
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card>
    <!-- /**End Table Campaign */ -->
    <!-- /**Begin Pagination */ -->
    <v-row class="py-4">
      <v-layout>
        <v-pagination v-model="page" :length="4" circle></v-pagination>
      </v-layout>
    </v-row>
    <!-- /**End Pagination */ -->
  </v-container>
</template>
<script>
import PopupCreateCampaign from "../../../components/Popup/CreateCampaign.vue";
import PopupEditCampaign from "../../../components/Popup/EditCampaign.vue";
export default {
  components: { PopupCreateCampaign, PopupEditCampaign },
  data: () => ({
    page: 1,
    filters: ["Lasted", "Campaign", "Customer"],
    campaigns: [
      {
        id:1,
        customer: "Customer 4",
        releaseDate: "Otc/5/2019",
        deadline: "2019-10-17T15:20:03.146Z",
        statusCampaign: 1,
        titleCampaign: "How to structure an effective campaign plan",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["Film", "Social", "Food & Drink","2Tek", "Business"],},
      {
        id:2,
        customer: "Customer 3",
        releaseDate: "Otc/5/2019",
        deadline: "2019-10-17T15:20:03.146Z",
        statusCampaign: 1,
        titleCampaign: "How to Launch a Successful Marketing Campaign",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["Film", "Social", "Food & Drink"]
      },
      {
        id:3,
        customer: "Customer 2",
        releaseDate: "Otc/5/2019",
        deadline: "2019-10-17T15:20:03.146Z",
        statusCampaign: 2,
        titleCampaign:
          "This Is The Ultimate Marketing Campaign Planning Checklist That Will Get You Proactive",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["Film", "Social", "Food & Drink","2Tek",]
      },
      {
        id:4,
        customer: "Customer 1",
        releaseDate: "Otc/5/2019",
        deadline: "2019-10-17T15:20:03.146Z",
        statusCampaign: 3,
        titleCampaign:
          "Catch Me If You Can - Chủ nghĩa lừa đảo, tuổi trẻ ngông cuồng & Steven Spielbeg",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["Film"]
      },
      {
        id:5,
        customer: "Customer 1",
        releaseDate: "Otc/5/2019",
        deadline: "2019-10-17T15:20:03.146Z",
        statusCampaign: 3,
        titleCampaign:
          "Đây liệu có phải là Joker vĩ đại nhất mọi thời đại hay niềm tin vào lý tưởng Joker, Chí Phèo phiên bản siêu anh hùng? Phim bị cắt bao lâu?",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["Film", "Social"]
      },
      {
        id:6,
        customer: "Customer 1",
        releaseDate: "Otc/5/2019",
        deadline: "2019-10-17T15:20:03.146Z",
        statusCampaign: 3,
        titleCampaign: "Campaign Title",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["Film", "Social"]
      }
    ]
  }),
  methods: {
    clickCampaign: function(event) {
      localStorage.setItem("Campaign", JSON.stringify(event));
      this.$router.push("/CampaignDetails");
    }
  }
};
</script>
<style scoped>
.search-filter {
  height: 56px;
  display: flex;
  margin-bottom: 15px;
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
  height: 56px;
  display: flex;
}
.customer-inner-table {
  font-weight: bold;
}
.customer-inner-table:hover {
  color: rgb(83, 138, 255);
  transform: translateX(8px) scale(1.2);
  transition: 1s;
  cursor: pointer;
}
/**Begin Status - line */

.campaign_success {
  /* border-left: 4px solid #3cd1c2; */
  border-left: 4px solid #4caf50;
  height: 100%;
}
.campaign_on_going {
  /* border-left: 4px solid orange; */
  border-left: 4px solid #fb8c00;
  height: 100%;
}
.campaign_overdue {
  /* border-left: 4px solid tomato; */
  border-left: 4px solid #ff5252;
  height: 100%;
}
/**End Status - line */

.campaign-details h3 {
  font-weight: bold;
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.campaign-details h4 {
  font-weight: 300;
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
  cursor: pointer;
  font-weight: bold;
  transition: 0.5s;
}
</style>