<template>
  <div class="cc-border-box-2 col" :ref="ref">
    <svg class="cc-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`
        7, 7 ${width - 7}, 7 ${width - 7}, ${height - 7} 7, ${height - 7}
      `"
      />

      <polyline
        :stroke="mergedColor[0]"
        :points="`2, 2 ${width - 2} ,2 ${width - 2}, ${height - 2} 2, ${height - 2} 2, 2`"
      />
      <polyline
        :stroke="mergedColor[1]"
        :points="`6, 6 ${width - 6}, 6 ${width - 6}, ${height - 6} 6, ${height - 6} 6, 6`"
      />
      <circle :fill="mergedColor[0]" cx="11" cy="11" r="1" />
      <circle :fill="mergedColor[0]" :cx="width - 11" cy="11" r="1" />
      <circle :fill="mergedColor[0]" :cx="width - 11" :cy="height - 11" r="1" />
      <circle :fill="mergedColor[0]" cx="11" :cy="height - 11" r="1" />
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
  name: 'CcBorderBox2',
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
      ref: 'border-box-2',
      defaultColor: ['#fff', 'rgba(255, 255, 255, 0.6)'],
      mergedColor: [],
    };
  },
};
</script>

<style lang="stylus">
.cc-border-box-2
  position relative
  .cc-border-svg-container
    position absolute
    width 100%
    height 100%
    top 0px
    left 0px
    & > polyline
      fill none
      stroke-width 1
  .border-box-content
    position relative
    width 100%
    height 100%
</style>
