<template>
  <transition name="fadeInUp">
    <v-dialog
      max-width="700"
      class="spider_modal"
      v-model="modalIsOpen"
      @click:outside="toggleModal"
    >
      <v-card>
        <div class="modal_wrapper">
          <!-- ========== Start:: Modal Body ========== -->
          <div class="modal_body">
            <h3>
              {{
                $i18n.locale === 'ar'
                  ? 'لا يوجد شركه مسجله بهذا البريد الإلكتروني'
                  : 'There is no company registered with this email'
              }}
            </h3>
            <p>
              {{
                $i18n.locale === 'ar'
                  ? 'يجب اضافة شركتك اولا قبل اختيار موضع الإعلان'
                  : 'You must add your company first before choosing the ad placement'
              }}
            </p>
          </div>
          <!-- ========== End:: Modal Body ========== -->

          <!-- ========== Start:: Modal Footer ========== -->
          <div class="modal_footer_wrapper">
            <a href="/add-company" class="modal_link">
              {{ $i18n.locale === 'ar' ? 'أضف شركتك' : 'Add Your Company' }}
            </a>

            <button @click="toggleModal" class="close_btn">
              {{ $i18n.locale === 'ar' ? 'إغلاق' : 'Close' }}
            </button>
          </div>
          <!-- ========== End:: Modal Footer ========== -->
        </div>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
export default {
  name: 'spiderModal',

  emits: ['toggleModal'],

  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    // Start:: Control Modal Apperance
    toggleModal() {
      this.$emit('toggleModal')
    },
    // End:: Control Modal Apperance
  },
}
</script>

<style lang="scss" scoped>
.modal_wrapper {
  @include flex(center, center);
  flex-direction: column;
  padding: 2.5rem 1rem 1rem;

  .modal_close_btn {
    position: absolute;
    top: 3px;
    inset-inline-start: 15px;
    i {
      font-size: 16px;
    }
  }

  .modal_body {
    @include flex(center, center, column);
    gap: 0.825rem;

    h3 {
      @include font($medium_font, 1.5rem, var(--theme_text_clr));
      text-align: center;
      line-height: 1.7;

      @include media(md) {
        font-size: 1.25rem;
      }
    }
    p {
      @include font($regular_font, 1.15rem, var(--light_theme_text_clr));
      text-align: center;

      @include media(md) {
        font-size: 1rem;
      }
    }
  }

  .modal_footer_wrapper {
    @include flex(center, center);
    flex-wrap: wrap;
    gap: 1rem;
    padding: 25px 15px;
  }
}

.modal_link {
  @include primaryBtnStyle;
}

.close_btn {
  @include primaryBtnStyle;
  background-color: transparent;
  background-image: none;
  color: var(--theme_text_clr);
}
</style>
