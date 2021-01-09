<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="column">
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
              :class="'no-border'"
            >
              <div class="col column" style="overflow: hidden;height:100%;" :id="item.key">
                <textview v-if="item.type === 'text'" :config="item.config" />
                <imageview v-if="item.type === 'image'" :config="item.config" />
                <chartview v-if="item.type === 'chart'" :config="item.config" />
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
import chartview from './modules/chartview';
import textview from './modules/textview';
import imageview from './modules/imageview';

export default {
  components: {
    VueDraggableResizable,
    chartview,
    textview,
    imageview,
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
    getScreen() {
      this.loading = true;
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
};
</script>

<style lang="stylus">
.gridBackground {
  backgroundImage: 'linear-gradient(90deg, #f2f2f2 10%, rgba(0, 0, 0, 0) 10%),
linear-gradient(#f2f2f2 10%, rgba(0, 0, 0, 0) 10%)';
}
</style>
