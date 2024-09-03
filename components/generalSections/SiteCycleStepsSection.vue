<template>
  <section class="site_cycle_steps_section_wrapper">
    <div class="container">
      <h2 class="steps_section_title" v-html="$t('TITLES.SiteCycleSteps.title')"></h2>

      <div class="row justify-content-between align-items-start">
        <!-- Start:: Step One -->
        <div 
          class="col-md-3" 
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <div class="step_content_wrapper">
            <img
              src="@/assets/media/images/search_step.svg"
              width="95"
              height="95"
              :alt="$t('CYCLESTEPS.stepOneTitle')"
              loading="lazy"
            >
            <h4 class="step_title"> {{ $t("CYCLESTEPS.stepOneTitle") }} </h4>
            <p class="step_desc"> {{ $t("CYCLESTEPS.stepOneDesc") }} </p>
          </div>
        </div>
        <!-- Start:: Step One -->

        <div 
          class="col-md-1 p-0 position-relative d-none d-md-block"
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="500"
        >
          <img
            class="next_step_arrow"
            src="@/assets/media/images/step_arrow_1.svg"
            width="95"
            height="95"
            alt="next step"
            loading="lazy"
          >
        </div>

        <!-- Start:: Step Two -->
        <div 
          class="col-md-3"
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="1000"
        >
          <div class="step_content_wrapper">
            <img
              src="@/assets/media/images/select_comp_step.svg"
              width="95"
              height="95"
              :alt="$t('CYCLESTEPS.stepTwoTitle')"
              loading="lazy"
            >
            <h4 class="step_title"> {{ $t("CYCLESTEPS.stepTwoTitle") }} </h4>
            <p class="step_desc"> {{ $t("CYCLESTEPS.stepTwoDesc") }} </p>
          </div>
        </div>
        <!-- Start:: Step Two -->

        <div 
          class="col-md-1 p-0 position-relative d-none d-md-block"
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="1500"
        >
          <img
            class="next_step_arrow"
            src="@/assets/media/images/step_arrow_2.svg"
            width="95"
            height="95"
            alt="next step"
            loading="lazy"
          >
        </div>

        <!-- Start:: Step Three -->
        <div 
          class="col-md-3"
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="2000"
        >
          <div class="step_content_wrapper">
            <img
              src="@/assets/media/images/send_message_step.svg"
              width="95"
              height="95"
              :alt="$t('CYCLESTEPS.stepThreeTitle')"
              loading="lazy"
            >
            <h4 class="step_title"> {{ $t("CYCLESTEPS.stepThreeTitle") }} </h4>
            <p class="step_desc"> {{ $t("CYCLESTEPS.stepThreeDesc") }} </p>
          </div>
        </div>
        <!-- Start:: Step Three -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SiteCycleStepsSection',
}
</script>

<style lang="scss">
.site_cycle_steps_section_wrapper {
  padding-block: $section_block_padding * 0.2 $section_block_padding;

  .steps_section_title {
    margin-block-end: 5.5rem;
    @include font($bold_font, 1.6rem);
    text-transform: capitalize;
    text-align: center;
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

  .step_content_wrapper {
    @include flex(center, center, column);
    row-gap: 1.3rem;
    text-align: center;

    .step_title {
      margin: 0 !important;
      @include font($bold_font, 1.1rem, var(--main_theme_clr));
    }

    .step_desc {
      margin: 0 !important;
      @include font($regular_font, 0.9rem, var(--light_theme_text_clr));
    }
  }

  .next_step_arrow {
    width: 260%;
    height: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  div[class^='col-'] {
    &:nth-of-type(4) {
      .next_step_arrow {
        top: 70px;
      }
    }
  }


  @include media(md) {
    .steps_section_title {
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
  };
}
</style>
