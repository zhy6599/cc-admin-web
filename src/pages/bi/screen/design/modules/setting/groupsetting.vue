<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">组合设置</div>
      <q-separator class="q-mb-sm" />
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'groupsetting',
  components: {
  },
  data() {
    return {
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
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
  computed: {},
  watch: {},
  mounted() {
  },
};
</script>

<style lang="stylus" scoped>
</style>
