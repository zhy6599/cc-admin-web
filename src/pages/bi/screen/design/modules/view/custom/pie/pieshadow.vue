<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'pieshadow',
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
      // 职称结构取数
      const getsjjg = ['高级', '中级', '初级', '无等级'];
      const getsjjgrs = [35, 30, 22, 12];
      const syjgdata = [];
      for (let i = 0; i < getsjjg.length; i += 1) {
        syjgdata.push({
          name: getsjjg[i],
          value: getsjjgrs[i],
        });
      }
      const syjgdata2 = [];
      for (let i = 0; i < getsjjg.length; i += 1) {
        syjgdata2.push({
          name: getsjjg[i],
          value: 100,
        });
      }

      const rich = {
        name: {
          color: '#99B3FF',
          fontSize: 14,
          padding: [0, 5],
          fontWeight: '400',
          align: 'right',
        },
        value: {
          color: '#99B3FF',
          fontSize: 14,
          padding: [5, 5],
          fontWeight: '500',
          align: 'right',
        },
        percent: {
          color: '#99B3FF',
          align: 'right',
          fontSize: 14,
          fontWeight: '500',
          padding: [0, 5],
        },
        hr: {
          borderColor: '#DFDFDF',
          width: '100%',
          borderWidth: 1,
          height: 0,
        },
      };
      // 职称结构图表
      const colorList = ['#503EFF', '#733DFF', '#966EFF', '#3E6DFF', '#536EBF', '#6E93FF', '#5FEBFF', '#8AF1FF', '#8AF1FF'];
      const option = {
        // backgroundColor: '#000',
        series: [{
          itemStyle: {
            normal: {
              color(params) {
                return colorList[params.dataIndex];
              },
              borderColor: '#172659',
              borderWidth: 3,
            },
          },
          type: 'pie',
          // clockWise: false ,
          // roseType: 'radius',
          radius: ['40%', '60%'],
          center: ['50%', '50%'],
          labelLine: {
            normal: {
              lineStyle: {
                color: '#34569D',
              },
            },
          },
          label: {
            normal: {
              formatter: (params) => (
                `{name|${params.name}}{percent|${params.percent.toFixed(0)}%}`
              ),
              rich,
              padding: [0, -5, 0, -5],
            },
          },
          data: syjgdata,
        }, {
          itemStyle: {
            normal: {
              color: 'rgba(62,109,255,0.4)',
            },
          },
          type: 'pie',
          hoverAnimation: false,
          radius: ['35%', '65%'],
          center: ['50%', '50%'],
          label: {
            normal: {
              show: false,
            },
          },
          data: [{
            value: 1,
          }],
          z: -1,
        }],
      };
      return option;
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
