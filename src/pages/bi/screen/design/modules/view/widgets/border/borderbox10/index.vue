<template>
  <div
    class="cc-border-box-10 col"
    :ref="ref"
    :style="`box-shadow: inset 0 0 25px 3px ${mergedColor[0]}`"
  >
    <svg class="cc-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`
        4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height}
        4, ${height} 0, ${height - 4} 0, 4
      `"
      />
    </svg>

    <svg
      width="150px"
      height="150px"
      :key="item"
      v-for="item in border"
      :class="`${item} cc-border-svg-container`"
    >
      <polygon :fill="mergedColor[1]" points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { BorderMixin } from 'boot/mixins/border';

export default {
  mixins: [BorderMixin],
  name: 'CcBorderBox10',
  props: {
    color: {
      type: Array,
      default: () => ([]),
    },
    backgroundColor: {
      type: String,
      default: 'transparent',
    },
  },
  data() {
    return {
      ref: 'border-box-10',
      border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
      defaultColor: ['#1d48c4', '#d3e1f8'],
      mergedColor: [],
    };
  },
};
</script>

<style lang="stylus">
.cc-border-box-10
  position relative
  border-radius 6px
  .cc-border-svg-container
    position absolute
    display block
  .right-top
    right 0px
    transform rotateY(180deg)
  .left-bottom
    bottom 0px
    transform rotateX(180deg)
  .right-bottom
    right 0px
    bottom 0px
    transform rotateX(180deg) rotateY(180deg)
  .border-box-content
    position relative
    width 100%
    height 100%
</style>
