import Vue from 'vue';
import VueLazyload from "vue-lazyload";
import loaderGIF from "../assets/media/loaders/progress_loader.gif";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: loaderGIF,
  loading: loaderGIF,
  attempt: 1,
});
