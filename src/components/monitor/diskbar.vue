<template>
  <div class="row q-mb-md q-gutter-md">
    <div class="col" v-for="sysFile in sysFileInfo" :key="sysFile.typeName">
      <q-card class="main_card">
        <q-card-section>
          <div class="row nowrap items-center">
            <q-avatar
              color="teal"
              size="sm"
              text-color="white"
              class="q-mr-sm"
              icon="mdi-harddisk"
            />磁盘[{{sysFile.typeName}}]使用情况统计
            <q-space />
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-h5">{{sysFile.usage}}%</div>
        </q-card-section>
        <q-card-section>
          <q-linear-progress size="15px" :value="sysFile.usage/100"
          :color="getColor(sysFile.usage)" class="q-mt-sm" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <div class="text-subtitle">磁盘总量：{{sysFile.total}} 已使用：{{sysFile.used}}
            剩余：{{sysFile.free}}</div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DiskBar',
  components: {
  },
  props: {
    sysFileInfo: {
      type: Array,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    getColor(usage) {
      if (usage > 90) {
        return 'negative';
      }
      if (usage > 60) {
        return 'warning';
      }

      if (usage > 30) {
        return 'primary';
      }

      return 'positive';
    },
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
};
</script>

<style >
</style>
