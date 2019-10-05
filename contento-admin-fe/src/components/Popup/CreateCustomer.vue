 <template>
  <v-dialog v-model="dialog" persistent width="400px">
    <template v-slot:activator="{ on }">
      <v-btn fab color="primary" small v-on="on">
        <v-icon color="white">add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="heading">Add New Customer</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10 mb-4" justify="center">
        <v-col md="10">
          <v-row>
            <v-text-field :counter="255" label="Fullname:" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field :counter="255" label="Phone:" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field :counter="255" label="Email:" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field :counter="255" label="Company:" required></v-text-field>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false">Cancel</v-btn>
        <v-btn color="success" @click="dialog = false">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            dialog:false,
        }
    }
}
</script>