<template>
  <div class="row q-px-sm q-mb-md">
    <div class="col">
      <div class="column bg-white shadow-2">
        <div class="col row no-wrap justify-between items-center content-center">
          <div class="col text-center q-mt-lg">
            <div>在线用户</div>
            <q-btn flat round to="/monitor/online">
              <div class="text-h5 text-primary">{{statInfo.onlineUserCount}}</div>
            </q-btn>
          </div>
          <div class="col text-center q-mt-lg">
            <div>今日IP</div>
            <q-btn flat round to="/monitor/log">
              <div class="text-h5 text-primary">{{statInfo.todayIp}}</div>
            </q-btn>
          </div>
          <div class="col text-center q-mt-lg">
            <div>今日访问</div>
            <q-btn flat round >
              <div class="text-h5">{{statInfo.todayVisitCount}}</div>
            </q-btn>
          </div>
          <div class="col text-center q-mt-lg">
            <div>总访问量</div>
            <q-btn flat round >
              <div class="text-h5">{{statInfo.totalVisitCount}}</div>
            </q-btn>
          </div>
        </div>
        <div class="col" ref="homeVisitLine" :style="{height:'360px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'VisitLine',
  props: {
    screenWidth: Number,
  },
  data() {
    return {
      statInfo: {
        onlineUserCount: 80, todayIp: 100, todayVisitCount: 1000, totalVisitCount: 859964,
      },
      xData: [],
      yData: [],
      height: 100,
      loading: false,
      chart: '',
    };
  },
  computed: {
  },
  methods: {
    doResize() {
      if (this.chart) {
        this.$nextTick(() => {
          this.chart.resize();
        });
      }
    },
    renderChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.homeVisitLine);
      }
      const option = this.makeOptions();
      this.chart.clear();
      this.chart.setOption(option);
      this.doResize();
    },
    loadData() {
      this.$axios.get(`/sys/loginfo?token=${Math.random()}`).then(({ result }) => {
        this.statInfo = result;
      });

      this.$axios.get(`/sys/visitInfo?token=${Math.random()}`).then(({ result }) => {
        this.xData = [];
        this.ipData = [];
        this.visitData = [];
        result.forEach((dt) => {
          this.xData.push(dt.tian);
          this.ipData.push(dt.ip);
          this.visitData.push(dt.visit);
        });
        this.renderChart();
      });
    },
    makeOptions() {
      const colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
        '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];

      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          formatter: '日期:{b}<BR>访问量:{c0}<BR>IP数:{c1}',
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
            data: this.xData,
            axisLabel: {
              rotate: 30,
              margin: 18,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '访问量',
            min: 0,
            position: 'left',
          },
          {
            type: 'value',
            name: 'IP数',
            min: 0,
            position: 'right',
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: 'visit',
            type: 'bar',
            data: this.visitData,
          },
          {
            name: 'ip',
            yAxisIndex: 1,
            type: 'line',
            data: this.ipData,
          },
        ],
      };
      return option;
    },
  },
  created() {
  },
  mounted() {
    this.loadData();
  },
  watch: {
    screenWidth() {
      this.doResize();
    },
  },
};
</script>

<style >
</style>
