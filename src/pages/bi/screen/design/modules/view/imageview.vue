<template>
  <q-img
    :class="this.config.loop?'rotateImg':''"
    :style="imageStyle"
    :src="imagePath"
  />
</template>
<script>
export default {
  name: 'imageview',
  data() {
    return {
      text: '',
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
    };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  watch: {
    config: {
      deep: true,
      handler() {
        this.text = this.config.text;
      },
    },
  },
  computed: {
    imagePath() {
      let path = '';
      if (this.config.src) {
        path = `${this.imgUrl}/${this.config.src}`;
      }
      return path;
    },
    imageStyle() {
      return {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: (100 - this.config.opacity) / 100,
        animationDuration: `${this.config.scrolldelay}s`,
        animationDirection: this.config.alternate ? 'alternate' : 'normal',
      };
    },
  },
  mounted() {
    this.$on('resized', this.handleResize);
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
    },
  },
};
</script>

<style scoped>
.rotateImg{
    display: block;
    animation: rotate 6s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotateZ(0deg); /*从0度开始*/
  }
  100% {
    transform: rotateZ(360deg); /*360度结束*/
  }
}
</style>
