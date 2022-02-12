<template>
  <q-page class="cc-admin row">
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm bg-gray-1">
      <serverinfo :serverInfo="serverInfo" />
      <memline
        :cpuData="cpuData"
        :memData="memData"
        :sysTimeData="sysTimeData"
        :cpuIdle="serverInfo.cpuInfo.idle"
        :memUsageRate="serverInfo.memInfo.usageRate"
        :runningTime="serverInfo.sysInfo.runningTime"
      />
      <diskbar :sysFileInfo="serverInfo.sysFileInfo" />
    </div>
  </q-page>
</template>

<script>
import { debounce } from 'quasar';
import serverinfo from 'components/monitor/serverinfo';
import memline from 'components/monitor/memline';
import diskbar from 'components/monitor/diskbar';
import { Websocket } from 'boot/mixins/websocket';

export default {
  name: 'ServerInfo',
  mixins: [Websocket],
  components: {
    serverinfo,
    memline,
    diskbar,
  },
  data() {
    return {
      interval: 1000,
      ti: 0,
      refreshInfo: true,
      loadDataInterval: 1,
      loading: false,
      maxPoint: 80,

      cpuData: [],
      memData: [],
      sysTimeData: [],
      serverInfo: {
        cpuInfo: {
          cSys: 0,
          idle: 0,
          iowait: 0,
          user: 0,
          cpuNum: 1,
        },
        jvmInfo: {
          total: '15.5MB',
          usageRate: 0,
          max: '247.5MB',
          jdkVersion: '1.8.0_20',
          free: '7.77MB',
          user: '7.73MB',
          jdkHome: 'C:\\java\\jdk1.8.0_20\\jre',
        },
        memInfo: {
          total: '15.93GB',
          usageRate: 86.56,
          used: '13.79GB',
          free: '2.14GB',
        },
        sysFileInfo: {
          diskTotal: '2T',
          diskList: [{
            total: '931.51GB',
            usage: 32.49,
            typeName: 'Local Fixed Disk',
            sysTypeName: 'NTFS',
            used: '302.66GB',
            free: '628.85GB',
            dirName: '/',
          }],
        },
        sysInfo: {
          computerIp: '192.168.0.1',
          computerName: 'Super Hero',
          osArch: 'x86',
          userDir: '',
          osName: 'CenterOs',
          runningTime: '100小时',
        },
      },
    };
  },
  methods: {
    initDict() {
    },
    getServerInfo() {
      this.websocketSend('serverInfo');
      this.confirmLoop();
    },
    loadServerInfo(result) {
      this.serverInfo = result;
      this.cpuData.push(result.cpuInfo.idle);
      this.memData.push(result.memInfo.usageRate);
      this.sysTimeData.push(result.sysTime);
      if (this.cpuData.length > this.maxPoint) {
        this.cpuData.shift();
        this.memData.shift();
        this.sysTimeData.shift();
      }
    },
    confirmLoop() {
      if (this.refreshInfo) {
        this.interval = this.loadDataInterval - (-1);
        this.loop();
      } else {
        clearTimeout(this.ti);
      }
    },
    loop() {
      clearTimeout(this.ti);
      this.interval -= 1;
      if (this.interval < 1) {
        this.getData();
      } else {
        this.ti = setTimeout(() => {
          this.loop();
        }, 999);
      }
    },
  },
  created() {
    this.getData = debounce(this.getServerInfo, 1000);
  },
  mounted() {
    this.getData();
  },
  beforeDestroy() {
    clearTimeout(this.ti);
  },
};
</script>

<style lang="stylus"></style>
