<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'customcar',
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
      const getY = function getY(x) {
        const y = Math.sqrt((1 - (x / 38, 2)) ** 2 * (30, 2) ** 2);
        return y;
      };
      const getOutY = function getOutY(x) {
        const y = Math.sqrt((1 - (x / 50, 2)) ** 2 * (42, 2) ** 2);
        return y;
      };
      const items = [{

        symbol: '',
        name: '市监狱局',
        value: [5, getOutY(5)],
        pointType: 'point',
        belong: '南开区',
      },
      {

        symbol: '',
        name: '南开区政府',
        value: [7.5, getOutY(7.5)],
        pointType: 'point',
        belong: '南开区',
      },
      {

        symbol: '',
        name: '市税务局',
        value: [10, getOutY(10)],
        pointType: 'point',
        belong: '河北区',
      },
      {

        symbol: '',
        name: '河北区政府',
        value: [12.5, getOutY(12.5)],
        pointType: 'point',
        belong: '河北区',
      },
      {

        symbol: '',
        name: '市公安局',
        value: [15, getOutY(15)],
        pointType: 'point',
        belong: '西青区',
      },
      {

        symbol: '',
        name: '西青区政府',
        value: [17.5, getOutY(17.5)],
        pointType: 'point',
        belong: '西青区',
      },
      {

        symbol: '',
        name: '市税务局数据中心',
        value: [20, getOutY(20)],
        pointType: 'point',
        belong: '空港IDC',
      },
      {

        symbol: '',
        name: '空港数据中心',
        value: [22.5, getOutY(22.5)],
        pointType: 'point',
        belong: '空港IDC',
      },
      {

        symbol: '',
        name: '武清区政府',
        value: [25, getOutY(25)],
        pointType: 'point',
        belong: '武清区',
      },
      {

        symbol: '',
        name: '市惩防教育基地',
        value: [27.5, getOutY(27.5)],
        pointType: 'point',
        belong: '市电子政务中心',
      },
      {

        symbol: '',
        name: '市教委',
        value: [30, getOutY(30)],
        pointType: 'point',
        belong: '市电子政务中心',
      },
      {

        symbol: '',
        name: '市残联',
        value: [32.5, getOutY(32.5)],
        pointType: 'point',
        belong: '市电子政务中心',
      },
      {

        symbol: '',
        name: '市党委校',
        value: [35, getOutY(35)],
        pointType: 'point',
        belong: '市电子政务中心',
      },
      {

        symbol: '',
        name: '市城管委',
        value: [37.5, getOutY(37.5)],
        pointType: 'point',
        belong: '市电子政务中心',
      },
      {

        symbol: '',
        name: '市生态环境局',
        value: [40, getOutY(40)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [10, 5],
        },
      },
      {

        symbol: '',
        name: '市水务局',
        value: [42.5, getOutY(42.5)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [12, 8],
        },
      },
      {

        symbol: '',
        name: '市规自局',
        value: [45, getOutY(45)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [15, 10],
        },
      },
      {

        symbol: '',
        name: '市卫健局',
        value: [47.2, getOutY(47.2)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [15, 15],
        },
      },
      {

        symbol: '',
        name: '市应急局',
        value: [49, getOutY(49)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [15, 15],
        },
      },
      {

        symbol: '',
        name: '市气象局',
        value: [49.95, getOutY(49.95)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [15, 20],
        },
      },
      {

        symbol: '',
        name: '市合作交流办',
        value: [49.6, -getOutY(49.6)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [15, -15],
        },
      },
      {

        symbol: '',
        name: '市交通运输委',
        value: [48.2, -getOutY(48.2)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [12, -10],
        },
      },
      {

        symbol: '',
        name: '市司法局',
        value: [46.3, -getOutY(46.3)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [12, -8],
        },
      },
      {

        symbol: '',
        name: '市高法',
        value: [44, -getOutY(44)],
        pointType: 'point',
        belong: '市电子政务中心',
        label: {
          show: true,
          offset: [10, -5],
        },
      },
      {

        symbol: '',
        name: '东丽区政府',
        value: [41, -getOutY(41)],
        pointType: 'point',
        belong: '东丽区',
        label: {
          show: true,
          offset: [10, -5],
        },
      },
      {

        symbol: '',
        name: '宝坻区政府',
        value: [38, -getOutY(38)],
        pointType: 'point',
        belong: '宝坻区',
        label: {
          show: true,
          offset: [10, -5],
        },
      },
      {

        symbol: '',
        name: '市科技局',
        value: [35, -getOutY(35)],
        pointType: 'point',
        belong: '和平区',
        label: {
          show: true,
          offset: [10, -5],
        },
      },
      {

        symbol: '',
        name: '市统计局',
        value: [32, -getOutY(32)],
        pointType: 'point',
        belong: '和平区',
        label: {
          show: true,
          offset: [10, -5],
        },
      },
      {

        symbol: '',
        name: '和平区政府',
        value: [29, -getOutY(29)],
        pointType: 'point',
        belong: '和平区',
      },
      {

        symbol: '',
        name: '蓟州区政府',
        value: [26, -getOutY(26)],
        pointType: 'point',
        belong: '蓟州区',
      },
      {

        symbol: '',
        name: '河东区政府',
        value: [23, -getOutY(23)],
        pointType: 'point',
        belong: '河东区',
      },
      {

        symbol: '',
        name: '市人防办',
        value: [20, -getOutY(20)],
        pointType: 'point',
        belong: '河东区',
      },
      {

        symbol: '',
        name: '市粮食和物资储备局',
        value: [17, -getOutY(17)],
        pointType: 'point',
        belong: '河东区',
      },
      {

        symbol: '',
        name: '市场监管委',
        value: [14, -getOutY(14)],
        pointType: 'point',
        belong: '河东区',
      },
      {

        symbol: '',
        name: '河西区政府',
        value: [11, -getOutY(11)],
        pointType: 'point',
        belong: '河西区',
      },
      {

        symbol: '',
        name: '市戒毒局',
        value: [8, -getOutY(8)],
        pointType: 'point',
        belong: '河西区',
      },
      {

        symbol: '',
        name: '市安全局',
        value: [5, -getOutY(5)],
        pointType: 'point',
        belong: '河西区',
      },
      {

        symbol: '',
        name: '市农委',
        value: [2, -getOutY(2)],
        pointType: 'point',
        belong: '河西区',
      },
      {

        symbol: '',
        name: '市文旅局',
        value: [-1, -getOutY(-1)],
        pointType: 'point',
        belong: '河西区',
      },
      {

        symbol: '',
        name: '市纪检委',
        value: [-4, -getOutY(-4)],
        pointType: 'point',
        belong: '河西区',
      },
      {

        symbol: '',
        name: '静海区政府',
        value: [-7, -getOutY(-7)],
        pointType: 'point',
        belong: '静海区',
      },
      {

        symbol: '',
        name: '北辰区政府',
        value: [-10, -getOutY(-10)],
        pointType: 'point',
        belong: '北辰区',
      },
      {

        symbol: '',
        name: '红桥区政府',
        value: [-13, -getOutY(-13)],
        pointType: 'point',
        belong: '红桥区',
      },
      {

        symbol: '',
        name: '滨海新区政府',
        value: [-16, -getOutY(-16)],
        pointType: 'point',
        belong: '滨海新区',
      },
      {

        symbol: '',
        name: '宁河区政府',
        value: [-19, -getOutY(-19)],
        pointType: 'point',
        belong: '宁河区',
      },
      {

        symbol: '',
        name: '市退役军人局',
        value: [-22, -getOutY(-22)],
        pointType: 'point',
        belong: '烟台道联通机房',
      },
      {

        symbol: '',
        name: '市公积金中心',
        value: [-25, -getOutY(-25)],
        pointType: 'point',
        belong: '烟台道联通机房',
      },
      {

        symbol: '',
        name: '市人社局',
        value: [-28, -getOutY(-28)],
        pointType: 'point',
        belong: '烟台道联通机房',
      },
      {

        symbol: '',
        name: '市发改委',
        value: [-31, -getOutY(-31)],
        pointType: 'point',
        belong: '烟台道联通机房',
      },
      {

        symbol: '',
        name: '市国安委',
        value: [-34, -getOutY(-34)],
        pointType: 'point',
        belong: '烟台道联通机房',
      },
      {

        symbol: '',
        name: '市政法委',
        value: [-36, -getOutY(-36)],
        pointType: 'point',
        belong: '烟台道联通机房',
        label: {
          show: true,
          offset: [-10, -5],
        },
      },
      {

        symbol: '',
        name: '市财政局',
        value: [-39, -getOutY(-39)],
        pointType: 'point',
        belong: '烟台道联通机房',
        label: {
          show: true,
          offset: [-10, -8],
        },
      },
      {

        symbol: '',
        name: '市金融局',
        value: [-42, -getOutY(-42)],
        pointType: 'point',
        belong: '烟台道联通机房',
        label: {
          show: true,
          offset: [-10, -8],
        },
      },
      {

        symbol: '',
        name: '市医保局',
        value: [-45, -getOutY(-45)],
        pointType: 'point',
        belong: '烟台道联通机房',
        label: {
          show: true,
          offset: [-12, -10],
        },
      },
      {

        symbol: '',
        name: '市信访办',
        value: [-47.5, -getOutY(-47.5)],
        pointType: 'point',
        belong: '烟台道联通机房',
        label: {
          show: true,
          offset: [-12, -12],
        },
      },
      {

        symbol: '',
        name: '市住建局',
        value: [-49.3, -getOutY(-49.3)],
        pointType: 'point',
        belong: '烟台道联通机房',
        label: {
          show: true,
          offset: [-15, -15],
        },
      },
      {

        symbol: '',
        name: '市商务局',
        value: [-49.99, getOutY(-49.99)],
        pointType: 'point',
        belong: '烟台道联通机房',
        label: {
          show: true,
          offset: [-15, -18],
        },
      },
      {

        symbol: '',
        name: '市委组织部',
        value: [-49, getOutY(-49)],
        pointType: 'point',
        belong: '市政府',
        label: {
          show: true,
          offset: [-15, 20],
        },
      },
      {

        symbol: '',
        name: '市政府服务办',
        value: [-47.2, getOutY(-47.2)],
        pointType: 'point',
        belong: '市政府',
        label: {
          show: true,
          offset: [-15, 15],
        },
      },
      {

        symbol: '',
        name: '市信息中心',
        value: [-45, getOutY(-45)],
        pointType: 'point',
        belong: '市政府',
        label: {
          show: true,
          offset: [-15, 15],
        },
      },
      {

        symbol: '',
        name: '市工信局',
        value: [-42.5, getOutY(-42.5)],
        pointType: 'point',
        belong: '市政府',
        label: {
          show: true,
          offset: [-15, 10],
        },
      },
      {

        symbol: '',
        name: '市高检',
        value: [-40, getOutY(-40)],
        pointType: 'point',
        belong: '市政府',
        label: {
          show: true,
          offset: [-12, 8],
        },
      },
      {

        symbol: '',
        name: '市机关管理局',
        value: [-37.5, getOutY(-37.5)],
        pointType: 'point',
        belong: '市政府',
        label: {
          show: true,
          offset: [-10, 5],
        },
      },
      {

        symbol: '',
        name: '市编办',
        value: [-35, getOutY(-35)],
        pointType: 'point',
        belong: '市政府',
      },
      {

        symbol: '',
        name: '市机要局',
        value: [-32.5, getOutY(-32.5)],
        pointType: 'point',
        belong: '市政府',
      },
      {

        symbol: '',
        name: '市政府办公厅',
        value: [-30, getOutY(-30)],
        pointType: 'point',
        belong: '市政府',
      },
      {

        symbol: '',
        name: '市委网信办',
        value: [-27.5, getOutY(-27.5)],
        pointType: 'point',
        belong: '市政府',
      },
      {

        symbol: '',
        name: '市委办公厅',
        value: [-25, getOutY(-25)],
        pointType: 'point',
        belong: '市政府',
      },
      {

        symbol: '',
        name: '市财政局数据中心',
        value: [-22.5, getOutY(-22.5)],
        pointType: 'point',
        belong: '市人大',
      },
      {

        symbol: '',
        name: '市政协办公厅',
        value: [-20, getOutY(-20)],
        pointType: 'point',
        belong: '市政协',
      },
      {

        symbol: '',
        name: '津南区政府',
        value: [-17.5, getOutY(-17.5)],
        pointType: 'point',
        belong: '津南区',
      },
      {

        symbol: '',
        name: '市人大办公厅',
        value: [-15, getOutY(-15)],
        pointType: 'point',
        belong: '津南区',
      },
      {

        symbol: '',
        name: '华苑数据中心',
        value: [-12.5, getOutY(-12.5)],
        pointType: 'point',
        belong: '华苑IDC',
      },
      {

        symbol: '',
        name: '市民政局',
        value: [-10, getOutY(-10)],
        pointType: 'point',
        belong: '华苑IDC',
      },
      {

        symbol: '',
        name: '市审计局',
        value: [-7.5, getOutY(-7.5)],
        pointType: 'point',
        belong: '科技信息所',
      },
      {

        symbol: '',
        name: '市国资委',
        value: [-5, getOutY(-5)],
        pointType: 'point',
        belong: '科技信息所',
      },
      {

        symbol: '',
        name: '南开区',
        value: [6, getY(6)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '河北区',
        value: [12, getY(12)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '西青区',
        value: [18, getY(18)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '空港IDC',
        value: [24, getY(24)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '武清区',
        value: [30, getY(30)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '市电子政务中心',
        value: [36, getY(36)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '东丽区',
        value: [36, -getY(36)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '宝坻区',
        value: [30, -getY(30)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '和平区',
        value: [24, -getY(24)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '蓟州区',
        value: [18, -getY(18)],
        pointType: 'cloud',
      },
      {
        level: 4,
        symbol: '',
        name: '河东区',
        value: [11, -getY(11)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '河西区',
        value: [4, -getY(4)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '静海区',
        value: [-4, -getY(-4)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '北辰区',
        value: [-11, -getY(-11)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '红桥区',
        value: [-18, -getY(-18)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '滨海新区',
        value: [-24, -getY(-24)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '宁河区',
        value: [-30, -getY(-30)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '烟台道联通机房',
        value: [-36, -getY(-36)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '市政府',
        value: [-36, getY(-36)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '市人大',
        value: [-30, getY(-30)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '市政协',
        value: [-24, getY(-24)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '津南区',
        value: [-18, getY(-18)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '华苑IDC',
        value: [-12, getY(-12)],
        pointType: 'cloud',
      },
      {

        symbol: '',
        name: '科技信息所',
        value: [-6, getY(-6)],
        pointType: 'cloud',
      },
      ];

      items.forEach((el, index) => {
        if (el.pointType === 'cloud') {
          el.symbol = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAhCAYAAACSllj+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTg5MEVERTdBNUZGMTFFOEIzNERDMzk3QjJGOEQ3REMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTg5MEVERThBNUZGMTFFOEIzNERDMzk3QjJGOEQ3REMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODkwRURFNUE1RkYxMUU4QjM0REMzOTdCMkY4RDdEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODkwRURFNkE1RkYxMUU4QjM0REMzOTdCMkY4RDdEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkQLbgwAAAtrSURBVHja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';
          el.symbolSize = [56, 35];
          el.label = {
            normal: {
              show: true,
              position: 'bottom',
              borderWidth: 1,
              borderRadius: 12,
              padding: [4, 8, 4, 8],
              distance: 10,
              color: 'rgb(255,255,255)',
              borderColor: 'rgb(89,197,238)',
            },
          };
        } else if (el.pointType === 'point') {
          el.itemStyle = {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: '#0ceffd',
            },
            {
              offset: 1,
              color: '#0fffff',
            },
            ]),
          };
          if (!el.label) {
            el.label = {
              show: true,
            };
          }
          el.label.width = 200;
          el.label.color = {
            lineColor: {
              color: 'rgb(24,163,239)',
            },
          };
          if (index < 38) {
            el.label.rotate = 57 - 3 * index;
            el.label.align = 'left';
            if (!el.label.offset) {
              el.label.offset = [8, 0];
            }
            if (index < 20) {
              el.label.position = 'top';
            } else {
              el.label.position = 'bottom';
            }
          } else {
            el.label.rotate = (-57 + 3 * (75 - index));
            el.label.align = 'right';
            if (!el.label.offset) {
              el.label.offset = [-8, 0];
            }
            if (index > 56) {
              el.label.position = 'top';
            } else {
              el.label.position = 'bottom';
            }
          }
        }
      });
      const dataArr = [];
      const targetCoord = [0, 0];
      items.forEach((el) => {
        if (el.belong) {
          items.forEach((element) => {
            if (el.belong === element.name) {
              dataArr.push([{
                coord: element.value,
              },
              {
                coord: el.value,
              },
              ]);
            }
          });
        } else if (el.pointType !== 'none') {
          dataArr.push([{
            coord: targetCoord,
          },
          {
            coord: el.value,
          },
          ]);
        }
      });
      return {
        backgroundColor: '#111',
        legend: [],
        xAxis: {
          show: false,
          type: 'value',
          max: 50,
          min: -51,
        },
        yAxis: {
          show: false,
          type: 'value',
          max: 50,
          min: -50,
        },
        series: [{
          type: 'graph',
          layout: 'none',
          coordinateSystem: 'cartesian2d',
          symbolSize: [15, 15],
          z: 3,
          circular: {
            rotateLabel: true,
          },

          itemStyle: {
            normal: {
              shadowColor: 'none',
            },
          },
          data: items,
        },
        {
          name: '',
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          z: 1,
          effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAhCAYAAADtR0oPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAB2ElEQVQ4T32USU7DQBBFbcKMAAFigcSSg3ADtmzZc0juwQ6JMA9hCBAG81/Rv9W2HEp6cae7fk1tuW6appLVCWwmPTEOw0H2ww8CHHEaiLmERTh9ic/0bBBwiNOiWE7MCwynsXgVH2KCYFYLnNfFhtgSiMj8Lu4TIzFGQLQ1sS12xZFA8CZuxYk4FVdiRDmwIBDtiH1xIA7FsdgTZF4SA5xJTcNE3RSeio1gq4I+a08DAaWtiBhfMpqmP0T0mgXlaL/ZSMY4icx+3JMFRKUUnozPNhHs+TzuwBtEJiJztzEpAlBaXBwCR0bAIZdkQ2xBBC4FbJLhWdhehAUEzBn4A9SMkw0xe87QKolNDh+FjTUZyEzAXJKzcMA7Y0PgDFNLehC2O9HbQ5mBHnDAeEvLKYUA448z8EozTvZ4W8sessAZEHBZ3AWi8h6ikq6ASGSgrCfRvbj8LiFgk0MEzJ9psfaU8Gm9fGVJRKdhMljQyoCx6ZIYLSN1hmhYtEpik5LIgPNNWpdNt0pik2hEZZyXad1bkpt2D0S/EGUPvSW5Bz4pQ0E5UzN4Sjhdi3Pxb9NEcQbqPxNuGEGYv94Iux9ll1ESH2M9wywyWDj9LWOdM9hKZxsOyamqfgG1ZQ8JFbfSTwAAAABJRU5ErkJggg===',
            symbolSize: [10, 30],
            period: 4,
            delay: 2,
          },

          lineStyle: {
            width: 2,
            color: 'rgb(255,255,255)',
            curveness: 0,
          },
          data: dataArr,
        },
        ],
      };
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
