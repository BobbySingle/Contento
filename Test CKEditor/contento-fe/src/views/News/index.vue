<template>
  <v-container>
    <div>
      <froala id="edit" :tag="'textarea'" :config="config" v-model="model"></froala>
    </div>
    <div>
      <froalaView v-model="model"></froalaView>
    </div>
  </v-container>
</template>
<script>
import VueFroala from "vue-froala-wysiwyg";
import firebase from "firebase";
const self = this;

export default {
  data() {
    return {
      config: {
        key: "1C%kZV[IX)_SL}UJHAEFZMUJOYGYQE[\\ZJ]RAe(+%$==",
        attribution: false, // to hide "Powered by Froala"
        imageUploadRemoteUrls: false,
        placeholderText: "Edit Your Content Here!",
        charCounterCount: true,
        videoUpload: false,
        toolbarButtons: {
          moreText: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
              "fontFamily",
              "fontSize",
              "textColor",
              "backgroundColor",
              "inlineClass",
              "inlineStyle",
              "clearFormatting"
            ]
          },
          moreParagraph: {
            buttons: [
              "alignLeft",
              "alignCenter",
              "formatOLSimple",
              "alignRight",
              "alignJustify",
              "formatOL",
              "formatUL",
              "paragraphFormat",
              "paragraphStyle",
              "lineHeight",
              "outdent",
              "indent",
              "quote"
            ]
          },
          moreRich: {
            buttons: [
              "insertLink",
              "insertImage",
              "insertVideo",
              "insertTable",
              "emoticons",
              "fontAwesome",
              "specialCharacters",
              "embedly",
              "insertHR"
            ]
          },
          moreMisc: {
            buttons: [
              "undo",
              "redo",
              "fullscreen",
              "print",
              "getPDF",
              "spellChecker",
              "selectAll",
              "html",
              "help"
            ],
            align: "right",
            buttonsVisible: 3
          }
        },
        events: {
          initialized: function() {
            console.log("initialized");
          },
          "image.beforeUpload": function(images) {
            console.log("images", images[0]);
            console.log("type", images[0].type);
            let file = images[0];
            let fileRef = firebase.storage().ref("images/content/" + file.name);

            // var nameTypeFile = file.name.split(".").pop();
            var nameTypeFile = file.type;
            console.log("nameTypeFile", nameTypeFile);
            if (file.size > 5000000) {
              alert("File must be less then 5 Mb");
            } else {
              if (
                nameTypeFile == "image/jpeg" ||
                nameTypeFile == "image/jpg" ||
                nameTypeFile == "image/png"
              ) {
                let uploadTask = fileRef.put(file);

                let imgUrl = null;
                uploadTask.on(
                  "state_changed",
                  _snapshot => {
                    console.log(
                      "snapshot progess " +
                        (_snapshot.bytesTransferred / _snapshot.totalBytes) *
                          100
                    );
                  },
                  _error => {
                    console.log(_error);
                    reject(_error);
                  },
                  () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(url => {
                      url;
                      console.log("URL", url);
                      this.image.insert(url, null, null, this.image.get());
                    });
                  }
                );
              } else {
                alert("Type file must be PNG, JPEG, JPG");
              }
            }
            return false;
          }
        }
      },
      model: ""
    };
  }
};
</script>
<style scoped>
</style>