<template>
  <q-expansion-item dense dense-toggle expand-separator label="图形设置">
    <q-card>
      <q-card-section>
        <q-toggle label="堆叠显示：" v-model="config.series.bar.stack" />
        <q-input
          dense
          filled
          type="number"
          v-model="config.series.bar.barWidth"
          prefix="柱条宽度："

          input-class="text-left"
        />
        <q-field dense borderless prefix="圆角半径：">
          <template v-slot:control>
            <q-slider v-model="config.series.bar.itemStyle.barBorderRadius" :min="0" :max="45" />
          </template>
        </q-field>
        <q-field dense borderless prefix="透明度：">
          <template v-slot:control>
            <q-slider v-model="config.series.bar.itemStyle.opacity" :min="0" :max="100" />
          </template>
        </q-field>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'configbar',
  components: {},
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() { },
  mounted() { },
};
</script>
<style lang="stylus"></style>
