 <template>
  <v-dialog v-model="dialog" persistent width="400px">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <v-btn icon color="error" @click="clickDisableAccount(account)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </template>
    <v-card>
      <v-row class="mx-4 mb-4" justify="center">
        <v-card-title class="text__17">Disable Account</v-card-title>
      </v-row>
      <v-row no-gutters class="mx-10 mb-4" justify="center">
        <v-col md="10">
          <v-row v-if="isEditor">
            <v-col cols="12">
              <v-select
                v-model="editor"
                label="Editor"
                class="text__14"
                item-value="id"
                item-text="name"
                :value="editor"
                flat
                outlined
                :items="listEditorsBasic"
                required
                :error-messages="editorErrors"
                @blur="$v.editor.$touch()"
                @input="$v.editor.$touch()"
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-else-if="isWriter">
            <v-col cols="12">
              <v-select
                v-model="writer"
                label="Writer"
                class="text__14"
                item-value="id"
                item-text="name"
                flat
                outlined
                :value="writer"
                :items="listWritersBasic"
                clearable
                required
                :error-messages="writerErrors"
                @blur="$v.writer.$touch()"
                @input="$v.writer.$touch()"
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-select
                v-model="marketer"
                label="Marketer"
                class="text__14"
                item-value="id"
                item-text="name"
                :value="marketer"
                flat
                outlined
                :items="listMarketersBasic"
                required
                :error-messages="marketerErrors"
                @blur="$v.marketer.$touch()"
                @input="$v.marketer.$touch()"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="dialog = false" class="text__14">Cancel</v-btn>
        <v-btn color="success" :loading="loadingAssign" @click="disable()" class="text__14">Disable</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  props: ["account"],
  data() {
    return {
      dialog: false,
      marketer: "",
      editor: "",
      writer: "",
      role: "",
      isEditor: true,
      isWriter: false,
      idDisable: "",
      loadingAssign: false
    };
  },
  validations: {
    marketer: { required },
    editor: { required },
    writer: { required },
    form: ["marketer", "editor", "writer"]
  },
  computed: {
    ...mapGetters([
      "listMarketersBasic",
      "listEditorsBasic",
      "listWritersBasic"
    ]),
    marketerErrors() {
      const errors = [];
      if (!this.$v.marketer.$dirty) return errors;
      !this.$v.marketer.required &&
        errors.push("Please select a successor marketer");
      return errors;
    },
    editorErrors() {
      const errors = [];
      if (!this.$v.editor.$dirty) return errors;
      !this.$v.editor.required &&
        errors.push("Please select a successor editor");
      return errors;
    },
    writerErrors() {
      const errors = [];
      if (!this.$v.writer.$dirty) return errors;
      !this.$v.writer.required &&
        errors.push("Please select a successor writer");
      return errors;
    }
  },
  methods: {
    ...mapActions({
      getManagerOfAccount: "authentication/getManagerOfAccount",
      getListEditorBasicByMarketerID:
        "authentication/getListEditorBasicByMarketerID",
      getMarketersBasic: "authentication/getMarketersBasic",
      getListWriterBasic: "authentication/getListWriterBasic",
      removeElementMarketer: "authentication/removeElementMarketer",
      removeElementEditor: "authentication/removeElementEditor",
      removeElementWriter: "authentication/removeElementWriter",
      disableAccount: "authentication/disableAccount",
      getAdminAccounts: "authentication/getAdminAccounts"
    }),
    async disable() {
      this.loadingAssign = false;
      if (this.role == 1) {
        this.$v.marketer.$touch();
        if (!this.$v.marketer.$invalid) {
          let status = await this.disableAccount({
            proAccount: this.idDisable,
            reicAccount: this.marketer
          });
          if (status == 202) {
            await this.getAdminAccounts();
            this.loadingAssign = false;
            this.dialog = false;
          }
        }
      } else if (this.role == 2) {
        !this.$v.editor.$touch();
        if (!this.$v.editor.$invalid) {
          let status = await this.disableAccount({
            proAccount: this.idDisable,
            reicAccount: this.editor
          });
          if (status == 202) {
            await this.getAdminAccounts();
            this.loadingAssign = false;
            this.dialog = false;
          }
        }
      } else {
        !this.$v.writer.$touch();
        if (!this.$v.writer.$invalid) {
          let status = await this.disableAccount({
            proAccount: this.idDisable,
            reicAccount: this.writer
          });
          if (status == 202) {
            await this.getAdminAccounts();
            this.loadingAssign = false;
            this.dialog = false;
          }
        }
      }
    },
    async clickDisableAccount(event) {
      let data = await this.getManagerOfAccount(event.id);
      console.log("Data", data);
      this.idDisable = event.id;
      this.writer = [];
      this.editor = [];
      this.marketer = [];
      if (event.role.id == 1) {
        this.role = 1;
        await this.getMarketersBasic();
        await this.removeElementMarketer(event.id), (this.isEditor = false);
        this.isWriter = false;
      } else if (event.role.id == 2) {
        this.role = event.role.id;
        await this.getListEditorBasicByMarketerID(data.id);
        await this.removeElementEditor(event.id);
        this.isEditor = true;
        this.isWriter = false;
      } else if (event.role.id == 3) {
        this.role = event.role.id;
        await this.getListWriterBasic(data.id);
        await this.removeElementWriter(event.id);
        this.isEditor = false;
        this.isWriter = true;
      }
      this.$v.form.$reset();
    }
  }
};
</script>