<template>
  <div v-if="!videoSkipped" class="video_intro">
    <video
      ref="introVideo"
      :src="srcVideo"
      class="intro_video"
      @ended="skipVideo"
      playsinline
      autoplay
      muted
    ></video>
    <button class="skip_button" @click="skipVideo">تخطي</button>
    <button class="play_button" v-if="!soundEnabled" @click="enableSound">
      تشغيل الصوت
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoSkipped: false,
      soundEnabled: false,
      srcVideo: '/intro.mp4',
      videoInterval: 24 * 60 * 60 * 1000,
    }
  },

  mounted() {
    const lastVideoShown = localStorage.getItem('lastVideoShown')
    const now = new Date().getTime()

    if (lastVideoShown && now - lastVideoShown < this.videoInterval) {
      this.videoSkipped = true
    } else {
      this.updateVideoSrc()
      window.addEventListener('resize', this.updateVideoSrc)
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateVideoSrc)
  },

  methods: {
    skipVideo() {
      this.videoSkipped = true
      this.$emit('videoSkipped')
      localStorage.setItem('lastVideoShown', new Date().getTime())
    },
    enableSound() {
      const video = this.$refs.introVideo
      video.muted = false
      video.play()
      this.soundEnabled = true
    },
    updateVideoSrc() {
      if (window.innerWidth <= 700) {
        this.srcVideo = '/intro_mobile.mp4'
      } else {
        this.srcVideo = '/intro.mp4'
      }
    },
  },
}
</script>

<style scoped>
.video_intro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.intro_video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
.skip_button {
  position: absolute;
  bottom: 30px;
  padding: 10px 15px;
  background-color: var(--main_theme_clr);
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.play_button {
  position: absolute;
  bottom: 30px;
  padding: 10px 15px;
  background-color: var(--main_theme_clr);
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.play_button {
  left: 30px;
}

.skip_button {
  right: 30px;
}
</style>
