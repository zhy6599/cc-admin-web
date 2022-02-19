<template>
  <div class="cc-rank" :ref="ref">
    <div
      class="row-item"
      v-for="(item, i) in rows"
      :key="item.toString() + item.scroll"
      :style="`height: ${heights[i]}px;`"
    >
      <div class="rank-info">
        <div class="rank">No.{{ item.rank }}</div>
        <div class="info-name" v-html="item.name" />
        <div class="rank-value">
          {{ mergedConfig.valueFormatter ? mergedConfig.valueFormatter(item) :
          item.value + mergedConfig.unit }}
        </div>
      </div>

      <div class="rank-column">
        <div class="inside-column" :style="`width: ${item.percent}%;`">
          <div class="shine" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dom, extend, debounce } from 'quasar';

export default {
  name: 'ScrollRank',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      ref: 'scroll-rank',
      data: [],
      interval: this.config.interval,
      ti: 0,
      tableData: [],
      loading: false,
      defaultConfig: {
        /**
         * @description Board data
         * @type {Array<Object>}
         * @default data = []
         */
        data: [],
        /**
         * @description Row num
         * @type {Number}
         * @default rowNum = 5
         */
        rowNum: 5,
        /**
         * @description Scroll wait time
         * @type {Number}
         * @default waitTime = 2000
         */
        waitTime: 2000,
        /**
         * @description Carousel type
         * @type {String}
         * @default carousel = 'single'
         * @example carousel = 'single' | 'page'
         */
        carousel: 'single',
        /**
         * @description Value unit
         * @type {String}
         * @default unit = ''
         * @example unit = 'ton'
         */
        unit: '',
        /**
         * @description Auto sort by value
         * @type {Boolean}
         * @default sort = true
         */
        sort: true,
        /**
         * @description Value formatter
         * @type {Function}
         * @default valueFormatter = null
         */
        valueFormatter: null,
      },

      mergedConfig: null,

      rowsData: [],

      rows: [],

      heights: [],

      animationIndex: 0,

      animationHandler: '',

      updater: 0,
    };
  },
  watch: {
    'config.cols': {
      handler() {
        this.getData();
      },
      deep: true,
    },
    'config.rows': {
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
    'config.unit': {
      handler(n, o) {
        if (n !== o) {
          this.getData();
        }
      },
    },
    'config.waitTime': {
      handler(n, o) {
        if (n !== o) {
          this.getData();
        }
      },
    },
    'config.carousel': {
      handler(n, o) {
        if (n !== o) {
          this.getData();
        }
      },
    },
    'config.rowNum': {
      handler(n, o) {
        if (n !== o) {
          this.getData();
        }
      },
    },
    'config.animation': {
      handler(n, o) {
        if (n !== o) {
          this.getData();
        }
      },
    },
  },
  methods: {
    getOrders() {
      const orders = [];
      this.config.orders.forEach((o) => {
        orders.push({
          column: o.name,
          direction: o.sort,
        });
      });
      return orders;
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
    doLoadData() {
      this.loading = true;
      if (this.config.viewId && (this.config.cols.length > 0 || this.config.rows.length > 0)) {
        this.$axios.post(`/bi/view/getTableData/${this.config.viewId}`, {
          aggregators: this.config.rows.map((v) => ({
            column: v.name.split('@')[0],
            alias: v.field.alias,
            func: v.agg,
          })),
          cache: false,
          expired: 0,
          filters: this.config.filters,
          groups: this.config.cols,
          nativeQuery: false,
          orders: this.getOrders(),
          pageNo: 1,
          pageSize: this.config.length,
        }).then(({ result }) => {
          const box = this.$refs[this.ref];
          this.width = dom.width(box);
          this.height = dom.height(box);
          const data = [];
          if (result.body) {
            for (let i = 0; i < result.body.length; i += 1) {
              if (result.head && result.body[i]) {
                data.push({ name: result.body[i][0], value: result.body[i][1] });
              }
            }
          }
          this.config.data = data;
          this.afterAutoResizeMixinInit();
        }).finally(() => {
          this.loading = false;
        });
      } else {
        this.afterAutoResizeMixinInit();
      }
    },
    afterAutoResizeMixinInit() {
      this.calcData();
    },
    onResize() {
      if (!this.mergedConfig) return;
      this.calcHeights(true);
    },
    calcData() {
      this.mergeConfig();
      this.calcRowsData();
      this.calcHeights();
      if (this.config.animation) {
        this.animation(true);
      }
    },
    mergeConfig() {
      const cloneMergedConfig = extend(true, {}, this.defaultConfig);
      this.mergedConfig = extend(true, cloneMergedConfig, this.config || []);
    },
    calcRowsData() {
      let { data } = this.mergedConfig;
      const { rowNum, sort } = this.mergedConfig;

      if (sort) {
        data.sort(({ value: a }, { value: b }) => {
          if (a > b) return -1;
          if (a < b) return 1;
          if (a === b) return 0;
          return 0;
        });
      }
      const v = data.map(({ value }) => value);
      const min = Math.min(...v) || 0;
      // abs of min
      const minAbs = Math.abs(min);
      const max = Math.max(...v) || 0;
      const total = max + minAbs;
      data = data.map((row, i) => ({
        ...row,
        rank: i + 1,
        percent: ((row.value + minAbs) / total) * 100,
      }));
      const rowLength = data.length;
      if (rowLength > rowNum && rowLength < 2 * rowNum) {
        data = [...data, ...data];
      }
      data = data.map((d, i) => ({ ...d, scroll: i }));
      this.rowsData = data;
      this.rows = data;
    },
    calcHeights(onresize = false) {
      const { height, mergedConfig } = this;
      const { rowNum, data } = mergedConfig;
      const avgHeight = height / rowNum;
      this.avgHeight = avgHeight;
      if (!onresize) this.heights = new Array(data.length).fill(avgHeight);
    },
    async animation(start = false) {
      let {
        animationIndex,
      } = this;
      const {
        avgHeight, mergedConfig, rowsData, animation, updater,
      } = this;

      const { waitTime, carousel, rowNum } = mergedConfig;

      const rowLength = rowsData.length;

      if (rowNum >= rowLength) return;
      if (start) {
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        if (updater !== this.updater) return;
      }

      const animationNum = carousel === 'single' ? 1 : rowNum;

      const rows = rowsData.slice(animationIndex);
      rows.push(...rowsData.slice(0, animationIndex));

      this.rows = rows.slice(0, rowNum + 1);
      this.heights = new Array(rowLength).fill(avgHeight);

      await new Promise((resolve) => setTimeout(resolve, 300));
      if (updater !== this.updater) return;

      this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0));

      animationIndex += animationNum;

      const back = animationIndex - rowLength;
      if (back >= 0) animationIndex = back;

      this.animationIndex = animationIndex;
      this.animationHandler = setTimeout(animation, waitTime - 300);
    },
    stopAnimation() {
      const { animationHandler, updater } = this;

      this.updater = (updater + 1) % 999999;

      if (!animationHandler) return;

      clearTimeout(animationHandler);
    },
  },
  created() {
    this.getData = debounce(this.doLoadData, 10);
  },
  destroyed() {
    this.stopAnimation();
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="stylus">
$color = #1370fb
.cc-rank
  color #fff
  overflow hidden
  .row-item
    width 100%
    transition all 0.3s
    display flex
    flex-direction column
    justify-content center
    overflow hidden
    .rank-info
      display flex
      width 100%
      font-size 13px
      .rank
        width 40px
        color $color
      .info-name
        flex 1
    .rank-column
      border-bottom 2px solid fade($color, 50)
      margin-top 5px
      .inside-column
        position relative
        height 6px
        background-color $color
        margin-bottom 2px
        border-radius 1px
        overflow hidden
      .shine
        position absolute
        left 0%
        top 2px
        height 2px
        width 50px
        transform translateX(-100%)
        background radial-gradient(rgb(40, 248, 255) 5%, transparent 80%)
        animation shine 3s ease-in-out infinite alternate
@keyframes shine
  80%
    left 0%
    transform translateX(-100%)
  100%
    left 100%
    transform translateX(0%)
</style>
