<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barcolorful',
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
        { code: '600519', stock: 'aaa', fundPost: '21.987691' },
        { code: '000858', stock: 'bbb', fundPost: '20.377176' },
        { code: '002475', stock: 'ccc', fundPost: '19.127404' },
        { code: '600276', stock: 'ddd', fundPost: '18.40882' },
        { code: '601318', stock: 'eee', fundPost: '17.980597' },
        { code: '000661', stock: 'fff', fundPost: '16.957898' },
        { code: '000333', stock: 'ggg', fundPost: '15.099577' },
        { code: '300760', stock: 'eee', fundPost: '14.76103' },
        { code: '300750', stock: 'ttt', fundPost: '13.002175' },
        { code: '601888', stock: 'fff', fundPost: '12.133536' },
      ];
      function contains(arr, dst) {
        return arr.find((obj) => obj === dst) || false;
      }

      const attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: '#EB3B5A' },
          { offset: 1, color: '#FE9C5A' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: '#FA8231' },
          { offset: 1, color: '#FFD14C' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: '#F7B731' },
          { offset: 1, color: '#FFEE96' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: '#395CFE' },
          { offset: 1, color: '#2EC7CF' },
        ]),
      ];
      const attackSourcesColor1 = [
        '#EB3B5A',
        '#FA8231',
        '#F7B731',
        '#3860FC',
        '#1089E7',
        '#F57474',
        '#56D0E3',
        '#1089E7',
        '#F57474',
        '#1089E7',
        '#F57474',
        '#F57474',
      ];
      const attaData = [];
      const attaName = [];
      const topName = [];
      data.forEach((it, index) => {
        attaData[index] = parseFloat(it.fundPost).toFixed(2);
        attaName[index] = it.stock;
        topName[index] = `${it.code} ${it.stock}`;
      });
      const salvProMax = []; // 背景按最大值
      for (let i = 0; i < attaData.length; i += 1) {
        salvProMax.push(attaData[0]);
      }
      function attackSourcesDataFmt(sData) {
        const sss = [];
        sData.forEach((item, i) => {
          const itemStyle = {
            color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
          };
          sss.push({
            value: item,
            itemStyle,
          });
        });
        return sss;
      }

      const option = {
        // backgroundColor: '#000',
        tooltip: {
          show: false,
          backgroundColor: 'rgba(3,169,244, 0.5)', // 背景颜色（此时为默认色）
          textStyle: {
            fontSize: 16,
          },
        },
        color: ['#F7B731'],
        legend: {
          pageIconSize: [12, 12],
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            // 图例文字的样式
            fontSize: 10,
            color: '#fff',
          },
          selectedMode: false,
          data: ['个人所得(亿元)'],
        },
        grid: {
          left: '5%',
          right: '2%',
          width: '80%',
          bottom: '2%',
          top: '8%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',

          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisPointer: {
              label: {
                show: true,
                // margin: 30
              },
            },
            pdaaing: [5, 0, 0, 0],
            postion: 'right',
            data: attaName,
            axisLabel: {
              margin: 30,
              fontSize: 10,
              align: 'left',
              padding: [2, 0, 0, 0],
              color: '#000',
              rich: {
                nt1: {
                  color: '#fff',
                  backgroundColor: attackSourcesColor1[0],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: 'center',
                  borderRadius: 100,
                  lineHeight: '5',
                  padding: [0, 1, 2, 1],
                  // padding:[0,0,2,0],
                },
                nt2: {
                  color: '#fff',
                  backgroundColor: attackSourcesColor1[1],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: 'center',
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                },
                nt3: {
                  color: '#fff',
                  backgroundColor: attackSourcesColor1[2],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: 'center',
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                },
                nt: {
                  color: '#fff',
                  backgroundColor: attackSourcesColor1[3],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: 'center',
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                  lineHeight: 5,
                },
              },
              formatter(value, index) {
                index = contains(attaName, value) + 1;
                if (index - 1 < 3) {
                  return [`{nt${index}|${index}}`].join('\n');
                }
                return [`{nt|${index}}`].join('\n');
              },
            },
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize: '10',
              },
            },
            data: attackSourcesDataFmt(attaName),
          },
          { // 名称
            type: 'category',
            offset: -10,
            position: 'left',
            axisLine: {
              show: false,
            },
            inverse: false,
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: ['#fff'],
              align: 'left',
              verticalAlign: 'bottom',
              lineHeight: 32,
              fontSize: 10,
            },
            data: topName,
          },
        ],
        series: [
          {
            zlevel: 1,
            name: '个人所得(亿元)',
            type: 'bar',
            barWidth: '15px',
            animationDuration: 1500,
            data: attackSourcesDataFmt(attaData),
            align: 'center',
            itemStyle: {
              normal: {
                barBorderRadius: 10,
              },
            },
            label: {
              show: true,
              fontSize: 10,
              color: '#fff',
              textBorderWidth: 2,
              padding: [2, 0, 0, 0],
            },
          },
          {
            name: '个人所得(亿元)',
            type: 'bar',
            barWidth: 15,
            barGap: '-100%',
            margin: '20',
            data: salvProMax,
            textStyle: {
              // 图例文字的样式
              fontSize: 10,
              color: '#fff',
            },
            itemStyle: {
              normal: {
                color: '#05325F',
                // width:"100%",
                fontSize: 10,
                barBorderRadius: 30,
              },
            },
          },
        ],
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

<style scoped lang="stylus"></style>
