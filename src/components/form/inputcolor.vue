<template>
  <q-input
    dense
    outlined
    v-model="color"
    class="q-my-sm"
    :inputStyle="inputStyle"
  >
    <template v-slot:append>
      <q-icon name="colorize" class="cursor-pointer" :style="{color:color}">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-color v-model="color" @input="selectColor" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>

export default {
  name: 'InputColor',
  props: {
    vModel: String,
  },
  data() {
    return {
      color: '',
    };
  },
  mounted() {
    this.color = this.vModel ? this.vModel : '#000000';
  },
  methods: {
    selectColor(val) {
      this.$emit('input', val);
    },
  },
  computed: {
    inputStyle() {
      return { color: this.color };
    },
  },
};
</script>
