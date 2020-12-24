<template>
  <div ref="textView"
    :style="{
      whiteSpace:'pre-wrap',
      textAlign: config.textAlign || 'left',
      fontWeight: config.fontWeight || 'normal',
      fontSize: config.fontSize+'px'|| '12px',
      color: config.color|| '#000',
      letterSpacing: config.letterSpacing+'px'|| '0px'
    }"
  >{{ text }}</div>
</template>
<script>
export default {
  name: 'textview',
  data() {
    return {
      text: '',
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
