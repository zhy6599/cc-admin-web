<template>
  <q-btn flat round size="sm" icon="mdi-bell-outline">
    <q-badge
      color="negative"
      style="padding: 2px 4px"
      title-color="white"
      floating
    >{{totalInformCount}}</q-badge>
    <q-tooltip>未读消息</q-tooltip>
    <q-menu
      anchor="bottom middle"
      self="top middle"
      :offset="[0, 20]"
      transition-show="jump-down"
      transition-hide="jump-up"
      content-style="width: 400px;"
      max-height="800px"
    >
      <div>
        <q-card class="full-width">
          <q-tabs
            v-model="messageTab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="notify">
              <span v-if="msg.notifyCount > 0">通知({{ notifyCount }})</span>
              <span v-else>通知</span>
            </q-tab>
            <q-tab name="inform">
              <span v-if="msg.infoCount > 0">消息({{ informCount }})</span>
              <span v-else>消息</span>
            </q-tab>
            <q-tab name="waitDeals">
              <span v-if="msg.waitDealCount > 0">待办({{ waitDealCount }})</span>
              <span v-else>待办</span>
            </q-tab>
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="messageTab" animated>
            <q-tab-panel name="inform" class="q-pa-none">
              <q-list>
                <div
                  v-for="(inform, index) in msg.informList"
                  v-bind:key="index"
                  @click="look('inform', index)"
                >
                  <q-item class="cursor-pointer q-ma-xs" :disable="inform.disable">
                    <q-item-section avatar>
                      <q-avatar
                        :color="inform.color"
                        :text-color="inform.textColor"
                        :icon="inform.icon"
                      />
                    </q-item-section>
                    <q-item-section class="q-gutter-xs">
                      <q-item-label :lines="1">{{ inform.title }}</q-item-label>
                      <q-item-label caption>{{ inform.desc }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator v-if="index < msg.informList.length - 1" inset="item" />
                </div>
                <q-separator />
                <q-item class="row q-pa-none text-center cursor-pointer">
                  <q-item-section class="col q-pa-none q-ma-none">
                    <q-btn
                      label="清空消息"
                      flat
                      :ripple="{ color: 'info' }"
                      class="q-ma-none full-width full-height no-border-radius"
                      @click="clearMessage('inform')"
                    ></q-btn>
                  </q-item-section>
                  <q-separator vertical />
                  <q-item-section class="col q-pa-none q-ma-none">
                    <q-btn
                      label="查看更多"
                      flat
                      :ripple="{ color: 'info' }"
                      class="q-ma-none full-width full-height no-border-radius"
                      @click="lookMore('查看通知')"
                    ></q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="notify" class="q-pa-none">
              <q-list>
                <div
                  v-for="(notify, index) in msg.notifyList"
                  v-bind:key="index"
                  @click="look('notify', index)"
                >
                  <q-item class="cursor-pointer q-ma-xs" :disable="notify.disable">
                    <q-item-section avatar>
                      <q-avatar
                        :color="notify.color"
                        :text-color="notify.textColor"
                        :icon="notify.icon"
                      />
                    </q-item-section>
                    <q-item-section class="q-gutter-xs">
                      <q-item-label :lines="1">{{ notify.title }}</q-item-label>
                      <q-item-label caption>{{ notify.desc }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator v-if="index < msg.informList.length - 1" inset="item" />
                </div>
                <q-separator />
                <q-item class="row q-pa-none text-center cursor-pointer">
                  <q-item-section class="col q-pa-none q-ma-none">
                    <q-btn
                      label="清空通知"
                      flat
                      :ripple="{ color: 'info' }"
                      class="q-ma-none full-width full-height no-border-radius"
                      @click="clearMessage('notify')"
                    ></q-btn>
                  </q-item-section>
                  <q-separator vertical />
                  <q-item-section class="col q-pa-none q-ma-none">
                    <q-btn
                      label="查看更多"
                      flat
                      :ripple="{ color: 'info' }"
                      class="q-ma-none full-width full-height no-border-radius"
                      @click="lookMore('查看通知')"
                    ></q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="waitDeals" class="q-pa-none">
              <q-list>
                <div
                  v-for="(waitDeal, index) in msg.waitDealList"
                  v-bind:key="index"
                  @click="look('waitDeal', index)"
                >
                  <q-item class="cursor-pointer q-ma-xs" :disable="waitDeal.disable">
                    <q-item-section avatar>
                      <q-avatar
                        :color="waitDeal.color"
                        :text-color="waitDeal.textColor"
                        :icon="waitDeal.icon"
                      />
                    </q-item-section>
                    <q-item-section class="q-gutter-xs">
                      <q-item-label :lines="1">{{ waitDeal.title }}</q-item-label>
                      <q-item-label caption>{{ waitDeal.desc }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator v-if="index < msg.informList.length - 1" inset="item" />
                </div>
                <q-separator />
                <q-item class="row q-pa-none text-center cursor-pointer">
                  <q-item-section class="col q-pa-none q-ma-none">
                    <q-btn
                      label="清空通知"
                      flat
                      :ripple="{ color: 'info' }"
                      @click="clearMessage('waitDeals')"
                      class="q-ma-none full-width full-height no-border-radius"
                    ></q-btn>
                  </q-item-section>
                  <q-separator vertical />
                  <q-item-section class="col q-pa-none q-ma-none">
                    <q-btn
                      label="查看更多"
                      flat
                      :ripple="{ color: 'info' }"
                      class="q-ma-none full-width full-height no-border-radius"
                      @click="lookMore('查看通知')"
                    ></q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      messageTab: 'notify',
      msg: {
        infoCount: 2,
        waitDealCount: 2,
        notifyCount: 2,
        informList: [
          {
            icon: 'email',
            title: '你推荐的 曲妮妮 已通过第三轮面试',
            desc: '3年前',
            color: 'orange',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'bluetooth',
            title: '你收到了 14 份新周报',
            desc: '3年前',
            color: 'primary',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'email',
            title: '这种模板可以区分多种通知类型',
            desc: '3年前',
            color: 'teal',
            textColor: 'white',
            disable: true,
          },
          {
            icon: 'email',
            title: '左侧图标用于区分不同的类型',
            desc: '3年前',
            color: 'yellow-10',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'email',
            title: '内容不要超过两行字，超出时自动截断',
            desc: '3年前',
            color: 'orange',
            textColor: 'white',
            disable: false,
          },
        ],
        notifyList: [
          {
            icon: 'email',
            title: '你推荐的 曲妮妮 已通过第三轮面试',
            desc: '3年前',
            color: 'orange',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'bluetooth',
            title: '你收到了 14 份新周报',
            desc: '3年前',
            color: 'primary',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'email',
            title: '这种模板可以区分多种通知类型',
            desc: '3年前',
            color: 'teal',
            textColor: 'white',
            disable: true,
          },
          {
            icon: 'email',
            title: '左侧图标用于区分不同的类型',
            desc: '3年前',
            color: 'yellow-10',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'email',
            title: '内容不要超过两行字，超出时自动截断',
            desc: '3年前',
            color: 'orange',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'email',
            title: '内容不要超过两行字，超出时自动截断222',
            desc: '3年前',
            color: 'blue',
            textColor: 'white',
            disable: false,
          },
        ],
        waitDealList: [
          {
            icon: 'email',
            title: '你推荐的 曲妮妮 已通过第三轮面试',
            desc: '3年前',
            color: 'orange',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'bluetooth',
            title: '你收到了 14 份新周报',
            desc: '3年前',
            color: 'primary',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'email',
            title: '这种模板可以区分多种通知类型',
            desc: '3年前',
            color: 'teal',
            textColor: 'white',
            disable: true,
          },
          {
            icon: 'email',
            title: '左侧图标用于区分不同的类型',
            desc: '3年前',
            color: 'yellow-10',
            textColor: 'white',
            disable: false,
          },
          {
            icon: 'email',
            title: '内容不要超过两行字，超出时自动截断',
            desc: '3年前',
            color: 'orange',
            textColor: 'white',
            disable: false,
          },
        ],
      },
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

    look(type, index) {
      if (type === 'inform') {
        this.msg.informList[index].disable = true;
      } else if (type === 'notify') {
        this.msg.notifyList[index].disable = true;
      } else {
        this.waitDealList[index].disable = true;
      }
    },
    lookMore(message) {
      this.$q.notify({
        progress: true,
        color: 'primary',
        group: false,
        icon: 'check_circle',
        position: 'top',
        timeout: 2000,
        message,
      });
    },
    openMessage() {
      this.showMessage = !this.showMessage;
    },
    clearMessage(items) {
      if (items === 'inform') {
        this.disable(this.msg.informList);
      } else if (items === 'notify') {
        this.disable(this.msg.notifyList);
      } else {
        this.disable(this.msg.waitDealList);
      }
    },
    disable(items) {
      for (let i = 0; i < items.length; i += 1) {
        items[i].disable = true;
      }
    },
    getAvailableCount(datas) {
      if (!datas) {
        return 0;
      }
      let count = 0;
      for (let i = 0; i < datas.length; i += 1) {
        if (datas[i].disable === false) {
          count += 1;
        }
      }
      return count;
    },
  },
  computed: {
    informCount() {
      return this.getAvailableCount(this.msg.informList);
    },
    notifyCount() {
      return this.getAvailableCount(this.msg.notifyList);
    },
    waitDealCount() {
      return this.getAvailableCount(this.msg.waitDealList);
    },
    totalInformCount() {
      return this.informCount + this.notifyCount + this.waitDealCount;
    },
  },
};
</script>

<style scoped lang="stylus"></style>
