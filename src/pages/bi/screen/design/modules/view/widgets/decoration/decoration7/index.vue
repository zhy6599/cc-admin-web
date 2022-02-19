<template>
  <div class="cc-decoration-7 col">
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="mergedColor[0]"
        points="10, 0 19, 10 10, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="mergedColor[1]"
        points="2, 0 11, 10 2, 20"
      />
    </svg>
    <slot></slot>
    <svg width="21px" height="20px">
      <polyline
        stroke-width="4"
        fill="transparent"
        :stroke="mergedColor[0]"
        points="11, 0 2, 10 11, 20"
      />
      <polyline
        stroke-width="2"
        fill="transparent"
        :stroke="mergedColor[1]"
        points="19, 0 10, 10 19, 20"
      />
    </svg>
  </div>
</template>

<script>
import { DecorationMixin } from 'boot/mixins/decoration';

export default {
  mixins: [DecorationMixin],
  name: 'CcDecoration7',
  data() {
    return {
      defaultColor: ['#1dc1f5', '#1dc1f5'],
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
.cc-decoration-7
  display flex
  justify-content center
  align-items center
</style>
