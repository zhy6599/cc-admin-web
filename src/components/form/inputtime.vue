<template>
  <q-field outlined dense ref="field" :value="value" :readonly="readonly"
    :rules="required?[requiredTest]:undefined" :label="label" class="input-Time">
    <template #control>
      {{value}}
    </template>
    <template #append v-if="!readonly">
      <q-btn flat dense round color="primary" icon="schedule" @click="$refs.menu.toggle()"/>
      <q-menu no-parent-event ref="menu" :target="$refs.field"
        anchor="top right" self="top right" :offset="[0, -40]">
        <select-time :value="value" @input="$emit('input', $event)"/>
      </q-menu>
    </template>
  </q-field>
</template>

<script>
import { requiredTest } from 'boot/inputTest';
import selectTime from 'components/form/selecttime';

export default {
  name: 'InputTime',
  components: {
    selectTime,
  },
  props: {
    value: String,
    required: Boolean,
    readonly: Boolean,
    label: String,
  },
  methods: {
    requiredTest,
    validate() {
      return this.$refs.field.validate();
    },
    resetValidation() {
      return this.$refs.field.resetValidation();
    },
  },
};
</script>
