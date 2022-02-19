<template>
  <q-list bordered class="rounded-borders" v-if="activeData.config.layout!=='rowFormItem'">
    <q-expansion-item
      icon="mdi-bug-check-outline"
      dense
      default-opened
      dense-toggle
      expand-separator
      label="子表单设置"
    >
      <q-card>
        <q-card-section>
          <q-input
            dense
            outlined
            type="text"
            v-model="activeData.sub.tableId"
            prefix="表名："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            v-model="activeData.sub.tableName"
            prefix="表描述："
            class="q-my-sm"
            input-class="text-left"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  components: {},
  props: {
    activeData: {
      type: Object,
      required: false,
    },
    formConf: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {
  },
  created() { },
  mounted() { },
};
</script>
<style lang="stylus">
</style>
