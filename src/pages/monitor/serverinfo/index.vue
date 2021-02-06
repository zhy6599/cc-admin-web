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

export default {
  name: 'ServerInfo',
  components: {
    serverinfo,
    memline,
    diskbar,
  },
  data() {
    return {
      interval: 1000,
      ti: 0,
      refreshSysInfo: true,
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
      if (this.refreshSysInfo) {
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

    initWebSocket() {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      const userName = this.$store.state.User.info.username;
      const url = `${process.env.SERVER_URL}${process.env.BASE_URL}/websocket/${userName}`.replace('https://', 'wss://').replace('http://', 'ws://');
      this.websock = new WebSocket(url);
      this.websock.onopen = this.websocketOnopen;
      this.websock.onerror = this.websocketOnerror;
      this.websock.onmessage = this.websocketOnmessage;
      this.websock.onclose = this.websocketOnclose;
    },
    websocketOnopen() {
      this.$info('WebSocket连接成功');
      // 心跳检测重置
      this.heartCheck.reset().start();
    },
    websocketOnerror(e) {
      this.$error('WebSocket连接发生错误', e);
      this.reconnect();
    },
    websocketOnmessage(e) {
      const data = JSON.parse(e.data); // 解析对象
      if (data.cmd === 'topic') {
        // 系统通知
        this.loadData();
      } else if (data.cmd === 'user') {
        // 用户消息
        this.loadData();
      } else if (data.cmd === 'serverInfo') {
        // 用户消息
        this.loadServerInfo(data.msgTxt);
      }
      // 心跳检测重置
      this.heartCheck.reset().start();
    },
    websocketOnclose() {
      this.reconnect();
    },
    websocketSend(text) { // 数据发送
      try {
        this.websock.send(text);
      } catch (err) {
        this.$error(`send failed (${err.code})`);
      }
    },

    openNotification(data) {
      const text = data.msgTxt;
      this.$info(text);
    },

    reconnect() {
      const that = this;
      if (that.lockReconnect) return;
      that.lockReconnect = true;
      // 没连接上会一直重连，设置延迟避免请求过多
      setTimeout(() => {
        this.$info('尝试重连...');
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    heartCheckFun() {
      const that = this;
      // 心跳检测,每20s心跳一次
      that.heartCheck = {
        timeout: 20000,
        timeoutObj: null,
        serverTimeoutObj: null,
        reset() {
          clearTimeout(this.timeoutObj);
          return this;
        },
        start() {
          this.timeoutObj = setTimeout(() => {
            that.websocketSend('heartCheck');
          }, this.timeout);
        },
      };
    },
  },
  created() {
    this.getData = debounce(this.getServerInfo, 1000);
  },
  mounted() {
    this.getData();
    this.initWebSocket();
    this.heartCheckFun();
  },
  beforeDestroy() {
    // 离开页面生命周期函数
    this.websocketOnclose();
    this.refreshSysInfo = false;
    clearTimeout(this.ti);
  },
};
</script>

<style lang="stylus"></style>
