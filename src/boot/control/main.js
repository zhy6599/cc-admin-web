import * as THREE from 'three';
import * as maptalks from 'maptalks';

export class MainControl extends maptalks.control.Control {
  buildOn() {
    const creat = (v, title, call) => {
      const t = maptalks.DomUtil.createEl('a');
      t.innerHTML = `<i class="q-icon material-icons q-item-icon">${v}</i>`;
      t.onclick = call;
      t.title = title;
      return t;
    };
    const m = this.getMap();
    const zoomLv = maptalks.DomUtil.createEl('a');
    zoomLv.title = '层级';
    zoomLv.innerHTML = Math.round(m.getFitZoom());
    const control = {
      rotate: creat('navigation', '正向', () => {
        m.animateTo({
          pitch: 0,
          bearing: 0,
        }, (f) => {
          if (f.state.playState === 'finished') { m.panBy([0, 0.1]); }
        });
      }),
      reset: creat('my_location', '重置', () => {
        m.reset();
      }),
      zoomIn: creat('add', '放大', () => {
        m.zoomIn();
      }),
      zoomLv,
      zoomOut: creat('remove', '缩小', () => {
        m.zoomOut();
      }),
      fullScreen: creat('fullscreen', '全屏', () => {
        if (m.isFullScreen()) {
          m.cancelFullScreen();
        } else {
          m.requestFullScreen();
        }
      }),
    };

    const rotate = control.rotate.querySelector('i');
    m.on('dragrotateend', () => {
      rotate.style.transform = `rotateZ(${0 - m.getBearing()}deg) rotateX(${m.getPitch()}deg)`;
    });
    m.on('animateend', () => {
      rotate.style.transform = `rotateZ(${0 - m.getBearing()}deg) rotateX(${m.getPitch()}deg)`;
      zoomLv.innerHTML = Math.round(m.getFitZoom());
    });

    const dom = maptalks.DomUtil.createEl('div', 'map_m_c');
    this.options.control.forEach((v) => dom.appendChild(control[v]));
    // <i aria-hidden="true" class="q-icon material-icons q-item-icon">home</i>
    return dom;
  }
}
