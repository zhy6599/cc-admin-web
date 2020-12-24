<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="column q-pa-sm">
        <div class="col column view_card shadow-2 q-pa-md justify-center items-center">
          <grid-layout
              :style="{width: backgroundConfig.width+'px',height:backgroundConfig.height+'px',
              background:backgroundConfig.color,backgroundSize: '10px 10px'
              }"
              id="grid-layout"
              :layout="layout"
              :col-num="colNum"
              :row-height="rowHeight"
              :is-draggable="false"
              :is-resizable="false"
              :autoSize="false"
              :vertical-compact="false"
              :use-css-transforms="false"
              :is-mirrored="false"
              :margin="[0, 0]"
            >
              <grid-item
                v-for="item in layout"
                :key="item.i"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
              >
                <div class="col" :id="item.key">
                  <textview v-if="item.type === 'text'" :config="item.config" />
                  <imageview v-if="item.type === 'image'" :config="item.config" />
                  <chartview v-if="item.type === 'chart'" :config="item.config"/>
                </div>
              </grid-item>
            </grid-layout>
        </div>
      </q-page>
    </q-page-container>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-layout>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import chartview from './modules/chartview';
import textview from './modules/textview';
import imageview from './modules/imageview';

export default {
  name: 'ScreenDesign',
  components: {
    chartview,
    textview,
    imageview,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data() {
    return {
      allParam: {}, // 所有请求参数
      right: true,
      loading: false,
      config: {
      },
      backgroundConfig: {
        width: 800, height: 600, color: '#fff', showGrid: true,
      },
      colNum: 800,
      rowHeight: 1,
      draggable: false,
      resizable: false,
      index: 0,
      layout: [],
    };
  },
  created() {
    this.$root.$on('paramChange', this.paramChange);
  },
  methods: {
    paramChange(param) {
      // 将请求参数合并到一起
      Object.assign(this.allParam, param);
      this.$root.$emit('allParamChange', this.allParam);
    },
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
  },
  mounted() {
    if (this.$route.query.id) {
      this.getScreen();
    } else {
      this.$error('请输入正确ID');
    }
  },
  beforeDestroy() {
    this.$root.$off('paramChange', this.paramChange);
  },
};
</script>

<style lang="stylus">
</style>
