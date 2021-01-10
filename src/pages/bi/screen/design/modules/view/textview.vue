<template>
  <div ref="textView" :style="textStyle"></div>
</template>
<script>
import { debounce, date } from 'quasar';

export default {
  name: 'textview',
  data() {
    return {
      weekday: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
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
    'config.asDate': {
      handler(n, o) {
        if (n !== o) {
          if (n) {
            this.config.interval = 1;
            this.config.loop = true;
          } else {
            this.config.interval = 60;
          }
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
    renderContent() {
      if (this.config.asDate) {
        this.renderDate();
      } else {
        this.getData();
      }
    },
    renderDate() {
      let result = this.text;
      const timeStamp = Date.now();
      if (this.config.dateFormat === '星期几') {
        result = this.weekday[date.formatDate(timeStamp, 'd')];
      } else {
        result = date.formatDate(timeStamp, this.config.dateFormat);
      }
      if (this.$refs.textView) {
        this.$refs.textView.innerHTML = result;
      }
      this.confirmLoop();
    },
    renderText() {
      let result = this.text;
      const { dataList } = this.chartData;
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
      if (!this.config.asDate) {
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
      } else {
        this.renderContent();
      }
    },
    loop() {
      clearTimeout(this.ti);
      this.interval -= 1;
      if (this.interval < 1) {
        this.renderContent();
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
      }
      if (this.config.src) {
        resultStyle.background = `url('${this.imgUrl}/${this.config.src}')`;
        resultStyle.backgroundRepeat = this.config.backPicSet;
        if (this.config.backPicSet === 'stretch') {
          resultStyle.backgroundSize = '100%';
        } else {
          delete resultStyle.backgroundSize;
        }
      }
      if (this.config.marquee.loop) {
        resultStyle.animationDuration = `${this.config.marquee.scrolldelay}s`;
        resultStyle.animationTimingFunction = 'linear';
        resultStyle.animationIterationCount = 'infinite';
        resultStyle.animationDirection = 'alternate';
        resultStyle.animationDelay = '2s';
        if (this.config.marquee.alternate) {
          resultStyle.animationDirection = 'alternate';
        } else {
          resultStyle.animationDirection = 'normal';
        }
        if (this.config.marquee.direction === 'left') {
          resultStyle.left = '100%';
          resultStyle.animationName = 'wordsLoopLeft';
        } else if (this.config.marquee.direction === 'right') {
          resultStyle.left = '0%';
          resultStyle.animationName = 'wordsLoopRight';
        } else if (this.config.marquee.direction === 'up') {
          resultStyle.top = '0%';
          resultStyle.animationName = 'wordsLoopUp';
        } else if (this.config.marquee.direction === 'down') {
          resultStyle.bottom = '0%';
          resultStyle.animationName = 'wordsLoopDown';
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

<style >
@keyframes wordsLoopLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes wordsLoopRight {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes wordsLoopUp {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes wordsLoopDown {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
