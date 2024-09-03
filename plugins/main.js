import Vue from 'vue';

// ********** Inputs
import BaseInput from '@/components/formInputs/BaseInput.vue';
import BaseDocumentUploadInput from '~/components/formInputs/BaseDocumentUploadInput.vue';
import BaseDocumentUploadWithPreviewInput from '~/components/formInputs/BaseDocumentUploadWithPreviewInput.vue';
import CustomUploadFileInput from '@/components/formInputs/CustomUploadFileInput.vue';
import BaseSelectInput from '@/components/formInputs/BaseSelectInput.vue';
import BaseCountryFlagPhoneInput from '@/components/formInputs/BaseCountryFlagPhoneInput.vue';
import BaseOtpInput from '@/components/formInputs/BaseOtpInput.vue';
import BaseTextArea from '@/components/formInputs/BaseTextArea.vue';
import MapLocationInput from '~/components/formInputs/MapSearchLocationInput.vue'
Vue.component('base-input', BaseInput);
Vue.component('base-document-upload-input', BaseDocumentUploadInput);
Vue.component('base-document-upload-with-preview-input', BaseDocumentUploadWithPreviewInput);
Vue.component('custom-file-upload-input', CustomUploadFileInput);
Vue.component('base-country-flag-phone-input', BaseCountryFlagPhoneInput);
Vue.component('base-select-input', BaseSelectInput);
Vue.component('base-otp-input', BaseOtpInput);
Vue.component('base-textarea', BaseTextArea);
Vue.component('map-location-input', MapLocationInput);

// ********** Ui Components
import MainLoader from "@/components/ui/MainLoader.vue";
import BaseDropdown from '@/components/ui/BaseDropdown.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import BaseBreadcrumb from '@/components/ui/BaseBreadcrumb.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTabs from '@/components/ui/BaseTabs.vue';

Vue.component('main-loader', MainLoader);
Vue.component('base-pagination', BasePagination);
Vue.component('base-breadcrumb', BaseBreadcrumb);
Vue.component('base-button', BaseButton);
Vue.component('base-dropdown', BaseDropdown);
Vue.component('base-tabs', BaseTabs);


import ImageModal from '@/components/modals/media/ImageModal.vue';
Vue.component('image-modal', ImageModal);
