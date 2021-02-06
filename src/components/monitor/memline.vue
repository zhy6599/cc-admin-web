<template>
  <div class="row q-px-sm q-mb-md">
    <div class="col">
      <div class="column bg-white shadow-2">
        <div class="col row no-wrap justify-between items-center content-center">
          <div class="col text-center q-mt-lg">
            <div>CPU当前使用率</div>
            <div class="text-h5">{{cpuIdle}}%</div>
          </div>
          <div class="col text-center q-mt-lg">
            <div>内存使用率</div>
            <div class="text-h5">{{memUsageRate}}%</div>
          </div>
          <div class="col text-center q-mt-lg">
            <div>项目持续运行时间</div>
            <div class="text-h5">{{runningTime}}</div>
          </div>
        </div>
        <div class="col" ref="line" :style="{height:'360px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'quasar';
import echarts from 'echarts';

export default {
  name: 'MemLine',
  props: {
    cpuData: Array,
    memData: Array,
    sysTimeData: Array,
    cpuIdle: {
      type: Number,
      default: 0,
    },
    memUsageRate: {
      type: Number,
      default: 0,
    },
    runningTime: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    doResize() {
      if (this.chart) {
        this.$nextTick(() => {
          this.chart.resize();
        });
      }
    },
    refreshChart() {
      if (!this.chart) {
        return;
      }
      const option = this.chart.getOption();
      option.series[0].data = this.cpuData;
      option.series[1].data = this.memData;
      option.xAxis[0].data = this.sysTimeData;
      this.chart.setOption(option);
    },
    renderChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.line);
      }
      const colors = ['#d48265', '#91c7ae',
        '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c23531', '#61a0a8', '#2f4554', '#c4ccd3'];

      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          formatter: '时间: {b}<BR>CPU使用率: {c0}%<BR>内存使用率: {c1}%',
        },
        legend: {
          data: [],
        },
        grid: {
          left: '60px',
          top: '40px',
          right: '60px',
          bottom: '80px',
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            data: this.sysTimeData,
            axisLabel: {
              rotate: 30,
              margin: 18,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'CPU使用率',
            min: 0,
            max: 100,
            position: 'left',
          },
          {
            type: 'value',
            name: '内存使用率',
            min: 0,
            max: 100,
            position: 'right',
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: 'CPU',
            type: 'line',
            data: this.cpuData,
            smooth: true,
          },
          {
            name: 'MEM',
            yAxisIndex: 1,
            type: 'line',
            data: this.memData,
            smooth: true,
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
  mounted() {
    this.onResize = debounce(this.doResize, 500);
    this.renderChart();
  },
  watch: {
    sysTimeData: {
      deep: true,
      handler() {
        this.refreshChart();
      },
    },
    clientWidth() {
      this.onResize();
    },
  },
  computed: {
    clientWidth() {
      return this.$q.screen.width;
    },
  },
};
</script>

<style >
</style>
