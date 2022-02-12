<template>
  <q-input outlined dense ref="field" :value="value" @input="$emit('input', $event)"
    :rules="required?[requiredTest]:undefined" :label="label" :readonly="readonly"
    class="input-Date">
    <template #append>
      <q-btn flat dense round color="primary" icon="schedule" @click="toggle"/>
      <q-menu no-parent-event ref="menu" :target="$refs.field"
        anchor="top right" self="top right" :offset="[0, -40]">
        <div class="row">
          <q-date minimal mask="YYYY-MM-DD" :value="date" @input="input($event,time)"/>
          <select-time :value="time" @input="input(date,$event)"/>
        </div>
      </q-menu>
    </template>
  </q-input>
</template>

<script>
import { date } from 'quasar';
import { requiredTest } from 'boot/inputTest';
import selectTime from 'components/form/selecttime';

export default {
  name: 'InputDatetime',
  components: {
    selectTime,
  },
  props: {
    value: [String, Object],
    required: Boolean,
    readonly: Boolean,
    label: String,
  },
  data() {
    return {
      date: '',
      time: '',
    };
  },
  methods: {
    requiredTest,
    toggle() {
      const t = new Date(this.value);
      this.date = '';
      this.time = '';
      if (t) {
        this.date = date.formatDate(t, 'YYYY-MM-DD');
        this.time = date.formatDate(t, 'HH:mm:ss');
      }
      this.$refs.menu.toggle();
    },
    input(d, t) {
      this.date = d || date.formatDate(Date.now(), 'YYYY-MM-DD');
      this.time = t || date.formatDate(Date.now(), 'HH:mm:ss');
      this.$emit('input', `${this.date} ${this.time}`);
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
