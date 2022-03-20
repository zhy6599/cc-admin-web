<template>
  <scroll-rank class="col column" :config="config" />
</template>
<script>
import ScrollRank from './widgets/rank';

export default {
  components: {
    ScrollRank,
  },
  name: 'rankview',
  data() {
    return {
    };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  watch: {
  },
  computed: {

  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
