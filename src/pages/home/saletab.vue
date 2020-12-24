<template>
  <div>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="amount" label="销售额" />
        <q-tab name="trend" label="销售趋势" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="amount">
          <amountbar />
        </q-tab-panel>

        <q-tab-panel name="trend">
          <trendline />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import amountbar from 'components/chart/amountbar';
import trendline from 'components/chart/trendline';

export default {
  name: 'DemoPlan',
  components: {
    amountbar, trendline,
  },
  data() {
    return {
      tab: 'amount',
    };
  },
  methods: {
  },
  computed: {
  },
  mounted() {
  },
};
</script>

<style lang="stylus"></style>
