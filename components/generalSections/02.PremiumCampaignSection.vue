<template>
  <section class="premium_campaign_section_content_wrapper">
    <div class="container">
      <div class="campaign_banner_wrapper">
        <div class="container">
          <div class="row justify-content-evenly align-items-center">
            <div 
              class="col-lg-4 d-flex justify-content-center align-items-center"
              :data-aos="$i18n.locale === 'en' ? 'fade-right' : 'fade-left'"
            >
              <a
                class="d-flex justify-content-center align-items-center w-100"
                :href="sectionData.company.link" 
                target="_blank"
              >
                <img class="premium_campaign_image" v-lazy="sectionData.company.image" :alt="sectionData.company.title" width="100"
                  height="100" loading="lazy" />
              </a>
            </div>

            <div 
              class="col-lg-7"
              :data-aos="$i18n.locale === 'en' ? 'fade-left' : 'fade-right'"
            >
              <h2 
                class="premium_campaign_title" 
                v-lettering="{splits: [' ']}"
                :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
              >
                {{ sectionData.ad_desc }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PremiumCampaignSection",

  props: {
    sectionData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.premium_campaign_section_content_wrapper {
  padding-block: $section_block_padding;

  .campaign_banner_wrapper {
    padding: 2rem 1rem;
    background-color: #FBF9FF;
    border-radius: 8px;

    .premium_campaign_image {
      padding: 0.5rem;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: cover;
      box-shadow: 0 0 10px var(--simple_shadow_clr);
    }

    .premium_campaign_title {
      text-transform: capitalize;
      line-height: 1.8;

      & > span {
        display: inline-block;
        margin-inline: 0.35rem;
        font-family: $bold_font;
        font-size: 1.8rem;
        
        &:nth-last-of-type(-n+2) {
          margin: 0;
          padding: 0rem 0.5rem;
          background-color: var(--main_theme_clr);
          @include font($bold_font, 1.5rem, var(--white));
          @include rtl(border-radius, 6px 0 0 6px, 0 6px 6px 0);
        }

        &:last-of-type {
          @include rtl(border-radius, 0 6px 6px 0, 6px 0 0 6px);
          @include rtl(padding-inline, 0 0.5rem, 0.5rem 0);
        }
      }
    }
  }

  @include media(md) {
    padding-block: $section_block_padding * 0.5;
    .campaign_banner_wrapper {
      .premium_campaign_image {
        width: 85%;
        height: 85%;
      }

      .premium_campaign_title {
        text-align: center;
        & > span {
          font-size: 1.4rem;
          &:nth-last-of-type(-n+2) {
            font-size: 1.4rem;
          }

        }
      }
    } 
  }
}
</style>