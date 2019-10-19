<template>
  <v-dialog v-model="dialog" scrollable width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text icon color="warning" v-on="on">
        <v-icon>edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Task</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="min-height: 300px; padding:0px;">
        <v-row no-gutters class="mx-10">
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  :counter="255"
                  label="Title:"
                  required
                  class="text__14"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="writer"
                  :items="writers"
                  item-text="name"
                  item-value="id"
                  label="Writer"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col cols="1">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>
                  <v-col cols="11">
                    <datetime
                      title="End Time"
                      placeholder="Select End-date"
                      type="datetime"
                      v-model="endtime"
                      :value="endtime"
                      class="text__14"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      :min-datetime="mintime"
                      :max-datetime="maxtime"
                    ></datetime>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-combobox
                  v-model="tags"
                  item-text="name"
                  item-value="id"
                  :items="categorys"
                  chips
                  clearable
                  label="Category"
                  multiple
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      @click="select"
                      color="blue"
                      class="chips"
                      style="color:white"
                    >
                      <strong class="text__14">{{ item.name }}</strong>
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="6" align-self="center">
                <v-row class="out-endtime flex-nowrap" align="center">
                  <v-col cols="1">
                    <v-icon>mdi-calendar-range</v-icon>
                  </v-col>
                  <v-col cols="11">
                    <datetime
                      title="End Time"
                      placeholder="Select Publish Date"
                      type="datetime"
                      v-model="publishDate"
                      :value="publishDate"
                      class="text__14"
                      input-class="datetime"
                      input-style="cursor:pointer;"
                      :min-datetime="mintime"
                      :max-datetime="maxtime"
                    ></datetime>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <CKEditor ref="ckeditor" :content="content" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false" class="text__14">Cancel</v-btn>
        <v-btn type="submit" @click="dialog = false, reset()" color="success" class="text__14">Create</v-btn>
      </v-card-actions>-->
    </v-card>
  </v-dialog>
</template>

<script>
import CKEditor from "../CKEditor/Ckeditor5";
export default {
  components: {
    CKEditor
  },
  data() {
    return {
      dialog: false,
      menu: false,
      writers: [
        { id: 1, name: "writers 1" },
        { id: 2, name: "writers 2" },
        { id: 3, name: "writers 3" },
        { id: 4, name: "writers 4" }
      ],
      tags: [{ id: 1, name: "DU LỊCH" }, { id: 2, name: "THỂ THAO" }],
      categorys: [
        { id: 1, name: "DU LỊCH" },
        { id: 2, name: "THỂ THAO" },
        { id: 3, name: "ĂN UỐNG" }
      ],
      endtime: "",
      publishDate: "2019-10-20T15:20:03.146Z",
      mintime: "2019-10-18T15:20:03.146Z",
      maxtime: "2019-10-20T15:20:03.146Z",
      content: "Write Content ...",
      writer: { id: 1, name: "writers 1" },
      title: "Title Task 1"
    };
  },
  mounted() {
    let now = new Date();
    this.endtime = now.toISOString();
    this.mintime = now.toISOString();
  }
};
</script>

<style>
.datetime {
  width: 100%;
  padding-left: 10px;
}
</style>