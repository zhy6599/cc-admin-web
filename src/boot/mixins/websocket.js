export const Websocket = {
  components: {
  },
  data() {
    return {
      ti: 0,
    };
  },
  methods: {
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
      } else if (data.cmd === 'stepStatus') {
        // 步骤状态
        this.loadData(data.msgTxt);
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
  mounted() {
    this.initWebSocket();
    this.heartCheckFun();
  },
  beforeDestroy() {
    this.websocketOnclose();
  },
  created() {
  },
  computed: {
  },

};
