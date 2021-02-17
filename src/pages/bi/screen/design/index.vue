<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <div class="row items-center">
        <div class="col-2">
          <q-toolbar>
            <q-toolbar-title>
              <q-avatar>
                <q-icon name="mdi-image-edit-outline" size="sm" />
              </q-avatar>
              <span class="text-subtitle1">{{name}}</span>
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="col">
          <div class="row no-warp justify-center items-center content-center">
            <ul class="ul-box-tool" v-for="v in chartList" :key="v.type">
              <li class="text-center" @click="selectChartIcon(v.type)">
                <q-icon :name="v.icon" size="sm">
                  <q-tooltip>{{v.name}}</q-tooltip>
                </q-icon>
                <p>{{v.name}}</p>
              </li>
            </ul>
            <q-space />
            <q-btn flat icon="mdi-auto-fix" :disable="layout.length === 0" @click="autoFix()" >
              <q-tooltip>解决因为系统升级导致原有图形不能使用的问题</q-tooltip>
            </q-btn>
            <q-btn flat icon="mdi-undo" :disable="historyIndex === 0" @click="undo()" >
              <q-tooltip>撤回</q-tooltip>
            </q-btn>
            <q-btn
              flat
              icon="mdi-redo"
              @click="redo()"
              class="q-mr-lg"
              :disable="historyIndex === history.length - 1|| history.length === 0" >
              <q-tooltip>重做</q-tooltip>
            </q-btn>
            <q-btn flat icon="mdi-content-cut" @click="cutItem()" >
              <q-tooltip>剪切</q-tooltip>
            </q-btn>
            <q-btn flat icon="mdi-content-copy" @click="copyItem()" >
              <q-tooltip>复制</q-tooltip>
            </q-btn>
            <q-btn flat icon="mdi-content-paste" @click="pasteItem()" >
              <q-tooltip>粘贴</q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="row no-wrap justify-end col-4 text-right q-pr-md q-gutter-sm">
            <q-btn flat icon="mdi-folder-plus-outline" @click="addFav()" >
              <q-tooltip>添加到收藏夹</q-tooltip>
            </q-btn>
            <q-btn flat icon="mdi-folder-star-outline" @click="fav()" >
              <q-tooltip>收藏文件夹</q-tooltip>
            </q-btn>
          <q-btn flat icon="mdi-format-float-left" @click="left=!left">
            <q-tooltip>隐藏左侧菜单</q-tooltip>
          </q-btn>
          <q-btn flat icon="mdi-format-float-right" @click="right=!right">
            <q-tooltip>隐藏右侧菜单</q-tooltip>
          </q-btn>
          <q-btn flat icon="mdi-laptop" @click="viewScreen()">
            <q-tooltip>原尺寸查看</q-tooltip>
          </q-btn>
          <q-btn flat icon="mdi-desktop-mac-dashboard" @click="viewFullScreen()">
            <q-tooltip>全屏查看</q-tooltip>
          </q-btn>
          <q-btn flat icon="mdi-content-save" @click="saveScreen()">
            <q-tooltip>保存图形</q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered :width="230">
      <div class="row no-wrap fit overflow-hidden">
        <layout :items.sync="layout" :selChartArray="selChartArray"
        :selChart="selChart" @selectItem="selectItem" @addItem="addItem" @cutItem="cutItem" />
      </div>
    </q-drawer>
    <q-drawer show-if-above v-model="right" side="right" bordered :width="590">
      <div class="row no-wrap fit overflow-hidden">
        <chartsetting v-if="selType === 'chart'" :config.sync="config" />
        <groupsetting v-if="selType === 'group'" :config.sync="config" />
        <backgroundsetting v-if="selType === 'cursor'" :config.sync="backgroundConfig" />
        <summarysetting v-if="selType === 'summary'" :config.sync="config" />
        <textsetting v-if="selType === 'text'" :config.sync="config" />
        <imagesetting v-if="selType === 'image'" :config.sync="config" />
        <videosetting v-if="selType === 'video'" :config.sync="config" />
        <omnipotentsetting v-if="selType === 'omnipotent'" :config.sync="config" />
        <customsetting v-if="selType === 'custom'" :config.sync="config" />
        <datasource :config.sync="config" />
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="cc-admin q-pa-sm scroll">
        <div class="col column justify-center items-center">
          <div :style="backgroundStyle">
            <vue-draggable-resizable
              v-for="item in layout"
              :key="item.i"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :z="item.z"
              :parent="true"
              :class="selChartArray.indexOf(item)>-1?'grid-item-select':'no-border'"
              :grid="[1,1]"
              @resizestop="resizedEvent"
              @activated="selectItem(item)"
              @deactivated="item.active=false"
              @dragging="onDrag"
            >
              <div
                :class="getItemClass(item)"
                :id="item.key"
                @click="selectItem(item)"
                @dragenter.prevent
              >
                <textview v-if="item.type === 'text'" :config="item.config" />
                <imageview v-if="item.type === 'image'" :config="item.config" />
                <chartview v-if="item.type === 'chart'" :config="item.config" />
                <videoview v-if="item.type === 'video'" :config="item.config" />
                <groupview v-if="item.type === 'group'" :config="item.config" />
                <omnipotentview v-if="item.type === 'omnipotent'" :config="item.config" />
                <customview v-if="item.type === 'custom'" :config="item.config" />
              </div>
            </vue-draggable-resizable>
          </div>
        </div>
        <q-dialog maximized flat persistent ref="favoriteDialog" position="right">
          <q-form class="dialog_card column">
            <h5 class="view_title justify-between q-px-md">
              收藏夹
              <q-btn dense outline round icon="clear" size="sm" v-close-popup />
            </h5>
            <q-scroll-area class="col">
              <favorite @addFavorite="addFavorite" />
            </q-scroll-area>
            <div class="row justify-end q-pa-md">
              <q-btn outline color="primary" label="关闭" v-close-popup />
            </div>
          </q-form>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { debounce } from 'quasar';
import { themeMap, chartList, chartConfig } from 'boot/datatype';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import backgroundsetting from './modules/setting/backgroundsetting';
import chartview from './modules/view/chartview';
import datasource from './modules/setting/datasource';
import chartsetting from './modules/setting/chartsetting';
import textview from './modules/view/textview';
import textsetting from './modules/setting/textsetting';
import imageview from './modules/view/imageview';
import imagesetting from './modules/setting/imagesetting';
import videoview from './modules/view/videoview';
import videosetting from './modules/setting/videosetting';
import groupview from './modules/view/groupview';
import groupsetting from './modules/setting/groupsetting';
import omnipotentview from './modules/view/omnipotentview';
import omnipotentsetting from './modules/setting/omnipotentsetting';
import customview from './modules/view/customview';
import customsetting from './modules/setting/customsetting';
import layout from './modules/layout';
import favorite from './modules/favorite';

export default {
  components: {
    VueDraggableResizable,
    layout,
    favorite,
    backgroundsetting,
    datasource,
    chartview,
    chartsetting,
    textview,
    textsetting,
    imageview,
    imagesetting,
    videoview,
    videosetting,
    groupview,
    groupsetting,
    omnipotentview,
    omnipotentsetting,
    customview,
    customsetting,
  },
  data() {
    return {
      name: 'cc-admin',
      onShfit: false,
      onCtrl: false,
      shiftMove: 1,
      move: 10,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      backgroundImage: '',
      themeMap,
      allParam: {}, // 所有请求参数
      left: true,
      right: true,
      moving: false, // 移动呢
      loading: false,
      saveLoading: false,
      selType: 'cursor',
      selChart: null,
      selChartArray: [],
      copyedItem: null,
      config: {
      },
      historyIndex: 0,
      history: [],
      backgroundConfig: {
        width: 800,
        height: 600,
        color: '#fff',
        showGrid: true,
        darkModel: false,
        src: '',
        backPicSet: 'repeat',
        opacity: 0,
      },
      index: 0,
      chartList,
      layout: [],
      eventLog: [],
      url: {
        editConfig: '/bi/screen/editConfig',
      },
    };
  },
  methods: {
    getScreen() {
      return this.$axios.get(`/bi/screen/queryById?id=${this.$route.query.id}`)
        .then(({ result }) => {
          const biScreen = result;
          this.name = biScreen.name;
          if (biScreen && biScreen.config) {
            const configObj = JSON.parse(biScreen.config);
            this.layout = configObj.layout;
            this.backgroundConfig = { ...configObj.backgroundConfig };
            let maxIndex = 0;
            this.layout.forEach((item) => {
              if (item.type === 'group') {
                const chartArray = [];
                item.config.chartArray.forEach((chart) => {
                  chartArray.push(this.layout.find((im) => im.i === chart.i));
                });
                item.config.chartArray = chartArray;
              }
              if (item.i > maxIndex) {
                maxIndex = item.i;
              }
            });
            this.index = maxIndex + 1;
          }
        }).catch(() => {
          this.$q.notify({
            color: 'red',
            message: '还原电子报告出错！',
          });
        });
    },
    selectChartIcon(type) {
      this.chartList.forEach((v) => {
        if (v.type === type) {
          this.addItem(type);
        } else {
          v.selected = false;
        }
      });
    },

    selectItem(selItem) {
      selItem.active = true;
      if (this.moving) {
        this.moving = false;
      } else if (this.onCtrl && this.selChartArray.length > 0) {
        if (this.selChartArray.indexOf(selItem) < 0) {
          this.selChartArray.push(selItem);
          this.selChart = selItem;
        }
      } else {
        this.selChart = selItem;
        this.selChartArray = [selItem];
        if (selItem) {
          this.config = selItem.config;
          this.selType = selItem.type;
        }
      }
    },
    getItemClass(item) {
      const itemClsList = ['col', 'column'];
      if (item.type !== 'image') {
        itemClsList.push('draggable-item-class');
      } else if (item.config.overflowHiden) {
        itemClsList.push('draggable-item-class');
      }
      return itemClsList;
    },
    removeItem() {
      const selItem = this.selChart;
      if (selItem) {
        this.layout.splice(this.layout.indexOf(selItem), 1);
        this.selType = 'cursor';
      }
      this.addHistory();
    },
    addHistory() {
      if (this.history.length > 10) {
        this.history.shift();
      }
      this.history.push(JSON.stringify(this.layout));
      this.historyIndex = this.history.length - 1;
    },
    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex += 1;
        this.layout = JSON.parse(this.history[this.historyIndex]);
      }
    },
    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex -= 1;
        this.layout = JSON.parse(this.history[this.historyIndex]);
      }
    },
    applyIf(object, config) {
      if (object && config) {
        Object.keys(config).forEach((key) => {
          if (object[key] === undefined) {
            object[key] = config[key];
          } else if (typeof config[key] === 'object') {
            this.applyIf(object[key], config[key]);
          }
        });
      }
      return object;
    },
    autoFix() {
      if (this.layout.length > 0) {
        this.layout.forEach((item) => {
          this.applyIf(item.config, chartConfig(item.type, this.backgroundConfig.darkModel));
        });
        this.$info('修复完成');
      }
    },
    cutItem() {
      if (this.layout.filter((item) => item === this.selChart).length === 1) {
        [this.copyedItem] = (this.layout.filter((item) => item === this.selChart));
        this.removeItem();
      }
    },
    copyItem() {
      if (this.layout.filter((item) => item === this.selChart).length === 1) {
        [this.copyedItem] = (this.layout.filter((item) => item === this.selChart));
      }
    },
    pasteItem() {
      if (this.copyedItem) {
        this.index += 1;
        const copyObj = JSON.parse(JSON.stringify(this.copyedItem));
        copyObj.i = this.index;
        this.layout.push(copyObj);
        this.selectItem(this.index);
        this.addHistory();
      }
    },
    addItem(type, itemConfig) {
      const item = {
        x: 0,
        y: 0,
        w: 300,
        h: 100,
        type,
        name: type,
        z: 1000,
        active: true,
        i: this.index += 1,
      };
      if (type === 'cursor') {
        this.selType = 'cursor';
        this.selChart = null;
        return;
      }
      if (type === 'group') {
        Object.assign(item, itemConfig);
      } else {
        item.config = chartConfig(type, this.backgroundConfig.darkModel);
      }
      this.layout.push(item);
      this.selectItem(item);
      this.addHistory();
    },
    viewScreen() {
      const { id } = this.$route.query;
      if (!id) {
        this.$q.notify({
          color: 'red',
          message: 'id not exist!',
        });
        return;
      }
      const { href } = this.$router.resolve({
        path: `/view?id=${id}`,
      });
      window.open(href, '_blank');
    },
    viewFullScreen() {
      const { id } = this.$route.query;
      const { href } = this.$router.resolve({
        path: `/viewfull?id=${id}`,
      });
      window.open(href, '_blank');
    },
    saveScreen() {
      const { id } = this.$route.query;
      if (!id) {
        this.$q.notify({
          color: 'red',
          message: 'id not exist!',
        });
        return;
      }
      this.saveLoading = true;
      const formData = {
        id,
        config: JSON.stringify({ layout: this.layout, backgroundConfig: this.backgroundConfig }),
      };
      this.$axios.put('/bi/screen/editConfig', formData).then((r) => {
        this.$q.notify(r.message);
      }).finally(() => {
        this.saveLoading = false;
      });
    },
    doSizeResize(cx, cy, cw, ch) {
      this.selChartArray.filter((idx) => idx !== this.selChart).forEach((item) => {
        if (item) {
          this.sizeResizeItem(item, cx, cy, cw, ch);
        }
      });
      // 如果当前是组合对象，那么子对象也要一起动
      if (this.selChart.type === 'group') {
        this.selChart.config.chartArray.forEach((sub) => {
          this.sizeResizeItem(sub, cx, cy, cw, ch);
        });
      }
    },
    sizeResizeItem(item, cx, cy, cw, ch) {
      const clientWidth = this.backgroundConfig.width;
      const clientHight = this.backgroundConfig.height;
      // 调整尺寸
      item.x += cx;
      item.y += cy;
      item.w += cw;
      item.h += ch;
      // 边界检查，最小尺寸是12*12
      item.x = item.x < 0 ? 0 : item.x;
      item.x = item.x > clientWidth ? clientWidth - 12 : item.x;
      item.y = item.y < 0 ? 0 : item.y;
      item.y = item.y > clientHight ? clientHight - 12 : item.y;
      item.w = item.w < 12 ? 12 : item.w;
      item.h = item.h < 12 ? 12 : item.h;
    },

    resizedEvent(x, y, w, h) {
      const { selChart } = this;
      if (selChart) {
        this.sizeResize((x - selChart.x), (y - selChart.y), (w - selChart.w), (h - selChart.h));
        selChart.x = x;
        selChart.y = y;
        selChart.w = w;
        selChart.h = h;
        selChart.config.needResize = true;
      }
    },
    doOnDrag(x, y) {
      const { selChart } = this;
      this.moving = true;
      if (selChart) {
        this.sizeResize((x - selChart.x), (y - selChart.y), 0, 0);
        selChart.x = x;
        selChart.y = y;
      }
    },
    paramChange(param) {
      // 将请求参数合并到一起
      Object.assign(this.allParam, param);
      this.$root.$emit('allParamChange', this.allParam);
    },
    caclBackground() {

    },
    doMoveItem(dir, type) {
      this.selChartArray.forEach((item) => {
        const step = this.onShfit ? this.shiftMove : this.move;
        if (type === 'add') {
          item[dir] += step;
          this.sizeResize(dir === 'x' ? step : 0, dir === 'y' ? step : 0, dir === 'w' ? step : 0, dir === 'h' ? step : 0);
        } else if (item[dir] >= step) {
          item[dir] -= step;
          this.sizeResize(dir === 'x' ? -step : 0, dir === 'y' ? -step : 0, dir === 'w' ? -step : 0, dir === 'h' ? -step : 0);
        }
        if (dir === 'w' || dir === 'h') {
          item.config.needResize = true;
        }
      });
    },
    setKeyStatus(e, status) {
      if (this.selChartArray.filter((sel) => sel.active).length > 0) {
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
          this.onShfit = status;
        }
        if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
          this.onCtrl = status;
        }
        if (status) {
          switch (e.code) {
            case 'ArrowUp':
              if (this.onCtrl) {
                this.moveItem('h', 'sub');
              } else {
                this.moveItem('y', 'sub');
              }
              e.preventDefault();
              break;
            case 'ArrowDown':
              if (this.onCtrl) {
                this.moveItem('h', 'add');
              } else {
                this.moveItem('y', 'add');
              }
              e.preventDefault();
              break;
            case 'ArrowLeft':
              if (this.onCtrl) {
                this.moveItem('w', 'sub');
              } else {
                this.moveItem('x', 'sub');
              }
              e.preventDefault();
              break;
            case 'ArrowRight':
              if (this.onCtrl) {
                this.moveItem('w', 'add');
              } else {
                this.moveItem('x', 'add');
              }
              e.preventDefault();
              break;
            default:
              break;
          }
        }
      }
    },
    addFav() {
      this.$q.dialog({
        title: '添加到收藏夹',
        message: '请输入名称',
        prompt: {
          model: '',
          outlined: true,
          isValid: (val) => val.length > 2,
          type: 'text',
        },
        cancel: true,
        persistent: true,
      }).onOk((data) => {
        let type = 'complex';
        let config = JSON.stringify(this.selChartArray);
        if (this.selChartArray.length === 0) {
          type = 'cursor';
          config = JSON.stringify(this.backgroundConfig);
        } else if (this.selChartArray.length === 1) {
          type = this.selChartArray[0].type;
        }

        this.$axios.post('/bi/favorites/add', {
          name: data,
          type,
          config,
        }).then((r) => {
          this.$info(r.message);
          this.query();
        });
      });
    },
    fav() {
      this.$refs.favoriteDialog.show();
    },
    addFavorite(p) {
      if (p.type === 'cursor') {
        this.backgroundConfig = { ...JSON.parse(p.config) };
      } else {
        const favArray = JSON.parse(p.config);
        if (favArray.length > 0) {
          favArray.forEach((fav) => {
            if (fav.type === 'group') {
              fav.config.chartArray.forEach((chart) => {
                this.index += 1;
                chart.i = this.index;
                this.layout.push(chart);
              });
            }
            this.index += 1;
            fav.i = this.index;
            this.layout.push(fav);
            this.selectItem(fav);
            this.addHistory();
          });
        }
      }
    },
  },
  created() {
    // 这里监听所有请求参数
    this.$root.$on('paramChange', this.paramChange);
  },
  mounted() {
    if (this.$route.query.id) {
      this.getScreen();
    } else {
      this.config.data.name = '新建组件 ';
    }
    document.onkeydown = (e) => {
      this.setKeyStatus(e, true);
    };
    document.onkeyup = (e) => {
      this.setKeyStatus(e, false);
    };
    this.moveItem = debounce(this.doMoveItem, 10);
    this.sizeResize = debounce(this.doSizeResize, 10);
    this.onDrag = debounce(this.doOnDrag, 1);
  },
  computed: {
    backgroundStyle() {
      let bkStyle = {};
      if (this.backgroundConfig.src) {
        bkStyle = {
          width: `${this.backgroundConfig.width}px`,
          height: `${this.backgroundConfig.height}px`,
          background: `url('${this.imgUrl}/${this.backgroundConfig.src}')`,
          backgroundRepeat: this.backgroundConfig.backPicSet,
        };
        if (this.backgroundConfig.backPicSet === 'stretch') {
          bkStyle.backgroundSize = '100% 100%';
        } else {
          delete bkStyle.backgroundSize;
        }
      } else {
        bkStyle = {
          width: `${this.backgroundConfig.width}px`,
          height: `${this.backgroundConfig.height}px`,
          background: this.backgroundConfig.color,
          backgroundSize: '10px 10px',
          backgroundImage: this.backgroundConfig.showGrid
            ? 'linear-gradient(90deg, #f2f2f2 10%, rgba(0, 0, 0, 0) 10%),'
            + 'linear-gradient(#f2f2f2 10%, rgba(0, 0, 0, 0) 10%)' : '',
        };
      }
      return bkStyle;
    },
  },
  watch: {
  },
};
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl';
@import '~src/css/app.styl';

.draggable-item-class
  overflow hidden
  height 100%
.ul-box-tool
  list-style none
  height 30px
  cursor pointer
.w_l_list
  >div
    padding 8px
    cursor pointer
    >.col
      padding-right 8px
      word-break break-all
  .w_l_cat:hover
    background $primary-light
  .w_l_val:hover
    background $positive-light

</style>
