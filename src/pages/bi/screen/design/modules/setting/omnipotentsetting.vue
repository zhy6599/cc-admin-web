<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">万能组件设置</div>
      <q-separator class="q-mb-sm" />
      <span>神笔马良：</span>
      <q-input
        dense
        filled
        type="textarea"
        v-model="config.content"
        class="q-my-sm"
        input-class="text-left"
      />
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'omnipotentsetting',
  components: {
  },
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
  methods: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
};
</script>

<style lang="stylus" scoped>
</style>
