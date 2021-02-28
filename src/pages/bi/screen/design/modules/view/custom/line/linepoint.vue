<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'linepoint',
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
      const icon3 = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZEQkQ3QUI5RjBCNDExRUE4RTkwQ0VEQUYyNzc1QkVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZEQkQ3QUJBRjBCNDExRUE4RTkwQ0VEQUYyNzc1QkVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkRCRDdBQjdGMEI0MTFFQThFOTBDRURBRjI3NzVCRUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkRCRDdBQjhGMEI0MTFFQThFOTBDRURBRjI3NzVCRUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz48+R9bAAAK7UlEQVR42tRba2xU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';
      const icon2 = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBBQzE4OTk1RjBCNzExRUFBOTVEQUQ4MDU1NzM3QTM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBBQzE4OTk2RjBCNzExRUFBOTVEQUQ4MDU1NzM3QTM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEFDMTg5OTNGMEI3MTFFQUE5NURBRDgwNTU3MzdBMzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEFDMTg5OTRGMEI3MTFFQUE5NURBRDgwNTU3MzdBMzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ckAPZAAALkUlEQVR42tRba2yT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';
      const icon1 = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM0NzYwMkQ3RjBCNzExRUFBOTIwQUJDNzZERjYzQzExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM0NzYwMkQ4RjBCNzExRUFBOTIwQUJDNzZERjYzQzExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzQ3NjAyRDVGMEI3MTFFQUE5MjBBQkM3NkRGNjNDMTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzQ3NjAyRDZGMEI3MTFFQUE5MjBBQkM3NkRGNjNDMTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ycaAPAAALdUlEQVR42tRbaWxU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';
      const icon4 = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1OTMzMkRFRjBCNzExRUFBOEIxRDI1MjQxMTlENkVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1OTMzMkRGRjBCNzExRUFBOEIxRDI1MjQxMTlENkVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTU5MzMyRENGMEI3MTFFQUE4QjFEMjUyNDExOUQ2RUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTU5MzMyRERGMEI3MTFFQUE4QjFEMjUyNDExOUQ2RUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4y+oYqAAALYElEQVR42tRbaWxU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';
      const myColor = ['#48a6d9', '#f25e7a', '#57bbca', '#566d86', '#48a6d9', '#f25e7a', '#57bbca', '#566d86'];
      const option = {
        // backgroundColor: '#fff',
        tooltip: {
          show: false,
        },
        grid: {
          top: '20%',
          left: '5%',
          right: '5%',
          bottom: '15%',
        },
        xAxis: {
          data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          // offset: 15,
          axisLine: {
            lineStyle: {
              color: '#3b5872',
              width: '5',
            },
          },
          axisTick: {
            alignWithLabel: true,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
            },
          },
          axisLabel: {
            textStyle: {
              fontSize: 20,
              fontWeight: '600',
              color(param, index) {
                return myColor[index];
              },
            },
          },
        },
        yAxis: {
          min: 0,
          max: 80,
          splitLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          axisTick: {
            lineStyle: {
              color: '#ccc',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ccc',
            },
          },
        },
        series: [{
          type: 'bar',
          z: 1,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(219, 219, 219,1)',
              }, {
                offset: 0.3,
                color: 'rgba(219, 219, 219,.3)',
              }, {
                offset: 1,
                color: 'rgba(219, 219, 219,.1)',
              }],
              global: false,
            },
          },
          barWidth: '40',
          data: [43, 40, 60, 50, 60, 40, 50, 60],
        },
        {
          name: '',
          type: 'effectScatter',
          rippleEffect: {
            period: 1,
            scale: 2,
            brushType: 'fill',
          },
          z: 2,
          symbolPosition: 'end',
          symbolSize: 40.6,
          symbolOffset: ['0', '0'],
          itemStyle: {
            normal: {
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 5,
              shadowOffsetY: 3,
              shadowOffsetX: 0,
              color(params) {
                const colorList = ['#57bbca', '#f25e7a', '#48a6d9', '#566d86', '#57bbca', '#f25e7a', '#48a6d9', '#566d86'];
                return colorList[params.dataIndex];
              },
              label: {
                show: true,
                fontSize: 24,
                position: 'top',
                distance: -80,
                formatter: '{c}',
                fontWeight: '600',
              },
            },
          },
          data: [{
            value: 43,
            symbol: icon1,
          }, {
            value: 40,
            symbol: icon2,
          }, {
            value: 60,
            symbol: icon3,
          }, {
            value: 50,
            symbol: icon4,
          }, {
            value: 60,
            symbol: icon1,
          }, {
            value: 40,
            symbol: icon2,
          }, {
            value: 50,
            symbol: icon3,
          }, {
            value: 60,
            symbol: icon4,
          }],
        },
        {
          name: 'A',
          type: 'line',
          z: 1,
          // symbol: 'roundRect',
          lineStyle: {
            normal: {
              width: 2,
              color: '#fff',
            },
          },
          symbolSize: [0, 0],
          data: [43, 40, 60, 50, 60, 40, 50, 60],
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
