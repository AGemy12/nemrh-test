<template>
  <div class="checkout_ticket_card_wrapper">
    <!-- Start:: Ticket Image -->
    <div class="card_image_wrapper">
      <img
        class="ticket_image"
        v-lazy="ticketData.image"
        :alt="ticketData.title"
        width="300"
        height="360"
        loading="lazy"
      />
    </div>
    <!-- End:: Ticket Image -->

    <!-- Start:: Ticket Info -->
    <div class="ticket_info">
      <!-- ********** Start:: Ticket Details ********** -->
      <div class="info_wrapper">
        <p class="ticket_name">{{ ticketData.title }}</p>

        <div class="details_wrapper">
          <div class="detail_item_wrapper">
            <i class="fa-solid fa-location-dot"></i>

            <span> {{ticketData.location}} </span>
          </div>

          <div class="detail_item_wrapper">
            <i class="fa-solid fa-user"></i>

            <span> {{ticketData.quantity}} </span>
          </div>

          <div class="detail_item_wrapper">
            <i class="fa-solid fa-chair"></i>

            <span> {{ticketData.adjacent_translated}} </span>
          </div>

          <div class="detail_item_wrapper">
            <i class="fa-solid fa-calendar-days"></i>

            <span> {{ticketData.date}} </span>
          </div>
        </div>
      </div>

      <div class="ticket_price">
        {{ticketData.price}} {{$t("APP_CURRENCY")}}
      </div>
      <!-- ********** End:: Ticket Details ********** -->
    </div>
    <!-- End:: Ticket Info -->
  </div>
</template>

<script>
export default {
  name: 'CheckoutTicketCard',

  props: {
    ticketData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.checkout_ticket_card_wrapper {
  padding: 20px 15px;
  @include flex(flex-start, center);
  column-gap: 15px;
  // ********** Start:: Product Image **********
  .card_image_wrapper {
    margin-top: 35px;
    min-width: 170px;
    max-width: 170px;
    height: 100px;
    @include flex(center, center);
    border: 1px solid var(--border_clr);
    border-radius: 8px;

    .ticket_image {
      transform: translateY(-25px);
      width: 90%;
      height: auto;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  // ********** End:: Product Image **********

  // ********** Start:: Product Info **********
  .ticket_info {
    width: 100%;
    padding: 10px 15px;
    @include flex(space-between, center);
    column-gap: 25px;

    .info_wrapper {
      .ticket_name {
        margin-bottom: 0.6rem !important;
        font-size: 1.2rem;
        font-family: $semi_bold_font;
      }

      .details_wrapper {
        @include flex(center, flex-start, column);
        row-gap: 8px;
        .detail_item_wrapper {
          @include flex(flex-start, center);
          column-gap: 10px;
          svg, i {
            color: var(--light_theme_text_clr);
            font-size: 1rem;
          }
          span {
            font-size: 13px;
            color: var(--light_theme_text_clr);
            font-family: $medium_font;
          }
        }
      }
    }

    .ticket_price {
      font-size: 1.3rem;
      font-family: $semi_bold_font;
    }
  }
  // ********** End:: Product Info **********

  @include media(md) {
    flex-direction: column;
    row-gap: 8px;
    // ********** Start:: Product Image **********
    .card_image_wrapper {
      margin-top: 50px;
      min-width: 250px;
      max-width: 250px;
      height: 150px;
      .ticket_image {
        transform: translateY(-25px);
      }
    }
    // ********** End:: Product Image **********

    // ********** Start:: Product Info **********
    .ticket_info {
      padding: 10px 0;
      column-gap: 20px;
    }
    // ********** End:: Product Info **********
  }
}
</style>
