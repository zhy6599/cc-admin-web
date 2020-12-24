<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <div class="row items-center">
        <div class="col-2">
          <q-toolbar>
            <q-toolbar-title>
              <q-avatar>
                <q-icon name="dashboard" />
              </q-avatar>Design
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="col-9">
          <div class="row no-warp justify-center items-center content-center">
            <ul class="ul-box-tool"
              v-for="v in chartList"
              :key="v.type">
              <li class="text-center"
              @click="selectChartIcon(v.type)">
                <q-icon :name="v.icon" size='sm'>
                  <q-tooltip>{{v.name}}</q-tooltip>
                </q-icon>
                <p>{{v.name}}</p>
              </li>
            </ul>
            <q-space />
            <q-icon name="delete_sweep" style="font-size: 32px;" @click="removeItem()">
              <q-tooltip>删除</q-tooltip>
            </q-icon>
          </div>
        </div>
        <div class="col-1 text-right q-pr-md">
          <q-icon
            name="mdi-laptop"
            style="font-size: 32px;margin-right:15px;"
            @click="viewScreen()"
          >
            <q-tooltip>查看</q-tooltip>
          </q-icon>
          <q-icon
            name="mdi-content-save"
            style="font-size: 32px;"
            @click="saveScreen()"
          >
            <q-tooltip>保存</q-tooltip>
          </q-icon>
        </div>
      </div>
    </q-header>

    <q-drawer show-if-above v-model="right" side="right" bordered :width="590">
      <div class="row no-wrap fit overflow-hidden">
        <chartsetting v-if="selType === 'chart'" :config.sync="config" />
        <backgroundsetting v-if="selType === 'cursor'" :config.sync="backgroundConfig" />
        <summarysetting v-if="selType === 'summary'" :config.sync="config" />
        <textsetting v-if="selType === 'text'" :config.sync="config" />
        <imagesetting v-if="selType === 'image'" :config.sync="config" />
        <datasource :config.sync="config" />
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="column q-pa-sm">
        <div class="col column justify-center items-center">
          <div
            :style="backgroundStyle"
          >
            <vue-draggable-resizable
              v-for="item in layout"
              :key="item.i"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :active="item.active"
              :parent="true"
              :class="selChartId === item.i?'grid-item-select':'no-border'"
              @resizestop="resizedEvent"
              @activated="onActivated(item.i)"
              @deactivated="onDeactivated(item.i)"
            >
              <div class="col column" :id="item.key" @click="selectItem(item.i)" @dragenter.prevent>
                <textview v-if="item.type === 'text'" :config="item.config" />
                <imageview v-if="item.type === 'image'" :config="item.config" />
                <chartview v-if="item.type === 'chart'" :config="item.config"/>
              </div>
            </vue-draggable-resizable>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { themeMap } from 'boot/datatype';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import backgroundsetting from './modules/backgroundsetting';
import chartview from './modules/chartview';
import datasource from './modules/datasource';
import chartsetting from './modules/chartsetting';
import textview from './modules/textview';
import textsetting from './modules/textsetting';
import imageview from './modules/imageview';
import imagesetting from './modules/imagesetting';

export default {
  components: {
    VueDraggableResizable,
    backgroundsetting,
    datasource,
    chartview,
    chartsetting,
    textview,
    textsetting,
    imageview,
    imagesetting,
  },
  data() {
    return {
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      backgroundImage: '',
      themeMap,
      allParam: {}, // 所有请求参数
      right: true,
      loading: false,
      saveLoading: false,
      selType: 'cursor',
      selChartId: null,
      config: {
      },
      backgroundConfig: {
        width: 800,
        height: 600,
        color: '#fff',
        showGrid: true,
        src: '',
        backPicSet: 'repeat',
        opacity: 0,
      },
      index: 0,
      chartList: [
        {
          selected: false,
          name: '文字',
          icon: 'text_fields',
          type: 'text',
        },
        {
          selected: false,
          name: '图片',
          icon: 'mdi-file-image',
          type: 'image',
        },
        {
          selected: false,
          name: '图表',
          icon: 'mdi-chart-bar',
          type: 'chart',
        },
        {
          selected: false,
          name: '背景设置',
          icon: 'mdi-cog-outline',
          type: 'cursor',
        },
      ],
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
          if (biScreen && biScreen.config) {
            const configObj = JSON.parse(biScreen.config);
            this.layout = configObj.layout;
            this.backgroundConfig = configObj.backgroundConfig;
            let maxIndex = 0;
            this.layout.forEach((item) => {
              if (item.i > maxIndex) {
                maxIndex = item.i;
              }
            });
            this.index = maxIndex + 1;
          }
        }).catch(() => {
          this.$q.notify({
            color: 'red',
            message: '还原大屏出错！',
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
    onActivated(i) {
      this.selChartId = i;
      if (this.layout.filter((item) => item.i === i).length === 1) {
        const selChart = this.layout.filter((item) => item.i === i)[0];
        this.config = selChart.config;
        this.selType = selChart.type;
      }
    },
    onDeactivated() {
    },
    selectItem(i) {
      this.selChartId = i;
      if (this.layout.filter((item) => item.i === i).length === 1) {
        const selChart = this.layout.filter((item) => item.i === i)[0];
        this.config = selChart.config;
        this.selType = selChart.type;
      }
    },
    removeItem() {
      const selItem = this.layout.filter((item) => item.i === this.selChartId);
      if (selItem.length === 1) {
        this.layout.splice(this.layout.indexOf(selItem[0]), 1);
        this.selType = 'cursor';
      }
    },
    addItem(type) {
      const item = {
        x: 0,
        y: 0,
        w: 300,
        h: 100,
        type,
        active: true,
        i: this.index += 1,
      };
      if (type === 'text') {
        item.config = {
          text: '请输入文字',
          color: '#000',
          fontSize: 12,
          fontWeight: 'normal',
          align: 'left',
          letterSpacing: 0,
        };
      } else if (type === 'image') {
        item.config = {
          src: '',
          opacity: 0,
        };
      } else if (type === 'chart') {
        item.config = {
          rows: [],
          cols: [],
          theme: 'roma',
          colors: this.themeMap.roma,
          orders: [],
          type: 'line',
          name: '',
          title: {
            show: true,
            text: '',
            subtext: '',
            left: 'center',
            top: 'top',
            orient: 'horizontal',
            textStyle: {
              color: '#000',
              fontWeight: 'normal',
              fontSize: 18,
            },
            subtextStyle: {
              color: '#000',
              fontWeight: 'normal',
              fontSize: 12,
            },
          },
          series: {
            bar: {
              stack: false,
              barWidth: 0,
              itemStyle: { opacity: 100, barBorderRadius: 0 },
            },
            center: {
              x: 50,
              y: 50,
            },
          },
          yAxis: {
            master: {
              name: '',
              show: true,
              unit: '',
            },
            slave: {
              name: '',
              show: false,
              unit: '',
            },
          },
          xAxis: {
            show: true,
            nameRotate: 0,
            position: 'bottom',
            type: 'category',
            axisPointer: {
              type: 'shadow',
            },
            name: '',
            nameTextStyle: {
              color: '#333',
              fontSize: 12,
              fontWeight: 'normal',
              fontStyle: 'normal',
            },
            axisLabel: {
              show: true,
              rotate: 0,
              fontSize: 12,
              fontWeight: 'normal',
              fontStyle: 'normal',
            },
          },
          legend: {
            show: true,
            left: 'right',
            top: 'top',
            orient: 'horizontal',
            textStyle: {
              color: '#333',
              fontSize: 12,
              fontWeight: 'normal',
              fontStyle: 'normal',
            },
          },
          grid: {
            left: 10,
            top: 10,
            right: 5,
            bottom: 10,
          },
          needResize: false,
          fillOpacity: 0,
          cornerRadius: 0,
          stacked: false,
          horizontal: false,
          showLoop: true,
          description: '',
          viewId: null,
          length: 100,
          slice: true,
          interval: 60,
          loop: true,
          dragState: {
            type: '',
            data: [],
          },
          draging: {
            type: '',
            data: [],
          },
        };
      } else if (type === 'cursor') {
        this.selType = 'cursor';
        this.selChartId = null;
        return;
      }
      this.layout.push(item);
      this.selectItem(this.index);
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
    resizedEvent(x, y, w, h) {
      const selChart = this.layout.filter((item) => item.i === this.selChartId)[0];
      selChart.x = x;
      selChart.y = y;
      selChart.w = w;
      selChart.h = h;
      selChart.config.needResize = true;
    },
    paramChange(param) {
      // 将请求参数合并到一起
      Object.assign(this.allParam, param);
      this.$root.$emit('allParamChange', this.allParam);
    },
    caclBackground() {

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
          backgroundSize: '10px 10px',
          backgroundImage: this.backgroundConfig.showGrid
            ? 'linear-gradient(90deg, #f2f2f2 10%, rgba(0, 0, 0, 0) 10%),'
            + 'linear-gradient(#f2f2f2 10%, rgba(0, 0, 0, 0) 10%)' : '',

        };
        if (this.backgroundConfig.backPicSet === 'stretch') {
          bkStyle.backgroundSize = '100%';
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
.ul-box-tool
  list-style none
  height 30px
  cursor pointer
.grid-item-select {
  flex: 1;
  border-style: dashed;
  border-width: 2px;
  border-color: #00bfff;
  touch-action: none;
}

.grid-item-unselect {
  flex: 1;
  border-style: solid;
  border-width: 1px;
  border-color: #b8b6ba;
  touch-action: none;
}

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

.gridBackground {
  backgroundImage: 'linear-gradient(90deg, #f2f2f2 10%, rgba(0, 0, 0, 0) 10%),
linear-gradient(#f2f2f2 10%, rgba(0, 0, 0, 0) 10%)';
}
</style>
