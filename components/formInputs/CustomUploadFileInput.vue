<template>
  <div class="custom_upload_file_input my-5">
    <div class="loader_overlay" v-if="imageIsUploading"></div>

    <input
      type="file"
      accept="image/png, image/jpg, image/jpeg"
      class="form-control"
      :id="identifier"
      @change="selectUploadedImage"
      :disabled="viewOnly || imageIsUploading"
    />

    <label
      class="selected_image_wrapper"
      :for="identifier"
      v-if="selectedFile.path || preSelectedFile"
    >
      <span>
        <img
          src="@/assets/media/icons/ui_icons/camera.svg"
          width="38"
          height="38"
          loading="lazy"
          alt="Camera Image"
        >
      </span>

      <img
        class="selected_image"
        :src="selectedFile.path ? selectedFile.path : preSelectedFile"
        width="140"
        height="140"
        loading="lazy"
        alt="Selected Image"
      >
    </label>
  </div>
</template>

<script>
import predictFileType from "~/utils/predictFileType.js";

export default {
  name: "CustomUploadFileInput",

  emits: ["selectFile"],

  props: {
    identifier: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    preSelectedFile: {
      type: String,
      required: false,
    },
    imageIsUploading: {
      type: Boolean,
      required: false,
      default: false,
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  data() {
    return {
      // Start:: Data Collection To Send
      selectedFile: {
        file: null,
        path: null,
        name: null,
      },
      // End:: Data Collection To Send
    }
  },

  methods: {
    // Start:: Select Image To Upload
    selectUploadedImage(e) {
      if( predictFileType(e.target.files[0].name) !== "image_file") {
        this.$izitoast.error({
          message: this.$t("FORMS.Validation.selectedFileMustBeImage"),
        });
        return;
      } else {
        this.selectedFile.file = e.target.files[0];
        this.selectedFile.path = URL.createObjectURL(e.target.files[0]);
        this.selectedFile.name = e.target.files[0].name;
        this.$emit('selectFile', {changedInput: this.identifier, ...this.selectedFile});
      }
    },
    // End:: Select Image To Upload
  },
}
</script>

<style lang="scss" scoped>
.custom_upload_file_input {
  position: relative;
  @include flex(center, center, column);
  row-gap: 15px;
  .loader_overlay {
    position: absolute;
    inset: 0;
    background-color: var(--opacity_main_theme_clr);
    backdrop-filter: blur(2px);
    border-radius: 50%;
    @include flex(center, center);
    z-index: 1;
    &::after {
      content: "";
      display: block;
      width: 35px;
      height: 35px;
      padding: 2px;
      border: 3px dotted var(--main_theme_clr);
      border-style: solid solid dotted dotted;
      @include borderRadius(50%);
      @include transitioning(0.4s);
      animation: rotation 2s linear infinite;
    }
  }

  .selected_image_wrapper {
    position: relative;
    span {
      position: absolute;
      bottom: -5px;
      right: 0px;
      z-index: 5;
    }
    .selected_image {
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }
  input {
    display: none;
    &[disabled="disabled"] {
      & + label {
        cursor: no-drop;
      }
    }
  }
}

@keyframes rotation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
