<template>
  <q-list bordered class="rounded-borders" v-if="activeData.config.layout!=='rowFormItem'">
    <q-expansion-item
      icon="mdi-bug-check-outline"
      dense
      default-opened
      dense-toggle
      expand-separator
      label="数据库设置"
    >
      <q-card>
        <q-card-section>
          <q-input
            dense
            outlined
            type="text"
            v-model="activeData.vModel"
            prefix="字段名称："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            v-model="activeData.db.dbType"
            prefix="数据类型："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            v-model="activeData.db.dbLength"
            prefix="字段长度："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            v-model="activeData.db.dbScale"
            prefix="小数位数："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-toggle v-model="activeData.db.dbPrimary" label="主键" />
          <q-toggle v-model="activeData.db.dbNull" label="不为空" />
          <q-toggle v-model="activeData.db.dbUnique" label="唯一索引" />
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
