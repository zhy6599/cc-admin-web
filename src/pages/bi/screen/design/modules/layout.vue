<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">图层设置</div>
      <q-separator class="q-mb-sm" />
      <q-linear-progress stripe indeterminate v-if="loading" class="absolute-top" />
      <q-scroll-area class="col">
        <q-list>
          <q-item v-for="item in items" :key="item.id"  clickable v-ripple
          :active="selId === item.i" active-class="grid-item-select"
          @click="selectChart(item)">
            <q-item-section avatar>
              <q-icon :name="getIcon(item)" />
            </q-item-section>
            <q-item-section>
              <q-btn-group flat>
                <q-btn
                  flat
                  round
                  dense
                  color="secondary"
                  icon="mdi-arrow-collapse-up"
                  @click="item.z = 10000"
                />
                <q-btn
                  flat
                  round
                  dense
                  color="secondary"
                  icon="mdi-arrow-up"
                  :disable="item.z === 10000"
                  @click="item.z += 1"
                />
                <q-btn
                  flat
                  round
                  dense
                  color="secondary"
                  icon="mdi-arrow-down"
                  :disable="item.z === 0"
                  @click="item.z -= 1"
                />
                <q-btn
                  flat
                  round
                  dense
                  color="secondary"
                  icon="mdi-arrow-collapse-down"
                  @click="item.z = 0"
                />
              </q-btn-group>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card>
  </div>
</template>

<script>
import { chartList } from 'boot/datatype';

export default {
  name: 'datasource',
  components: {
  },
  data() {
    return {
      loading: false,
      chartList,
    };
  },
  props: {
    items: {
      type: Array,
      required: false,
    },
    selId: {
      type: Number,
      required: false,
    },
  },
  mounted() {
  },
  methods: {
    getIcon(item) {
      const chart = this.chartList.find((v) => v.type === item.type);
      if (chart) {
        return chart.icon;
      }
      return '';
    },
    selectChart(item) {
      this.$emit('selectItem', item.i);
    },
  },
  watch: {
  },
};
</script>

<style lang="stylus"></style>
