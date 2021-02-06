<template>
  <q-page class="cc-admin q-pa-sm">
    <div class="col column bg-white shadow-2">
      <div id="mainChart" class="col"></div>
    </div>
  </q-page>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'Demo6',
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('mainChart'));
    const option = {
      xAxis: {
        type: 'value',
        scale: true,
      },
      yAxis: {
        name: '掉期点(BP)',
        nameLocation: 'middle',
        nameGap: 35,
        nameTextStyle: {
          color: 'rgba(255,255,255)',
        },
        scale: true,
        boundaryGap: ['5%', '5%'],
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#6aa4f0',
            opacity: 0.7,
          },
        },
        axisLabel: {
          show: true,
          formatter: (val) => val.toFixed(2),
        },
        axisTick: {
          show: true,
        },
      },
      dataset: [
        {
          source: [
            { y: 4.2, x: 100 },
            { y: 4.1, x: 300 },
            { y: 4.0, x: 2441.5 },
            { y: 3.85, x: 273 },
            { y: 3.0, x: 730 },
          ],
        },

      ],
      series: [
        {
          type: 'custom',
          name: '1',
          renderItem: (params, api) => {
            const xValue = api.value(0);
            const yValue = api.value(1);
            const start = api.coord([0, 0]);
            const end = api.coord([xValue, yValue]);
            const size = api.size([xValue, yValue]);
            const style = api.style();
            return {
              type: 'rect',
              shape: {
                x: start[0],
                y: end[1] - 0.5, // 纠正height导致的偏移量
                width: size[0],
                height: 2,
              },
              style,
            };
          },
          nameLocation: 'center',
          barMinHeight: 5,
          barWidth: 1,
          nameGap: 40,
          stack: 'all',
          dimensions: ['x', 'y'],
        },

      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style lang="stylus"></style>
