<template>
  <div
    class="cc-border-box-7 col"
    :style="`box-shadow: inset 0 0 40px ${mergedColor[0]};
    border: 1px solid ${mergedColor[0]}; background-color: ${backgroundColor}`"
    :ref="ref"
  >
    <svg class="cc-border-svg-container" :width="width" :height="height">
      <polyline class="dv-bb7-line-width-2" :stroke="mergedColor[0]" :points="`0, 25 0, 0 25, 0`" />
      <polyline
        class="dv-bb7-line-width-2"
        :stroke="mergedColor[0]"
        :points="`${width - 25}, 0 ${width}, 0 ${width}, 25`"
      />
      <polyline
        class="dv-bb7-line-width-2"
        :stroke="mergedColor[0]"
        :points="`${width - 25}, ${height} ${width}, ${height} ${width}, ${height - 25}`"
      />
      <polyline
        class="dv-bb7-line-width-2"
        :stroke="mergedColor[0]"
        :points="`0, ${height - 25} 0, ${height} 25, ${height}`"
      />

      <polyline class="dv-bb7-line-width-5" :stroke="mergedColor[1]" :points="`0, 10 0, 0 10, 0`" />
      <polyline
        class="dv-bb7-line-width-5"
        :stroke="mergedColor[1]"
        :points="`${width - 10}, 0 ${width}, 0 ${width}, 10`"
      />
      <polyline
        class="dv-bb7-line-width-5"
        :stroke="mergedColor[1]"
        :points="`${width - 10}, ${height} ${width}, ${height} ${width}, ${height - 10}`"
      />
      <polyline
        class="dv-bb7-line-width-5"
        :stroke="mergedColor[1]"
        :points="`0, ${height - 10} 0, ${height} 10, ${height}`"
      />
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
  name: 'CcBorderBox7',
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
      ref: 'border-box-7',
      defaultColor: ['#fff', 'rgba(255, 255, 255, 0.6)'],
      mergedColor: [],
    };
  },
};
</script>

<style lang="stylus">
.cc-border-box-7
  position relative
  .cc-border-svg-container
    position absolute
    top 0px
    left 0px
    width 100%
    height 100%
    & > polyline
      fill none
      stroke-linecap round
  .dv-bb7-line-width-2
    stroke-width 2
  .dv-bb7-line-width-5
    stroke-width 5
  .border-box-content
    position relative
    width 100%
    height 100%
</style>
