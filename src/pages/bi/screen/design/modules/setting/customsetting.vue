<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">组件设置</div>
      <q-separator class="q-mb-sm" />
      <q-field filled dense ref="field" class="q-my-sm" prefix="选择组件：">
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
            <q-tree
              ref="tree"
              :nodes="cmpTreeNodes"
              node-key="value"
              label-key="label"
              :selected.sync="selected"
              default-expand-all
            />
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
      cmpName: '',
      cmpTreeNodes: [
        {
          label: '柱状图',
          children: [
            { label: '假3D柱状图', value: 'bar3d' },
            { label: '3D柱状图', value: 'bar3dcolor' },
            { label: '3D柱状图透明', value: 'bar3dtran' },
            { label: '圆柱状图', value: 'barcircle' },
            { label: '双横柱', value: 'bardouble' },
            { label: '水平柱', value: 'barhorizontal' },
            { label: '渐变柱', value: 'barinfographic' },
            { label: '柱线', value: 'barline' },
            { label: '方柱顶圆点', value: 'barsquare' },
            { label: '曲顶柱状图', value: 'pictorialbar' },
          ],
        },
        {
          label: '饼状图',
          children: [
            { label: '3D饼图', value: 'pie3d' },
            { label: '好看饼图', value: 'piecolor' },
            { label: '双环图', value: 'piedouble' },
            { label: '五环', value: 'piefive' },
            { label: '内外环', value: 'piegroup' },
            { label: '普通环图', value: 'pienormal' },
            { label: '滚动球', value: 'pierunning' },
            { label: '滚动环', value: 'gaugerunning' },
            { label: '双环星图', value: 'piestar' },
          ],
        },
        {
          label: '散点图',
          children: [
            { label: '普通散点图', value: 'scattercommon' },
            { label: '散点3D', value: 'scatter3d' },
          ],
        },
        {
          label: '折线图',
          children: [
            { label: '3D折线图', value: 'customline3d' },
            { label: '3D风向', value: 'customwind3d' },
            { label: '地铁图', value: 'subway' },
          ],
        },
        {
          label: '地图',
          children: [
            { label: '飞机', value: 'customplane' },
            { label: '流量图', value: 'custommapll' },
          ],
        },
        {
          label: '热力图',
          children: [
            { label: '热力周', value: 'customheatweek' },
            { label: '热力年', value: 'customheatyear' },
          ],
        },
        {
          label: '词云图',
          children: [
            { label: '词云', value: 'wordcloud' },
          ],
        },
        {
          label: '关系图',
          children: [
            { label: '数据流向', value: 'relationline' },
            { label: '拓扑图', value: 'structure' },
          ],
        },
      ],
    };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getCmpName(children) {
      let name = '';
      if (this.config.cmpName) {
        children.forEach((element) => {
          if (element.value === this.config.cmpName) {
            name = element.label;
          }
          if (element.children && element.children.length > 0) {
            const tmp = this.getCmpName(element.children);
            if (tmp) {
              name = tmp;
            }
          }
        });
      }
      return name;
    },
  },
  computed: {
    selected: {
      get() {
        return this.config.cmpName;
      },
      set(id) {
        this.config.cmpName = id;
        this.cmpName = this.getCmpName(this.cmpTreeNodes);
        this.config.needResize = false;
      },
    },
  },
  watch: {},
  mounted() {
    this.cmpName = this.getCmpName(this.cmpTreeNodes);
  },
};
</script>

<style lang="stylus" scoped></style>
