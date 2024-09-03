<template>
  <div :class="col ? `col-md-${col}` : ''">
    <div class="single_document_input_wrapper" :class="{disabled: disabled, has_error: errorMessage}">
      <input
        class="form-control"
        type="file"
        :accept="accept"
        :id="identifier"
        @change="selectDocumentToUpload"
        :disabled="disabled"
      />
      <label :for="identifier">
        <span class="input_placeholder" v-if="placeholder && (!preSelectedDocument && !document.name)">
          {{ placeholder }}
        </span>
        <span class="document_name" v-else-if="document.name">
          {{ document.name }}
        </span>
        <span class="document_name" v-else-if="preSelectedDocument">
          {{ preSelectedDocument.name }}
        </span>

        <i class="fa-solid fa-arrow-up-from-bracket"></i>
      </label>
    </div>

    <span class="error_message" v-if="errorMessage"> {{ errorMessage }} </span>
  </div>
</template>

<script>
import predictFileType from "@/utils/predictFileType.js";

export default {
  name: "BaseDocumentUploadInput",

  emits: ["selectDocument", "clearErrors"],

  props: {
    // ====== Start:: General Inputs Props ====== //
    col: {
      required: false,
      type: String,
    },
    identifier: {
      required: true,
      type: String,
    },
    preSelectedDocument: {
      required: false,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    errorMessage: {
      required: false,
      type: String,
    },
    accept: {
      type: String,
      required: false,
      default: ".pdf"
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    // ====== End:: General Inputs Props ====== //
  },

  data() {
    return {
      document: {
        path: null,
        file: null,
        name: null,
      },
    };
  },

  methods: {
    // Start:: Select Document
    selectDocumentToUpload(e) {
      if (this.accept.includes("pdf") && predictFileType(e.target.files[0].name) !== "pdf_file") {
        this.$izitoast.error({
          message: this.$t('FORMS.Validation.selectedFileMustBePdf'),
        });
        return;
      } else if (this.accept.includes("image") && predictFileType(e.target.files[0].name) !== "image_file") {
        this.$izitoast.error({
          message: this.$t('FORMS.Validation.selectedFileMustBeImage'),
        });
        return;
      } else {
        this.document.path = URL.createObjectURL(e.target.files[0]);
        this.document.file = e.target.files[0];
        this.document.name = e.target.files[0].name;
        this.$emit("selectDocument", {
          identifier: this.identifier,
          ...this.document,
        });
        this.$emit("clearErrors")
        // console.log("SELECTED =>", this.document);
      }
    },
    // End:: Select Document
  },
};
</script>
