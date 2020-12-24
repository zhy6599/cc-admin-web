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
            <q-icon
              :name="v.icon"
              class="q-mx-sm"
              v-for="v in chartList"
              :key="v.type"
              style="font-size: 32px;"
              @click="selectChartIcon(v.type)"
            >
              <q-tooltip>{{v.name}}</q-tooltip>
            </q-icon>
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
          <grid-layout
            :style="backgroundStyle"
            :layout="layout"
            :col-num="colNum"
            :row-height="rowHeight"
            :is-draggable="draggable"
            :is-resizable="resizable"
            :autoSize="false"
            :vertical-compact="false"
            :use-css-transforms="false"
            :is-mirrored="false"
            :margin="[0, 0]"
          >
            <grid-item
              :class="selChartId === item.i?'grid-item-select':'grid-item-unselect'"
              v-for="item in layout"
              :key="item.i"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              @resized="resizedEvent"
            >
              <div class="col column" :id="item.key" @click="selectItem(item.i)" @dragenter.prevent>
                <textview v-if="item.type === 'text'" :config="item.config" />
                <imageview v-if="item.type === 'image'" :config="item.config" />
                <chartview v-if="item.type === 'chart'" :config="item.config"/>
              </div>
            </grid-item>
          </grid-layout>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { themeMap } from 'boot/datatype';
import VueGridLayout from 'vue-grid-layout';
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
    backgroundsetting,
    datasource,
    chartview,
    chartsetting,
    textview,
    textsetting,
    imageview,
    imagesetting,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data() {
    return {
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      backgroundStyle: {},
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
      colNum: 800,
      rowHeight: 1,
      draggable: true,
      resizable: true,
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
      let maxY = 0;
      this.layout.forEach((item) => {
        if (item.y > maxY) {
          maxY = item.y + 1;
        }
      });
      const item = {
        x: 0,
        y: maxY,
        w: 200,
        h: 50,
        type,
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
    resizedEvent(i) {
      const selChart = this.layout.filter((item) => item.i === i)[0];
      selChart.config.needResize = true;
      this.selectItem(i);
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
    this.backgroundStyle = {
      width: `${this.backgroundConfig.width}px`,
      height: `${this.backgroundConfig.height}px`,
      background: this.backgroundConfig.color,
      backgroundSize: '10px 10px',
      backgroundImage: this.backgroundConfig.showGrid
        ? 'linear-gradient(90deg, #f2f2f2 10%, rgba(0, 0, 0, 0) 10%),'
            + 'linear-gradient(#f2f2f2 10%, rgba(0, 0, 0, 0) 10%)' : '',
    };
    if (this.$route.query.id) {
      this.getScreen();
    } else {
      this.config.data.name = '新建组件 ';
    }
  },
  computed: {
  },
  watch: {
    backgroundConfig: {
      deep: true,
      handler() {
        if (this.backgroundConfig.src) {
          this.backgroundStyle = {
            width: `${this.backgroundConfig.width}px`,
            height: `${this.backgroundConfig.height}px`,
            background: `url('${this.imgUrl}/${this.backgroundConfig.src}')`,
            backgroundRepeat: this.backgroundConfig.backPicSet,

          };
          if (this.backgroundConfig.backPicSet === 'stretch') {
            this.backgroundStyle.backgroundSize = '100%';
          } else {
            delete this.backgroundStyle.backgroundSize;
          }
        } else {
          this.backgroundStyle = {
            width: `${this.backgroundConfig.width}px`,
            height: `${this.backgroundConfig.height}px`,
            background: this.backgroundConfig.color,
            backgroundSize: '10px 10px',
            backgroundImage: this.backgroundConfig.showGrid
              ? 'linear-gradient(90deg, #f2f2f2 10%, rgba(0, 0, 0, 0) 10%),'
            + 'linear-gradient(#f2f2f2 10%, rgba(0, 0, 0, 0) 10%)' : '',
          };
        }
      },
    },
  },
};
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl';

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

.chartIcon {
  font-size: 32px;
  color: #fff;
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
