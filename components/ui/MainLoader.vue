<template>
  <div class="main_loader_wrapper">
    <img
      class="logo"
      src="@/assets/media/logo/logo.svg"
      width="160"
      height="160"
      alt="Logo"
    />
  </div>
</template>

<script>
export default {
  name: 'MainLoader',

  methods: {
    // start() {
    //   this.loading = true
    // },
    // finish() {
    //   this.loading = false
    // },
  },
}
</script>

<style lang="scss" scoped>
.main_loader_wrapper {
  position: fixed;
  inset: 0;
  background-color: white;
  @include flex(center, center);
  z-index: 50;
  min-height: 100vh;
  max-height: 100vh;

  .logo {
    animation-name: puls;
    animation-duration: 4s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-play-state: running;
  }
}

@keyframes puls {
  0% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1.2);
  }
}
</style>
