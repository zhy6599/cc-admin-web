<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">边框设置</div>
      <q-separator class="q-mb-sm" />
      <div class="q-pa-md">
        <q-select
          dense
          emit-value
          map-options
          v-model="config.borderId"
          :options="borders"
          prefix="边框："
        />
      </div>
      <q-input filled v-model="config.color1" prefix="颜色1：" class="q-my-sm">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="config.color1" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input filled v-model="config.color2" prefix="颜色2：" class="q-my-sm">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="config.color2" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'bordersetting',
  components: {
  },
  data() {
    return {
      color1: null,
      color2: null,
      borders: [{ label: '边框1',value: '1' },
      { label: '边框2',value: '2' },
      { label: '边框3',value: '3' },
      { label: '边框4',value: '4' },
      { label: '边框5',value: '5' },
      { label: '边框6',value: '6' },
      { label: '边框7',value: '7' },
      { label: '边框8',value: '8' },
      { label: '边框9',value: '9' },
      { label: '边框10',value: '10' },
      { label: '边框11',value: '11' },
      { label: '边框12',value: '12' },
      { label: '边框13',value: '13' },
      ]
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
  computed: {
  },
  watch: {
  },
  mounted() {
  },
};
</script>

<style lang="stylus" scoped></style>
