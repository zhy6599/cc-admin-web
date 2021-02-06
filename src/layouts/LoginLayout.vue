<template>
  <div>
    <q-layout view="hHh LpR fff" style="font-family: 微软雅黑">
      <q-header class="bg-white text-primary shadow-1">
        <q-toolbar>
          <q-toolbar-title>CC-ADMIN</q-toolbar-title>
          <div>v1.0.0</div>
        </q-toolbar>
      </q-header>
      <q-footer class="bg-white text-blue-grey-4">
        <div class="q-mb-lg">
          <div class="text-center q-mb-sm">
            <q-btn
              type="a"
              target="_blank"
              unelevated
              size="12px"
              dense
              label="访问源码"
              href="https://gitee.com/zhy6599/cc-admin-web"
            ></q-btn>
          </div>
          <div class="text-center">Copyright@2020 zhy6599作品！</div>
          <div class="text-center"><a class="bg-white text-blue-grey-4 text-body2" href="https://beian.miit.gov.cn" target="_blank">京ICP备17070540号-2</a></div>
        </div>
      </q-footer>
      <q-page-container>
        <div class="q-pa-sm row justify-center" :class="topMarginClass">
          <div class="col text-center" style="width: 100%; max-width: 400px">
            <div class="q-mb-xl">
              <h4 class="q-ma-sm">
                <q-avatar square class="q-mr-md">
                  <img alt="cc-admin logo" src="icons/cc-admin-color.png" />
                </q-avatar>
                <strong>cc-admin</strong>
              </h4>
              <p class="text-grey">企业级快速开发平台</p>
            </div>
            <router-view />
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  props: {},
  data() {
    return {
      topMarginClass: 'q-mt-lg',
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>
