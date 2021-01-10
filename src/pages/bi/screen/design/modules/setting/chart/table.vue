<template>
  <div>
    <q-toggle label="水平显示" v-model="config.table.horizontal" />
    <q-toggle label="开启跑马灯" v-model="config.table.loop" />
    <q-toggle label="轮流反向" v-model="config.table.alternate" />
    <q-input
      dense
      filled
      type="number"
      v-model="config.table.scrolldelay"
      prefix="滚动时间间隔："
      class="q-my-sm"
      input-class="text-left"
    />
    <q-select
      dense
      filled
      options-dense
      v-model="config.table.direction"
      prefix="滚动方向："
      class="q-my-sm"
      :options="directionOptions"
      emit-value
      map-options
    />
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      directionOptions: [
        { label: '左', value: 'left' },
        { label: '右', value: 'right' },
        { label: '上', value: 'up' },
        { label: '下', value: 'down' },
      ],
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="stylus"></style>
