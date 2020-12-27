<template>
  <q-expansion-item dense dense-toggle expand-separator label="图形设置">
    <q-card>
      <q-card-section>
        <q-toggle label="南丁格尔图：" v-model="config.series.pie.roseType" />
        <q-toggle label="放大动画：" v-model="config.series.pie.hoverAnimation" />
        <q-toggle label="防止标签重叠：" v-model="config.series.pie.avoidLabelOverlap" />
        <q-field dense borderless prefix="饼图半径：">
          <template v-slot:control>
            <q-range
              v-model="config.series.pie.radius"
              :min="0"
              :max="100"
            />
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
