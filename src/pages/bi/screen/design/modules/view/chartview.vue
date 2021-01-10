<template>
  <wtable v-if="config.type==='table'" :config="config"/>
  <wmaps v-else-if="config.type==='maps'" :config="config"/>
  <wchart v-else :config="config"/>
</template>

<script>
import wchart from './widgets/chart';
import wmaps from './widgets/maps';
import wtable from './widgets/table';

export default {
  name: '',
  props: {
    config: {
      required: true,
      default: () => {},
    },
  },
  components: {
    wchart, wtable, wmaps,
  },
};
</script>

<style lang="stylus">
</style>
