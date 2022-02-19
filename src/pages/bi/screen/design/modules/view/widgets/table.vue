<template>
  <div
    :class="[this.config.table.horizontal ? 'chart-table-horizontal' : 'chart-table-vertical']"
    ref="chart"
    class="cross-chart-table"
  >
    <q-markup-table flat :style="config.table.tableStyle">
      <thead>
        <tr :style="thStyle()">
          <th v-for="(v,idx) in list.head" :key="idx">{{v}}</th>
        </tr>
      </thead>
      <tbody :style="tableStyle()">
        <tr v-for="(v,i) in list.body" :key="i" :style="trStyle(v,i)" style="transition: all 0.3s;">
          <td v-for="(d,idx) in v" :key="idx" :style="tdStyle(v,i)">{{d}}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { debounce } from 'quasar';

export default {
  name: 'ChartTable',
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      data: [],
      interval: this.config.interval,
      ti: 0,
      loading: false,
      tableData: [],
      headerBGC: '#00BAFF',
      oddRowBGC: '#003B51',
      evenRowBGC: '#0A2732',
    };
  },
  methods: {
    tableStyle() {
      const resultStyle = {};
      if (this.config.table.loop) {
        resultStyle.animationDuration = `${this.config.table.scrolldelay}s`;
        resultStyle.animationTimingFunction = 'linear';
        resultStyle.animationIterationCount = 'infinite';
        resultStyle.animationDirection = 'alternate';
        resultStyle.animationDelay = '2s';
        if (this.config.table.alternate) {
          resultStyle.animationDirection = 'alternate';
        } else {
          resultStyle.animationDirection = 'normal';
        }
        if (this.config.table.direction === 'left') {
          resultStyle.animationName = 'tableLoopLeft';
        } else if (this.config.table.direction === 'right') {
          resultStyle.animationName = 'tableLoopRight';
        } else if (this.config.table.direction === 'up') {
          resultStyle.animationName = 'tableLoopUp';
        } else if (this.config.table.direction === 'down') {
          resultStyle.animationName = 'tableLoopDown';
        }
      }
      return resultStyle;
    },
    async glideData() {
      if (this.config.table.glide) {
        const list = this.data.body;
        // 先判断数据条数是否大于1条
        if (!list || list.length < 2) {
          return;
        }
        const row = list.shift();
        const tmp = this.oddRowBGC;
        this.oddRowBGC = this.evenRowBGC;
        this.evenRowBGC = tmp;
        await new Promise((resolve) => setTimeout(resolve, 300));
        list.push(row);
        // 切换奇数偶数颜色，把第一条放到最后一条上
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.glideData();
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
        }, 2000);
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
    doLoadData() {
      this.loading = true;
      if (this.config.viewId && (this.config.cols.length > 0 || this.config.rows.length > 0)) {
        this.$axios.post(`/bi/view/getTableData/${this.config.viewId}`, {
          aggregators: this.config.rows.map((v) => ({
            column: v.name.split('@')[0],
            alias: v.field.alias,
            func: v.agg,
          })),
          allParam: this.allParam,
          cache: false,
          expired: 0,
          filters: this.config.filters,
          groups: this.config.cols,
          nativeQuery: false,
          horizontal: this.config.table.horizontal,
          orders: this.getOrders(),
          pageNo: 1,
          pageSize: this.config.length,
        }).then(({ result }) => {
          const head = [];
          const body = [];
          if (this.config.table.showIndex) {
            head.push('序号');
            head.push(...result.head);
            for (let i = 0; i < result.body.length; i += 1) {
              const row = [];
              row.push(i + 1, ...result.body[i]);
              body.push(row);
            }
            this.data = { head, body };
          } else {
            this.data = result;
          }
        }).finally(() => {
          this.loading = false;
          this.glideData();
        });
      }
    },
    thStyle() {
      const tableHead = {
        ...this.config.table.tableHead,
        fontSize: `${this.config.table.tableHead.fontSize}px`,
        opacity: this.config.table.tableHead.opacity / 100,
        backgroundColor: this.headerBGC,
        height: `${this.config.table.tableHead.thHeight}px !important`,
      };
      return tableHead;
    },
    trStyle(d, idx) {
      const tableBody = {
        ...this.config.table.tableBody,
        fontSize: `${this.config.table.tableBody.fontSize}px`,
        fontColor: '#FFF',
        borderWidth: `${this.config.table.tableBody.borderWidth}px`,
        opacity: this.config.table.tableBody.opacity / 100,
        backgroundColor: `${idx % 2 === 0 ? this.evenRowBGC : this.oddRowBGC}`,
      };
      return tableBody;
    },
    tdStyle() {
      return {
        height: `${this.config.table.tableBody.tdHeight}px !important`,
      };
    },
  },
  created() {
    this.getData = debounce(this.doLoadData, 500);
  },
  mounted() {
    if (this.config.viewId) {
      this.getData();
    }
  },
  watch: {
    config: {
      deep: true,
      handler() {
        if (this.config.needResize) {
          this.config.needResize = false;
        }
        this.getData();
      },
    },
  },
  computed: {
    list() {
      return this.data;
    },
  },
  beforeDestroy() {
    clearTimeout(this.ti);
  },
};
</script>

<style lang="stylus">
.bg-transparent-table
  background-color transparent
.cross-chart-table
  .q-table
    thead
      th, td
        position sticky
        opacity 1
        z-index 1
      tr
        th
          position sticky
          top 0
          z-index 1
@keyframes tableLoopLeft
  0%
    transform translateX(0)
  100%
    transform translateX(-200px)
@keyframes tableLoopRight
  0%
    transform translateX(-200px)
  100%
    transform translateX(0)
@keyframes tableLoopUp
  0%
    transform translateY(0)
  100%
    transform translateY(-100px)
@keyframes tableLoopDown
  0%
    transform translateY(-100px)
  100%
    transform translateY(0)
.chart-table-horizontal
  th:first-child
    position sticky
    left 0
.chart-table-vertical
  th:first-child
    position sticky
    left 0
</style>
