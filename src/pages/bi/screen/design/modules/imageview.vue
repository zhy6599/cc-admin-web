<template>
  <div>
    <q-img
      :style="{width: '100%',height: '100%',objectFit: 'cover',opacity:(100-config.opacity)/100 }"
      spinner-color="primary"
      spinner-size="82px"
      :src="imagePath"
      style="width: 100%"
    />
  </div>
</template>
<script>
export default {
  name: 'textview',
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
  },
  mounted() {
    this.text = this.config.text;
    this.$on('resized', this.handleResize);
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
    },
  },
};
</script>

<style lang="less" scoped>
</style>
