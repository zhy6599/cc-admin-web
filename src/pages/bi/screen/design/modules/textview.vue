<template>
  <div
    ref="textView"
    :style="textStyle"
  ></div>
</template>
<script>
import { debounce } from 'quasar';

export default {
  name: 'textview',
  data() {
    return {
      text: '',
      chartData: [],
      interval: this.config.interval,
      ti: 0,
      loading: false,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
    };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  watch: {
    'config.datas': {
      handler() {
        this.getData();
      },
      deep: true,
    },
    'config.loop': {
      handler(n, o) {
        if (n !== o) {
          this.confirmLoop();
        }
      },
    },
    'config.interval': {
      handler(n, o) {
        if (n !== o) {
          this.confirmLoop();
        }
      },
    },
    config: {
      deep: true,
      handler() {
        this.text = this.config.text;
        this.renderText();
      },
    },
  },
  mounted() {
    this.text = this.config.text;
    this.doLoadData();
    this.$on('resized', this.handleResize);
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    renderText() {
      const { dataList } = this.chartData;
      let result = this.text;
      try {
        if (dataList && dataList.length > 0) {
          const data = dataList[0];
          Object.keys(data).forEach((key) => {
            if (this.text.indexOf(key) > -1) {
              result = result.replace(key, data[key]);
            }
          });
        }
      } catch (e) {
        result += `解析数据出错：${e}`;
      }
      if (this.$refs.textView) {
        this.$refs.textView.innerHTML = result;
      }
    },
    handleResize() {
    },
    doLoadData() {
      this.loading = true;
      if (this.config.viewId && this.text && this.config.datas.length > 0) {
        this.$axios.post(`/bi/view/getChartData/${this.config.viewId}`, {
          type: 'text',
          aggregators: this.config.datas.map((v) => ({
            column: v.name.split('@')[0],
            func: v.agg,
            alias: v.field.alias,
            axisIndex: v.leftRight ? '1' : '0',
          })),
          allParam: this.allParam,
          cache: false,
          expired: 0,
          filters: this.config.filters,
          groups: [],
          nativeQuery: false,
          orders: [],
          pageNo: 1,
          pageSize: this.config.length,
        }).then(({ result }) => {
          this.chartData = result || {};
          this.renderText();
        }).finally(() => {
          this.loading = false;
          this.confirmLoop();
        });
      } else {
        this.renderText();
      }
    },
    loop() {
      clearTimeout(this.ti);
      this.interval -= 1;
      if (this.interval < 1) {
        this.getData();
      } else {
        this.ti = setTimeout(() => {
          this.loop();
        }, 999);
      }
    },
    confirmLoop() {
      if (this.loopHandler) {
        this.interval = this.config.interval - (-1);
        this.loop();
      } else {
        clearTimeout(this.ti);
      }
    },
  },
  computed: {
    loopHandler() {
      return this.config.loop && (this.config.interval - 0);
    },
    textStyle() {
      const resultStyle = {
        bottom: '0px',
        left: '0px',
        whiteSpace: 'pre-wrap',
        textAlign: this.config.textAlign || 'left',
        fontWeight: this.config.fontWeight || 'normal',
        fontSize: `${this.config.fontSize}px` || '12px',
        color: this.config.color || '#000',
        opacity: this.config.opacity / 100,
      };
      if (this.config.useBackground) {
        resultStyle.backgroundColor = this.config.bgColor || '#000';
        if (this.config.src) {
          resultStyle.background = `url('${this.imgUrl}/${this.config.src}')`;
          resultStyle.backgroundRepeat = this.config.backPicSet;
          if (this.config.backPicSet === 'stretch') {
            resultStyle.backgroundSize = '100%';
          } else {
            delete resultStyle.backgroundSize;
          }
        }
      }

      return resultStyle;
    },
  },
  created() {
    this.getData = debounce(this.doLoadData, 500);
  },
};
</script>

<style lang="less" scoped>
</style>
