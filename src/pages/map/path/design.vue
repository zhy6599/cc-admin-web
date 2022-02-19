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

export default {
  data() {
    return {
      data: [{
        id: '1', lng: 117.60961, lat: 38.49337, type: 'Duck', angle: 185,
      }],
      map: null,
      truckLayer: null,
      config: null,
      fonts: null,
      layer: null,
    };
  },
  async mounted() {
    this.map = await createMap(this.$refs.map, { zoom: 16 });
    this.map.showCamera();
    this.map.on('click', (param) => {
      console.log(`${param.coordinate.toFixed(5).toArray().join()}`);
    });
    // 先读取所有线路坐标，然后模拟线路运行
    this.drawTruck();
  },
  methods: {
    chose({ target }) {
      this.selected = this.data.find((v) => v.id === target.options.vid);
    },
    drawTruck() {
      this.truckLayer = new maptalks.VectorLayer('truck').addTo(this.map);

      // 读取所有线路信息
      this.$axios.get('/map/path/list?pageSize=100').then(({ result }) => {
        const { records } = result;
        records.forEach((record, index) => {
          this.createTrucker(record);
        });
      });
    },
    createTrucker(record) {
      const { id } = record;
      const trucker = new maptalks.Marker(
        [117.6117, 38.48935],
        {
          id,
          symbol: {
            markerFile: 'img/map/truck.png',
            markerWidth: 20,
            markerHeight: 20,
            markerDx: 0,
            markerDy: 0,
            markerOpacity: 1,
          },
        },
      ).addTo(this.truckLayer);

      const path = JSON.parse(record.path);
      this.replay(id, trucker, path, this.getRandom(0, path.length));
    },
    replay(id, marker, path, i) {
      if (i > path.length - 2) {
        this.truckLayer.getGeometryById(id).remove();
        return;
      }
      const from = path[i];
      const to = path[i + 1];
      marker.setCoordinates({ x: path[i][0], y: path[i][1] });
      marker.bringToFront().animate({
        translate: [to[0] - from[0], to[1] - from[1]],
      }, {
        duration: this.getRandom(5000, 10000),
        focus: false,
      },
      (frame) => {
        if (frame.state.playState === 'finished') {
          this.sleep(this.getRandom(1000, 5000)).then(() => {
            this.replay(id, marker, path, i + 1);
          });
        }
      });
    },
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    getRandom(min, max) {
      const index = Math.floor(Math.random() * (max - min) + min);
      return index;
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
