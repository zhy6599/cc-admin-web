<template>
  <div class="row">
    <div class="col-md-2 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="sale-card">
        <q-card-section>
          <q-icon name="mdi-microsoft" color="primary" size="sm" />
          系统名称：{{serverInfo.sysInfo.osName}}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-2 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="sale-card">
        <q-card-section>
          <q-icon name="mdi-ip" color="t-dark" size="sm" />
          系统IP：{{serverInfo.sysInfo.computerIp}}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-2 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="sale-card">
        <q-card-section>
          <q-icon name="mdi-server" color="secondary" size="sm" />
          服务器架构：{{serverInfo.sysInfo.osArch}}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-2 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="sale-card">
        <q-card-section>
          <q-icon name="mdi-cpu-64-bit" color="positive" size="sm" />
          CUP内核数：{{serverInfo.cpuInfo.cpuNum}}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-2 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="sale-card">
        <q-card-section>
          <q-icon name="mdi-memory" color="sky" size="sm" />
          内存总量: {{serverInfo.memInfo.total}}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-2 col-sm-6 col-xs-12 q-px-sm q-mb-md">
      <q-card class="sale-card">
        <q-card-section>
          <q-icon name="mdi-harddisk" color="info" size="sm" />
          磁盘总量: {{serverInfo.sysFileInfo.diskTotal}}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    serverInfo: Object,
  },
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="stylus">
.sale-card
  min-width: 200px
  height 60px
</style>
