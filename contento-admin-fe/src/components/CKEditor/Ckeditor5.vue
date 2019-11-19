<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :config="editorConfig"
    @ready="onReady"
    @input="updateField"
    style="min-height: 500px; border:1px solid grey;"
  ></ckeditor>
</template>

<script>
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document/";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadImagePlugin from "../../mixins/UploadImagePlugin";
function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return new UploadImagePlugin(loader);
  };
  editor.plugins.get("EasyImage").createUploadAdapter = loader => {
    return new UploadImagePlugin(loader);
  };
}
export default {
  props: {
    //content is allow string or html content
    content: {
      type: String,
      required: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    typeing: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      editor: DecoupledEditor,
      editorData: this.content,
      editorConfig: {
        extraPlugins: [CustomUploadAdapterPlugin]
      },
      editorInstance: null
    };
  },
  methods: {
    updateField() {
      this.$emit("ckeditorContent", this.editorData);
    },
    onReady(editor) {
      console.log("on ready");
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      this.editorInstance = editor;
      this.editorInstance.isReadOnly = this.readOnly;
    },
    changeEditorReadOnly() {
      this.editorInstance.isReadOnly = !this.editorInstance.isReadOnly;
    }
  },
  watch: {
    content: function() {
      this.editorData = this.content;
    }
  }
};
</script>
<style scoped>
::v-deep table {
  width: 100% !important;
}
</style>