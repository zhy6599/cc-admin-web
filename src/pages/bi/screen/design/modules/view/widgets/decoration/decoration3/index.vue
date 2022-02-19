<template>
  <div class="cc-decoration-3 col" :ref="ref">
    <svg
      :width="`${svgWH[0]}px`"
      :height="`${svgWH[1]}px`"
      :style="`transform:scale(${svgScale[0]},${svgScale[1]});`"
    >
      <template v-for="(point, i) in points">
        <rect
          :key="i"
          :fill="mergedColor[0]"
          :x="point[0] - halfPointSideLength"
          :y="point[1] - halfPointSideLength"
          :width="pointSideLength"
          :height="pointSideLength"
        >
          <animate
            v-if="Math.random() > 0.6"
            attributeName="fill"
            :values="`${mergedColor.join(';')}`"
            :dur="Math.random() + 1 + 's'"
            :begin="Math.random() * 2"
            repeatCount="indefinite"
          />
        </rect>
      </template>
    </svg>
  </div>
</template>

<script>
import { DecorationMixin } from 'boot/mixins/decoration';

export default {
  mixins: [DecorationMixin],
  name: 'CcDecoration3',
  data() {
    const pointSideLength = 7;

    return {
      ref: 'decoration-3',

      svgWH: [300, 35],

      svgScale: [1, 1],

      rowNum: 2,
      rowPoints: 25,

      pointSideLength,
      halfPointSideLength: pointSideLength / 2,

      points: [],

      defaultColor: ['#7acaec', 'transparent'],

      mergedColor: [],
    };
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { calcSVGData } = this;

      calcSVGData();
    },
    calcSVGData() {
      const { calcPointsPosition, calcScale } = this;

      calcPointsPosition();

      calcScale();
    },
    calcPointsPosition() {
      const { svgWH, rowNum, rowPoints } = this;

      const [w, h] = svgWH;

      const horizontalGap = w / (rowPoints + 1);
      const verticalGap = h / (rowNum + 1);

      const points = new Array(rowNum).fill(0).map((foo, i) => new Array(rowPoints).fill(0)
        .map((f, j) => [
          horizontalGap * (j + 1), verticalGap * (i + 1),
        ]));

      this.points = points.reduce((all, item) => [...all, ...item], []);
    },
    calcScale() {
      const { width, height, svgWH } = this;

      const [w, h] = svgWH;

      this.svgScale = [width / w, height / h];
    },
    onResize() {
      const { calcSVGData } = this;

      calcSVGData();
    },
  },
};
</script>

<style lang="stylus">
.cc-decoration-3
  svg
    transform-origin left top
</style>
