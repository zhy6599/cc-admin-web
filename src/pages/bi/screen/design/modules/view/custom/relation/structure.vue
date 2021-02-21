<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'structure',
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
      // 节点图标
      const appSymbol = 'path://M960 42.666667H64c-12.8 0-21.333333 8.533333-21.333333 21.333333v896c0 12.8 8.533333 21.333333 21.333333 21.333333h896c12.8 0 21.333333-8.533333 21.333333-21.333333V64c0-12.8-8.533333-21.333333-21.333333-21.333333z m-21.333333 896H85.333333V682.666667h853.333334v256z m0-298.666667H85.333333V384h853.333334v256z m0-298.666667H85.333333V85.333333h853.333334v256zM298.666667 768h-42.666667v85.333333h42.666667v-85.333333z m-85.333334 0H170.666667v85.333333h42.666666v-85.333333z m661.333334 21.333333h-170.666667v42.666667h170.666667v-42.666667zM298.666667 469.333333h-42.666667v85.333334h42.666667v-85.333334z m-85.333334 0H170.666667v85.333334h42.666666v-85.333334z m661.333334 21.333334h-170.666667v42.666666h170.666667v-42.666666zM298.666667 170.666667h-42.666667v85.333333h42.666667V170.666667z m-85.333334 0H170.666667v85.333333h42.666666V170.666667z m661.333334 21.333333h-170.666667v42.666667h170.666667V192z';
      const masterSymbol = 'path://M1172.985723 682.049233l-97.748643-35.516964a32.583215 32.583215 0 0 0-21.830134 61.582735l25.7398 9.123221-488.744218 238.181638L115.670112 741.349163l47.245961-19.223356a32.583215 32.583215 0 0 0-22.808051-60.604819l-119.579777 47.896905a32.583215 32.583215 0 0 0 0 59.952875l557.820313 251.540496a32.583215 32.583215 0 0 0 27.695632 0l570.527227-278.584184a32.583215 32.583215 0 0 0-3.258721-59.952875z,M1185.041693 482.966252l-191.587622-68.749123a32.583215 32.583215 0 1 0-21.831133 61.254764l118.927833 43.010323-488.744218 237.855666-471.474695-213.744727 116.973-47.244961a32.583215 32.583215 0 1 0-24.111938-60.604819l-190.609705 75.593537a32.583215 32.583215 0 0 0-20.528246 29.650465 32.583215 32.583215 0 0 0 20.528246 30.30141l557.819313 251.866468a32.583215 32.583215 0 0 0 27.695632 0l570.201254-278.584184a32.583215 32.583215 0 0 0 18.24744-30.953354 32.583215 32.583215 0 0 0-21.505161-29.651465z,M32.583215 290.075742l557.819313 251.540496a32.583215 32.583215 0 0 0 27.695632 0l570.201254-278.584184a32.583215 32.583215 0 0 0-3.257721-59.952875L626.244463 2.042365a32.583215 32.583215 0 0 0-23.134022 0l-570.527226 228.080502a32.583215 32.583215 0 0 0-19.224357 30.627382 32.583215 32.583215 0 0 0 19.224357 29.325493zM615.817355 67.534767l474.733416 170.408432-488.744218 238.180638-471.474695-215.372588z';
      const slaveSymbol = 'path://M600.255321 133.164178c120.213708 0 219.218733 68.021482 232.313549 155.527628h21.531936c-6.225171-97.884819-117.4874-175.858037-253.843452-175.858037S352.637041 190.806986 346.411869 288.691806h21.529903c13.094816-87.506146 112.099841-155.527628 232.313549-155.527628z,M600.255321 436.760206c-120.213708 0-219.218733-68.021482-232.313549-155.527627H346.409836c6.225171 97.884819 117.4874 175.858037 253.843452 175.858036s247.620314-77.973217 253.843452-175.858036h-21.531936c-13.09075 87.504113-112.095775 155.527628-232.309483 155.527627z,M346.125211 741.541498c0 101.900075 113.7771 184.508626 254.13011 184.508625 140.350978 0 254.130111-82.60855 254.130111-184.508625v-444.199103c0-2.901149-0.103685-5.784001-0.286659-8.650589h-21.531936c0.971794 6.4854 1.486153 13.076519 1.486153 19.757091v421.988131c0 96.803242-104.675176 175.282686-233.799702 175.282686s-233.799702-78.479444-233.799701-175.282686V308.448897c0-6.680572 0.516392-13.269658 1.486152-19.757091h-21.529903a135.835594 135.835594 0 0 0-0.286658 8.650589v444.199103z';
      // const proxySymbol = 'path://M936.33 732.203c-9.872-10.814-23.349-17.123-37.953-17.778-14.849-0.451-28.613 4.383-39.427 14.255-0.215 0.195-0.282 0.476-0.492 0.673l-144.256-83.448c0.625-2.939 1.994-5.635 2.133-8.697 0.676-14.624-4.383-28.634-14.255-39.448-20.379-22.284-55.096-23.841-77.401-3.523-22.305 20.4-23.882 55.096-3.502 77.421 7.932 8.707 18.534 13.533 29.878 15.799l17.069 160.864c-5.049 2.466-10.138 4.9-14.422 8.82-23.964 21.875-25.643 59.192-3.769 83.156 11.593 12.699 27.507 19.13 43.483 19.13 14.173 0 28.408-5.08 39.673-15.361 11.613-10.61 18.393-25.111 19.109-40.8 0.264-5.807-1.162-11.301-2.527-16.782l114.101-74.264c8.695 6.485 18.549 11.122 29.627 11.618 0.86 0.041 1.7 0.082 2.56 0.082 13.682 0 26.688-5.039 36.867-14.337 22.307-20.359 23.863-55.096 3.504-77.38z m-92.616 24.03c-2.588 10.576-2.855 21.552 0.968 31.893l-109.7 71.397c-9.88-10.018-22.696-16.007-36.719-17.202l-16.624-156.665a54.739 54.739 0 0 0 16.898-10.515c0.637-0.579 0.891-1.421 1.498-2.025l143.679 83.117z m-206.233-122.63c0.287-6.431 3.072-12.412 7.824-16.754a24.194 24.194 0 0 1 16.304-6.308c6.575 0 13.108 2.663 17.86 7.865 4.342 4.752 6.575 10.937 6.288 17.41-0.287 6.431-3.072 12.371-7.824 16.713h-0.021c-4.793 4.342-11.081 6.964-17.409 6.308-6.431-0.287-12.371-3.072-16.713-7.824-4.364-4.752-6.596-10.937-6.309-17.41z m74.963 287.851c-11.47 10.528-29.432 9.708-39.898-1.802-10.487-11.511-9.688-29.412 1.802-39.898 5.243-4.793 11.961-7.414 19.028-7.414 0.43 0 0.86 0.041 1.29 0.041 7.537 0.328 14.501 3.605 19.581 9.176 5.1 5.571 7.701 12.781 7.353 20.318-0.328 7.536-3.585 14.5-9.156 19.579z m199.738-134.483c-4.772 4.342-10.61 6.185-17.389 6.308-6.452-0.328-12.391-3.113-16.754-7.865-8.971-9.831-8.275-25.152 1.557-34.123a24.057 24.057 0 0 1 16.263-6.308c6.554 0 13.108 2.663 17.86 7.865 4.363 4.752 6.595 10.937 6.308 17.369-0.287 6.472-3.072 12.412-7.845 16.754z,M151.81 219.064v18.751c65.713 49.346 192.006 82.731 337.007 82.731s271.291-33.385 337.005-82.731v-18.751c-57.667 50.36-186.873 85.432-337.005 85.432-150.134 0-279.341-35.072-337.007-85.432zM488.817 63.779c-221.567 0-401.197 71.858-401.197 160.48V721.72h2.025c20.146 81.105 191.141 144.432 399.172 144.432 24.529 0 32.095-2.058 55.411-3.746l0.023-31.962c-23.252 1.598-30.838 3.61-55.434 3.61-203.85 0-369.102-57.477-369.102-128.382V608.14c61.194 57.349 203.387 97.532 369.102 97.532 20.51 0 40.664-0.614 60.344-1.802l1.249-32.051a1057.38 1057.38 0 0 1-61.594 1.779c-203.85 0-369.102-57.477-369.102-128.382v-97.555c61.194 57.349 203.387 97.555 369.102 97.555s307.908-40.206 369.079-97.555v175.217l32.095-0.545V224.259c0.001-88.622-179.609-160.48-401.173-160.48z m369.079 320.957c0 70.908-165.229 128.382-369.079 128.382s-369.102-57.474-369.102-128.382v-97.555c61.194 57.352 203.387 97.555 369.102 97.555s307.908-40.203 369.079-97.555v97.555z m-369.079-32.095c-203.85 0-369.102-57.477-369.102-128.382 0-70.908 165.252-128.385 369.102-128.385s369.079 57.477 369.079 128.385c0 70.905-165.229 128.382-369.079 128.382z';
      // -- 断开异常图标
      const errorEffectSymbol = 'path://M671.830688 511.699001l319.059377-319.059377c43.945914-43.945914 43.945914-115.583774 0-159.529688-43.945914-43.945914-115.583774-43.945914-159.529688 0l-319.059377 319.059377-319.059377-319.059377c-43.945914-43.945914-115.583774-43.945914-159.529688 0-43.945914 43.945914-43.945914 115.583774 0 159.529688l319.059377 319.059377-319.059377 319.059377c-43.945914 43.945914-43.945914 115.583774 0 159.529688 43.945914 43.945914 115.583774 43.945914 159.529688 0l319.059377-319.059377 319.059377 319.059377c43.945914 43.945914 115.583774 43.945914 159.529688 0 43.945914-43.945914 43.945914-115.583774 0-159.529688L671.830688 511.699001z';
      // 节点数据
      const nodeDataList = [{
        name: '块1-1', // 节点名
        linkTargetName: '节点B', // 连线目标节点
        linkValue: ' ', // 连线介绍
        coordConfig: {
          level: '0-error',
          effect: {
            show: true,
            smooth: false,
            trailLength: 0,
            symbol: errorEffectSymbol,
            color: '#fb3f3f',
            symbolSize: 10,
            period: 3,
            delay: 1500,
            loop: true,
          },
          lineStyle: {
            normal: {
              curveness: 0,
              color: '#fb3f3f',
              width: 1.4,
            },
          },
        }, // 连线动态箭头配置，没有就不需要此配置
        value: [10, 190],
        draggable: false,
        fixed: true,
        symbol: slaveSymbol,
        symbolSize: 40,
        itemStyle: {
          color: '#fb3f3f',
        },
      },
      {
        name: '块1-2',
        linkTargetName: '节点B',
        linkValue: ' ',
        coordConfig: {
          level: '0',
        },
        value: [10, 150],
        draggable: false,
        fixed: true,
        symbol: slaveSymbol,
        symbolSize: 40,
      }, {
        name: '块2',
        linkTargetName: '节点C',
        linkValue: ' ',
        coordConfig: {
          level: '0',
        },
        value: [10, 100],
        draggable: false,
        fixed: true,
        symbol: slaveSymbol,
        symbolSize: 40,
      }, {
        name: '块3',
        linkTargetName: '节点D',
        linkValue: ' ',
        coordConfig: {
          level: '0',
        },
        value: [10, 40],
        draggable: false,
        symbol: slaveSymbol,
        symbolSize: 40,
      },
      // 节点B,C,D ....n
      {
        name: '节点B',
        linkTargetName: '应用端',
        linkValue: ' ',
        coordConfig: {
          level: '1',
        },
        symbol: masterSymbol,
        symbolSize: 50,
        draggable: false,
        value: [220, 160],
      }, {
        name: '节点C',
        linkTargetName: '应用端',
        linkValue: ' ',
        coordConfig: {
          level: '1',
        },
        symbol: masterSymbol,
        symbolSize: 60,
        draggable: false,
        value: [220, 100],
      }, {
        name: '节点D',
        linkTargetName: '应用端',
        linkValue: ' ',
        coordConfig: {
          level: '1',
        },
        symbol: masterSymbol,
        symbolSize: 60,
        draggable: false,
        value: [220, 40],
      }, {
        name: '应用端',
        linkTargetName: '应用端',
        linkValue: ' ',
        // coordConfig: {level: 2},
        symbolSize: 60,
        symbol: appSymbol,
        draggable: false,
        value: [400, 100],
      },
      ];

      const getCoordDataList = function getCoordDataList() {
        const coorDataDict = {};
        const defaultConfig = {
          type: 'lines', // 块1,2...n到节点A,B...N
          coordinateSystem: 'cartesian2d',
          // animationDelay: 10000,
          z: 1,
          effect: {
            show: true,
            smooth: true,
            trailLength: 0,
            symbol: 'arrow',
            color: '#67c23a',
            symbolSize: 10,
            period: 3,
            delay: 1500,
            loop: true,
          },
          lineStyle: {
            normal: {
              curveness: 0,
              color: '#67c23a',
              width: 1,
            },
          },
          data: [],
        };
        nodeDataList.map((item) => {
          if (item.coordConfig !== undefined) {
            if (!(item.coordConfig.level in coorDataDict)) {
              const coorConfig = JSON.parse(JSON.stringify(defaultConfig));
              if (item.coordConfig.lineStyle !== undefined) {
                coorConfig.lineStyle = item.coordConfig.lineStyle;
              }
              if (item.coordConfig.effect !== undefined) {
                coorConfig.effect = item.coordConfig.effect;
              }
              coorDataDict[item.coordConfig.level] = coorConfig;
            }

            const coordData = [
              item.value,
              nodeDataList.filter((i) => i.name === item.linkTargetName)[0].value,
            ];
            coorDataDict[item.coordConfig.level].data.push({
              coords: coordData,
            });
            if (item.coordConfig.bilateral) {
              coorDataDict[item.coordConfig.level].data.push({
                coords: coordData.reverse(),
              });
            }
          }
          return '';
        });
        return Object.values(coorDataDict);
      };

      return {
        title: {
          text: 'MySQL应用架构拓扑图',
          top: 'top',
          left: 'center',
        },
        itemStyle: {
          normal: {
            color: '#67C23A',
          },
          shadowBlur: 0,
        },
        textStyle: {
          color: '#444',
          fontSize: 16,
          fontWeight: 600,
        },
        legend: [{
          formatter(name) {
            return echarts.format.truncateText(name, 200, '12px', '…');
          },
          tooltip: {
            show: true,
          },
          selectedMode: 'false',
          bottom: 20,
        }],
        animationDuration: 500,
        animationEasingUpdate: 'quinticInOut',
        xAxis: {
          show: false,
          type: 'value',
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        series: [{
          type: 'graph',
          coordinateSystem: 'cartesian2d',
          legendHoverLink: false,
          hoverAnimation: true,
          nodeScaleRatio: false,
          // 建头
          edgeSymbol: ['circle', 'none'],
          edgeSymbolSize: [2, 15],
          edgeLabel: {
            show: false,
            normal: {
              show: true,
              position: 'middle',
              textStyle: {
                fontSize: 12,
              },
              formatter: '{c}',
            },
          },
          focusNodeAdjacency: true,
          roam: false,
          // 圆形上面的文字
          label: {
            normal: {
              position: 'bottom',
              show: true,
              textStyle: {
                fontSize: 12,
              },
            },
          },
          itemStyle: {
            normal: {
              color: '#409eff',
            },
            shadowBlur: 0,
          },
          lineStyle: {
            normal: {
              width: 0,
              shadowColor: 'none',
              color: '#ff0000',
            },
          },
          data: nodeDataList,

          links: nodeDataList.map((item) => ({
            source: item.name,
            value: item.linkValue,
            target: item.targetName,
          })),
        }].concat(getCoordDataList()),
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

<style scoped lang="stylus">

</style>
