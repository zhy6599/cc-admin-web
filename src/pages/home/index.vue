<template>
  <q-page class="row">
    <div class="col column view_card shadow-2 q-pa-md q-ma-sm bg-gray-1">
      <salestat />
      <visitline />
      <linkcard />
      <saletab />
    </div>
  </q-page>
</template>

<script>
import visitline from 'components/chart/visitline';
import salestat from 'components/chart/salestat';
import linkcard from 'components/chart/linkcard';
import saletab from 'components/chart/saletab';

export default {
  name: 'Dashboard',
  components: {
    saletab,
    visitline,
    linkcard,
    salestat,
  },
  data() {
    return {
    };
  },
  methods: {
    initDict() {
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus">
.main_card {
  height: 200px;
}
</style>
