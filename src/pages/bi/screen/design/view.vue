<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="cc-admin column">
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
              :resizable="false"
              :draggable="false"
              :class="'no-border'"
            >
              <div :class="getItemClass(item)" :id="item.key">
                <textview v-if="item.type === 'text'" :config="item.config" />
                <imageview v-if="item.type === 'image'" :config="item.config" />
                <chartview v-if="item.type === 'chart'" :config="item.config" />
                <videoview v-if="item.type === 'video'" :config="item.config" />
                <omnipotentview v-if="item.type === 'omnipotent'" :config="item.config" />
                <customview v-if="item.type === 'custom'" :config="item.config" />
              </div>
            </vue-draggable-resizable>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import chartview from './modules/view/chartview';
import textview from './modules/view/textview';
import imageview from './modules/view/imageview';
import videoview from './modules/view/videoview';
import omnipotentview from './modules/view/omnipotentview';
import customview from './modules/view/customview';

export default {
  components: {
    VueDraggableResizable,
    chartview,
    textview,
    imageview,
    videoview,
    omnipotentview,
    customview,
  },
  data() {
    return {
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
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
    getItemClass(item) {
      const itemClsList = ['col', 'column'];
      if (item.type !== 'image') {
        itemClsList.push('draggable-item-class');
      } else if (item.config.overflowHiden) {
        itemClsList.push('draggable-item-class');
      }
      return itemClsList;
    },
    getScreen() {
      this.loading = true;
      return this.$axios.get(`/bi/screen/queryById?id=${this.$route.query.id}`)
        .then(({ result }) => {
          const biScreen = result;
          if (biScreen && biScreen.config) {
            const configObj = JSON.parse(biScreen.config);
            this.layout = configObj.layout;
            this.backgroundConfig = { ...configObj.backgroundConfig };
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
        }).finally(() => {
          this.loading = false;
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
};
</script>

<style lang="stylus">
.draggable-item-class
  overflow hidden
  height 100%
.gridBackground {
  backgroundImage: 'linear-gradient(90deg, #f2f2f2 10%, rgba(0, 0, 0, 0) 10%),
linear-gradient(#f2f2f2 10%, rgba(0, 0, 0, 0) 10%)';
}
</style>
