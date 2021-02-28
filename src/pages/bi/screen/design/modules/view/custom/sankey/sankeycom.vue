<template>
  <div ref="chart"  :style="chartStyle">
  </div>
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
      // 桑基图数据格式要求如下↓，nodes中的节点需要和links互相对应，node表示图
      // 上的节点，link对应节点间的关系，如需自定义节点颜色需要在数据中单独设置
      // 否则只能设置某层节点的颜色，由于link连线中只有source和target两个节点关系
      // 所以鼠标滑过高亮从第一层到最后一层的节点需求无法实现，在level中可以单独
      // 设置某个层级的样式

      // tips：修改代码的话请点击上方↑克隆，莫要在我的版本基础上再改动了哈

      const nodes = [{
        name: '一层节点1',
        itemStyle: {
          color: '#6FA8F7',
        },
      },
      {
        name: '二层节点1',
        itemStyle: {
          color: '#5ECC8F',
        },
      },
      {
        name: '二层节点2',
        itemStyle: {
          color: '#FCC600',
        },
      },
      {
        name: '三层节点1',
        itemStyle: {
          color: '#00BCD4',
        },
      },
      {
        name: '三层节点2',
        itemStyle: {
          color: '#5B6DD1',
        },
      },
      {
        name: '四层节点1',
        itemStyle: {
          color: '#F27E7E',
        },
      },
      {
        name: '四层节点2',
        itemStyle: {
          color: '#93E1ED',
        },
      },
      {
        name: '四层节点3',
        itemStyle: {
          color: '#FFE056',
        },
      },
      {
        name: '四层节点4',
        itemStyle: {
          color: '#CB8762',
        },
      },
      {
        name: '四层节点5',
        itemStyle: {
          color: '#ADD76F',
        },
      },
      {
        name: '四层节点6',
        itemStyle: {
          color: '#6992C3',
        },
      },
      {
        name: '四层节点7',
        itemStyle: {
          color: '#897CBD',
        },
      },
      {
        name: '四层节点8',
        itemStyle: {
          color: '#F27EB2',
        },
      },
      {
        name: '四层节点9',
        itemStyle: {
          color: '#84D6B9',
        },
      },
      {
        name: '四层节点10',
        itemStyle: {
          color: '#AC78CD',
        },
      },
      ];
      const links = [{
        source: '一层节点1',
        target: '二层节点1',
        value: 10,
      },
      {
        source: '一层节点1',
        target: '二层节点2',
        value: 10,
      },
      {
        source: '二层节点1',
        target: '三层节点1',
        value: 5,
      },
      {
        source: '二层节点1',
        target: '三层节点2',
        value: 5,
      },
      {
        source: '二层节点2',
        target: '三层节点1',
        value: 5,
      },
      {
        source: '二层节点2',
        target: '三层节点2',
        value: 5,
      },
      {
        source: '三层节点1',
        target: '四层节点1',
        value: 2,
      },
      {
        source: '三层节点1',
        target: '四层节点2',
        value: 2,
      },
      {
        source: '三层节点1',
        target: '四层节点3',
        value: 2,
      },
      {
        source: '三层节点1',
        target: '四层节点4',
        value: 2,
      },
      {
        source: '三层节点1',
        target: '四层节点5',
        value: 2,
      },
      {
        source: '三层节点2',
        target: '四层节点6',
        value: 2,
      },
      {
        source: '三层节点2',
        target: '四层节点7',
        value: 2,
      },
      {
        source: '三层节点2',
        target: '四层节点8',
        value: 2,
      },
      {
        source: '三层节点2',
        target: '四层节点9',
        value: 2,
      },
      {
        source: '三层节点2',
        target: '四层节点10',
        value: 2,
      },
      ];
      const option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
        },
        series: {
          type: 'sankey',
          layout: 'none',
          top: 50,
          left: '3%',
          right: '12%',
          nodeGap: 14,
          layoutIterations: 0, // 自动优化列表，尽量减少线的交叉，为0就是按照数据排列
          data: nodes, // 节点
          links, // 节点之间的连线
          draggable: false,
          focusNodeAdjacency: 'allEdges', // 鼠标划上时高亮的节点和连线，allEdges表示鼠标划到节点上点亮节点上的连线及连线对应的节点
          // tooltip: {
          //   formatter: function(params) {
          //     if (params.data.source) {
          //       return `${params.data.source}：${params.data.value}`;
          //     } else {
          //       return `${params.name}：${params.value}`;
          //     }
          //   }
          // },
          levels: [{
            depth: 0,
            itemStyle: {
              color: '#F27E7E',
            },
            lineStyle: {
              color: 'source',
              opacity: 0.2,
            },
          },
          {
            depth: 1,
            lineStyle: {
              color: 'source',
              opacity: 0.2,
            },
          },
          {
            depth: 2,
            lineStyle: {
              color: 'source',
              opacity: 0.2,
            },
          },
          {
            depth: 3,
            label: {
              fontSize: 12,
            },
          },
          ],
          label: {
            fontSize: 14,
            color: '#666',
          },
          itemStyle: {
            normal: {
              borderWidth: 0,
            },
          },
        },
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
