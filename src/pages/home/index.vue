<template>
  <q-page class="cc-admin row">
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
      <salestat :screenWidth="screenWidth" />
      <visitline :screenWidth="screenWidth" />
      <saletab :screenWidth="screenWidth" />
    </div>
  </q-page>
</template>

<script>
import { debounce } from 'quasar';
import salestat from 'components/chart/salestat';
import visitline from 'components/chart/visitline';
import saletab from 'components/chart/saletab';

export default {
  name: 'Dashboard',
  components: {
    salestat,
    visitline,
    saletab,
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
    };
  },
  methods: {
    doResize() {
      this.screenWidth = this.clientWidth;
    },
  },
  mounted() {
    this.onResize = debounce(this.doResize, 500);
    this.onResize();
  },
  watch: {
    clientWidth() {
      this.onResize();
    },
  },
  computed: {
    clientWidth() {
      return this.$q.screen.width;
    },
  },
};
</script>

<style lang="stylus">
.main_card {
  height: 200px;
}
</style>
