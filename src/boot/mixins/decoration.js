import { dom, extend } from 'quasar';

export const DecorationMixin = {
  components: {
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    dur: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      width: 21,
      height: 20,
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
        this.afterAutoResizeMixinInit();
      },
    },
  },
  methods: {
    handleResize() {
      if (this.ref) {
        const box = this.$refs[this.ref];
        this.width = dom.width(box);
        this.height = dom.height(box);
      }
    },
    mergeColor() {
      const cloneDefaultColor = extend(true, [], this.defaultColor);
      this.mergedColor = extend(true, cloneDefaultColor, [this.config.color1, this.config.color2]);
    },
  },
  mounted() {
    this.mergeColor();
    this.handleResize();
    this.afterAutoResizeMixinInit();
  },
};
