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
    colorMappingChange(value) {
      const levelOption = this.getLevelOption(value);
      echarts.setOption({
        series: [{
          levels: levelOption,
        }],
      });
    },
    getLevelOption() {
      return [
        {
          itemStyle: {
            borderColor: '#777',
            borderWidth: 0,
            gapWidth: 1,
          },
          upperLabel: {
            show: false,
          },
        },
        {
          itemStyle: {
            borderColor: '#555555',
            borderWidth: 3,
            gapWidth: 1,
          },
          emphasis: {
            itemStyle: {
              borderColor: '#ddd',
            },
          },
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            borderWidth: 2,
            gapWidth: 1,
            borderColorSaturation: 0.3,
          },
        },
      ];
    },
  },
  computed: {
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('mainChart'));
    const option = {
      title: {
        text: '楼层平面图',
        left: 'center',
      },
      tooltip: {
        formatter() {
          return '提示信息';
        },
      },

      color: ['#ffffff', '#ffffff'],

      series: [
        {
          name: '排号预览',
          type: 'treemap',
          visibleMin: 300,
          label: {
            show: true,
            color: '#000',
            formatter: '{b}',
          },
          upperLabel: {
            show: true,
            color: '#fff',
            height: 20,
          },
          itemStyle: {
            borderColor: '#fff',
          },
          levels: this.getLevelOption(),
          data: [{
            name: '轴网',
            value: 4,
            children: [{
              name: '直线轴网',
              value: 4,
            }, {
              name: '弧形轴网',
              value: 6,
            }, {
              name: '单根轴线',
              value: 6,
            }],
          }, {
            name: '柱',
            value: 3,
            children: [{
              name: '创建柱',
              value: 20,
            }, {
              name: '柱齐墙边',
              value: 6,
            }, {
              name: '墙齐柱边',
              value: 6,
            }],
          }, {
            name: '墙体',
            value: 10,
            children: [{
              name: '绘制墙体',
              value: 20,
            }, {
              name: '墙体倒角',
              value: 6,
            }, {
              name: '墙体连接',
              value: 6,
            }, {
              name: '墙体打断',
              value: 6,
            }, {
              name: '饰面创建',
              value: 6,
            }, {
              name: '墙体附着',
              value: 6,
            }, {
              name: '墙体分离',
              value: 6,
            }],
          }, {
            name: '幕墙',
            value: 7,
            children: [{
              name: '绘制幕墙',
              value: 20,
            }, {
              name: '幕墙网格',
              value: 6,
            }, {
              name: '幕墙竖梃',
              value: 6,
            }],
          }, {
            name: '女儿墙',
            value: 3,
            children: [{
              name: '绘制女儿墙',
              value: 20,
            }, {
              name: '编辑女儿墙',
              value: 6,
            }],
          }, {
            name: '门窗',
            value: 8,
            children: [{
              name: '插入门',
              value: 20,
            }, {
              name: '插入窗',
              value: 6,
            }, {
              name: '门窗翻转',
              value: 6,
            }, {
              name: '门窗编号',
              value: 6,
            }, {
              name: '常规门窗构件库',
              value: 6,
            }],
          }, {
            name: '楼板',
            value: 6,
            children: [{
              name: '绘制楼板',
              value: 20,
            }, {
              name: '楼板编辑',
              value: 6,
            }, {
              name: '楼板分割',
              value: 6,
            }, {
              name: '楼板合并',
              value: 6,
            }, {
              name: '楼板升降',
              value: 6,
            }],
          }, {
            name: '楼电梯',
            value: 3,
            children: [{
              name: '直段楼梯',
              value: 20,
            }, {
              name: '自由绘制',
              value: 6,
            }, {
              name: '剪刀楼梯',
              value: 6,
            }, {
              name: '双跑楼梯',
              value: 6,
            }, {
              name: '布置扶梯',
              value: 6,
            }, {
              name: '布置电梯间',
              value: 6,
            }],
          }],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style lang="stylus"></style>
