<template>
  <div class="bg-styl">
    <div class="login fixed-full column items-center justify-center">
      <q-form @submit="submit" class="q-pa-md shadow-9">
        <q-field borderless stack-label>
          <template v-slot:control>
            <h2>CC-ADMIN 企业级快速开发平台</h2>
          </template>
        </q-field>
        <q-input
          outlined
          dense
          clearable
          v-model.trim="form.username"
          placeholder="请输入用户名"
          :rules="[val => !!val || '用户名不可为空']"
          class="q-mb-lg"
        >
          <template #prepend>
            <q-icon name="face" />
          </template>
        </q-input>
        <q-input
          outlined
          clearable
          dense
          v-model.trim="form.password"
          placeholder="请输入密码"
          type="password"
          :rules="[val => !!val || '密码不可为空']"
          class="q-mb-lg"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <q-btn class="full-width" label="登录"
          color="primary" type="submit" size="md" />
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      title: process.env.PRODUCT_NAME,
      form: {
        username: 'admin',
        password: '123456',
      },
    };
  },
  methods: {
    submit() {
      this.$axios.post('/sys/login', this.form)
        .then((r) => {
          this.$store.commit('User/updateAuthorization', r.result.token);
          this.$store.commit('User/updateInfo', r.result.userInfo);
          setTimeout(() => {
            window.location.replace(this.$route.params.from || '/');
          });
        });
    },
  },
  mounted() {
    if (this.$store.state.User.authorization) {
      this.$router.replace(this.$route.params.from || '/');
    } else {
      this.$store.commit('User/clear');
    }
  },
};
</script>

<style lang="stylus">
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
