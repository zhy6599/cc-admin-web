<template>
  <div class="row">
    <div class="col">
      <div id="mainAmount" :style="{height:'300px'}"></div>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-list style="width: 350px">
        <q-item-label class="text-h6 q-mb-md">门店销售排行榜</q-item-label>
        <q-item v-for="shop in shopList" :key="shop.name" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar size="xs" :color="shop.color" text-color="white" >{{shop.order}}</q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{shop.name}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            {{shop.amount}}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'MiniArea',
  data() {
    return {
      xData: [],
      yData: [],
      shopList: [],
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
    for (let i = 1; i < 5; i += 1) {
      let color = 'black';
      if (i > 3) {
        color = 'grey-7';
      }
      this.shopList.push({
        order: i,
        name: `肥肥串${i}号店`,
        color,
        amount: (18.6 - i - Math.random() * 1).toFixed(1),
      });
    }
    const mainAmountChart = echarts.init(document.getElementById('mainAmount'));
    const colors = ['#5793f3', '#d14a61', '#675bba'];
    const option = {
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: [],
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
      ],
      yAxis: [
        {
          axisLine: { // y轴
            show: false,
          },
          type: 'value',
          name: '销售额',
          min: 0,
          position: 'left',
          axisLabel: {
            formatter: '{value}万元',
          },
        },
      ],
      series: [
        {
          name: '销售额',
          type: 'bar',
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        },
      ],
    };
    mainAmountChart.setOption(option);
  },
};
</script>

<style >
</style>
