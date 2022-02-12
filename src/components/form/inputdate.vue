<template>
  <q-field outlined dense ref="field" :value="text" :readonly="readonly"
    :rules="required?[requiredTest]:undefined" :label="label" class="input-Date">
    <template #control>
      {{text}}
    </template>
    <template #append v-if="!readonly">
      <q-btn flat dense round color="primary"
        :icon="range?'date_range':'today'" @click="$refs.menu.toggle()"/>
      <q-menu no-parent-event ref="menu" :target="$refs.field"
        anchor="top right" self="top right" :offset="[0, -40]">
        <q-date minimal mask="YYYY-MM-DD" :range="range"
          :value="value" @input="input"/>
      </q-menu>
    </template>
  </q-field>
</template>

<script>
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'InputDate',
  props: {
    value: [String, Object],
    required: Boolean,
    readonly: Boolean,
    range: Boolean,
    label: String,
  },
  computed: {
    text() {
      let t = this.value;
      if (this.range) {
        t = t && t.from ? `${t.from} ~ ${t.to}` : '';
      }
      return t;
    },
  },
  methods: {
    requiredTest,
    input(v) {
      if (this.range) {
        if (!v) {
          v = {
            from: '',
            to: '',
          };
        } else if (!v.from) {
          v = {
            from: v,
            to: v,
          };
        }
      }
      this.$emit('input', v);
    },
    validate() {
      return this.$refs.field.validate();
    },
    resetValidation() {
      return this.$refs.field.resetValidation();
    },
  },
};
</script>
