<template>
  <video
    controls="controls"
    autoplay="autoplay"
    loop="loop"
    width="100%"
    height="100%"
    style="object-fit: fill;"
    :src="videoPath"
  />
</template>
<script>
export default {
  name: 'videoview',
  data() {
    return {
      text: '',
      videoUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
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
      },
    },
  },
  computed: {
    videoPath() {
      let path = '';
      if (this.config.src) {
        path = `${this.videoUrl}/${this.config.src}`;
      }
      return path;
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
</style>
