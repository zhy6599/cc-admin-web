import { cameras } from 'boot/dictionary';
import { MainControl } from './control/main';
import * as THREE from 'three';
import * as maptalks from 'maptalks';
import {ClusterLayer} from 'maptalks.markercluster'



export const mapCenter = [117.60961, 38.49337];

export const icons = {
  video: {
    hover: '/img/map/kk_h.png',
    markerFile: '/img/map/kk.png',
    markerWidth: 30,
    markerHeight: 30,
  },
};

export const createMap = async (el, option = {}) => {
  const url = process.env.WMTS_URL;
  const config = await new Promise((resolve, reject) => {
    maptalks.SpatialReference.loadWMTS(url, (err, [conf]) => {
      if (err) {
        reject(err);
      } else {
        conf.urlTemplate += process.env.WMTS_TK;
        resolve(conf);
      }
    });
  });
  const m = new maptalks.Map(el, {
    center: mapCenter,
    zoom: option.zoom || 15,
    maxZoom: 22,
    minZoom: 8,
    pitch: 0,
    bearing: -25,
    attribution: false,
    fpsOnInteracting: 0,

    spatialReference: {
      projection: 'baidu',
    },
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate: 'https://gss{s}.bdstatic.com/8bo_dTSlRsgBo1vgoIiO_jowehsv/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20170927',
      subdomains: [0, 1, 2, 3],
    }),

    // spatialReference: config.spatialReference,
    // baseLayer: new maptalks.TileLayer('tilelayer', config),
  });

  m.on('click', (param) => {
    // 可以打印出指定点坐标
    console.log(`${param.coordinate.toFixed(5).toArray().join()}`);
  });

  m.addControl(new maptalks.control.Scale({
    position: 'bottom-right',
    maxWidth: 80,
    metric: true,
    imperial: false,
    containerClass: 'map-scale text-center',
  }));
  m.addControl(new MainControl({
    position: 'bottom-right',
    control: ['rotate', 'zoomIn', 'zoomLv', 'zoomOut', 'reset', 'fullScreen'],
  }));

  m.reset = () => {
    m.animateTo({
      center: mapCenter,
      zoom: 12,
      pitch: 0,
      bearing: 0,
    });
  };

  m.showCamera = async () => {
    const data = await cameras.data;
    const markers = data.map((p) => new maptalks.Marker([p.lon, p.lat], {
      symbol: icons.video,
    }).on('mouseenter', ({ target }) => {
      target.updateSymbol({
        markerFile: icons.video.hover,
      });
    }).on('mouseout ', ({ target }) => {
      target.updateSymbol({
        markerFile: icons.video.markerFile,
      });
    }).on('click', ({ target }) => {
      target.openInfoWindow();
    })
      .setInfoWindow({
        title: p.name,
        content: `<video src="video/${p.video}" autoplay loop>
                  您的浏览器不支持 video 标签。
                  </video>`,
      }));
    const layer = new ClusterLayer('cameras', markers, {
      maxClusterZoom: 14,
      zIndex: 2,
      symbol: icons.video,
      textSymbol: {
        textSize: 18,
        textFill: '#fff',
        textWeight: 'bold',
        textDy: 6,
      },
    }).addTo(m);
    m.on('click', (e) => {
      const s = layer.identify(e.coordinate);
      if (s && s.length > 0) {
        m.animateTo({
          center: [e.coordinate.x, e.coordinate.y],
          zoom: m.getZoom() + 1,
        });
      }
    });
    return {
      data,
      layer,
      markers,
    };
  };
  return m;
};
