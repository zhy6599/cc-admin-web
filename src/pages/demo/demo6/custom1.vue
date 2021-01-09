<template>
  <q-page class="column q-pa-sm">
    <div class="col column view_card shadow-2">
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
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          data: [
            [1],
          ],
          type: 'custom',
          name: '我爱北京天安门',
          renderItem: (params, api) => {
            const f = api.value(0);
            return {
              type: 'text',
              rotation: 0,
              style: {
                text: params.seriesName + f,
                font: 'italic bolder 46px sans-serif',
                fill: '#000',
                stroke: '#000',
                shadowColor: '#000',
              },
            };
          },
          nameLocation: 'center',
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
