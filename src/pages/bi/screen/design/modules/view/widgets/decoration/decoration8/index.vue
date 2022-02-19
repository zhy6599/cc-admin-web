<template>
  <div class="cc-decoration-8 col" :ref="ref">
    <svg :width="width" :height="height">
      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(0)}, 0 ${xPos(30)}, ${height / 2}`"
      />

      <polyline
        :stroke="mergedColor[0]"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(20)}, 0 ${xPos(50)}, ${height / 2} ${xPos(width)}, ${height / 2}`"
      />

      <polyline
        :stroke="mergedColor[1]"
        fill="transparent"
        stroke-width="3"
        :points="`${xPos(0)}, ${height - 3}, ${xPos(200)}, ${height - 3}`"
      />
    </svg>
  </div>
</template>

<script>
import { DecorationMixin } from 'boot/mixins/decoration';

export default {
  mixins: [DecorationMixin],
  name: 'CcDecoration8',
  data() {
    return {
      ref: 'decoration-8',
      defaultColor: ['#3f96a5', '#3f96a5'],
      mergedColor: [],
    };
  },
  methods: {
    afterAutoResizeMixinInit() {
    },
    xPos(pos) {
      const { reverse, width } = this;
      if (!reverse) return pos;
      return width - pos;
    },
  },
};
</script>

<style lang="stylus">
.cc-decoration-8
  display flex
</style>
