<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'subway',
  props: {
    config: {
      required: true,
    },
    chartStyle: {
      require: false,
      type: Object,
      default: () => ({
        height: '100%',
        position: 'absolute',
        width: '100%',
        top: '0px',
        bottom: '0px',
        left: '0px',
      }),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  created() {

  },
  mounted() {
    this.renderChart();
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    renderChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart, this.config.theme);
      }
      const option = this.makeOptions(this.config, this.chartData);
      this.chart.clear();
      this.chart.setOption(option);
      setTimeout(() => {
        this.chart.resize();
      }, 100);
    },
    makeOptions() {
      const data = [

        {
          name: '地铁一号线',
          tooltip: {
            formatter: '{b}: 19999<br />',
          },
          symbolSize: 0.1,
          value: [5, 750],
          x: 800,
          y: 400,
          fixed: true,
          // draggable: false,
          category: 1,
          label: {
            color: '#35c2ff',
            position: 'bottom',
            fontSize: 24,
            fontWeight: 1000,
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '地铁二号线',
          tooltip: {
            formatter: '{b}: 19999<br />',
          },
          symbolSize: 0.1,
          value: [855, 1050],
          x: 800,
          y: 400,
          fixed: true,
          // draggable: false,
          category: 1,
          label: {
            color: 'red',
            position: 'bottom',
            fontSize: 24,
            fontWeight: 1000,
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '地铁三号线',
          tooltip: {
            formatter: '{b}: 19999<br />',
          },
          symbolSize: 0.1,
          value: [280, 250],
          x: 800,
          y: 400,
          fixed: true,
          // draggable: false,
          category: 1,
          label: {
            color: '#FF00FF',
            position: 'bottom',
            fontSize: 24,
            fontWeight: 1000,
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '地铁四号线',
          tooltip: {
            formatter: '{b}: 19999<br />',
          },
          symbolSize: 0.1,
          value: [1040, 140],
          x: 800,
          y: 400,
          fixed: true,
          // draggable: false,
          category: 1,
          label: {
            color: '#48D1CC',
            position: 'bottom',
            fontSize: 24,
            fontWeight: 1000,
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '机场城际',
          tooltip: {
            formatter: '{b}: 19999<br />',
          },
          symbolSize: 0.1,
          value: [20, 1050],
          x: 800,
          y: 400,
          fixed: true,
          // draggable: false,
          category: 1,
          label: {
            color: '#20B2AA',
            position: 'bottom',
            fontSize: 24,
            fontWeight: 1000,
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        // 地铁一号线，站点间X轴坐标相差50，Y轴坐标相同
        {
          name: '沣河森林公园',
          tooltip: {
            formatter: '{b}: 19999<br />',
          },
          symbol: 'circle',
          symbolSize: [25, 25],
          value: [5, 600],
          x: 800,
          y: 400,
          fixed: true,
          // draggable: false,
          category: 1,
          label: {
            color: '#FFF',
            position: 'bottom',
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '北槐',
          x: 400,
          y: 400,
          value: [80, 600],
          fixed: true,
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#FFF',
            position: 'top',
          },
          category: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },

        {
          name: '上林路',
          x: 1000,
          y: 1000,
          value: [130, 600],
          fixed: true,
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#fff',
            position: 'bottom',
          },
          category: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '沣东自贸园',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [180, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '后卫寨',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [230, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '三桥',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [280, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '皂河',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [330, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '枣园',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [380, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '汉城路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [430, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '开远门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [480, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '劳动路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [530, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '玉祥门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [580, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '洒金桥',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [630, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '北大街',
          symbol: 'circle',
          symbolSize: [20, 20],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [680, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                offset: 0,
                color: '#FF1493',
              },
              {
                offset: 1,
                color: '#0000FF',
              },
              ]),
            },
          },
        },
        {
          name: '五路口',
          symbol: 'circle',
          symbolSize: [20, 20],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [730, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                offset: 0,
                color: '#FF1493',
              },
              {
                offset: 1,
                color: '#0000FF',
              },
              ]),
            },
          },
        },
        {
          name: '朝阳门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [780, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '康复路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [830, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '通化门',
          symbol: 'circle',
          symbolSize: [20, 20],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [880, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                offset: 0,
                color: '#FF1493',
              },
              {
                offset: 1,
                color: '#0000FF',
              },
              ]),
            },
          },
        },
        {
          name: '万寿路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [930, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '长乐坡',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [980, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '浐河',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [1030, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '半坡',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [1080, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        {
          name: '纺织城',
          symbol: 'circle',
          symbolSize: [25, 25],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [1130, 600],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#157eff',
              },
              {
                offset: 1,
                color: '#35c2ff',
              },
              ]),
            },
          },
        },
        // 地铁二号线，垂直线路，站点间X轴坐标相同，Y轴坐标相差50
        {
          name: '钟楼',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 540],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '永宁门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 500],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '南稍门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 450],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '体育场',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 400],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '小寨',
          symbol: 'circle',
          symbolSize: [20, 20],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 350],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                offset: 0,
                color: '#FF1493',
              },
              {
                offset: 1,
                color: '#0000FF',
              },
              ]),
            },
          },
        },
        {
          name: '纬一街',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 300],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '会展中心',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 250],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '三爻',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 200],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '凤栖原',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 150],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '航天城',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 100],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '韦曲南',
          symbol: 'circle',
          symbolSize: [25, 25],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 50],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '安远门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 660],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '龙首原',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 700],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '大明宫西',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 750],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '市图书馆',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 800],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '凤城五路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 850],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '行政中心',
          symbol: 'circle',
          symbolSize: [20, 20],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 900],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                offset: 0,
                color: '#FF1493',
              },
              {
                offset: 1,
                color: '#0000FF',
              },
              ]),
            },
          },
        },
        {
          name: '运动公园',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 950],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '北苑',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 1000],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        {
          name: '北客站',
          symbol: 'circle',
          symbolSize: [25, 25],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [680, 1050],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'red',
              },
              {
                offset: 1,
                color: 'red',
              },
              ]),
            },
          },
        },
        // 地铁三号线
        {
          name: '吉祥村',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [580, 350],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '太白南路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [520, 350],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '科技路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [460, 350],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '延平门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [400, 350],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '丈八北路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [340, 350],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '鱼化寨',
          symbol: 'circle',
          symbolSize: [25, 25],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [280, 350],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '大雁塔',
          symbol: 'circle',
          symbolSize: [20, 20],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [730, 350],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                offset: 0,
                color: '#FF1493',
              },
              {
                offset: 1,
                color: '#0000FF',
              },
              ]),
            },
          },
        },
        {
          name: '北池头',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [800, 350],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '青龙寺',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [850, 370],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '延兴门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [880, 400],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '咸宁路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [880, 450],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '长乐公园',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [880, 500],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '胡家庙',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [880, 660],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '石家街',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [880, 700],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '辛家庙',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [900, 750],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '广泰门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'top',
          },
          value: [960, 755],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '桃花潭',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [1000, 757],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '浐灞中心',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [1040, 780],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '香湖湾',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [1040, 830],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '务庄',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [1040, 880],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '国际港务区',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [1040, 930],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '双寨',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [1040, 980],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '新筑',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [1040, 1030],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        {
          name: '保税区',
          symbol: 'circle',
          symbolSize: [25, 25],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [1040, 1080],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FF00FF',
              },
              {
                offset: 1,
                color: '#FF00FF',
              },
              ]),
            },
          },
        },
        // 地铁四号线
        {
          name: '大唐芙蓉园',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 300],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '曲江池西',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 250],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '金滹沱',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 200],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '航天大道',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 150],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '飞天路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 100],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '东长安街',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 50],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '神舟大道',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [820, 30],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '航天东路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [920, 30],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '航天新城',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [1020, 30],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '西安科技大学',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 400],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '建筑科技大学',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 450],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '和平门',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 500],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '大差市',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 550],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '火车站',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 660],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '含元殿',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 695],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '大明宫',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 735],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '大明宫北',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 770],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '余家寨',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 805],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '百花村',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 835],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '常青路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [730, 865],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '市中医院',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [710, 890],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '文景路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [550, 900],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '凤城九路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [530, 930],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '凤城十二路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [530, 970],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '元朔路',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [530, 1010],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        {
          name: '北客站(北广场)',
          symbol: 'circle',
          symbolSize: [25, 25],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [640, 1100],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#48D1CC',
              },
              {
                offset: 1,
                color: '#48D1CC',
              },
              ]),
            },
          },
        },
        // 机场城际
        {
          name: '渭河南',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [530, 1120],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20B2AA',
              },
              {
                offset: 1,
                color: '#20B2AA',
              },
              ]),
            },
          },
        },
        {
          name: '秦宫',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'left',
          },
          value: [450, 1145],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20B2AA',
              },
              {
                offset: 1,
                color: '#20B2AA',
              },
              ]),
            },
          },
        },
        {
          name: '秦汉新城',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [380, 1105],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20B2AA',
              },
              {
                offset: 1,
                color: '#20B2AA',
              },
              ]),
            },
          },
        },
        {
          name: '长陵',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [310, 1080],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20B2AA',
              },
              {
                offset: 1,
                color: '#20B2AA',
              },
              ]),
            },
          },
        },
        {
          name: '摆旗寨',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [230, 1070],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20B2AA',
              },
              {
                offset: 1,
                color: '#20B2AA',
              },
              ]),
            },
          },
        },
        {
          name: '艺术中心',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [170, 1100],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20B2AA',
              },
              {
                offset: 1,
                color: '#20B2AA',
              },
              ]),
            },
          },
        },
        {
          name: '空港新城',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [120, 1150],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20B2AA',
              },
              {
                offset: 1,
                color: '#20B2AA',
              },
              ]),
            },
          },
        },
        {
          name: '机场（T5）',
          symbol: 'circle',
          symbolSize: [15, 15],
          label: {
            color: '#efefef',
            position: 'right',
          },
          value: [80, 1190],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20B2AA',
              },
              {
                offset: 1,
                color: '#20B2AA',
              },
              ]),
            },
          },
        },
        {
          name: '机场西（T1、T2、T3）',
          symbol: 'circle',
          symbolSize: [25, 25],
          label: {
            color: '#efefef',
            position: 'bottom',
          },
          value: [20, 1130],
          x: 1000,
          y: 1000,
          fixed: true,
          category: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20B2AA',
              },
              {
                offset: 1,
                color: '#20B2AA',
              },
              ]),
            },
          },
        },
      ];

      return ({
        title: {
          text: '西安地铁线路图',
          textStyle: {
            color: 'white',
            fontSize: 20,
          },
          x: 'center',
          top: 10,
        },
        // 不设置背景颜色就是透明色
        // backgroundColor: '#000',
        xAxis: {
          show: false,
          min: 0,
          max: 1200,
          // type: "value",
          // 开启x轴坐标
          axisPointer: {
            show: true,
          },
        },
        yAxis: {
          show: false,
          min: 0,
          max: 1200,
          //   type: "value",
          // 开启y轴坐标
          axisPointer: {
            show: true,
          },
        },
        tooltip: {},
        //  legend: {
        //     show: false
        //  },
        series: [{
          type: 'graph',
          zlevel: 5,
          draggable: false,
          coordinateSystem: 'cartesian2d', // 使用二维的直角坐标系（也称笛卡尔坐标系）

          // edgeSymbolSize: [0, 8], //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
          // edgeLabel: {
          //   normal: {
          //     textStyle: {
          //       fontSize: 60
          //     }
          //   }
          // },
          symbol: 'rect',
          symbolOffset: ['15%', 0],

          label: {
            normal: {
              show: true,
            },
          },
          data,
          links: [{
            source: '沣河森林公园',
            target: '北槐',
            // lineStyle: {
            //   normal: {
            //     color: "#12b5d0",
            //
            //   }
            // }
          },
          {
            source: '北槐',
            target: '上林路',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '上林路',
            target: '沣东自贸园',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '沣东自贸园',
            target: '后卫寨',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },

          {
            source: '后卫寨',
            target: '三桥',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },

          {
            source: '三桥',
            target: '皂河',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },

          {
            source: '皂河',
            target: '枣园',
            // lineStyle: {
            //   normal: {
            //     color: "#12b5d0",
            //
            //   }
            // }
          },
          {
            source: '枣园',
            target: '汉城路',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '汉城路',
            target: '开远门',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '开远门',
            target: '劳动路',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '劳动路',
            target: '玉祥门',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '玉祥门',
            target: '洒金桥',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '洒金桥',
            target: '北大街',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '北大街',
            target: '五路口',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '五路口',
            target: '朝阳门',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '朝阳门',
            target: '康复路',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '康复路',
            target: '通化门',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '通化门',
            target: '万寿路',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '万寿路',
            target: '长乐坡',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '长乐坡',
            target: '浐河',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '浐河',
            target: '半坡',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          {
            source: '半坡',
            target: '纺织城',
            lineStyle: {
              normal: {
                // color: "#12b5d0",
              },
            },
          },
          // 地铁二号线连接
          {
            source: '韦曲南',
            target: '航天城',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '航天城',
            target: '凤栖原',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '凤栖原',
            target: '三爻',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '三爻',
            target: '会展中心',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '会展中心',
            target: '纬一街',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '纬一街',
            target: '小寨',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '小寨',
            target: '体育场',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '体育场',
            target: '南稍门',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '南稍门',
            target: '永宁门',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '永宁门',
            target: '钟楼',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '钟楼',
            target: '北大街',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '北大街',
            target: '安远门',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '安远门',
            target: '龙首原',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '龙首原',
            target: '大明宫西',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '大明宫西',
            target: '市图书馆',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '市图书馆',
            target: '凤城五路',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '凤城五路',
            target: '行政中心',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '行政中心',
            target: '运动公园',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '运动公园',
            target: '北苑',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '北苑',
            target: '北客站',
            lineStyle: {
              normal: {
                color: 'red',
              },
            },
          },
          {
            source: '鱼化寨',
            target: '丈八北路',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '丈八北路',
            target: '延平门',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '延平门',
            target: '科技路',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '科技路',
            target: '太白南路',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '太白南路',
            target: '吉祥村',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '吉祥村',
            target: '小寨',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '小寨',
            target: '大雁塔',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '大雁塔',
            target: '北池头',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '北池头',
            target: '青龙寺',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '青龙寺',
            target: '延兴门',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '延兴门',
            target: '咸宁路',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '咸宁路',
            target: '长乐公园',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '长乐公园',
            target: '通化门',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '通化门',
            target: '胡家庙',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '胡家庙',
            target: '石家街',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '石家街',
            target: '辛家庙',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '辛家庙',
            target: '广泰门',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '广泰门',
            target: '桃花潭',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '桃花潭',
            target: '浐灞中心',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '浐灞中心',
            target: '香湖湾',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '香湖湾',
            target: '务庄',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '务庄',
            target: '国际港务区',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '国际港务区',
            target: '双寨',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '双寨',
            target: '新筑',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          {
            source: '新筑',
            target: '保税区',
            lineStyle: {
              normal: {
                color: '#FF00FF',
              },
            },
          },
          // 地铁四号线和机场城际的连线
          {
            source: '航天新城',
            target: '航天东路',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '航天东路',
            target: '神舟大道',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '神舟大道',
            target: '东长安街',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '东长安街',
            target: '飞天路',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '飞天路',
            target: '航天大道',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '航天大道',
            target: '金滹沱',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '金滹沱',
            target: '曲江池西',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '曲江池西',
            target: '大唐芙蓉园',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '大唐芙蓉园',
            target: '大雁塔',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '大雁塔',
            target: '西安科技大学',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '西安科技大学',
            target: '建筑科技大学',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '建筑科技大学',
            target: '和平门',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '和平门',
            target: '大差市',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '大差市',
            target: '五路口',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '五路口',
            target: '火车站',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '火车站',
            target: '含元殿',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '含元殿',
            target: '大明宫',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '大明宫',
            target: '大明宫北',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '大明宫北',
            target: '余家寨',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '余家寨',
            target: '百花村',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '百花村',
            target: '常青路',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '常青路',
            target: '市中医院',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '市中医院',
            target: '行政中心',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '行政中心',
            target: '文景路',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '文景路',
            target: '凤城九路',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '凤城九路',
            target: '凤城十二路',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '凤城十二路',
            target: '元朔路',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '元朔路',
            target: '北客站(北广场)',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          // 机场城际各站点连线
          {
            source: '北客站(北广场)',
            target: '渭河南',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '渭河南',
            target: '秦宫',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '秦宫',
            target: '秦汉新城',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '秦汉新城',
            target: '长陵',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '长陵',
            target: '摆旗寨',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '摆旗寨',
            target: '艺术中心',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '艺术中心',
            target: '空港新城',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '空港新城',
            target: '机场（T5）',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          {
            source: '机场（T5）',
            target: '机场西（T1、T2、T3）',
            lineStyle: {
              normal: {
                color: '#48D1CC',
              },
            },
          },
          ],
          lineStyle: {
            normal: {
              opacity: 0.6, // 线条透明度
              color: '#53B5EA',
              curveness: 0, // 站点间连线曲度，0表示直线
              width: 10, // 线条宽度
            },
          },
        },
        {
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          z: 1,
          zlevel: 7,
          animation: true,
          effect: {
            show: true,
            period: 5,
            trailLength: 0.71,
            symbolSize: 14,
            symbol: 'circle',
            loop: true,
            color: 'yellow',
            //   color: "rgba(55,155,255,0.5)"
          },
          lineStyle: {
            normal: {
              // color: "green",
              width: 0,
              curveness: 0, // 动画线路的曲度
            },
          },

          data: [
            { // 一号线
              coords: [
                [5, 600],
                [1130, 600],
              ],
            },
            { // 二号线
              coords: [
                [680, 50],
                [680, 1050],
              ],
            },
            //   {  //三号线
            //     coords: [
            //       [280, 350],
            //       [1040, 1080]
            //     ]
            //   }
          ],
        },
        ],
      });
    },
  },
  watch: {
    config: {
      deep: true,
      handler() {
        if (this.config.needResize) {
          this.config.needResize = false;
          this.handleResize();
        }
      },
    },
  },
};
</script>

<style scoped lang="stylus">

</style>
