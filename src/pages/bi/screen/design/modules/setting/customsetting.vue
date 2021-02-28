<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">组件设置</div>
      <q-separator class="q-mb-sm" />
      <q-field filled dense ref="field" class="q-my-sm" prefix="选择组件：" @click="$refs.menu.toggle()">
        <template #control>{{cmpName}}</template>
        <template #append>
          <q-btn flat dense round icon="mdi-menu-down" @click="$refs.menu.toggle()" />
          <q-menu
            no-parent-event
            ref="menu"
            :target="$refs.field"
            anchor="top right"
            self="top right"
            :offset="[0, -40]"
            transition-show="flip-up"
            transition-hide="flip-down"
            content-style="min-width:278px"
          >
            <q-tree :nodes="cmpTreeNodes" node-key="label" :selected.sync="selected" />
          </q-menu>
        </template>
      </q-field>
      <span>组件配置：</span>
      <q-input
        dense
        filled
        type="textarea"
        v-model="config.config"
        class="q-my-sm"
        input-class="text-left"
      />
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'customsetting',
  components: {
  },
  data() {
    return {
      selected: {},
      expanded: [],
      cmpName: '',
      cmpTreeNodes: [
        {
          label: '柱状图',
          selectable: false,
          children: [
            { label: '假3D柱状图', value: 'bar3d' },
            { label: '3D柱状图', value: 'bar3dcolor' },
            { label: '3D柱状图透明', value: 'bar3dtran' },
            { label: '方柱', value: 'bar3dsqrt' },
            { label: '圆柱状图', value: 'barcircle' },
            { label: '圆柱状图2', value: 'barcircle2' },
            { label: '圆柱状图3', value: 'barcircle3' },
            { label: '圆柱状图4', value: 'barpictorial' },
            { label: '磁盘容量', value: 'bardoublecircle' },
            { label: '彩柱', value: 'barcolorful' },
            { label: '单柱', value: 'barone' },
            { label: '阴影柱', value: 'barshaddle' },
            { label: '双横柱', value: 'bardouble' },
            { label: '水平柱', value: 'barhorizontal' },
            { label: '渐变柱', value: 'barinfographic' },
            { label: '柱线', value: 'barline' },
            { label: '方柱顶圆点', value: 'barsquare' },
            { label: '曲顶柱状图', value: 'pictorialbar' },
            { label: '排名柱状图', value: 'barsort' },
            { label: '电池柱', value: 'barbattery' },
            { label: '电池柱2', value: 'barbattery2' },
            { label: '分组柱', value: 'bargroup' },
            { label: '项目工期', value: 'barproject' },
          ],
        },
        {
          label: '饼状图',
          selectable: false,
          children: [
            { label: '3D饼图', value: 'pie3d' },
            { label: '好看饼图', value: 'piecolor' },
            { label: '双环图', value: 'piedouble' },
            { label: '四环', value: 'piefour' },
            { label: '五环', value: 'piefive' },
            { label: '六环', value: 'piesix' },
            { label: '内外环', value: 'piegroup' },
            { label: '普通环图', value: 'pienormal' },
            { label: '滚动球', value: 'pierunning' },
            { label: '滚动环', value: 'gaugerunning' },
            { label: '双环星图', value: 'piestar' },
            { label: '三个百分比', value: 'piethree' },
            { label: '三个百分比2', value: 'piethree2' },
            { label: '两个百分比', value: 'pietwo' },
            { label: '进度', value: 'pieprocess' },
            { label: '进度黄色', value: 'pieyellow' },
            { label: '饼图发散', value: 'piefan' },
            { label: '占比', value: 'piepercent' },
            { label: '花瓣图', value: 'pieflower' },
            { label: '饼图阴影', value: 'pieshadow' },
          ],
        },
        {
          label: '散点图',
          selectable: false,
          children: [
            { label: '普通散点图', value: 'scattercommon' },
            { label: '散点3D', value: 'scatter3d' },
            { label: '散点环形', value: 'scattercircle' },
          ],
        },
        {
          label: '折线图',
          selectable: false,
          children: [
            { label: '区间线', value: 'linerange' },
            { label: '线点图', value: 'linepoint' },
            { label: '3D折线图', value: 'customline3d' },
            { label: '3D风向', value: 'customwind3d' },
            { label: '地铁图', value: 'subway' },
          ],
        },
        {
          label: '地图',
          selectable: false,
          children: [
            { label: '飞机', value: 'customplane' },
            { label: '流量图', value: 'custommapll' },
            { label: '迁徙地图', value: 'mapmove' },
            { label: '北京地图', value: 'mapbeijing' },
            { label: '江苏地图', value: 'mapjs' },
            { label: '山东地图', value: 'mapshandong' },
          ],
        },
        {
          label: '热力图',
          selectable: false,
          children: [
            { label: '热力周', value: 'customheatweek' },
            { label: '热力年', value: 'customheatyear' },
          ],
        },
        {
          label: '自定义图形',
          selectable: false,
          children: [
            { label: '老鼠', value: 'mouse' },
            { label: '温度', value: 'temperature' },
            { label: '报表', value: 'graphtable' },
          ],
        },
        {
          label: '词云图',
          selectable: false,
          children: [
            { label: '词云', value: 'wordcloud' },
          ],
        },
        {
          label: '桑基图',
          selectable: false,
          children: [
            { label: '桑基图', value: 'sankeycom' },
          ],
        },
        {
          label: '关系图',
          selectable: false,
          children: [
            { label: '数据流向', value: 'relationline' },
            { label: '拓扑图', value: 'structure' },
            { label: '关系云', value: 'cloud' },
            { label: '链路拓扑图', value: 'linker' },
            { label: '流程图', value: 'flow' },
          ],
        },
      ],
      cmpMap: {},
    };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  methods: {
  },
  computed: {
  },
  watch: {
    selected: {
      handler(n, o) {
        if (n !== o) {
          this.config.cmpName = this.cmpMap[n];
          this.config.needResize = false;
        }
      },
    },
  },
  mounted() {
    this.cmpTreeNodes.forEach((parent) => {
      if (parent.children.length > 0) {
        parent.children.forEach((child) => {
          this.cmpMap[child.label] = child.value;
          if (this.config.cmpName === child.value) {
            this.cmpName = child.label;
          }
        });
      }
    });
  },
};
</script>

<style lang="stylus" scoped></style>
