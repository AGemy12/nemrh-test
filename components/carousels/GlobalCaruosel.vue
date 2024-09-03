<template>
  <section class="hero_section_carousel">
    <div class="carousel-container">
      <div class="carousel">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="['item', { active: index === activeIndex }]"
        >
          <img :src="item.src" :alt="item.alt" />
          <p class="caption">{{ item.caption }}</p>
        </div>
      </div>
      <button class="btn prev" @click="prevItem">Prev</button>
      <button class="btn next" @click="nextItem">Next</button>
      <div class="dots">
        <span
          v-for="(dot, index) in items"
          :key="index"
          :class="['dot', { active: index === activeIndex }]"
          @click="showItem(index)"
        ></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: 'https://bit.ly/34xczKy',
          alt: 'Image 1',
          caption: 'Caption for Image 1',
        },
        {
          src: 'https://bit.ly/3lkp5DW',
          alt: 'Image 2',
          caption: 'Caption for Image 2',
        },
        {
          src: 'https://bit.ly/3iMHuI1',
          alt: 'Image 3',
          caption: 'Caption for Image 3',
        },
      ],
      activeIndex: 0,
    }
  },
  methods: {
    showItem(index) {
      this.activeIndex = index
    },
    prevItem() {
      this.activeIndex =
        (this.activeIndex - 1 + this.items.length) % this.items.length
    },
    nextItem() {
      this.activeIndex = (this.activeIndex + 1) % this.items.length
    },
  },
}
</script>

<style lang="scss" scoped>
.hero_section_carousel {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  font-family: 'Satoshi', sans-serif;
  font-size: var(--lx-text-01);
  font-weight: 500;
  color: #ffffe6;
  background-color: #10100e;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  .carousel-container {
    width: 80%;
    margin: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--lx-gap);

    .carousel {
      aspect-ratio: 16/9;
      width: 100%;
      position: relative;
      overflow: hidden;

      .item {
        opacity: 0;
        width: 100%;
        height: 100%;
        display: none;
        transition: opacity 0.5s ease-in-out;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .caption {
          width: 100%;
          padding: var(--lx-space-01);
          position: absolute;
          bottom: 0;
          text-transform: uppercase;
          text-align: center;
          font-size: 12px;
          background-color: rgba(0, 0, 0, 0.5);
        }

        &.active {
          opacity: 1;
          display: block;
        }
      }
    }

    .btn {
      padding: 1em 2em;
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      outline: none;
      border: none;
      cursor: pointer;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 900;
      color: #10100e;
      background-color: #ffffe6;
      transition: transform 0.2s ease-in-out;

      &:active,
      &:focus {
        transform: translateY(-50%) scale(0.9);
      }

      &:hover {
        transform: translateY(-50%) scale(0.96);
      }
    }

    .prev {
      left: -5%;
    }

    .next {
      right: -5%;
    }

    .dots {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      .dot {
        cursor: pointer;
        height: 10px;
        width: 10px;
        background-color: #242421;
        transition: background-color 0.2s ease;

        &.active,
        &:hover {
          background-color: #ffffe6;
        }
      }
    }
  }
}
</style>
