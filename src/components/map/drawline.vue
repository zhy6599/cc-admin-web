<template>
  <div class="col map_content" ref="map"></div>
</template>
<script>
import * as THREE from 'three';
import * as maptalks from 'maptalks';
import { createMap } from 'boot/map';
import { DrawControl } from 'boot/control/draw';

export default {
  name: 'drawLine',
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      line: [],
    };
  },
  async mounted() {
    this.map = await createMap(this.$refs.map, { main: false, draw: true });
    console.log(this.path);
    if (this.path) {
      this.setLine(JSON.parse(this.path));
    }
    this.map.addControl(new DrawControl({
      position: 'top-right',
      control: ['drawLine', 'reset'],
      result: this.line,
    }));
  },
  methods: {
    getLine() {
      return this.line;
    },
    setLine(line) {
      this.line = [].concat(line);
      const polyline = new maptalks.LineString(this.line, {
        symbol: {
          lineColor: '#1bbc9b',
          lineWidth: 3,
        },
      });
      this.$nextTick(() => {
        const drawTool = this.map.getLayer('DrawTool');
        polyline.addTo(drawTool);
      });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0px;
  height: 100%;
  width: 100%;
}
.container {
  width: 100%;
  height: 100%;
}
.maptalks-attribution {
  display: none;
}
</style>
