<template>
  <div class="cc-decoration-4 col" :ref="ref">
    <div
      :class="`container ${reverse ? 'reverse' : 'normal'}`"
      :style="reverse ? `width:${width}px;height:5px;animation-duration:${dur}s` :
      `width:5px;height:${height}px;animation-duration:${dur}s`"
    >
      <svg :width="reverse ? width : 5" :height="reverse ? 5 : height">
        <polyline
          :stroke="mergedColor[0]"
          :points="reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`"
        />
        <polyline
          class="bold-line"
          :stroke="mergedColor[1]"
          stroke-width="3"
          stroke-dasharray="20 80"
          stroke-dashoffset="-30"
          :points="reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { DecorationMixin } from 'boot/mixins/decoration';

export default {
  mixins: [DecorationMixin],
  name: 'CcDecoration4',
  props: {
    dur: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      ref: 'decoration-4',

      defaultColor: ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)'],

      mergedColor: [],
    };
  },
  methods: {
    afterAutoResizeMixinInit() {
    },
  },
};
</script>

<style lang="stylus">
.cc-decoration-4
  position relative
  .container
    display flex
    overflow hidden
    position absolute
    flex 1
  .normal
    animation ani-height ease-in-out infinite
    left 50%
    margin-left -2px
  .reverse
    animation ani-width ease-in-out infinite
    top 50%
    margin-top -2px
  @keyframes ani-height
    0%
      height 0%
    70%
      height 100%
    100%
      height 100%
  @keyframes ani-width
    0%
      width 0%
    70%
      width 100%
    100%
      width 100%
</style>
