<template>
  <div v-if="!videoSkipped" class="video_intro">
    <video
      ref="introVideo"
      :src="videoSrc"
      class="intro_video"
      autoplay
      muted
      playsinline
      @ended="skipVideo"
    ></video>
    <button class="skip_button" @click="skipVideo">تخطي</button>
  </div>
</template>

<script>
export default {
  name: 'VideoIntro',

  props: {
    videoSrc: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      videoSkipped: false,
    }
  },

  mounted() {
    // تحقق مما إذا كان الفيديو قد تم مشاهدته مسبقًا أو كان آخر عرض للفيديو ضمن الفترة المحددة
    const videoLastShown = localStorage.getItem('videoLastShown')
    const now = new Date().getTime()
    const interval = 24 * 60 * 60 * 1000 // يوم كامل كفاصل زمني (يمكنك تعديله حسب الحاجة)

    if (videoLastShown && now - videoLastShown < interval) {
      this.videoSkipped = true // لا يتم عرض الفيديو إذا كان ضمن الفترة المحددة
    } else {
      localStorage.setItem('videoLastShown', now) // احفظ وقت العرض الحالي
    }
  },

  methods: {
    skipVideo() {
      console.log('Video skipped.')
      this.videoSkipped = true
      this.$emit('videoSkipped')
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
  overflow: hidden;
  z-index: 10000000000000;
}

.intro_video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.skip_button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--main_theme_clr);
}
</style>
