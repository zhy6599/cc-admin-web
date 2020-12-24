<template>
  <div class="column view_card shadow-2">
    <div class="col row no-wrap justify-between items-center content-center">
      <div class="col text-center q-mt-lg">
        <div>今日IP</div>
        <div class="text-h5">1204</div>
      </div>
      <div class="col text-center">
        <div>今日访问</div>
        <div class="text-h5">2434</div>
      </div>
      <div class="col text-center">
        <div>总访问量</div>
        <div class="text-h5">859964</div>
      </div>
    </div>
    <div class="col" id="mainTrend" :style="{height:'360px'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'MiniArea',
  data() {
    return {
      xData: [],
      yData: [],
      height: 100,
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.$axios.get(`/sys/visitInfo?token=${Math.random()}`).then(({ result }) => {
      const xData = [];
      const ipData = [];
      const visitData = [];
      result.forEach((dt) => {
        xData.push(dt.tian);
        ipData.push(dt.ip);
        visitData.push(dt.visit);
      });
      const mainTrendChart = echarts.init(document.getElementById('mainTrend'));
      const colors = ['#5793f3', '#d14a61', '#675bba'];
      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: [],
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            data: xData,
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '访问量',
            min: 0,
            position: 'left',
            axisLine: { // y轴
              show: false,
            },
          },
        ],
        series: [
          {
            name: 'ip',
            type: 'line',
            data: ipData,
          },
          {
            name: 'visit',
            type: 'line',
            data: visitData,
          },
        ],
      };
      mainTrendChart.setOption(option);
    });
  },
};
</script>

<style >
</style>
