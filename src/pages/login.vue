<template>
  <div class="bg-styl">
    <q-form @submit="submit" class="q-pa-md shadow-9">
      <q-tabs
        v-model="tab"
        active-color="primary"
        indicator-color="primary"
        align="left"
        :breakpoint="0"
        narrow-indicator
        class="text-black"
      >
        <q-tab name="mails" label="用户密码登录" />
        <q-tab name="alarms" label="手机号登录" />
      </q-tabs>

      <div class="q-gutter-y-sm">
        <q-tab-panels v-model="tab" class="text-center">
          <q-tab-panel name="mails" class="q-col-gutter-y-sm">
            <div class="row">
              <div class="col">
                <q-input
                  outlined
                  clearable
                  clear-icon="cancel"
                  v-model.trim="form.username"
                  dense
                  debounce="500"
                  label="用户名"
                  lazy-rules
                  square
                  :rules="[
                      (val) => (val && val.length > 0) || '请输入用户名'
                    ]"
                >
                  <template #prepend>
                    <q-icon name="face" />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  outlined
                  clearable
                  clear-icon="cancel"
                  :type="isPwd ? 'password' : 'text'"
                  v-model.trim="form.password"
                  dense
                  debounce="500"
                  label="密码"
                  lazy-rules
                  square
                  :rules="[(val) => (val && val.length > 0) || '请输入密码']"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="alarms" class="q-col-gutter-y-sm">
            <div class="row">
              <div class="col">
                <q-input
                  outlined
                  clearable
                  clear-icon="cancel"
                  v-model.trim="form.username"
                  dense
                  debounce="500"
                  label="手机号"
                  lazy-rules
                  square
                  :rules="[
                      (val) => (val && val.length > 0) || '请输入用户名'
                    ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  v-model.trim="form.password"
                  dense
                  debounce="500"
                  label="验证码"
                  lazy-rules
                  square
                  :rules="[(val) => (val && val.length > 0) || '请输入密码']"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                  <template v-slot:after>
                    <q-btn unelevated color="secondary" class="no-border-radius" label="获取验证码" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <div class="q-mx-md">
          <div class="row">
            <div class="col text-left">
              <q-checkbox v-model="autoLogin" label="自动登录" />
            </div>
            <div class="col text-right">
              <q-btn color="primary" flat label="忘记密码" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-btn
                dense
                unelevated
                label="登 录"
                size="17px"
                color="primary q-mt-sm"
                class="full-width no-border-radius"
                type="submit"
                :loading="loading"
              >
                <template v-slot:loading>
                  <q-spinner-ios class="on-left" />登录...
                </template>
              </q-btn>
            </div>
          </div>
          <div class="row q-pt-md">
            <div class="col-auto text-left q-pt-sm">
              <span>其他登录方式</span>
              <q-icon
                v-for="(val, key) in loginIcon"
                v-bind:key="key"
                :size="val.size"
                :class="[val.class.iconName, val.class.color]"
                @mouseover="mouseOver(key, $event)"
                @mouseleave="mouseLeave(key, $event)"
                style="cursor: pointer"
                class="iconfont q-ml-sm"
              />
            </div>
            <div class="col text-right">
              <q-btn color="primary" flat label="注册用户" />
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      title: process.env.PRODUCT_NAME,
      form: {
        username: 'guest',
        password: '123456',
      },
      iconObject: {
        weixin: {
          class: { iconName: 'iconweixin', color: 'text-grey' },
          size: '22px',
        },
        zhifubao: {
          class: {
            iconName: 'iconzhifubao',
            color: 'text-grey',
          },
          size: '20px',
        },
        taobao: {
          class: { iconName: 'icontaobao', color: 'text-grey' },
          size: '22px',
        },
        weibo: {
          class: { iconName: 'iconweibo', color: 'text-grey' },
          size: '20px',
        },
        github: {
          class: { iconName: 'iconhuaban88', color: 'text-grey' },
          size: '23px',
          type: 'link',
        },
      },
      iconActive: {
        weibo: 'grey',
      },
      tab: 'mails',
      isPwd: true,
      autoLogin: true,
      loading: false,
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.$axios.post('/sys/login', this.form)
        .then((r) => {
          this.$store.commit('User/updateAuthorization', r.result.token);
          this.$store.commit('User/updateInfo', r.result.userInfo);
          setTimeout(() => {
            window.location.replace(this.$route.params.from || '/');
          });
        }).finally(() => {
          this.loading = false;
        });
    },
    mouseOver(iconKey) {
      this.activeForLoginType(iconKey, 'text-primary');
    },
    mouseLeave(iconKey) {
      this.activeForLoginType(iconKey, 'text-grey');
    },
    activeForLoginType(iconKey, targetColor) {
      this.iconObject[iconKey].class.color = targetColor;
    },
  },
  mounted() {
    if (this.$store.state.User.authorization) {
      this.$router.replace(this.$route.params.from || '/');
    } else {
      this.$store.commit('User/clear');
    }
  },
  computed: {
    loginIcon() {
      return this.iconObject;
    },
  },
};
</script>

<style lang="stylus">
@import '~assets/icons/iconfont.css';

.login {
  background-color: #f0f2f5;
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url('~assets/login/login.svg') no-repeat 50%;
  background-size: 100%;

  h2 {
    left: 0;
    width: 100%;
    font-size: 20px;
    color: #707070;
    text-align: center;
    text-shadow: 1px 2px 4px #444;
  }

  .q-form {
    width: 400px;
    background: #fff;
    border-radius: 9px;
  }
}
</style>
