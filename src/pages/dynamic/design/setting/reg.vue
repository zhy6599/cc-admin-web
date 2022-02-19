<template>
  <q-list bordered class="rounded-borders" v-if="activeData.config.layout!=='rowFormItem'">
    <q-expansion-item
      icon="mdi-bug-check-outline"
      dense
      default-opened
      dense-toggle
      expand-separator
      label="校验规则"
    >
      <q-card>
        <q-card-section>
          <div v-if="activeData.config.required!==undefined">
            <div class="text-body2 q-pt-sm">校验规则</div>
            <q-toggle label="必填项" v-model="activeData.config.required" />
            <q-select
              prefix="验证规则"
              outlined
              dense
              options-dense
              v-model="activeData.config.rule"
              :options="ruleOptions"
              emit-value
              map-options
              clearable
            />
            <div v-for="(item, index) in activeData.config.regList" :key="index" class="reg-item q-mt-sm">
              <span class="close-btn" @click="activeData.config.regList.splice(index, 1)">
                <q-icon name="mdi-close" />
              </span>
              <div>
                <q-input dense outlined prefix="表达式：" v-model="item.pattern" hint="val && val.length > 0" />
              </div>
              <div class="q-mt-sm">
                <q-input
                  dense
                  outlined
                  prefix="错误提示："
                  v-model="item.message"
                  placeholder=""
                />
              </div>
            </div>
            <div class="q-mt-sm">
              <q-btn dense color="primary" flat icon="add" label="添加规则" @click="addReg" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  components: {},
  props: {
    activeData: {
      type: Object,
      required: false,
    },
    formConf: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      ruleOptions: [
        { label: '唯一', value: 'number' },
        { label: '邮箱', value: 'emailTest' },
        { label: '手机号', value: 'phoneTest' },
        { label: '字母', value: 'letterTest' },
        { label: '数字', value: 'numberTest' },
        { label: '身份证号', value: 'hcodeTest' }],
    };
  },
  watch: {},
  computed: {},
  methods: {
    addReg() {
      this.activeData.config.regList.push({
        pattern: '',
        message: '',
      });
    },
  },
  created() { },
  mounted() { },
};
</script>
<style lang="stylus">
.reg-item
  background #f8f8f8
  position relative
  border-radius 4px
  .close-btn
    position absolute
    right -6px
    top -6px
    display block
    width 16px
    height 16px
    line-height 16px
    background rgba(0, 0, 0, 0.2)
    border-radius 50%
    color #fff
    text-align center
    z-index 1
    cursor pointer
    font-size 12px
    &:hover
      background rgba(210, 23, 23, 0.5)
  & + .reg-item
    margin-top 18px
</style>
