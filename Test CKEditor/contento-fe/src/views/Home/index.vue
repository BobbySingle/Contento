<template>
  <div>
    <div style="width:800px;">
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
    <div>Words: {{words}} - Characters: {{characters}}</div>
    <div
      class="editor"
      v-html="editorData"
      style="width:1000px; background-color:#c9c9dc; min-height:500px"
    />
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Font from "@ckeditor/ckeditor5-font/src/font";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
// import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";

import WordCount from "@ckeditor/ckeditor5-word-count/src/wordcount";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";

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
  name: "app",
  data() {
    return {
      words: "",
      characters: "",
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        extraPlugins: [CustomUploadAdapterPlugin],
        plugins: [
          Essentials,
          Alignment,
          Font,
          FontSize,
          FontFamily,
          Highlight,
          UploadAdapter,
          Autoformat,
          Bold,
          Italic,
          Strikethrough,
          Subscript,
          Superscript,
          Code,
          Underline,
          BlockQuote,
          CKFinder,
          EasyImage,
          Heading,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          //   ImageResize,
          Indent,
          IndentBlock,
          Link,
          List,
          TodoList,
          MediaEmbed,
          Paragraph,
          PasteFromOffice,
          Table,
          TableToolbar,
          WordCount,
          HorizontalLine,
          RemoveFormat
        ],
        image: {
          resizeUnit: "px"
        },
        toolbar: {
          items: [
            "heading",
            "|",
            "fontsize",
            "fontfamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "removeformat",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "code",
            "subscript",
            "superscript",
            "|",
            "highlight",
            "horizontalLine",
            "alignment",
            "|",
            "numberedList",
            "bulletedList",
            "todoList",
            "|",
            "indent",
            "outdent",
            "|",
            "link",
            "imageUpload",
            "blockquote",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo"
          ]
        },
        image: {
          styles: ["full", "alignLeft", "alignRight"],
          toolbar: [
            "imageStyle:alignLeft",
            "imageStyle:full",
            "imageStyle:alignRight",
            "|",
            "imageTextAlternative"
          ]
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
        },
        fontSize: {
          options: [9, 10, 11, 12, 13, 14, "default", 16, 18, 20, 22]
        },
        wordCount: {
          onUpdate: stats => {
            this.characters = stats.characters;
            this.words = stats.words;
          }
        }
      }
    };
  }
};
</script>
<style scoped>
</style>