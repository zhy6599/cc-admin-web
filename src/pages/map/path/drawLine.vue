<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="cc-admin column no-scroll">
        <div class="col map_content" ref="map"></div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import * as THREE from 'three';
import * as maptalks from 'maptalks';
import { createMap } from 'boot/map';
import { DrawControl } from 'boot/control/draw';

export default {
  data() {
    return {
      map: null,
      line: [],
    };
  },
  async mounted() {
    this.map = await createMap(this.$refs.map, { main: false, draw: true });
    // map.showCamera();
    this.map.addControl(new DrawControl({
      position: 'top-right',
      control: ['drawLine', 'reset'],
      result: this.line,
    }));
  },
  methods: {
    drawPoint() {
    },
    drawLine() {
    },
    drawPolygon() {
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
