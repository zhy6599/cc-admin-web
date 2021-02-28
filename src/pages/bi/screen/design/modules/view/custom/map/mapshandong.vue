<template>
  <div ref="chart" :style="chartStyle" />
</template>

<script>
import echarts from 'echarts';

require('echarts/lib/chart/map');
require('echarts/lib/chart/lines');
require('echarts/lib/component/geo');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/theme/macarons');

export default {
  name: 'mapshandong',
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
  components: {
  },
  data() {
    return {
      chart: null,
      loading: false,
      dataList: [{ name: '济南市', value: 396 },
        { name: '青岛市', value: 66 },
        { name: '烟台市', value: 222 },
        { name: '潍坊市', value: 688 },
        { name: '菏泽市', value: 75 },
        { name: '日照市', value: 121 },
        { name: '威海市', value: 91 },
        { name: '枣庄市', value: 479 },
        { name: '临沂市', value: 34 },
        { name: '滨州市', value: 631 },
        { name: '东营市', value: 1203 },
        { name: '淄博市', value: 988 },
        { name: '泰安市', value: 693 },
        { name: '聊城市', value: 934 },
        { name: '济宁市', value: 748 },
        { name: '德州市', value: 1267 },
      ],
      geoCoordMap: {},
    };
  },
  computed: {
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    convertData(data) {
      const res = [];
      for (let i = 0; i < data.length; i += 1) {
        const geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },
    registerMap() {
      this.$axios.get('/bi/map/queryById?id=49fc3328-b120-452b-94d1-deba7ef9f086').then(({ result }) => {
        echarts.registerMap('MP', result.json);
        this.makeOptions();
      }).finally(() => {
      });
    },
    makeOptions() {
      this.chart.showLoading();
      const mapFeatures = echarts.getMap('MP').geoJson.features;
      this.chart.hideLoading();
      mapFeatures.forEach((v) => {
        // 地区名称
        const { name } = v.properties;
        // 地区经纬度
        this.geoCoordMap[name] = v.properties.center;
      });
      const option = {
        title: {
          text: '地图',
          top: '2%',
          textStyle: {
            color: '#000',
            fontSize: 16,
          },
        },
        visualMap: [{
          min: 0,
          max: 1000,
          show: false,
          //   text: ['High', 'Low'],
          realtime: false,
          calculable: false,
          seriesIndex: [0],
          inRange: {
            color: ['rgb(202,249,130)', 'rgb(129,211,248)', 'rgb(255,255,128)', 'rgb(128,255,255)', 'rgb(0,255,255)', 'rgb(128,128,255)', 'rgb(236,128,141)', 'rgb(194,128,255)', 'rgb(245,154,35)', 'rgb(112,182,3)', 'rgb(0,182,128)', 'rgb(99,0,191)'],
          },
        },
        {
          min: 0,
          max: 1000,
          seriesIndex: 1,
          show: true,
          splitNumber: 4,
          right: '2%',
          inRange: {
            color: ['#FF6464', '#FFA85A', '#FFEC6F', '#8BBCFE'].reverse(),
          },
          formatter() {
            return '';
          },
        }],
        geo: {
          map: 'MP',
          show: false,
          roam: true,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
        },
        series: [
          { // 地图块的相关信息
            type: 'map',
            map: 'MP',
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  fontWeight: 400,
                  color: 'rgb(0,0,0) ',
                },
              },
            },
            data: this.dataList,
          },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: [40, 40],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#000',
                  fontSize: 10,
                  fontWeight: 600,
                },
                formatter(value) {
                  return value.data.value[2];
                },
              },
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: 'pink', // 标志颜色
              },
            },
            zlevel: 6,
            data: this.convertData(this.dataList),
          },
        ],
      };

      this.chart.clear();
      this.chart.setOption(option);
      setTimeout(() => {
        this.chart.resize();
      }, 100);
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chart, 'shine');
      this.registerMap();
    },
  },
  mounted() {
    this.renderChart();
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

<style lang="stylus"></style>
