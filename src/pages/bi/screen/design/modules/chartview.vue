<template>
  <wtable v-if="config.type==='table'" :config="config"/>
  <wchart v-else :config="config"/>
</template>

<script>
import wchart from './widgets/chart';
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
    wchart, wtable,
  },
};
</script>

<style lang="stylus">
</style>
