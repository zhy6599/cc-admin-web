<template>
  <div class="row q-mb-md">
    <div class="col">
      <div class="column view_card shadow-2">
        <div class="col row no-wrap justify-between items-center content-center">
          <div class="col text-center q-mt-lg">
            <div>在线用户</div>
            <div class="text-h5">{{statInfo.onlineUserCount}}</div>
          </div>
          <div class="col text-center q-mt-lg">
            <div>今日IP</div>
            <div class="text-h5">{{statInfo.todayIp}}</div>
          </div>
          <div class="col text-center">
            <div>今日访问</div>
            <div class="text-h5">{{statInfo.todayVisitCount}}</div>
          </div>
          <div class="col text-center">
            <div>总访问量</div>
            <div class="text-h5">{{statInfo.totalVisitCount}}</div>
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
  data() {
    return {
      statInfo: {
        onlineUserCount: 80, todayIp: 100, todayVisitCount: 1000, totalVisitCount: 859964,
      },
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
    this.$axios.get(`/sys/loginfo?token=${Math.random()}`).then(({ result }) => {
      this.statInfo = result;
    });

    this.$axios.get(`/sys/visitInfo?token=${Math.random()}`).then(({ result }) => {
      const xData = [];
      const ipData = [];
      const visitData = [];
      result.forEach((dt) => {
        xData.push(dt.tian);
        ipData.push(dt.ip);
        visitData.push(dt.visit);
      });
      const homeVisitLineChart = echarts.init(this.$refs.homeVisitLine);
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
          left: '5%',
          top: '15%',
          right: '5%',
          bottom: '25%',
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            data: xData,
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
            data: visitData,
          },
          {
            name: 'ip',
            yAxisIndex: 1,
            type: 'line',
            data: ipData,
          },
        ],
      };
      homeVisitLineChart.setOption(option);
    });
  },
};
</script>

<style >
</style>
