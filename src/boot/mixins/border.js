import { dom, extend } from 'quasar';

export const BorderMixin = {
  components: {
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  watch: {
    config: {
      deep: true,
      handler() {
        this.mergeColor();
        if (this.config.needResize) {
          this.config.needResize = false;
          this.handleResize();
        }
      },
    },
  },
  methods: {
    handleResize() {
      const box = this.$refs[this.ref];
      this.width = dom.width(box);
      this.height = dom.height(box);
    },
    mergeColor() {
      const cloneDefaultColor = extend(true, [], this.defaultColor);
      this.mergedColor = extend(true, cloneDefaultColor, [this.config.color1, this.config.color2]);
    },
  },
  mounted() {
    this.mergeColor();
    this.handleResize();
  },
};
