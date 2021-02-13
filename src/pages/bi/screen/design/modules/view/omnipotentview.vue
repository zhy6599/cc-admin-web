<template>
  <div class="fit" ref="omnipotent" />
</template>
<script>
import { debounce } from 'quasar';

export default {
  name: 'omnipotentview',
  data() {
    return {
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
        this.renderContent();
      },
    },
  },
  computed: {
  },
  mounted() {
    this.$on('resized', this.handleResize);
    window.addEventListener('resize', this.handleResize);
    this.renderContent = debounce(this.doRenderContent, 150);
    this.renderContent();
  },
  methods: {
    doRenderContent() {
      if (this.$refs.omnipotent) {
        this.$refs.omnipotent.innerHTML = this.config.content;
      }
    },
    handleResize() {
      this.renderContent();
    },
  },
};
</script>

<style lang="stylus">
</style>
