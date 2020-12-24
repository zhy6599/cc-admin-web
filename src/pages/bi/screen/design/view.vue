<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="column q-pa-sm">
        <div class="col column view_card shadow-2 q-pa-md justify-center items-center">
          <div :style="backgroundStyle">
            <vue-draggable-resizable
              v-for="item in layout"
              :key="item.i"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :parent="true"
              :draggable="false"
              :resizable="false"
              class-name="no-border"
              @resizestop="resizedEvent(item.i)"
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
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-layout>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import chartview from './modules/chartview';
import textview from './modules/textview';
import imageview from './modules/imageview';

export default {
  name: 'ScreenDesign',
  components: {
    chartview,
    textview,
    imageview,
    VueDraggableResizable,
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
  computed: {
    backgroundStyle() {
      return {
        width: `${this.backgroundConfig.width}px`,
        height: `${this.backgroundConfig.height}px`,
        background: `url('${this.imgUrl}/${this.backgroundConfig.src}')`,
        backgroundRepeat: this.backgroundConfig.backPicSet,

      };
    },
  },
};
</script>

<style lang="stylus">
</style>
