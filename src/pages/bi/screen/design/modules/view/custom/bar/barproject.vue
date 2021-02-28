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
      const option = {
        backgroundColor: '#fff',
        title: {
          text: '项目工期',
          padding: 20,
          textStyle: {
            fontSize: 17,
            fontWeight: 'bolder',
            color: '#333',
          },
          subtextStyle: {
            fontSize: 13,
            fontWeight: 'bolder',
          },
        },
        legend: {
          data: ['计划工期', '可行性研究阶段', '初步设计阶段', '施工图设计阶段', '项目实施阶段', '项目验收阶段'],
          align: 'right',
          right: 80,
          top: 50,
        },
        grid: {
          containLabel: true,
          show: false,
          right: 130,
          left: 40,
          bottom: 40,
          top: 90,
        },
        xAxis: {
          type: 'time',
          axisLabel: {
            show: true,
            interval: 0,
          },
        },
        yAxis: {
          axisLabel: {
            show: true,
            interval: 0,
            formatter(value) {
              let last = '';
              const max = 5;
              const len = value.length;
              const hang = Math.ceil(len / max);
              if (hang > 1) {
                for (let i = 0; i < hang; i += 1) {
                  const start = i * max;
                  const end = start + max;
                  const temp = `${value.substring(start, end)}\n`;
                  last += temp; // 凭借最终的字符串
                }
                return last;
              }
              return value;
            },
          },
          data: ['第一个任务', '第二个任务', '第三个任务'],
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            let res = '';
            let name = '';
            let start0 = '';
            let start = '';
            let end0 = '';
            let end = '';
            Object.keys(params).forEach((i) => {
              const k = i % 2;
              if (!k) { // 偶数
                start0 = params[i].data;
                start = `${start0.getFullYear()}-${start0.getMonth() + 1}-${start0.getDate()}`;
              }
              if (k) { // 奇数
                name = params[i].seriesName;
                end0 = params[i].data;
                end = `${end0.getFullYear()}-${end0.getMonth() + 1}-${end0.getDate()}`;
                res += `${name} : ${end}~${start}</br>`;
              }
            });
            return res;
          },
        },
        series: [{
          name: '计划工期',
          type: 'bar',
          stack: '总量0',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter(params) {
                return params.seriesName;
              },
            },
          },
          itemStyle: {
            normal: {
              color: 'skyblue',
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
          zlevel: -1,
          data: [
            new Date('2020-05-01'),
            new Date('2020-03-14'),
            new Date('2020-05-01')],
        },
        {
          name: '计划工期',
          type: 'bar',
          stack: '总量0',
          itemStyle: {
            normal: {
              color: 'white',
            },
          },
          zlevel: -1,
          z: 3,
          data: [
            new Date('2020-01-01'),
            new Date('2020-01-01'),
            new Date('2020-03-15')],
        },
        {
          name: '可行性研究阶段',
          type: 'bar',
          stack: '总量2',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter(params) {
                return params.seriesName;
              },
            },
          },
          itemStyle: {
            normal: {
              color: 'green',
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
          zlevel: -1,
          data: [
            new Date('2020-01-10'),
            new Date('2020-01-10'),
            new Date('2020-03-30')],
        },
        {
          name: '可行性研究阶段',
          type: 'bar',
          stack: '总量2',
          itemStyle: {
            normal: {
              color: 'white',
            },
          },
          zlevel: -1,
          z: 3,
          data: [
            new Date('2020-01-02'),
            new Date('2020-01-02'),
            new Date('2020-03-16')],
        },
        {
          name: '初步设计阶段',
          type: 'bar',
          stack: '总量3',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter(params) {
                return params.seriesName;
              },
            },
          },
          itemStyle: {
            normal: {
              color: 'red',
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
          zlevel: -1,
          data: [
            new Date('2020-02-20'),
            new Date('2020-01-20'),
            new Date('2020-04-10')],
        },
        {
          name: '初步设计阶段',
          type: 'bar',
          stack: '总量3',
          itemStyle: {
            normal: {
              color: 'white',
            },
          },
          zlevel: -1,
          z: 3,
          data: [
            new Date('2020-02-01'),
            new Date('2020-01-12'),
            new Date('2020-04-01')],
        },
        {
          name: '施工图设计阶段',
          type: 'bar',
          stack: '总量4',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter(params) {
                return params.seriesName;
              },
            },
          },
          itemStyle: {
            normal: {
              color: 'brown',
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
          zlevel: -1,
          data: [
            new Date('2020-03-09'),
            new Date('2020-01-25'),
            new Date('2020-04-20')],
        },
        {
          name: '施工图设计阶段',
          type: 'bar',
          stack: '总量4',
          itemStyle: {
            normal: {
              color: 'white',
            },
          },
          zlevel: -1,
          z: 3,
          data: [
            new Date('2020-02-25'),
            new Date('2020-01-21'),
            new Date('2020-04-11')],
        },
        {
          name: '项目实施阶段',
          type: 'bar',
          stack: '总量5',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter(params) {
                return params.seriesName;
              },
            },
          },
          itemStyle: {
            normal: {
              color: 'yellow',
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
          zlevel: -1,
          data: [
            new Date('2020-03-12'),
            new Date('2020-02-15'),
            new Date('2020-04-30')],
        },
        {
          name: '项目实施阶段',
          type: 'bar',
          stack: '总量5',
          itemStyle: {
            normal: {
              color: 'white',
            },
          },
          zlevel: -1,
          z: 3,
          data: [
            new Date('2020-03-10'),
            new Date('2020-01-26'),
            new Date('2020-04-21')],
        },
        {
          name: '项目验收阶段',
          type: 'bar',
          stack: '总量6',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter(params) {
                return params.seriesName;
              },
            },
          },
          itemStyle: {
            normal: {
              color: 'orange',
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
          zlevel: -1,
          data: [
            new Date('2020-03-30'),
            new Date('2020-03-13'),
            new Date('2020-05-01')],
        },
        {
          name: '项目验收阶段',
          type: 'bar',
          stack: '总量6',
          itemStyle: {
            normal: {
              color: 'white',
            },
          },
          zlevel: -1,
          z: 3,
          data: [
            new Date('2020-03-15'),
            new Date('2020-02-16'),
            new Date('2020-04-30')],
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
