<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">文字设置</div>
      <q-separator class="q-mb-sm" />
      <q-input
        dense
        filled
        v-model="config.text"
        prefix="文本内容："
        class="q-my-sm"
        input-class="text-left"
      />
      <q-input
        dense
        filled
        v-model="config.fontSize"
        prefix="字体大小："
        class="q-my-sm"
        type="number"
        input-class="text-left"
      />
      <q-input
        dense
        filled
        v-model="config.color"
        prefix="字体颜色："
        class="q-my-sm"
        input-class="text-left"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="config.color" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        dense
        filled
        v-model="config.letterSpacing"
        type="number"
        prefix="字体间距："
        class="q-my-sm"
        input-class="text-left"
      />
      <q-input
        dense
        filled
        v-model="config.bgImg"
        prefix="字体背景："
        class="q-my-sm"
        input-class="text-left"
      />
      <q-select
        dense
        filled
        v-model="config.fontWeight"
        transition-show="flip-up"
        emit-value
        map-options
        transition-hide="flip-down"
        prefix="文字粗细："
        class="q-my-sm"
        :options="fontWeightOptions"
      />
      <q-select
        dense
        filled
        v-model="config.textAlign"
        transition-show="flip-up"
        emit-value
        map-options
        transition-hide="flip-down"
        prefix="对齐方式："
        class="q-my-sm"
        :options="alignOptions"
      />
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'textsetting',
  components: {
  },
  data() {
    return {
      fontWeightOptions: [{ label: '正常', value: 'normal' }, { label: '加粗', value: 'bold' }],
      alignOptions: [{ label: '居中', value: 'center' }, { label: '左对齐', value: 'left' }, { label: '右对齐', value: 'right' }],
    };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  methods: {
  },
  computed: {},
  watch: {},
  mounted() {
  },
};
</script>

<style lang="less" scoped>
</style>
