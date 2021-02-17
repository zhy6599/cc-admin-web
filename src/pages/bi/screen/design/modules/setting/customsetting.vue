<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">组件设置</div>
      <q-separator class="q-mb-sm" />
      <q-select
          dense
          filled
          v-model="config.cmpName"
          transition-show="flip-up"
          emit-value
          map-options
          transition-hide="flip-down"
          prefix="选择组件："
          class="q-my-sm"
          :options="cmpNameOptions"
          @input="cmpChange"
        />
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
      cmpNameOptions: [
        { label: '折线', value: 'customline' },
        { label: '汽车', value: 'customcar' },
        { label: '飞机', value: 'customplane' },
        { label: '散点图', value: 'customscatter' },
        { label: '热力周', value: 'customheatweek' },
        { label: '热力年', value: 'customheatyear' },
        { label: '3D柱状图', value: 'custombar3d' },
        { label: '3D柱状图透明', value: 'custombar3dtran' },
        { label: '3D折线图', value: 'customline3d' },
        { label: '3D风向', value: 'customwind3d' },
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
    cmpChange() {
      this.config.needResize = false;
    },
  },
  computed: {},
  watch: {},
  mounted() {
  },
};
</script>

<style lang="stylus" scoped>
</style>
