<template>
  <q-page class="cc-admin column q-pa-sm">
    <div class="col column bg-white shadow-2">
      <div id="mainChart" class="col"></div>
    </div>
  </q-page>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'Demo14',
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
    const passRate = 70;
    const average = 60;
    const total = 100;
    const option = {
      tooltip: {
        show: false,
        trigger: 'item',
        formatter: '{a} : {c} ({d}%)',
      },
      //  color: ['#85b6b2', '#6d4f8d'],
      color: ['rgb(255,159,127)', 'rgb(50,197,233)'],
      legend: {
        orient: 'vertical',
        x: '35%',
        top: '27%',
        itemHeight: 10, // 图例的高度
        itemGap: 8, // 图例之间的间距
        data: [`通过率${passRate}%`, `平均值${average}%`],
        // 图例的名字需要和饼图的name一致，才会显示图例
      },
      series: [
        {
          name: `通过率${passRate}%`,
          type: 'pie',
          radius: ['40%', '45%'],
          // 环的位置
          label: {
            show: false,
            position: 'center',
            // normal: { // 显示的位置
            //     position: 'inner'
            // }
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          data: [
            {
              value: passRate, // 需要显示的数据
              name: `通过率${passRate}%`,
              itemStyle: {
                normal: {
                  color: 'rgb(255,159,127)',
                },
              },
            },
            {
              value: total - passRate,
              // 不需要显示的数据，颜色设置成和背景一样
              itemStyle: {
                normal: {
                  color: 'transparent',
                },
              },
            },
          ],
        },
        {
          name: `平均值${average}%`,
          type: 'pie',
          radius: ['30%', '35%'],
          label: {
            show: false,
            position: 'center',
            // normal: {
            //     position: 'inner'
            // }
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          data: [
            {
              name: `平均值${average}%`,
              value: average,
              itemStyle: {
                normal: {
                  color: 'rgb(50,197,233)',
                },
              },
            },
            {
              value: total - average,
              itemStyle: {
                normal: {
                  color: 'transparent',
                },
              },
            },
          ],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style lang="stylus"></style>
