<template>
  <section class="about_section_wrapper">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <!-- Start:: Section Text -->
        <div
          class="col-lg-5"
          :data-aos="$i18n.locale === 'en' ? 'fade-right' : 'fade-left'"
        >
          <div class="section_text_content_wrapper">
            <h2 class="section_title" v-html="sectionData.title"></h2>
            <p class="section_desc">
              {{ sectionData.description }}
            </p>

            <div class="section_route_container">
              <a
                v-if="contactData"
                class="section_route"
                v-html="
                  $t('BUTTONS.contactOnPhoneNumber', {
                    number: contactData.socials.whatsapp,
                  })
                "
                :href="contactData.socials.whatsapp_link"
                target="_blank"
              >
              </a>
            </div>
          </div>
        </div>
        <!-- End:: Section Text -->

        <!-- Start:: Section Image -->
        <div
          class="col-lg-6"
          :data-aos="$i18n.locale === 'en' ? 'fade-left' : 'fade-right'"
        >
          <img
            class="section_image w-100 h-auto"
            src="../../assets/media/logo/logo.svg"
            :alt="$t('TITLES.AboutUs.title')"
            width="200"
            height="200"
            loading="lazy"
          />
        </div>
        <!-- End:: Section Image -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AboutSection',

  props: {
    sectionData: {
      type: Object,
      required: true,
    },
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      contactData: 'contactUsData/contactUsData',
    }),
    // End:: Vuex Getters

    // addSpanToLastWord() {
    //   const sentence = this.sectionData.title
    //   const splittedWords = sentence.split(' ')
    //   return splittedWords
    // },
  },

  // methods: {
  //   useWordSpanWrapper(sentence, breakWord) {
  //     const splittedWords = sentence.split(' ')
  //     const lastWord = splittedWords.value.pop()
  //     const lastWordWrappedBySpan = `<br/> <span>${lastWord.value}</span>`
  //     splittedWords.value.push(lastWordWrappedBySpan.value)
  //     const updatedSplittedWords = splittedWords.value.join(' ')
  //     const updatedSentence = updatedSplittedWords.value
  //   },
  // },
}
</script>

<style lang="scss">
.about_section_wrapper {
  padding-block: $section_block_padding * 0.5;
  .row {
    @include media(md) {
      flex-direction: column-reverse;
    }
  }

  .section_text_content_wrapper {
    .section_title {
      @include font($semi_bold_font, 1.8rem);
      text-transform: capitalize;
      line-height: 1.8;

      span {
        display: inline-block;
        margin-inline: 0.3rem;
        text-align: center;
        padding: 0.2rem 1rem;
        @include font($medium_font, 1.4rem);
        color: var(--white);
        background-color: var(--main_theme_clr);
        border-radius: 8px;
      }
    }
    .section_desc {
      margin-top: 1.5rem !important;
      text-align: justify;

      @include font($medium_font, 1rem, var(--dark_main_theme_clr));

      & > span {
        display: inline-block;
        margin-inline: 0.1rem;
        &:last-of-type {
          color: var(--main_theme_clr);
        }
      }
    }
    .section_route {
      @include primaryBtnStyle;
      font-size: 1rem;
      margin-top: 35px;
      width: max-content;
    }
  }

  @include media(md) {
    padding-block: 0 $section_block_padding * 0.5;
    .section_text_content_wrapper {
      .section_title {
        font-size: 1.4rem;
        line-height: 1.6;
        flex-wrap: wrap;
        row-gap: 1rem;
        text-align: center;
        max-width: 95%;

        span {
          padding: 0.2rem 1.2rem;
          font-size: 1.1rem;
        }
      }

      .section_desc {
        margin-block: 0.5rem;
      }

      .section_route_container {
        @include flex(center, center);
        inline-size: 100%;
      }
    }
  }
}
</style>
