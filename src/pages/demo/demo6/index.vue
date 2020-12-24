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

    const builderJson = {
      all: 10887,
      charts: {
        map: 3237,
        lines: 2164,
        bar: 7561,
        line: 7778,
        pie: 7355,
        scatter: 2405,
        candlestick: 1842,
        radar: 2090,
        heatmap: 1762,
        treemap: 1593,
        graph: 2060,
        boxplot: 1537,
        parallel: 1908,
        gauge: 2107,
        funnel: 1692,
        sankey: 1568,
      },
      components: {
        geo: 2788,
        title: 9575,
        legend: 9400,
        tooltip: 9466,
        grid: 9266,
        markPoint: 3419,
        markLine: 2984,
        timeline: 2739,
        dataZoom: 2744,
        visualMap: 2466,
        toolbox: 3034,
        polar: 1945,
      },
      ie: 9743,
    };

    const downloadJson = {
      'echarts.min.js': 17365,
      'echarts.simple.min.js': 4079,
      'echarts.common.min.js': 6929,
      'echarts.js': 14890,
    };

    const themeJson = {
      'dark.js': 1594,
      'infographic.js': 925,
      'shine.js': 1608,
      'roma.js': 721,
      'macarons.js': 2179,
      'vintage.js': 1982,
    };

    const waterMarkText = 'ECHARTS';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.08;
    ctx.font = '20px Microsoft Yahei';
    ctx.translate(50, 50);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(waterMarkText, 0, 0);

    const option = {
      backgroundColor: {
        type: 'pattern',
        image: canvas,
        repeat: 'repeat',
      },
      tooltip: {},
      title: [{
        text: '在线构建',
        subtext: `总计 ${builderJson.all}`,
        left: '25%',
        textAlign: 'center',
      }, {
        text: '各版本下载',
        subtext: `总计 ${Object.keys(downloadJson).reduce((all, key) => all + downloadJson[key], 0)}`,
        left: '75%',
        textAlign: 'center',
      }, {
        text: '主题下载',
        subtext: `总计 ${Object.keys(themeJson).reduce((all, key) => all + themeJson[key], 0)}`,
        left: '75%',
        top: '50%',
        textAlign: 'center',
      }],
      grid: [{
        top: 50,
        width: '50%',
        bottom: '45%',
        left: 10,
        containLabel: true,
      }, {
        top: '55%',
        width: '50%',
        bottom: 0,
        left: 10,
        containLabel: true,
      }],
      xAxis: [{
        type: 'value',
        max: builderJson.all,
        splitLine: {
          show: false,
        },
      }, {
        type: 'value',
        max: builderJson.all,
        gridIndex: 1,
        splitLine: {
          show: false,
        },
      }],
      yAxis: [{
        type: 'category',
        data: Object.keys(builderJson.charts),
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
        splitLine: {
          show: false,
        },
      }, {
        gridIndex: 1,
        type: 'category',
        data: Object.keys(builderJson.components),
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
        splitLine: {
          show: false,
        },
      }],
      series: [{
        type: 'bar',
        stack: 'chart',
        z: 3,
        label: {
          normal: {
            position: 'right',
            show: true,
          },
        },
        data: Object.keys(builderJson.charts).map((key) => builderJson.charts[key]),
      }, {
        type: 'bar',
        stack: 'chart',
        silent: true,
        itemStyle: {
          normal: {
            color: '#eee',
          },
        },
        data: Object.keys(builderJson.charts)
          .map((key) => builderJson.all - builderJson.charts[key]),
      }, {
        type: 'bar',
        stack: 'component',
        xAxisIndex: 1,
        yAxisIndex: 1,
        z: 3,
        label: {
          normal: {
            position: 'right',
            show: true,
          },
        },
        data: Object.keys(builderJson.components).map((key) => builderJson.components[key]),
      }, {
        type: 'bar',
        stack: 'component',
        silent: true,
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#eee',
          },
        },
        data: Object.keys(builderJson.components)
          .map((key) => builderJson.all - builderJson.components[key]),
      }, {
        type: 'pie',
        radius: [0, '30%'],
        center: ['75%', '25%'],
        data: Object.keys(downloadJson).map((key) => ({
          name: key.replace('.js', ''),
          value: downloadJson[key],
        })),
      }, {
        type: 'pie',
        radius: [0, '30%'],
        center: ['75%', '75%'],
        data: Object.keys(themeJson).map((key) => ({
          name: key.replace('.js', ''),
          value: themeJson[key],
        })),
      }],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style lang="stylus"></style>
