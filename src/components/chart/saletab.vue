<template>
  <div class="row">
    <div class="col q-px-sm q-mb-md">
      <q-card>
        <amountbar  :screenWidth="screenWidth"/>
      </q-card>
    </div>
  </div>
</template>

<script>
import amountbar from 'components/chart/amountbar';

export default {
  name: 'SaleTab',
  components: {
    amountbar,
  },
  props: {
    screenWidth: Number,
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
