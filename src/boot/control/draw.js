import * as THREE from 'three';
import * as maptalks from 'maptalks';

export class DrawControl extends maptalks.control.Control {
  buildOn() {
    const creat = (v, title, call) => {
      const t = maptalks.DomUtil.createEl('a');
      t.innerHTML = `<i class="q-icon material-icons q-item-icon">${v}</i>`;
      t.onclick = call;
      t.title = title;
      return t;
    };
    const m = this.getMap();
    const layer = new maptalks.VectorLayer('DrawTool').addTo(m);

    const drawTool = new maptalks.DrawTool({
      mode: 'Point',
      symbol: {
        lineColor: '#00F',
        lineWidth: 2,
      },
    }).addTo(m).disable();

    drawTool.on('drawend', (param) => {
      this.options.result.push(param.geometry.toGeoJSON().geometry.coordinates);
      layer.addGeometry(param.geometry);
    });
    drawTool.setMode('LineString').enable();

    const control = {
      drawLine: creat('swap_calls', '路线规划', () => {
        drawTool.setMode('LineString').enable();
      }),
      reset: creat('clear', '清空图层', () => {
        while (this.options.result.length > 0) {
          this.options.result.pop();
        }
        layer.clear();
      }),
    };

    const dom = maptalks.DomUtil.createEl('div', 'map_m_c');
    this.options.control.forEach((v) => dom.appendChild(control[v]));
    return dom;
  }
}
