<template>
  <div class="row">
    <div
      :class="getDiskClass"
      v-for="sysFile in sysFileInfo.diskList"
      :key="sysFile.typeName"
    >
      <q-card class="main_card">
        <q-card-section>
          <div class="row nowrap items-center">
            <q-avatar
              color="teal"
              size="sm"
              text-color="white"
              class="q-mr-sm"
              icon="mdi-harddisk"
            />
            磁盘[{{sysFile.typeName}}]使用情况统计
            <q-space />
          </div>
          <q-separator class="q-my-sm" />
          <div class="text-h5">{{sysFile.usage}}%</div>
        </q-card-section>
        <q-card-section>
          <q-linear-progress
            size="15px"
            :value="sysFile.usage/100"
            :color="getColor(sysFile.usage)"
            class="q-mt-sm"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <div class="text-subtitle">
            磁盘总量：{{sysFile.total}} 已使用：{{sysFile.used}}
            剩余：{{sysFile.free}}
          </div>
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
      type: Object,
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
    getDiskClass() {
      let cls = 'col-md-3 col-sm-6 col-xs-12 q-px-sm q-mb-md';
      if (this.sysFileInfo && this.sysFileInfo.diskList) {
        if (this.sysFileInfo.diskList.length === 1) {
          cls = 'col q-px-sm q-mb-md';
        } else if (this.sysFileInfo.diskList.length === 2) {
          cls = 'col-sm-6 col-xs-12 q-px-sm q-mb-md';
        } else if (this.sysFileInfo.diskList.length === 3) {
          cls = 'col-sm-4 col-xs-12 q-px-sm q-mb-md';
        }
      }
      return cls;
    },
  },
  created() {
  },
  mounted() {
  },
};
</script>

<style >
</style>
