<template>
  <div :class="col ? `col-md-${col}` : ''">
    <div
      class="single_document_input_wrapper"
      :class="{ disabled: disabled, has_error: errorMessage }"
    >
      <input
        class="form-control"
        type="file"
        :accept="accept"
        :id="identifier"
        @change="selectDocumentToUpload"
        :disabled="disabled"
      />
      <label :for="identifier">
        <span
          class="input_placeholder"
          v-if="placeholder && !preSelectedDocument && !document.name"
        >
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
import predictFileType from '@/utils/predictFileType.js'

export default {
  name: 'BaseDocumentUploadInput',

  emits: ['selectDocument', 'clearErrors'],

  props: {
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
      default: '.pdf',
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
  },

  data() {
    return {
      document: {
        path: null,
        file: null,
        name: null,
      },
    }
  },

  methods: {
    selectDocumentToUpload(e) {
      const file = e.target.files[0]
      const fileType = predictFileType(file.name)
      const acceptedTypes = this.accept.split(',').map((type) => type.trim())

      // Verify file type against accepted types
      if (
        (acceptedTypes.includes('.pdf') && fileType === 'pdf_file') ||
        (acceptedTypes.includes('.png') && fileType === 'image_file') ||
        (acceptedTypes.includes('.jpg') && fileType === 'image_file') ||
        (acceptedTypes.includes('.jpeg') && fileType === 'image_file') ||
        (acceptedTypes.includes('.csv') && fileType === 'csv_file')
      ) {
        this.document.path = URL.createObjectURL(file)
        this.document.file = file
        this.document.name = file.name

        this.$emit('selectDocument', {
          identifier: this.identifier,
          ...this.document,
        })
        this.$emit('clearErrors')
      } else {
        // Error handling based on file type
        if (acceptedTypes.includes('.pdf') && fileType !== 'pdf_file') {
          this.$izitoast.error({
            message: this.$t('FORMS.Validation.selectedFileMustBePdf'),
          })
        } else if (
          acceptedTypes.includes('image') &&
          fileType !== 'image_file'
        ) {
          this.$izitoast.error({
            message: this.$t('FORMS.Validation.selectedFileMustBeImage'),
          })
        } else if (acceptedTypes.includes('.csv') && fileType !== 'csv_file') {
          this.$izitoast.error({
            message: this.$t('FORMS.Validation.selectedFileMustBeCsv'),
          })
        } else {
          this.$izitoast.error({
            message: this.$t('FORMS.Validation.invalidFileType'),
          })
        }
      }
    },
  },
}
</script>
