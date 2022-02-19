<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">装饰设置</div>
      <q-separator class="q-mb-sm" />
      <div class="q-pa-md">
        <q-select
          dense
          emit-value
          map-options
          v-model="config.decorationId"
          :options="borders"
          prefix="装饰："
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
      borders: [{ label: '装饰1', value: '1' },
        { label: '装饰2', value: '2' },
        { label: '装饰3', value: '3' },
        { label: '装饰4', value: '4' },
        { label: '装饰5', value: '5' },
        { label: '装饰6', value: '6' },
        { label: '装饰7', value: '7' },
        { label: '装饰8', value: '8' },
        { label: '装饰9', value: '9' },
        { label: '装饰10', value: '10' },
        { label: '装饰11', value: '11' },
        { label: '装饰12', value: '12' },
      ],
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
