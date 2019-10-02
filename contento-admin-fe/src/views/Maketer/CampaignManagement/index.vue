<template>
  <v-container>
    <v-row>
      <v-col sm="3" md="2">
        <v-layout justify-start>
          <v-btn color="primary" style="font-weight:400; font-size:12px; ">Create Campaign</v-btn>
        </v-layout>
        <v-layout justify-start>
          <div class="status">
            <h3>Status</h3>
            <v-layout block>
              <div class="point-status" style="background-color:  #3cd1c2;"></div>
              <span>Completed</span>
            </v-layout>
            <v-layout block>
              <div class="point-status" style="background-color:  Orange;"></div>
              <span>On Going</span>
            </v-layout>
            <v-layout block>
              <div class="point-status" style="background-color:  Tomato;"></div>
              <span>Overdue</span>
            </v-layout>
          </div>
        </v-layout>
      </v-col>
      <v-col sm="9" md="10" class="table">
        <v-row>
          <v-layout block style=" width:100%;">
            <div class="search-filter">
              <v-icon class="icon">searchs</v-icon>
              <input class="input-field" type="text" placeholder="Email" name="email" />
            </div>
            <div class="filter">
              <v-select :items="filters" label="Filter"></v-select>
            </div>
          </v-layout>
        </v-row>
        <!-- /**Table Campaign */ -->
        <v-row>
          <v-simple-table height="520" style="width:100%;">
            <template v-slot:default>
              <tbody>
                <tr
                  v-for="item in campaigns"
                  :key="item.id"
                  @click="clickCustomer(item.customer)"
                  class="tr-table-campaign"
                >
                  <td style="height:100px; width:180px; min-width:180px;">
                    <div
                      v-bind:class="{ campaign_success:item.statusCampaign == 1, campaign_on_going:item.statusCampaign == 2,campaign_overdue:item.statusCampaign == 3,campaign_none:item.statusCampaign == 0}"
                    >
                      <div class="customer-campaign-details">
                        <v-row>
                          <span
                            text
                            @click="clickCustomer"
                            class="customer-inner-table"
                          >{{item.customer}}</span>
                        </v-row>
                        <v-row>{{item.releaseDate}}</v-row>
                        <v-row>{{item.deadline}}</v-row>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="campaign-details">
                      <v-row>
                        <h3>{{ item.titleCampaign }}</h3>
                      </v-row>
                      <v-row>
                        <h4>{{ item.descriptionCampaign }}</h4>
                      </v-row>
                      <v-row>
                        <span
                          v-for="topic in item.topicCampaign"
                          :key="topic"
                          class="tag-campaign-details"
                        >#{{topic}}</span>
                      </v-row>
                    </div>
                  </td>
                  <td>
                    <v-layout block>
                      <v-btn color="warning" fab small>
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </v-layout>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-row>
            <v-layout >
              <v-pagination v-model="page" :length="4" circle></v-pagination>
            </v-layout>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    page: 1,
    filters: ["Lasted", "Campaign", "Customer"],
    campaigns: [
      {
        customer: "Customer 4",
        releaseDate: "Otc/5/2019",
        deadline: "Otc/30/2019",
        statusCampaign: "0",
        titleCampaign: "Campaign Title",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["topic 1", "topic2"]
      },
      {
        customer: "Customer 3",
        releaseDate: "Otc/5/2019",
        deadline: "Otc/30/2019",
        statusCampaign: "1",
        titleCampaign: "Campaign Title",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["topic 1", "topic2"]
      },
      {
        customer: "Customer 2",
        releaseDate: "Otc/5/2019",
        deadline: "Otc/30/2019",
        statusCampaign: "2",
        titleCampaign: "Campaign Title",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["topic 1", "topic2"]
      },
      {
        customer: "Customer 1",
        releaseDate: "Otc/5/2019",
        deadline: "Otc/30/2019",
        statusCampaign: "3",
        titleCampaign: "Campaign Title",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["topic 1", "topic2"]
      },
      {
        customer: "Customer 1",
        releaseDate: "Otc/5/2019",
        deadline: "Otc/30/2019",
        statusCampaign: "3",
        titleCampaign: "Campaign Title",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["topic 1", "topic2"]
      },
      {
        customer: "Customer 1",
        releaseDate: "Otc/5/2019",
        deadline: "Otc/30/2019",
        statusCampaign: "3",
        titleCampaign: "Campaign Title",
        descriptionCampaign:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        topicCampaign: ["topic 1", "topic2"]
      }
    ]
  }),
  methods: {
    clickCustomer: function(event) {
      alert("Hello!" + event);
    }
  }
};
</script>
<style scoped>
.status {
  margin-top: 20px;
  padding-left: 20px;
}
.status h3 {
  font-weight: 400;
}
.status span {
  margin-left: 5px;
  font-weight: 150;
}
.point-status {
  margin: 5px;
  width: 12px;
  height: 12px;
  border-radius: 24px;
}
.table {
}
.search-filter {
  margin-top: -8px;
  height: 56px;
  width: 100%;
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
  width: 80%;
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
  transform: translateX(5px) scale(1.2);
  transition: 1s;
  cursor: pointer;
}

.customer-campaign-details {
  margin-left: 20px;
}
.campaign-details {
  padding-left: 20px;
}
.campaign_success {
  border-left: 4px solid #3cd1c2;
  border-right: 2px solid rgb(136, 136, 136);
  height: 100px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.campaign_on_going {
  border-left: 4px solid orange;
  border-right: 2px solid rgb(136, 136, 136);
  height: 100px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.campaign_overdue {
  border-left: 4px solid tomato;
  border-right: 2px solid rgb(136, 136, 136);
  height: 100px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.campaign_none {
  border-right: 2px solid rgb(136, 136, 136);
  height: 100px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.campaign-details h3 {
  font-weight: bold;
  /**line-clamp */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
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
.tr-table-campaign:hover {
  cursor: pointer;
}
.tag-campaign-details {
  margin-right: 3px;
}
.tag-campaign-details:hover {
  font-weight: bold;
  transition: 0.5s;
}
</style>