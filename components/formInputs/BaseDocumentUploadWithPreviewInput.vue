<template>
  <div :class="col ? `col-md-${col}` : ''">
    <div class="single_document_input_with_preview_wrapper" :class="{disabled: disabled, has_error: errorMessage}">
      <div class="wrapper">
        <template v-if="preSelectedImage">
          <img
            v-if="accept.includes('pdf')"
            class="d-block mt-3"
            src="@/assets/media/icons/ui_icons/pdf.svg"
            alt="pfd preview"
            width="120"
            height="120"
            loading="lazy"
          />

          <img
            v-else
            class="image_uploaded"
            :src="image.path"
            alt="Image To Upload"
            width="140"
            height="110"
          />
        </template>

        <template v-else-if="accept.includes('pdf') && !preSelectedImage">
          <img
            class="d-block mt-3"
            :src="!image.path ? require('@/assets/media/images/upload_image.svg') : require('@/assets/media/icons/ui_icons/pdf.svg')"
            alt="selected preview"
            :width="!image.path ? '140' : '120'"
            :height="!image.path ? '110' : '120'"
            loading="lazy"
          />
        </template>

        <input
          class="form-control"
          type="file"
          :accept="accept"
          :id="identifier"
          @change="selectImageToUpload"
          :disabled="disabled"
        />
        <label :for="identifier"></label>
      </div>

      <span class="input_placeholder" v-if="placeholder">
        {{ placeholder }}
        <span class="text-danger" v-if="required"> * </span>
      </span>
    </div>

    <span class="error_message" v-if="errorMessage"> {{ errorMessage }} </span>
  </div>
</template>

<script>
import predictFileType from "@/utils/predictFileType.js";

export default {
  name: "BaseDocumentUploadWithPreviewInput",

  emits: ["selectImage", "clearErrors"],

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
    preSelectedImage: {
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
      image: {
        path: null,
        file: null,
        name: null,
      },
    };
  },

  methods: {
    // Start:: Select Image
    selectImageToUpload(e) {
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
        this.image.path = URL.createObjectURL(e.target.files[0]);
        this.image.file = e.target.files[0];
        this.image.name = e.target.files[0].name;
        this.$emit("selectImage", {
          identifier: this.identifier,
          ...this.image,
        });
        this.$emit("clearErrors")
        // console.log("SELECTED =>", this.image);
      }
    },
    // End:: Select Image
  },
};
</script>
